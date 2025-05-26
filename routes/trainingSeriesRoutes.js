import express from 'express'
import { registerSet, updateSet } from '../controllers/trainingSeriesController.js';
const trainingSeriesRouter = express.Router();

trainingSeriesRouter.post('/create-serie', registerSet);
trainingSeriesRouter.put('/update-serie/:setId', updateSet)
export default trainingSeriesRouter;