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
    NgxsModule.forRoot([RolState, UserState]),  // Registra tu estado de usuarios
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
  ],
})
export class ActivosProyectModule {}
