# 20190803

## 考察this三板斧

``` javascript
function show() {
  console.log('this:', this); // this: obj
}

var obj = {
  show: show
};

obj.show();
```

``` javascript
function show() {
  console.log('this:', this); // this: window
}

var obj = {
  show: function () {
    show();
  }
};

obj.show()
```

``` javascript
var obj = {
  show: function () {
    console.log('this:', this); // this: window
  }
};

(0, obj.show)();
```

``` javascript
var obj = {
  sub: {
    show: function() {
      console.log('this:', this); // this: sub
    }
  }
}

obj.sub.show()
```

``` javascript
var obj = {
  show: function() {
    console.log('this:', this); // this: newObj
  }
}

var newObj = new obj.show();
```

``` javascript
var obj = {
  show: function() {
    console.log('this:', this) // this: newObj
  }
}

var newObj = new (obj.show.bind(obj))();
```

``` javascript
var obj = {
  show: function() {
    console.log('this:', this);
  }
};

var elem = document.getElementById('book-search-results');
elem.addEventListener('click', obj.show); // this: window
elem.addEventListener('click', obj.show.bind(obj)); // this: obj
elem.addEventListener('click', function(){
  obj.show(); // this: obj
});
```

## 作用域

``` javascript
var person = 1;
function showPerson() {
  var person = 2;
  console.log(person);
}
showPerson(); // 2
```

``` javascript
var person = 1;
function showPerson() {
  console.log(person);
  var person = 2;
}
showPerson(); // undefined
```

``` javascript
var person = 1;
function showPerson() {
  console.log(person);
  var person = 2;
  function person() {}
}
showPerson(); // function person(){}
```

``` javascript
var person = 1;
function showPerson() {
  console.log(person);
  function person() {}
  var person = 2;
}
showPerson(); // function person(){}
```

``` javascript
for(var i = 0; i < 10; i++) {
  console.log(i);
}
// 0 1 2 3 4 5 6 7 8 9

for(var i = 0; i < 10; i++) {
  setTimeout(function(){
    console.log(i);
  }, 0);
}
// 10 10 10 10 10 10 10 10 10 10

for(var i = 0; i < 10; i++) {
  (function(i){
    setTimeout(function(){
      console.log(i);
    }, 0)
  })(i);
}
// 0 1 2 3 4 5 6 7 8 9


for(let i = 0; i < 10; i++) {
  console.log(i);
}
// 0 1 2 3 4 5 6 7 8 9
```
