import {Usuari} from "./Usuari";

export interface Departament {
  id: number;
  nom: string;
  gestibId: string;
  capDepartament?: Usuari;
}
