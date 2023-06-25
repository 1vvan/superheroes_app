const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const port = 3001;
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/superheroes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Middleware для обработки данных в формате JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Маршруты для супергероев
const superheroesRoutes = require('./routes/superheroes');
app.use('/api/superheroes', superheroesRoutes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
