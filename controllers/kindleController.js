const express = require ('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
const Kindle = require('../models/kindle.js')
const Codex = require('../models/codex.js');

//index route 


router.get('/', async(req, res, next) => {
    try {
        const foundKindle  = await Kindle.find();
        console.log(foundKindle);
        res.render('kindle/index.ejs',{kindle:foundKindle})
    }catch(error) {
        next(error)
    }
})


router.get('/new', async(req, res, next) => {
    try {
        res.render('kindle/new.ejs', {
            artists: null 
        })

    }catch (error){
        next (error)
    }
})

router.post('/new', async (req, res, next) => {
    try {
        const kindle = new Kindle ({
            title: req.body.title,
            date: new Date(),
            link: req.body.link,
            author: req.body.author
        })
        const createdKindle = await kindle.save();
        // res.json(createdKindle);
        res.redirect('/kindle')


    } catch (error) {
        next(error)
    }
})


router.get('/:id',getKindle, async (req, res, next) => {
    try {
        const foundKindle = await Kindle.findById(req.params.id);
        res.render('kindle/show.ejs', {
            kindle: foundKindle
        })

    } catch (error) {
        next(error)
    }
})



router.get('/:id/edit', async (req, res, next) => {
    try {
        const foundKindle = await Kindle.findById(req.params.id)

        res.render('kindle/edit.ejs', {
            kindle: foundKindle
        })
    } catch (error) {
        next(error)
    }
})


router.put('/:id', getKindle, async (req, res, next) => {
    if(req.body.title != null){
        res.kindle.title = req.body.title;
    }
    if(req.body.author != null){
        res.kindle.author = req.body.author;
    }
    if(req.body.link!= null){
        res.kindle.link = req.body.link;
    }
    
    try {
        const updatedKindle  = await res.kindle.save();
        console.log(updatedKindle);
        // res.json(updatedKindle);
        res.redirect(`/kindle/${updatedKindle._id}`)
    } catch (error) {
        next(error)
    }
})


router.delete('/:id', getKindle, async (req, res, next) => {
    try {
        await res.kindle.remove();
        
        res.redirect('/kindle')
    } catch (error) {
        next(error)
    }
})

async function getKindle(req,res,next){
    let kindle;
    try{
        // in here we are trying to get our kindle based on that id
        kindle = await Kindle.findById(req.params.id);
        console.log(kindle)
        //if we cant find the codex we will send a status code 404. 404 mean we could not find anything
        if(kindle == null){
            // the reason we use return here because if there is no subscriber we will immediately leave the function and will not go any further
            return res.status(404).json({message:"Can't find kindle"})
        }
    }catch(err){
        // if error that means error caused in our server so sending 500 status
        return res.status(500).json({ message : err.message});
    }
    // we are creating a variable 'kindle' on the res(response) object and setting that equal to "codex" what we found inside of "try". in this we can just call "res.codex" in other function above what gonna be the "codex" we set here
    res.kindle = kindle;
    next();
}

module.exports = router
