import nodemailer, { Transporter } from 'nodemailer'
import { resolve } from 'path'
import fs from 'fs'
import handlebars from 'handlebars'

class SendMailService {
  private client: Transporter
  constructor() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((error, account) => {
      if (error) {
        console.error(`Failed to create a testing account... ${error.message}`)
        return process.exit(1)
      }

      console.log('Credentials obtained')

      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      this.client = transporter
    })
  }

  async execute(to: string, subject: string, body: string) {
    const pathToTemplate = resolve(__dirname, '../views/emails/npsMail.hbs')
    const templateFileContent = fs
      .readFileSync(pathToTemplate)
      .toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body,
    })
    // Message Object
    const message = {
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    }

    this.client.sendMail(message, (error, info) => {
      if (error) {
        console.error(`Error occurred! ${error.message}`)
        return process.exit(1)
      }

      console.log(`Message sent: ${info.messageId}`)
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
  }
}

export default new SendMailService()
