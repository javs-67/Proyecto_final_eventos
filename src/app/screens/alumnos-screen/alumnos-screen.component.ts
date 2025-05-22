import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-alumnos-screen',
  templateUrl: './alumnos-screen.component.html',
  styleUrls: ['./alumnos-screen.component.scss']
})
export class AlumnosScreenComponent implements OnInit {

  // Datos del usuario
  public name_user: string = "";
  public rol: string = "";
  public token: string = "";

  // Configuración de la tabla
  public lista_alumnos: any[] = [];
  displayedColumns: string[] = [
    'matricula',
    'nombre',
    'email',
    'fecha_nacimiento',
    'edad',
    'curp',
    'rfc',
    'telefono',
    'ocupacion',
    'editar',
    'eliminar'  // Eliminada columna 'eliminar'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private alumnosService: AlumnosService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.initUserData();
    this.obtenerAlumnos();
  }

  initUserData(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    this.token = this.facadeService.getSessionToken();

    if(!this.token) {
      this.router.navigate([""]);
    }
  }

  obtenerAlumnos(): void {
    this.alumnosService.obtenerListaAlumnos().subscribe(
      (response: any[]) => {
        this.lista_alumnos = response.map(alumno => ({
          ...alumno,
          clave_alumno: alumno.matricula || alumno.clave_alumno,
          fecha_de_Nacimiento: alumno.fecha_nacimiento || alumno.fecha_de_Nacimiento,
          first_name: alumno.user?.first_name || alumno.first_name,
          last_name: alumno.user?.last_name || alumno.last_name,
          email: alumno.user?.email || alumno.email
        }));

        this.dataSource = new MatTableDataSource<any>(this.lista_alumnos);
        this.initPaginator();
      },
      (error) => {
        console.error("Error:", error);
        alert("Error al cargar alumnos");
      }
    );
  }

  initPaginator(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      // Configuración en español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Anterior';
      this.paginator._intl.nextPageLabel = 'Siguiente';
    }, 500);
  }

  goEditar(idUser: number): void {
    this.router.navigate(["registro-usuarios/alumno/", idUser]);
  }
  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser, rol: 'alumno'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Alumno eliminado");
        //Recargar página
        alert("Alumno eliminado Corrcetamente");
        window.location.reload();
      }else{
        alert("Alumno no eliminado ");
        console.log("No se eliminó el alumno");
      }
    });
  }
}

