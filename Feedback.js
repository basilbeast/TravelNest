// Feedback.js - Accordion FAQ logic, validated feedback form, and hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  // ===== Hamburger Menu =====
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function resetHamburgerIcon() {
    if (!navToggle) return;
    const spans = navToggle.querySelectorAll(".hamburger");
    if (spans.length >= 3) {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  }

  function animateHamburgerOpen() {
    if (!navToggle) return;
    const spans = navToggle.querySelectorAll(".hamburger");
    if (spans.length >= 3) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    }
  }

  function openMenu() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navLinks.setAttribute("aria-hidden", "false");
    animateHamburgerOpen();
  }

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("aria-hidden", "true");
    resetHamburgerIcon();
  }

  if (navToggle && navLinks) {
    navLinks.setAttribute("aria-hidden", "true");

    navToggle.addEventListener("click", function () {
      if (navLinks.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navToggle.click();
      }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // ===== Accordion/FAQ Section Implementation =====
  const accordionTitles = document.querySelectorAll(".accordion-title");
  accordionTitles.forEach(function (title) {
    title.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      accordionTitles.forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
        if (t.nextElementSibling) t.nextElementSibling.classList.remove("open");
      });
      if (!expanded) {
        this.setAttribute("aria-expanded", "true");
        if (this.nextElementSibling) this.nextElementSibling.classList.add("open");
      }
    });
  });

  // ===== Feedback Form Validation and Submission =====
  const form = document.getElementById("feedbackForm");
  const formSuccess = document.getElementById("formSuccess");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    input.style.borderColor = "#d41111";
  }

  function clearError(input, errorDiv) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
    input.style.borderColor = "#aac6e1";
  }

  function validateForm() {
    let valid = true;
    const nameVal = nameInput.value.trim();
    if (nameVal === "") {
      showError(nameInput, nameError, "Name is required.");
      valid = false;
    } else if (nameVal.length < 2) {
      showError(nameInput, nameError, "Name must be at least 2 characters.");
      valid = false;
    } else if (nameVal.length > 60) {
      showError(nameInput, nameError, "Name must be under 60 characters.");
      valid = false;
    } else {
      clearError(nameInput, nameError);
    }

    const emailVal = emailInput.value.trim();
    if (emailVal === "") {
      showError(emailInput, emailError, "Email is required.");
      valid = false;
    } else if (!validateEmail(emailVal)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(emailInput, emailError);
    }

    const messageVal = messageInput.value.trim();
    if (messageVal === "") {
      showError(messageInput, messageError, "Message is required.");
      valid = false;
    } else if (messageVal.length < 10) {
      showError(messageInput, messageError, "Message must be at least 10 characters.");
      valid = false;
    } else if (messageVal.length > 5000) {
      showError(messageInput, messageError, "Message is too long (limit: 5000 characters).");
      valid = false;
    } else {
      clearError(messageInput, messageError);
    }
    return valid;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      const feedback = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        date: new Date().toISOString()
      };
      let feedbackArr = [];
      try {
        feedbackArr = JSON.parse(localStorage.getItem("travelnest_feedback")) || [];
      } catch {
        feedbackArr = [];
      }
      feedbackArr.push(feedback);
      localStorage.setItem("travelnest_feedback", JSON.stringify(feedbackArr));

      if (formSuccess) {
        formSuccess.textContent = "Thank you for your feedback! .";
        formSuccess.style.display = "block";
      }
      form.reset();

      setTimeout(function () {
        if (formSuccess) formSuccess.style.display = "none";
      }, 6500);

      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(messageInput, messageError);
    });

    [nameInput, emailInput, messageInput].forEach(function (input) {
      input.addEventListener("input", function () {
        const errorDiv = document.getElementById(input.id + "Error");
        if (input.value.trim()) {
          clearError(input, errorDiv);
        }
      });
    });
  }
});
