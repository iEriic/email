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
        user: "cuberoleplayoficial@gmail.com",       // Substitua pelo seu Gmail
        pass: "gwrhkfiqddnytzqt"          // Substitua pela senha de app
      }
    });

    await transporter.sendMail({
      from: '"Servidor MTA" <cuberoleplayoficial@gmail.com>',
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
