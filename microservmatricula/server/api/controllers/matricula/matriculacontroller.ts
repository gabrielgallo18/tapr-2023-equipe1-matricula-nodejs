import {Request, Response} from 'express';
import MatriculaService from '../../services/matricula.service';

class MatriculaController{

    updateEvent(req:Request, res:Response): void{
        MatriculaService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }

}
export default new MatriculaController();