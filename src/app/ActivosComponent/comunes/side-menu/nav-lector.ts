import { INavbarData } from './helper';

export const navbarDataLector: INavbarData[] = [
  {
    routeLink: 'usuarios',
    icon: 'fal fa-users',
    label: 'Usuariosaaaa',
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
    icon: 'fal fa-ballot',
    label: 'Activos',
    items: [
        {
          routeLink: '/activos/lista',
          label: 'Lista de activos',
        },
        {
          routeLink: 'trading/sales',
          label: 'Sales',
          items: [
            {
              routeLink: '/activos/lista',
              label: 'Lista de activos',
            },
            {
              routeLink: '/trading/sales/possale',
              label: 'POS Sales',
            },
            {
              routeLink: '/trading/sales/managesale',
              label: 'Sales List',
            },
            {
              routeLink: '/trading/sales/salereturns',
              label: 'Sales Returns',
            }
          ],
        },
    ]

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
