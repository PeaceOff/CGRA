function MyTable(scene, x, y ,z, pmH, pmC) {

	this.x = x;
	this.x2 = x/2;
	this.y = y;
	this.y2 = y/2;
	this.z = z;
	this.z2 = z/2

	this.pmH = pmH;
	this.pmH2 = pmH/2;
	
	this.pmC = pmC;
	this.pmC2 = pmC/2;
	

	CGFobject.call(this,scene);
	this.unitQuad = new MyUnitCubeQuad(this.scene);
	this.unitQuad.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

    //Matriz original!
    var matrix = this.scene.getMatrix();
	
    //Tampo da mesa
    this.scene.translate(0,this.pmH + this.y2,0);
    this.scene.scale(this.x,this.y,this.z);
    this.scene.tableAppearance.apply();
    this.unitQuad.display();
    
   	this.scene.materialS.apply();
    //Perna 1
    this.scene.setMatrix(matrix);
    this.scene.translate(this.x2-this.pmC2,this.pmH2,this.z2 - this.pmC2);
    this.scene.scale(this.pmC,this.pmH,this.pmC);
    this.unitQuad.display();

    //Perna 2
    this.scene.setMatrix(matrix);
    this.scene.translate(-this.x2+this.pmC2,this.pmH2,this.z2 - this.pmC2);
    this.scene.scale(this.pmC,this.pmH,this.pmC);
    this.unitQuad.display();  

    //Perna 3
    this.scene.setMatrix(matrix);
    this.scene.translate(-this.x2+this.pmC2,this.pmH2,-(this.z2 - this.pmC2));
    this.scene.scale(this.pmC,this.pmH,this.pmC);
    this.unitQuad.display();

    //Perna 4
    this.scene.setMatrix(matrix);
    this.scene.translate(this.x2-this.pmC2,this.pmH2,-(this.z2 - this.pmC2));
    this.scene.scale(this.pmC,this.pmH,this.pmC);
    this.unitQuad.display();


    this.scene.setMatrix(matrix);
};
