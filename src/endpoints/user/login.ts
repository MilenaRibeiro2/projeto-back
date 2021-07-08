import {Request, Response} from 'express'
import connection from '../../data/connection'
import { generateToken } from '../../services/authenticator'
import { compareHash } from '../../services/hashManager'
import { user } from '../../model/user'

export default async function login (req: Request, res: Response): Promise<void> {
    try {
        let message = "Sucesso!"

        const { email, password } = req.body

        if (!email || !password) {
            res.statusCode = 406
            message = '"email" and "password" must be provided'
            throw new Error(message)
        }

        const queryResult: any = await connection("user")
            .select("*")
            .where({ email })

        if (!queryResult[0]) {
            res.statusCode = 401
            message = "Login inválido."
            throw new Error(message)
        }

        const user: user = {
            id: queryResult[0].id,
            name: queryResult[0].name,
            nickname: queryResult[0].nickname,
            email: queryResult[0].email,
            password: queryResult[0].password
        }

        const passwordIsCorrect: boolean = await compareHash(password, user.password)

        if (!passwordIsCorrect) {
            res.statusCode = 401
            message = "Senha incorreta."
            throw new Error(message)
        }

        const token: string = generateToken({
            id: user.id
        })

        res.status(200).send({ message, token })


    } catch (error) {
        res.send({ error: error.message })
    }
} 