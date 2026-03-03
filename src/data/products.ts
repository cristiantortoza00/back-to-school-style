export type Category = "mochilas" | "cuadernos" | "cartucheras" | "sets-escolares" | "arte-y-dibujo";

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
const placeholderImage = (emoji: string, bgColor: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="${bgColor}" width="400" height="400" rx="20"/><text x="200" y="220" font-size="120" text-anchor="middle" dominant-baseline="central">${emoji}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const products: Product[] = [
  {
    id: "mochila-urbana-pastel",
    name: "Mochila Urbana Pastel",
    price: 24990,
    oldPrice: 32990,
    image: placeholderImage("🎒", "#e8dff5"),
    badge: "20% OFF",
    category: "mochilas",
    description: "Mochila urbana de diseño moderno con compartimentos acolchados para notebook de hasta 15\", bolsillos laterales para botella y organizador interno. Tela resistente al agua con terminaciones en colores pastel. Ideal para ir a clases con estilo y comodidad.",
  },
  {
    id: "set-cuadernos-a4",
    name: "Set de Cuadernos A4 x5",
    price: 8990,
    oldPrice: null,
    image: placeholderImage("📓", "#d4eef7"),
    badge: null,
    category: "cuadernos",
    description: "Pack de 5 cuadernos tamaño A4, 80 hojas cada uno, con tapas duras de colores pastel y espiral metálico. Hojas de 75g rayadas. Perfectos para organizar todas tus materias con estilo.",
  },
  {
    id: "cartuchera-doble-cierre",
    name: "Cartuchera Doble Cierre",
    price: 6490,
    oldPrice: 8990,
    image: placeholderImage("✏️", "#f5d5e0"),
    badge: "Oferta",
    category: "cartucheras",
    description: "Cartuchera amplia con doble cierre y múltiples compartimentos internos. Confeccionada en tela de poliéster resistente con diseño en colores pastel. Capacidad para más de 40 elementos.",
  },
  {
    id: "kit-arte-profesional",
    name: "Kit Arte Profesional",
    price: 15990,
    oldPrice: null,
    image: placeholderImage("🎨", "#d4f0e0"),
    badge: "Nuevo",
    category: "arte-y-dibujo",
    description: "Kit completo de arte que incluye 24 lápices de colores, 12 marcadores, 6 acuarelas, pincel, paleta y block de dibujo A3. Presentación en estuche rígido con cierre. Ideal para clases de arte o proyectos creativos.",
  },
  {
    id: "pack-resaltadores",
    name: "Pack Resaltadores x6",
    price: 4990,
    oldPrice: 6990,
    image: placeholderImage("🖍️", "#f5d5e0"),
    badge: "30% OFF",
    category: "cartucheras",
    description: "Set de 6 resaltadores de punta biselada en colores pastel: lavanda, rosa, celeste, menta, amarillo y durazno. Tinta no tóxica, secado rápido y larga duración. Ideales para destacar apuntes.",
  },
  {
    id: "cuaderno-espiral-a5",
    name: "Cuaderno Espiral A5",
    price: 2990,
    oldPrice: null,
    image: placeholderImage("📒", "#d4eef7"),
    badge: null,
    category: "cuadernos",
    description: "Cuaderno espiral A5, 120 hojas cuadriculadas, tapa dura con diseño minimalista en tonos pastel. Hojas micropetforadas para arrancar fácilmente. Banda elástica de cierre y bolsillo interior.",
  },
  {
    id: "mochila-escolar-premium",
    name: "Mochila Escolar Premium",
    price: 34990,
    oldPrice: 42990,
    image: placeholderImage("🎒", "#e8dff5"),
    badge: "Promo",
    category: "mochilas",
    description: "Mochila premium con espalda ergonómica acolchada, correas ajustables con relleno, compartimento principal amplio, bolsillo frontal organizador y bolsillos laterales. Material impermeable de alta resistencia.",
  },
  {
    id: "set-lapices-colores",
    name: "Set Lápices de Colores",
    price: 7490,
    oldPrice: null,
    image: placeholderImage("🖌️", "#d4f0e0"),
    badge: "Popular",
    category: "arte-y-dibujo",
    description: "Set de 36 lápices de colores profesionales en caja metálica. Mina suave de 3.7mm, pigmentos intensos y alta resistencia a la luz. Excelentes para dibujo artístico, coloreado y bocetos detallados.",
  },
  {
    id: "set-escolar-completo",
    name: "Set Escolar Completo",
    price: 18990,
    oldPrice: 24990,
    image: placeholderImage("📦", "#f0ead6"),
    badge: "25% OFF",
    category: "sets-escolares",
    description: "Set escolar completo que incluye: 3 cuadernos A4, cartuchera con útiles básicos (lapicera, lápiz, goma, sacapuntas, regla), set de resaltadores x3 y carpeta organizadora. Todo lo que necesitás en un solo pack.",
  },
  {
    id: "set-escolar-basico",
    name: "Set Escolar Básico",
    price: 11990,
    oldPrice: null,
    image: placeholderImage("🎁", "#f0ead6"),
    badge: null,
    category: "sets-escolares",
    description: "Pack básico ideal para primaria: 2 cuadernos A4 tapa dura, cartuchera simple con lápiz, goma y sacapuntas, y set de 12 lápices de colores. Práctico y accesible para empezar las clases.",
  },
  {
    id: "block-dibujo-a3",
    name: "Block de Dibujo A3",
    price: 3490,
    oldPrice: null,
    image: placeholderImage("🖼️", "#d4f0e0"),
    badge: null,
    category: "arte-y-dibujo",
    description: "Block de dibujo tamaño A3, 40 hojas de 180g, ideal para técnicas mixtas: lápiz, carboncillo, acuarela liviana y pastel. Hojas de alta blancura con textura suave.",
  },
  {
    id: "cartuchera-enrollable",
    name: "Cartuchera Enrollable",
    price: 5490,
    oldPrice: 7490,
    image: placeholderImage("🖊️", "#f5d5e0"),
    badge: "Oferta",
    category: "cartucheras",
    description: "Cartuchera enrollable de tela canvas con 24 slots individuales para lápices o marcadores. Cierre con cinta. Diseño compacto y elegante en tonos neutros y pastel.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price);
