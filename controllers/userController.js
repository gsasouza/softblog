const User = require("../models/userModel");

const getAll = async (req, res) => {
  try {
    const users = await User.find({}).select({ password: 0, _id: 0, _v: 0 });
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(`Erro: ${err}`);
  }
};

const register = async (req, res) => {
  try {
    await new User(req.body).save();
    return res.status(201).send("Usuário Criado!");
  } catch (err) {
    return res.status(500).send(`Erro: ${err}`);
  }
};

const getOne = async (req, res) => {
  try {
    const username = req.params.username.toUpperCase();
    const user = await User.findOne({ username }).select({
      password: 0,
      _id: 0,
      _v: 0
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(`Erro: ${err}`);
  }
};

const update = async (req, res) => {
  try {
    const username = req.params.username.toUpperCase();
    const user = await User.findOne({ username }).select({
      password: 0,
    });

    if (!user) return res.status(404).send("Usuário não encontrado!");
 
    await Object.assign(user, req.body).save();

    return res.status(200).send("Usuário Atualizado");
  } catch (err) {
    return res.status(500).send(`Erro: ${err}`);
  }
};

const remove = async (req, res) => {
  username = req.params.username.toUpperCase();
  try {
    const user = await User.findOneAndRemove({ username });

    if (!user) return res.status(404).send("Usuário não encontrado!");

    return res.status(200).send("Usuário Deletado");
  } catch (err) {
    console.log(err)
    return res.status(500).send(`Erro: ${err}`);
  }
};
module.exports = {
  getAll,
  register,
  getOne,
  update,
  remove
};
