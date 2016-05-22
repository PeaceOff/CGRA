function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();

};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
    
    var ang = 90 * Math.PI / 180;

    this.scene.translate(0,0,0.5);
    this.quad.display();
   
    this.scene.rotate(ang,0,1,0);
    this.scene.translate(0.5,0,0.5);
    this.quad.display();

    this.scene.rotate(ang,0,1,0);
    this.scene.translate(0.5,0,0.5);
    this.quad.display();

    this.scene.rotate(ang,0,1,0);
    this.scene.translate(0.5,0,0.5);
    this.quad.display();

    this.scene.rotate(ang,1,0,0);
    this.scene.translate(0,-0.5,0.5);
    this.quad.display();

    this.scene.rotate(2*ang,1,0,0);
    this.scene.translate(0,0,1);
    this.quad.display();
};
