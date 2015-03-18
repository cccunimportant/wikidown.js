function sum(n) {
  var s = 0;
  for (i=1; i<=n; i++)
    s+=i;
  return s;
}

console.log("sum(10)="+sum(10));

console.log("sum(100)="+sum(100));