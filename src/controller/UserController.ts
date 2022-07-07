import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    const userAlreadyExists = await UserRepository.findOne({
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

    const user = UserRepository.create({
      name,
      email,
    })

    await UserRepository.save(user)

    return response.json(user)
  }
}

export { UserController }
