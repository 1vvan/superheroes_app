const express = require('express');
const router = express.Router();
const Superhero = require('../models/Superhero');

// Получение списка супергероев
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (!isNaN(page) && !isNaN(limit)) {
            // Если параметры пагинации присутствуют, обрабатываем запрос с пагинацией
            const allHeroes = await Superhero.find();
            const startIndex = (page - 1) * limit;
            const lastIndex = page * limit;
            const results = {};
            results.totalHeroes = allHeroes.length;
            results.pageCount = Math.ceil(allHeroes.length / limit);

            if (lastIndex < allHeroes.length) {
                results.next = {
                    page: page + 1,
                };
            }
            if (startIndex > 0) {
                results.prev = {
                    page: page - 1,
                };
            }
            results.result = allHeroes.slice(startIndex, lastIndex);
            res.json(results);
        } else {
            // Если параметры пагинации отсутствуют, возвращаем полный список
            const superheroes = await Superhero.find();
            res.json(superheroes);
        }
    } catch (error) {
        console.error('Error fetching superheroes:', error);
        res.status(500).json({ error: 'Failed to fetch superheroes' });
    }
});


// Удаление определенного супергероя
router.delete('/:id', async (req, res) => {
    try {
        const superheroId = req.params.id;
        await Superhero.findByIdAndDelete(superheroId);
        res.json({ message: 'Superhero deleted successfully' });
    } catch (error) {
        console.error('Error deleting superhero:', error);
        res.status(500).json({ error: 'Failed to delete superhero' });
    }
});

// Загрузка фото для определенного супергероя
router.put('/:id', async (req, res) => {
    try {
        const superheroId = req.params.id;
        const updatedSuperhero = req.body;

        const superhero = await Superhero.findByIdAndUpdate(
            superheroId,
            updatedSuperhero,
            { new: true }
        );

        res.json(superhero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Обновление определенного супергероя
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSuperHero = req.body;

        const result = await SuperHero.findByIdAndUpdate(id, updatedSuperHero, {
            new: true,
        });

        res.json(result);
    } catch (error) {
        console.error('Error updating superhero:', error);
        res.status(500).json({ error: 'Failed to update superhero' });
    }
});

// Создание нового супергероя
router.post('/', async (req, res) => {
    const superheroData = req.body;

    // Создание нового экземпляра супергероя
    const newSuperhero = new Superhero(superheroData);

    try {
        // Сохранение супергероя в базе данных
        await newSuperhero.save();
        res.status(200).send('Superhero added successfully');
    } catch (error) {
        console.error('Error saving superhero:', error);
        res.status(500).send('Failed to add superhero');
    }
});




module.exports = router;
