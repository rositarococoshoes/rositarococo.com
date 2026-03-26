import { PrevioPagoPaymentSuccessPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago exitoso 2 pares 2026',
  description: 'Pago recibido exitosamente para 2 pares en Rosita Rococo 2026.',
};

export default function PagoExitosoDosParesPage() {
  return <PrevioPagoPaymentSuccessPage pairCount={2} total={137500} />;
}
