import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TujuanWisata } from "@/types";

interface KartuDestinasiProps {
  destinasi: TujuanWisata;
}

export const KartuDestinasi = ({ destinasi }: KartuDestinasiProps) => {

  // 🔥 FIX URL GAMBAR (AMAN walau ada / atau tidak)
  const imageUrl = destinasi.gambar
    ? `http://localhost:5000/images/${destinasi.gambar}`
    : "/placeholder.jpg";

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group bg-white">

      {/* ================= IMAGE ================= */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={destinasi.nama}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />

        {/* Badge kategori */}
        {destinasi.kategori && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-blue-600 text-white text-xs">
              {destinasi.kategori}
            </Badge>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <CardHeader>
        <CardTitle className="text-lg text-blue-600 font-bold">
          {destinasi.nama}
        </CardTitle>

        <div className="flex items-center text-xs text-gray-500 mt-1">
          <MapPin size={12} className="mr-1" />
          {destinasi.alamat}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">
          {destinasi.deskripsi}
        </p>

        <div className="mt-3 text-xs text-gray-500">
          Jam Buka: {destinasi.jamBuka || "09:00 - 17:00"}
        </div>
      </CardContent>

      <CardFooter>
        <Link to={`/destinasi/${destinasi.id}`} className="w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-1 transition">
            Lihat Detail
            <ChevronRight size={16} />
          </button>
        </Link>
      </CardFooter>

    </Card>
  );
};

export default KartuDestinasi;