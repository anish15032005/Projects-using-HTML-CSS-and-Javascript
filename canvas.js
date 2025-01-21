const state = {
    fps: 60,
    color: "#0ac40a",
    charset: "0123456789ABCDEF",
    size: 20,
};

const gui = new dat.GUI();
gui.add(state, "fps", 1, 120, 1);
gui.addColor(state, "color");
gui.add(state, "charset");
gui.add(state, "size", 5, 100, 5);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h, columns;
let frameInterval = 1000 / state.fps; // Time per frame
let lastTime = 0;

// Initialize the canvas
const resize = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    columns = Math.floor(w / state.size);
};
window.addEventListener("resize", resize);
resize();

// Generate random character for the matrix effect
const getRandomChar = () =>
    state.charset.charAt(Math.floor(Math.random() * state.charset.length));

// Initialize the drops for each column
let drops = Array(columns).fill(0);

// Draw the matrix rain
const draw = (time) => {
    if (time - lastTime < frameInterval) {
        requestAnimationFrame(draw);
        return;
    }
    lastTime = time;

    // Clear the canvas with reduced opacity for fading effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    // Set text color and font
    ctx.fillStyle = state.color;
    ctx.font = `${state.size}px monospace`;

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        const x = i * state.size;
        const y = drops[i] * state.size;

        // Draw the random character
        ctx.fillText(getRandomChar(), x, y);

        // Reset drop if it goes off-screen or randomly
        if (y > h || Math.random() > 0.98) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
