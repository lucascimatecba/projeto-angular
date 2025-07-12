export interface Veiculos extends Array<Veiculo> { }

export interface Veiculo {
  id: number | string;
  vin: string;
  vehicle: string;
  volumetotal: number | string;
  connected: number | string;
  softwareUpdates: number | string;
  img: string;
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}
