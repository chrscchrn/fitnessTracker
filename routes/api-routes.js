//db
const db = require('../models')
module.exports = (app) => {

    //get all
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, workouts) => {
            if (err) {
                console.log(err);
            } else {
                res.json(workouts);
            }
        });
    });

    //add excerise, set id, push to model, set true
    app.put("/api/workouts/:workout", ({ params, body }, res) => {
        db.Workout.findOneAndUpdate(
            { _id: params.id },
            { $push: {excercises:body }},
            { upsert: true, useFindandModify:false },
            updatedWorkout => {
                res.json(updatedWorkout);
            })
    });

    //create workout
    app.post('/api/workouts', (req,res) => {
        db.Workout.create({}).then(newWorkout => {
            res.json(newWorkout);
        });
    });

    // get workout rangeW
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });
}
