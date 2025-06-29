export function handleClose(
  setError: (msg: string) => void,
  onClose: () => void
) {
  setError("");
  onClose();
}
