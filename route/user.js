const express = require('express');
const router = express.Router();

let user = require('../schema/userModel');

//read all users
router.route('/').get((req, res) => {
    user.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//read specific user
router.route('/:id').get((req, res) => {
    user.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

//create user
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const newUser = new user({userName});

    newUser.save()
           .then(() => res.json('User added'))
           .catch(err => res.status(400).json(`Error: ${err}`))
});

//delete user
router.route('/:id').delete((req, res) => {
    user.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json(`Error ${err}`))
});

//update user
router.route('/update/:id').post((req, res) => {
    user.findById(req.params.id)
        .then(user => {
            user.userName = req.body.userName,

            user.save()
                .then(() => res.json('User updates'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        }).catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;