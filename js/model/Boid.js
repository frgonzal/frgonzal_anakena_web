class Boid {
    constructor(x, y, speed_x, speed_y, c1, c2, c3){
        this.size = 3.0;
        this.c1 = c1; 
        this.c2 = c2;
        this.c3 = c3;
        
        this.pos = new createVector(x, y);
        this.spd = new createVector(speed_x, speed_y);
        this.acc = new createVector(0, 0);
    }

    add_speed(delta) {
        this.spd.add( this.acc.mult(delta*10));
        this.spd.limit(170);
    }

    move(delta) {
        this.pos = new createVector(
            (this.pos.x + this.spd.x * delta) % width,
            (this.pos.y + this.spd.y * delta) % height
        );

        if(this.pos.x < 0){
            this.pos.x = width;
        }

        if(this.pos.y < 0){
            this.pos.y = height;
        }
    }

    draw() {
        fill(this.c1, this.c2, this.c3);
        let theta = this.spd.heading() - Math.PI/2;
        let x1 = rotate_x(0, this.size*4, theta) + this.pos.x;
        let y1 = rotate_y(0, this.size*4, theta) + this.pos.y;
        let x2 = rotate_x(-this.size, 0, theta) + this.pos.x;
        let y2 = rotate_y(-this.size, 0, theta) + this.pos.y;
        let x3 = rotate_x(this.size, 0, theta) + this.pos.x;
        let y3 = rotate_y(this.size, 0, theta) + this.pos.y;
        triangle(x1, y1, x2, y2, x3, y3);
    }

    resetAcceleration(){
        this.acc = new createVector(0, 0);
    }

    evadeWalls() {
        let dx = [0         , this.pos.x, width     , this.pos.x];
        let dy = [this.pos.y, 0         , this.pos.y, height];
        for(let i=0; i<4; i++){
            let dist = this.pos.dist(new createVector(dx[i], dy[i]));
            let v = new createVector(-dx[i], -dy[i]);
            v.add(this.pos);
            v.normalize();
            if(dist > 0){
                v.div(dist*dist*dist*dist);
                v.mult(1000000);
            }
            this.acc.add(v);
        }
    }

    applyForce() {}
    
    moveFrom(x, y) {
        let diff = new createVector(x, y);
        let dist = this.pos.dist(diff)
        if(dist < 100){
            diff.sub(this.pos);
            diff.div(dist);
            diff.mult(2000);
            this.acc.sub(diff);   
        }
    }

    simulate(delta) {
        this.add_speed(delta);
        this.move(delta);
    }
}
