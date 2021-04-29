
module.exports = (req, res, next) => {
    if (!req.session.uid || !req.session.isAuth) {
        return res.status(401).json({message: 'Not Authenticated'})
    }
    if (req.session.isAuth) {
        next();
    } else {
        return res.status(401).json({message: 'Not Authenticated'})
    }
}