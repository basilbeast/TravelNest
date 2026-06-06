document.addEventListener("DOMContentLoaded", function () {
  // ----- Hamburger Menu -----
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function openMenu() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navLinks.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("aria-hidden", "true");
  }

  if (navToggle && navLinks) {
    // Setup ARIA Attributes
    navToggle.setAttribute("aria-controls", navLinks.id);
    navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open") ? "true" : "false");
    navLinks.setAttribute("aria-hidden", navLinks.classList.contains("open") ? "false" : "true");

    // Toggle menu on click
    navToggle.addEventListener("click", function () {
      if (navLinks.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Keyboard toggle (Enter/Space for accessibility)
    navToggle.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navToggle.click();
      }
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        e.target !== navToggle
      ) {
        closeMenu();
      }
    });

    // Escape closes menu
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });
  }


  const destinations = [
    {
      name: "Paris",
      region: "France",
      image: "paris.jpg",
      description: "Paris, the City of Light, is famed for its art, gastronomy, and culture. Iconic sights include the Eiffel Tower and the romantic Seine river.",
      attractions: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame Cathedral",
        "Montmartre & Sacré-Cœur"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "€50" },
        { expense: "Hotel/night", avg: "€110" },
        { expense: "Metro ticket", avg: "€1.90" }
      ]
    },
    {
      name: "Tokyo",
      region: "Japan",
      image: "tokyo.jpg",
      description: "Tokyo blends the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. It's a paradise for foodies and pop-culture fans.",
      attractions: [
        "Shibuya Crossing",
        "Meiji Shrine",
        "Tokyo Skytree",
        "Akihabara"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "¥6,000" },
        { expense: "Hotel/night", avg: "¥12,000" },
        { expense: "Metro ticket", avg: "¥200" }
      ]
    },
    {
      name: "Rome",
      region: "Italy",
      image: "rome.jpg",
      description: "Rome is a sprawling city with nearly 3,000 years of globally influential art, architecture, and culture on display.",
      attractions: [
        "Colosseum",
        "Vatican Museums",
        "Trevi Fountain",
        "Pantheon"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "€40" },
        { expense: "Hotel/night", avg: "€90" },
        { expense: "Metro ticket", avg: "€1.50" }
      ]
    },
    {
      name: "Barcelona",
      region: "Spain",
      image: "barcelona.jpg",
      description: "Barcelona is known for its art and architecture. The fantastical Sagrada Família church and other Modernist landmarks designed by Antoni Gaudí dot the city.",
      attractions: [
        "Sagrada Família",
        "Park Güell",
        "La Rambla",
        "Gothic Quarter"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "€35" },
        { expense: "Hotel/night", avg: "€85" },
        { expense: "Metro ticket", avg: "€2.40" }
      ]
    },
    {
      name: "New York City",
      region: "USA",
      image: "nyc.jpg",
      description: "NYC is a fast-paced, globally influential center of art, culture, fashion and finance. The skyline and central park are iconic.",
      attractions: [
        "Statue of Liberty",
        "Central Park",
        "Times Square",
        "Metropolitan Museum of Art"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "$80" },
        { expense: "Hotel/night", avg: "$200" },
        { expense: "Subway ride", avg: "$2.90" }
      ]
    },
    {
      name: "London",
      region: "UK",
      image: "london.jpg",
      description: "London, the capital of England, is a city bursting with history, culture, and diversity.",
      attractions: [
        "Big Ben & Houses of Parliament",
        "British Museum",
        "London Eye",
        "Tower Bridge"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "£55" },
        { expense: "Hotel/night", avg: "£120" },
        { expense: "Underground ticket", avg: "£2.50" }
      ]
    },
    {
      name: "Sydney",
      region: "Australia",
      image: "sydney.jpg",
      description: "Sydney is best known for its harbourfront Sydney Opera House and beautiful beaches like Bondi and Manly.",
      attractions: [
        "Sydney Opera House",
        "Harbour Bridge",
        "Bondi Beach",
        "Darling Harbour"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "A$80" },
        { expense: "Hotel/night", avg: "A$170" },
        { expense: "Train ticket", avg: "A$4.50" }
      ]
    },
    {
      name: "Berlin",
      region: "Germany",
      image: "berlin.jpg",
      description: "Berlin is a city of culture, politics and science, known for its art scene and modern landmarks.",
      attractions: [
        "Brandenburg Gate",
        "Berlin Wall Memorial",
        "Museum Island",
        "Reichstag Building"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "€40" },
        { expense: "Hotel/night", avg: "€75" },
        { expense: "Metro ticket", avg: "€3.20" }
      ]
    },
    {
      name: "Prague",
      region: "Czech Republic",
      image: "prague.jpg",
      description: "Prague, City of a Hundred Spires, is known for its Old Town Square, colorful baroque buildings, Gothic churches, and the medieval Astronomical Clock.",
      attractions: [
        "Charles Bridge",
        "Prague Castle",
        "Old Town Square",
        "Astronomical Clock"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "Kč600" },
        { expense: "Hotel/night", avg: "Kč1800" },
        { expense: "Tram ticket", avg: "Kč30" }
      ]
    },
    {
      name: "San Francisco",
      region: "USA",
      image: "SFO.jpg",
      description: "San Francisco is famous for its steep streets, Golden Gate Bridge, cable cars, and colorful Victorian houses.",
      attractions: [
        "Golden Gate Bridge",
        "Alcatraz Island",
        "Fisherman's Wharf",
        "Chinatown"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "$85" },
        { expense: "Hotel/night", avg: "$230" },
        { expense: "MUNI ticket", avg: "$3.00" }
      ]
    },
    {
      name: "Istanbul",
      region: "Turkey",
      image: "istanbul.png",
      description: "Istanbul bridges Europe and Asia across the Bosphorus. It's famed for ancient architecture, delicious food, and vibrant bazaars.",
      attractions: [
        "Hagia Sophia",
        "Blue Mosque",
        "Grand Bazaar",
        "Topkapi Palace"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "₺300" },
        { expense: "Hotel/night", avg: "₺1000" },
        { expense: "Metro ticket", avg: "₺15" }
      ]
    },
    {
      name: "Colombo",
      region: "Sri Lanka",
      image: "CMB.jpg",
      description: "Colombo is a bustling city blending modern life, colonial buildings, and monuments.",
      attractions: [
        "Galle Face Green",
        "Gangaramaya Temple",
        "National Museum",
        "Pettah Market",
        "Lotus Tower"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "Rs. 2000" },
        { expense: "Hotel/night", avg: "Rs. 9000" },
        { expense: "Tuk tuk ride", avg: "Rs. 400" }
      ]
    },
    {
      name: "Bangkok",
      region: "Thailand",
      image: "BKK.jpg",
      description: "Bangkok is known for ornate shrines, vibrant street life, world-class street food, and lively nightlife.",
      attractions: [
        "Grand Palace",
        "Wat Arun",
        "Chatuchak Market",
        "Khao San Road"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "฿700" },
        { expense: "Hotel/night", avg: "฿2200" },
        { expense: "BTS ticket", avg: "฿40" }
      ]
    },
    {
      name: "Dubai",
      region: "UAE",
      image: "dubai.jpg",
      description: "Dubai is renowned for its ultramodern architecture, lively nightlife, and luxury shopping.",
      attractions: [
        "Burj Khalifa",
        "The Dubai Mall",
        "Palm Jumeirah",
        "Dubai Fountain"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "AED 250" },
        { expense: "Hotel/night", avg: "AED 700" },
        { expense: "Metro ticket", avg: "AED 5" }
      ]
    },
    {
      name: "Mirissa",
      region: "Sri Lanka",
      image: "mirissa.jpg",
      description: "Mirissa is a beautiful small town on the southern coast of Sri Lanka, famous for beaches and whale watching.",
      attractions: [
        "Mirissa Beach",
        "Coconut Tree Hill",
        "Whale Watching",
        "Parrot Rock"
      ],
      cost: [
        { expense: "Meal (mid-range, 2ppl)", avg: "Rs. 1500" },
        { expense: "Hotel/night", avg: "Rs. 6500" },
        { expense: "Bus ticket", avg: "Rs. 120" }
      ]
    }
  ];

  // Helper: region -> continent
  const regionToContinent = {
    "France": "Europe",
    "Italy": "Europe",
    "Spain": "Europe",
    "UK": "Europe",
    "Germany": "Europe",
    "Czech Republic": "Europe",
    "Turkey": "Europe",
    "Japan": "Asia",
    "Sri Lanka": "Asia",
    "Thailand": "Asia",
    "UAE": "Asia",
    "Australia": "Australia",
    "USA": "North America"
  };

  // ----------- Rendering Cards -----------
  function createDestinationCard(dest) {
    return `
      <div class="destination-card" tabindex="0" data-name="${encodeURIComponent(dest.name)}">
        <img class="destination-image" src="${dest.image}" alt="${dest.name}">
        <div class="destination-info">
          <div class="destination-name">${dest.name}</div>
          <div class="destination-region">${dest.region}</div>
        </div>
      </div>
    `;
  }

  const destinationsList = document.getElementById("destinationsList");
  if (!destinationsList) {
    console.error("Element with id 'destinationsList' not found in DOM!");
    return;
  }
  destinationsList.innerHTML = destinations.map(createDestinationCard).join('');

  // ----------- Filtering -----------
  const filterForm = document.getElementById('destinationFilterForm');
  if (!filterForm) {
    console.error("Element with id 'destinationFilterForm' not found in DOM!");
    return;
  }

  filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const continentSel = document.getElementById('continentSelect');
    const nameInput = document.getElementById('destinationNameInput');
    if (!continentSel || !nameInput) {
      console.error("Required filter inputs missing");
      return;
    }
    const continent = continentSel.value;
    const nameFragment = nameInput.value.trim().toLowerCase();

    let filtered = destinations.filter(dest => {
      const destContinent = regionToContinent[dest.region] || "";
      const continentMatch = continent === "" || destContinent === continent;
      const nameMatch = nameFragment === "" || dest.name.toLowerCase().includes(nameFragment);
      return continentMatch && nameMatch;
    });

    destinationsList.innerHTML =
      filtered.length > 0
        ? filtered.map(createDestinationCard).join('')
        : '<p style="text-align:center; width:100%;">No destinations found.</p>';

    // Re-bind cards after filtering
    bindDestinationCards();
  });

  // ----------- Modal Logic -----------
  function closeDestinationModal() {
    const modal = document.getElementById('destinationModal');
    if (modal) modal.style.display = 'none';
  }

  function openDestinationModal(destinationName) {
    const dest = destinations.find(d => d.name === destinationName);
    if (!dest) return;
    let dn = document.getElementById('modalDestinationName');
    let dr = document.getElementById('modalDestinationRegion');
    let di = document.getElementById('modalDestinationImage');
    let dd = document.getElementById('modalDestinationDescription');
    let ul = document.getElementById('modalDestinationAttractions');
    let tbody = document.getElementById('modalCostTable')?.querySelector('tbody');
    let modal = document.getElementById('destinationModal');
    if (!(dn && dr && di && dd && ul && tbody && modal)) {
      console.error("Modal structure missing in DOM");
      return;
    }

    dn.textContent = dest.name;
    dr.textContent = dest.region;
    di.src = dest.image;
    di.alt = dest.name + " image";
    dd.textContent = dest.description;

    // Attractions
    ul.innerHTML = '';
    dest.attractions.forEach(a => {
      const li = document.createElement('li');
      li.textContent = a;
      ul.appendChild(li);
    });

    // Cost table
    tbody.innerHTML = '';
    dest.cost.forEach(item => {
      const tr = document.createElement('tr');
      const tdExpense = document.createElement('td');
      tdExpense.textContent = item.expense;
      const tdAvg = document.createElement('td');
      tdAvg.textContent = item.avg;
      tr.appendChild(tdExpense);
      tr.appendChild(tdAvg);
      tbody.appendChild(tr);
    });

    modal.style.display = 'flex';
  }

  // ----------- Bind Card Events -----------
  function bindDestinationCards() {
    document.querySelectorAll('.destination-card').forEach(function (card) {
      card.style.cursor = 'pointer';
      card.onclick = function () {
        const name = decodeURIComponent(card.getAttribute('data-name'));
        openDestinationModal(name);
      };
      card.onkeypress = function (e) { // Accessibility: open modal on Enter key
        if (e.key === "Enter" || e.key === " ") {
          const name = decodeURIComponent(card.getAttribute('data-name'));
          openDestinationModal(name);
        }
      };
    });
  }

  // Initial bind for cards/modal events
  bindDestinationCards();

  // Modal close handlers
  const closeBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('destinationModal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeDestinationModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeDestinationModal();
    });
    // Accessibility: modal can be closed with Escape key
    document.addEventListener("keydown", function(e) {
      if (modal.style.display === "flex" && e.key === "Escape") closeDestinationModal();
    });
  }
});