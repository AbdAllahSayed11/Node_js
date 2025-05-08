
exports.valdateUser = (schema) =>{
    return (req, res, next) => {
        const { error } = schema.validate(req.body,{abortEarly: false});
        if (error) {
            return res.status(400).json({ status : 'fail',message: error.details.map( (msg)=> msg.message ) });
        }
        next();
    };
}