import { PrevioPagoLegacyOptionsPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago 1 par 2026',
  description: 'Paso de pago previo para 1 par en Rosita Rococo 2026.',
};

export default function GraciasUnParPage() {
  return <PrevioPagoLegacyOptionsPage pairCount={1} total={87500} />;
}
