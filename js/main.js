function setup() {
    createCanvas(width, height);

    for (let i=0; i<numberOfBoids; i++){
        let x = Math.floor(Math.random()*width);
        let y = Math.floor(Math.random()*height);
        let vx = Math.random()*100.0 - 50;
        let vy = Math.random()*100.0 - 50;
        boids.push(new Normal(x, y, vx, vy));
    }
    
    for (let i=0; i<numberOfHunters; i++){
        let x = Math.floor(Math.random()*width);
        let y = Math.floor(Math.random()*height);
        let vx = Math.random()*100.0 - 50;
        let vy = Math.random()*100.0 - 50;
        hunters.push(new Hunter(x, y, vx, vy));
    }
}

function draw() {
    let t1 = Date.now();
    let delta = (t1 - t0)/1000;
    t0 = t1;

    background(20);


    for(const hunter of hunters){
        hunter.resetAcceleration();
        hunter.evadeWalls();
        hunter.applyForce();
        if (mouseIsPressed)
            hunter.moveFrom(mouseX, mouseY);

        hunter.simulate(delta);
        hunter.draw();
    }

    for(const boid of boids){
        boid.resetAcceleration();
        boid.evadeWalls();
        boid.applyForce();

        if (mouseIsPressed)
            boid.moveFrom(mouseX, mouseY);

        boid.simulate(delta);
        boid.draw();
    }

}

