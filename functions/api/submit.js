/**
 * Tradie Websites — Contact Form Handler
 *
 * Pages Function (POST /api/submit)
 * Sends form submissions via Resend API.
 *
 * Requires RESEND_API_KEY secret in Cloudflare Pages project settings.
 * Resend is free for 100 emails/month — plenty for early-stage enquiries.
 *
 * Alternatives if you don't want Resend:
 * - Replace the fetch() call with a Gmail REST API call using your existing credentials
 * - Use Cloudflare Email Routing + SEND_EMAIL binding
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- CORS headers (allow form POST from the site) ---
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // --- Parse form data ---
    const contentType = request.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }

    const name     = (data.name || '').trim();
    const business = (data.business || '').trim();
    const phone    = (data.phone || '').trim();
    const email    = (data.email || '').trim();
    const situation = (data.situation || '').trim();
    const message  = (data.message || '').trim();

    // --- Validate required fields ---
    if (!name || !business || !phone) {
      return new Response(
        JSON.stringify({ error: 'Name, business name, and phone number are required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // --- Build email HTML ---
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
      `New enquiry from tradiewebsites.com`,
      ``,
      `Name:     ${name}`,
      `Business: ${business}`,
      `Phone:    ${phone}`,
      `Email:    ${email || '—'}`,
      `Situation: ${situation || '—'}`,
      `Message:  ${message || '—'}`,
    ].join('\n');

    // --- Send via Resend ---
    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      // If no API key is configured, log the submission and return a helpful error
      console.error('RESEND_API_KEY not configured — form data not delivered:', { name, business, phone, email, situation, message });
      return new Response(
        JSON.stringify({ ok: true, note: 'Form received. Email delivery not yet configured. We\'ll get back to you.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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

    // --- Return success ---
    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Form handler error:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again or email us directly.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/** Handle OPTIONS preflight */
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
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
