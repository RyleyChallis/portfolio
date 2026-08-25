async function loadProjectPage() {
    const titleEl = document.getElementById('project-title');
    if (!titleEl) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = window.location.hash.replace('#', '') || new URLSearchParams(window.location.search).get('id');

    const response = await fetch('css/projects.json');
    const projects = await response.json();

    const project = projects.find(p => p.id === projectId);

    if (!project) {
        titleEl.textContent = 'Project not found';
        return;
    }

    const cleanUrl = `${window.location.origin}${window.location.pathname}#${projectId}`;
    window.history.replaceState({ id: projectId }, document.title, cleanUrl);

    document.getElementById('project-image').src = project.images[0];
    setupSlider(project);

    document.getElementById('project-image').alt = project.title;
    titleEl.textContent = project.title;
    document.getElementById('project-description').textContent = project.description;
    document.getElementById('philosophy-caption').textContent = project.caption;
    document.getElementById('philosophy-caption-two').textContent = project.captionTwo;

    const liveLink = document.getElementById('project-live-link');
    if (liveLink) {
        liveLink.href = project.liveUrl;
    }
}

loadProjectPage();

let currentIndex = 0;

function setupSlider(project) {
    const arrows = document.querySelectorAll('.image-arrow');
    const imgEl = document.getElementById('project-image');

    arrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            const clickedArrow = e.target.closest('.image-arrow');
            if (!clickedArrow) return;

            // This makes the current image actually fade
            imgEl.style.opacity = 0;

            // This makes the computer wait for the fade to finish before bringing in the next
            setTimeout(() => {
                const direction = clickedArrow.dataset.dir;

                // Update index
                if (direction === 'next') {
                    currentIndex = (currentIndex + 1) % project.images.length;
                } else {
                    currentIndex = (currentIndex - 1 + project.images.length) % project.images.length;
                }

                // This updates the image wile changing the opacity, making it look as though it fades
                imgEl.src = project.images[currentIndex];

                // The actual fade
                imgEl.style.opacity = 1;
            }, 400);
        });
    });
}