const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passwordRoutes = require('./routes/passwordRoutes')

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/users', passwordRoutes)

mongoose.connect('mongodb+srv://absep98:zvwW5sHF0fzHuTOj@cluster0.nn6miwl.mongodb.net/password?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to DB');
    app.listen(3000, () => {
        console.log('Server is up and listening at 3000 port');
    })
})
.catch((err) => {
    console.log(err);
})

