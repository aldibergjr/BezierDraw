points = [];
ctrlpoly = [];
point_color = 'red';
point_size = 6;
function show(){

    var stageObjects = [];
    ctrlpoly.forEach(l => stageObjects.push(l));
    points.forEach(c => stageObjects.push(c));
    
    stage.children(stageObjects);

}
function tracepoly(){
    let aux = []
    for (let i = 0; i < points.length -1; i++) {
        let x1 = points[i].attr('x'), x2 = points[i + 1].attr('x') ,y1 = points[i].attr('y'), y2 = points[i + 1].attr('y')
        aux.push(new Path()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .stroke('black', 2));
    }
    return aux;
}
function pointaction(){
    if(points.length > 1)
     ctrlpoly = tracepoly();    
}
stage.on('click', function(point){
    p = new Circle(point.x, point.y, point_size).fill(point_color);
    points.push(p);
    
   // p.addTo(stage);
   pointaction();
   show();
    
})