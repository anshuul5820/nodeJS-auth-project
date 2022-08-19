import express from 'express'

const app = express()

function middlware(req, res, next) {
  console.log('middlware')
  const errorObj = new Error('error')
  next(errorObj)
}

function errorHandler(err, req, res, next) {
  if (err) {
    res.send('<h1>error</h1>')
  }
}

app.use(middlware)
app.get('/', (req, res, next) => {
  res.send('meoww')
})

app.use(errorHandler)

app.listen(3000)
