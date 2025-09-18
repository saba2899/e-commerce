import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Button, Card, Tag, SectionTitle } from "../components";
import type { Product } from "../types/productCard";

import product1 from "../assets/product1.webp";
import product2 from "../assets/product2.webp";
import product3 from "../assets/product3.webp";
import product4 from "../assets/product4.webp";
import product5 from "../assets/product5.webp";

const slides = [product1, product2, product3, product4, product5];

// Category icons for mobile
const categories = [
  { name: "Electronics", icon: "📱", color: "bg-blue-50 text-blue-600" },
  { name: "Fashion", icon: "👕", color: "bg-pink-50 text-pink-600" },
  { name: "Home", icon: "🏠", color: "bg-green-50 text-green-600" },
  { name: "Sports", icon: "⚽", color: "bg-orange-50 text-orange-600" },
  { name: "Books", icon: "📚", color: "bg-purple-50 text-purple-600" },
  { name: "Beauty", icon: "💄", color: "bg-red-50 text-red-600" },
];

export function MobileHomeLayout() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setFeaturedProducts(data.slice(0, 6));
      } catch (e) {
        console.error(e);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-8 sm:hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mx-4 mt-4">
        <Swiper
          modules={[Autoplay, Pagination, A11y, Keyboard]}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          className="w-full mobile-hero-swiper"
          aria-roledescription="carousel"
          aria-label="Featured Products"
        >
          {slides.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative overflow-hidden rounded-2xl h-[200px]">
                <img
                  src={src}
                  alt={`Featured Product ${i + 1}`}
                  className="block object-cover w-full h-full"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Special Offer</h3>
                  <p className="text-sm opacity-90">Up to 50% off</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Quick Categories */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Categories</h2>
          <Button className="text-sm px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex flex-col items-center justify-center p-4 rounded-xl ${category.color} transition-transform active:scale-95`}
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-xs font-medium text-center">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Tag>Featured</Tag>
            <SectionTitle>Trending Now</SectionTitle>
          </div>
          <Button className="text-sm px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-48 animate-pulse"
                />
              ))
            : featuredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Flash Sale!</h3>
          <p className="text-sm opacity-90 mb-4">
            Limited time offer on selected items
          </p>
          <Button className="bg-white text-red-600 hover:bg-gray-100">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🚚</div>
            <h4 className="font-semibold text-gray-800">Free Shipping</h4>
            <p className="text-xs text-gray-600">On orders over $50</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💳</div>
            <h4 className="font-semibold text-gray-800">Easy Returns</h4>
            <p className="text-xs text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
