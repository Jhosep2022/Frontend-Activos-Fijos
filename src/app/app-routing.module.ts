import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivosLoginComponent } from './ActivosComponent/activos-login/activos-login.component';
import { RecuperarPasswordComponent } from './ActivosComponent/recuperar-password/recuperar-password.component';
import { GestionUsuariosComponent } from './ActivosComponent/gestion-usuarios/gestion-usuarios.component';
import { ListaActivosComponent } from './ActivosComponent/lista-activos/lista-activos.component';
import { RegistroUsuariosComponent } from './ActivosComponent/registro-usuarios/registro-usuarios.component';
import { GestionActividadesComponent } from './ActivosComponent/gestion-actividades/gestion-actividades.component';
import { ResgistroMonedasComponent } from './ActivosComponent/resgistro-monedas/resgistro-monedas.component';
import { GestionMonedasComponent } from './ActivosComponent/gestion-monedas/gestion-monedas.component';
import { RegistroActivosComponent } from './ActivosComponent/registro-activos/registro-activos.component';
import { GestionCustodiosComponent } from './ActivosComponent/gestion-custodios/gestion-custodios.component';
import { GestionProyectosComponent } from './ActivosComponent/gestion-proyectos/gestion-proyectos.component';
import { GestionUbicacionesComponent } from './ActivosComponent/gestion-ubicaciones/gestion-ubicaciones.component';
import { ActivoIndividualComponent } from './ActivosComponent/activo-individual/activo-individual.component';
import { GestionRolesComponent } from './ActivosComponent/gestion-roles/gestion-roles.component';
import { GestionAreasComponent } from './ActivosComponent/gestion-areas/gestion-areas.component';
import { GestionEmpresasComponent } from './ActivosComponent/gestion-empresas/gestion-empresas.component';
import { GestionCategoriasComponent } from './ActivosComponent/gestion-categorias/gestion-categorias.component';
import { GestionDepreciacionComponent } from './ActivosComponent/gestion-depreciacion/gestion-depreciacion.component';
import { GestionEstadousoComponent } from './ActivosComponent/gestion-estadouso/gestion-estadouso.component';
import { GestionIdentificadoresComponent } from './ActivosComponent/gestion-identificadores/gestion-identificadores.component';
import { GestionMarcasComponent } from './ActivosComponent/gestion-marcas/gestion-marcas.component';
import { GestionModelosComponent } from './ActivosComponent/gestion-modelos/gestion-modelos.component';
import { ActivoProyectoComponent } from './ActivosComponent/activo-proyecto/activo-proyecto.component';


const routes: Routes = [ 
  //Rutas ActivosFijos
  //Rutas comunes
  {
    path: '',
    component: ActivosLoginComponent,
    pathMatch: 'full' 
  },
  {
    path: 'recuperarpassword',
    component: RecuperarPasswordComponent
  },
  //Rutas de gestion de usuarios
  {
    path: 'usuarios/lista',
    component: GestionUsuariosComponent
  },
  {
    path: 'usuarios/registro',
    component: RegistroUsuariosComponent
  },
  {
    path: 'usuarios/actividades',
    component: GestionActividadesComponent
  },
  {
    path: 'usuarios/roles',
    component: GestionRolesComponent
  },
  //Rutas de activos fijos
  {
    path: 'activos/lista',
    component: ListaActivosComponent
  },
  {
    path: 'activos/registro',
    component: RegistroActivosComponent
  },
  {
    path: 'empresas',
    component: GestionEmpresasComponent
  },
  {
    path: 'areas',
    component: GestionAreasComponent
  },
  {
    path: 'custodios',
    component: GestionCustodiosComponent
  },
  {
    path: 'proyectos',
    component: GestionProyectosComponent
  },
  {
    path: 'ubicaciones',
    component: GestionUbicacionesComponent
  },
  {
    path: 'editar/activo',
    component: ActivoIndividualComponent
  },
  {
    path: 'editar/activoProyecto',
    component: ActivoProyectoComponent
  },
  {
    path: 'categorias',
    component: GestionCategoriasComponent
  },
  {
    path: 'depreciacion',
    component: GestionDepreciacionComponent
  },
  {
    path: 'estadouso',
    component: GestionEstadousoComponent
  },
  {
    path: 'identificadores',
    component: GestionIdentificadoresComponent
  },
  {
    path: 'modelos',
    component: GestionModelosComponent
  },
  {
    path: 'marcas',
    component: GestionMarcasComponent
  },
  //Rutas de monedas
  {
    path: 'divisas/lista',
    component: GestionMonedasComponent
  },
  {
    path: 'divisas/registro',
    component: ResgistroMonedasComponent
  },

  // Ruta comodín para redirigir a la pantalla de login de Activos Fijos
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
