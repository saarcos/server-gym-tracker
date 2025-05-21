import { DataTypes } from "sequelize";
import sequelize from "../db/client.js";

const RoutineExercise = sequelize.define('RoutineExercise', { // 👈 nombre más limpio (sin guion bajo)
    routineId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'routines',
            key: 'id'
        },
        allowNull: false
    },
    exercise_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rir: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
    },
    rm: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'routine_exercises'
});
export default RoutineExercise;