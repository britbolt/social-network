const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb//localhost:', {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`connected on localhost:${PORT}`));