const roleMiddlware = (req, res, next) => {
    const rol = req.user.rol;
    if( rol != 'admin'){
        return res.status(403).json({
            message: 'Acceso denegado'
        })
    }

    next();

}

export default roleMiddlware