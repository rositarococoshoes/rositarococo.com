import { Lato, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { BUILD_VERSION, FACEBOOK_PIXEL_ID } from '@/src/lib/funnel-data';

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Lato({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Rosita Rococo 2026',
  description: 'Embudo contrareembolso Rosita Rococo en Next.js con exportacion estatica.',
  other: {
    'rosita-build': BUILD_VERSION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
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
