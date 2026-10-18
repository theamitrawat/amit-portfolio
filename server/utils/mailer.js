import nodemailer from 'nodemailer'

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'theamitrwt@gmail.com'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

/**
 * Creates and returns a configured Nodemailer transporter.
 * Uses Gmail with App Password (set MAIL_USER + MAIL_PASS in .env).
 */
function createTransporter() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('Mail credentials are not configured.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Gmail App Password (not your account password)
    },
  })
}

/**
 * Sends a notification email to the portfolio owner when a new contact
 * form submission arrives.
 *
 * @param {{ name: string, email: string, subject: string, message: string }} data
 */
export async function sendContactNotification(data) {
  const transporter = createTransporter()
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const emailHref = encodeURIComponent(data.email)
  const subject = escapeHtml(data.subject)
  const safeSubject = data.subject.replace(/[\r\n]+/g, ' ').trim()
  const message = escapeHtml(data.message)
  const firstName = escapeHtml(data.name.trim().split(/\s+/)[0])

  const ownerMail = {
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `[Portfolio] New message: ${safeSubject}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; width: 100px; border: 1px solid #e2e8f0;">Name</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">Email</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">
              <a href="mailto:${emailHref}">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; border: 1px solid #e2e8f0;">Subject</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${subject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f8fafc; font-weight: 600; vertical-align: top; border: 1px solid #e2e8f0;">Message</td>
            <td style="padding: 8px 12px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
          Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </p>
      </div>
    `,
  }

  // Auto-reply to the sender
  const autoReply = {
    from: `"Amit" <${process.env.MAIL_USER}>`,
    to: data.email,
    subject: `Thanks for reaching out, ${data.name.trim().split(/\s+/)[0]}!`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Thanks for your message!</h2>
        <p>Hi ${firstName},</p>
        <p>
          I've received your message and will get back to you within 24–48 hours.
        </p>
        <p style="background: #f8fafc; padding: 12px 16px; border-left: 3px solid #3b82f6; margin: 16px 0;">
          <strong>Your message:</strong><br />
          <em>${message}</em>
        </p>
        <p>
          In the meantime, feel free to check out my projects on
          <a href="https://github.com/theamitrawat">GitHub</a> or connect on
          <a href="https://linkedin.com/in/theamitrawat">LinkedIn</a>.
        </p>
        <p>Best,<br /><strong>Amit</strong></p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 11px;">
          This is an automated reply. Please do not reply directly to this email.
        </p>
      </div>
    `,
  }

  await transporter.sendMail(ownerMail)
  await transporter.sendMail(autoReply)
}
