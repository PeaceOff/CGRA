function MyClockHand(scene,size) {
 	CGFobject.call(this,scene);
	this.angle = 0;
    this.hand = new MyUnitCubeQuad(scene);
    this.size = size;
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.setAngle = function(ang) {
     this.angle = ang;
 }

 MyClockHand.prototype.display = function() {
    this.scene.pushMatrix();
   
     this.scene.rotate((Math.PI * this.angle)/180,0,0,-1);
     this.scene.translate(0,this.size/2,0);
     this.scene.scale(0.05,this.size,0.1);
     this.hand.display();
    this.scene.popMatrix(); 
 }