import express from 'express'
import { createRoutine, deleteRoutineById, getRoutineById, getRoutinesByUser } from '../controllers/routineController.js';

const routineRouter = express.Router();

routineRouter.post('/create-routine', createRoutine);
routineRouter.get('/get-routines-by-user/:userId', getRoutinesByUser);
routineRouter.get('/get-routine-by-id/:routineId', getRoutineById);
routineRouter.delete('/delete-routine-by-id/:routineId', deleteRoutineById)

export default routineRouter;