import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { AuthConfig } from '../../config/auth'

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
        const decoded = await jwt.verify(token, AuthConfig.secret) as JwtPayload

        //console.log(decoded)// Atual: { tokenId: 19, exp: 1693744278 }

        req.user = decoded as any// MELHORAR
        
        return next()
    } catch (err: any) {
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
      if(req.user.isAdmin){// req.user.type === 'admin'
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
      if(req.user.id === parseInt(req.params.id) || req.user.isAdmin){
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