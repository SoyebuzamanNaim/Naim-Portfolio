// theme toggle
const btn = document.getElementById("theme-toggle");

// function to update theme-dependent elements
function updateThemeElements(isDark) {
  // update decorative line in tech stack section
  const decorativeLine = document.querySelector(
    '.text-center.mb-16 div[style*="gradient"]'
  );
  if (decorativeLine) {
    if (isDark) {
      decorativeLine.style.background =
        "linear-gradient(90deg, transparent, #f5f5f5, transparent)";
    } else {
      decorativeLine.style.background =
        "linear-gradient(90deg, transparent, #1a1a1a, transparent)";
    }
  }
}

// load saved theme or default to light mode
const savedTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = savedTheme;

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  btn.innerHTML = "<i class='fa-solid fa-sun text-xl'></i>";
  updateThemeElements(true);
} else {
  document.body.classList.remove("dark");
  btn.innerHTML = "<i class='fa-solid fa-moon text-xl'></i>";
  updateThemeElements(false);
}

// toggle theme on button click
btn.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    document.body.classList.add("dark");
    btn.innerHTML = "<i class='fa-solid fa-sun text-xl'></i>";
    updateThemeElements(true);
  } else {
    document.body.classList.remove("dark");
    btn.innerHTML = "<i class='fa-solid fa-moon text-xl'></i>";
    updateThemeElements(false);
  }
});

// scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// contact form submission
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("success_modal");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Show success modal
      successModal.showModal();
      // Reset form
      contactForm.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    alert("Oops! Something went wrong. Please try again later.");
    console.error("Form submission error:", error);
  } finally {
    // Restore button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});
