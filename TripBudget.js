// TripBudget.js
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
});

document.addEventListener('DOMContentLoaded', function () {
    // Get form, result insertion point, and destination select
    const form = document.querySelector('form');
    const destinationSelect = document.getElementById('destination');
    const dailyBudgetInput = document.getElementById('daily-budget');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Create results container if not present
    let resultsDiv = document.createElement('div');
    resultsDiv.id = 'tripBudgetResults';
    resultsDiv.style.marginTop = "2rem";
    form.parentNode.insertBefore(resultsDiv, form.nextSibling);

    // Helper to calculate day difference
    function daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)) + 1; // inclusive of start date
    }

    // Helper to get budget status
    function getBudgetStatus(dailyBudget) {
        if (dailyBudget < 100) return { status: 'Low', color: '#5cc489' };
        if (dailyBudget < 300) return { status: 'Moderate', color: '#f7c948' };
        return { status: 'Luxury', color: '#e76a6a' };
    }

    // Progress bar/animated counter
    function animateCounter(element, to, duration) {
        let start = 0;
        let startTime = null;
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = Math.min((currentTime - startTime) / duration, 1);
            let value = Math.floor(progress * (to - start) + start);
            element.textContent = "$" + value.toLocaleString();
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = "$" + to.toLocaleString();
            }
        }
        requestAnimationFrame(animate);
    }

    // Render progress bar
    function renderProgressBar(container, amount, maxAmount, color) {
        container.innerHTML = '';
        let bar = document.createElement('div');
        bar.style.width = '100%';
        bar.style.background = '#eee';
        bar.style.borderRadius = "8px";
        bar.style.overflow = "hidden";
        bar.style.height = "28px";
        bar.style.margin = "0.5rem 0";

        let fill = document.createElement('div');
        fill.style.height = "100%";
        fill.style.width = Math.min((amount / maxAmount) * 100, 100) + "%";
        fill.style.background = color;
        fill.style.transition = "width 1s";
        bar.appendChild(fill);

        container.appendChild(bar);
    }

    // --- LocalStorage helpers ---
    function loadSavedTrips() {
        let saved = localStorage.getItem('savedTripBudgets');
        try {
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    function saveTrip(trip) {
        let trips = loadSavedTrips();
        trips.push(trip);
        localStorage.setItem('savedTripBudgets', JSON.stringify(trips));
    }

    // Render saved trips list
    function renderSavedTrips(container) {
        container.innerHTML = '';
        let trips = loadSavedTrips();
        if (trips.length === 0) {
            container.innerHTML = "<em>No saved trips yet.</em>";
            return;
        }
        let ul = document.createElement('ul');
        ul.style.listStyle = "none";
        ul.style.paddingLeft = "0";
        trips.slice(-5).reverse().forEach(trip => {
            let li = document.createElement('li');
            li.style.padding = "0.2rem 0";
            li.textContent = `[${trip.date}] ${trip.destination}, $${trip.total} (${trip.status})`;
            ul.appendChild(li);
        });
        container.appendChild(ul);
    }

    // Attach results UI once
    resultsDiv.innerHTML = `
      <div id="budgetSummary"></div>
      <div id="animatedCounter" style="font-size:2rem;font-weight:bold"></div>
      <div id="budgetStatus"></div>
      <div id="progressBarContainer" style="margin-bottom:2rem"></div>
      <button id="saveTripBtn" style="display:none;margin:1rem 0 0 0">Save this Trip Budget</button>
      <div id="saveMsg" style="color:green;padding:0.5rem 0"></div>
      <h3>Recently Saved Trips</h3>
      <div id="savedTripsList"></div>
    `;
    const summary = document.getElementById('budgetSummary');
    const counter = document.getElementById('animatedCounter');
    const statusDiv = document.getElementById('budgetStatus');
    const progressBar = document.getElementById('progressBarContainer');
    const saveBtn = document.getElementById('saveTripBtn');
    const saveMsg = document.getElementById('saveMsg');
    const savedTripsList = document.getElementById('savedTripsList');

    renderSavedTrips(savedTripsList);

    let latestTripData = null;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Read inputs
        const destination = destinationSelect.value;
        const dailyBudget = parseFloat(dailyBudgetInput.value);
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        // Validate
        if (!destination || isNaN(dailyBudget) || dailyBudget <= 0 || !startDate || !endDate || (new Date(startDate) > new Date(endDate))) {
            summary.innerHTML = "<span style='color:red;'>Please fill all fields correctly. (End date after start, budgets must be positive.)</span>";
            counter.textContent = '';
            statusDiv.textContent = '';
            progressBar.innerHTML = '';
            saveBtn.style.display = 'none';
            return;
        }

        // Calculate days
        const days = daysBetween(startDate, endDate);
        // Clamp max for animation/progress bar scaling
        const maxTotalBudget = 15000;
        const total = Math.round(days * dailyBudget);

        // Budget status
        const { status, color } = getBudgetStatus(dailyBudget);

        // Summary
        summary.innerHTML = `
          <strong>Destination:</strong> ${destination}<br>
          <strong>Daily Budget:</strong> $${dailyBudget.toLocaleString()}<br>
          <strong>Duration:</strong> ${days === 1 ? "1 day" : `${days} days`}<br>
          <strong>Estimated Total:</strong>
        `;

        // Animated counter
        counter.textContent = "$0";
        animateCounter(counter, total, 900);

        // Budget status with color-coding
        statusDiv.innerHTML = `<span style="display:inline-block;padding:0.5rem 1rem;background:${color};color:#212121;border-radius:6px;">Budget status: <strong>${status}</strong></span>`;

        // Progress bar
        renderProgressBar(progressBar, total, maxTotalBudget, color);

        // Show save button
        saveBtn.style.display = 'inline-block';
        saveMsg.textContent = '';

        // Store latest trip data for saving
        latestTripData = {
            destination,
            dailyBudget,
            startDate,
            endDate,
            days,
            total,
            status,
            date: new Date().toLocaleDateString()
        };
    });

    saveBtn.addEventListener('click', function () {
        if (!latestTripData) return;
        saveTrip({
            destination: latestTripData.destination,
            total: latestTripData.total,
            status: latestTripData.status,
            date: latestTripData.date
        });
        saveBtn.style.display = 'none';
        saveMsg.textContent = 'Trip saved!';
        renderSavedTrips(savedTripsList);
        setTimeout(() => { saveMsg.textContent = ''; }, 1800);
    });
});
// Grab the form and attach a submit listener to parse data
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const resultsDiv = document.getElementById('tripBudgetResults');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Parse data from form fields
            const destinationSelect = document.getElementById('destination');
            const dailyBudgetInput = document.getElementById('daily-budget');
            const startDateInput = document.getElementById('startDate');
            const endDateInput = document.getElementById('endDate');

            const destinationVal = destinationSelect.value;
            const dailyBudgetVal = parseFloat(dailyBudgetInput.value);
            const startDateVal = startDateInput.value;
            const endDateVal = endDateInput.value;

            // Calculate number of days
            let days = 0;
            if (startDateVal && endDateVal) {
                const start = new Date(startDateVal);
                const end = new Date(endDateVal);
                days = (end - start) / (1000 * 60 * 60 * 24) + 1;
                if (days < 1 || isNaN(days)) days = 0;
            }

            // Calculate total budget
            let total = 0;
            if (!isNaN(dailyBudgetVal) && days > 0) {
                total = dailyBudgetVal * days;
            }

            // Basic status (can be enhanced)
            let status = '';
            if (total > 0 && !isNaN(total)) {
                status = 'Planned';
            } else {
                status = 'Invalid data';
            }

            // Set results in spans INSIDE the div
            if (resultsDiv) {
                // The result HTML already has spans with IDs.
                resultsDiv.querySelector('#destination').textContent = destinationVal || "-";
                resultsDiv.querySelector('#daily-budget').textContent = isNaN(dailyBudgetVal) ? "-" : `$${dailyBudgetVal.toLocaleString()}`;
                resultsDiv.querySelector('#startDate').textContent = startDateVal || "-";
                resultsDiv.querySelector('#endDate').textContent = endDateVal || "-";
                resultsDiv.querySelector('#total-budget').textContent = total > 0 ? `$${total.toLocaleString()}` : "-";
                resultsDiv.querySelector('#status').textContent = status;
                resultsDiv.querySelector('#date').textContent = new Date().toLocaleDateString();

                // Set saved fields blank (unless you are storing to localstorage, they remain blank until saved!)
                resultsDiv.querySelector('#saved').textContent = '';
                resultsDiv.querySelector('#saved-date').textContent = '';
                resultsDiv.querySelector('#saved-total').textContent = '';
                resultsDiv.querySelector('#saved-status').textContent = '';
            }
        });
    }
});