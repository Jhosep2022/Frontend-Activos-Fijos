import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IdentificadoresModel, IdentificadoresStringModel } from '../models/identificadores.model';
import { AddIdentificador, DeleteIdentificador, GetIdentificador, UpdateIdentificador } from '../state-management/identificadores/identificadores.action';
import { IdentificadorState } from '../state-management/identificadores/identificadores.state';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsAccessService } from '../services/dialogs/dialogs-access.service';
import { GetActivo } from '../state-management/activos/activos.action';
import { ActivosModel } from '../models/activos.model';
import { ActivoState } from '../state-management/activos/activos.state';
import { CalcularDepreciacionService } from '../services/calcular-depreciacion.service';
import { CsvreportService } from '../services/reportes/csvreport.service';
import { PdfreportService } from '../services/reportes/pdfreport.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gestion-identificadores',
  templateUrl: './gestion-identificadores.component.html',
  styleUrls: ['./gestion-identificadores.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionIdentificadoresComponent implements AfterViewInit {
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  displayedColumns: string[] = [
    'select',
    'idActivo',
    'codigoQr',
    'codigoBarra',
    'action',
  ];
  
  identificadores$: Observable<IdentificadoresModel[]>;  
  activos$: Observable<ActivosModel[]>;
  activos: ActivosModel[] = [];

  dataSource: MatTableDataSource<IdentificadoresStringModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<IdentificadoresModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService, public calcularDepreciacionService: CalcularDepreciacionService, public csvreportService: CsvreportService, public dialogsAccessService: DialogsAccessService) {
    // Assign your data array to the data source
    this.myAngularxQrCode = 'Data QR Vacia';
    this.activos$ = this.store.select(ActivoState.getActivos);
    this.identificadores$ = this.store.select(IdentificadorState.getIdentificadores);
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IdentificadoresModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.idIdentificador + 1
    }`;
  }

  //sidebar menu activation start
  menuSidebarActive: boolean = false;
  myfunction() {
    if (this.menuSidebarActive == false) {
      this.menuSidebarActive = true;
    } else {
      this.menuSidebarActive = false;
    }
  }

  getActivoName(rolId: number): string {
    if (!this.activos.length) {
      return 'Cargando...'; // Si los roles aún no se han cargado
    }
    const activo = this.activos.find((r) => r.idActivo === rolId);
    return activo ? activo.nombre : 'Sin Activo';  // Devuelve el nombre del rol o "Sin Rol" si no se encuentra
  }

  transformarDatosString(){
    const listaActual$: Observable<IdentificadoresModel[]> = this.identificadores$;
    const listaModificada$: Observable<IdentificadoresStringModel[]> = listaActual$.pipe(
      map((objetos: IdentificadoresModel[]) =>
        objetos.map((objeto: IdentificadoresModel) => ({
          idIdentificador: objeto.idIdentificador,
          codigoQr: objeto.codigoQr,
          codigoBarra: objeto.codigoBarra,
          idActivo: objeto.idActivo,
          idActivostring: this.getActivoName(objeto.idActivo),
        }))
      )
    );    
    return listaModificada$;
  }
  //sidebar menu activation end

  generarPDF() {
    //const identificadoresSeleccionados = this.selection.selected;
    //this.pdfreportService.identi(identificadoresSeleccionados);
  }

  generarCSV() {
    //const marcasSeleccionados = this.selection.selected;
    //this.csvreportService.marcasCSV(marcasSeleccionados);
  }

  ngOnInit(): void {
    this.store.dispatch([new GetIdentificador(), new GetActivo()]);
    this.transformarDatosString().subscribe((identificadores) => {
      this.dataSource.data = identificadores; // Asigna los datos al dataSource
    });
    this.activos$.subscribe((activos) => {
      this.activos = activos;
    });
  }
}
