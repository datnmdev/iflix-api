import commonErrorHandler from './common'
import validationErrorHandler from './validation'

const errorHandlerMiddleware = {
  validationErrorHandler,
  commonErrorHandler
}

export default errorHandlerMiddleware