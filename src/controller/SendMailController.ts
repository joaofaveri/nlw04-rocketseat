import { Request, Response } from 'express'
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

    // Save data
    const surveyUser = SurveyUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    })
    await SurveyUserRepository.save(surveyUser)
    // Send email
    await SendMailService.execute(
      email,
      surveyAlreadyExists.title,
      surveyAlreadyExists.description
    )

    return response.json(surveyUser)
  }
}

export { SendMailController }
