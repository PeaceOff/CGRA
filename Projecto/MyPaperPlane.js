function MyPaperPlane(scene) {
 	CGFobject.call(this,scene);
 	
 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {


	this.vertices = [
		-0.35, 0.3 , 0,
		0.35, 0.3, 0,
		0, 0.3, 1,
		-0.35, 0.3 , 0,
		0.35, 0.3, 0,
		0, 0.3, 1,
		0, 0.3, 1,
		0, 0.3, 0,
		0, 0, 0,
		0, 0.3, 1,
		0, 0.3, 0,
		0, 0, 0
		];

	this.indices = [
           0, 1, 2, 
           3, 5, 4,
           6, 7, 8,
           9, 11, 10
        ];

	this.normals = [
		0, -1, 0,
		0, -1, 0,
		0, -1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0
	]

	this.primitiveType=this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
