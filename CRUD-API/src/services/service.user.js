const repo = require("../repo/repo.user")
const AppError = require("../errors/AppError")
const bcrypt = require("bcrypt")
const validator = require("validator");
const jwt = require("jsonwebtoken")

async function listarUser() {

    const resultado = await repo.ListarUsers();

    if(resultado.length === 0){
       throw new AppError("Nenhum usuario para listar", 404)
    }

    return resultado;


}

async function deleteUser(id) {

    if(isNaN(id)){
        throw new AppError("ID inválido")
    }

    const resultado = await repo.DeletarUser(id);
    if(resultado.affectedRows === 0){
        throw new AppError("ID fornecido não encontrou nenhum usuario.", 404)
    }

    return resultado;
}

async function criarUser(user, email, senha) {
    
    if(!user || !user.trim()){
        throw new AppError("Usuario é obrigatorio para criação de um usuario", 400)
    }

    if(!email || !email.trim()){
        throw new AppError("Email é obritgatorio para criação de um usuario", 400)
    }

    if(!senha){
        throw new AppError("Senha é obrigatorio para criação de um usuario", 400)
    }

    if(!validator.isEmail(email)){
        throw new AppError("Email Inválido", 400)
    }


    if(!validator.isStrongPassword(senha)){
        throw new AppError("Senha muito fraca - mininmo 8 carac - adicione 1 simbolo, 1 numero, 1 caixa alta", 400)
    }


    //padronizar user e email antes de verificar iguais

    const userLimpo = user.trim();
    const emailLimpo = email.trim().toLowerCase();


    const emailexiste = await repo.buscarEmail(emailLimpo)
    if(emailexiste){
        throw new AppError("Email já existente, tente outro!", 409)
    }

    const userExiste = await repo.buscarUser(userLimpo);
    if(userExiste){
        throw new AppError("Usuario já existente, tente outro.", 409)
    }


    const senhaHash = await bcrypt.hash(senha, 10)

    const resultado = await repo.criarUser(userLimpo, emailLimpo, senhaHash)

    return resultado;



}

async function updateUser(id, user, email, senha) {
    
    const campos = []
    const valores = []

    if(isNaN(id)){
        throw new AppError("Id inválido")
    }


    if(user !== undefined){
        if(user !== null){
            
            //Limpando usuario
            const userLimpo = String(user).trim()

            //verifica se existe conteúdo real dentro após limpeza
            if (userLimpo.length > 0){
                
                //verificando se USER já existe no banco
                const verificarUser = await repo.buscarUser(userLimpo)

                if(verificarUser){
                    throw new AppError("Usuario já existente!, tente outro.", 409)
                }
                
                //Adiciona oficialmente pós validação completa.
                campos.push("user = ?")
                valores.push(userLimpo);
            }
        }
    }


    if(email !== undefined){
        if(email !== null){

            const emailLimpo = String(email).trim()

            if(emailLimpo.length > 0){

                if(!validator.isEmail(emailLimpo)){
                    throw new AppError("Email Inválido");
                }

                const emailLower = emailLimpo.toLowerCase()

                const verificarEmail = await repo.buscarEmail(emailLower)
                if(verificarEmail){
                    throw new AppError("Email já existente, tente outro!")
                }

                campos.push("email = ?")
                valores.push(emailLower)
            }

        }
    }   


    if(senha !== undefined){
        if(senha !== null){
            const senhaLimpa = String(senha).trim()

            if(!validator.isStrongPassword(senhaLimpa)){
                throw new AppError("Senha fraca: min 8 carac, 1 caixa alta, 1 número, 1 símbolo")
            }

            const senhaHash = await bcrypt.hash(senha, 10)

            campos.push("senha_hash = ?")
            valores.push(senhaHash)
        }
    }   


    if(campos.length === 0){
        throw new AppError("Nenhum campo válido para atualizar usuario")
    }


    valores.push(id);

    const resultado = await repo.updateUser(campos, valores)

    if (resultado.affectedRows === 0){
        throw new AppError("ID não encontrado para atualização")
    }

    return resultado;

}

async function login(email, senha) {
    
    if(email === undefined || senha === undefined || email === null || senha === null){
        throw new AppError("Campos inválidos")
    }

    const usuario = await repo.login(email)
    if(!usuario){
        throw new AppError("Usuário OU senha incorretos.")
    }

    const validacao = await bcrypt.compare(senha, usuario.senha_hash)

    if(!validacao){
        throw new AppError("Usuário OU senha incorretos.")
    }


    const token = jwt.sign({
        id: usuario.id, email: usuario.email},
        process.env.JWT_SECRET,
        {expiresIn: "1h"})

    
    return token;
}

module.exports = {
    listarUser,
    deleteUser,
    criarUser,
    updateUser,
    login
}