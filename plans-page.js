(() => {
 const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');
 const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');};
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
 nav.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
})();