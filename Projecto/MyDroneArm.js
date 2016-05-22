function MyDroneArm(scene,first) {
 	CGFobject.call(this,scene);
 	this.helice = new MyDroneHelice(this.scene);
 	this.cilindro = new MyCylinder(this.scene,4,5,2,4);
    this.cilindro2 = new MyClosedCylinder(this.scene,6,1,4,1);
    this.isFirst = first;
	this.helice1Velo = 5;
	this.helice2Velo = 5;
    this.helice1Angle = 0;
	this.helice2Angle = 0;

	this.lastTime = 0;
 };

 MyDroneArm.prototype = Object.create(CGFobject.prototype);
 MyDroneArm.prototype.constructor = MyDroneArm;

 MyDroneArm.prototype.setVeloH1 = function (value){
    this.helice1Velo = value;
 }

 MyDroneArm.prototype.setVeloH2 = function (value){
    this.helice2Velo = value;
 }


 MyDroneArm.prototype.update = function (currTime){
    if(this.lastTime === currTime){
      this.lastTime = currTime;
      return;
    }
    
    var deltaTime = (currTime - this.lastTime ) / 1000;


    this.helice1Angle += this.helice1Velo * (Math.PI*2) * deltaTime;
    this.helice2Angle += this.helice2Velo * (Math.PI*2) * deltaTime;

    this.lastTime = currTime;
 }

 MyDroneArm.prototype.display = function() {
    
    var heliceEscala = 0.2;
         
    this.scene.pushMatrix();

        this.scene.translate(0,0,-1);
        this.scene.scale(0.1,0.1,2);
        this.scene.currDroneAppearance[4].apply(); 
        this.cilindro.display();
        
   this.scene.popMatrix();
    
   this.scene.pushMatrix();
    
    this.scene.translate(0,0.1,0);

    this.scene.pushMatrix();
       
       this.scene.translate(0,0,1);
       this.scene.scale(heliceEscala,heliceEscala,heliceEscala);
       this.scene.rotate(90*Math.PI/180, 1,0,0);
       this.scene.currDroneAppearance[3].apply();
       this.cilindro2.display();
 

    this.scene.popMatrix();

    this.scene.pushMatrix(); 
       
       this.scene.translate(0,0,-1);
       this.scene.scale(heliceEscala,heliceEscala,heliceEscala);
       this.scene.rotate(90*Math.PI/180, 1,0,0);
        this.scene.currDroneAppearance[3].apply();
       this.cilindro2.display();
 
        
    this.scene.popMatrix();

    this.scene.pushMatrix();

        this.scene.translate(0,0,-1);
        this.scene.scale(heliceEscala,heliceEscala,heliceEscala);
        if(this.isFirst){
        	this.scene.rotate(this.helice2Angle, 0,1,0);
        }else{	 
        	this.scene.rotate(-this.helice2Angle, 0,1,0);
 		}

        this.scene.currDroneAppearance[0].apply();
        
        this.helice.display();

    this.scene.popMatrix(); 
          
    this.scene.pushMatrix();

        this.scene.translate(0,0,1);
        this.scene.scale(heliceEscala,heliceEscala,heliceEscala);
        if(this.isFirst){
       		this.scene.currDroneAppearance[1].apply();
        	this.scene.rotate(this.helice1Angle, 0,1,0);
        } else {
          	this.scene.currDroneAppearance[0].apply();
         	this.scene.rotate(-this.helice1Angle, 0,1,0);
        }
        
        this.helice.display();

    this.scene.popMatrix();

    this.scene.popMatrix();

 }