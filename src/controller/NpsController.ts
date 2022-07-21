import { Request, Response } from 'express'
import { IsNull, Not } from 'typeorm'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const allSurveyAnswers = await SurveyUserRepository.find({
      where: { survey_id, value: Not(IsNull()) },
    })

    const detractors = allSurveyAnswers.filter(
      (answer) => answer.value >= 0 && answer.value <= 6
    ).length
    const passives = allSurveyAnswers.filter(
      (answer) => answer.value == 7 || answer.value == 8
    ).length
    const promoters = allSurveyAnswers.filter(
      (answer) => answer.value >= 9
    ).length

    const totalAnswers = allSurveyAnswers.length

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    )

    return response.json({
      detractors,
      passives,
      promoters,
      totalAnswers,
      nps,
    })
  }
}

export { NpsController }
