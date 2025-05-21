import Joi from "joi";
import Routine from "../models/routineModel.js";
import RoutineExercise from "../models/routineExerciseModel.js";

const routineSchema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().min(3).required(),
    muscles: Joi.array().items(Joi.string()).required(),
    isTemplate: Joi.boolean().required(),
    exercises: Joi.array().items(
        Joi.object({
            exercise_id: Joi.string().required(),
            order: Joi.number().integer().required(),
            sets: Joi.number().integer().optional(),
            reps: Joi.number().integer().optional(),
            rir: Joi.number().optional(),
            rm: Joi.number().optional(),
        })
    ).required()
});
const createRoutine = async (req, res) => {
    const { error, value } = routineSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const { exercises, ...routineData } = value;
        const routine = await Routine.create(routineData);
        const exercisesToAdd = exercises.map((exercise) => ({ ...exercise, routineId: routine.id }));
        await RoutineExercise.bulkCreate(exercisesToAdd);
        res.status(200).json({
            success: true,
            message: 'Routine created succesfully!',
            routine,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getRoutinesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const routines = await Routine.findAll({
            where: { userId },
            include: [{ model: RoutineExercise, as: 'exercises' }]
        });
        res.json(routines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteRoutineById = async (req, res) => {
    try {
        const { routineId } = req.params;
        const routineToDelete = await Routine.findOne({ where: { id: routineId } });
        if (!routineToDelete) {
            return res.status(401).json({
                success: false, message: 'There\'s not such routine.'
            })
        }
        await routineToDelete.destroy();
        return res.status(200).json({
            success: true,
            message: 'Routine and its exercises deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}
export { createRoutine, getRoutinesByUser, deleteRoutineById }