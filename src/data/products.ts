export type Category =
  | "mochilas"
  | "cuadernos"
  | "cartucheras"
  | "sets-escolares"
  | "arte-y-dibujo";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string;
  badge: string | null;
  category: Category;
  description: string;
}

export const categoryLabels: Record<Category, string> = {
  mochilas: "Mochilas",
  cuadernos: "Cuadernos",
  cartucheras: "Cartucheras",
  "sets-escolares": "Sets Escolares",
  "arte-y-dibujo": "Arte y Dibujo",
};

// Placeholder SVG generator for default product images

export const products: Product[] = [
  {
    id: "mochila-urbana-pastel",
    name: "Mochila Urbana Pastel",
    price: 24990,
    oldPrice: 32990,
    image: "https://picsum.photos/seed/mochila1/600/600",
    badge: "20% OFF",
    category: "mochilas",
    description:
      "Mochila urbana de diseño moderno con compartimentos acolchados...",
  },
  {
    id: "set-cuadernos-a4",
    name: "Set de Cuadernos A4 x5",
    price: 8990,
    oldPrice: null,
    image: "https://picsum.photos/seed/cuadernos1/600/600",
    badge: null,
    category: "cuadernos",
    description: "Pack de 5 cuadernos tamaño A4...",
  },
  {
    id: "cartuchera-doble-cierre",
    name: "Cartuchera Doble Cierre",
    price: 6490,
    oldPrice: 8990,
    image: "https://picsum.photos/seed/cartuchera1/600/600",
    badge: "Oferta",
    category: "cartucheras",
    description: "Cartuchera amplia con doble cierre...",
  },
  {
    id: "kit-arte-profesional",
    name: "Kit Arte Profesional",
    price: 15990,
    oldPrice: null,
    image: "https://picsum.photos/seed/arte1/600/600",
    badge: "Nuevo",
    category: "arte-y-dibujo",
    description: "Kit completo de arte que incluye...",
  },
  {
    id: "pack-resaltadores",
    name: "Pack Resaltadores x6",
    price: 4990,
    oldPrice: 6990,
    image: "https://picsum.photos/seed/resaltadores1/600/600",
    badge: "30% OFF",
    category: "cartucheras",
    description: "Set de 6 resaltadores pastel...",
  },
  {
    id: "cuaderno-espiral-a5",
    name: "Cuaderno Espiral A5",
    price: 2990,
    oldPrice: null,
    image: "https://picsum.photos/seed/cuaderno2/600/600",
    badge: null,
    category: "cuadernos",
    description: "Cuaderno espiral A5...",
  },
  {
    id: "mochila-escolar-premium",
    name: "Mochila Escolar Premium",
    price: 34990,
    oldPrice: 42990,
    image: "https://picsum.photos/seed/mochila2/600/600",
    badge: "Promo",
    category: "mochilas",
    description: "Mochila premium con espalda ergonómica...",
  },
  {
    id: "set-lapices-colores",
    name: "Set Lápices de Colores",
    price: 7490,
    oldPrice: null,
    image: "https://picsum.photos/seed/lapices1/600/600",
    badge: "Popular",
    category: "arte-y-dibujo",
    description: "Set de 36 lápices de colores profesionales...",
  },
  {
    id: "set-escolar-completo",
    name: "Set Escolar Completo",
    price: 18990,
    oldPrice: 24990,
    image: "https://picsum.photos/seed/set1/600/600",
    badge: "25% OFF",
    category: "sets-escolares",
    description: "Set escolar completo que incluye...",
  },
  {
    id: "set-escolar-basico",
    name: "Set Escolar Básico",
    price: 11990,
    oldPrice: null,
    image: "https://picsum.photos/seed/set2/600/600",
    badge: null,
    category: "sets-escolares",
    description: "Pack básico ideal para primaria...",
  },
  {
    id: "block-dibujo-a3",
    name: "Block de Dibujo A3",
    price: 3490,
    oldPrice: null,
    image: "https://picsum.photos/seed/block1/600/600",
    badge: null,
    category: "arte-y-dibujo",
    description: "Block de dibujo tamaño A3...",
  },
  {
    id: "cartuchera-enrollable",
    name: "Cartuchera Enrollable",
    price: 5490,
    oldPrice: 7490,
    image: "https://picsum.photos/seed/cartuchera2/600/600",
    badge: "Oferta",
    category: "cartucheras",
    description: "Cartuchera enrollable de tela canvas...",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
