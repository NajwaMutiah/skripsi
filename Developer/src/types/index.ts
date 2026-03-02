

export interface TujuanWisata {
  id: number;
  nama: string;
  deskripsi: string;
  gambar: string;
  alamat: string;
  latitude: number;
  longitude: number;
  kategori?: string;
  jamBuka?: string;
}

export interface Komentar {
  id: number;
  penggunaId: string;
  namaPengguna: string;
  fotoPengguna?: string;
  pesan: string;
  rating: number;
  tanggal: string;
  balasan?: Komentar[];
}

export interface LokasiPengguna {
  latitude: number;
  longitude: number;
  alamat?: string;
  loaded: boolean;
  error?: string;
}

export interface FilterAnggaran {
  min: number;
  max: number;
}

export interface FilterJarak {
  jarakMaksimum: number; // dalam kilometer
}

// Alias untuk kompatibilitas
export type TouristDestination = TujuanWisata;
export type UserLocation = LokasiPengguna;

