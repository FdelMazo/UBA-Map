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
    planes: planes("Contador", "Administración"),
  },
  {
    nombre: "Facultad de Psicología",
    nombrecorto: "PSI",
    planes: planes("Psicología"),
  },
  {
    nombre: "Facultad de Medicina",
    nombrecorto: "FMED",
    planes: planes("Medicina"),
  },
  {
    nombre: "Facultad de Arquitectura, Diseño y Urbanismo",
    nombrecorto: "FADU",
    planes: planes("Arquitectura"),
  },
  {
    nombre: "Facultad de Derecho",
    nombrecorto: "DERECHO",
    planes: planes("Abogacía"),
  },
];

export const TODOS_LOS_PLANES: Plan[] = FACULTADES.flatMap((f) => f.planes);
