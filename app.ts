import express, { type Express, urlencoded, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import userRouter from './routes/user.route'
import customerRouter from './routes/customer.route'
import supplierRouter from './routes/supplier.route'
import productRouter from './routes/product.route'
import orderRouter from './routes/order.route'
import orderDetailRouter from './routes/order-detail.route'
import locationRouter from './routes/location.route'
import transactionRouter from './routes/transaction.route'
import { SWAGGER_DOCS } from './constants/contants'
import swaggerUi from 'swagger-ui-express'
import { rateLimit } from 'express-rate-limit'


const swaggerJsdoc = require('swagger-jsdoc')

dotenv.config()

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});


app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(SWAGGER_DOCS), { explorer: true })
)

app.use(limiter);
app.use('/api/v1/user', userRouter)
app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/supplier', supplierRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/order-detail', orderDetailRouter)
app.use('/api/v1/location', locationRouter)
app.use('/api/v1/transaction', transactionRouter)
app.use('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome to Inventory Management System API.')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  mongoose
    .connect(process.env.MONGODB_URL || '')
    .then(() => { console.log('[database]: Database connected successfully') })
    .catch((error) => {
      console.error(`[error]: Error connecting to database: ${error.message}`)
    })
})
