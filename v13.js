// V13 functionality is isolated from the deferred plans.html page.
(() => {
  // Keep the existing optional analytics hooks; no IDs or receiver are configured.
  window.LEWEST = window.LEWEST || {phone:'1877-2027',tracking:{ga4:'',metaPixel:'',naver:''}};
  const campaign = {};
  const query = new URLSearchParams(location.search);
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){
    const value=query.get(key);if(value)campaign[key]=value.slice(0,160);
  }
  if(/^G-[A-Z0-9]+$/.test(window.LEWEST.tracking.ga4)){
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('js',new Date());window.gtag('config',window.LEWEST.tracking.ga4);
    const script=document.createElement('script');script.async=true;
    script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(window.LEWEST.tracking.ga4);
    document.head.append(script);
  }
  document.querySelectorAll('a[href^="tel:"]').forEach(link=>link.addEventListener('click',()=>{
    const data={event:'phone_click',placement:link.dataset.placement||'page',...campaign};
    window.dataLayer=window.dataLayer||[];window.dataLayer.push(data);
    if(window.gtag)window.gtag('event','phone_click',{placement:data.placement,...campaign});
  }));
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  const closeMenu = () => {nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false');};
  menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  nav.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {if(e.key === 'Escape')closeMenu();});
  const dialog = document.querySelector('.lightbox');
  const picture = dialog.querySelector('img');
  const zoom = dialog.querySelector('.lightbox-zoom');
  let opener;
  const resetZoom = () => {dialog.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='원본 크기';};
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    opener=button;picture.src=button.dataset.image;picture.alt=button.dataset.caption;
    document.querySelector('#lightbox-caption').textContent=button.dataset.caption;
    resetZoom();dialog.showModal();document.body.classList.add('modal-open');
    dialog.querySelector('.lightbox-close').focus();
  }));
  dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog||e.target.classList.contains('lightbox-view'))dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');resetZoom();if(opener)opener.focus();});
  zoom.addEventListener('click',()=>{const expanded=dialog.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(expanded));zoom.textContent=expanded?'화면에 맞춤':'원본 크기';});
  const form=document.querySelector('#lead-form');
  if(form&&!window.LEWEST_REGISTRATION_ENDPOINT)form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#form-status').textContent='온라인 접수 준비 중입니다. 1877-2027로 전화 문의해 주세요.';});
})();
