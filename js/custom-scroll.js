document.addEventListener('DOMContentLoaded', () => {
  const scrolls = document.querySelectorAll('.custom-scroll');

  scrolls.forEach(initCustomScroll);
});

function initCustomScroll(scroll) {
  const viewport = scroll.querySelector('.custom-scroll__viewport');
  const content = scroll.querySelector('.custom-scroll__content');
  const track = scroll.querySelector('.custom-scroll__track');
  const thumb = scroll.querySelector('.custom-scroll__thumb');

  function updateThumb() {
    const viewportWidth = viewport.offsetWidth;
    const contentWidth = content.scrollWidth;

    if (contentWidth <= viewportWidth) {
      track.style.opacity = '0';
      track.style.pointerEvents = 'none';
      thumb.style.width = '0';
      return;
    }

    track.style.opacity = '1';
    track.style.pointerEvents = 'auto';

    const scrollLeft = viewport.scrollLeft;
    const ratio = viewportWidth / contentWidth;
    const thumbWidth = Math.max(ratio * track.offsetWidth, 30);
    const maxScrollLeft = contentWidth - viewportWidth;
    const maxThumbLeft = track.offsetWidth - thumbWidth;

    const thumbLeft = (scrollLeft / maxScrollLeft) * maxThumbLeft;

    thumb.style.width = `${thumbWidth}px`;
    thumb.style.left = `${thumbLeft}px`;
  }

  // scroll & resize
  viewport.addEventListener('scroll', updateThumb);
  window.addEventListener('resize', updateThumb);

  // drag
  let isDragging = false;
  let startX = 0;
  let startLeft = 0;

  thumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startLeft = parseFloat(thumb.style.left) || 0;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const thumbWidth = thumb.offsetWidth;
    const trackWidth = track.offsetWidth;
    const maxThumbLeft = trackWidth - thumbWidth;

    let newLeft = Math.min(Math.max(startLeft + dx, 0), maxThumbLeft);
    thumb.style.left = `${newLeft}px`;

    const scrollRatio = newLeft / maxThumbLeft;
    const maxScrollLeft = content.scrollWidth - viewport.offsetWidth;
    viewport.scrollLeft = scrollRatio * maxScrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });

  // ResizeObserver — обновляем, когда размер появляется
  const resizeObserver = new ResizeObserver(() => {
    updateThumb();
  });
  resizeObserver.observe(viewport);

  // MutationObserver — отслеживаем классы и стили, влияющие на видимость
  const mutationObserver = new MutationObserver(() => {
    if (scroll.offsetParent !== null) {
      updateThumb();
    }
  });
  mutationObserver.observe(scroll, {
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  // Первая инициализация (если уже видим)
  if (scroll.offsetParent !== null) {
    updateThumb();
  }
}