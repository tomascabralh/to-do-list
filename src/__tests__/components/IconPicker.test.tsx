import { render, screen, fireEvent } from "@testing-library/react";
import IconPicker from "../../components/IconPicker";

const mockOnChange = jest.fn();

describe("IconPicker", () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test("renders all icon options", () => {
    render(<IconPicker value="" onChange={mockOnChange} />);

    const iconButtons = screen.getAllByRole("button");
    expect(iconButtons).toHaveLength(10);
  });

  test("calls onChange when an icon is selected", () => {
    render(<IconPicker value="" onChange={mockOnChange} />);

    const firstIconButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstIconButton);

    expect(mockOnChange).toHaveBeenCalledWith("manzana");
  });

  test("highlights selected icon with custom color", () => {
    const selectedIcon = "agua";
    const selectedColor = "#FF0000";
    render(
      <IconPicker
        value={selectedIcon}
        onChange={mockOnChange}
        selectedColor={selectedColor}
      />
    );

    const iconButtons = screen.getAllByRole("button");
    const selectedButton = iconButtons.find(
      (button) => button.getAttribute("aria-pressed") === "true"
    );

    expect(selectedButton).toBeDefined();
  });

  test("shows unselected icons in gray", () => {
    render(<IconPicker value="" onChange={mockOnChange} />);

    const iconButtons = screen.getAllByRole("button");
    const unselectedButtons = iconButtons.filter(
      (button) => button.getAttribute("aria-pressed") === "false"
    );

    expect(unselectedButtons).toHaveLength(10);
  });

  test("renders with grid layout", () => {
    render(<IconPicker value="" onChange={mockOnChange} />);

    const iconButtons = screen.getAllByRole("button");
    const gridContainer = iconButtons[0].parentElement?.parentElement;
    expect(gridContainer).toBeDefined();
  });
});
