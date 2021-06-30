import {Request, Response} from 'express'
import {generateToken} from '../services/authenticator'
import generateId from '../../services/idGenerator'
import connection from '../../data/connection'

export default async function signUp (re: Request, res: Response): Promise<void>  {
    try {
        const {name, email, nickname, password} = req.body

        if (password < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres.")
        }

        const id = generateId()

        const token = generateToken({id})

        res.status(201).send({token})

    } catch (error) {
        res.send({ error })
    }
}