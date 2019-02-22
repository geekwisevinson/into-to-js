{
    const body = document.body;
    console.log('js1 this', this);
    function myJsFunction () {
        console.log(this);
        var dog = 'chow';
    }
    myJsFunction();
}

const madeup = 'test';
console.log(window.madeup);
console.log(this.madeup);
console.log(madeup);

console.log(this);