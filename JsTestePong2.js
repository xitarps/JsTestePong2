
window.onload = ()=> {
  let my = setup_drawing_tools()
  let screen_width = window.innerWidth;
  let half_screen_width = screen_width/2;
  let screen_height = window.innerHeight;
  fix_canvas_proportions(my.canvas)

  draw_field({brush: my.brush, field_color: '#081605',
              lines_color: '#FFFFFF', width: screen_width,
              height: screen_height, half: half_screen_width})

  draw_flipper({brush: my.brush, color:'#FFFFFF', 
                x_axis: 0, y_axis: 100, width: 15, height: 70})

  draw_flipper({brush: my.brush, color:'#FFFFFF', 
                x_axis: screen_width - 15, y_axis: 300, width: 15, height: 70})

  track_player_move(my.brush)
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
  brush.font = `${font_size}px ${font_family}`;
}

let write_text = ({brush,  x_axis, y_axis, text})=> {
  brush.fillText(text, x_axis, y_axis);
}

let draw_field = ({brush, field_color, lines_color, width, height, half})=> {

  set_brush_color(brush,field_color);
  draw_rectangle({brush: brush, x_axis: 0, y_axis: 0,
                  width: width, height: height});

  set_brush_color(brush,lines_color);
  draw_rectangle({brush: brush, x_axis: half - 5, y_axis: 0,
                  width: 10, height: height});
}

let draw_flipper = ({brush, color, x_axis,y_axis, width, height})=> {
  set_brush_color(brush, color);
  draw_rectangle({brush:brush, x_axis:x_axis, y_axis:y_axis, width:width, height:height})
}

let track_player_move =(brush)=>{
  document.addEventListener("mousemove", (event)=>{
    draw_flipper({brush: brush, color:'#FFFFFF', 
                  x_axis: 0, y_axis: event.clientY, width: 15, height: 70})
  });
}