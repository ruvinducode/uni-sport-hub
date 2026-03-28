import ProductCard from "./ProductCard";

/**
 * Responsive grid of product cards.
 * @param {{ products: Array<object>, onBuyNow: (p: object) => void }} props
 */
function ProductList({ products, onBuyNow }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuyNow={onBuyNow} />
      ))}
    </div>
  );
}

export default ProductList;
