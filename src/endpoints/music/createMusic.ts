import {Request, Response} from 'express'
import connection from '../../data/connection'
import { authenticationData } from '../../model/music'
import { getTokenData } from '../../services/authenticator'
import generateId from '../../services/idGenerator'

export default async function createMusic (req: Request, res: Response): Promise<void> {
    try {
        const {title, file, genre, album} = req.body

        const token: string = req.headers.authorization as string
        const tokenData: authenticationData = getTokenData(token)
        const id: string = generateId()

        await connection("music")
            .insert({
                id,
                title,
                file,
                genre,
                album,
                author: tokenData.id
            })

        let message = "Música criada!"

    res.status(201).send({ message })
    } catch (error) {
        res.send({ error: error.message })
    }
}