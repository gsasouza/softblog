const userRouter = function(express) {
  const userRouter = express.Router();
  const userController = require("../controllers/userController");
  
  userRouter
    .route("/")
    .get(userController.getAll)
    .post(userController.register);

  userRouter
    .route("/:username")
    .get(userController.getOne)
    .put(userController.update)
    .delete(userController.remove);

  return userRouter;
};

module.exports = userRouter;
