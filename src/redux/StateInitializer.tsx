"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFeatureProducts, fetchProducts } from "./features/productSlice";

export default function StateInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch any actions needed to initialize state here
    dispatch(fetchFeatureProducts() as any);
  }, [dispatch]);
  return null;
}
