
AOS.init({ once:true, duration:700, easing:'ease-out-cubic' });
document.addEventListener('DOMContentLoaded',()=>{
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
});


/* KPIs counters */
function animateCounter(el, to, duration=1200){
  const start = 0; const startTime = performance.now();
  function tick(now){
    const p = Math.min((now-startTime)/duration, 1);
    const val = Math.floor(start + (to-start) * (p<1? (1-Math.pow(1-p,3)) : 1));
    el.textContent = val.toLocaleString('pt-BR');
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.addEventListener('DOMContentLoaded',()=>{
  const counters = document.querySelectorAll('.counter[data-target]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        if(!el.dataset.done){
          animateCounter(el, parseInt(el.dataset.target,10));
          el.dataset.done="1";
        }
        el.style.visibility='visible';
        io.unobserve(el);
      }
    });
  },{threshold:.3});
  counters.forEach(c=>io.observe(c));
});


/* Bootstrap form validation */
(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})();


/* HEDGER_WA_SUBMIT: Send form content to WhatsApp (prefilled chat) */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    if(!form.checkValidity()){
      // Let Bootstrap validation run
      return;
    }
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const phone = document.getElementById('cf-phone').value.trim();
    const subject = document.getElementById('cf-subject').value;
    const message = document.getElementById('cf-message').value.trim();

    const lines = [
      '*Novo contato pelo site Hedger*',
      `Assunto: ${subject}`,
      `Nome: ${name}`,
      `E-mail: ${email}`,
      phone ? `Telefone: ${phone}` : null,
      '---',
      message,
      '---',
      'Endereço da empresa: R.: Coronel Augusto César, nº 970 Centro - Leme/SP'
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const hedgerNumber = '5519989704186'; // Empresa
    const waUrl = `https://wa.me/${hedgerNumber}?text=${text}`;
    window.open(waUrl, '_blank');
  }, false);
});


/* COPY_HEDGER_ADDRESS: quick copy button */
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('copy-address');
  const span = document.getElementById('hedger-address');
  if(btn && span){
    btn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(span.textContent.trim());
        btn.innerHTML = '<i class="bi bi-clipboard-check"></i> Copiado!';
        setTimeout(()=>btn.innerHTML='<i class="bi bi-clipboard"></i> Copiar', 1600);
      }catch(e){ console.warn('Clipboard falhou', e); }
    });
  }
});
