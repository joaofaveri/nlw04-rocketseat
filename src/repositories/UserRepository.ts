import npsDataSource from '../database/app-data-source'
import { User } from '../models/User'

const UserRepository = npsDataSource.getRepository(User).extend({})

export { UserRepository }
