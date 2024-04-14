const jwt = require('jsonwebtoken'); 

const SECRET_KEY = 'asddndndn'; 

const generateToken = (userData, cb) => { // Corrected function name genrateToke to generateToken and removed unnecessary parentheses around (err, token)
    jwt.sign(userData, SECRET_KEY, { expiresIn: '5m' }, cb); // Corrected 'userdata' to userData and cb(err, token) to cb
}



const extractToken = (req, res, next) => { 
    const header = req.headers['authorization']; 
    if (!header) {
        return res.status(401).json({msg:'no authorization found '})
    }
        const auth = header.split(' '); 
        req.auth = {
            scheme: auth[0], 
            token: auth[1] 
        }
        next();
    
}


        
const verifyToken = (req, res, next) => { 
    const auth = req.auth;
    if (!auth || auth.scheme !== 'Bearer') { 
        return res.status(401).json('Invalid authentication scheme'); 
    }
    try {
        const data = jwt.verify(auth.token, SECRET_KEY); 
        req.auth.user = data; 
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json('Token verification failed'); 
    }
}

module.exports = {
    generateToken,
    extractToken,
    verifyToken
};

