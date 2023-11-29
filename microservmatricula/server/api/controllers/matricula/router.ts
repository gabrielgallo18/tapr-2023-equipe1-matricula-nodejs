// import { Application } from "express";
// import examplesRouter from './api/controllers/examples/router';
// import matriculaRouter from './api/controllers/matricula/router';

// export default function routes(app: Application): void{
//     app.use('/api/v1/examples', examplesRouter);
//     app.use('/api/v1/matricula', matriculaRouter);
// }

// import express from 'express';
import express from 'express';
import controller from './matriculacontroller';

export default express
    .Router()
    .get('/', controller.all)
    .get('/:id', controller.getById)
    .post('/', controller.post)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);