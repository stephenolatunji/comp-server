const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');


app.use(express.json());
app.use(cors());
app.use(helmet(
    {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self"],
                scriptSrc: ["'self"]
            }
        },
        referrerPolicy: { policy: 'same-origin'}
    }
));
const register = require('./Routes/register');
const company = require('./Routes/company');
const setStatus = require('./Routes/set-status')


app.get('/', (req, res) => {
    res.send('Welcome to DMS!')
});

app.use('/register', register);
app.use('/company', company);
app.use('/company-status', setStatus);

const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});