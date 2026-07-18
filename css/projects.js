let currentIndex = 0;

function setupSlider(project) {
    const arrows = document.querySelectorAll('.image-arrow');
    const imgEl = document.getElementById('project-image');

    arrows.forEach(arrow => {
      arrow.addEventListener('click', (e) => {
    const clickedArrow = e.target.closest('.image-arrow');
    if (!clickedArrow) return;
    
    // 1. Fade the current image out
    imgEl.style.opacity = 0;

    // 2. Wait for the fade-out to finish (matching your CSS transition)
    setTimeout(() => {
        const direction = clickedArrow.dataset.dir;
        
        // Update index
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % project.images.length;
        } else {
            currentIndex = (currentIndex - 1 + project.images.length) % project.images.length;
        }
        
        // 3. Update the source while opacity is 0
        imgEl.src = project.images[currentIndex];
        
        // 4. Fade back in
        imgEl.style.opacity = 1;
    }, 200); 
});
    });
}