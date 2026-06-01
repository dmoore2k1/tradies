export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/submit') {
      if (request.method === 'OPTIONS') return handleOptions();
      if (request.method === 'POST') return handleSubmit(request, env);
      return json({ error: 'Method not allowed' }, 405);
    }

    return env.ASSETS.fetch(request);
  },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400',
    },
  });
}

async function handleSubmit(request, env) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }

    const name = (data.name || '').trim();
    const business = (data.business || '').trim();
    const phone = (data.phone || '').trim();
    const email = (data.email || '').trim();
    const situation = (data.situation || '').trim();
    const message = (data.message || '').trim();

    if (!name || !business || !phone) {
      return json({ error: 'Name, business name, and phone number are required.' }, 400);
    }

    const html = `
      <h2>New enquiry from tradiewebsites.com</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Business</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(business)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Phone</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(email || '—')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Situation</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(situation || '—')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Message</td>
            <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(message || '—')}</td></tr>
      </table>
    `;

    const text = [
      'New enquiry from tradiewebsites.com',
      '',
      `Name:     ${name}`,
      `Business: ${business}`,
      `Phone:    ${phone}`,
      `Email:    ${email || '—'}`,
      `Situation: ${situation || '—'}`,
      `Message:  ${message || '—'}`,
    ].join('\n');

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured — form data not delivered:', { name, business, phone, email, situation, message });
      return json({ ok: true, note: 'Form received. Email delivery not yet configured. We\'ll get back to you.' }, 200);
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tradie Websites <form@tradiewebsites.com>',
        to: env.NOTIFICATION_EMAIL || 'hello@tradiewebsites.com',
        reply_to: email || name,
        subject: `New enquiry — ${business} (${name})`,
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errBody);
      throw new Error(`Email send failed: ${resendRes.status}`);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('Form handler error:', err);
    return json({ error: 'Something went wrong. Please try again or email us directly.' }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    return m;
  });
}
