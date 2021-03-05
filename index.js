const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const posts = [
    {
        userName: 'Kyle',
        title: 'Post 1'
    },
    {
        userName: 'Amy',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken,(req, res) => {
    res.json(posts.filter(post => post.userName === req.user.name))
})

// app.post('/login', (req, res) => {
//     // Authenticated
//     const username = req.body.username
//     console.log(username)
//     const user = { name: username }
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//     res.json({ accessToken: accessToken })
// })

function authenticateToken(req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


app.get('/', (req, res) => {
    console.log(req.headers["vas"]);
    res.send("Heyyy");
})

app.use('/hi', (req, res) => {
    // const a = req.query.a;
    res.send("jijiji");
})


app.listen(8080, () => {
    console.log('app running on 8080')
})