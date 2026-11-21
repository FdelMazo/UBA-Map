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
    id: "administracion-2024",
    link: "https://www.economicas.uba.ar/alumnos/administracion",
    ano: 2024,
    graph: plan(require("./data/fce/administracion-2024.json")),
    creditos: {
      // 4 optativas: 2 de una orientación y 2 de competencias
      electivas: 4,
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
  {
    id: "medicina-2024",
    link: "https://www.fmed.uba.ar/carreras/medicina/plan-de-estudios-24-rescs-2023-1217-uba-rec",
    ano: 2024,
    graph: plan(require("./data/fmed/medicina-2024.json")),
    // No tiene electivas
    creditos: {},
  },
  {
    id: "arquitectura-2014",
    link: "https://www.fadu.uba.ar/carrera/arquitectura/",
    ano: 2014,
    graph: plan(require("./data/fadu/arquitectura-2014.json")),
    // Las optativas se cuentan en horas (240 hs), no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "abogacia-2004",
    link: "https://www.derecho.uba.ar/academica/carreras_grado/abogacia.php",
    ano: 2004,
    graph: plan(require("./data/derecho/abogacia-2004.json")),
    // Los cursos del CPO (orientación, libres, departamentos) se cuentan en puntos, no en materias: por ahora no los contamos
    creditos: {},
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
    nombre: "Licenciatura en Administración",
    nombrecorto: "Administración",
    planes: ["administracion-2024"],
  },
  {
    nombre: "Licenciatura en Psicología",
    nombrecorto: "Psicología",
    planes: ["psicologia-1985"],
  },
  {
    nombre: "Medicina",
    nombrecorto: "Medicina",
    planes: ["medicina-2024"],
  },
  {
    nombre: "Arquitectura",
    nombrecorto: "Arquitectura",
    planes: ["arquitectura-2014"],
  },
  {
    nombre: "Abogacía",
    nombrecorto: "Abogacía",
    planes: ["abogacia-2004"],
  },
];
