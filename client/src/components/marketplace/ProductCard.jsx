/**
 * Single product card with image, name, price, short description, and Buy Now.
 * @param {{ product: { id: string, name: string, price: number, description: string, image: string }, onBuyNow: (p: object) => void }} props
 */
function ProductCard({ product, onBuyNow }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-extrabold leading-snug text-slate-900">{product.name}</h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm font-medium text-slate-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-xl font-extrabold text-emerald-700">
            Rs. {Number(product.price).toLocaleString("en-LK")}
          </p>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
