const {UserController,PreferencesUsers,TobaccoController} = require('../service/userController');
const jwtHelper = require('../jwt/jwt');
const middleAuth = require('../jwt/middleAuth');
const express = require('express');
const ErrHandlerMiddle = require('../jwt/errorMiddle');

const Routes = (connection) => {
    const router = express.Router();
    const Tobacco = new TobaccoController(connection);
    const UsersAuth = new UserController(connection);
    const Preferences = new PreferencesUsers(connection);
    const ErrHandler = new ErrHandlerMiddle();

    router.use((err,req,res,next) => {
        ErrHandler.handleErrors(err,req,res,next)
    });

    router.post('/registration',async (req,res,next) => {
        const {name,password} = req.body;

        try {
            await UsersAuth.registration(name,password)
            res.json({message:'зарегистраирован'})
        } catch(e) {
            next(e);
        }    
    })

    router.post('/login', async (req,res,next) => {
        const {name,password} = req.body;

        try {
            const result = await UsersAuth.login(name,password);
            if(result.length === 0) {
                res.status(401).json({err:'такого пользователя нету'})
            } else {
                const token = jwtHelper.generationToken(result[0].id);
                res.json({message:'успешно',token});
            } 
        } catch(e) {
            next(e);
        }
    })

    router.get('/user/:userId/tobaccos',middleAuth, async (req,res,next) => {
        const userId = req.params.userId;
        
        try {
            const result = await Preferences.getPreferencesTobacco(userId);
            res.json(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/user/:userId/mixes',middleAuth, async (req,res,next) => {
        const userId = req.params.userId;
        
        try {
            const result = await Preferences.getPreferenceMix(userId);
            res.json(result);
        } catch(e) {
            next(e);
        }
    })

    router.post('/user/:userId/tobaccos/:tobaccoId',middleAuth, async (req,res,next) => {
        const userId = req.params.userId;
        const tobaccoId = req.params.tobaccoId;
        
        try {
            await Preferences.addPreferencesTobacco(userId, tobaccoId);
            res.json({message:'добавлено'});
        } catch(e) {
            next(e);
        }
    })
    
    router.post('/user/:userId/mixes/:mixId',middleAuth, async (req,res,next) => {
        const userId = req.params.userId;
        const mixId = req.params.mixId;
        
        try {
            await Preferences.addPreferenceMix(userId, mixId);
            res.json({message:'добавлено'});
        } catch(e) {
            next(e);
        } 
    })


    router.get('/tobaccos',async (req,res,next) => {

        try {
            const result = await Tobacco.getTobaccos();
            res.json(result);
        } catch(e) {
            next(e);
        }
    })


    router.get('/mixes',async (req,res,next) => {
        try {
            const result = await Tobacco.getMix();
            res.json(result);
        } catch(e) {
            next(e);
        }
    })

    router.get('/tobaccos/:flavor', async (req,res,next) => {
        const flavor = req.params.flavor;
        
        try {
            const result = await Tobacco.getTobaccoFlavor(flavor);
            if(result.length === 0) {
                res.status(401).json({err:'такого вкуса нету'});
            } else {
                res.json(result);
            }
        } catch(e) {
            next(e);
        }

    })

    router.get('/mixes/:name', async (req,res,next) => {
        const mixName = req.params.name;
        
        try {
            const result = await Tobacco.getMixName(mixName);
            if(result.length === 0) {
                res.status(401).json({err:'микса нету по запросу'})
            } else {
                res.json(result[0]);
            }
        } catch(e) {
            next(e);
        }
    })

    router.get('/tobaccos/price/:price', async (req,res,next) => {
        const price = req.params.price;
        
        try {
            const result = await Tobacco.getPriceTobaccos(price)
            res.json(result)
        } catch(e) {
            next(e);
        }
    })
    return router;
}

module.exports = Routes;



