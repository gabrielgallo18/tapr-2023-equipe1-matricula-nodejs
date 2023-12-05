import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Matricula } from "../entites/matricula";
import { DaprClient } from "@dapr/dapr";
import daprClient from "../../common/daprclient";


class MatriculaServive {
    private container: Container =
        cosmosDb.container("matricula");

    async updateEvent(matricula: Matricula): Promise<Matricula> {
        await this.container.items.upsert(matricula);
        return Promise.resolve(matricula);
    }
}

export default new MatriculaServive();