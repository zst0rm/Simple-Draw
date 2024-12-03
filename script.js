// Toggle between Home and Draw views
function toggleView() {
  const homeView = document.getElementById('homeView');
  const drawView = document.getElementById('drawView');
  homeView.classList.toggle('hidden');
  drawView.classList.toggle('hidden');
  
}


const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color");
const sizeSlider = document.getElementById("size");
const clearButton = document.getElementById("clear");



// Set canvas size dynamically based on the window size
function resizeCanvas() {
  canvas.width = 1050;
  canvas.height = 450;
}
resizeCanvas();

// Redraw when resizing (if needed)
// Add code here to redraw saved content on canvas resize if desired.

// Default settings
let drawing = false;
let penColor = "#000000";
let penSize = 5;

// Event listeners
canvas.addEventListener("mousedown", (e) => {
  drawing = true;

  // Begin a new path to avoid connecting to the previous path
  ctx.beginPath();

  // Get the starting position
  const rect = canvas.getBoundingClientRect();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("mouseup", () => {
  drawing = false;

  // Reset the path to stop connecting lines
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

canvas.addEventListener("mouseout", () => {
  drawing = false;

  // Reset the path when the mouse leaves the canvas
  ctx.beginPath();
});

colorPicker.addEventListener("input", (e) => (penColor = e.target.value));
sizeSlider.addEventListener("input", (e) => (penSize = e.target.value));
clearButton.addEventListener("click", clearCanvas);

// Drawing function
function draw(e) {
  if (!drawing) return;

  // Get the bounding rectangle of the canvas
  const rect = canvas.getBoundingClientRect();

  // Adjust mouse position
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;

  // Draw a line to the current position
  ctx.lineTo(x, y);
  ctx.stroke();

  // Start a new path for smoother lines
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Ensure canvas resizes dynamically
window.addEventListener("resize", resizeCanvas);
