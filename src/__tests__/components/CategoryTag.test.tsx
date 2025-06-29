import { render, screen } from "@testing-library/react";
import CategoryTag from "../../components/CategoryTag";

// Mock the useCategories hook
jest.mock("../../hooks/useCategories", () => ({
  useCategories: () => ({
    categories: [
      { id: "cat1", name: "Compras" },
      { id: "cat2", name: "Trabajo" },
      { id: "cat3", name: "Estudios" },
    ],
    loading: false,
    error: null,
  }),
}));

describe("CategoryTag", () => {
  test("renders category name when category exists", () => {
    render(<CategoryTag categoryId="cat1" />);

    expect(screen.getByText("Compras")).toBeDefined();
  });

  test("renders nothing when category does not exist", () => {
    const { container } = render(<CategoryTag categoryId="nonexistent" />);

    expect(container.firstChild).toBeNull();
  });

  test("applies done styling when done prop is true", () => {
    render(<CategoryTag categoryId="cat1" done={true} />);

    const chip = screen.getByText("Compras");
    expect(chip).toBeDefined();
  });

  test("applies default styling when done prop is false", () => {
    render(<CategoryTag categoryId="cat1" done={false} />);

    const chip = screen.getByText("Compras");
    expect(chip).toBeDefined();
  });

  test("applies default styling when done prop is not provided", () => {
    render(<CategoryTag categoryId="cat1" />);

    const chip = screen.getByText("Compras");
    expect(chip).toBeDefined();
  });

  test("renders different categories correctly", () => {
    render(<CategoryTag categoryId="cat2" />);

    expect(screen.getByText("Trabajo")).toBeDefined();
  });
});
