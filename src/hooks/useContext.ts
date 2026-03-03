import { Context, useContext } from "react";
import * as contexts from "@/context";

function useContextWithProviderCheck<T>(
  context: Context<T>,
  providerName: string,
) {
  const context_ = useContext(context);
  if (!context_) {
    throw new Error(
      `Debe utilizar el contexto de ${providerName} dentro del ${providerName}Provider`,
    );
  }
  return context_;
}

export function useUserContext() {
  return useContextWithProviderCheck(contexts.UserContext, "User");
}

export function useProductsContext() {
  return useContextWithProviderCheck(contexts.ProductsContext, "Products");
}

export function useCartContext() {
  return useContextWithProviderCheck(contexts.CartContext, "Cart");
}
