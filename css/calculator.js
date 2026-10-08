// 1. Read values from inputs (e.g., checkboxes, dropdowns, or number inputs)
let basePrice = 2500; // Standard base fee
let pageCount = 5;    // e.g., input from user
let costPerPage = 150;
let hasCustomAnimation = true; // e.g., checkbox checked state

// 2. Do the calculation
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

// --- DOM REFERENCES ---
const packageSelect = document.getElementById('package');
const pagesInput = document.getElementById('pages');
const seoCheckbox = document.getElementById('seoAddon');
const priceDisplay = document.getElementById('priceDisplay');

const steps = document.querySelectorAll('.form-step');
const indicators = document.querySelectorAll('.step-indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentStep = 0;

// --- CURRENCY FORMATTER ---
const formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0
});

// --- MATH CALCULATION ENGINE ---
function calculateTotal() {
  let basePrice = Number(packageSelect.value);
  let extraPages = Number(pagesInput.value);
  let pagesCost = extraPages * 150;
  let seoCost = seoCheckbox.checked ? Number(seoCheckbox.value) : 0;

  let total = basePrice + pagesCost + seoCost;
  priceDisplay.textContent = formatter.format(total);
}

// --- MULTI-STEP NAVIGATION ENGINE ---
function updateStepUI() {
  // 1. Toggle visibility of step panels
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });

  // 2. Update step indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index <= currentStep);
  });

  // 3. Update button states
  prevBtn.disabled = currentStep === 0;

  if (currentStep === steps.length - 1) {
    nextBtn.textContent = 'Complete Quote';
  } else {
    nextBtn.textContent = 'Next';
  }
}

// Next Button Handler
nextBtn.addEventListener('click', () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateStepUI();
  } else {
    alert(`Quote Finished! Final Price: ${priceDisplay.textContent}`);
  }
});

// Back Button Handler
prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateStepUI();
  }
});

// --- REAL-TIME MATH LISTENERS ---
packageSelect.addEventListener('change', calculateTotal);
pagesInput.addEventListener('input', calculateTotal);
seoCheckbox.addEventListener('change', calculateTotal);

// --- INITIALIZE ---
calculateTotal();
updateStepUI();