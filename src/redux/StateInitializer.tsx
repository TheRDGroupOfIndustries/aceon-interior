"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFeatureProducts } from "./features/productSlice";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { fetchUserOrders } from "./features/orderSlice";

export default function StateInitializer() {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchUserOrders({}) as any);
    }
  }, [session?.user]);

  useEffect(() => {
    console.log("Session changed:", session);
    console.log("pathname:", pathname);
    if (pathname === "/admin") {
      if (!session?.user?.role || session?.user?.role !== "admin") {
        router.push("/");
      }
    }
  }, [session?.user, router, pathname]);

  useEffect(() => {
    // Dispatch any actions needed to initialize state here
    dispatch(fetchFeatureProducts() as any);
  }, [dispatch]);
  return null;
}
