// selecteer de gewenste doel elementen
const targets = document.querySelectorAll('.petpicture');

// maak een nieuwe Intersection Observer instantie aan
const observer = new IntersectionObserver((entries, observer) => {
  // loop door de Intersection Observer entries en laad de afbeelding indien nodig
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove('petpicture');
      observer.unobserve(lazyImage);
    }
  });
});

// koppel de Intersection Observer instantie aan de doel elementen
targets.forEach(target => {
  observer.observe(target);
});