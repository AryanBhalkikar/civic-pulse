function isAdmin(req, res, next){
    const flag = req.user && req.user.is_admin;

    if (flag === true || flag === 'true' || flag === 1 || flag === '1'){
        return next();
    }

    res.status(401).json({ message: "You are not authorized to view this page!" });
}

export default isAdmin;