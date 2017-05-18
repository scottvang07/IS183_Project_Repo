var userController = (User) => {


    return {
        findByIdInterceptor: (req, res, next) => {
            User.findById(req.params.id, (err, resp) => {
                console.log('from intereptor...', resp);
                if (err) {
                    console.log('from interceptor err', err);
                    res.status(500).send(err);
                } else if (resp) {
                    console.log('from interceptor resp', resp);
                    req.user = resp;
                    next();
                } else {
                    console.log('from interceptor else');
                    res.status(404).send(err);
                }
            })
        },
        post: (req, res) => {
            User.create(req.body, (err, resp) => {
                if (err) {
                    console.log('err', err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send(resp);
                }
            })
        },
        getAll: (req, res) => {
            User.find((err, resp) => {
                if (err) {
                    console.log('err', err);
                } else {
                    res.json(resp);
                }
            });
        },
        findById: (req, res) => {
            console.log('req.user', req.user);
            res.json(req.user);
        },
        patch: (req, res) => {
            let newUser = Object.assign(req.user, req.body);
            console.log('newUser', newUser);
            User.update(newUser, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newUser);
                }
            });
        },
        update: (req, res) => {
            console.log('from update ....', req.user);
            User.update(req.body, (err, resp) => {
                if (err) {
                    console.log('err from update ', err);
                    res.status(500).send(err);
                } else {
                    console.log('resp from update ', resp);
                    User.findOne({ _id: req.params.id }, (err, resp) => {
                        if (!err) {
                            res.json(req.user);
                        }
                    });

                }
            });
        },
        remove: (req, res) => {
            req.user.remove((err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send({ message: 'delete success' });
                }
            });
        },
        getReadUser: (req, res) => {
            Book.find({ read: true }, (err, resp) => {
                if (!err) {
                    res.json(resp);
                } else {
                    res.status(500).send(err);
                }

            });
        }
    }





}

module.exports = userController;