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
    planes: planes("Contador", "Administración", "Economía", "Sistemas", "Actuario"),
  },
  {
    nombre: "Facultad de Psicología",
    nombrecorto: "PSI",
    planes: planes("Psicología", "Terapia Ocupacional", "Musicoterapia"),
  },
  {
    nombre: "Facultad de Medicina",
    nombrecorto: "FMED",
    planes: planes("Medicina", "Enfermería", "Nutrición", "Kinesiología", "Obstetricia"),
  },
  {
    nombre: "Facultad de Arquitectura, Diseño y Urbanismo",
    nombrecorto: "FADU",
    planes: planes("Arquitectura", "Diseño Gráfico", "Indumentaria", "Textil", "Industrial", "Imagen y Sonido", "Diseño del Paisaje"),
  },
  {
    nombre: "Facultad de Derecho",
    nombrecorto: "DERECHO",
    planes: planes("Abogacía", "Traductorado"),
  },
  {
    nombre: "Facultad de Ciencias Sociales",
    nombrecorto: "FSOC",
    planes: planes("Trabajo Social", "Relaciones del Trabajo", "Sociología"),
  },
  {
    nombre: "Facultad de Odontología",
    nombrecorto: "FOUBA",
    planes: planes("Odontología"),
  },
  {
    nombre: "Facultad de Ciencias Veterinarias",
    nombrecorto: "FVET",
    planes: planes("Veterinaria"),
  },
  {
    nombre: "Facultad de Farmacia y Bioquímica",
    nombrecorto: "FFYB",
    planes: planes("Farmacia", "Bioquímica"),
  },
  {
    nombre: "Facultad de Agronomía",
    nombrecorto: "FAUBA",
    planes: planes("Agronomía", "Ciencias Ambientales", "Economía y Adm. Agrarias", "Diseño del Paisaje"),
  },
  {
    nombre: "Facultad de Ciencias Exactas y Naturales",
    nombrecorto: "FCEN",
    planes: planes("Computación", "Ciencias de Datos"),
  },
  {
    nombre: "Facultad de Filosofía y Letras",
    nombrecorto: "FFYL",
    planes: planes("Historia"),
  },
];

export const TODOS_LOS_PLANES: Plan[] = FACULTADES.flatMap((f) => f.planes);
