// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(request: Request) {
//   try {
//     const { name, email, subject, message } = await request.json();

//     // Validate form data
//     if (!name || !email || !subject || !message) {
//       return NextResponse.json(
//         { message: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Basic email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json(
//         { message: 'Invalid email address' },
//         { status: 400 }
//       );
//     }

//     // Configure nodemailer
//     const transporter = nodemailer.createTransport({
//       service: process.env.EMAIL_SERVICE || 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email content
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // Send to yourself
//       replyTo: email,
//       subject: `Portfolio Contact: ${subject}`,
//       text: `
//         Name: ${name}
//         Email: ${email}
        
//         Message:
//         ${message}
//       `,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>New Contact Form Submission</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Subject:</strong> ${subject}</p>
//           <h3>Message:</h3>
//           <p>${message.replace(/\n/g, '<br>')}</p>
//         </div>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Email sent successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { message: 'Failed to send email' },
//       { status: 500 }
//     );
//   }
// }