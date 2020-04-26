const express = require('express')
const app= express();
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const Kindle = require('../models/kindle.js')

const Codex = require('../models/codex.js');

router.get('/', async (req, res) => {
    try {
        const foundCodex = await Codex.find({});
        console.log(foundCodex);
        res.render("codex/index.ejs", {
            codex: foundCodex
        })
    } catch (error) {
        next(error)
    }
})


router.get('/new', (req, res) => {
    try {
        res.render('codex/new.ejs')
    } catch (error) {
        next(error)
    }
})


router.post('/new', async (req, res, next) => {
    console.log(req.body);
    const codex = new Codex ({
        title: req.body.title,
        author: req.body.author,
        added_to_collection: new Date(),
    })
    try {
        const createdCodex = await codex.save();
        console.log(createdCodex);
        res.redirect('/codex')
    } catch (error) {
        next(error)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        const foundCodex = await Codex.findById(req.params.id);
        console.log(foundCodex);
        res.render('codex/show.ejs', { codex:foundCodex })
    } catch (error) {
        next(error)
    }
})


router.get("/:id/edit", async (req, res, next) => {
    try {
        const foundCodex = await Codex.findById(req.params.id)
        res.render("codex/edit.ejs", {
            codex: foundCodex
        })
    } catch (error) {
        next(error)
    }
})


router.put('/:id', getCodex, async (req, res, next) => {
    if(req.body.title != null){
        res.codex.title = req.body.title;
    }
    if(req.body.author != null){
        res.codex.author = req.body.author;
    }
    
    try {
        const updatedCodex  = await res.codex.save();
        console.log(updatedCodex);
        res.redirect(`/codex/${updatedCodex._id}`)
    } catch (error) {
        next(error)
    }
})



router.delete('/:id', getCodex, async (req, res, next) => {
    try {
        await res.codex.remove();
        res.redirect('/codex')
    } catch (error) {
        next(error)
    }
})


async function getCodex(req,res,next){
    let codex;
    try{
        // in here we are trying to get our codex based on that id
        codex = await Codex.findById(req.params.id);
        //if we cant find the codex we will send a status code 404. 404 mean we could not find anything
        if(codex == null){
            // the reason we use return here because if there is no subscriber we will immediately leave the function and will not go any further
            return res.status(404).json({message:"Can't find codex"})
        }
    }catch(err){
        // if error that means error caused in our server so sending 500 status
        return res.status(500).json({ message : err.message});
    }
    // we are creating a variable 'codex' on the res(response) object and setting that equal to "codex" what we found inside of "try". in this we can just call "res.codex" in other function above what gonna be the "codex" we set here
    res.codex = codex;
    next();
}

module.exports = router;
