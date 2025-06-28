import { useEffect, useState } from "react";
import { Category } from "../types";
import { getCategories } from "../services/api";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(setCategories)
      .catch(() => setError("Error al cargar categorías"))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
