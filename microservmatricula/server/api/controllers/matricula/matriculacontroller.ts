import {Request, Response} from 'express';
import MatriculaService from '../../services/matricula.service';

class MatriculaController{
    all(_:Request, res:Response): void{
        MatriculaService.all().then((r: any) => res.json(r));
    }
    getById(req:Request, res:Response): void{
        MatriculaService.getById(req.params['id']).then((r: any) => res.json(r));
    }
    post(req:Request, res:Response): void{
        console.log("passou");
        console.log(req.body);
        MatriculaService.saveNew(req.body).then((r: any) => res.json(r));
    }
    update(req:Request, res:Response): void{
        MatriculaService.update(req.params['id'],req.body).then((r: any) => res.json(r));
    }
    delete(req:Request, res:Response): void{
        MatriculaService.delete(req.params['id']).then((r: any) => res.json(r));
    }
    
}
export default new MatriculaController();