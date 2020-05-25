
window.onload = ()=> {
  let my = setup_drawing_tools()
  fix_canvas_proportions(my.canvas)

  //test set
  //  set_brush_color(my.brush ,'#45A05A');
  //  draw_rectangle({brush: my.brush, x_axis: 15, y_axis: 25, width: 500, height: 100});
  //  set_brush_font({brush: my.brush, font_size: 40, font_family: 'Helvetica'})
  //  write_text({brush: my.brush, x_axis: 50, y_axis: 150,text: 'test text!'})
}

const log = (what = '', where = 'console')=> {
  if(where == 'console')         return console.log(what);
  if(where == 'alert')           return alert(what);
  if(where == 'html_tag_alert')  return document.querySelector('#your_item');
  if(where == 'html_tag_notice') return document.querySelector('#your_item');
}

let fix_canvas_proportions = (canvas)=> {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
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