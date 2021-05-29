const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./config/db.js')
const session = require('express-session')
const secret = require('./config/secret')
const redis = require('redis')
const MongoSession = require('connect-mongodb-session')(session)
const authSesh = require('./auth/verifySessions')
const auth = require('./auth/verifyToken')
//DB Connection
connectDB();

//SESSION INIT
// let RedisStore = require('connect-redis')(session)
// let redisClient = redis.createClient()
let store = new MongoSession({
    uri: secret.uri,
    collection: 'sessions'
})

store.on('error', (error) => {
    console.log('MongoSession Error: '+error)
})

//MIDDLEWARE INIT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization', 'auth-token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
    exposedHeaders: 'CSRFToken',
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:3000"]
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.set('json spaces', 2)

//AUTH MIDDLEWARE
//app.set('trust proxy', 1)
// app.use(session({
//     // store: new RedisStore({client: redisClient}),
//     store: store,
//     secret: secret.session_secret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         //maxAge: 1000 * 60 * 60 * 24 //24 hours or 1 day = 1000ms in 1sec * 60 sec in one minute * 60 minutes in one hour * 24 hours
//         maxAge: 1000 * 60 * 5 //test 5 minute
//     }
// }))

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({message:'Something broke!'})
})

//SET ROUTES
app.get("/", auth, (req, res) => {
    //console.log(req.session)
    // req.session.isAuth = true
    res.send("ROOT of ROOT")
})
app.get("/test", auth, (req, res) => {
    res.json({message: '/test'})
})
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/coffee', require('./routes/coffeeRoutes'))


app.listen(PORT, () => {
    console.log(`Alive on localhost port: ${PORT}`)
})

