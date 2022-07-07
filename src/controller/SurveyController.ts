import { Request, Response } from 'express'
import { SurveyRepository } from '../repositories/SurveyRepository'

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body

    const survey = SurveyRepository.create({
      title,
      description,
    })

    await SurveyRepository.save(survey)

    return response.status(201).json(survey)
  }

  async show(request: Request, response: Response) {
    const all = await SurveyRepository.find()

    return response.json(all)
  }
}

export { SurveyController }
