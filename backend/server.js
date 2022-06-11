const express = require('express');
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 5000;
const bcrypt = require ('bcrypt');

//middleware setup
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.post('/register', (req, res)=>{
    const {email, password} = req.body;
});

app.post('/login',(req, res))

db.sequelize.sync().then(() =>{
    app.listen(PORT, () =>{
        console.log(`Listening on: http://localhost:${PORT}`);
    });
});
