import { PrevioPagoPaymentSuccessPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago pendiente 2026',
  description: 'Estado pendiente del pago en Rosita Rococo 2026.',
};

export default function PagoPendientePage() {
  return <PrevioPagoPaymentSuccessPage pairCount={1} total={87500} pending />;
}
