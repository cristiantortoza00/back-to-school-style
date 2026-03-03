export interface Category {
  _id: string;
  name: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  badge: string | null;
  category: Category;
  description: string;
}

// Placeholder SVG generator for default product images

export const productsData: Product[] = [
  {
    _id: "mochila-urbana-pastel",
    name: "Mochila Urbana Pastel",
    price: 24990,
    oldPrice: 32990,
    image: "https://picsum.photos/seed/mochila1/600/600",
    badge: "20% OFF",
    category: { _id: "mochilas", name: "Mochilas" },
    description:
      "Mochila urbana de diseño moderno con compartimentos acolchados...",
  },
  {
    _id: "set-cuadernos-a4",
    name: "Set de Cuadernos A4 x5",
    price: 8990,
    oldPrice: null,
    image: "https://picsum.photos/seed/cuadernos1/600/600",
    badge: null,
    category: { _id: "cuadernos", name: "Cuadernos" },
    description: "Pack de 5 cuadernos tamaño A4...",
  },
  {
    _id: "cartuchera-doble-cierre",
    name: "Cartuchera Doble Cierre",
    price: 6490,
    oldPrice: 8990,
    image: "https://picsum.photos/seed/cartuchera1/600/600",
    badge: "Oferta",
    category: { _id: "cartucheras", name: "Cartucheras" },
    description: "Cartuchera amplia con doble cierre...",
  },
  {
    _id: "kit-arte-profesional",
    name: "Kit Arte Profesional",
    price: 15990,
    oldPrice: null,
    image: "https://picsum.photos/seed/arte1/600/600",
    badge: "Nuevo",
    category: { _id: "arte-y-dibujo", name: "Arte y Dibujo" },
    description: "Kit completo de arte que incluye...",
  },
  {
    _id: "pack-resaltadores",
    name: "Pack Resaltadores x6",
    price: 4990,
    oldPrice: 6990,
    image: "https://picsum.photos/seed/resaltadores1/600/600",
    badge: "30% OFF",
    category: { _id: "resaltadores", name: "Resaltadores" },
    description: "Set de 6 resaltadores pastel...",
  },
  {
    _id: "cuaderno-espiral-a5",
    name: "Cuaderno Espiral A5",
    price: 2990,
    oldPrice: null,
    image: "https://picsum.photos/seed/cuaderno2/600/600",
    badge: null,
    category: { _id: "cuadernos", name: "Cuadernos" },
    description: "Cuaderno espiral A5...",
  },
  {
    _id: "mochila-escolar-premium",
    name: "Mochila Escolar Premium",
    price: 34990,
    oldPrice: 42990,
    image: "https://picsum.photos/seed/mochila2/600/600",
    badge: "Promo",
    category: { _id: "mochilas", name: "Mochilas" },
    description: "Mochila premium con espalda ergonómica...",
  },
  {
    _id: "set-lapices-colores",
    name: "Set Lápices de Colores",
    price: 7490,
    oldPrice: null,
    image: "https://picsum.photos/seed/lapices1/600/600",
    badge: "Popular",
    category: { _id: "arte-y-dibujo", name: "Arte y Dibujo" },
    description: "Set de 36 lápices de colores profesionales...",
  },
  {
    _id: "set-escolar-completo",
    name: "Set Escolar Completo",
    price: 18990,
    oldPrice: 24990,
    image: "https://picsum.photos/seed/set1/600/600",
    badge: "25% OFF",
    category: { _id: "sets-escolares", name: "Sets Escolares" },
    description: "Set escolar completo que incluye...",
  },
  {
    _id: "set-escolar-basico",
    name: "Set Escolar Básico",
    price: 11990,
    oldPrice: null,
    image: "https://picsum.photos/seed/set2/600/600",
    badge: null,
    category: { _id: "sets-escolares", name: "Sets Escolares" },
    description: "Pack básico ideal para primaria...",
  },
  {
    _id: "block-dibujo-a3",
    name: "Block de Dibujo A3",
    price: 3490,
    oldPrice: null,
    image: "https://picsum.photos/seed/block1/600/600",
    badge: null,
    category: { _id: "arte-y-dibujo", name: "Arte y Dibujo" },
    description: "Block de dibujo tamaño A3...",
  },
  {
    _id: "cartuchera-enrollable",
    name: "Cartuchera Enrollable",
    price: 5490,
    oldPrice: 7490,
    image: "https://picsum.photos/seed/cartuchera2/600/600",
    badge: "Oferta",
    category: { _id: "cartucheras", name: "Cartucheras" },
    description: "Cartuchera enrollable de tela canvas...",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
