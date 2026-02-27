export interface Province {
  id: number;
  name: string;
}

export interface Regency {
  id: number;
  province_id: number;
  name: string;
}

export interface District {
  id: number;
  regency_id: number;
  name: string;
}

export interface RegionResponse {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
}