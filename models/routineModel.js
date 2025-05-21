import { DataTypes } from "sequelize";
import sequelize from "../db/client.js";

const Routine = sequelize.define('Routine', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    muscles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    isTemplate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    timestamps: true,
    tableName: 'routines'
});

export default Routine;