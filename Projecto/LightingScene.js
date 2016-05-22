var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30; 
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.doSomething = function(){
	console.log("Doing Something");
}

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);
	
	this.handler1 = new MyCargoHandler(this,5,5,5, new MyUnitCubeQuad(this));
	
	this.lightState = [];
	this.lightState[0] = false; 
	this.option1 = true;
	this.option2 = true;
	this.speed = 3;

	this.initCameras();

	this.initLights();
	
	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this,5.0,0.3,3.0,3.5,0.3);
	this.wall = new Plane(this);
	this.wallLeft = new MyQuad(this, -1, 2, -0.5, 1.5);
	this.floor = new MyQuad(this, 0, 10, 0 , 12); 
	this.prism = new MyPrism(this,8,20);
	this.cylinder = new MyCylinder(this,8,20, 2, 5);
	this.lamp = new MyLamp(this,5,5);
	this.clock = new MyClock(this);
	this.plane = new MyPaperPlane(this);
	this.animPlane = new MyAnimatedPlane(this,this.plane,14,3.8,8);
	this.drone = new MyDrone(this, 7,3.825,8, -155);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,0 - (1/BOARD_HEIGHT),1 + (1/BOARD_HEIGHT),0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1); 
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialW = new CGFappearance(this);
	this.materialW.setDiffuse(0.7,0.4,0.1,1.0); 
	this.materialW.setSpecular(0.2,0.2,0.2,1);	
	this.materialW.setShininess(120);
	
	this.materialS = new CGFappearance(this);
	this.materialS.setDiffuse(0.2,0.2,0.2,1.0); 
	this.materialS.setSpecular(1,1,1,1.0);	
	this.materialS.setShininess(120);

	this.materialP = new CGFappearance(this);
	this.materialP.setDiffuse(0,0.4,0.7,1.0); 
	this.materialP.setSpecular(0.2,0.2,0.2,1);	
	this.materialP.setShininess(120);

	this.materialF = new CGFappearance(this);
	this.materialF.setDiffuse(0.8,0.3,0.1,1.0); 
	this.materialF.setSpecular(0.2,0.2,0.2,1);	
	this.materialF.setShininess(120);

	this.enableTextures(true);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1.0);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(30);
	this.tableAppearance.loadTexture("../resources/images/table.png");
 	
 	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1.0);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(30);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
 
  	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setDiffuse(0.8,0.8,0.8,1.0);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setShininess(30);
	this.windowAppearance.loadTexture("../resources/images/window.png");
 	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1.0);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(30);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(200);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.cilinderAppearance = new CGFappearance(this);
	this.cilinderAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.cilinderAppearance.setSpecular(0.5,0.5,0.5,1);
	this.cilinderAppearance.setShininess(200);
	this.cilinderAppearance.loadTexture("../resources/images/pillar.png");

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	this.clockAppearance.setSpecular(0,0,0,1);
	this.clockAppearance.setShininess(60);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.handMaterial = new CGFappearance(this);
	this.handMaterial.setDiffuse(0.05,0.05,0.05,1);
	this.handMaterial.setShininess(120);

	this.paperMaterial = new CGFappearance(this);
	this.paperMaterial.setDiffuse(1,1,1,1);
	this.paperMaterial.setShininess(120);

	this.metalMaterial = new CGFappearance(this);
	this.metalMaterial.setDiffuse(0.1,0.1,0.1,1);
	this.metalMaterial.setShininess(30);

	this.metal2Material = new CGFappearance(this);
	this.metal2Material.setDiffuse(0.5,0.5,0.5,1);
	this.metal2Material.setSpecular(1,1,1,1);
	this.metal2Material.setShininess(120);

	this.droneAppearances = [];
	
	this.loadSkinDefault();
	this.loadSkinArmy();
	this.loadSkinSnowArmy();
	this.loadSkinRainbow();
	
	
	this.droneAppearanceList = {
		"Default" : 0,
		"Army" : 1, 
		"SnowArmy" : 2,
		"Rainbow" : 3
	}
	this.DroneChoice = 0;
	this.currDroneAppearance = this.droneAppearances[this.DroneChoice];
	  
	this.setUpdatePeriod(1);
};

