import {Usuari} from "./Usuari";
import {Departament} from "./Departament";

export interface UsuariProfessor {
  id?: number;
  nom: string;
  foto?: string;
  carrec1?: string;
  carrec2?: string;
  carrec3?: string;
  visible: boolean;
  professor?: Usuari;
  departament?: Departament;
  substitut?: UsuariProfessor;
  horariAtencioPares?: string;
  tutoria?: string;
  label?: string;
  value?: string;
}
