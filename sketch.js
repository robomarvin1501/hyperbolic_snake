let snake;
let apple;

let SPEED = 0.1
let last = null

let DIR = null

let local_storage_name = "hyperbolicsnake"
let high_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]



function setup() {
  var on_mobile = mobile_and_tablet_check()
  if (on_mobile === true) {
    var cnv = createCanvas(windowWidth, windowWidth)
    cnv.position(windowWidth/2 - width/2, 0)
  } else {
    var cnv = createCanvas(windowHeight, windowHeight)
    cnv.position(windowWidth/2 - width/2, 0)
  }
  cnv.parent(sketch_holder);

  let test_point = new Point(0.86, 0.2223)
  test_point.direction = HALF_PI

  frameRate(15)

  textSize(30)

  snake = new Snake([test_point])
  apple = new Apple()
  snake.goal = apple

  var s_high_score = s_array(high_score)
  var html_high_score = document.getElementById("score_table00")

  if (localStorage.getItem(local_storage_name) == null) {
    high_score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  } else {
    high_score = localStorage.getItem(local_storage_name)
  }

  // html_high_score.innerHTML = "High scores: " + s_high_score
  let score = document.getElementById("score")
  
}

function draw() {
  var leave = false

  background(255)
  stroke(0)
  strokeWeight(4)
  noFill()
  ellipse(Math.floor(width / 2), Math.floor(height / 2), width, width)

  if (DIR === LEFT_ARROW) {
    snake.left_turn()
    DIR = null
  } else if (DIR === RIGHT_ARROW) {
    snake.right_turn()
    DIR = null
  } else if (DIR === ESCAPE) {
    apple.replace()
    DIR = null
  }




  snake.move()
  snake.plot()
  apple.plot()

  if (snake.dead || leave === true) {
    if (snake.length > high_score[9]) {
      high_score.push(snake.length)
      high_score.sort()

      localStorage.setItem(local_storage_name, high_score)
    }

    var on_mobile = mobile_and_tablet_check()

    var s_high_score = s_array(high_score)
    var html_high_score = document.getElementById("score_table00")

    // html_high_score.innerHTML = "High scores: <br/" + s_high_score

    // score.innerHTML = "Score: " + str(snake.length)
    print("Score: ", snake.length)
    if (on_mobile === true) {
      text("Score: " + str(snake.length), width/2, 50)
    } else if (on_mobile === false) {
      text("Score: " + str(snake.length), width - 200, 50)
    }
    noLoop()
  }
}


function move_point(p, d, angle) { 
  var sign4 = d / Math.abs(d)
  if (angle < (-1 * PI)) {
    angle += TWO_PI
  }
  if (angle > PI) {
    angle -= TWO_PI
  }
  var sign1 = Math.abs(angle) / angle

  var new_r = Math.acosh((Math.cosh(p.r) * Math.cosh(d)) - (Math.sinh(p.r) * Math.sinh(d) * Math.cos(angle)))
  var test = (Math.cosh(p.r) * Math.cosh(new_r) - Math.cosh(d)) / (Math.sinh(p.r) * Math.sinh(new_r))

  if (test < 1.0) {
    p.theta += sign1 * sign4 * Math.acos(test)
  } else {
    p.theta += 0
  }
  var new_angle = sign1 * Math.acos((Math.cosh(p.r) - (Math.cosh(new_r) * Math.cosh(d))) / (Math.sinh(new_r) * Math.sinh(d)))
  p.r = new_r
  p.direction = new_angle
}


function intersect(circle1, circle2) {
  var eucl_r1 = Math.tanh(circle1.r / 2)
  var x1 = eucl_r1 * Math.cos(circle1.theta)
  var y1 = eucl_r1 * Math.sin(circle1.theta)
  var circ_r1 = circle1.rad_mod * Math.abs(eucl_r1 - Math.tanh(circle1.r / 2 - SPEED / 4))

  var eucl_r2 = Math.tanh(circle2.r / 2)
  var x2 = eucl_r2 * Math.cos(circle2.theta)
  var y2 = eucl_r2 * Math.sin(circle2.theta)
  var circ_r2 = circle2.rad_mod * Math.abs(eucl_r2 - Math.tanh(circle2.r / 2 - SPEED / 4))

  var dist = (x1 - x2) ** 2 + (y1 - y2) ** 2

  if (dist < (circ_r1 + circ_r2) ** 2) {
    return true
  } else {
    return false
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    DIR = LEFT_ARROW
  } else if (keyCode === RIGHT_ARROW) {
    DIR = RIGHT_ARROW
  } else if (keyCode === ESCAPE) {
    // All is lost. You cannot find the apple. Have a new one!
    DIR = ESCAPE
  }
  return false
}

function touchEnded() {
  if (mouseX < width / 2) {
    DIR = LEFT_ARROW
  } else if (mouseX >= width / 2) {
    DIR = RIGHT_ARROW
  }
}

function s_array(arr) {
  var s = ''
  if (arr.length === 0) {
    return s
  } else {
    for (var el of arr) {
      s += str(el) + '<br/>'
    }
  }
  return s
}

window.mobile_and_tablet_check = function() {
  // Returns true if user is a mobile or tablet
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}