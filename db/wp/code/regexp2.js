var re = new RegExp("\\d+", "gi");
var str = "name:john age:20 birthday:1990/8/31";

var m = null;
while (m = re.exec(str))
    console.log(m.toString());
    
var p = parse(str);
console.log("p.name="+p.name+" age="+p.age+" year="+p.year+" month="+p.month+" day="+p.day);

function parse(data) {
    var e=new RegExp("name:(\\w+) age:(\\d+) birthday:(\\d+)/(\\d+)/(\\d+)", "gi");

    if (data.match(e)) {
        return  {exp: RegExp['$&'],
                name: RegExp.$1,
                age:RegExp.$2,
                year:RegExp.$3,
                month:RegExp.$4,
                day:RegExp.$5};
    }
    else {
        return null;
    }
}

String.prototype.trim = function() { 
  return this.replace(/(^\s*)|(\s*$)/g, ""); 
}

console.log("' abc '.trim()='"+' abc '.trim()+"'");
