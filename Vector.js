/**
 * Created by Helmond on 16-4-2015.
 */
function Vector(x,y){
    this.x = x;
    this.y = y;
    return(this);
}

Vector.prototype.add = function(v){return new Vector(this.x+ v.x,this.y+ v.y)};
Vector.prototype.subtract = function(v){return new Vector(this.x- v.x,this.y- v.y)};
Vector.prototype.dot = function(u,v){return u.x* v.x+u.y* v.y;};
Vector.prototype.cross2D = function(u,v){return u.x* v.y-u.y* v.x;};
Vector.prototype.scale = function(s){return(new Vector(this.x*s,this.y*s));};
Vector.prototype.length = function(){return Math.sqrt(this.x*this.x+this.y*this.y);};
Vector.prototype.normalize = function(){return this.scale(1/this.length());};
Vector.prototype.getNormals = function(){return [new Vector(this.y,-this.x).normalize(),new Vector(-this.y,this.x).normalize()];};//Returns the 2 normals on this vector in 2D as an array
Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
}

// angle in radians
Vector.prototype.rotate = function(angle) {
    return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
};

Vector.prototype.toString = function() {
    return '( ' + this.x + ' __ ' + this.y + ' )';
}