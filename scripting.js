document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const valueDisplay = slider.nextElementSibling;
    valueDisplay.textContent = slider.value + "%";

    slider.addEventListener("input", function () {
      valueDisplay.textContent = this.value + "%";
    });
  });

  const chipCloses = document.querySelectorAll(".chip .close");
  chipCloses.forEach((close) => {
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.style.display = "none";
      showToast("Chip removed", "info");
    });
  });
});

function toggleAccordion(element) {
  const content = element.nextElementSibling;
  const isActive = content.classList.contains("active");

  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".accordion-header i").forEach((icon) => {
    icon.textContent = "expand_more";
  });

  if (!isActive) {
    content.classList.add("active");
    element.querySelector("i").textContent = "expand_less";
  }
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<div>${message}</div><span class="toast-close" onclick="this.parentElement.remove()">&times;</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentElement) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }
  }, 5000);
}

function openTab(evt, tabId) {
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.style.display = "none";
  });

  document.querySelectorAll(".tab-link").forEach((link) => {
    link.classList.remove("active");
  });

  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function toggleDropdown(button) {
  const dropdownMenu = button.nextElementSibling;
  dropdownMenu.classList.toggle("show");

  window.onclick = function (e) {
    if (!e.target.matches(".dropdown-toggle")) {
      dropdownMenu.classList.remove("show");
    }
  };
}

function toggleChip(chip) {
  chip.classList.toggle("active");
  const isActive = chip.classList.contains("active");
  showToast(`Chip ${isActive ? "activated" : "deactivated"}`, isActive ? "success" : "info");
}

function removeChip(event, chip) {
  event.stopPropagation();
  chip.style.display = "none";
  showToast("Chip removed", "info");
}

function toggleSwitch(name, isChecked) {
  showToast(`${name} ${isChecked ? "enabled" : "disabled"}`, isChecked ? "success" : "info");
}

function selectListItem(item) {
  document.querySelectorAll(".list-item").forEach((li) => {
    li.style.backgroundColor = "";
  });
  item.style.backgroundColor = "rgba(67, 97, 238, 0.1)";
  showToast(`Selected: ${item.querySelector("span").textContent}`, "success");
}

function handleFormSubmit(event) {
  event.preventDefault();
  showToast("Form submitted successfully!", "success");
  event.target.reset();
}

function editItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  showToast(`Editing: ${name}`, "info");
}

function deleteItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  row.style.opacity = "0.5";
  showToast(`Deleted: ${name}`, "warning");
}

function sortTable(columnIndex) {
  showToast(`Sorting by column ${columnIndex + 1}`, "info");
}

function closeAlert(alert) {
  alert.style.display = "none";
}

function showAlert(type) {
  let message = "";
  switch (type) {
    case "success":
      message = "This is a success message!";
      break;
    case "warning":
      message = "This is a warning message!";
      break;
    case "info":
      message = "This is an info message!";
      break;
  }
  showToast(message, type);
}

function animateProgress(id, targetWidth) {
  const progressBar = document.getElementById(id);
  progressBar.style.width = targetWidth + "%";
  showToast(`Progress updated to ${targetWidth}%`, "success");
}

function changePage(page) {
  showToast(`Navigating to page ${page}`, "info");
}

function navigateBreadcrumb(page) {
  showToast(`Navigating to ${page}`, "info");
}

function setActiveNav(item) {
  document.querySelectorAll(".nav-item").forEach((navItem) => {
    navItem.classList.remove("active");
  });
  item.classList.add("active");
  showToast(`Navigating to ${item.textContent}`, "info");
}

function updateSliderValue(slider, valueId) {
  document.getElementById(valueId).textContent = slider.value + "%";
}

function updateOpacity(value) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = value / 100;
  });
}

function togglePanel() {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");
  panel.classList.toggle("open");

  if (panel.classList.contains("open")) {
    pullTab.style.display = "none";
  } else {
    setTimeout(() => {
      pullTab.style.display = "flex";
    }, 300);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const panel = document.getElementById("customPanel");
    if (panel.classList.contains("open")) {
      togglePanel();
    }
  }
});

document.addEventListener("click", function (event) {
  const panel = document.getElementById("customPanel");
  const panelToggle = document.querySelector(".panel-toggle");
  const pullTab = document.getElementById("panelPullTab");

  if (pullTab.contains(event.target)) return;

  if (panel.classList.contains("open") &&
      !panel.contains(event.target) &&
      event.target !== panelToggle &&
      !panelToggle.contains(event.target)) {
    togglePanel();
  }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", function (event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}, false);

function handleSwipe() {
  const panel = document.getElementById("customPanel");
  const swipeThreshold = 50;

  if (panel.classList.contains("open") && touchStartX - touchEndX > swipeThreshold) {
    togglePanel();
  }

  if (!panel.classList.contains("open") && touchEndX - touchStartX > swipeThreshold && touchStartX < 50) {
    togglePanel();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");
  updateClock();
  setInterval(updateClock, 1000);
  generateCalendar();

  if (!panel.classList.contains("open")) {
    pullTab.style.display = "flex";
  }
});

function changeColor(variable, color) {
  document.documentElement.style.setProperty(`--${variable}`, color);
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });
  event.target.classList.add("active");
  showToast(`Color changed to ${color}`, "success");
}

