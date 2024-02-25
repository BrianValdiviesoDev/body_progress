import express from 'express';
import 'dotenv/config';
import expressConfig from './framework/express';
import errorHandlingMiddlware from './framework/error-handling';
import measureRouter from './measures/measure.routes';
const app = express();
expressConfig(app);

app.use(express.json());
app.use('/measures', measureRouter);
app.use(errorHandlingMiddlware);

export { app };