const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

let currentIndex = 0;
let autoPlay;

function updateCarousel() {
  cards.forEach((card) => {
    card.classList.remove(
      "active",
      "prev",
      "next",
      "hidden-left",
      "hidden-right",
    );
  });

  dots.forEach((dot) => dot.classList.remove("active"));

  const prevIndex = (currentIndex - 1 + cards.length) % cards.length;

  const nextIndex = (currentIndex + 1) % cards.length;

  cards[currentIndex].classList.add("active");
  cards[prevIndex].classList.add("prev");
  cards[nextIndex].classList.add("next");

  for (let i = 0; i < cards.length; i++) {
    if (i !== currentIndex && i !== prevIndex && i !== nextIndex) {
      if (i < currentIndex) {
        cards[i].classList.add("hidden-left");
      } else {
        cards[i].classList.add("hidden-right");
      }
    }
  }

  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % cards.length;

  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;

  updateCarousel();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

function startAutoplay() {
  autoPlay = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoplay() {
  clearInterval(autoPlay);
}

const carousel = document.querySelector(".carousel-wrapper");

carousel.addEventListener("mouseenter", stopAutoplay);

carousel.addEventListener("mouseleave", startAutoplay);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  }

  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

updateCarousel();
startAutoplay();
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".movie-card").forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(value)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});
const modal = document.getElementById("movieModal");

const modalTitle = document.getElementById("modalTitle");

const modalImage = document.getElementById("modalImage");

const modalGenre = document.getElementById("modalGenre");

const modalYear = document.getElementById("modalYear");

const modalRating = document.getElementById("modalRating");

document.querySelectorAll(".movie-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.querySelector("h3").textContent;

    modalImage.src = card.querySelector("img").src;

    modalGenre.textContent = "Genre: " + card.dataset.genre;

    modalYear.textContent = "Year: 2024";

    modalRating.textContent = "⭐ 8.5";

    modal.classList.add("show");
  });
});

document.querySelector(".close-modal").addEventListener("click", () => {
  modal.classList.remove("show");
});

function renderWatchlist() {
  const container = document.getElementById("watchlistContainer");

  if (watchlist.length === 0) {
    container.innerHTML = `
      <p class="empty-watchlist">
        No movies added yet. Start exploring! 🎬
      </p>
    `;
    return;
  }

  container.innerHTML = "";

  watchlist.forEach((movie) => {
    container.innerHTML += `
      <div class="saved-movie">
        ${movie}
      </div>
    `;
  });
}

document.querySelectorAll(".watchlist-btn").forEach((btn) => {
  const movie = btn.closest(".movie-card").querySelector("h3").textContent;

  // Page load par button state restore karo
  if (watchlist.includes(movie)) {
    btn.textContent = "✓ Added";
    btn.style.background = "#16a34a";
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!watchlist.includes(movie)) {
      watchlist.push(movie);

      localStorage.setItem("watchlist", JSON.stringify(watchlist));

      btn.textContent = "✓ Added";
      btn.style.background = "#16a34a";

      renderWatchlist();
    }
  });
});

renderWatchlist();

document.getElementById("clearWatchlist").addEventListener("click", () => {
  watchlist = [];

  localStorage.removeItem("watchlist");

  renderWatchlist();

  document.querySelectorAll(".watchlist-btn").forEach((btn) => {
    btn.textContent = "❤️ Add to Watchlist";
    btn.style.background = "#e50914";
  });
});
