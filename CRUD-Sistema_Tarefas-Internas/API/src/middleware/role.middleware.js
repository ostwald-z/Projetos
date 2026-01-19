
function checkRole(permitidasRoles = []){
    return (req, res, next) => {

        if(!permitidasRoles.includes(req.user.role)){
            return res.status(403).json({
                erro: "Permissão Negada"
            })
        }

        next();
    }
}



module.exports = checkRole;