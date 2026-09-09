interface CartLine {
  name: string;
  price: number;
  quantity: number;
}

type Cleanup = () => void;

function productFromButton(button: HTMLButtonElement): Omit<CartLine, 'quantity'> | null {
  const card = button.closest<HTMLElement>('article');
  const name = card?.querySelector<HTMLElement>('h3')?.textContent?.trim();
  const priceText = card?.querySelector<HTMLElement>('.product-meta strong')?.textContent ?? '';
  const price = Number.parseFloat(priceText.replace(/[^0-9.]/g, ''));

  if (!name || !Number.isFinite(price)) return null;
  return { name, price };
}

export function initCart(): Cleanup {
  const countNode = document.querySelector<HTMLElement>('[data-cart-count]');
  const bagButton = document.querySelector<HTMLButtonElement>('[data-cart-button]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-cart-dialog]');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-cart-close]');
  const clearButton = document.querySelector<HTMLButtonElement>('[data-cart-clear]');
  const continueLink = document.querySelector<HTMLAnchorElement>('[data-cart-continue]');
  const list = document.querySelector<HTMLUListElement>('[data-cart-items]');
  const empty = document.querySelector<HTMLElement>('[data-cart-empty]');
  const totalNode = document.querySelector<HTMLElement>('[data-cart-total]');
  const toast = document.querySelector<HTMLElement>('[data-cart-toast]');
  const lines = new Map<string, CartLine>();
  const cleanups: Cleanup[] = [];
  let toastTimer: number | undefined;

  const totalQuantity = () => Array.from(lines.values()).reduce((sum, line) => sum + line.quantity, 0);
  const totalPrice = () => Array.from(lines.values()).reduce((sum, line) => sum + line.price * line.quantity, 0);

  const render = () => {
    const quantity = totalQuantity();
    if (countNode) countNode.textContent = String(quantity);
    bagButton?.setAttribute('aria-label', `Shopping bag, ${quantity} ${quantity === 1 ? 'item' : 'items'}`);

    if (empty) empty.hidden = quantity > 0;
    if (list) {
      list.hidden = quantity === 0;
      list.replaceChildren(
        ...Array.from(lines.values()).map((line) => {
          const item = document.createElement('li');
          item.className = 'cart-line';

          const copy = document.createElement('div');
          const name = document.createElement('strong');
          const meta = document.createElement('span');
          name.textContent = line.name;
          meta.textContent = `${line.quantity} × $${line.price.toFixed(0)}`;
          copy.append(name, meta);

          const amount = document.createElement('strong');
          amount.textContent = `$${(line.price * line.quantity).toFixed(0)}`;
          item.append(copy, amount);
          return item;
        }),
      );
    }

    if (totalNode) totalNode.textContent = `$${totalPrice().toFixed(0)}`;
    if (clearButton) clearButton.disabled = quantity === 0;
  };

  const announce = (message: string) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };

  document.querySelectorAll<HTMLButtonElement>('[data-add-to-cart]').forEach((button) => {
    const product = productFromButton(button);
    if (!product) return;

    button.setAttribute('aria-label', `Add ${product.name} to bag`);
    const onAdd = () => {
      const existing = lines.get(product.name);
      lines.set(product.name, {
        ...product,
        quantity: (existing?.quantity ?? 0) + 1,
      });
      render();
      const quantity = totalQuantity();
      announce(`${product.name} added. Bag now has ${quantity} ${quantity === 1 ? 'item' : 'items'}.`);
    };

    button.addEventListener('click', onAdd);
    cleanups.push(() => button.removeEventListener('click', onAdd));
  });

  const openCart = () => {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.body.classList.add('cart-open');
  };

  const closeCart = () => {
    if (!dialog?.open) return;
    dialog.close();
  };

  const onDialogClose = () => document.body.classList.remove('cart-open');
  const onDialogClick = (event: MouseEvent) => {
    if (event.target === dialog) closeCart();
  };
  const clearCart = () => {
    lines.clear();
    render();
    announce('Bag cleared.');
  };

  bagButton?.addEventListener('click', openCart);
  closeButton?.addEventListener('click', closeCart);
  clearButton?.addEventListener('click', clearCart);
  continueLink?.addEventListener('click', closeCart);
  dialog?.addEventListener('close', onDialogClose);
  dialog?.addEventListener('click', onDialogClick);

  cleanups.push(
    () => bagButton?.removeEventListener('click', openCart),
    () => closeButton?.removeEventListener('click', closeCart),
    () => clearButton?.removeEventListener('click', clearCart),
    () => continueLink?.removeEventListener('click', closeCart),
    () => dialog?.removeEventListener('close', onDialogClose),
    () => dialog?.removeEventListener('click', onDialogClick),
  );

  render();

  return () => {
    window.clearTimeout(toastTimer);
    document.body.classList.remove('cart-open');
    cleanups.forEach((cleanup) => cleanup());
  };
}
