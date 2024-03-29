import { Request, Response } from 'express'
import { AppError } from '../errors/AppError'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const surveyUser = await SurveyUserRepository.findOne({
      where: { id: String(u) },
    })

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!')
    }

    surveyUser.value = Number(value)
    await SurveyUserRepository.save(surveyUser)
    return response.json(surveyUser)
  }
}

export { AnswerController }
