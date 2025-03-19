import { ContactUsDto } from '@/users/dto/contact-us.dto'
import { Resend } from 'resend'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ResendService {
  private resend: Resend
  private contactEmail: string

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))
    this.contactEmail = this.configService.get<string>('RESEND_CONTACT_EMAIL')
  }

  async sendContactEmails(
    contactUsDto: ContactUsDto
  ): Promise<{ status: string; data: any[] }> {
    const templates = this.getEmailTemplates(contactUsDto)

    try {
      const [adminEmail, userEmail] = await Promise.all([
        this.resend.emails.send({
          from: this.contactEmail,
          to: ['ramiro.olave11@gmail.com', 'javierarrietaun@gmail.com'],
          subject: templates.admin.subject,
          html: templates.admin.html,
        }),
        this.resend.emails.send({
          from: this.contactEmail,
          to: [templates.user.to],
          subject: templates.user.subject,
          html: templates.user.html,
        }),
      ])

      if (adminEmail.error) throw new Error(adminEmail.error.message)
      if (userEmail.error) throw new Error(userEmail.error.message)
      console.log('adminEmail', adminEmail)
      console.log('userEmail', userEmail)

      return {
        status: 'success',
        data: [adminEmail.data, userEmail.data],
      }
    } catch (error) {
      console.error({ error })
      throw new Error(error.message)
    }
  }

  private getEmailTemplates(contactUsDto: ContactUsDto) {
    return {
      admin: {
        to: this.contactEmail,
        subject: `Nuevo mensaje de ${contactUsDto.name}`,
        html: `<p>Hola,</p>
            <p>Un nuevo mensaje ha sido enviado a través de nuestro formulario de "Contacto". Por favor, encuentra los detalles a continuación:</p>
            <ul>
                <li><strong>Nombre:</strong> ${contactUsDto.name}</li>
                <li><strong>Email:</strong> ${contactUsDto.email}</li>
                <li><strong>Asunto:</strong> ${contactUsDto.subject}</li>
                <li><strong>Mensaje:</strong> ${contactUsDto.message}</li>
            </ul>
            <p>Por favor, revisa el mensaje y contacta al usuario.</p>`,
      },
      user: {
        to: contactUsDto.email,
        subject: 'Gracias por contactarnos',
        html: `<p>Hola ${contactUsDto.name},</p>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
            <p>Saludos,</p>
            <p>El equipo de Te resuelvo</p>`,
      },
    }
  }
}
