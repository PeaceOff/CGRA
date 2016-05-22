function MyDroneLeg(scene) {
 	CGFobject.call(this,scene);
    this.arc = new MyCurvedLine(scene, 6, 0,0,0 , 0,1,0 , 0.8,1,0);
    this.base = new MyUnitCubeQuad(scene); 
 };

 MyDroneLeg.prototype = Object.create(CGFobject.prototype);
 MyDroneLeg.prototype.constructor = MyDroneLeg;

 MyDroneLeg.prototype.display = function() {
    
    this.scene.pushMatrix();

       

        this.scene.pushMatrix();

        this.scene.scale(0.05,0.05,1);
            this.base.display();

        this.scene.popMatrix();
         this.scene.pushMatrix();
            
            this.scene.translate(0,0,0.3);
            this.scene.scale(0.3,0.3,0.1); 

            this.arc.display();
        
          this.scene.popMatrix();
           this.scene.pushMatrix();
            
            this.scene.translate(0,0,-0.3);
            this.scene.scale(0.3,0.3,0.1);

            this.arc.display();
        
          this.scene.popMatrix();

 	this.scene.popMatrix();
 };
