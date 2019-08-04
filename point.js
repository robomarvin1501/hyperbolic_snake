class Point {
    constructor(r, theta) {
        this.theta = theta
        this.r = r
        this.direction = null
        this.rad_mod = 1.0
    }

    plot() {
        var eucl_r = Math.tanh(this.r / 2)
        var circ_r = Math.round(Math.abs(eucl_r - Math.tanh(this.r / 2 - SPEED / 4)) * width / 2)
        
        if (circ_r < 1) {
            circ_r = 1
        }

        var x = Math.round(eucl_r * Math.cos(this.theta) * width / 2)
        var y = Math.round(eucl_r * Math.sin(this.theta) * height / 2)

        ellipse(int(width/2 + x), int(height/2 - y), int(circ_r), int(circ_r))
    }
}