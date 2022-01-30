const express = require('express');
const router = express.Router();

let exercise = require('../schema/exerciseModel');

//read all exercises
router.route('/').get((req, res) => {
    exercise.find()
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json(`Error: ${err}`))
});

//read specific exercise
router.route('/:id').get((req, res) => {
    exercise.findById(req.params.id)
            .then(exercise => res.json(exercise))
            .catch(err => res.status(400).json(`Error: ${err}`))
});

// create exercise
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new exercise({ userName, description, duration,date});

    newExercise.save()
               .then(() => res.json('Exercise added'))
               .catch(err => res.status(400).json(`Error: ${err}`))
});

//delete exercise
router.route('/:id').delete((req, res) => {
    exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Excerise deleted'))
            .catch(err => res.status(400).json(`Error: ${err}`))
});

//update exercise
router.route('/update/:id').post((req, res) => {
    exercise.findById(req.params.id)
            .then(exercise => {
                exercise.userName = req.body.userName,
                exercise.description = req.body.description,
                exercise.duration = Number(req.body.duration),
                exercise.date = Date.parse(req.body.date)

                exercise.save()
                        .then(() => res.json('Exercise updated'))
                        .catch(err => res.status(400).json(`Error: ${err}`))
            })
            .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;