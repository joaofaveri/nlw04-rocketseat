import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class SendMailService {
  private client: Transporter
  constructor() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((error, account) => {
      if (error) {
        console.error(`Failed to create a testing account... ${error.message}`)
        return process.exit(1)
      }

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

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')

    const mailTemplateParse = handlebars.compile(templateFileContent)
    const html = mailTemplateParse(variables)
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
