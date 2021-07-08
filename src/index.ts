import app from "./app"
import createMusic from "./endpoints/music/createMusic"
import getMusic from "./endpoints/music/getMusic"
import login from "./endpoints/user/login"
import signUp from './endpoints/user/signUp'
import getMusicById from './endpoints/music/getMusicById'

app.get('/music/all', getMusic)
app.get('/music/:id', getMusicById)
app.post('/user/signup', signUp)
app.post('/user/login', login)
app.post('/music', createMusic)