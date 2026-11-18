import { PLANES } from "./carreras";

// Agrupa las carreras (`PLANES`) por facultad para el selector de carreras
// Las carreras de FIUBA vienen de `carreras.ts` (compartido con FIUBA-Map)
// Las de las demás facultades se suman acá como entradas nuevas

export type Plan = (typeof PLANES)[number];

export interface Facultad {
  nombre: string;
  nombrecorto: string;
  planes: Plan[];
}

// DUMMY: Sistemas movida a otra facultad para ver el dropdown con más de un grupo. Sacar.
const DUMMY = ["Sistemas"];

export const FACULTADES: Facultad[] = [
  {
    nombre: "Facultad de Ingeniería",
    nombrecorto: "FIUBA",
    planes: PLANES.filter((p) => !DUMMY.includes(p.nombrecorto)),
  },
  {
    nombre: "Facultad de Ciencias Exactas y Naturales",
    nombrecorto: "FCEN",
    planes: PLANES.filter((p) => DUMMY.includes(p.nombrecorto)),
  },
];

export const TODOS_LOS_PLANES: Plan[] = FACULTADES.flatMap((f) => f.planes);
