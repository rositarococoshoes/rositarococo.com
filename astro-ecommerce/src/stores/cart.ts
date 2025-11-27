import { atom } from 'nanostores';

export interface CartItem {
  id: string;
  model: string;
  size: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  total: number;
}

// Store inicial
export const cartStore = atom<CartState>({
  items: [],
  isOpen: false,
  count: 0,
  total: 0,
});

// Productos disponibles
export const products = {
  'negras': {
    name: 'Guillerminas Negras',
    price: 60000,
    image: '/guillerminafotos/1.webp'
  },
  'camel': {
    name: 'Guillerminas Camel',
    price: 60000,
    image: '/guillerminafotos/guillerminascamel/1.webp'
  },
  'blancas': {
    name: 'Guillerminas Blancas',
    price: 60000,
    image: '/guillerminafotos/guillerminasblancas/1.webp'
  }
};

// Cargar carrito desde localStorage
export function loadCartFromStorage(): CartState {
  if (typeof window === 'undefined') {
    return { items: [], isOpen: false, count: 0, total: 0 };
  }
  
  try {
    const stored = localStorage.getItem('rosita-cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      const { count, total } = calculateTotals(parsed.items);
      return { ...parsed, count, total };
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  
  return { items: [], isOpen: false, count: 0, total: 0 };
}

// Guardar carrito en localStorage
export function saveCartToStorage(cart: CartState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('rosita-cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

// Calcular totales
export function calculateTotals(items: CartItem[]): { count: number; total: number } {
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Lógica de descuentos: 2 pares x $95.000, 1 par x $60.000
  let total = 0;
  if (count >= 2) {
    total = (count / 2) * 95000 + (count % 2) * 60000;
  } else {
    total = count * 60000;
  }
  
  return { count, total };
}

// Agregar producto al carrito
export function addToCart(model: string, size: string): void {
  const cart = cartStore.get();
  const product = products[model as keyof typeof products];
  
  if (!product) {
    console.error('Product not found:', model);
    return;
  }
  
  const existingItem = cart.items.find(
    item => item.model === model && item.size === size
  );
  
  let newItems: CartItem[];
  
  if (existingItem) {
    // Si el producto ya existe, incrementar cantidad
    newItems = cart.items.map(item =>
      item.model === model && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    // Si es un producto nuevo, agregarlo
    const newItem: CartItem = {
      id: `${model}-${size}-${Date.now()}`,
      model,
      size,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    newItems = [...cart.items, newItem];
  }
  
  const { count, total } = calculateTotals(newItems);
  const newCart = { ...cart, items: newItems, count, total };
  
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Remover producto del carrito
export function removeFromCart(itemId: string): void {
  const cart = cartStore.get();
  const newItems = cart.items.filter(item => item.id !== itemId);
  const { count, total } = calculateTotals(newItems);
  const newCart = { ...cart, items: newItems, count, total };
  
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Actualizar cantidad de un producto
export function updateQuantity(itemId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  
  const cart = cartStore.get();
  const newItems = cart.items.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  );
  const { count, total } = calculateTotals(newItems);
  const newCart = { ...cart, items: newItems, count, total };
  
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Toggle carrito
export function toggleCart(): void {
  const cart = cartStore.get();
  const newCart = { ...cart, isOpen: !cart.isOpen };
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Cerrar carrito
export function closeCart(): void {
  const cart = cartStore.get();
  const newCart = { ...cart, isOpen: false };
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Vaciar carrito
export function clearCart(): void {
  const newCart = { items: [], isOpen: false, count: 0, total: 0 };
  cartStore.set(newCart);
  saveCartToStorage(newCart);
}

// Inicializar el carrito cuando se carga la página
if (typeof window !== 'undefined') {
  const initialCart = loadCartFromStorage();
  cartStore.set(initialCart);
}
