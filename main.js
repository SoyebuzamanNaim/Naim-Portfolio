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
