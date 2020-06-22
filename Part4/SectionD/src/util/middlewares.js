const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('........')
  next()
}

const unknownPath = (req, res) => {
  res.status(400).json({error: 'Unknown path'})
}

const error = (error, req, res, next) => {
  if (error.name ==='TypeError') {
    logger.error('Type error occured')
    res.status(500).json({message: error.name})
  }
  next(error)
}

const getAuthorizationToken = (request, response, next) => {
  if (request && request.get('x-auth') && request.get('x-auth').length > 7) {
    request.authToken =  request.get('x-auth').substring(7)
  }
  next()
}

module.exports = {requestLogger, unknownPath, error, getAuthorizationToken}