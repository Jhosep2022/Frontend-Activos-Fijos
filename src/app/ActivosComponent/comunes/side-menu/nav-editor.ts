import { INavbarData } from './helper';

export const navbarDataEditor: INavbarData[] = [
  {
    routeLink: 'activos',
    icon: 'fal fa-coins',
    label: 'Registro Activos',
    items: [
      {
        routeLink: '/activos/lista',
        icon: 'fal fa-ballot',
        label: 'Lista de Activos',
      },
      {
        routeLink: '/activos/registro',
        icon: 'fal fa-ballot',
        label: 'Registrar Activo',
      },
    ],
  },
  {
    routeLink: 'elemntos',
    icon: 'fal fa-coins',
    label: 'Elementos (Activos)',
    items: [
      {
        routeLink: '/custodios',
        icon: 'fal fa-ballot',
        label: 'Custodios',
      },
      {
        routeLink: '/ubicaciones',
        icon: 'fal fa-ballot',
        label: 'Ubicaciones',
      },
      {
        routeLink: '/categorias',
        icon: 'fal fa-ballot',
        label: 'Categorias',
      },
      {
        routeLink: '/marcas',
        icon: 'fal fa-ballot',
        label: 'Marcas',
      },
      {
        routeLink: '/modelos',
        icon: 'fal fa-ballot',
        label: 'Modelos',
      },
      {
        routeLink: '/estadouso',
        icon: 'fal fa-ballot',
        label: 'Estado de Uso',
      },
      {
        routeLink: '/identificadores',
        icon: 'fal fa-ballot',
        label: 'Identificadores',
      },
      {
        routeLink: '/depreciacion',
        icon: 'fal fa-ballot',
        label: 'Depreciaciones',
      },
    ],
  },
  {
    routeLink: 'organizacion',
    icon: 'fal fa-coins',
    label: 'Organización (Activos)',
    items: [
      {
        routeLink: '/empresas',
        icon: 'fal fa-ballot',
        label: 'Empresas',
      },
      {
        routeLink: '/areas',
        icon: 'fal fa-ballot',
        label: 'Areas',
      },
      {
        routeLink: '/proyectos',
        icon: 'fal fa-ballot',
        label: 'Proyectos',
      },
    ],
  },
  {
    routeLink: 'editar',
    icon: 'fal fa-coins',
    label: 'Edición Activos',
    items: [
      {
        routeLink: '/editar/activo',
        label: 'Editar Activo (Individual)',
      },
      {
        routeLink: '/editar/activoProyecto',
        label: 'Editar Activos por Proyecto',
      }
    ],
  },
];
