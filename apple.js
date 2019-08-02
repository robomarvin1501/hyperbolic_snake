class Apple {
    constructor() {
        this.max_dist = 2.0
        this.rad_mod = 2.0
        this.replace()
    }

    replace() {
        this.r = Math.random() * (this.max_dist - 0.1) + 0.1
        this.theta = Math.random() * TWO_PI
        this.plot()
    }

    plot() {
        var eucl_r = Math.tanh(this.r / 2)
        this.circ_r = Math.round(this.rad_mod * Math.abs(eucl_r - Math.tanh(this.r / 2 - SPEED / 4)) * width / 2)
        var x = Math.round(width / 2 + eucl_r * Math.cos(this.theta) * width / 2)
        var y = Math.round(height / 2 - eucl_r * Math.sin(this.theta) * height / 2)

        noStroke()
        fill(255, 0, 0)
        ellipse(int(x), int(y), int(this.circ_r * 2), int(this.circ_r * 2))
        stroke(0)
        noFill()
    }
}