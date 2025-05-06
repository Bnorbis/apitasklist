import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
//JWT autentica usuarios em ambientes REST conhecido tb como JSON WEB TOKEN autentica se vc eh realmente a pessoa que diz ser
//Vamos fazer uma sessão, mandar uma senha, e ao mandar ele retorna um token que sera armazenado e utilizado em futuras autenticacoes
//O token contem Header + Payload + Assinatura
//O JWT é uma abordagem agnóstica de linguagem, amplamente utilizada em arquiteturas modernas, especialmente REST APIs e microservices.

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }

        );
        this.addHook('beforeSave', async user => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
