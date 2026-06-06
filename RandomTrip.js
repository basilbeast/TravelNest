function initRandomTripPage() {
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

        navToggle.addEventListener("click", function() {
            if (navLinks.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navToggle.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navToggle.click();
            }
        });

        navLinks.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function(e) {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && navLinks.classList.contains("open")) {
                closeMenu();
            }
        });
    }

    // ===== Random Trip Generator =====
    // Sample trip destinations per type & budget
    const TRIPS_DB = {
        adventure: {
            low: ["Appalachian Trail, USA", "Mt. Rinjani, Indonesia", "Camino de Santiago, Spain"],
            medium: ["Queenstown, NZ", "Costa Rica Ziplining", "South Africa Safari"],
            high: ["Antarctica Cruise", "Mount Kilimanjaro, Tanzania", "Galapagos Diving"]
        },
        relaxation: {
            low: ["Goa, India", "Budapest Thermal Baths", "Bali Homestay"],
            medium: ["Hawaii Maui Beach", "Santorini, Greece", "Maldives Local Islands"],
            high: ["Bora Bora, French Polynesia", "Seychelles", "Fiji All-Inclusive Resort"]
        },
        cultural: {
            low: ["Kyoto, Japan", "Lisbon, Portugal", "Mexico City"],
            medium: ["Istanbul, Turkey", "Prague, Czech Rep.", "Edinburgh, UK"],
            high: ["Paris Art Tour", "Petra, Jordan", "Marrakech, Morocco"]
        },
        nature: {
            low: ["Banff National Park", "Cotswolds, UK", "Norwegian Fjords"],
            medium: ["New Zealand South Island", "Patagonia, Chile", "Canadian Rockies"],
            high: ["Safari in Botswana", "Great Barrier Reef, AU", "Yellowstone Luxury Lodge"]
        }
    };

    const surpriseBtn = document.getElementById('surpriseBtn');
    const travelType = document.getElementById('travelType');
    const budgetRange = document.getElementById('budgetRange');
    const destinationResult = document.getElementById('destinationResult');
    const addWishlistBtn = document.getElementById('addWishlistBtn');
    const wishlistUl = document.getElementById('wishlist');

    if (!surpriseBtn || !travelType || !budgetRange || !destinationResult || !addWishlistBtn || !wishlistUl) {
        console.error("One or more required DOM elements for RandomTrip.js not found!");
        return;
    }

    // Animation for Surprise Me Again button
    function animateSurpriseButton() {
        surpriseBtn.style.transform = "scale(1.13)";
        surpriseBtn.style.boxShadow = "0 6px 22px #ffe15d88";
        setTimeout(() => {
            surpriseBtn.style.transform = "";
            surpriseBtn.style.boxShadow = "";
        }, 160);
    }

    // Generate a random trip
    function getRandomTrip(type, budget) {
        const options = (TRIPS_DB[type] && TRIPS_DB[type][budget]) || [];
        if (options.length === 0) return "No trip found.";
        return options[Math.floor(Math.random() * options.length)];
    }

    // Save wishlist to localStorage
    function saveWishlist(wishlistArr) {
        localStorage.setItem('randomTripWishlist', JSON.stringify(wishlistArr));
    }

    // Load wishlist from localStorage
    function loadWishlist() {
        try {
            const wl = localStorage.getItem('randomTripWishlist');
            return wl ? JSON.parse(wl) : [];
        } catch {
            return [];
        }
    }

    // Render wishlist UI
    function renderWishlist() {
        const wishlistArr = loadWishlist();
        wishlistUl.innerHTML = '';
        if(wishlistArr.length === 0) {
            wishlistUl.innerHTML = "<li style='color:#8696bf;font-size:0.99rem;font-style:italic;'>No destinations saved yet.</li>";
            return;
        }
        wishlistArr.forEach((dest, idx) => {
            const li = document.createElement('li');
            li.textContent = dest;
            li.style.padding = "0.18rem 0";
            // Remove button on hover
            const rmBtn = document.createElement('button');
            rmBtn.textContent = "×";
            rmBtn.title = "Remove from wishlist";
            rmBtn.style.cssText = "margin-left:0.8rem; background:none;color:#e76a6a;border:none;font-size:1.11rem;cursor:pointer;font-weight:900;";
            rmBtn.onclick = () => {
                const arr = loadWishlist();
                arr.splice(idx, 1);
                saveWishlist(arr);
                renderWishlist();
            };
            li.appendChild(rmBtn);
            wishlistUl.appendChild(li);
        });
    }

    // Main surprise function & UI updates
    function surpriseAndShow() {
        animateSurpriseButton();
        const selectedType = travelType.value;
        const selectedBudget = budgetRange.value;
        const trip = getRandomTrip(selectedType, selectedBudget);
        destinationResult.innerHTML = trip !== "No trip found." 
            ? `🌎 Your destination: <span style="color:#0275d8">${trip}</span>` 
            : "No destination found for this combination.";
        addWishlistBtn.style.display = (trip && trip !== "No trip found.") ? "inline-block" : "none";
        addWishlistBtn.setAttribute('data-trip', trip);
    }

    surpriseBtn.addEventListener('click', surpriseAndShow);

    // Allow add to wishlist
    addWishlistBtn.addEventListener('click', function () {
        const trip = this.getAttribute('data-trip');
        if (!trip) return;
        let wishlistArr = loadWishlist();
        if (!wishlistArr.includes(trip)) {
            wishlistArr.push(trip);
            saveWishlist(wishlistArr);
            renderWishlist();
            addWishlistBtn.textContent = "Added!";
            setTimeout(()=>{addWishlistBtn.textContent = "Add to Wishlist";}, 900);
        } else {
            addWishlistBtn.textContent = "Already in Wishlist!";
            setTimeout(()=>{addWishlistBtn.textContent = "Add to Wishlist";}, 1100);
        }
    });

    // Wishlist persists on reload
    renderWishlist();

    // Reset destination/add-to-wishlist when selects change
    travelType.addEventListener('change', () => {
        destinationResult.innerHTML = '';
        addWishlistBtn.style.display = "none";
    });
    budgetRange.addEventListener('change', () => {
        destinationResult.innerHTML = '';
        addWishlistBtn.style.display = "none";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRandomTripPage);
} else {
    initRandomTripPage();
}