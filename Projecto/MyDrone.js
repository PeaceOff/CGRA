function MyDrone(scene, x, y, z, angle) {
 	CGFobject.call(this,scene);
    this.shape = new MyDroneShape(scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.angl = angle;
    this.lastAngl = angle;
    this.hook = new MyHook(scene);

    this.yangl = 0;
    this.defaultYAngl = Math.PI*25/180;
    this.mov = 0; 
    this.lastMov = 0;


    this.elevat = 0;
    this.elevatT = 0;

    this.rotat = 0;
    this.lastRotat = 0;

    this.movVelo = 5;
    this.rotatVelo = 100;
    this.elevatVelo = 2;
    
    this.heliceVeloL = 0.2;
    this.heliceVeloN = 1;
    this.heliceVeloR = 10;
    
    this.heliceFactor = 1;
    
    this.lastTime = 0;
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;
 
 MyDrone.prototype.rotate = function(angle){
   this.rotat = angle * this.rotatVelo;
 }

 MyDrone.prototype.moveHook = function(increment){
   this.hook.elevate(increment);
 }

 MyDrone.prototype.move = function(increment){
  this.mov = increment  * this.movVelo;

 }

  lerpV = function( v1, v2, t){
    return (v1 + (v2-v1)*t);
  }

  MyDrone.prototype.elevate = function(increment){
   this.elevat = increment  *  this.elevatVelo;
 }

 MyDrone.prototype.update = function(currTime){
  
  
    

   this.shape.update(currTime);
   this.hook.update(currTime);
   if(this.lastTime === 0){
    this.lastTime = currTime;
    return;
   }
    
    //Lerps 
   var deltaTime = (currTime - this.lastTime)/1000;

   this.lastAngl = lerpV(this.lastAngl,this.angl,deltaTime);
   this.lastMov = lerpV(this.lastMov,this.mov,deltaTime);
   this.lastRotat = lerpV(this.lastRotat,this.rotat,deltaTime*2);
   this.elevatT = lerpV(this.elevatT,this.elevat,deltaTime);
   
   if(this.mov > 0){
      this.shape.droneArmFR.setVeloH1( this.heliceVeloL * this.heliceFactor);
      this.shape.droneArmFR.setVeloH2( this.heliceVeloR * this.heliceFactor);
   }else if( this.mov < 0){
      this.shape.droneArmFR.setVeloH1( this.heliceVeloR * this.heliceFactor);
      this.shape.droneArmFR.setVeloH2( this.heliceVeloL * this.heliceFactor); 
   }else{
     this.shape.droneArmFR.setVeloH1( this.heliceVeloN  * this.heliceFactor);
      this.shape.droneArmFR.setVeloH2( this.heliceVeloN * this.heliceFactor);
   }

   if(this.rotat > 0){
      this.shape.droneArmLR.setVeloH1( this.heliceVeloR * this.heliceFactor);
      this.shape.droneArmLR.setVeloH2( this.heliceVeloR * this.heliceFactor);
      this.shape.droneArmFR.setVeloH1( this.heliceVeloL * this.heliceFactor);
      this.shape.droneArmFR.setVeloH2( this.heliceVeloL * this.heliceFactor);
   }else if( this.rotat < 0){
      this.shape.droneArmLR.setVeloH1( this.heliceVeloL * this.heliceFactor);
      this.shape.droneArmLR.setVeloH2( this.heliceVeloL * this.heliceFactor);
      this.shape.droneArmFR.setVeloH1( this.heliceVeloR * this.heliceFactor);
      this.shape.droneArmFR.setVeloH2( this.heliceVeloR * this.heliceFactor);
   }else{
     this.shape.droneArmLR.setVeloH1( this.heliceVeloN * this.heliceFactor);
     this.shape.droneArmLR.setVeloH2( this.heliceVeloN * this.heliceFactor);
   }


   
   //Posicao
   var tempX = Math.cos(-(this.angl-90)*Math.PI/180);
   var tempZ = Math.sin(-(this.angl-90)*Math.PI/180);

   this.x +=tempX *this.lastMov * deltaTime;
   this.y += this.elevatT* deltaTime;
   this.z +=tempZ *this.lastMov * deltaTime;
  
   //Rotacao 
   this.angl += this.lastRotat * deltaTime;
    
   this.yangl = this.defaultYAngl * (this.lastMov/this.movVelo);
  
   this.lastTime = currTime;
 }


 MyDrone.prototype.display = function(){
    
    this.scene.pushMatrix();
      
      this.scene.pushMatrix();
        this.scene.translate(this.x,this.y,this.z);
        this.scene.rotate(this.angl*Math.PI/180, 0,1,0);
        this.scene.rotate(this.yangl, 1,0,0);
        this.shape.display();
      this.scene.popMatrix();
      
      this.scene.translate(this.x,this.y+0.3,this.z); 
      this.hook.display();

    this.scene.popMatrix();
  
 }
