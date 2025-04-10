import { db } from "../db.js";


export const getUsers = (_, res) => {
const q = "SELECT * FROM usuarios";


db.query(q, (err, data) => {
if (err) return res.json(err);
return res.status(200).json(data);
});
};


export const getUser = (req, res) => {
const q = "SELECT * FROM usuarios WHERE idusuarios = ?";


db.query(q, [req.params.id], (err, data) => {
if (err) return res.json(err);
if (data.length === 0) return res.status(404).json("Usuário não encontrado");
return res.status(200).json(data[0]);
});
};


export const addUser = (req, res) => {
const q = "INSERT INTO usuarios(nome, idade, cpf, email, telefone, genero) VALUES(?)";


const values = [
req.body.nome,
req.body.idade,
req.body.cpf,
req.body.email,    
req.body.telefone,   
req.body.genero     
];


db.query(q, [values], (err, data) => {
if (err) return res.json(err);
return res.status(201).json("Usuário criado com sucesso!");
});
};


export const updateUser = (req, res) => {
const q = "UPDATE usuarios SET nome = ?, idade = ?, cpf = ?, email = ?, telefone = ?, genero = ? WHERE idusuarios = ?";


const values = [
req.body.nome,
req.body.idade,
req.body.cpf,
req.body.email,      
req.body.telefone,   
req.body.genero,     
req.params.id
];


db.query(q, values, (err, data) => {
if (err) return res.json(err);
if (data.affectedRows === 0) return res.status(404).json("Usuário não encontrado");
return res.status(200).json("Usuário atualizado com sucesso!");
});
};


export const deleteUser = (req, res) => {
const q = "DELETE FROM usuarios WHERE idusuarios = ?";


db.query(q, [req.params.id], (err, data) => {
if (err) return res.json(err);
if (data.affectedRows === 0) return res.status(404).json("Usuário não encontrado");
return res.status(200).json("Usuário deletado com sucesso!");
});
};