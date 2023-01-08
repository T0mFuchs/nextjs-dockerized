export function Observe(): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      },
      { threshold: 1 }
    );
  });
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
}
