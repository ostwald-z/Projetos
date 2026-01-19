const repo = require("../../repo/repo_user/repo.user")
const AppError = require("../../error/AppError")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function getUser() {

    const resultado = await repo.getUser()
    
    if(resultado.length === 0){
        throw new AppError("Nenhum usuário a ser Listado.", 404)
    }

    return resultado;
}


async function deleteUser(id) {

    if (isNaN(id)){
        throw new AppError("ID inválido")
    }

    const resultado = await repo.deleteUser(id)

    if (resultado.affectedRows === 0){
        throw new AppError("ID não encontrado na base de dados.")
    }

    return resultado;
}


async function criarUser(user, email, senha) {
    
    if(typeof user !== "string" || !user.trim()){
        throw new AppError("Usuário Inválido")
    }

    if(typeof email !== "string" || !email.trim()){
        throw new AppError("Endereço de Email é INVÁLIDO")
    }

    if(typeof senha !== "string" || !senha.trim()){
        throw new AppError("Senha é inválida")
    }


    //normalizo e padronizo antes de validar
    const userLimpo = user.trim()
    const emailLimpo = email.trim()
    const senhaLimpa = senha.trim()

    //Valida tamanho

    if(userLimpo.length > 255){
        throw new AppError("Carac máximo excedido do nome de Usuario: 255")
    }
    
    if(emailLimpo.length > 255){
        throw new AppError("Carac máximo excedido do Endereço de Email: 255")
    }

    if(senhaLimpa.length > 255){
        throw new AppError("Carac máximo excedido da senha: 255")
    }

    //Valida formatos

    if(userLimpo.length < 3){
        throw new AppError("Carac Mínimo para nome de Usuario: 3")
    }
    
    if(!validator.isEmail(emailLimpo)){
        throw new AppError("Endereço de Email Inválido.")
    }

    if(!validator.isStrongPassword(senhaLimpa)){
        throw new AppError("Senha fraca, MINIMO de 8 caracteres - adicione no minimo 1 Caixa alta, 1 número, 1 símbolo, 1 Caixa pequena: EX(Abcd1234@)")
    }


    //Verificar se email já existe no banco
    const [verificarEmail] = await repo.buscarEmail(emailLimpo)
    if(verificarEmail){
        throw new AppError("Email já existente", 409)
    }

    //Verificar se usuario já existe no banco
    const [verificarUser] = await repo.buscarUser(userLimpo)
    if(verificarUser){
        throw new AppError("Usuário já existente", 409)
    }


    // Criar Hash de senha para armazenar
    const senhaHash = await bcrypt.hash(senhaLimpa, 10)

    //chamar SQL para criar usuario com as informações limpas
    const resultado = await repo.criarUser(userLimpo, emailLimpo, senhaHash)
    return resultado;
}


async function updateUser(id, user, email, senha) {
    
    const campos = []
    const valores = []

    //validar entradas
    if(isNaN(id)){
        throw new AppError("ID inválido")
    }

    //valida user
    if(typeof user === "string" && user.trim().length > 0){
        //Limpa usuario
        const userLimpo = user.trim()

        //verifica min e max carac
        if(userLimpo.length > 255){
            throw new AppError("Nome de usuario Excede limite de caracteres: 255 carac")
        }

        if(userLimpo.length < 3){
            throw new AppError("Min caracteres para Usuario é: 3 carac")
        }

        //verifica se Já existe este usuario
        const [resultado] = await repo.buscarUser(userLimpo)
        
        if(resultado){
            throw new AppError("Usuário já existente", 409)
        }

        campos.push("user = ?")
        valores.push(userLimpo)
    }

    //valida email
    if(typeof email === "string" && email.trim().length > 0){
        //Limpa Email
        const emailLimpo = email.trim()

        if(!validator.isEmail(emailLimpo)){
            throw new AppError("Email inválido.")
        }

        //verifica se o Email já existe
        const [resultado] = await repo.buscarEmail(emailLimpo)
        if(resultado){
            throw new AppError("Email já Existente.", 409)
        }

        campos.push("email = ?")
        valores.push(emailLimpo)
    }

    // valida senha
    if(typeof senha === "string" && senha.trim().length > 0){
        //Limpa Senha
        const senhaLimpa = senha.trim()

        if(!validator.isStrongPassword(senhaLimpa)){
            throw new AppError("Senha fraca: min 8 caracteres | 1 caixa alta | 1 numero | 1 simbolo | 1 caixa baixa | EX: (Abcd1234@)")
        }

        //Cria Hash de senha
        const senhaHash = await bcrypt.hash(senhaLimpa, 10)
        
        campos.push("senha_hash = ?")
        valores.push(senhaHash)
    }

    // caso nada venha
    if(campos.length === 0){
        throw new AppError("Nenhum campo válido para atualização")
    }

    valores.push(id)

    const resultado = await repo.updateUser(campos, valores)

    if(resultado.affectedRows === 0){
        throw new AppError("ID fornecido não foi encontrado na base para atualização", 404)
    }

    return resultado;
}


async function loginUser(email, senha) {
    const [usuario] = await repo.buscarEmail(email)

    if(!usuario){
        throw new AppError("Email ou Senha incorretos.", 401)
    }

    const validacao = await bcrypt.compare(senha, usuario.senha_hash)

    if(!validacao){
        throw new AppError("Email ou Senha incorretos.", 401)
    }

    const token = jwt.sign(
        {id: usuario.id, 
        user: usuario.user,
        role: usuario.role
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE}
    )

    return token;

}


module.exports = {
    getUser,
    deleteUser,
    criarUser,
    updateUser,
    loginUser
}