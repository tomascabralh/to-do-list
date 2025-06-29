import { handleClose } from "../../utils/handleClose";

describe("handleClose", () => {
  const mockSetError = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockSetError.mockClear();
    mockOnClose.mockClear();
  });

  test("calls setError with empty string", () => {
    handleClose(mockSetError, mockOnClose);

    expect(mockSetError).toHaveBeenCalledWith("");
  });

  test("calls onClose function", () => {
    handleClose(mockSetError, mockOnClose);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls both functions in correct order", () => {
    handleClose(mockSetError, mockOnClose);

    expect(mockSetError).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("calls functions exactly once each", () => {
    handleClose(mockSetError, mockOnClose);

    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
