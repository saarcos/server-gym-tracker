import { DataTypes } from 'sequelize';
import sequelize from "../db/client.js";

const TrainingSession = sequelize.define('TrainingSession', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'routines',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'training_session',
    timestamps: true,
    underscored: true
});

export default TrainingSession;
