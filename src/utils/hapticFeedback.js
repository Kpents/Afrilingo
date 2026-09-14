// Vibration is an optional enhancement; unsupported browsers keep the visual press.
export function hapticPress(event) {
  if (event.pointerType !== "touch" || event.currentTarget.disabled) return;
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(8);
  }
}
