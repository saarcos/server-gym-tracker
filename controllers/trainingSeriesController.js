import Joi from "joi";
import TrainingSeries from "../models/trainingSeries.js";

const setSchema = Joi.object({
    trainingSessionId: Joi.number().required(),
    routineExerciseId: Joi.number().required(),
    order: Joi.number().required(),
    reps: Joi.number().min(1).required(),
    weight: Joi.number().min(0).required(),
    rir: Joi.number().min(0).max(10).optional(),
    rpe: Joi.number().min(0).max(10).optional(),
});


const registerSet = async (req, res) => {
    const { error, value } = setSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const newSet = await TrainingSeries.create(value);
        return res.status(201).json({
            success: true,
            message: "Set registered successfully!",
            set: newSet,
        });
    } catch (err) {
        console.error("Error creating set:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering the set.",
        });
    }
};
const updateSet = async (req, res) => {
    const { setId } = req.params;

    const { error, value } = setSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    try {
        const [updatedRows] = await TrainingSeries.update(value, {
            where: { id: setId }
        });

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Set not found or no changes made.",
            });
        }

        const updatedSet = await TrainingSeries.findByPk(setId);

        return res.status(200).json({
            success: true,
            message: "Set updated successfully!",
            set: updatedSet,
        });

    } catch (err) {
        console.error("Error updating set:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the set.",
        });
    }
};


export { registerSet, updateSet};
