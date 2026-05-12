import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3001;

const TO_EMAIL = "faoliveira.pt.2026@gmail.com";
const FROM_EMAIL = TO_EMAIL;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173"] }));
app.use(express.json());

function createTransporter() {
  const user = process.env.SMTP_USER || TO_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    console.warn("⚠️  SMTP_PASS env var not set. Emails will be logged to console only.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }

  const transporter = createTransporter();

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #b8860b;">Novo contacto do site</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Nome</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
        ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Telefone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ""}
        ${subject ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Assunto</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${subject}</td></tr>` : ""}
      </table>
      ${message ? `<h3 style="color: #333; margin-top: 20px;">Mensagem</h3><p style="color: #555; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>` : ""}
    </div>
  `;

  if (transporter) {
    try {
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `Contacto site: ${name} — ${subject || "Sem assunto"}`,
        html,
      });
      console.log(`📧 Email enviado para ${TO_EMAIL}`);
    } catch (err) {
      console.error("❌ Erro ao enviar email:", err);
      return res.status(500).json({ error: "Erro ao enviar email." });
    }
  } else {
    console.log("📋 Email simulado (SMTP não configurado):");
    console.log(`   De: ${name} <${email}>`);
    console.log(`   Telf: ${phone || "—"}`);
    console.log(`   Assunto: ${subject || "—"}`);
    console.log(`   Mensagem: ${message || "—"}`);
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`📬 Servidor de email em http://localhost:${PORT}`);
});
