/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	var angulo = 360 / this.slices;
	this.aRad = (angulo * Math.PI) / 180;
	this.aRad2 = this.aRad / 2;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];

	var ang = 0;
	var ind = 0;
	//Usar pop() e push()
	for(var z = 0 ; z < 1 ; z += (1/this.stacks)){
		for(var i = 0 ; i < this.slices; i++){
			var x = Math.cos(ang);
			var y = Math.sin(ang);

			this.vertices.push(x,y,z);
			this.vertices.push(x,y,z+(1/this.stacks));

			ang += this.aRad;

			x = Math.cos(ang);
			y = Math.sin(ang);

			this.vertices.push(x,y,z);
			this.vertices.push(x,y,z+(1/this.stacks));

			this.indices.push(ind, ind + 3 , ind + 1);
			this.indices.push(ind, ind + 2 , ind + 3);

			x = Math.cos(this.aRad2);
			y = Math.sin(this.aRad2);

			for(var p = 0; p < 4 ; p++)
				this.normals.push(x,y,0);

			this.aRad2 += this.aRad;
			ind += 4;

		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
