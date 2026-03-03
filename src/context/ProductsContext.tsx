import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, productsData } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  categories: Category[];
  addProduct: (data: Partial<Product>) => Promise<any>;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (name: string) => Promise<any>;
  updateCategory: (_id: string, name: string) => Promise<any>;
  deleteCategory: (_id: string) => Promise<any>;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = async (data: Partial<Product>) => {};

  const updateProduct = async (_id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === _id ? { ...p, ...data } : p)),
    );
  };

  const deleteProduct = async (_id: string) => {
    setProducts((prev) => prev.filter((p) => p._id !== _id));
  };

  const addCategory = async (name: string) => {};

  const updateCategory = async (_id: string, name: string) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === _id ? { ...c, name } : c)),
    );
  };

  const deleteCategory = async (_id: string) => {
    setCategories((prev) => prev.filter((c) => c._id !== _id));
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
