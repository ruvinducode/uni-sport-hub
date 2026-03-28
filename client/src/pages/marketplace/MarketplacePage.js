import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../../components/HomeNavbar";
import ProductList from "../../components/marketplace/ProductList";
import BuyModal from "../../components/marketplace/BuyModal";
import { MARKETPLACE_STORE_PRODUCTS } from "../../data/marketplaceStoreProducts";

const CATEGORIES = [
  "All",
  "Jerseys",
  "Bangles",
  "Stationary",
  "Sports Gear",
  "Accessories",
];

function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [buyProduct, setBuyProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MARKETPLACE_STORE_PRODUCTS.filter((p) => {
      const catOk = category === "All" || p.category === category;
      const haystack = [p.name, p.category, p.sport, p.description].join(" ").toLowerCase();
      const searchOk = !q || haystack.includes(q);
      return catOk && searchOk;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-50">
      <HomeNavbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Campus store
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Marketplace
            </h1>
            <p className="mt-2 max-w-xl text-sm font-semibold text-slate-600">
              University sports gear and accessories. Order via WhatsApp — upload your payment slip preview here, then attach the same image in chat after redirect.
            </p>
          </div>

          <div className="w-full max-w-md">
            <label htmlFor="marketplace-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="marketplace-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, sport, category…"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="browse-heading">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="browse-heading" className="text-lg font-extrabold text-slate-900">
                Shop products
              </h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">Filter by category, then tap Buy Now.</p>
            </div>
            <Link
              to="/"
              className="text-sm font-bold text-emerald-700 underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900">No products match</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Try another search or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-700"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-10">
              <ProductList products={filteredProducts} onBuyNow={setBuyProduct} />
            </div>
          )}
        </section>
      </main>

      <BuyModal product={buyProduct} isOpen={!!buyProduct} onClose={() => setBuyProduct(null)} />

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-slate-700">
              Uni Sport Hub © {new Date().getFullYear()}
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Checkout opens WhatsApp — payment slip is not uploaded to any server.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MarketplacePage;
