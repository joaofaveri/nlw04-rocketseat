import npsDataSource from '../database/app-data-source'
import { Survey } from '../models/Surveys'

const SurveyRepository = npsDataSource.getRepository(Survey).extend({})

export { SurveyRepository }
