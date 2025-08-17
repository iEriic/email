import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método inválido" });
  }

  const { to, subject, message } = req.body;
  if (!to || !subject || !message) {
    return res.status(400).json({ message: "Campos faltando" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Servidor MTA" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: message
    });

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
