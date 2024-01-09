import {axios} from "boot/axios";
import {Usuari} from "../model/Usuari";

export class UsuariService {
  static async findUsuarisActius(includeGrup:boolean=false): Promise<Array<Usuari>> {
    const responseUsers = await axios.get(process.env.API + '/api/core/usuaris/llistat/actius');
    const data = await responseUsers.data;
    const usuaris = await Promise.all(data.map(async (usuari:any):Promise<Usuari>=>{
      return await this.fromJSON(usuari)
    }))
    //return usuaris;
    return usuaris.sort((a: Usuari, b: Usuari) => {
      if ((!a || !a.label) && (!b || !b.label)) {
        return 0;
      }
      if (!a || !a.label) {
        return -1;
      }
      if (!b || !b.label) {
        return 1;
      }
      return a.label.localeCompare(b.label)
    });
  }

  static async fromJSON(json:any):Promise<Usuari>{
    return {
      id: json.idusuari,
      email: json.gsuiteEmail,
      nom: json.gestibNom,
      cognom1: json.gestibCognom1,
      cognom2: json.gestibCognom2,
      nomComplet: json.gsuiteFullName,
      expedient: json.gestibExpedient,
      esAlumne: json.gestibAlumne,
      esProfessor: json.gestibProfessor,
      label: json.gestibCognom1 + ' ' + json.gestibCognom2 + ', '+ json.gestibNom,
      value: json.idusuari
    }
  }
}
