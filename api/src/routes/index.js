const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const postRecipes = require('./controllers/postRecipes');
const getDiets = require('./controllers/getDiets');
const getByIdOrName = require('./controllers/getByIdOrName');
const getAllRecipes = require ("./controllers/getAllRecipes");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/recipes', postRecipes);
router.get('/diets', getDiets);
router.get('/recipes/:idRecipe', getByIdOrName);
router.get('/recipes', getAllRecipes);

module.exports = router;
