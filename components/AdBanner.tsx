
import React, { useEffect, useRef } from 'react';

const AdBanner: React.FC = () => {
    const adRef = useRef<HTMLDivElement>(null);
    const adLoaded = useRef(false);

    useEffect(() => {
        const adContainer = adRef.current;
        if (adContainer && !adLoaded.current) {
            adLoaded.current = true;

            const observer = new MutationObserver(() => {
                // When the ad network script adds an iframe or other content, stop the pulse animation.
                if (adContainer.querySelector('iframe, ins, img')) {
                    adContainer.classList.remove('animate-pulse-bg');
                    observer.disconnect();
                }
            });

            observer.observe(adContainer, { childList: true });
            
            const optionsScript = document.createElement('script');
            optionsScript.type = 'text/javascript';
            optionsScript.innerHTML = `
                atOptions = {
                    'key' : '2c4d8a16ca5c68fe4b2cdf9add05e2f2',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            `;
            adContainer.appendChild(optionsScript);

            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = '//hypothesisgarden.com/2c4d8a16ca5c68fe4b2cdf9add05e2f2/invoke.js';
            adContainer.appendChild(invokeScript);

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return <div ref={adRef} className="flex justify-center items-center w-full max-w-[320px] min-h-[50px] mx-auto my-4 rounded animate-pulse-bg"></div>;
};

export default AdBanner;