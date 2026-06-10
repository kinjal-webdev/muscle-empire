import { useState, useRef } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";
import product1a from "@/assets/images/product-1a.jpg";
import product1b from "@/assets/images/product-1b.jpg";

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
      product1b, // Nutrition label — shown first (default)
      product1a, // Cookies & Cream product shot — swipe right to see
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
function ImageSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = going right, -1 = going left
  const touchStartX = useRef<number | null>(null);

  const prev = () => { if (current > 0) { setDirection(-1); setCurrent((c) => c - 1); } };
  const next = () => { if (current < images.length - 1) { setDirection(1); setCurrent((c) => c + 1); } };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
    touchStartX.current = null;
  };

  const isFirst = current === 0;
  const isLast = current === images.length - 1;

  return (
    <div
      className="relative w-full overflow-hidden bg-white select-none"
      style={{ aspectRatio: "1/1" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d * 100 + "%", opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d * -100 + "%", opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={images[current]} alt={`${name} — view ${current + 1}`} className="w-full h-full object-contain" />
        </motion.div>
      </AnimatePresence>

      {!isFirst && (
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full z-10">
          <ChevronLeft size={20} />
        </button>
      )}
      {!isLast && (
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 text-white flex items-center justify-center rounded-full z-10">
          <ChevronRight size={20} />
        </button>
      )}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-primary" : "w-1.5 bg-black/40"}`} />
        ))}
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const savedScrollY = useRef<number>(0);

  // First 2 lines = first sentence only
  const shortDesc = product.description.split("\n")[0];

  const toggleExpand = () => {
    if (expanded) {
      setExpanded(false);
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });
    } else {
      savedScrollY.current = window.scrollY;
      setExpanded(true);
    }
  };

  const waMsg = encodeURIComponent(
    `Hi! I'm interested in *${product.name} (${product.subtitle})*. Please share more details.`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/40 transition-colors shadow-md"
    >
      <ImageSlider images={product.images} name={product.name} />

      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* Name */}
        <h3 className="text-white font-black uppercase tracking-tight text-xs sm:text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>
        <p className="text-primary text-xs font-bold uppercase tracking-widest leading-tight">
          {product.subtitle}
        </p>

        {/* Price */}
        <span className="text-base font-black text-white">{product.price}</span>

        {/* Description — 2 lines by default */}
        <div className="text-muted-foreground text-xs leading-relaxed">
          {expanded ? (
            <p className="whitespace-pre-line">{product.description}</p>
          ) : (
            <p className="line-clamp-2">{shortDesc}</p>
          )}
          <button
            onClick={toggleExpand}
            className="text-primary font-bold uppercase tracking-widest text-xs mt-1 hover:underline"
          >
            {expanded ? "Show Less ↑" : "Show More ↓"}
          </button>
        </div>

        {/* Shop Now */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest py-2 rounded-lg transition-colors text-xs"
        >
          <FaWhatsapp size={14} />
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
      <PlanNavbar />
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

          {/* Grid — 2 cols mobile like Amazon/Flipkart */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
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
