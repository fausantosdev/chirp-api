import { Request, Response } from 'express'
import * as Yup from 'yup'
import ChirpService from '../services/ChirpService'

class ChirpController {
    async index(req: Request, res: Response) {
        const { id } = req.params

        let result = null

        try {
            id ?
                result = await ChirpService.readOne({ id: Number(id) }) :
                result = await ChirpService.read()
            
            return res.status(200).json({
                status: true,
                data: result,
                message: ''
            }) 
        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }

    async store(req: Request, res: Response){
        try {
            const schema = Yup.object().shape({
                content: Yup.string().required()
            })
    
            await schema.validate(req.body, { abortEarly: false })
            
            const { content } = req.body

            const newUser = await ChirpService.create({ 
                userId: 1, 
                content,
                image: 'aqui-e-uma-imagem.jpeg'
            })
    
            return res.status(201).json({
                status: true,
                data: newUser,
                message: 'Chirp publicado sucesso'
            })

        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error instanceof Yup.ValidationError ? error.errors : error.message
            })
        }
    }

    /*async update(req, res){
        const id = req.params.id
        
        try {
            const result = await UserService.update(req.body, { id })

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Usuário atualizado com sucesso'
            })

        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        }
    }*/

    async remove(req: Request, res: Response){
        const id = req.params.id

        try {
            const result = await ChirpService.delete({ id: Number(id) })
            
            return res.status(200).json({
                status: true,
                data: result,
                message: 'Chirp removido'
            })

        } catch (error: any) {
            return res.status(error.code || 500).json({
                status: false,
                data: null,
                message: error.message
            })
        } 
    }
}

export default new ChirpController()