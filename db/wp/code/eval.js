x = 3;
y = 5;
console.log("eval('x+y')="+eval('x+y'));

function max(x,y) { 
    return (x>y)?x:y; 
}

console.log("eval('max')="+eval('max'));

console.log("eval('max(x,y)')="+eval('max(x,y)'));

console.log("eval('max(2*x,y)')="+eval('max(2*x,y)'));
