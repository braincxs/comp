// The data source (formerly Ward.js)
const boxes = [
  { num: 1, url: "https://example.com" },
  { num: 2, url: "https://example.com" },
  { num: 3, url: "https://example.com" },
  { num: 4, url: "https://example.com" },
  { num: 5, url: "https://example.com" },
  { num: 6, url: "https://example.com" },
];

// Wait for the HTML to load before running
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('box-grid');

  boxes.forEach((box, i) => {
    // Create the anchor tag (fixing the href__ typo)
    const anchor = document.createElement('a');
    anchor.href = box.url; 
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.className = "box-link";
    
    // Dynamically calculate and apply the staggered animation delay (0.08s per item)
    anchor.style.animationDelay = `${i * 0.08}s`;

    // Create the number text inside the box
    const span = document.createElement('span');
    span.className = "box-number";
    span.textContent = box.num;

    // Append everything together
    anchor.appendChild(span);
    grid.appendChild(anchor);
  });
});