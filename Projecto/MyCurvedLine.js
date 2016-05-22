function MyCurvedLine(scene, slices, x1 , y1, z1,  x2 , y2, z2,  x3 , y3, z3) {
 	CGFobject.call(this,scene);
	
	this.ponto1 = {x: x1, y: y1, z: z1};
	this.ponto2 = {x: x2, y: y2, z: z2};
	this.ponto3 = {x: x3, y: y3, z: z3};
	this.slices = (slices < 3)? 3 : slices;
 	this.initBuffers();
 };

 MyCurvedLine.prototype = Object.create(CGFobject.prototype);
 MyCurvedLine.prototype.constructor = MyCurvedLine;

 lerp = function(ponto1, ponto2, valor) {
     var pontoF = {x : 0, y : 0, z : 0};
     pontoF.x = ponto1.x + ((ponto2.x - ponto1.x) * valor);
     pontoF.y = ponto1.y + ((ponto2.y - ponto1.y) * valor);
     pontoF.z = ponto1.z + ((ponto2.z - ponto1.z) * valor);
     return pontoF;
 }

 getNormal = function(ponto1, ponto2, ponto3) {

     var res  = {x : 0, y : 0, z : 0};
     
     var pTemp1 = {x : ponto1.x - ponto2.x , y : ponto1.y - ponto2.y , z : ponto1.z - ponto2.z};
     
     var pTemp2 = {x : ponto3.x - ponto2.x , y : ponto3.y - ponto2.y , z : ponto3.z - ponto2.z}; 
    
     res.x = (pTemp1.y * pTemp2.z) - (pTemp2.y * pTemp1.z);
    
     res.y = -(pTemp1.x * pTemp2.z) + (pTemp2.x * pTemp1.z);
     res.z = (pTemp1.x * pTemp2.y) - (pTemp2.x * pTemp1.y);
     return res;
 }

 MyCurvedLine.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];
	var indiceTemp = 0;
	var t = 0;
	var ponto  = {x : this.ponto1.x, y : this.ponto1.y, z : this.ponto1.z};
    var normalAnterior = {x: -1, y: 0 , z:0};
	 for(var i = 0 ; i < this.slices; i++){
          
        var pTemp1 = {x : 0, y : 0, z : 0};
        var pTemp2 = {x : 0, y : 0, z : 0};
        

        //primeiros dois pontos.
        this.vertices.push(ponto.x, ponto.y, ponto.z);
        this.vertices.push(ponto.x, ponto.y, ponto.z + 1);
        this.normals.push(normalAnterior.x, normalAnterior.y, normalAnterior.z);
        this.normals.push(normalAnterior.x, normalAnterior.y, normalAnterior.z);
        
        //Calcular proximo ponto
        pTemp1 = lerp(this.ponto1, this.ponto2,t);
        pTemp2 = lerp(this.ponto2, this.ponto3,t);
        if(i !== this.slices - 1){
            ponto = lerp(pTemp1, pTemp2, t);
        } else {
            ponto = this.ponto3;
        }

        //proximos dois pontos
        this.vertices.push(ponto.x, ponto.y, ponto.z);
        this.vertices.push(ponto.x, ponto.y, ponto.z + 1);
        
        this.indices.push(indiceTemp,indiceTemp + 2,indiceTemp + 1);
        this.indices.push(indiceTemp + 1,indiceTemp + 2,indiceTemp + 3);

        var pTemp3 = {x  : 0, y : 0 ,z : 0};
        pTemp3.x = pTemp2.x;
        pTemp3.y = pTemp2.y;
        pTemp3.z = pTemp2.z - 1;
        var normal = {x : 0, y: 0 , z : 0};

        normal = getNormal(pTemp1, pTemp2, pTemp3);

        this.normals.push(normal.x,normal.y,normal.z);
        this.normals.push(normal.x,normal.y,normal.z);
        
        normalAnterior=normal;
    
        this.texCoords.push(t,0);
        this.texCoords.push(t,1);
        t += 1/this.slices;
        this.texCoords.push(t,0);
        this.texCoords.push(t,1);
        indiceTemp += 4;
    }

	t = 0;
	ponto  = {x : this.ponto1.x, y : this.ponto1.y, z : this.ponto1.z};
    normalAnterior = {x: 1, y: 0 , z:0};

    for(var i = 0 ; i < this.slices; i++){
          
        var pTemp1 = {x : 0, y : 0, z : 0};
        var pTemp2 = {x : 0, y : 0, z : 0};
        

        //primeiros dois pontos.
        this.vertices.push(ponto.x, ponto.y, ponto.z);
        this.vertices.push(ponto.x, ponto.y, ponto.z + 1);
        this.normals.push(normalAnterior.x, normalAnterior.y, normalAnterior.z);
        this.normals.push(normalAnterior.x, normalAnterior.y, normalAnterior.z);

        //Calcular proximo ponto
        pTemp1 = lerp(this.ponto1, this.ponto2,t);
        pTemp2 = lerp(this.ponto2, this.ponto3,t);
        if(i !== this.slices - 1){
            ponto = lerp(pTemp1, pTemp2, t);
        } else {
            ponto = this.ponto3;
        }

        //proximos dois pontos
        this.vertices.push(ponto.x, ponto.y, ponto.z);
        this.vertices.push(ponto.x, ponto.y, ponto.z + 1);
        
        this.indices.push(indiceTemp,indiceTemp + 1,indiceTemp + 2);
        this.indices.push(indiceTemp + 1,indiceTemp + 3,indiceTemp + 2);

        var pTemp3 = {x  : 0, y : 0 ,z : 0};
        pTemp3.x = pTemp2.x;
        pTemp3.y = pTemp2.y;
        pTemp3.z = pTemp2.z + 1; 
        
        var normal = {x : 0, y: 0 , z : 0};
        normal = getNormal(pTemp1, pTemp2, pTemp3); 
  
        this.normals.push(normal.x,normal.y,normal.z);
        this.normals.push(normal.x,normal.y,normal.z);
        
        normalAnterior=normal;


        this.texCoords.push(t,0);
        this.texCoords.push(t,1);
        t += 1/this.slices;
        this.texCoords.push(t,0);
        this.texCoords.push(t,1);
        indiceTemp += 4;
    }

   
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
