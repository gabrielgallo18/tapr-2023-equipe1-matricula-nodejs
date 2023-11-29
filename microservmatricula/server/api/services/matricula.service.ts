import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Matricula } from "../entites/matricula";
import { DaprClient } from "@dapr/dapr";
import daprClient from "../../common/daprclient";


class MatriculaServive{
    private container:Container =
        cosmosDb.container("matricula");

    async publishEvent(matricula:Matricula): Promise<Matricula>{
        daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,
            process.env.APPCOMPONENTTOPICMATRICULA as string,matricula);
        return Promise.resolve(matricula);
    
    }
    
    async all(): Promise<Matricula[]>{
        const {resources: listaMatriculas}
            = await this.container.items.readAll<Matricula>().fetchAll();
        
        return Promise.resolve(listaMatriculas);
    }
    async getById(id:string): Promise<Matricula>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Matricula c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaMatriculas}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaMatriculas[0]);
    }
    async saveNew(matricula:Matricula): Promise<Matricula>{
        console.log(matricula);
        matricula.id = "";
        await this.container.items.create(matricula);
        // await this.publishEvent(matricula);
        return Promise.resolve(matricula);
    }
    async update(id:string, matricula:Matricula): Promise<Matricula>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Matricula c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaMatriculas}
            = await this.container.items.query(querySpec).fetchAll();
        const nomeAluno = listaMatriculas[0];

        //Atualizar os campos
        nomeAluno.aluno = matricula.aluno;
        
        await this.container.items.upsert(nomeAluno)
        await this.publishEvent(matricula);

        return Promise.resolve(nomeAluno);
    }
    async delete(id:string): Promise<string>{

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Matricula c WHERE c.id = @id",
            parameters: [
                { name: "@id", value: id }
            ]
        };
        const {resources: listaMatriculas}
            = await this.container.items.query(querySpec).fetchAll();
        for (const matricula of listaMatriculas) {
            await this.container.item(matricula.id,matricula.placa).delete();
        }
        
        return Promise.resolve(id);
    }
}

export default new MatriculaServive();