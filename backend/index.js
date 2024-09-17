const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/home', (req, res) => {
    res.send('<h1>Welcome to <b>Suby</b></h1>');
});
