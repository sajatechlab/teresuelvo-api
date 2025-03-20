import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  // Enable CORS with credentials
  const whitelist = [
    'https://teresuelvo.com.co',
    'https://www.teresuelvo.com.co',
    'http://localhost:3000',
  ]

  app.enableCors({
    origin: function (origin, callback) {
      console.log('Request from origin:', origin)

      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log('Blocked origin:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  // Add this before app.listen
  app.use((req, res, next) => {
    const origin = req.headers.origin
    if (origin && whitelist.indexOf(origin) !== -1) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
      )
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, Authorization'
      )
    }
    next()
  })

  // Enable cookie parser
  app.use(cookieParser())

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3000
  // Listen on all interfaces (0.0.0.0)
  await app.listen(port, '0.0.0.0')
  console.log(`Application is running on port ${port}`)
}
bootstrap()
