import { Request, Response } from 'express'
import { resolve } from 'path'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'
import { UserRepository } from '../repositories/UserRepository'
import SendMailService from '../services/SendMailService'

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const userAlreadyExists = await UserRepository.findOne({
      where: {
        email,
      },
    })

    if (!userAlreadyExists) {
      return response.status(400).json({
        error: 'User does not exists',
      })
    }

    const surveyAlreadyExists = await SurveyRepository.findOne({
      where: {
        id: survey_id,
      },
    })

    if (!surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey does not exist',
      })
    }

    const surveyUserAlreadyExists = await SurveyUserRepository.findOne({
      where: { user_id: userAlreadyExists.id, value: null },
      relations: ['user', 'survey'],
    })

    const pathToTemplate = resolve(__dirname, '../views/emails/npsMail.hbs')
    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: '',
      link: process.env.URL_MAIL,
    }

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id
      await SendMailService.execute(
        email,
        `${userAlreadyExists.name.split(' ')[0]}, queremos saber sua opinião!`,
        variables,
        pathToTemplate
      )
      return response.json(surveyUserAlreadyExists)
    }

    // Save data
    const surveyUser = SurveyUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    })
    await SurveyUserRepository.save(surveyUser)
    variables.id = surveyUser.id
    // Send email
    await SendMailService.execute(
      email,
      `${userAlreadyExists.name.split(' ')[0]}, queremos saber sua opinião!`,
      variables,
      pathToTemplate
    )

    return response.json(surveyUser)
  }
}

export { SendMailController }
