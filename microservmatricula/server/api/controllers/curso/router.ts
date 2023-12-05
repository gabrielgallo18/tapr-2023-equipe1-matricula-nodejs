import express from 'express';
import controller from './cursocontroller';

export default express
    .Router()
    .post('/event', controller.updateEvent);