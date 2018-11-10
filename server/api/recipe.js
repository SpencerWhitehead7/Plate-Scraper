const router = require(`express`).Router()
const {Recipe} = require(`../db/models`)

// GET /api/recipe
router.get(`/`, async (req, res, next) => {
  try{
    const recipes = await Recipe.findAll()
    res.json(recipes)
  }catch(error){
    next(error)
  }
})

// GET /api/recipe/:wildcard
router.get(`/:id`, async (req, res, next) => {
  try{
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
  }catch(error){
    next(error)
  }
})

// POST /api/recipe
router.post(`/`, async (req, res, next) => {
  try{
    const recipe = await Recipe.create(req.body)
    res.json(recipe)
  }catch(error){
    next(error)
  }
})

// PUT /api/recipe/:wildcard
router.put(`/:id`, async (req, res, next) => {
  try{
    const [, recipe] = await Recipe.update(req.body, {
      where : {id : req.params.id},
      returning : true,
      plain : true,
    })
    res.json(recipe)
  }catch(error){
    next(error)
  }
})

// DELTE /api/recipe/:wildcard
router.delete(`/:id`, async (req, res, next) => {
  try{
    await Recipe.destory({
      where : {
        id : req.params.id,
      },
    })
    res.end()
  }catch(error){
    next(error)
  }
})

module.exports = router
