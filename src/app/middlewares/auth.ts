import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
      return res.status(401).json({ 
          status: false,
          data: null,
          message: 'Token not provided' 
      })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.user = decoded.user

    return next()
  } catch (err) {
    return res.status(401).json({
       status: false,
       data: null,
       message: err.message
    })
  }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    try {
      if(req.user.type === 'admin'){
        return next()
      }else{
        return res.json({
          status: false,
          data: null,
          message: 'Restricted'
        })
      }
    } catch (err: any) {
      return res.status(401).json({
         status: false,  
         data: null,
         message: err.message
      })
    }
  })
}

const checkUserOrIsAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    try {
      if(req.user.id === req.params.id || req.user.type === 'admin'){
        return next()
      }else{
        return res.json({
          status: false,
          data: null,
          message: 'Restricted'
        })
      }
    } catch (err: any) {
      return res.status(401).json({
         status: false,  
         data: null,
         message: err.message
      })
    }
  })
}

export {
  verifyToken,
  isAdmin,
  checkUserOrIsAdmin
}