import { UserType } from "./types/User";

export const CARRERAS: UserType.Carrera[] = [
  {
    id: "contador-2019",
    link: "https://economicas.uba.ar/alumnos/contador/",
    ano: 2019,
    graph: require("./data/fce/contador-2019.json"),
    cuentaMaterias: true,
    creditos: {
      // Hay que aprobar 1 electiva u optativa
      electivas: 1,
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
];
