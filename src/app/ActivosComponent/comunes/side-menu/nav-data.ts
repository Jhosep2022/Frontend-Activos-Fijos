import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: '/dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'usuarios',
    icon: 'fal fa-box-open',
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
    ],
  },
  {
    routeLink: 'activos',
    icon: 'fal fa-sack-dollar',
    label: 'Activos',
    items: [
      {
        routeLink: '/activos/lista',
        label: 'Lista de activos',
      },
      {
        routeLink: '/activos/registro',
        label: 'Registrar activo',
      },
    ],
  },
  {
    routeLink: 'divisas',
    icon: 'fal fa-ballot',
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