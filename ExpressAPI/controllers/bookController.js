var bookController = (Book) => {


    return {
        findByIdInterceptor: (req, res, next) => {
            Book.findById(req.params.id, (err, resp) => {
                console.log('from intereptor...', resp);
                if (err) {
                    console.log('from interceptor err', err);

                    res.status(500).send(err);
                } else if (resp) {
                    console.log('from interceptor resp', resp);
                    req.book = resp;
                    next();
                } else {
                    console.log('from interceptor else');
                    res.status(404).send(err);
                }
            })
        },
        post: (req, res) => {
            Book.create(req.body, (err, resp) => {
                if (err) {
                    console.log('err', err);
                    res.status(500).send(err);
                } else {
                    res.status(201).send(resp);
                }
            })
        },
        getAll: (req, res) => {
            Book.find((err, resp) => {
                if (err) {
                    console.log('err', err);
                } else {
                    res.json(resp);
                }
            });
        },
        findById: (req, res) => {
            console.log('req.book', req.book);
            res.json(req.book);
        },
        //Post function - allow to add a new book 
        patch: (req, res) => {
            let newBook = Object.assign(req.book, req.body);
            console.log('newBook', newBook);
            Book.update(newBook, (err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(newBook);
                }
            });
        },
        //Put function - allow to edit a book
        update: (req, res) => {
            console.log('from update ....', req.book);
            Book.update(req.body, (err, resp) => {
                if (err) {
                    console.log('err from update ', err);
                    res.status(500).send(err);
                } else {
                    console.log('resp from update ', resp);
                    //Book.findById(req.book.id);
                    // console.log('resp',resp);
                    Book.findOne({ _id: req.params.id }, (err, resp) => {
                        if (!err) {
                            res.json(req.book);
                        }
                    });

                }
            });
        },
        remove: (req, res) => {
            req.book.remove((err, resp) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send({ message: 'delete success' });
                }
            });
        },
        getReadBooks: (req, res) => {
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

module.exports = bookController;