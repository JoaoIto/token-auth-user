// Definir o schema do usuário
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    cpf: String,
    senha: String,
    role: String,
});

// Definir o modelo de usuário
export const UserModel = mongoose.model('User', userSchema);
