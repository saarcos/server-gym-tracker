import Joi from 'joi'
import TrainingSession from '../models/trainingSessionModel.js';
import Routine from '../models/routineModel.js'
const trainingSessionSchema = Joi.object({
    userId: Joi.number().required(),
    routineId: Joi.number().required(),
})
const registerTrainingSession = async (req, res) => {
    const { error, value } = trainingSessionSchema.validate(req.body);
    if (error) {
        return res.status(401).json({
            success: false, message: error.details[0].message
        })
    }
    try {
        const { userId, routineId } = value;
        const routine = await Routine.findOne({ where: { id: routineId, userId } });
        if (!routine) {
            return res.status(403).json({
                success: false,
                message: "Routine does not belong to the user.",
            });
        }
        const training_session = await TrainingSession.create({ userId, routineId });
        return res.status(201).json({
            success: true, message: 'Training session created successfully!', training_session
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false, message: 'Something went wrong, please try again in a couple minutes.'
        })
    }
}
export { registerTrainingSession }