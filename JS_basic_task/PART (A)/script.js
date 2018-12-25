//1.Подсчет Букв
function countChar(x, y) {
    x = x.toLowerCase();
    y = y.toLowerCase();
    var counter = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i] === y) {
            counter++;
        }
    }
    return counter;
}
console.log(countChar('My Random String', 'm'))

//2.Глубокое сравнение
function deepCompare(one_obj, two_obj) {
    for (i in one_obj) {
        if (two_obj.hasOwnProperty(i)) {
            if (one_obj[i] !== two_obj[i]) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: '2' }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2' }));
console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: 2 }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2', one: 1 }));

//3.Шахматная доска
function chessBoard(firstsize, secondsize) {
    var str = ' ' ;
    for (var i = 0; i < secondsize; i++) {
        for (var j = 0; j < firstsize; j++) {
            if (i % 2) {
              str=(j%2) ? str + '#': str + ' ';
               
            } else {
              str=(j%2) ? str + ' ':str = str + '#';         
            }
        }
        str = str + '\n';
    }
    return str;
}

console.log(chessBoard(8, 4));



//4.Диапазон
function makeArray(beginValue, endValue, step = 1) {
    var arr = [];

    if (endValue < beginValue) {
        step = -step;
        for (var i = beginValue; i >= endValue; i += step) {
            arr.push(i);
        }
    } else {
        for (var i = 0; beginValue + i <= endValue; i += step) {
            arr.push(beginValue + i);
        }
    }
    return arr;
}

console.log(makeArray(1, 10));
console.log(makeArray(1, 10, 3));
console.log(makeArray(10, 1, 2));

//5.Наоборот       
function reverseArray(arr) {
    var arr_out = [];
    for (var i = 0; i < arr.length; i++) {
        arr_out[arr.length - i - 1] = arr[i];
    }
    return arr_out;
}

function reverseArrayInPlace(arr) {
    for (var i = 0; i < parseInt(arr.length / 2); i++) {
        var temp = arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
}
var newArray = [1, 2, 3, 4]
console.log(reverseArray(newArray));

var array = ['A', 'B', 'C', 'D'];
reverseArrayInPlace(array);
console.log(array);



//6.Свертка
function mergeArrays(...args) {
    var array = [];
    array = array.concat(...args);
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (array[i] == array[j]) {
                array.splice(j, 1);
            }
        }
    }
    return array;
}
console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
console.log(mergeArrays([1, 2], [2, 4], [4, 6]));


