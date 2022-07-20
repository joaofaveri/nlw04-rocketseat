import { Request, Response } from 'express'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const surveyUser = await SurveyUserRepository.findOne({
      where: { id: String(u) },
    })

    if (!surveyUser) {
      return response.status(400).json({
        error: 'Survey User does not exists!',
      })
    }

    surveyUser.value = Number(value)
    await SurveyUserRepository.save(surveyUser)
    return response.json(surveyUser)
  }
}

export { AnswerController }
