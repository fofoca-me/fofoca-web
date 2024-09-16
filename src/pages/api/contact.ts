/* eslint-disable import/no-named-as-default-member */
/* eslint-disable linebreak-style */
import nodemailer from 'nodemailer';
import type { FormDataContact } from '@lib/types/contact';
import type { NextApiRequest, NextApiResponse } from 'next';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP,
  port: 587, // Porta TLS
  secure: false, // Não use SSL/TLS aqui, mas utilize STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, email, subject, message }: FormDataContact = req.body;

    if (!name || !email || !subject || !message)
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios.' });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Fale Conosco: ${subject}`,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`
      });

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
    }
  }
}
