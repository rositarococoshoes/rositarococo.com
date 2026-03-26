import { PrevioPagoLegacyOptionsPage } from '@/src/components/PrevioPagoPostPurchasePages';

export const metadata = {
  title: 'Rosita Rococo | Pago 2 pares 2026',
  description: 'Paso de pago previo para 2 pares en Rosita Rococo 2026.',
};

export default function GraciasDosParesPage() {
  return <PrevioPagoLegacyOptionsPage pairCount={2} total={137500} />;
}
