import { INavbarData } from './helper';

export const navbarDataEditor: INavbarData[] = [
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
  {
    routeLink: 'editar',
    icon: 'fal fa-coins',
    label: 'Editar Activos',
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
  {
    routeLink: '/proyectos',
    icon: 'fal fa-ballot',
    label: 'Proyectos',
  },
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
];