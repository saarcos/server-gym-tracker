import User from './userModel.js';
import Routine from './routineModel.js';
import RoutineExercise from './routineExerciseModel.js';
import TrainingSession from './trainingSessionModel.js';
import TrainingSeries from './trainingSeries.js';

// Routine pertenece a un usuario
Routine.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Routine, { foreignKey: 'userId' });
User.hasMany(TrainingSession, { foreignKey: 'userId' });
// Routine tiene muchos RoutineExercises
Routine.hasMany(RoutineExercise, {
    foreignKey: 'routineId',
    as: 'exercises',
    onDelete: 'CASCADE',
    hooks: true,
});
Routine.hasMany(TrainingSession, { foreignKey: 'routineId' });

RoutineExercise.belongsTo(Routine, { foreignKey: 'routineId' });
TrainingSession.belongsTo(User, { foreignKey: 'userId' });
TrainingSession.belongsTo(Routine, { foreignKey: 'routineId' });

TrainingSeries.belongsTo(TrainingSession, { foreignKey: 'trainingSessionId' });
TrainingSeries.belongsTo(RoutineExercise, { foreignKey: 'routineExerciseId' });

TrainingSession.hasMany(TrainingSeries, { foreignKey: 'trainingSessionId' });
RoutineExercise.hasMany(TrainingSeries, { foreignKey: 'routineExerciseId' });
