import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Curso } from "../entites/curso";

class CursoService {
    private container: Container =
        cosmosDb.container("curso");

    async updateEvent(curso: Curso): Promise<Curso> {
        await this.container.items.upsert(curso);
        return Promise.resolve(curso);
    }
}

export default new CursoService();