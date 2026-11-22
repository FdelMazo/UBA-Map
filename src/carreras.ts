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
  {
    id: "economia-2024",
    link: "https://www.economicas.uba.ar/alumnos/economia",
    ano: 2024,
    graph: plan(require("./data/fce/economia-2024.json")),
    creditos: {
      // 4 materias de la orientación elegida
      electivas: 4,
    },
  },
  {
    id: "sistemas-2024",
    link: "https://www.economicas.uba.ar/alumnos/sistemas",
    ano: 2024,
    graph: plan(require("./data/fce/sistemas-2024.json")),
    creditos: {
      // 2 optativas
      electivas: 2,
    },
  },
  {
    id: "actuario-2024",
    link: "https://www.economicas.uba.ar/alumnos/actuario",
    ano: 2024,
    graph: plan(require("./data/fce/actuario-2024.json")),
    creditos: {
      // 2 materias entre electivas y optativas
      electivas: 2,
    },
  },
  {
    id: "trabajo-social-2012",
    link: "https://trabajosocial.sociales.uba.ar/plan-de-estudios/",
    ano: 2012,
    graph: plan(require("./data/fsoc/trabajo-social-2012.json")),
    creditos: {
      // 2 electivas de la lista + 1 optativa (oferta variable)
      electivas: 3,
    },
  },
  {
    id: "relaciones-del-trabajo-1985",
    link: "https://relacionesdeltrabajo.sociales.uba.ar/plan-estudios/",
    ano: 1985,
    graph: plan(require("./data/fsoc/relaciones-del-trabajo-1985.json")),
    creditos: {
      // 2 optativas (oferta variable, sin lista)
      electivas: 2,
    },
  },
  {
    id: "sociologia-1988",
    link: "https://sociologia.sociales.uba.ar/plan-de-estudios/",
    ano: 1988,
    graph: plan(require("./data/fsoc/sociologia-1988.json")),
    creditos: {
      // 6 Sociologías Especiales + 3 Teorías Sociológicas (oferta variable, sin lista). Las 200 hs de seminarios de investigación no las contamos
      electivas: 9,
    },
  },
  {
    id: "diseno-grafico-2018",
    link: "https://www.fadu.uba.ar/diseno-grafico/",
    ano: 2018,
    graph: plan(require("./data/fadu/diseno-grafico-2018.json")),
    creditos: {
      // 1 electiva de 2º año + 1 socio humanística + 2 de formación orientada. Las 180 hs de optativas no las contamos
      electivas: 4,
    },
  },
  {
    id: "diseno-de-indumentaria-2017",
    link: "https://www.fadu.uba.ar/diseno-de-indumentaria/",
    ano: 2017,
    graph: plan(require("./data/fadu/diseno-de-indumentaria-2017.json")),
    creditos: {
      // 2 optativas (sin lista)
      electivas: 2,
    },
  },
  {
    id: "diseno-textil-2017",
    link: "https://www.fadu.uba.ar/diseno-textil/",
    ano: 2017,
    graph: plan(require("./data/fadu/diseno-textil-2017.json")),
    creditos: {
      // 2 optativas (sin lista)
      electivas: 2,
    },
  },
  {
    id: "diseno-industrial-2018",
    link: "https://www.fadu.uba.ar/nuevo-plan-de-estudios-de-diseno-industrial/",
    ano: 2018,
    graph: plan(require("./data/fadu/diseno-industrial-2018.json")),
    // Electivas y optativas se cuentan en horas (120 + 120 hs), no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "diseno-de-imagen-y-sonido-2017",
    link: "https://www.fadu.uba.ar/diseno-de-imagen-y-sonido/",
    ano: 2017,
    graph: plan(require("./data/fadu/diseno-de-imagen-y-sonido-2017.json")),
    creditos: {
      // 8 materias de 60 hs: al menos 6 electivas de la lista y hasta 2 optativas por fuera
      electivas: 8,
    },
  },
  {
    id: "odontologia-2021",
    link: "https://odontologia.uba.ar/?page_id=14648",
    ano: 2021,
    graph: plan(require("./data/fouba/odontologia-2021.json")),
    creditos: {
      // 1 módulo electivo asistencial orientado. Los cursos optativos (20 hs) no los contamos
      electivas: 1,
    },
  },
  {
    id: "veterinaria-2009",
    link: "https://www.fvet.uba.ar/ensenanza-carreras-de-grado-veterinaria-plan-de-estudios/",
    ano: 2009,
    graph: plan(require("./data/fvet/veterinaria-2009.json")),
    creditos: {
      // 1 materia del Eje 6. Los cursos optativos (36 hs) no los contamos
      electivas: 1,
    },
  },
  {
    id: "farmacia-2023",
    link: "https://www.ffyb.uba.ar/grado-farmacia/",
    ano: 2023,
    graph: plan(require("./data/ffyb/farmacia-2023.json")),
    creditos: {
      // 1 materia de orientación + 2 optativas (de la oferta de cada año)
      electivas: 3,
    },
  },
  {
    id: "bioquimica-2023",
    link: "https://www.ffyb.uba.ar/grado-bioquimica/",
    ano: 2023,
    graph: plan(require("./data/ffyb/bioquimica-2023.json")),
    creditos: {
      // 1 materia de orientación + 5 optativas/electivas (de la oferta de cada año)
      electivas: 6,
    },
  },
  {
    id: "agronomia-2017",
    link: "https://www.agro.uba.ar/carreras/agronomia",
    ano: 2017,
    graph: plan(require("./data/fauba/agronomia-2017.json")),
    // Electivas y optativas se cuentan en créditos, no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "enfermeria-2019",
    link: "https://www.fmed.uba.ar/carreras/licenciatura-en-enfermeria/plan-de-estudios",
    ano: 2019,
    graph: plan(require("./data/fmed/enfermeria-2019.json")),
    // No tiene electivas
    creditos: {},
  },
  {
    id: "nutricion-1986",
    link: "https://www.fmed.uba.ar/carreras/licenciatura-en-nutricion/plan-de-estudios",
    ano: 1986,
    graph: plan(require("./data/fmed/nutricion-1986.json")),
    creditos: {
      // 3 electivas
      electivas: 3,
    },
  },
  {
    id: "kinesiologia-2019",
    link: "https://www.fmed.uba.ar/index.php/carreras/licenciatura-en-kinesiologia-y-fisiatria/plan-de-estudio",
    ano: 2019,
    graph: plan(require("./data/fmed/kinesiologia-2019.json")),
    // No tiene electivas
    creditos: {},
  },
  {
    id: "obstetricia-2011",
    link: "https://www.fmed.uba.ar/carreras/licenciatura-en-obstetricia/plan-de-estudios",
    ano: 2011,
    graph: plan(require("./data/fmed/obstetricia-2011.json")),
    creditos: {
      // 2 electivas
      electivas: 2,
    },
  },
  {
    id: "computacion-2023",
    link: "https://exactas.uba.ar/ensenanza/carreras-de-grado/ciencias-de-la-computacion/",
    ano: 2023,
    graph: plan(require("./data/fcen/computacion-2023.json")),
    // Las optativas se cuentan en créditos (16), no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "datos-2020",
    link: "https://exactas.uba.ar/ensenanza/carreras-de-grado/ciencias-de-datos/",
    ano: 2020,
    graph: plan(require("./data/fcen/datos-2020.json")),
    // Las optativas se cuentan en horas (640 hs), no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "historia-2024",
    link: "https://historia.filo.uba.ar/content/plan-de-estudios",
    ano: 2024,
    graph: plan(require("./data/ffyl/historia-2024.json")),
    creditos: {
      // 6 electivas: 3 del Ciclo de Formación General y 3 del Específico
      // Las obligatorias no tienen correlativas entre sí: las cadenas (cronológicas) son nuestras, para que se lea el mapa
      electivas: 6,
    },
  },
  {
    id: "traductorado-publico-2008",
    link: "https://www.derecho.uba.ar/academica/carreras_grado/traductorado.php",
    ano: 2008,
    graph: plan(require("./data/derecho/traductorado-publico-2008.json")),
    // No tiene electivas
    creditos: {},
  },
  {
    id: "ciencias-ambientales-2017",
    link: "https://www.agro.uba.ar/carreras/ambientales",
    ano: 2017,
    graph: plan(require("./data/fauba/ciencias-ambientales-2017.json")),
    // Electivas y optativas se cuentan en créditos, no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "economia-y-administracion-agrarias-2026",
    link: "https://www.agro.uba.ar/carreras/leaa",
    ano: 2026,
    graph: plan(require("./data/fauba/economia-y-administracion-agrarias-2026.json")),
    // Electivas y optativas se cuentan en horas, no en materias: por ahora no las contamos
    creditos: {},
  },
  {
    id: "planificacion-y-diseno-del-paisaje-2005",
    link: "https://www.fadu.uba.ar/lic-en-planificacion-y-diseno-del-paisaje/",
    ano: 2005,
    graph: plan(require("./data/fadu/planificacion-y-diseno-del-paisaje-2005.json")),
    creditos: {
      // 3 electivas (sin lista)
      electivas: 3,
    },
  },
  {
    id: "terapia-ocupacional-1994",
    link: "https://www.psi.uba.ar/academica.php?var=terapiaocupacional/index.php",
    ano: 1994,
    graph: plan(require("./data/psi/terapia-ocupacional-1994.json")),
    // No tiene electivas
    creditos: {},
  },
  {
    id: "musicoterapia-2017",
    link: "https://www.psi.uba.ar/academica.php?var=musicoterapia/index.php",
    ano: 2017,
    graph: plan(require("./data/psi/musicoterapia-2017.json")),
    // No tiene electivas
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
  {
    nombre: "Licenciatura en Economía",
    nombrecorto: "Economía",
    planes: ["economia-2024"],
  },
  {
    nombre: "Licenciatura en Sistemas de Información de las Organizaciones",
    nombrecorto: "Sistemas",
    planes: ["sistemas-2024"],
  },
  {
    nombre: "Actuario",
    nombrecorto: "Actuario",
    planes: ["actuario-2024"],
  },
  {
    nombre: "Licenciatura en Trabajo Social",
    nombrecorto: "Trabajo Social",
    planes: ["trabajo-social-2012"],
  },
  {
    nombre: "Licenciatura en Relaciones del Trabajo",
    nombrecorto: "Relaciones del Trabajo",
    planes: ["relaciones-del-trabajo-1985"],
  },
  {
    nombre: "Licenciatura en Sociología",
    nombrecorto: "Sociología",
    planes: ["sociologia-1988"],
  },
  {
    nombre: "Diseño Gráfico",
    nombrecorto: "Diseño Gráfico",
    planes: ["diseno-grafico-2018"],
  },
  {
    nombre: "Diseño de Indumentaria",
    nombrecorto: "Indumentaria",
    planes: ["diseno-de-indumentaria-2017"],
  },
  {
    nombre: "Diseño Textil",
    nombrecorto: "Textil",
    planes: ["diseno-textil-2017"],
  },
  {
    nombre: "Diseño Industrial",
    nombrecorto: "Industrial",
    planes: ["diseno-industrial-2018"],
  },
  {
    nombre: "Diseño de Imagen y Sonido",
    nombrecorto: "Imagen y Sonido",
    planes: ["diseno-de-imagen-y-sonido-2017"],
  },
  {
    nombre: "Odontología",
    nombrecorto: "Odontología",
    planes: ["odontologia-2021"],
  },
  {
    nombre: "Veterinaria",
    nombrecorto: "Veterinaria",
    planes: ["veterinaria-2009"],
  },
  {
    nombre: "Farmacia",
    nombrecorto: "Farmacia",
    planes: ["farmacia-2023"],
  },
  {
    nombre: "Bioquímica",
    nombrecorto: "Bioquímica",
    planes: ["bioquimica-2023"],
  },
  {
    nombre: "Agronomía",
    nombrecorto: "Agronomía",
    planes: ["agronomia-2017"],
  },
  {
    nombre: "Licenciatura en Enfermería",
    nombrecorto: "Enfermería",
    planes: ["enfermeria-2019"],
  },
  {
    nombre: "Licenciatura en Nutrición",
    nombrecorto: "Nutrición",
    planes: ["nutricion-1986"],
  },
  {
    nombre: "Licenciatura en Kinesiología y Fisiatría",
    nombrecorto: "Kinesiología",
    planes: ["kinesiologia-2019"],
  },
  {
    nombre: "Licenciatura en Obstetricia",
    nombrecorto: "Obstetricia",
    planes: ["obstetricia-2011"],
  },
  {
    nombre: "Licenciatura en Ciencias de la Computación",
    nombrecorto: "Computación",
    planes: ["computacion-2023"],
  },
  {
    nombre: "Licenciatura en Ciencias de Datos",
    nombrecorto: "Ciencias de Datos",
    planes: ["datos-2020"],
  },
  {
    nombre: "Licenciatura en Historia",
    nombrecorto: "Historia",
    planes: ["historia-2024"],
  },
  {
    nombre: "Traductorado Público",
    nombrecorto: "Traductorado",
    planes: ["traductorado-publico-2008"],
  },
  {
    nombre: "Licenciatura en Ciencias Ambientales",
    nombrecorto: "Ciencias Ambientales",
    planes: ["ciencias-ambientales-2017"],
  },
  {
    nombre: "Licenciatura en Economía y Administración Agrarias",
    nombrecorto: "Economía y Adm. Agrarias",
    planes: ["economia-y-administracion-agrarias-2026"],
  },
  {
    nombre: "Licenciatura en Planificación y Diseño del Paisaje",
    nombrecorto: "Diseño del Paisaje",
    planes: ["planificacion-y-diseno-del-paisaje-2005"],
  },
  {
    nombre: "Licenciatura en Terapia Ocupacional",
    nombrecorto: "Terapia Ocupacional",
    planes: ["terapia-ocupacional-1994"],
  },
  {
    nombre: "Licenciatura en Musicoterapia",
    nombrecorto: "Musicoterapia",
    planes: ["musicoterapia-2017"],
  },
];