function changeTheme(theme) {
  let primary, secondary, light, dark, bodyBg, cardBg, textColor, borderColor;

  switch (theme) {
    case "dark":
      primary = "#7b68ee";
      secondary = "#4cc9f0";
      light = "#2d3748";
      dark = "#f8f9fa";
      bodyBg = "#121212";
      cardBg = "#1e1e1e";
      textColor = "#e2e8f0";
      borderColor = "#4a5568";
      break;
    case "blue":
      primary = "#0077b6";
      secondary = "#00b4d8";
      light = "#caf0f8";
      dark = "#03045e";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    case "green":
      primary = "#2a9d8f";
      secondary = "#e9c46a";
      light = "#e9f5db";
      dark = "#264653";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    default:
      primary = "#4361ee";
      secondary = "#3a0ca3";
      light = "#f8f9fa";
      dark = "#212529";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
  }

  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
  document.documentElement.style.setProperty("--light", light);
  document.documentElement.style.setProperty("--dark", dark);
  document.documentElement.style.setProperty("--body-bg", bodyBg);
  document.documentElement.style.setProperty("--card-bg", cardBg);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--border-color", borderColor);

  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  showToast(`Theme changed to ${theme}`, "success");
}

function changeFontSize(size) {
  document.documentElement.style.fontSize = size + "px";
  document.getElementById("fontSizeValue").textContent = size + "px";
}

function changeBorderRadius(radius) {
  document.documentElement.style.setProperty("--border-radius", radius + "px");
  document.getElementById("borderRadiusValue").textContent = radius + "px";

  document.querySelectorAll("*").forEach((el) => {
    if (window.getComputedStyle(el).borderRadius !== "0px") {
      el.style.borderRadius = radius + "px";
    }
  });
}

function resetStyles() {
  document.documentElement.style.setProperty("--primary", "#4361ee");
  document.documentElement.style.setProperty("--secondary", "#3a0ca3");
  document.documentElement.style.setProperty("--light", "#f8f9fa");
  document.documentElement.style.setProperty("--dark", "#212529");
  document.documentElement.style.setProperty("--body-bg", "#f5f7ff");
  document.documentElement.style.setProperty("--card-bg", "#ffffff");
  document.documentElement.style.setProperty("--text-color", "#212529");
  document.documentElement.style.setProperty("--border-color", "#e9ecef");

  document.body.classList.remove("dark-theme");

  document.documentElement.style.fontSize = "16px";
  document.getElementById("fontSize").value = "16";
  document.getElementById("fontSizeValue").textContent = "16px";

  document.documentElement.style.setProperty("--border-radius", "5px");
  document.getElementById("borderRadius").value = "5";
  document.getElementById("borderRadiusValue").textContent = "5px";

  document.getElementById("themeSelect").value = "light";

  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });

  const defaultColorOption = document.querySelector('.color-option[style*="#4361ee"]');
  if (defaultColorOption) defaultColorOption.classList.add("active");

  showToast("Styles reset to default", "success");
}

let clockType = "digital";

function setClockType(type) {
  clockType = type;

  document.getElementById("digitalToggle").classList.toggle("active", type === "digital");
  document.getElementById("analogToggle").classList.toggle("active", type === "analog");

  const analogContainer = document.getElementById("analog-clock-container");
  const digitalClock = document.getElementById("clock");

  if (type === "digital") {
    analogContainer.style.display = "none";
    digitalClock.style.display = "block";
  } else {
    analogContainer.style.display = "flex";
    digitalClock.style.display = "none";
    drawAnalogClock();
  }
}

function updateClock() {
  const now = new Date();

  if (clockType === "digital") {
    const timeString = now.toLocaleTimeString();
    document.getElementById("clock").textContent = timeString;
  } else {
    drawAnalogClock();
  }

  const dateString = now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  document.getElementById("date").textContent = dateString;
}

function drawAnalogClock() {
  const canvas = document.getElementById("analog-clock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--card-bg");
  ctx.fill();

  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary");
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.beginPath();
    const innerRadius = radius * 0.8;
    const outerRadius = radius * 0.9;
    ctx.moveTo(radius + innerRadius * Math.sin(angle), radius - innerRadius * Math.cos(angle));
    ctx.lineTo(radius + outerRadius * Math.sin(angle), radius - outerRadius * Math.cos(angle));
    ctx.lineWidth = radius * 0.02;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--dark");
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary");
  ctx.fill();

  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.05);

  const minuteAngle = ((minute + second / 60) * Math.PI) / 30;
  drawHand(ctx, minuteAngle, radius * 0.7, radius * 0.04);

  const secondAngle = (second * Math.PI) / 30;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(radius + radius * 0.8 * Math.sin(secondAngle), radius - radius * 0.8 * Math.cos(secondAngle));
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--warning");
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
}

function drawHand(ctx, angle, length, width) {
  const radius = ctx.canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(radius + length * Math.sin(angle), radius - length * Math.cos(angle));
  ctx.lineWidth = width;
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--dark");
  ctx.stroke();
}

function generateCalendar() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentDay = now.getDate();

  const monthName = now.toLocaleString("default", { month: "long" });
  document.getElementById("current-month").textContent = `${monthName} ${year}`;

  const calendarElement = document.getElementById("mini-calendar");
  calendarElement.innerHTML = "";

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day day-name";
    dayElement.textContent = day;
    calendarElement.appendChild(dayElement);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarElement.appendChild(emptyDay);
  }

  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    if (day === currentDay) dayElement.classList.add("current");

    calendarElement.appendChild(dayElement);
  }
}

function trackMood(emoji) {
  const responses = {
    "😄": "Great to see you happy today!",
    "🙂": "Looking good! Have a nice day.",
    "😐": "Hope your day gets better soon.",
    "😢": "Sorry you're feeling down.",
    "😤": "Take a deep breath, things will improve.",
  };

  document.getElementById("mood-response").textContent = responses[emoji];
  showToast(`Mood set to ${emoji}`, "success");
}
