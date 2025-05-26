import { DataTypes } from "sequelize";
import sequelize from "../db/client.js";

const TrainingSeries = sequelize.define('TrainingSeries', {
    trainingSessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'training_session',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    routineExerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'routine_exercises',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reps: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2), 
        allowNull: false,
    },
    rir: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
    },
    rpe: {
        type: DataTypes.DECIMAL(3, 1), 
        allowNull: true,
    }
}, {
    timestamps: true,
    tableName: 'training_series',
    underscored: true
});

export default TrainingSeries;
