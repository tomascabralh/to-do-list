import { renderHook, waitFor } from "@testing-library/react";
import { useCategories } from "../../hooks/useCategories";
import { getCategories } from "../../services/api";
import { Category } from "../../types";

// Mock the API function
jest.mock("../../services/api", () => ({
  getCategories: jest.fn(),
}));

const mockGetCategories = getCategories as jest.MockedFunction<
  typeof getCategories
>;

describe("useCategories", () => {
  const mockCategories: Category[] = [
    { id: "cat1", name: "Compras" },
    { id: "cat2", name: "Trabajo" },
    { id: "cat3", name: "Estudios" },
  ];

  beforeEach(() => {
    mockGetCategories.mockClear();
  });

  test("initializes with loading state", () => {
    mockGetCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  test("loads categories successfully", async () => {
    mockGetCategories.mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBe(null);
  });

  test("handles loading error", async () => {
    mockGetCategories.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Error al cargar categorías");
    expect(result.current.categories).toEqual([]);
  });

  test("returns empty array when no categories", async () => {
    mockGetCategories.mockResolvedValue([]);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe(null);
  });
});
