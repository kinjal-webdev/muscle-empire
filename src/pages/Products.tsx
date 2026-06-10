import { useState, useRef } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";

const WA_NUMBER = "919773053632";

// ── Product data ──────────────────────────────────────────────────────────────
// images[0] = shown first (product shot), images[1] = swipe to see (nutrition label)
// description extracted from your third image
const products = [
  {
    id: 1,
    name: "Pro Nectar Lean Muscle Builder",
    subtitle: "Cookies & Cream Flavour",
    price: "Contact for Price",
    images: [
      // Drop your product images in src/assets/images/ and update these paths
      // image[0] = product shot (Cookies & Cream)
      // image[1] = nutrition label
      null, // replace with: import img1 from "@/assets/images/product-1a.jpg"
      null, // replace with: import img2 from "@/assets/images/product-1b.jpg"
    ],
    description: `Pro Nectar Lean Muscle Builder is a premium nutraceutical formulated to support serious athletes and fitness enthusiasts.

LEAN MUSCLE GAINER contains simple and complex carbohydrates for better absorption of creatine into muscles for enhanced recovery and calories.

XTREME LEAN MUSCLE contains a blend of Whey Protein Concentrate, Casein and Milk Protein for lean muscle and performance.

Promotes muscle recovery, reduces muscle soreness and maximizes muscle gains. Contains essential vitamins and minerals which help in metabolism, builds immunity and enhance energy production.

NUTRITIONAL INFORMATION (Approximate Values)
Scoop Size: 40g (One Serving) | Servings Per Container: 50

• Energy: 145.3 Kcal per scoop / 363.3 Kcal per 100g
• Total Fat: 0.8g per scoop / 2g per 100g
• Total Carbohydrate: 23.3g per scoop / 58.3g per 100g
• Added Sugar: 0g
• Protein: 11.2g per scoop / 28g per 100g
• Sodium: q.s.

INGREDIENTS: Whey Protein Conc. 35%, Diluent (INS 1404), Artificial Sweetener (INS 955), Thickening Agents (INS 415), Potassium Sorbate (INS E202), Flavour.

TYPICAL AMINO ACID PROFILE (Per 100g):
L-Arginine 0.84g | L-Alanine 1.75g | L-Aspartic Acid 3.71g | L-Cysteine 0.80g | L-Glutamic Acid 6.09g | L-Glycerine 0.63g | Histidine 0.63g | L-Isoleucine 2.24g | L-Leucine 3.64g | L-Lysine 3.22g | L-Methione 0.7g | L-Phenylalanine 1.12g | L-Proline 2.03g | L-Serine 1.64g | L-Threonine 2.41g | L-Tryptophan 0.63g | L-Tyrosine 0.91g | L-Valine 2.06g

RECOMMENDED USAGE: Take 1 to 2 servings in a day or as directed by the healthcare professional. This product is not intended to diagnose, treat, cure or prevent any disease(s).

**RDA allowances of Nutrients as per Guidelines of Indian Council of Medical Research (ICMR) 2020.`,
  },
];

// ── Image Slider ──────────────────────────────────────────────────────────────
function ImageSlider({ images, name }: { images: (string | null)[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full aspect-[4/3] overflow-hidden bg-card select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {images[current] ? (
            <img
              src={images[current]!}
              alt={`${name} — view ${current + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder until images are added
            <div className="w-full h-full flex flex-col items-center justify-center bg-secondary gap-3">
              <ShoppingBag size={48} className="text-primary/40" />
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                {current === 0 ? "Product Image" : "Nutrition Label"}
              </p>
              <p className="text-muted-foreground/50 text-xs">
                Add image to src/assets/images/
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full transition-colors z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full transition-colors z-10"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-5 bg-primary" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const shortDesc = product.description.split("\n\n").slice(0, 2).join("\n\n");

  const waMsg = encodeURIComponent(
    `Hi! I'm interested in *${product.name} (${product.subtitle})*. Please share more details.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 transition-colors shadow-lg"
    >
      <ImageSlider images={product.images} name={product.name} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Name & Price */}
        <div>
          <h3 className="text-white font-black uppercase tracking-tight text-lg leading-tight">
            {product.name}
          </h3>
          <p className="text-primary text-sm font-bold uppercase tracking-widest mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-white">{product.price}</span>
        </div>

        {/* Description */}
        <div className="text-muted-foreground text-sm leading-relaxed">
          <p className="whitespace-pre-line">
            {expanded ? product.description : shortDesc}
          </p>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-primary font-bold uppercase tracking-widest text-xs mt-2 hover:underline"
          >
            {expanded ? "Show Less ↑" : "Show More ↓"}
          </button>
        </div>

        {/* Shop Now */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest py-3 rounded-xl transition-colors text-sm"
        >
          <FaWhatsapp size={18} />
          Shop Now
        </a>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Products() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlanNavbar scrollKey="scroll_before_products" />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="mb-12">
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Our Store
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-3">
              Gym{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                Products
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Premium supplements and gear, available directly through us.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
