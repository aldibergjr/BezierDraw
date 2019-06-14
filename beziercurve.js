points = [];
ctrlpoly = [];
curve = [];
a_curves =[];
select_ctrl = 0;
point_color = 'red';
point_size = 6;
poligono = false;
ponto = false;
curva = false;
function show(){

    var stageObjects = [];
    var c_curve = [];
    curve.forEach(c => c_curve.push(c));
    ctrlpoly.forEach(l => c_curve.push(l));
    if(ponto)
    points.forEach(c => c_curve.push(c));
    
    if(!a_curves[select_ctrl] && c_curve)
    a_curves.push(c_curve);
    else
    a_curves[select_ctrl] = c_curve;

    a_curves.forEach( c => c.forEach(e => stageObjects.push(e)));
    stage.children(stageObjects);

}
function bernstein(p1, p2, t){
    let point = new Point((((1-t)*p1.x) + (t*p2.x)), (((1-t)*p1.y) + (t*p2.y)));
	return point;
}
function makeCurve(){

    let c_points = [];
    for(let i = 0; i < t; i++){
        let aux = [];
        let aux2 = [];

        //transformando todos os circulos(pontos de controle) em pontos.
        for (let j = 0; j < points.length; j++) {
            aux.push(new Point(points[j].attr('x'), points[j].attr('y')));
        }
        //* /Interpolar todos os pontos até um só, usando o polinomio de bernstein */
        //* /Fazendo isso percorrendo a quantidade de avaliações para a interpolação e formação da curva.*/
        while(aux.length > 1){
			for(var k = 0; k<aux.length-1;k++){
				point = bernstein(aux[k], aux[k+1], i/t);
				aux2.push(point);
			}
			aux = aux2;
			aux2 = [];
		}
		c_points.push(aux[0]);
    }
    
    curve = tracecurve(c_points);
}
function tracecurve(c_points){
    let aux = [];
        for (let i = 0; i < c_points.length -1; i++)
        {
            let x1 = c_points[i].x , y1 = c_points[i].y , x2 = c_points[i+1].x, y2 = c_points[i+1].y;
            aux.push(new Path()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .stroke('pink', 2));
        
        }
      
    return aux;
           
}
//Função que traça o poligono de controle
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
//função de adicionar nova curva
stage.on('message:adicionarCurva', function(){
    
    points = [];
    ctrlpoly = [];
    curve = [];
    if(a_curves[a_curves.length -1])
    select_ctrl = a_curves.length;
});

stage.on('message:mostrarPoligono', function(pol){
    poligono = pol;
}
);

stage.on('message:mostrarPonto', function(pon){
    ponto = pon;
}
);

stage.on('message:mostrarCurva', function(cur){
    curva = cur;
}
);



stage.on('message:mudarT', function(newT){
    t = newT;
}
);
//ação de edição e chamada dos pontos.
function pointaction(poligono, curva){
     if(points.length > 1 && poligono)
     ctrlpoly = tracepoly();  
     if(points.length > 2 && curva)
     makeCurve(); 
}
//Click de criação de novos pontos
stage.on('click', function(point){
    p = new Circle(point.x, point.y, point_size).fill(point_color);
    points.push(p);
   // p.addTo(stage); 
  pointaction(poligono, curva);
  show();
    
})