const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) res.status(400).send('Username ou Senha não enviados');  
    const user = await User.findOne({username});

    if(!user) return res.status(404).send('Usuário não encontrado!');
    const authenticated = await user.authenticate(req.body.password);

    if(!authenticated) return res.status(401).send('Senha inválida');

    const { name, username, type} = user;

    const token = jwt.sign({
      name,
      username,
      typepayload
    }, "s0ft-b10g", {
      expiresIn: 60 * 60
    });
    return res.status(200).send({ token })
  } catch (err) {
    return res.status(500).send(err)
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers['authentication'];
    if (!token) return res.status(400).send('Token não enviado')
    const payload = jwt.verify(token, "s0ft-b10g");
    req.payload = payload;
    next();
  }
  catch (err) {
    return res.status(400).send(err)
  }
};
module.exports = {
  authenticate,
  isAuthenticated
};
