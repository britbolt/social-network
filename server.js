const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://britbolt:G5qqy!ep698c32k@clusterbolt.ingk23h.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser : true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);


app.listen(PORT, () => console.log(`connected on localhost:${PORT}`));