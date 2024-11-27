import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
//obtenermos el jwt de la cabcerade autorizacion
const autHeader = req.headers['authorization'];
console.log('autheader', autHeader);
//bearer  1245454512121

const token = autHeader && autHeader.split(' ')[1]
console.log ('token', token);

if (!token) return res.sendStatus(401);

//verificacion y decodificacion
const secret = process.env.JWT_SECRET
jwt.verify(token, secret, (err,user) => {
    if (err) {
        console.log('Error', err);
        return res.sendStatus(403);
    }
        

    //si el token es valido
    console.log('user', user);

    req.user = user;
    next();
})

}