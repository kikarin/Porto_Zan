import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
      const { name, email, message } = await req.json();
      

    // Konfigurasi transportasi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Email pengirim
        pass: process.env.EMAIL_PASS, // Password / App Password Gmail
      },
    });

    // Konfigurasi email yang dikirim
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "milhampauzan@gmail.com", // Email tujuan
      subject: `New Message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
