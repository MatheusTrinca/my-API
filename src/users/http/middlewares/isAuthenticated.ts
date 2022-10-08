import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { Secret, verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

type JwtPayloadProps = {
  sub: string
}

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Failed to verify acess token', 401)
  }
  const token = authHeader.replace('Bearer ', '')
  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret)
    const { sub } = decoded as JwtPayloadProps
    request.user = { id: sub }
    return next()
  } catch (err) {
    throw new AppError('Invalid Authentication Token', 401)
  }
}
