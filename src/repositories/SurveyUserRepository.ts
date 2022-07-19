import { npsDataSource } from '../database/app-data-source'
import { SurveyUser } from '../models/SurveyUser'

const SurveyUserRepository = npsDataSource.getRepository(SurveyUser).extend({})

export { SurveyUserRepository }
