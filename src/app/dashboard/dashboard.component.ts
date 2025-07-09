import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dados = [
    {
      vin: '2FRHDUYS2Y63NHD22454',
      odometro: '50000 Km',
      combustivel: '90%',
      status: 'On',
      lat: '12.2322',
      long: '35.2314'
    }
  ];
  displayedColumns: string[] = ['vin', 'odometro', 'combustivel', 'status', 'lat', 'long'];
}
