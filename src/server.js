import express from 'express'
import { config } from 'dotenv'
import fileUpload from 'express-fileupload'
import indexRouter from './routes/index.js'
config()

const app = express()
app.use(express.json())
app.use(fileUpload)
app.use(indexRouter.userRouter)


app.listen(process.env.PORT,()=> console.log(`Serves is running ${process.env.PORT} port`))