function MyAnimatedPlane(scene, p,x,y,z) {
 	CGFobject.call(this,scene);
 	
 	this.posXI = x;
 	this.posYI = y;
 	this.posZI = z;
 	 
 	this.posX = x;
 	this.posY = y;
 	this.posZ = z;

 	this.rotX = 0;
	this.rotY = -90;
	this.rotZ = 0;

 	 
 	this.state = 0;
 	this.plane = p;
 	this.time = 0;
 	this.lastTime = 0;
 	this.initBuffers();
 };

 MyAnimatedPlane.prototype = Object.create(CGFobject.prototype);
 MyAnimatedPlane.prototype.constructor = MyAnimatedPlane;

LerpValue = function(vI, vF, t){
	var vM = vF-vI;
	return vI + vM*t;
}

MyAnimatedPlane.prototype.update = function(currTime) {
	if(this.lastTime === 0){
		this.lastTime = currTime;
	}
	
	if(this.state === 2)
	return;

	var deltaTime = currTime - this.lastTime;

	this.time += deltaTime/10000; 
	 
	if(this.time>=1){
		this.time = 0;

		this.state++;
	}

	switch(this.state){
		case 0:
			
			this.posX = LerpValue(this.posXI,0.9, this.time);
			this.posY = LerpValue(this.posYI,5, this.time); 
			this.rotX = LerpValue(0, -25, this.time);
	 
			break;		 
		case 1:
			this.posX = LerpValue(0.9 ,  2.5, this.time);
			this.posY = LerpValue(5 ,   0.31, this.time);
			this.posZ = LerpValue(this.posZ, 9,this.time);
			this.rotX = LerpValue(-25 , -180, this.time); 
			this.rotY = LerpValue(-90, 25, this.time);  
		default:
			
	}

	this.lastTime = currTime;
	
}

MyAnimatedPlane.prototype.display = function() {
	this.scene.pushMatrix();
		this.scene.paperMaterial.apply();
		this.scene.translate(this.posX,this.posY,this.posZ);


		this.scene.rotate(this.rotZ*Math.PI/180,0,0,1);
	
		this.scene.rotate(this.rotY*Math.PI/180,0,1,0);

		this.scene.rotate(this.rotX*Math.PI/180,1,0,0);
		
	
		this.plane.display();
	this.scene.popMatrix();
}