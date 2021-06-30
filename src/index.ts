import app from "./app"
import login from "./endpoints/user/login"
import signUp from './endpoints/user/signUp'

app.post('/users/signup', signUp)
app.post('/users/login', login)
