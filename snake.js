class Snake {
    constructor(points) {
        this.points = points
        this.length = points.length
        this.add = 0
        this.goal = null
        this.dead = false
    }

    move() {
        var copypoint = this.points[0]
        var new_point = new Point(copypoint.r, copypoint.theta)
        new_point.direction = copypoint.direction
        move_point(new_point, SPEED, new_point.direction) 
        this.points.unshift(new_point)

        if (intersect(this.points[0], this.goal)) { 
            this.eat()
        }
        if (this.add === 0) {
            var gone = this.points.pop()
        }
        this.add -= 1
        if (this.add < 0) {
            this.add = 0
        }
        if (this.points.length > 3) {
            for (var segment of this.points.slice(3, this.points.length)) {
                if (intersect(segment, this.points[0])) {
                    this.die()
                }
            }
        }
    }

    plot() {
        for (var point of this.points) {
            point.plot()
        }
    }

    eat() {
        SPEED += 0.00
        this.add += 2
        this.goal.replace()
        if (this.goal.max_dist <= 2.7) {
	    this.goal.max_dist += 0.1
	}
        this.goal.rad_mod *= 0.96
        this.length += 2
    }

    left_turn() {
        this.points[0].direction -= HALF_PI
    }

    right_turn() {
        this.points[0].direction += HALF_PI

    }

    die() {
        this.dead = true
    }
    

}
