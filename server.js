const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/social-network", {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);


app.listen(PORT, () => console.log(`connected on localhost:${PORT}`));

