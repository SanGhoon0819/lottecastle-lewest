(() => {
 const GA4_ID='G-T4FMP9FTD0';
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 window.gtag('js',new Date());
 window.gtag('config',GA4_ID);
 const ga=document.createElement('script');ga.async=true;ga.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA4_ID);document.head.append(ga);
 const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
 const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');};
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
 nav.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();