LightingScene.prototype.loadSkinDefault = function(){
	var tempAppearanceList = [];
	tempAppearanceList.push(this.metalMaterial);
	tempAppearanceList.push(this.metal2Material);
	//Corpo
	var tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/a3.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/a2.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/a1.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	this.droneAppearances.push(tempAppearanceList);

}

LightingScene.prototype.loadSkinArmy = function(){
	var tempAppearanceList = [];
	tempAppearanceList.push(this.metalMaterial);
	tempAppearanceList.push(this.metal2Material);
	//Corpo
	var tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/aa3.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/aa2.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/aa1.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	this.droneAppearances.push(tempAppearanceList);

}

LightingScene.prototype.loadSkinSnowArmy = function(){
	var tempAppearanceList = [];
	tempAppearanceList.push(this.metalMaterial);
	tempAppearanceList.push(this.metal2Material);
	//Corpo
	var tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/as3.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/as2.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/as1.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	this.droneAppearances.push(tempAppearanceList);

}

LightingScene.prototype.loadSkinRainbow = function(){
	var tempAppearanceList = [];
	tempAppearanceList.push(this.metalMaterial);
	tempAppearanceList.push(this.metal2Material);
	//Corpo
	var tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/t3.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0);
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/t2.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance);

	tempAppearance = new CGFappearance(this);
	tempAppearance.setDiffuse(0.5,0.5,0.5,1.0); 
	tempAppearance.setSpecular(0.8,0.8,0.8,1);
	tempAppearance.setShininess(60);
	tempAppearance.loadTexture("../resources/images/drone/t1.png");
	tempAppearance.setTextureWrap('REPEAT','REPEAT');
	tempAppearanceList.push(tempAppearance); 

	this.droneAppearances.push(tempAppearanceList);

}

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0,1.0);
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lightState[0] = true;
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lightState[1] = true;
	
	this.lights[2].setPosition(10.5, 6.0, 5, 1);
	this.lights[2].setVisible(true);
	this.lightState[2] = true;
	
	this.lights[3].setPosition(4, 6, 5, 1);
	this.lights[3].setVisible(true);
	this.lightState[3] = true;
	
	this.lights[4].setPosition(-0.1, 4, 7.5, 1);
	this.lights[4].setVisible(true);
	this.lightState[4] = true;
	
	//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0,1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0,1.0,0,1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0,1.0,0,1.0);
	this.lights[4].setConstantAttenuation(1);
	this.lights[4].setLinearAttenuation(0);
	this.lights[4].setQuadraticAttenuation(0);
	this.lights[4].enable(); 
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++){
		this.lights[i].disable();
		if(this.lightState[i])
			this.lights[i].enable();  
		
		this.lights[i].update();
	}
}

LightingScene.prototype.toggleClock = function() {
	this.clock.toggleRunning();
}

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime);
	this.animPlane.update(currTime);
	this.drone.update(currTime);
	this.currDroneAppearance = this.droneAppearances[this.DroneChoice];
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.floorAppearance.apply(); 
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	this.windowAppearance.apply(); 
	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.wallLeft.display();
	this.popMatrix();
  
	// Plane Wall
	this.materialP.apply(); 
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();
	
	//Lamp
	this.pushMatrix();
		this.translate(7.5,8,7.5);
		this.rotate(Math.PI,1,0,0);
		this.materialB.apply();
		this.lamp.display();
	this.popMatrix();
	
	//Cylinders
	this.pushMatrix();
		this.translate(1,0,1);
		this.rotate(-(Math.PI/2.0),1,0,0);
		this.cilinderAppearance.apply();
		this.scale(1,1,8);

		this.cylinder.display();
		
		this.translate(0,-13,0);
		this.cylinder.display();
		
		this.translate(13,0,0);
		this.cylinder.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
		this.translate(7.25,7.25,0);
		this.scale(0.7,0.7,0.2);
		this.clockAppearance.apply();
		this.clock.display();
	this.popMatrix();

	//Plane
	this.pushMatrix();
		this.animPlane.display();
		//this.paperMaterial.apply();
		//this.translate(14,3.8,8);
		//this.rotate((Math.PI * 90 / 180),0,-1,0);
		//this.plane.display();
	this.popMatrix();
	
	this.handler1.display();

	//Drone
	this.drone.display();
	// ---- END Primitive drawing section
};
