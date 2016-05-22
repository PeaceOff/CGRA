function MyDroneShape(scene) {
 	CGFobject.call(this,scene);
    
    this.droneArmFR = new MyDroneArm(scene, true);
    this.droneArmLR = new MyDroneArm(scene, false);
    this.corpo = new MyLamp(scene,10,5,1,1);
    this.circulo = new MyCircle(scene,10);	
    this.leg = new MyDroneLeg(scene);
 };

 MyDroneShape.prototype = Object.create(CGFobject.prototype);
 MyDroneShape.prototype.constructor = MyDroneShape;
 
 MyDroneShape.prototype.update = function( time){
   this.droneArmFR.update(time);
   this.droneArmLR.update(time); 
 }

 MyDroneShape.prototype.display = function() {   
  
    this.scene.pushMatrix();
    
    this.scene.translate(0,0.4,0);

    this.droneArmFR.display();

    this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2 , 0 , 1 ,0);
      this.droneArmLR.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
      this.scene.translate(0,-0.1,0);

      this.scene.currDroneAppearance[2].apply();
      
      this.scene.pushMatrix();
        this.scene.rotate(Math.PI/10,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.scene.translate(0,0,-1);
        this.circulo.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
          this.scene.scale(0.5,0.5,0.5);
          this.corpo.display();
      this.scene.popMatrix();

    this.scene.popMatrix();
  
  this.scene.popMatrix();

  this.scene.pushMatrix();
      this.scene.currDroneAppearance[0].apply();
      this.scene.translate(-0.5,0,0);
      this.leg.display();
      
      this.scene.rotate(Math.PI, 0,1,0);
      this.scene.translate(-1,0,0);
      
      this.leg.display();

  this.scene.popMatrix();

    
  
 };
