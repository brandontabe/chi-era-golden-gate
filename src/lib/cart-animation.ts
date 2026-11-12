/** Animate a product from the pressed button into the visible navbar bag. */
export function animateAddToCart(button: HTMLElement, image: string) {
  const cart = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!cart || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const source = button.getBoundingClientRect();
  const destination = cart.getBoundingClientRect();
  const thumbnail = document.createElement("img");
  thumbnail.src = image;
  thumbnail.alt = "";
  thumbnail.setAttribute("aria-hidden", "true");
  thumbnail.className = "cart-flying-product";
  const x = source.left + source.width / 2 - 24;
  const y = source.top + source.height / 2 - 24;
  thumbnail.style.left = `${x}px`;
  thumbnail.style.top = `${y}px`;
  document.body.appendChild(thumbnail);
  const dx = destination.left + destination.width / 2 - 24 - x;
  const dy = destination.top + destination.height / 2 - 24 - y;
  const flight = thumbnail.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${dx * 0.4}px, ${dy * 0.55 - 40}px) scale(.8)`,
        opacity: 0.95,
        offset: 0.5,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(.15)`, opacity: 0.2 },
    ],
    { duration: 650, easing: "cubic-bezier(.3,0,.2,1)" },
  );
  void flight.finished
    .then(() => {
      if (!cart.isConnected) return;
      cart.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
        { duration: 300 },
      );
      cart
        .querySelector("[data-cart-count]")
        ?.animate(
          [{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }],
          { duration: 300 },
        );
    })
    .catch(() => {
      /* A cancelled animation must not affect the cart. */
    })
    .finally(() => thumbnail.remove());
}
