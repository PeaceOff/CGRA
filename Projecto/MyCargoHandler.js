function MyCargoHandler(scene, x, y, z, object) {
 	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.object = object;
	
 };

 MyCargoHandler.prototype = Object.create(CGFobject.prototype);
 MyCargoHandler.prototype.constructor = MyCargoHandler;
 
 MyCargoHandler.prototype.display = function() {
   	
	this.scene.pushMatrix();
		
		if(this.object){
			this.scene.translate(this.x,this.y,this.z);
			this.object.display(); 
		}
	this.scene.popMatrix();

 }