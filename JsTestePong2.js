
window.onload = ()=> {
  let my = setup_drawing_tools()
  fix_canvas_proportions(my.canvas)

  //test set
  //  set_brush_color(my.brush ,'#45A05A');
  //  draw_rectangle({brush: my.brush, left: 1, top: 1, width: 100, height: 100});

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

let draw_rectangle = ({brush, left, top, width, height})=> {
  brush.fillRect(left, top, width, height);
}