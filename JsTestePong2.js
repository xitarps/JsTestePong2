
window.onload = ()=> {
  let my = setup_drawing_tools();
  let screen_width = window.innerWidth;
  let half_screen_width = screen_width/2;
  let screen_height = window.innerHeight;
  let fps = 60;
  let player = {y_position: 300};
  let computer = {y_position: 300};
  let start_direction = random_start_direction()
  let ball = {x_axis: half_screen_width-5, y_axis: screen_height/2, speed: 150,
              x_direction: start_direction[0],
              y_direction: start_direction[1]};
  fix_canvas_proportions(my.canvas);



  track_player_move(player);
  ball_move(ball);
  render_game_screen({brush: my.brush, fps, player, computer, ball,
                      screen_width, screen_height,
                      half_screen_width});
}

const log = (what = '', where = 'console')=> {
  if(where == 'console')         return console.log(what);
  if(where == 'alert')           return alert(what);
  if(where == 'html_tag_alert')  return document.querySelector('#your_item');
  if(where == 'html_tag_notice') return document.querySelector('#your_item');
}

let fix_canvas_proportions = (canvas)=> {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const setup_drawing_tools = ()=> {
  let temporary_canvas = document.querySelector('#gameCanvas');
  let temporary_brush = temporary_canvas.getContext('2d');

  return { canvas: temporary_canvas, 
           brush: temporary_brush };
}

let set_brush_color = (brush,hexadecimal_color)=> {
  brush.fillStyle = hexadecimal_color;
}

let draw_rectangle = ({brush, x_axis, y_axis, width, height})=> {
  brush.fillRect(x_axis, y_axis, width, height);
}

let set_brush_font = ({brush, font_size, font_family})=> {
  brush.font = `${font_size}em ${font_family}`;
}

let write_text = ({brush,  x_axis, y_axis, text})=> {
  brush.fillText(text, x_axis, y_axis);
}

let draw_field = ({brush, field_color, lines_color, width, height, half})=> {

  set_brush_color(brush,field_color);
  draw_rectangle({brush, x_axis: 0, y_axis: 0,
                  width, height});

  set_brush_color(brush,lines_color);
  draw_rectangle({brush: brush, x_axis: half - 5, y_axis: 0,
                  width: 10, height: height});
}

let draw_flipper = ({brush, color, x_axis, y_axis, width, height})=> {
  set_brush_color(brush, color);
  draw_rectangle({brush, x_axis, y_axis,
                  width, height})
}

let draw_ball = ({brush, color, x_axis, y_axis, width, height})=> {
  set_brush_color(brush, color);
  draw_rectangle({brush, x_axis, y_axis,
                  width, height})
}

let track_player_move = (player)=> {
  document.addEventListener("mousemove", (event)=>{
    player.y_position = event.clientY;
  });
}
let random_start_direction = ()=> {
  arr = [];
  
  // (1 or -1 * 2) => 2 or -2
  arr.push((Math.round(Math.random()) * 2 - 1) * 2);
  // 1 or -1
  arr.push(Math.round(Math.random()) * 2 - 1);
  // (1 or -1 * 2) => 2 or -2
  arr.push((Math.round(Math.random()) * 2 - 1) * 2);
  
  
  //shuffle (Fisher-Yates Algorithm)
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  arr.pop();
  return arr;
}

let ball_move = (ball)=> {
  setInterval(() => {
    
    ball.x_axis = ball.x_axis + ball.x_direction
    ball.y_axis = ball.y_axis + ball.y_direction

  }, 1000/ball.speed );
}

let render_game_screen = ({brush, fps, player, ball,
                           screen_width, screen_height, half_screen_width})=> {
  setInterval(() => {

    draw_field({brush, field_color: '#081605',
                lines_color: '#FFFFFF', width: screen_width,
                height: screen_height, half: half_screen_width});

    //player
    draw_flipper({brush, color:'#FFFFFF', 
                  x_axis: 0, y_axis: player.y_position-30,
                  width: 15, height: 60});
    
    //computer
    draw_flipper({brush, color:'#FFFFFF', 
                  x_axis: screen_width - 15, y_axis: 300,
                  width: 15, height: 60});

    //ball
    draw_ball({brush, color:'#FFFFFF', 
               x_axis: ball.x_axis, y_axis: ball.y_axis,
               width: 10, height: 10});

    set_brush_font({brush, font_size: 1.5, font_family: 'Quantico' })
    write_text({brush,  x_axis: 20, y_axis: 30, text: `${fps} fps`})

  }, 1000/fps);
}