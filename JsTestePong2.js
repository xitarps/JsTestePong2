
window.onload = ()=> {
  let my = setup_drawing_tools();
  const screen_width = window.innerWidth;
  const half_screen_width = screen_width/2;
  const screen_height = window.innerHeight;
  const fps = 60;
  const flipper_size = 60;
  let score = {player: 0, computer: 0, max: 5};
  let player = {y_position: 300};
  let computer = {y_position: 400};
  let difficulty = 3;
  let start_direction = random_start_direction();
  let ball = {x_axis: half_screen_width-5, y_axis: screen_height/2, speed: 150,
              size: 10,
              x_direction: start_direction[0],
              y_direction: start_direction[1]};
  fix_canvas_proportions(my.canvas);



  track_player_move(player);
  track_computer_move(computer, ball, flipper_size, difficulty);
  ball_move(ball);
  check_ball_bounce(ball, flipper_size, screen_height,screen_width,player,
                    computer, score);
  render_game_screen({brush: my.brush, fps, flipper_size, player,
                      computer, ball,
                      screen_width, screen_height,
                      half_screen_width, score});
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
                  width, height});
}

let draw_ball = ({brush, color, x_axis, y_axis, width, height})=> {
  set_brush_color(brush, color);
  draw_rectangle({brush, x_axis, y_axis,
                  width, height});
}

let track_player_move = (player)=> {
  document.addEventListener("mousemove", (event)=>{
    player.y_position = event.clientY;
  });
}

let track_computer_move = (computer, ball, flipper_size, difficulty)=> {
  setInterval(() => {
    if (ball.y_axis <= computer.y_position + flipper_size/2){
      computer.y_position -= 1;
    }
    if (ball.y_axis >= computer.y_position - flipper_size/2 + ball.size){
      computer.y_position += 1;
    }
  }, 1000/(ball.speed * difficulty));
  
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

let score_treatment = (ball, screen_height, screen_width)=> {
  set_ball_in_the_middle(ball, screen_height, screen_width);
}
let set_ball_in_the_middle= (ball, screen_height, screen_width)=>{
  ball.x_axis = (screen_width/2)-(ball.size/2);
  ball.y_axis = screen_height/2;
}

let ball_move = (ball)=> {
  setInterval(() => {
    
    ball.x_axis = ball.x_axis + ball.x_direction;
    ball.y_axis = ball.y_axis + ball.y_direction;

  }, 1000/ball.speed );
}

let check_ball_bounce = (ball, flipper_size, screen_height,screen_width,player,
                         computer, score)=> {
  setInterval(() => {
    check_if_ball_touching_wall(ball,screen_height,screen_width, score);
    check_if_ball_touching_flipper(ball, flipper_size, screen_height,
                                   screen_width, player, computer);
  }, 1000/ball.speed);
}

let check_if_ball_touching_wall = (ball, screen_height, screen_width, score)=> {
  if(ball.y_axis >= screen_height || ball.y_axis <= 0) ball_bounce(ball,'y');
  if(ball.x_axis >= screen_width){score.player++; score_treatment(ball, 
                                                                  screen_height,
                                                                  screen_width)}
  if(ball.x_axis <= 0){score.computer++; score_treatment(ball, screen_height, 
                                                         screen_width)}
}

let check_if_ball_touching_flipper = (ball, flipper_size, screen_height, 
                                      screen_width, player, computer)=> {
  let ball_top = ball.y_axis;
  let ball_bottom = ball.y_axis + ball.size;
  
  let player_top = player.y_position-flipper_size/2;
  let player_bottom = player.y_position+flipper_size/2;

  let computer_top = computer.y_position-flipper_size/2;
  let computer_bottom = computer.y_position+flipper_size/2;

  //player flipper
  if ((ball.x_axis < ball.size) && 
      (ball_bottom >= player_top && ball_top <= player_bottom)){
    
    if ((ball_bottom <= player_top+ball.size && ball.y_direction > 0) || 
        (ball_top >= player_bottom-ball.size && ball.y_direction < 0)){
      ball_bounce(ball,'y');
    }
    ball_bounce(ball,'x');
  }

  //computer flipper
  if ((ball.x_axis > screen_width-ball.size*2) && 
      (ball_bottom >= computer_top && ball_top <= computer_bottom)){
    
    if ((ball_bottom <= computer_top+ball.size && ball.y_direction > 0) || 
        (ball_top >= computer_bottom-ball.size && ball.y_direction < 0)){
      ball_bounce(ball,'y');
    }
    ball_bounce(ball,'x');
  }
  
}

let ball_bounce = (ball,colision_position)=> {

  if(colision_position == 'x') return ball.x_direction *= -1;
  if(colision_position == 'y') ball.y_direction *= -1;

}

let render_game_screen = ({brush, fps, flipper_size, player, computer, ball,
                           screen_width, screen_height, half_screen_width,
                           score})=> {
  let in_game = setInterval(() => {

    draw_field({brush, field_color: '#081605',
                lines_color: '#FFFFFF', width: screen_width,
                height: screen_height, half: half_screen_width});

    //player
    draw_flipper({brush, color:'#FFFFFF', 
                  x_axis: 0, y_axis: player.y_position-(flipper_size/2),
                  width: ball.size, height: flipper_size});
    
    //computer
    draw_flipper({brush, color:'#FFFFFF', 
                  x_axis: screen_width - ball.size,
                  y_axis: computer.y_position-(flipper_size/2),
                  width: ball.size, height: flipper_size});

    //ball
    draw_ball({brush, color:'#FFFFFF', 
               x_axis: ball.x_axis, y_axis: ball.y_axis,
               width: ball.size, height: ball.size});

    set_brush_font({brush, font_size: 1.5, font_family: 'Quantico' });
    write_text({brush,  x_axis: 20, y_axis: 30, text: `${fps} fps`});
    write_text({brush,  x_axis: half_screen_width-150, y_axis: 70,
                text: `Player: ${score.player}`});
    write_text({brush,  x_axis: half_screen_width+30, y_axis: 70,
                text: `Computer: ${score.computer}`});

    //game end
    if(score.player == score.max ||
       score.computer == score.max){ 

         clearInterval(in_game);
         set_brush_color(brush,'#081605');
         draw_rectangle({brush, x_axis:0, y_axis:0, width: screen_width,
                         height: screen_height});
         set_brush_color(brush,'#FFFFFF');
         let message = (score.player>score.computer)? 'You win!' : ' You lose';
         write_text({brush,  x_axis: screen_width/2-60, y_axis: screen_height/2,
                     text: message });
         message = 'Press F5 to play again';
         write_text({brush,  x_axis: screen_width/2-120,
                     y_axis: screen_height/2+30, text: message });
    }

  }, 1000/fps);
}