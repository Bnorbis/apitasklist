import {Router} from 'express';
import User from './app/models/User'

const routes = new Router();
routes.get('/teste', async(req, res) =>{
    try {
        const user = await User.create({
            name: 'Matheus',
            email: 'matheus@matheus.com',
            password_hash: '123123',
        });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});


export default routes;