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
//DB Connection
connectDB();

//MIDDLEWARE INIT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization', 'auth-token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:3000"]
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.set('json spaces', 2)

//SET ROUTES
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/coffee', require('./routes/coffeeRoutes'))


app.listen(PORT, () => {
    console.log(`Alive on localhost port: ${PORT}`)
})

