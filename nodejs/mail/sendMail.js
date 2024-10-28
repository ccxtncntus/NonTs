import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'ccxtncn00@gmail.com',
    pass: 'vnsmuuxiothvkyvw',
    // vnsm uuxi othv kyvw
  },
});

async function sendMail(mailRecieve, title, content) {
  const info = await transporter.sendMail({
    from: 'Nonts app', // sender address
    to: mailRecieve, // list of receivers
    subject: title, // Subject line
    // text: content, // plain text body
    html: `<h1>${content}</h1>`, // html body
  });
  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);
export default sendMail;
