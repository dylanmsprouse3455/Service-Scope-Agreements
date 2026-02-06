// ===============================
// Wizard State
// ===============================
const steps = Array.from(document.querySelectorAll(".step"));
const bar = document.getElementById("bar");
const stepLabel = document.getElementById("stepLabel");

let idx = 0;

// ===============================
// Render Current Step
// ===============================
function render() {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === idx);
  });

  const progressPercent = ((idx + 1) / steps.length) * 100;
  bar.style.width = `${progressPercent}%`;

  if (stepLabel) {
    stepLabel.textContent = `Step ${idx + 1} of ${steps.length}`;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ===============================
// Navigation
// ===============================
function nextStep() {
  if (idx < steps.length - 1) {
    idx++;
    render();
  }
}

function prevStep() {
  if (idx > 0) {
    idx--;
    render();
  }
}

// ===============================
// Init on Load
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Set today's date automatically if date field exists
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  // Safety check
  if (steps.length === 0) {
    console.error("Wizard error: No .step elements found.");
    return;
  }

  // Initial render
  render();
});