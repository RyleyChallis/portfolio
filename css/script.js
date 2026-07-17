function openPopup() {
    const popup = document.getElementById('project-popup');
    popup.classList.add('active');
}

function closePopup() {
    const popup = document.getElementById('project-popup');
    popup.classList.remove('active');
}

window.onclick = function(event) {
  let modal = document.getElementById('project-popup');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openQuotePopup() {
    const popup = document.getElementById('quote-popup');
    popup.classList.add('active');
}

function closeQuotePopup() {
    const popup = document.getElementById('quote-popup');
    popup.classList.remove('active');
}

window.onclick = function(event) {
  let modal = document.getElementById('quote-popup');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openNav() {
    // Instead of width, we translate to 0 (fully visible)
    document.getElementById("mySidebar").style.transform = "translateX(0)";

    const overlay = document.getElementById('sidebarOverlay');
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";

    document.documentElement.style.overflowY = "hidden";
    document.body.style.userSelect = "none";
}

function closeNav() {
    document.getElementById("mySidebar").style.transform = "translateX(100%)";

    const overlay = document.getElementById('sidebarOverlay');
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    document.documentElement.style.overflowY = "auto";
    document.body.style.userSelect = "auto";
}

const sidebarLinks = document.querySelectorAll('.sidebar-links a');

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeNav();
    });
});

const faqItems = document.querySelectorAll('.faq-card');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
});

const packageItems = document.querySelectorAll('#packages-page .package-card');

packageItems.forEach(item => {
    const questions = item.querySelectorAll('.package-question');
    const answer = item.querySelector('.package-answer');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            packageItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.package-answer').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

function toggleDropdown(event) {
    event.stopPropagation();
    
    const dropdown = document.getElementById("sidebarDropdown");
    const arrow = event.currentTarget.querySelector('i');

    dropdown.classList.toggle("show");

    if (dropdown.classList.contains("show")) {
        arrow.style.transform = "rotate(90deg)";
    } else {
        arrow.style.transform = "rotate(0deg)";
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbz1XmnObFAQP-H9R0Dy8NvcshK8uQLMNfatyky6jFk5HgTCZ5KMYkIbV3gvZpo5iYJR/exec';
const form = document.getElementById('booking-form');

if (!form) {
    console.error("CRITICAL: The browser cannot find an element with id='booking-form'");
} else {
form.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let firstInvalidInput = null;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            if (!firstInvalidInput) firstInvalidInput = input;
            input.style.borderColor = "red";
        } else {
            input.style.borderColor = "";
        }
    });

    if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput.focus();
        return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            submitBtn.innerText = "Success!";
            submitBtn.style.backgroundColor = "#28a745";

            openPopup();

            setTimeout(() => {
                closePopup();
                form.reset();
                
                submitBtn.innerText = "Send Inquiry";
                submitBtn.style.backgroundColor = "";
                submitBtn.disabled = false;
            }, 3000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            submitBtn.innerText = "Try Again";
            submitBtn.disabled = false;
        });
    });
};

async function loadProjectPage() {
  // Only run this on project.html
  const titleEl = document.getElementById('project-title');
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');

  const response = await fetch('css/projects.json');
  const projects = await response.json();

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    titleEl.textContent = 'Project not found';
    return;
  }

  document.getElementById('project-image').src = project.image;
  document.getElementById('project-image').alt = project.title;
  titleEl.textContent = project.title;
  document.getElementById('project-description').textContent = project.description;
  document.getElementById('project-live-link').href = project.liveUrl;

  const techList = document.getElementById('project-tech');
  techList.innerHTML = project.tech.map(t => `<li>${t}</li>`).join('');
}

loadProjectPage();