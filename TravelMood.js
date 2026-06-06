document.addEventListener("DOMContentLoaded", function () {
  // ===== Hamburger Menu ===== with Animation 
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
        
        
        // Ambient Sound Logic
        const beachAudio = document.getElementById('audio-beach');
        const forestAudio = document.getElementById('audio-forest');
        const cityAudio = document.getElementById('audio-city');
        let currentAudio = null;

        function stopAll() {
            [beachAudio, forestAudio, cityAudio].forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
            currentAudio = null;
        }

        document.getElementById('beachBtn').addEventListener('click', function () {
            if(currentAudio !== beachAudio) {
                stopAll();
                beachAudio.loop = true;
                beachAudio.play();
                currentAudio = beachAudio;
            }
        });

        document.getElementById('forestBtn').addEventListener('click', function () {
            if(currentAudio !== forestAudio) {
                stopAll();
                forestAudio.loop = true;
                forestAudio.play();
                currentAudio = forestAudio;
            }
        });

        document.getElementById('cityBtn').addEventListener('click', function () {
            if(currentAudio !== cityAudio) {
                stopAll();
                cityAudio.loop = true;
                cityAudio.play();
                currentAudio = cityAudio;
            }
        });

        document.getElementById('pauseBtn').addEventListener('click', function () {
            if(currentAudio !== null) {
                currentAudio.pause();
            }
        });

        // ===== Destinations Logic (retained from TravelMood.js) =====
        document.addEventListener('DOMContentLoaded', function () {
            const destinationList = document.getElementById('destinationList');
            if (!destinationList) {
                console.error("destinationList element not found");
                return;
            }
            let visitedArr;
            try {
                visitedArr = JSON.parse(localStorage.getItem('visitedDestinations') || '[]');
            } catch {
                visitedArr = [];
            }
            let visited = new Set(visitedArr);

            // On load: Sync UI with visited state
            destinationList.querySelectorAll('li').forEach(li => {
                const destination = li.getAttribute('data-destination');
                const btn = li.querySelector('.mark-btn');
                if (!btn || !destination) return;

                if (visited.has(destination)) {
                    li.classList.add('visited');
                    btn.textContent = 'Mark as Planned';
                    btn.setAttribute('data-status', 'visited');
                } else {
                    li.classList.remove('visited');
                    btn.textContent = 'Mark as Visited';
                    btn.setAttribute('data-status', 'planned');
                }
            });

            // Click handler (event delegation)
            destinationList.addEventListener('click', function (e) {
                const target = e.target;
                if (!target.classList.contains('mark-btn')) return;

                const li = target.closest('li');
                const destination = li && li.getAttribute('data-destination');
                if (!li || !destination) return;

                if (visited.has(destination)) {
                    // Mark as planned ("unvisit")
                    visited.delete(destination);
                    li.classList.remove('visited');
                    target.textContent = 'Mark as Visited';
                    target.setAttribute('data-status', 'planned');
                } else {
                    // Mark as visited
                    visited.add(destination);
                    li.classList.add('visited');
                    target.textContent = 'Mark as Planned';
                    target.setAttribute('data-status', 'visited');
                }
                // Save to localStorage
                localStorage.setItem('visitedDestinations', JSON.stringify(Array.from(visited)));
            });
        });
