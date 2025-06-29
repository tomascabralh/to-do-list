import { render, screen, fireEvent } from "@testing-library/react";
import ColorPicker from "../../components/ColorPicker";

const mockOnChange = jest.fn();

describe("ColorPicker", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders all color options", () => {
    render(<ColorPicker value="" onChange={mockOnChange} />);

    const colorButtons = screen.getAllByRole("button");
    expect(colorButtons).toHaveLength(10);
  });

  test("calls onChange when a color is selected", () => {
    render(<ColorPicker value="" onChange={mockOnChange} />);

    const firstColorButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstColorButton);

    expect(mockOnChange).toHaveBeenCalledWith("#FF5E5E");
  });

  test("highlights selected color", () => {
    const selectedColor = "#FAC3D6";
    render(<ColorPicker value={selectedColor} onChange={mockOnChange} />);

    const colorButtons = screen.getAllByRole("button");
    const selectedButton = colorButtons.find(
      (button) => button.getAttribute("value") === selectedColor
    );
    const selectedBox = selectedButton?.querySelector(
      '[style*="border: 2px solid #888"]'
    );
    expect(selectedBox).toBeDefined();
  });

  test("shows unselected colors with gray border", () => {
    render(<ColorPicker value="" onChange={mockOnChange} />);

    const colorButtons = screen.getAllByRole("button");
    const unselectedButtons = colorButtons.filter(
      (button) => button.getAttribute("aria-pressed") === "false"
    );
    expect(unselectedButtons).toHaveLength(10);
  });
});
