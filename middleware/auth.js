const jwt = require('jsonwebtoken');

const vefiryToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token){
        res.status(401).send({
            status: "failed",
            message: "Token is required"
        });
    }
    else{
    try{
        const decoded = jwt.verify(token, process.env.SECRECT);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).send({
            status: "failed",
            message: "Invalid token"
        });
    }
}
}


const isAdmin = (...role) =>{

    return (req, res, next) => {
        if (!req.user.role) {
            return res.status(403).send({
                status: "failed",
                message: "Access denied"
            });
        }
        if (!role.includes(req.user.role)) {
            return res.status(403).send({
                status: "failed",
                message: "Access denied"
            });
        }
        next();
    };
}

module.exports = {
    vefiryToken,
    isAdmin
}