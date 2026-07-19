import { Link } from "react-router-dom";
import { formatNPR } from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group block overflow-hidden rounded-xl border border-ink-100 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/5] overflow-hidden bg-cream-200">
        <img
          src={product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-3">
        <p className="truncate text-sm font-semibold text-ink-900">{product.title}</p>
        <p className="truncate text-xs text-ink-400">{product.brand}</p>
        <p className="text-sm font-bold text-rust-500">{formatNPR(product.price)}</p>
      </div>
    </Link>
  );
}
