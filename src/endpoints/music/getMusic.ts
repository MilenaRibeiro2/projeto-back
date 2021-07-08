import {Request, Response} from 'express'
import connection from '../../data/connection'
import { getTokenData } from '../../services/authenticator'

export default async function getMusic (req: Request, res: Response): Promise<void> {
    try {
        const authorization = req.headers.authorization as string
        const authorizationData = getTokenData(authorization)

        const musics: any = await connection("music").select("*")
   
        res.status(200).send({ musics })
    } catch (error) {
        res.send({ error: error.message })
    }
}