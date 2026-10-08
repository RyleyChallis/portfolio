let basePrice = 2500;
let pageCount = 5;
let costPerPage = 150;
let copyAddon = 650;
let hasCustomAnimation = true;

let subtotal = basePrice + (pageCount * costPerPage);

if (hasCustomAnimation) {
  subtotal += 450;
}

let vatRate = 0.20;
let totalWithVat = subtotal * (1 + vatRate);

let formattedPrice = totalWithVat.toFixed(2);

let ukCurrencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
});

let finalDisplayPrice = ukCurrencyFormatter.format(totalWithVat);

console.log(finalDisplayPrice);

const packageSelect = document.getElementById('package');
const pagesInput = document.getElementById('pages');
const seoCheckbox = document.getElementById('seoAddon');
const copyCheckbox = document.getElementById('copyAddon');
const priceDisplay = document.getElementById('priceDisplay');

const steps = document.querySelectorAll('.form-step');
const indicators = document.querySelectorAll('.step-indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentStep = 0;

const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0
});

function calculateTotal() {
  let basePrice = Number(packageSelect.value);
  let extraPages = Number(pagesInput.value);
  let pagesCost = extraPages * 150;
  let seoCost = seoCheckbox.checked ? Number(seoCheckbox.value) : 0;
  let copyCost = copyCheckbox.checked ? Number(copyCheckbox.value) : 0;

  let total = basePrice + pagesCost + seoCost + copyCost;
  priceDisplay.textContent = formatter.format(total);
}

function updateStepUI() {
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index <= currentStep);
  });

  prevBtn.disabled = currentStep === 0;

  if (currentStep === steps.length - 1) {
    nextBtn.textContent = 'Complete Quote';
  } else {
    nextBtn.textContent = 'Next';
  }
}

nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStepUI();
  } else {
    alert(`Quote Finished! Final Price: ${priceDisplay.textContent}`);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStepUI();
  }
});

packageSelect.addEventListener('change', calculateTotal);
pagesInput.addEventListener('input', calculateTotal);
seoCheckbox.addEventListener('change', calculateTotal);
copyCheckbox.addEventListener('change', calculateTotal);

calculateTotal();
updateStepUI();