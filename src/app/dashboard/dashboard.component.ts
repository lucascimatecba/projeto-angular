import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dadosOriginal = [
    {
      vin: '2FRHDUYS2Y63NHD22454',
      odometro: '50000 Km',
      combustivel: '90%',
      status: 'On',
      lat: '12.2322',
      long: '35.2314'
    },
  ];
  cards = [
    { titulo: 'Vendas', valor: 1500 },
    { titulo: 'Conectados', valor: 500 },
    { titulo: 'Atualizados', valor: 750 }
  ];
  displayedColumns: string[] = ['vin', 'odometro', 'combustivel', 'status', 'lat', 'long'];

  dados = [...this.dadosOriginal];
  codigoBusca = '';

  filtrarPorVin() {
    const termo = this.codigoBusca.toLowerCase();
    if (!termo) {
      this.dados = [...this.dadosOriginal];
    } else {
      this.dados = this.dadosOriginal.filter((item) =>
        item.vin.toLowerCase().includes(termo)
      );
    }
  }
}
