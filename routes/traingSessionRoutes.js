import express from 'express'
import { registerTrainingSession } from '../controllers/trainingSessionController.js';
const trainingSessionRouter = express.Router();

trainingSessionRouter.post('/create-session', registerTrainingSession);

export default trainingSessionRouter;