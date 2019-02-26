//2.Промисификация: 
function compare(value1, value2) {
    return new Promise(function (resolve, reject) {
        let diff;
        if (typeof (value1) !== 'number' || typeof (value2) === 'number') {
            if (value1 < value2) diff = -1;
            else if (value1 > value2) diff = 1;
            else diff = 0;
        }
        setTimeout(function () {
            if (typeof diff === 'undefined') {
                reject('Недопустимое значение');
            } else {
                resolve(diff);
            }
        }, 1000);
    });
}

compare(3, 2).then(console.log, console.log);
compare(4, 4).then(console.log, console.log);
compare(2, 5).then(console.log, console.log);
compare(8, '8').then(console.log, console.log);

//3.Цепочка промисов для задания 'a':
function random(sumWith) {
    return new Promise(function (resolve) {
        var timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve(Math.random() * 3 + sumWith);
        }, timeout)
    })
}
random(3)
    .then(function (res) {
        console.log(res);
        return random(res);
    })
    .then(function (res) {
        console.log(res);
        return random(res);
    })
    .then(function (res) {
        console.log(res);
    })


//Цепочка промисов для задания 'b':
function random() {
    return new Promise(function (resolve) {
        var timeout = Math.random() * 3000;
        setTimeout(function () {
            resolve(Math.random() * 3);
        }, timeout)
    })
}

Promise.all([random(), random(), random(), random(), random(), random(), random()])
    .then(function (array) {
        console.log(array);
    });

//4.Замыкания:
let counter = {
    next: function () {
        let currentCount = 1;
        return function () {
            return currentCount++;
        };
    },
    prev: function () {
        let currentCount = 5;
        return function () {
            return currentCount--;
        };
    },
}
let next = counter.next();
let prev = counter.prev();
console.log(next());
console.log(next());
console.log(next());
console.log(next());
console.log(next());
console.log(prev());
console.log(prev());
console.log(prev());
console.log(prev());
console.log(prev());

//5.Контекст вызова и карринг:
function sumWith(number) {
    return this.currentValue += number;
}

var number = 2;
alert(sumWith.bind({
    currentValue: 3
})(number));

//6.setInterval:.
let count = 0;
let currentCount = setInterval(function () {
    count++;
    console.log('Начало');
    if (count >= 5) {
        clearInterval(currentCount);
        console.log("Конец");
    }
}, 2000);