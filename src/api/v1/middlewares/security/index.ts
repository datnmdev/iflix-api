import authentication from './authentication'
import authorization from './authorization'

const securityMiddlware = {
  authentication,
  authorization
}

export default securityMiddlware