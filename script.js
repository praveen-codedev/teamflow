/* Dark Mode Toggle + small UI interactions */
(function(){
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('tf_theme');

  // initial theme
  if(saved === 'dark' || (!saved && prefersDark)){
    document.documentElement.classList.add('dark');
    if(toggleBtn) toggleBtn.dataset.mode = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    if(toggleBtn) toggleBtn.dataset.mode = 'light';
  }

  if(toggleBtn){
    toggleBtn.addEventListener('click', ()=>{
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('tf_theme', isDark ? 'dark' : 'light');
      toggleBtn.dataset.mode = isDark ? 'dark' : 'light';
      // small ripple on toggle
      toggleBtn.animate([{ transform:'scale(.98)' }, { transform:'scale(1)' }], { duration:200 });
    });
  }

  // Hero image subtle parallax effect on mousemove
  const heroVis = document.querySelector('.hero-visual img');
  if(heroVis){
    document.querySelector('.hero-visual').addEventListener('mousemove', (e)=>{
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroVis.style.transform = `translate(${x*6}px, ${y*6}px) scale(1.01)`;
    });
    document.querySelector('.hero-visual').addEventListener('mouseleave', ()=>{
      heroVis.style.transform = '';
    });
  }

})();
