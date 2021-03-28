const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const morgan = require('morgan')

//DB Connection
//connectDB();

//MIDDLEWARE INIT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.set('json spaces', 2)

//SET ROUTES
app.use('/api/user', require('./routes/userRoutes'))


app.listen(PORT, () => {
    console.log(`Alive on localhost port: ${PORT}`)
})

