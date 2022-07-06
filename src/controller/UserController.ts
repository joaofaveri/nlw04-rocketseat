import { Request, Response } from 'express'
import { User } from '../models/User'
import npsDataSource from '../database/app-data-source'

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    const userRepository = npsDataSource.getRepository(User)

    const userAlreadyExists = await userRepository.findOne({
      where: {
        email,
      },
    })

    console.log(userAlreadyExists)

    if (userAlreadyExists) {
      return response.status(400).json({
        error: 'User already exists!',
      })
    }

    const user = userRepository.create({
      name,
      email,
    })

    await userRepository.save(user)

    return response.json(user)
  }
}

export { UserController }
