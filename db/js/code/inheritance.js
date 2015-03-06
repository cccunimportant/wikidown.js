function Person(name, age) {
  this.name = name;
  this.age = age;
  this.toStr = function() { 
    return "Person:name="+this.name+" age="+this.age; 
  }
}
var john = new Person("John", 40);

console.log("john.toStr()="+john.toStr());

function Student(name, age, grade) {
  this.prototype = Person;
  this.prototype(name, age);
  this.grade = grade;
  this.toStr = function() { 
    return "Student:name="+this.name+" age="+this.age+" grade="+this.grade; 
  }
}

var tony = new Student("Tony", 19, "Freshman");

console.log("tony.toStr()="+tony.toStr());