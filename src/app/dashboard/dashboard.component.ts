import { FormControl, FormGroup } from '@angular/forms';
import { VehicleData } from '../models/vehicleData.model';
import { Veiculo } from '../models/veiculo.model';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;
  cards = [
    { titulo: 'Vendas', valor: 0 },
    { titulo: 'Conectados', valor: 0 },
    { titulo: 'Atualizados', valor: 0 }
  ];

  selectCarForms = new FormGroup({
    carId: new FormControl('')
  });

  vinDigitado: string = '';

  buscarPorVin() {
    if (!this.vinDigitado) return;

    this.dashboardService.getVehicleData(this.vinDigitado).subscribe({
      next: (data) => {
        this.vehicleData = data;

        const v = this.vehicles.find(veic => String(veic.vin) === this.vinDigitado);
        if (v) {
          this.selectedVehicle = v;

          this.cards = [
            { titulo: 'Vendas', valor: Number(v.volumetotal) },
            { titulo: 'Conectados', valor: Number(v.connected) },
            { titulo: 'Atualizados', valor: Number(v.softwareUpdates) }
          ];

          this.selectCarForms.controls.carId.setValue(String(v.id));
        }
      },
      error: (err) => {
        console.error('VIN inválido:', err);
      }
    });
  }
  limparCampoVin() {
    this.vinDigitado = '';
  }

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getVehicle().subscribe((res) => {
      this.vehicles = res.vehicles;
    });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      const selected = this.vehicles.find(v => v.id == id);
      if (!selected) return;

      this.selectedVehicle = selected;

      this.cards = [
        { titulo: 'Vendas', valor: Number(this.selectedVehicle.volumetotal) },
        { titulo: 'Conectados', valor: Number(this.selectedVehicle.connected) },
        { titulo: 'Atualizados', valor: Number(this.selectedVehicle.softwareUpdates) }
      ];

      this.dashboardService.getVehicleData(this.selectedVehicle.vin).subscribe((data) => {
        this.vehicleData = data;
      });
    });
  }
}
