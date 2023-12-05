import { Request, Response } from 'express';
import CursoService from '../../services/curso.service';

class CursoController {
    updateEvent(req: Request, res: Response): void {
        CursoService.updateEvent(req.body.data).then((r) => res.json(r)).catch(() => res.status(404).end());
    }
}
export default new CursoController();