// Enhanced TravelNest JavaScript for Mobile-First Design

// DOMContentLoaded event handler
document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu functionality
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  
  if (navToggle && navLinks) {
    // Toggle mobile menu
    navToggle.addEventListener("click", function() {
      navLinks.classList.toggle("open");
      
      // Animate hamburger icon
      const spans = navToggle.querySelectorAll(".hamburger");
      if (navLinks.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function(e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove("open");
        
        // Reset hamburger animation
        const spans = navToggle.querySelectorAll(".hamburger");
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      }
    });
    
    // Close menu when clicking a link (good UX)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        
        // Reset hamburger animation
        const spans = navToggle.querySelectorAll(".hamburger");
        spans[0].style.transform = "";
        spans[1].style.opacity = "";
        spans[2].style.transform = "";
      });
    });
  }
  
  // Hero section functionality
  const quoteElement = document.getElementById("heroQuote");
  const destinationElement = document.getElementById("destinationDay");
  const imageElement = document.getElementById("heroImage");
  
  // Array of objects to keep quotes, destination names, and image filenames in sync
  const travelData = [
    {
      quote: "The world is a book, and those who do not travel read only one page. – Saint Augustine",
      destination: "Paris, France",
      image: "paris.jpg"
    },
    {
      quote: "Travel makes one modest. You see what a tiny place you occupy in the world. – Gustave Flaubert",
      destination: "Tokyo, Japan",
      image: "tokyo.jpg"
    },
    {
      quote: "Life is either a daring adventure or nothing at all. – Helen Keller",
      destination: "Rome, Italy",
      image: "rome.jpg"
    },
    {
      quote: "The journey of a thousand miles begins with a single step. – Lao Tzu",
      destination: "Barcelona, Spain",
      image: "barcelona.jpg"
    },
    {
      quote: "Wherever you go becomes a part of you somehow. – Anita Desai",
      destination: "New York City, USA",
      image: "nyc.jpg"
    },
    {
      quote: "We travel not to escape life, but for life not to escape us. – Anonymous",
      destination: "London, UK",
      image: "london.jpg"
    },
    {
      quote: "Take only memories, leave only footprints. – Chief Seattle",
      destination: "Sydney, Australia",
      image: "sydney.jpg"
    },
    {
      quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes. – Marcel Proust",
      destination: "Berlin, Germany",
      image: "berlin.jpg"
    },
    {
      quote: "Travel is fatal to prejudice, bigotry, and narrow-mindedness. – Mark Twain",
      destination: "Prague, Czech Republic",
      image: "prague.jpg"
    },
    {
      quote: "Not all those who wander are lost. – J.R.R. Tolkien",
      destination: "San Francisco, USA",
      image: "SFO.jpg"
    },
    {
      quote: "Adventure is worthwhile in itself. – Amelia Earhart",
      destination: "Istanbul, Turkey",
      image: "istanbul.png"
    },
    {
      quote: "A journey is best measured in friends, not in miles. – Tim Cahill",
      destination: "Colombo, Sri Lanka",
      image: "CMB.jpg"
    },
    {
      quote: "Travel and change of place impart new vigor to the mind. – Seneca",
      destination: "Bangkok, Thailand",
      image: "BKK.jpg"
    },
    {
      quote: "To travel is to live. – Hans Christian Andersen",
      destination: "Dubai, UAE",
      image: "dubai.jpg"
    },
    {
      quote: "Jobs fill your pocket, but adventures fill your soul. – Jaime Lyn Beatty",
      destination: "Mirissa, Sri Lanka",
      image: "mirissa.jpg"
    }
  ];

  // Utility: Get "Destination of the Day" using the day of the year, so each day is different and repeats yearly
  function getDayOfYear(date) {
    // Jan 1st is day 1
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return day;
  }

  // Returns today's travel item {quote, destination, image}
  function getTodayTravelItem() {
    const dayOfYear = getDayOfYear(new Date());
    // Use modulo to always stay in bounds of travelData array
    const index = dayOfYear % travelData.length;
    return travelData[index];
  }

  // Updates the hero section with new content
  function updateHeroSection(item) {
    if (quoteElement) {
      quoteElement.textContent = item.quote;
    }

    if (destinationElement) {
      destinationElement.textContent = item.destination;
    }

    if (imageElement) {
      imageElement.src = item.image;
      imageElement.alt = item.destination;
      imageElement.style.width = "100%";
      imageElement.style.height = "100%";
      imageElement.style.objectFit = "cover";
      imageElement.style.borderRadius = "1.2rem";
      imageElement.style.transition = "border 0.3s, box-shadow 0.3s";
    }
  }

  // Initialize hero section "Destination of the Day" (doesn't rotate, changes only daily)
  updateHeroSection(getTodayTravelItem());

  // Footer navigation links (nothing needed in JS as they're in HTML)

  // Newsletter subscription with localStorage
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      const email = emailInput.value.trim();

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Store email in localStorage (append if list)
      let storedEmails = [];
      try {
        const raw = localStorage.getItem("newsletterEmails");
        if (raw) {
          storedEmails = JSON.parse(raw);
        }
      } catch (err) {
        // fallback: reset if parse error
        storedEmails = [];
      }

      if (storedEmails.includes(email)) {
        alert("You are already subscribed with this email address.");
      } else {
        storedEmails.push(email);
        localStorage.setItem("newsletterEmails", JSON.stringify(storedEmails));

        // Simulate form submission
        const submitButton = newsletterForm.querySelector("button[type='submit']");
        const originalText = submitButton.textContent;
        submitButton.textContent = "Subscribing...";
        submitButton.disabled = true;

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          emailInput.value = "";
          alert("Thank you for subscribing! You'll receive our latest travel tips soon.");
        }, 1000);
      }
    });
  }
  // Footer year update
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;
});

// Accessibility improvements
document.addEventListener("DOMContentLoaded", function() {
  // Keyboard navigation for mobile menu
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  
  if (navLinks && navToggle) {
    // Allow keyboard focus on toggle button
    navToggle.setAttribute("tabindex", "0");
    
    // Handle keyboard events
    navToggle.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navLinks.classList.toggle("open");
      }
    });
    
    // Close menu when pressing Escape
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.focus();
      }
    });
  }
  
  // Add focus styles for accessibility
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach(link => {
    link.addEventListener("focus", function() {
      this.classList.add("focus");
    });
    
    link.addEventListener("blur", function() {
      this.classList.remove("focus");
    });
  });
});