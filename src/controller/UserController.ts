import { Request, Response } from 'express'

class UserController {
  async create(request: Request, response: Response) {
    const data = request.body()
    console.log(data)
    return response.send()
  }
}

export { UserController }
