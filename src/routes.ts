import { Router } from 'express'
import { AnswerController } from './controller/AnswerController'
import { NpsController } from './controller/NpsController'
import { SendMailController } from './controller/SendMailController'
import { SurveyController } from './controller/SurveyController'
import { UserController } from './controller/UserController'

const router = Router()
const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

router.post('/users', userController.create)
router.get('/surveys', surveyController.show)
router.post('/surveys', surveyController.create)
router.post('/sendmail', sendMailController.execute)
router.get('/answers/:value', answerController.execute)
router.get('/nps/:survey_id', npsController.execute)

export { router }
