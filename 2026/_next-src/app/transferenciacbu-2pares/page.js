import { PrevioPagoTransferPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Transferencia 2 pares 2026',
  description: 'Datos de transferencia bancaria para 2 pares en Rosita Rococo 2026.',
};

export default function TransferenciaDosParesPage() {
  return <PrevioPagoTransferPage pairCount={2} total={123750} />;
}
