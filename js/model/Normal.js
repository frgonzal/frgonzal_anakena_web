class Normal extends Boid {
    constructor(x, y, speed_x, speed_y){
        super(x, y, speed_x, speed_y, 255, 255, 255);
    }

    applyForce() {
        this.acc = new createVector(0, 0);

        let total_cohesion = 0;
        let total_alignment = 0;
        let total_separation = 0;

        let cohesion = new createVector(0, 0);
        let alignment = new createVector(0, 0);
        let separation = new createVector(0, 0);

        for(const boid of boids){
            let dist = this.pos.dist(boid.pos);
            if(dist == 0) continue;

            // cohesion
            if( dist < 100){
                cohesion.add(boid.pos);
                total_cohesion++;
            }

            //alignment 
            if(dist < 100){
                alignment.add(boid.spd);
                total_alignment++;
            }
            
            if(dist < 60){
                let diff = new createVector(-boid.pos.x, -boid.pos.y);
                diff.add(this.pos);
                diff.normalize();

                diff.div(dist);
                diff.mult(2500);

                separation.add(diff);
                total_separation++;
            }
        }
        
        if(total_cohesion > 1)
            cohesion.div(total_cohesion);
        cohesion.sub(this.pos);
        this.acc.add(cohesion);
        
        if(total_alignment > 1)
            alignment.div(total_alignment);
        this.acc.add(alignment);
        
        if(total_separation > 1)
            separation.div(total_separation);
        this.acc.add(separation);
        

        //---------------------------------------
        let total = 0;
        separation = new createVector(0, 0);
        for(const hunter of hunters){
            let dist = this.pos.dist(hunter.pos)
            if(dist < 100){
                let diff = new createVector(-hunter.pos.x, -hunter.pos.y);
                diff.add(this.pos);

                diff.normalize();
                diff.div(dist*dist);
                diff.mult(200000);
                separation.add(diff);
                total++;
            }
        }

        if(total > 0)
            separation.div(total);
        this.acc.add(separation);
    }
}