import { UserType } from "./types/User";

// En los jsons `creditos` es opcional: si no esta, la materia vale 1 (una materia mas)
const plan = (
  materias: (Omit<UserType.MateriaJSON, "creditos"> & { creditos?: number })[],
): UserType.MateriaJSON[] =>
  materias.map((m) => ({ ...m, creditos: m.creditos ?? 1 }));

export const CARRERAS: UserType.Carrera[] = [
  {
    id: "contador-2019",
    link: "https://economicas.uba.ar/alumnos/contador/",
    ano: 2019,
    graph: plan(require("./data/fce/contador-2019.json")),
    creditos: {
      // 2 optativas: de la lista de electivas, o materias por fuera del plan
      electivas: 2,
    },
  },
  {
    id: "psicologia-1985",
    link: "https://www.psi.uba.ar/academica.php?var=psicologia/index.php",
    ano: 1985,
    graph: plan(require("./data/psi/psicologia-1985.json")),
    creditos: {
      // 5 electivas: 2 del Ciclo de Formación General y 3 del Profesional
      // (una de las del CFP puede ser una segunda Práctica Profesional y de Investigación)
      electivas: 5,
    },
  },
];

// Acá se define como se le presentan al usuario la lista de planes/carreras
// Todos los ids de `CARRERAS` tienen que estar usados acá
export const PLANES: {
  nombre: string;
  nombrecorto: string;
  planes: string[];
}[] = [
  {
    nombre: "Contador Público",
    nombrecorto: "Contador",
    planes: ["contador-2019"],
  },
  {
    nombre: "Licenciatura en Psicología",
    nombrecorto: "Psicología",
    planes: ["psicologia-1985"],
  },
];
