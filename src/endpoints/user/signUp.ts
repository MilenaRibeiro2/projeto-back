import {Request, Response} from 'express'
import {generateToken} from '../../services/authenticator'
import generateId from '../../services/idGenerator'
import connection from '../../data/connection'
import { generateHash } from '../../services/hashManager'

export default async function signUp (req: Request, res: Response): Promise<void>  {
    try {
        let message = "Sucesso!"
        const {name, email, nickname, password} = req.body

        if(!name || !email || !nickname || !password) {
            res.statusCode = 406
            throw new Error("Verifique se todos os campos foram preenchidos.")
        }

        if (req.body.password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres.")
        }

        const id = generateId()
        const cypherPassword = await generateHash(password)

        await connection('user')
            .insert({
                id,
                name,
                nickname,
                email,
                password: cypherPassword
            })


        const token = generateToken({id})

        res.status(201).send({token})
    } catch (error) {
        res.send({error: error.message})
    }
}