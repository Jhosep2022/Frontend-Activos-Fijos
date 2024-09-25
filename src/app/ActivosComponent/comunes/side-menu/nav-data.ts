import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'usuarios',
    icon: 'fal fa-users',
    label: 'Usuarios',
    items: [
      {
        routeLink: '/usuarios/lista',
        label: 'Lista de usuarios',
      },
      {
        routeLink: '/usuarios/registro',
        label: 'Registrar usuario',
      },
      {
        routeLink: '/usuarios/actividades',
        label: 'Actividades de los usuarios',
      },
      {
        routeLink: '/usuarios/roles',
        label: 'Roles',
      },
    ],
  },
  {
    routeLink: 'activos',
    icon: 'fal fa-ballot',
    label: 'Activos',
    items: [
      {
        routeLink: '/activos/lista',
        label: 'Lista de activos',
      },
    ],
  },
  {
    routeLink: 'divisas',
    icon: 'fal fa-coins',
    label: 'Divisas',
    items: [
      {
        routeLink: '/divisas/lista',
        label: 'Lista de divisas',
      },
      {
        routeLink: '/divisas/registro',
        label: 'Registrar divisa',
      }
    ],
  },
];
