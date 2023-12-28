class Hunter extends Boid {
    constructor(x, y, speed_x, speed_y){
        super(x, y, speed_x, speed_y, 255, 50, 50);
    }


    add_speed(delta) {
        this.spd.add( this.acc.mult(delta*10));
        this.spd.normalize();
        this.spd.mult(140);
    }
    
    applyForce() {
        this.acc = new createVector(0, 0);
        let total_separation = 0;
        let separation = new createVector(0, 0);

        for(const hunter of hunters){
            let dist = this.pos.dist(hunter.pos);
            if(dist == 0) continue;

            if(dist < 40){
                let diff = new createVector(0, 0);
                diff.add(this.pos);
                diff.sub(hunter.pos);
                diff.normalize();
                diff.div(dist);
                diff.mult(100);
                separation.add(diff);
                total_separation++;
            }
        }
        
        if(total_separation > 1)
            separation.div(total_separation);
        this.acc.add(separation);
        
        
        let force = new createVector(0, 0);
        let total = 0;
        for (const boid of boids){
            let dist = this.pos.dist(boid.pos);
            if(dist < 80){

                let diff = new createVector(0, 0);
                diff.add(boid.pos);
                diff.sub(this.pos);

                diff.normalize();
                diff.div(dist*dist);
                diff.mult(200000);

                force.add(diff);
                total++;
            }
        }
        this.acc.add(force);
    }
}