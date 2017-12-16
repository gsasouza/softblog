const authRouter = function(express) {
  const authRouter = express.Router();
  const authController = require("../controllers/authController");

  authRouter.route("/").post(authController.authenticate);

  return authRouter;
};

module.exports = authRouter;
