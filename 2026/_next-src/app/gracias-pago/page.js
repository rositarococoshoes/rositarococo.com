import { PrevioPagoPaymentSuccessPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago exitoso 2026',
  description: 'Pago recibido exitosamente para 1 par en Rosita Rococo 2026.',
};

export default function PagoExitosoUnParPage() {
  return <PrevioPagoPaymentSuccessPage pairCount={1} total={87500} />;
}
