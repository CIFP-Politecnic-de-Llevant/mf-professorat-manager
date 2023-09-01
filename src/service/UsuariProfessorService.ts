import {axios} from "boot/axios";
import {UsuariProfessor} from "../model/UsuariProfessor";
import {UsuariService} from "./UsuariService";
import {DepartamentService} from "./DepartamentService";

export class UsuariProfessorService {
  static async findUsuaris(): Promise<Array<UsuariProfessor>> {
    const responseUsers = await axios.get(process.env.API + '/api/professoratmanager/usuari/llistat');
    const data = await responseUsers.data;
    const usuaris:Array<UsuariProfessor> = data.map((usuari: any): Promise<UsuariProfessor> => {
      return this.fromJSON(usuari).then(user=>{
        user.label = user.professor?.cognom1 + ' ' + user.professor?.cognom2 + ", " + user.professor?.nom;
        return user;
      })
    })

    usuaris.sort((a: UsuariProfessor, b: UsuariProfessor) => {
      if ((!a || !a.professor || !a.professor.nomComplet) && (!b || !b.professor || !b.professor.nomComplet)) {
        return 0;
      }
      if (!a || !a.professor || !a.professor.nomComplet) {
        return -1;
      }
      if (!b || !b.professor || !b.professor.nomComplet) {
        return 1;
      }
      return a.professor.nomComplet.localeCompare(b.professor.nomComplet)
    });

    return usuaris;

  }

  static async getById(id:number): Promise<UsuariProfessor> {
    const response = await axios.get(process.env.API + '/api/professoratmanager/usuari/getById/' + id);
    const data:any = await response.data;
    return this.fromJSON(data);
  }

  static async save(usuari:UsuariProfessor):Promise<void>{
    await axios.post(process.env.API + '/api/professoratmanager/usuari/desar',usuari);
  }

  static async fromJSON(json:any):Promise<UsuariProfessor>{
    const professor = (json.professor)?await UsuariService.fromJSON(json.professor):undefined;
    return {
      id: json.idUsuari,
      nom: json.nom,
      foto: json.foto,
      carrec1: json.carrec1,
      carrec2: json.carrec2,
      carrec3: json.carrec3,
      visible: json.visible,
      professor: professor,
      substitut: (json.substitut)?await this.fromJSON(json.substitut):undefined,
      departament: (json.departament)?await DepartamentService.fromJSON(json.departament):undefined,
      horariAtencioPares: (json.horariAtencioPares)?json.horariAtencioPares:undefined,
      tutoria: (json.tutoria)?json.tutoria:undefined,
      label: professor?.nomComplet||'',
      value: json.idUsuari
    }
  }
}
