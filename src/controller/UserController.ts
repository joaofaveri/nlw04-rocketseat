import { Request, Response } from 'express'
import { AppError } from '../errors/AppError'
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
      throw new AppError('User already exists!')
    }

    const user = UserRepository.create({
      name,
      email,
    })

    await UserRepository.save(user)

    return response.status(201).json(user)
  }
}

export { UserController }
