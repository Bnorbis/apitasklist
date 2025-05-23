import User from '../models/User'
import * as Yup from 'yup'; // com "y" minúsculo

class UserController{
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Verification failed!'})
        }

        const userExists = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if(userExists){
            return res.status(400).json({error: "User already exists."});
        }

        const {id, name, email} = await User.create(req.body);

        return res.json({
            id,
            email,
            name
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({

            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().min(6),
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field
            })
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }


        try {
            const { email, oldPassword } = req.body;
            const user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            if (email && email !== user.email) {
                const userExists = await User.findOne({ where: { email } });
                if (userExists) {
                    return res.status(400).json({ error: "User already exists." });
                }
            }

            if (oldPassword && !(await user.checkPassword(oldPassword))) {
                return res.status(400).json({ error: "Incorrect password." });
            }

            const { id, name } = await user.update(req.body);

            return res.json({
                id,
                name,
                email: user.email,
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}

export default new UserController();