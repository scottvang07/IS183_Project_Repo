var express = require('express');

var routes = (User) => {

    var userRouter = express.Router();
    var userController = require('../controllers/userController')(User);
    console.log('userController', userController);
    userRouter.use('/id/:id', userController.findByIdInterceptor);

    userRouter.route('/')
        .get(userController.getAll)
        .post(userController.post);

    userRouter.route('/id/:id')
        .get(userController.findById)
        .put(userController.update)
        .patch(userController.patch)
        .delete(userController.remove);

    return userRouter;
}

module.exports = routes;