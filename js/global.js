const width  = window.screen.width;
const height = window.screen.height;

const numberOfBoids = 800;
const numberOfHunters = 20;

const boids = [];
const hunters = [];
const pillars = [];

let t0 = Date.now();

const rotate_x = (x, y, angle) => {
    return x * Math.cos(angle) - y * Math.sin(angle);
}

const rotate_y = (x, y, angle) => {
    return x * Math.sin(angle) + y * Math.cos(angle);
}
