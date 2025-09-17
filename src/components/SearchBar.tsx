import { useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import type { Product } from "../types/productCard";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Load products once (simple approach; could be moved to a shared cache if needed)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setProducts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter suggestions
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [] as Product[];
    return products
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 6);
  }, [products, query]);
  const showNoResults = open && query.trim().length >= 2 && suggestions.length === 0;

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function goToProduct(p: Product) {
    setOpen(false);
    setQuery("");
    navigate("/productdetails", { state: { product: p } });
  }

  return (
    <div ref={containerRef} className="relative w-[220px] sm:w-[260px] md:w-[320px]">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (suggestions.length > 0) {
            goToProduct(suggestions[0]);
          } else {
            // keep dropdown open to show 'not found' message
            setOpen(true);
          }
        }}
      >
        <label htmlFor="header-search" className="sr-only">
          Search
        </label>
        <input
          id="header-search"
          type="search"
          placeholder="What are you looking for?"
          className="w-full pl-4 pr-10 py-2 rounded-md bg-[#EFF0F6] placeholder=[#A0A3BD] outline-none"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute p-1 -translate-y-1/2 rounded-md right-2 top-1/2 hover:bg-black/5"
        >
          <CiSearch size={22} />
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
          {suggestions.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => goToProduct(p)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
                title={p.title}
              >
                <img src={p.image} alt="" className="object-contain w-8 h-8" />
                <span className="text-sm line-clamp-1">{p.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {showNoResults && (
        <div className="absolute z-50 w-full mt-2 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-3 py-2 text-sm text-gray-600">Product not found</div>
        </div>
      )}
    </div>
  );
}
