import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, phone, email, service, message, website } = req.body;

  // Honeypot check — bots fill this field, humans don't
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Validate required fields
  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Név megadása kötelező.' });
  }
  if (!phone || String(phone).trim().length < 8) {
    return res.status(400).json({ success: false, error: 'Telefonszám megadása kötelező.' });
  }

  // Sanitize inputs
  const safeName = String(name).trim().slice(0, 100);
  const safePhone = String(phone).trim().slice(0, 30);
  const safeEmail = email ? String(email).trim().slice(0, 200) : '';
  const safeService = service ? String(service).trim().slice(0, 50) : 'Nincs megadva';
  const safeMessage = message ? String(message).trim().slice(0, 1000) : '';

  // Optional: send email via SMTP/Resend/SendGrid here
  // For now, log to console (Vercel captures these in function logs)
  console.log('New contact form submission:', {
    name: safeName,
    phone: safePhone,
    email: safeEmail,
    service: safeService,
    message: safeMessage,
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({ success: true });
}
