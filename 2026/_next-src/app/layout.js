import { Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { BASE_PATH, BUILD_VERSION, FACEBOOK_PIXEL_ID } from '@/src/lib/funnel-data';

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const SITE_URL = 'https://rositarococo.com';
const SITE_TITLE = 'Rosita Rococo | Oto\u00f1o-Invierno 2026';
const SITE_DESCRIPTION = 'Descubr\u00ed la colecci\u00f3n Oto\u00f1o-Invierno 2026 de Rosita Rococo. Compr\u00e1 online, por transferencia o contrarreembolso con env\u00edo gratis a todo el pa\u00eds.';
const SHARE_IMAGE_URL = `${BASE_PATH}/og-contrareembolso-2026.png`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Rosita Rococo',
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Rosita Rococo',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Rosita Rococo Oto\u00f1o-Invierno 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
      { url: `${BASE_PATH}/favicon-32x32.png`, type: 'image/png', sizes: '32x32' },
    ],
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  manifest: `${BASE_PATH}/site.webmanifest`,
  other: {
    'rosita-build': BUILD_VERSION,
  },
};

export const viewport = {
  themeColor: '#f2e8dd',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={serif.variable}>
      <body>
        <Script id="build-version" strategy="beforeInteractive">
          {`console.info('[Rosita 2026] build ${BUILD_VERSION}');`}
        </Script>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${FACEBOOK_PIXEL_ID}');fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img alt="" height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`} />
        </noscript>
        {children}
        <div className="build-version-marker" aria-label="version">v{BUILD_VERSION}</div>
      </body>
    </html>
  );
}
