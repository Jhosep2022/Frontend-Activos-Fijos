import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserInterfaceData, userData } from 'src/app/inventual/data/userData';
import { Store } from '@ngxs/store';
import { DeleteCurrency, GetCurrency } from '../state-management/divisa/divisa.action';
import { DivisaModel } from '../models/divisa.model';
import { Observable } from 'rxjs';
import { DivisaState } from '../state-management/divisa/divisa.state';
import { PdfreportService } from '../services/reportes/pdfreport.service';

@Component({
  selector: 'app-gestion-monedas',
  templateUrl: './gestion-monedas.component.html',
  styleUrls: ['./gestion-monedas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionMonedasComponent implements AfterViewInit {
  divisas$: Observable<DivisaModel[]>;
  displayedColumns: string[] = [
    'select',
    //'id',
    'name',
    'abreviacion',
    'valor',
    'action',
  ];
  dataSource: MatTableDataSource<DivisaModel> = new MatTableDataSource(); // Cambiado el tipo a `any`
  selection = new SelectionModel<DivisaModel>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private store: Store, public pdfreportService: PdfreportService) {
    this.divisas$ = this.store.select(DivisaState.getDivisa);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  generarPDF() {
    const monedasSeleccionados = this.selection.selected;
    this.pdfreportService.divisapdf(monedasSeleccionados);
  }

  eliminarDivisa(id: number) {    
    this.store.dispatch(new DeleteCurrency(id));
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
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
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
  //sidebar menu activation end

  ngOnInit(): void {
    // Despacha la acción para obtener los usuarios
    this.store.dispatch(new GetCurrency());

    // Suscríbete al observable para actualizar el dataSource
    this.divisas$.subscribe((divisas) => {
      this.dataSource.data = divisas; // Asigna los datos al dataSource
    });
  }
}
