"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFeatureProducts } from "./features/productSlice";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { fetchUserOrders } from "./features/orderSlice";

export default function StateInitializer() {
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchUserOrders({}) as any);
    }
  }, [session?.user]);

  useEffect(() => {
    console.log("Session status:", status, "Session:", session);
    console.log("pathname:", pathname);
    
    // Only check admin access when session loading is complete
    if (pathname === "/admin" && status === "authenticated") {
      if (!session?.user?.role || session?.user?.role !== "admin") {
        router.push("/");
      }
    }
    // If not authenticated and session loading is complete, redirect
    else if (pathname === "/admin" && status === "unauthenticated") {
      router.push("/");
    }
    // Don't redirect while session is still loading (status === "loading")
  }, [session?.user, router, pathname, status]);

  useEffect(() => {
    // Dispatch any actions needed to initialize state here
    dispatch(fetchFeatureProducts() as any);
  }, [dispatch]);
  return null;
}
