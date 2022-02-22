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
const setStatus = require('./Routes/set-status');
const upload = require('./Routes/registerByCSV');


app.get('/', (req, res) => {
    res.send('Welcome to DMS!')
});

app.use('/company-ms/register', register);
app.use('/company-ms/company', company);
app.use('/company-ms/company-status', setStatus);
app.use('/company-ms/upload-company', upload);

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});