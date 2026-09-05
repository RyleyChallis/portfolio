function toggleNav(isOpen) {
  document.getElementById("mySidebar").style.transform = isOpen ? "translateX(0)" : "translateX(100%)";
  
  const overlay = document.getElementById('sidebarOverlay');
  overlay.style.opacity = isOpen ? "1" : "0";
  overlay.style.pointerEvents = isOpen ? "auto" : "none";

  document.documentElement.style.overflowY = isOpen ? "hidden" : "auto";
  document.body.style.userSelect = isOpen ? "none" : "auto";
}

window.onclick = function(event) {
  let modal = document.getElementById('project-popup');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function openNav() {
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

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

  // 1. Check local time (between 6 PM / 18:00 and 6 AM / 06:00)
  const currentHour = new Date().getHours();
  const isNightTime = currentHour >= 18 || currentHour < 6;

  // 2. Determine initial state on page load
  const savedTheme = localStorage.getItem('darkMode');
  let enableDarkMode;

  if (savedTheme === 'enabled') {
    enableDarkMode = true;
  } else if (savedTheme === 'disabled') {
    enableDarkMode = false;
  } else {
    // If user hasn't manually clicked yet, fall back to time
    enableDarkMode = isNightTime;
  }

  // Apply active class & icon on load
  if (enableDarkMode) {
    document.body.classList.add('active');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }

  // 3. Toggle listener
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('active');

      if (document.body.classList.contains('active')) {
        localStorage.setItem('darkMode', 'enabled');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('darkMode', 'disabled'); // Explicitly save 'disabled' so night mode doesn't override manual light selection
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  }
});