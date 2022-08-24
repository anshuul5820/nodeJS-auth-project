const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connection = mongoose.createConnection(
  'mongodb+srv://schuylerdare96:rrklrrklrrkl@cluster0.r1mo1.mongodb.net/tutorial_db?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions',
  mongoUrl:
    'mongodb+srv://schuylerdare96:rrklrrklrrkl@cluster0.r1mo1.mongodb.net/tutorial_db?retryWrites=true&w=majority',
})

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

app.get('/', (req, res, next) => {
  req.session.viewCount = req.session.viewCount + 1 || 1
  res.send(`<h1>H ${req.session.viewCount}</h1>`)
})

app.listen('3000', () => {
  console.log('Listening')
})
