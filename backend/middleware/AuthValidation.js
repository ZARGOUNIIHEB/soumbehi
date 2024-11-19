let jwt = require('jsonwebtoken');
const userSchema = require('../model/User');

exports.AuthValidation = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        let decoded = jwt.verify(token, 'azerty');
        if (!decoded) { return res.json({ errors }) };
        const user = await userSchema.findById(decoded.id);
        res.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
}