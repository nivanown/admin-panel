document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.custom-scroll').forEach(scroll => {
        const viewport = scroll.querySelector('.custom-scroll__viewport');
        const content = scroll.querySelector('.custom-scroll__content');
        const track = scroll.querySelector('.custom-scroll__track');
        const thumb = scroll.querySelector('.custom-scroll__thumb');

        const updateThumb = () => {
            const viewportWidth = viewport.offsetWidth;
            const contentWidth = content.scrollWidth;
            const ratio = viewportWidth / contentWidth;
            const thumbWidth = Math.max(ratio * track.offsetWidth, 30);
            const maxScrollLeft = contentWidth - viewportWidth;
            const maxThumbLeft = track.offsetWidth - thumbWidth;
            const thumbLeft = (viewport.scrollLeft / maxScrollLeft) * maxThumbLeft;

            track.style.opacity = contentWidth > viewportWidth ? '1' : '0';
            track.style.pointerEvents = contentWidth > viewportWidth ? 'auto' : 'none';
            thumb.style.width = contentWidth > viewportWidth ? `${thumbWidth}px` : '0';
            thumb.style.left = `${thumbLeft}px`;
        };

        viewport.addEventListener('scroll', updateThumb);
        window.addEventListener('resize', updateThumb);

        let isDragging = false, startX = 0, startLeft = 0;

        thumb.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.clientX;
            startLeft = parseFloat(thumb.style.left) || 0;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const maxThumbLeft = track.offsetWidth - thumb.offsetWidth;
            const newLeft = Math.min(Math.max(startLeft + dx, 0), maxThumbLeft);

            thumb.style.left = `${newLeft}px`;
            viewport.scrollLeft = (newLeft / maxThumbLeft) * (content.scrollWidth - viewport.offsetWidth);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        new ResizeObserver(updateThumb).observe(viewport);
        new MutationObserver(updateThumb).observe(scroll, { attributes: true, childList: true, subtree: true });

        updateThumb();
    });
});