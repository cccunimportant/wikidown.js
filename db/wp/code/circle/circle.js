var Circle = function(radius) {
    this.radius = radius
    this.PI = 3.14;
/*    this.prototype = {
        area: function () {
            return Circle.PI * this.radius * this.radius
        }
    }
*/    
    
    this.area = function() {
        return this.PI * this.radius * this.radius;
    }    
};

module.exports = Circle;
