function MyClock(scene) {
 	CGFobject.call(this,scene);
	
	this.slices = 12;
	this.stacks = 1;
	var angulo = 360 / this.slices;
	this.aRad = (angulo * Math.PI) / 180;
	this.aRad2 = this.aRad / 2;
	this.seconds = new MyClockHand(scene,0.8);
	this.minutes = new MyClockHand(scene,0.6);
	this.hours = new MyClockHand(scene,0.4);
	this.circle = new MyCircle(scene, 12);
    this.cylinder = new MyCylinder(scene, 12, 1);
    this.sAng = 270;
    this.mAng = 180;
    this.hAng = 90;
    this.seconds.setAngle(this.sAng);
    this.minutes.setAngle(this.mAng);
    this.hours.setAngle(this.hAng);
    this.firstTime = 0;
    this.running = true;
 	this.initBuffers();
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;
 MyClock.prototype.display = function() {
    this.scene.clockAppearance.apply();
    this.circle.display();
    this.scene.tableAppearance.apply();
    this.cylinder.display();

    this.scene.pushMatrix();
        this.scene.handMaterial.apply();
        this.scene.translate(0,0,1.05);
        this.seconds.display();
    
        this.scene.translate(0,0,0.1);
        this.minutes.display();

        this.scene.translate(0,0,0.1);
        this.hours.display();


    this.scene.popMatrix();
 }

 MyClock.prototype.toggleRunning = function() {
 	this.running = !this.running;
 }

 MyClock.prototype.update = function(currTime) {
 	if(!this.running)
 		return;

 	if(this.firstTime === 0){
 		this.firstTime = currTime;
 		return;
 	}
 	var tempDec = currTime - this.firstTime; 
	tempDec /= 1000;
	var s = tempDec % 60;
	tempDec /= 60;
	var m = tempDec % 60;
	tempDec /= 60;
	var h = tempDec % 12;

	this.seconds.setAngle(this.sAng + (s/60*360));
	this.minutes.setAngle(this.mAng + (m / 60 * 360));
	this.hours.setAngle(this.hAng + (h / 12 * 360));
 }