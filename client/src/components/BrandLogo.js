import logoImg from "../images/Logo.png";

/**
 * Uni Sport Hub wordmark image from `src/images/Logo.png`.
 * @param {{ className?: string, sizeClass?: string, alt?: string }} props
 */
function BrandLogo({ className = "", sizeClass = "h-10 w-10", alt = "Uni Sport Hub" }) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={`${sizeClass} object-contain ${className}`.trim()}
      decoding="async"
    />
  );
}

export default BrandLogo;
