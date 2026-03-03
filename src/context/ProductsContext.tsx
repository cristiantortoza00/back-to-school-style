import React, { createContext, useContext, useState, useEffect } from "react";
import {
  products as defaultProducts,
  type Product,
  type Category,
  categoryLabels as defaultCategoryLabels,
} from "@/data/products";

export interface CategoryItem {
  id: Category;
  label: string;
}

interface ProductsContextType {
  products: Product[];
  categories: CategoryItem[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (label: string) => void;
  updateCategory: (id: Category, label: string) => void;
  deleteCategory: (id: Category) => void;
}

const ProductsContext = createContext<ProductsContextType | null>(null);

const PRODUCTS_KEY = "admin_products";
const CATEGORIES_KEY = "admin_categories";

const defaultCategories: CategoryItem[] = Object.entries(
  defaultCategoryLabels,
).map(([id, label]) => ({
  id: id as Category,
  label,
}));

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrate old emoji-based products to image-based
        if (
          parsed.length > 0 &&
          "emoji" in parsed[0] &&
          !("image" in parsed[0])
        ) {
          localStorage.removeItem(PRODUCTS_KEY);
          return defaultProducts;
        }
        return parsed;
      } catch {
        return defaultProducts;
      }
    }
    return defaultProducts;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    return stored ? JSON.parse(stored) : defaultCategories;
  });

  useEffect(
    () => localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)),
    [products],
  );
  useEffect(
    () => localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories)),
    [categories],
  );

  const addProduct = (p: Omit<Product, "id">) => {
    const id = p.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setProducts((prev) => [...prev, { ...p, id }]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = (label: string) => {
    const id = label.toLowerCase().replace(/\s+/g, "-") as Category;
    setCategories((prev) => [...prev, { id, label }]);
  };

  const updateCategory = (id: Category, label: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, label } : c)),
    );
  };

  const deleteCategory = (id: Category) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};
