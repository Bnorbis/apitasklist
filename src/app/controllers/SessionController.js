import User from "../models/User";
import jwt from 'jsonwebtoken';
import authConfig from '../../database/config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "User does not exist." });
        }

        // Verificar se a senha bate
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: "Invalid password." });
        }

        const { id, name } = user;

        return res.json({
            user: { id, name, email },
            token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
        });
    }
}

export default new SessionController();
