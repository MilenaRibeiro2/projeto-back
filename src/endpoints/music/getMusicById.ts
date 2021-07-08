import {Request, Response} from 'express'
import connection from '../../data/connection'
import { getTokenData } from '../../services/authenticator'

export default async function getMusicById (req: Request, res: Response): Promise<void> {
    try {
        const authorization = req.headers.authorization as string
        const authorizationData = getTokenData(authorization)
        const id = req.params.id

        const queryResult = await connection("music")
        .select("*")
        .where({ id })
   
        res.status(200).send({ queryResult })
    } catch (error) {
        res.send({ error: error.message })
    }
}