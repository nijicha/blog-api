if (!process.env.ALLOWED_ORIGIN) {
  throw new Error('ALLOW_ORIGIN is not defined')
}

const corsSetting = {
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  maxAge: 3600
}

export default corsSetting
