"use client";

import React, { useEffect } from "react";
import { useLoadingStore, useProductStore } from "@/stores";
import { LoadingSpinner } from "@/components";

const ProductLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, setLoading } = useLoadingStore();
  const { initialize } = useProductStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await initialize();
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <section className="flex h-[100vh]">
      <div className="flex-1 p-6 h-[100vh] overflow-y-scroll">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <LoadingSpinner />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default ProductLayout;
