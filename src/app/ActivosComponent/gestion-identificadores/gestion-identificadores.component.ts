import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ViewChildren, QueryList } from '@angular/core';

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
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-gestion-identificadores',
  templateUrl: './gestion-identificadores.component.html',
  styleUrls: ['./gestion-identificadores.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionIdentificadoresComponent implements AfterViewInit {
  @ViewChildren('barcode') barcodeCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";  
  barcodeValue: string = '1234567890'; // El valor del código de barras
  displayedColumns: string[] = [
    'select',
    'idActivo',
    'codigoQr',
    'codigoBarra'
  ];

  identificador: IdentificadoresModel = {
    idIdentificador: 0,
    codigoQr: '',
    codigoBarra: '',
    idActivo: 0
  }
  
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

  onChangeURL(url: SafeUrl, codigoBarra: string) {
    this.qrCodeDownloadLink = url;
    this.barcodeValue = codigoBarra;
  }  
  ngAfterViewChecked() {
    // Verificar que haya canvas disponibles
    if (this.barcodeCanvases && this.barcodeCanvases.length) {
      this.barcodeCanvases.forEach((canvas, index) => {
        JsBarcode(canvas.nativeElement, this.dataSource.data[index].codigoBarra, {
          format: 'CODE128',
          width: 2,
          height: 100,
          displayValue: true
        });
      });
    }
  }
  extractBarcodeValue(url: SafeUrl): string {
    // Aquí puedes hacer lo que necesites para obtener el valor correcto
    // Ejemplo: Si tu URL contiene un parámetro que es el valor para el código de barras
    const urlString = url.toString();
    // Lógica para extraer el valor
    return urlString.split('?')[1] || 'default';  // Ejemplo para extraer algo de la URL
  }

  generateBarcode(canvas: HTMLCanvasElement, barcodeValue: string): void {
    JsBarcode(canvas, barcodeValue, {
      format: 'CODE128',
      width: 2,
      height: 100,
      displayValue: true
    });
  }

  // Función para generar código de barras y descargarlo
  downloadBarcode(barcodeId: string): void {
    // Obtenemos el canvas correspondiente por su ID
    const canvas = document.getElementById(barcodeId) as HTMLCanvasElement;

    if (canvas) {
      // Convertir el canvas en una imagen base64
      const imageUrl = canvas.toDataURL('image/png');

      // Crear un enlace de descarga
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `${barcodeId}.png`; // Nombre del archivo
      link.click(); // Hacer click en el enlace para iniciar la descarga
    }
  }

  ngAfterViewInit() {
    this.store.dispatch([new GetIdentificador(), new GetActivo()]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Generar código de barras después de que la vista se haya inicializado
    this.barcodeCanvases?.forEach((canvas, index) => {
      const barcodeValue = this.dataSource.data[index].codigoBarra;
      JsBarcode(canvas.nativeElement, barcodeValue, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true
      });
    });
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
    const identificadoresSeleccionados = this.selection.selected;
    this.pdfreportService.identificadorespdf(identificadoresSeleccionados,this.activos);
  }

  generarCSV() {
    const marcasSeleccionados = this.selection.selected;
    //this.csvreportService.identi(marcasSeleccionados);
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
