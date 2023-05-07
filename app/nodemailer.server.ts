import * as nodemailer from 'nodemailer'

export interface email {
  from: string,
  to: string,
  subject: string,
  text: string,
}

//Create a SMTP transporter object
const transporter = nodemailer.createTransport({
  host: process.env.host,
  port: 465,
  secure: true,
  auth: {
    user: process.env.user_email,
    pass: process.env.user_password
  }
})

export async function sendMail(emailData: email) {
  const mailOptions: nodemailer.SendMailOptions = {
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}
