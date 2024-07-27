const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

app.post('/recipes', async (req, res) => {
    const { name, description, image } = req.body;
    const newRecipe = new Recipe({ name, description, image });
    await newRecipe.save();
    res.status(201).json(newRecipe);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})


