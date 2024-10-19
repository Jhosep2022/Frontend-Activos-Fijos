import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { ActivosLoginComponent } from "./activos-login/activos-login.component";
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { GestionActividadesComponent } from './gestion-actividades/gestion-actividades.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { SideMenuComponent } from './comunes/side-menu/side-menu.component';
import { CabeceraComponent } from './comunes/cabecera/cabecera.component';
import { SublevelMenuComponent } from "./comunes/side-menu/sublevel-menu.component";
import { FilterIconComponent } from "./comunes/icons/filter-icon/filter-icon.component";
import { PdfIconComponent } from "./comunes/icons/pdf-icon/pdf-icon.component";
import { CsvIconComponent } from "./comunes/icons/csv-icon/csv-icon.component";
import { PrinterIconComponent } from "./comunes/icons/printer-icon/printer-icon.component";
import { BellIconComponent } from "./comunes/icons/bell-icon/bell-icon.component";
import { EmailIconComponent } from "./comunes/icons/email-icon/email-icon.component";
import { GlobeIconComponent } from "./comunes/icons/globe-icon/globe-icon.component";
import { ListaActivosComponent } from './lista-activos/lista-activos.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { GestionMonedasComponent } from './gestion-monedas/gestion-monedas.component';
import { ResgistroMonedasComponent } from './resgistro-monedas/resgistro-monedas.component';
import { RegistroActivosComponent } from './registro-activos/registro-activos.component';
import { ActivoIndividualComponent } from './activo-individual/activo-individual.component';
import { ActivoProyectoComponent } from './activo-proyecto/activo-proyecto.component';
import { GestionProyectosComponent } from './gestion-proyectos/gestion-proyectos.component';
import { GestionCustodiosComponent } from './gestion-custodios/gestion-custodios.component';
import { GestionUbicacionesComponent } from './gestion-ubicaciones/gestion-ubicaciones.component';
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { UserState } from "./state-management/user/user.state";
import { GestionRolesComponent } from './gestion-roles/gestion-roles.component';
import { RolState } from "./state-management/rol/rol.state";
import { DivisaState } from "./state-management/divisa/divisa.state";
import { ActivoState } from "./state-management/activos/activos.state";
import { CustodiosState } from "./state-management/custodios/custodios.state";
import { GestionAreasComponent } from './gestion-areas/gestion-areas.component';
import { GestionEmpresasComponent } from './gestion-empresas/gestion-empresas.component';
import { EmpresasState } from "./state-management/empresa/empresa.state";
import { AreasState } from "./state-management/area/area.state";
import { ProyectoState } from "./state-management/proyecto/proyecto.state";
import { PaisState } from "./state-management/ubicacion/pais/pais.state";
import { DepartamentoState } from "./state-management/ubicacion/departamento/departamento.state";
import { ProvinciaState } from "./state-management/ubicacion/provincia/provincia.state";
import { MunicipioState } from "./state-management/ubicacion/municipio/municipio.state";
import { SucursalState } from "./state-management/ubicacion/sucursal/sucursal.state";
import { BloqueState } from "./state-management/ubicacion/bloque/bloque.state";
import { AulaState } from "./state-management/ubicacion/aula/aula.state";
import { DireccionState } from "./state-management/ubicacion/direccion/direccion.state";
import { PaisDialogComponent } from './comunes/direccionDialogs/pais-dialog/pais-dialog.component';
import { DepartamentoDialogComponent } from './comunes/direccionDialogs/departamento-dialog/departamento-dialog.component';
import { ProvinciaDialogComponent } from './comunes/direccionDialogs/provincia-dialog/provincia-dialog.component';
import { MunicipioDialogComponent } from './comunes/direccionDialogs/municipio-dialog/municipio-dialog.component';
import { SucursalDialogComponent } from './comunes/direccionDialogs/sucursal-dialog/sucursal-dialog.component';
import { BloqueDialogComponent } from './comunes/direccionDialogs/bloque-dialog/bloque-dialog.component';
import { AulaDialogComponent } from './comunes/direccionDialogs/aula-dialog/aula-dialog.component';
import { DireccionDialogComponent } from './comunes/direccionDialogs/direccion-dialog/direccion-dialog.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
import { GestionDepreciacionComponent } from './gestion-depreciacion/gestion-depreciacion.component';
import { GestionEstadousoComponent } from './gestion-estadouso/gestion-estadouso.component';
import { GestionIdentificadoresComponent } from './gestion-identificadores/gestion-identificadores.component';
import { CategoriaState } from "./state-management/categoria/categoria.state";
import { DepreciacionState } from "./state-management/depreciaciones/depreciacion.state";
import { IdentificadorState } from "./state-management/identificadores/identificadores.state";
import { EstadoState } from "./state-management/estado/estado.state";
import { GestionMarcasComponent } from './gestion-marcas/gestion-marcas.component';
import { GestionModelosComponent } from './gestion-modelos/gestion-modelos.component';
import { MarcaState } from "./state-management/marca/marca.state";
import { ModeloState } from "./state-management/modelo/modelo.state";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatCardModule,
    MatListModule,
    NgApexchartsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    DragDropModule,
    NgxsModule.forRoot([RolState, UserState, DivisaState, ActivoState, CustodiosState, EmpresasState, AreasState, ProyectoState, PaisState, DepartamentoState, ProvinciaState, MunicipioState, SucursalState, BloqueState, AulaState, DireccionState, CategoriaState, DepreciacionState, IdentificadorState, EstadoState, MarcaState, ModeloState]),  // Registra tu estado de usuarios
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot() 
  ],
  declarations: [
    ActivosLoginComponent,
    RecuperarPasswordComponent,
    GestionActividadesComponent,
    GestionUsuariosComponent,
    SideMenuComponent,
    CabeceraComponent,
    SublevelMenuComponent,
    FilterIconComponent,
    PdfIconComponent,
    CsvIconComponent,
    PrinterIconComponent,
    BellIconComponent,
    EmailIconComponent,
    GlobeIconComponent,
    ListaActivosComponent,
    RegistroUsuariosComponent,
    GestionMonedasComponent,
    ResgistroMonedasComponent,
    RegistroActivosComponent,
    ActivoIndividualComponent,
    ActivoProyectoComponent,
    GestionProyectosComponent,
    GestionCustodiosComponent,
    GestionUbicacionesComponent,
    GestionRolesComponent,
    GestionAreasComponent,
    GestionEmpresasComponent,
    PaisDialogComponent,
    DepartamentoDialogComponent,
    ProvinciaDialogComponent,
    MunicipioDialogComponent,
    SucursalDialogComponent,
    BloqueDialogComponent,
    AulaDialogComponent,
    DireccionDialogComponent,
    GestionCategoriasComponent,
    GestionDepreciacionComponent,
    GestionEstadousoComponent,
    GestionIdentificadoresComponent,
    GestionMarcasComponent,
    GestionModelosComponent,
  ],
})
export class ActivosProyectModule {}
