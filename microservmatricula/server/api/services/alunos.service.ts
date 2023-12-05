import { Container, SqlQuerySpec } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Alunos } from "../entites/alunos";

class AlunosService{
    private container:Container =
        cosmosDb.container("alunos");
    
    async all(): Promise<Alunos[]>{
        const {resources: listaAlunos}
            = await this.container.items.readAll<Alunos>().fetchAll();
        
        return Promise.resolve(listaAlunos);
    }
    async getById(id:string): Promise<Alunos>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Aluno c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaAlunos}
            = await this.container.items.query(querySpec).fetchAll();
        
        return Promise.resolve(listaAlunos[0]);
    }
    async saveNew(alunos:Alunos): Promise<Alunos>{
        alunos.id = "";
        await this.container.items.create(alunos);
        
        return Promise.resolve(alunos);
    }
    async update(id:string, alunos:Alunos): Promise<Alunos>{
        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Alunos c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaAlunos}
            = await this.container.items.query(querySpec).fetchAll();
        const nomeAluno = listaAlunos[0];
        if(alunos == undefined){
            return Promise.reject();
        }
        //Atualizar os campos
        alunos.nome = alunos.nome;
        
        await this.container.items.upsert(alunos.nome)
        
        return Promise.resolve(nomeAluno);
    }
    async delete(id:string): Promise<string>{

        const querySpec: SqlQuerySpec = {
            query: "SELECT * FROM Alunos c WHERE c.id = @id",
            parameters: [
                {name: "@id", value: id}
            ]
            };
        const {resources: listaAlunos}
            = await this.container.items.query(querySpec).fetchAll();
        for (const aluno of listaAlunos) {
            await this.container.item(aluno.id).delete();
        }
        
        return Promise.resolve(id);
    }
}

export default new AlunosService();