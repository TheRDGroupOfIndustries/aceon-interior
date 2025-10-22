"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/productSlice";

export default function StateInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch any actions needed to initialize state here
    dispatch(fetchProducts({ page: 1, limit: 10 }) as any);
  }, [dispatch]);
  return null;
}
