import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradoresService } from 'src/app/services/administradores.service';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {

  public total_user: any = {};

  // Gráficas de eventos (línea y barras)
  lineChartDataEventos = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [34, 43, 54, 28, 74, 50, 65],
        label: 'Registro de materias',
        backgroundColor: '#F88406',
      }
    ]
  }

  linechartOptionEventos = {
    responsive: false
  }

  lineChartPluginsEventos = [DatalabelsPlugin];

  barChartDataEventos = {
    labels: ["Congreso", "Fepro", "Presentación doctoral", "Feria matemáticas", "T_Systems"],
    datasets: [
      {
        data: [34, 43, 54, 28, 74],
        label: 'Eventos realizados',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
          '#FB82F5',
          '#2AD84A'
        ]
      }
    ]
  }

  barChartOptionEventos = {
    responsive: false,
  }

  barChartPluginsEventos = [DatalabelsPlugin];

  // Gráficas de usuarios (pie y doughnut)
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],  // Datos iniciales, se actualizarán
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }

  pieChartOption = {
    responsive: false,
  }

  pieChartPlugins = [DatalabelsPlugin];

  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],  // Datos iniciales, se actualizarán
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }

  doughnutChartOption = {
    responsive: false,
  }

  doughnutChartPlugins = [DatalabelsPlugin];

  constructor(
    private administradoresService: AdministradoresService,
  ) { }

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  public obtenerTotalUsers() {
    this.administradoresService.getTotalUsuarios().subscribe(
      (response) => {
        this.total_user = response;
        console.log("Total de usuarios: ", this.total_user);

        this.pieChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos
        ];

        this.doughnutChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos
        ];

// Forzar la actualización de las gráficas
        this.updateCharts();
      }, (error)=>{
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }

  private updateCharts() {
    // Forzar la actualización de las gráficas
        this.pieChartData = { ...this.pieChartData };
    this.doughnutChartData = { ...this.doughnutChartData };
  }
}
