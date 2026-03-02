import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, Trees, Mountain } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchFeaturedDestinations } from "@/services/destinationService";

interface FeaturedDestinationsProps {
  selectedCategory: string | null;
  id: string;
  onSelectCategory: (category: string | null) => void;
}

export const FeaturedDestinations = ({
  selectedCategory,
  id,
  onSelectCategory,
}: FeaturedDestinationsProps) => {
  const [featuredDestinations, setFeaturedDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchFeaturedDestinations();

        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.nama,
          image: item.gambar
            ? `http://localhost:5000/images${item.gambar}`
            : "/placeholder.jpg",
          description: item.deskripsi,
          location: item.alamat,
          category: item.kategori,
        }));

        setFeaturedDestinations(mapped);
      } catch (error) {
        console.error("Error fetching featured destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-blue-600 font-medium">
        Loading destinations...
      </div>
    );
  }

  const uniqueFeaturedCategories = Array.from(
    new Set(featuredDestinations.map((d) => d.category))
  )
    .filter(Boolean)
    .sort();

  const displayedDestinations = selectedCategory
    ? featuredDestinations.filter((destination) =>
        destination.category
          .toLowerCase()
          .includes(selectedCategory.toLowerCase())
      )
    : featuredDestinations;

  return (
    <section
      id={id}
      className="py-24 bg-gradient-to-b from-gray-100 via-gray-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trees size={30} className="text-blue-500" />

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-blue-700">Destinasi</span>{" "}
              <span className="text-orange-500">Unggulan</span>
            </h2>

            <Mountain size={30} className="text-blue-500" />
          </div>

          <p className="text-blue-500 text-lg max-w-2xl mx-auto">
            Jelajahi destinasi menakjubkan disekitar Malang
          </p>
        </motion.div>

        {/* ================= CATEGORY FILTER ================= */}
        <div className="flex flex-wrap justify-center gap-10 text-sm font-semibold mb-16">

          {/* ALL BUTTON */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`relative transition-all duration-300 ${
              !selectedCategory
                ? "text-orange-500"
                : "text-blue-400 hover:text-orange-400"
            }`}
          >
            Tampilkan Semua
            {!selectedCategory && (
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
            )}
          </button>

          {/* CATEGORY BUTTONS */}
          {uniqueFeaturedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`relative transition-all duration-300 ${
                selectedCategory === cat
                  ? "text-orange-500"
                  : "text-blue-400 hover:text-orange-400"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* ================= CAROUSEL ================= */}
        {displayedDestinations.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: displayedDestinations.length > 3,
            }}
            className="w-full"
          >
            <CarouselContent>
              {displayedDestinations.map((destination) => (
                <CarouselItem
                  key={destination.id}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative overflow-hidden rounded-2xl h-[340px] bg-white shadow-lg group cursor-pointer"
                    onMouseEnter={() => setIsHovered(destination.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {/* IMAGE */}
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* CONTENT */}
                    <div className="absolute bottom-0 p-5 text-white w-full">
                      <h3 className="text-lg font-bold mb-1">
                        {destination.name}
                      </h3>

                      <div className="flex items-center text-xs mb-3">
                        <MapPin size={12} className="mr-1" />
                        {destination.description}
                      </div>

                      <div className="flex items-center text-xs mb-3">
                        <MapPin size={12} className="mr-1" />
                        {destination.location}
                      </div>

                      <Link to={`/destinasi/${destination.id}`}>
                        <Button
                          size="sm"
                          className="bg-white text-blue-700 hover:bg-gray-100 w-full font-medium"
                        >
                          View Details
                          <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {displayedDestinations.length > 3 && (
              <div className="flex justify-center gap-4 mt-10">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            )}
          </Carousel>
        )}
      </div>
    </section>
  );
};