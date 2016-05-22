function MyHook(scene) {
 	CGFobject.call(this,scene);
    this.cylinder = new MyCylinder(scene,3,2,2,1);
    this.hook = new MyLamp(scene,4,2);
    this.bottomHook = new MyCircle(scene,4);
    this.cargo = null;
    this.height = 1;
    this.tempH = 0;
    this.elevatVelo = 5;
    this.tempValue = 0;
    this.lastTime=0;
 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;
 

 MyHook.prototype.elevate = function(increment){
   this.tempH = increment  *  this.elevatVelo;
 }

 MyHook.prototype.update = function(currTime){

     if(this.lastTime === 0){
          
     this.lastTime = currTime;
    return;
   }
    
    //Lerps 
   var deltaTime = (currTime - this.lastTime)/1000;

   this.tempValue = lerpV(this.tempValue,this.tempH,deltaTime*10);
   if(this.height > 0.5 && this.tempValue < 0 || this.tempValue > 0){
    this.height += this.tempValue*deltaTime;
   }
   this.lastTime = currTime;

 }


 MyHook.prototype.display = function(){
  
    this.scene.pushMatrix();
        this.scene.pushMatrix();
            this.scene.rotate(Math.PI/2,1,0,0);
            this.scene.scale(0.03,0.03,this.height);
           
            this.cylinder.display();
        this.scene.popMatrix();

         this.scene.pushMatrix();
            
            this.scene.translate(0,-this.height,0);
            this.scene.scale(0.1,0.1,0.1);

            this.hook.display();
        
        this.scene.popMatrix(); 
     
        
        this.scene.pushMatrix();
            
            this.scene.translate(0,-this.height + 0.1,0);
            this.scene.scale(0.1,0.1,0.1);

            this.scene.rotate(Math.PI/2,1,0,0);        
            this.bottomHook.display();
        this.scene.popMatrix();
        
        if(this.cargo){
           this.cargo.display(); 
        }
    this.scene.popMatrix();
  
 }
