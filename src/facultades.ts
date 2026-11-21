import { PLANES } from "./carreras";

// Agrupa las carreras (`PLANES`) por facultad para el selector de carreras

export type Plan = (typeof PLANES)[number];

export interface Facultad {
  nombre: string;
  nombrecorto: string;
  planes: Plan[];
}

const planes = (...nombrescortos: string[]) =>
  PLANES.filter((p) => nombrescortos.includes(p.nombrecorto));

export const FACULTADES: Facultad[] = [
  {
    nombre: "Facultad de Ciencias Económicas",
    nombrecorto: "FCE",
    planes: planes("Contador"),
  },
  {
    nombre: "Facultad de Psicología",
    nombrecorto: "PSI",
    planes: planes("Psicología"),
  },
];

export const TODOS_LOS_PLANES: Plan[] = FACULTADES.flatMap((f) => f.planes);
