import User from './userModel.js';
import Routine from './routineModel.js';
import RoutineExercise from './routineExerciseModel.js';

// Routine pertenece a un usuario
Routine.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Routine, { foreignKey: 'userId' });

// Routine tiene muchos RoutineExercises
Routine.hasMany(RoutineExercise, {
    foreignKey: 'routineId',
    as: 'exercises',
    onDelete: 'CASCADE',
    hooks: true, // necesario para que funcione con .destroy()
});

RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId' });