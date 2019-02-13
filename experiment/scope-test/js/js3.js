(function(){
    var body = document.body;
    console.log('js1 this', this);
    function myJsFunction () {
        console.log(this);
        var dog = 'chow';
    }
    myJsFunction();
})();

console.log(body);
