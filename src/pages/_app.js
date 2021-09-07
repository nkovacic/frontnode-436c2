// import App from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import '../sass/main.scss';

import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        if (window.onNextjsAppDidMount) {
            window.onNextjsAppDidMount();
        }

        if (window.onNextjsRouteChangeComplete) {
            window.onNextjsRouteChangeComplete();
        }

        const handleRouteChangeStart = () => {
            if (window.onNextjsRouteChangeStart) {
                window.onNextjsRouteChangeStart();
            }
        }

        const handleRouteChangeComplete = (url) => {
            gtag.pageview(url)

            if (window.onNextjsRouteChangeComplete) {
                window.onNextjsRouteChangeComplete();
            }
        }

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router.events]);

    return <Component {...pageProps} />;
}

export default MyApp
