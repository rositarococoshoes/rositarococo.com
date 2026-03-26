import { PrevioPagoTransferPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Transferencia 1 par 2026',
  description: 'Datos de transferencia bancaria para 1 par en Rosita Rococo 2026.',
};

export default function TransferenciaUnParPage() {
  return <PrevioPagoTransferPage pairCount={1} total={78750} />;
}
