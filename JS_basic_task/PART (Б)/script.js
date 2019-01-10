//7.Every и some
function every(arr, meaning) {
    for (var i = 0; i < arr.length; ++i) {
        if (!meaning(arr[i]))
            return false;
    }
    return true;
}
function some(arr, meaning) {
    for (var i = 0; i < arr.length; ++i) {
        if (meaning(arr[i]))
            return true;
    }
    return false;
}
console.log(every([1, 4, NaN, 6], Number.isNaN));
console.log(every([NaN, NaN], Number.isNaN));
console.log(some([1, 2, 6], Number.isNaN));
console.log(some([1, 4, NaN, 6], Number.isNaN));

//8. Повтор
function reliableMultiply(a, b) {
    try {
        return multiplyOrThrow(a, b)
    } catch (e) {
        if (e == 'MultiplicatorUnitFailure') {
            return reliableMultiply(a, b);
        }
    }
}
console.log(reliableMultiply(5, 5));

//9.Кавычки в тексте
function replaceQuotes(text) {
    return text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2');
}
console.log(replaceQuotes("I`m the 'hero'"));

//10.Найти числа
function findNumbers(arr) {
    var regEx = /^[+-]?((\d+\.?\d*)|(\.?\d+))(e[+-]?(\d+))?$/i;
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        regEx.test(arr[i]) ? newArr.push(arr[i]) : false;
    }
    return newArr;
}
console.log(findNumbers(["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]));
console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]));


//11.День и месяц
function getNames(transfer) {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "Octember", "November", "December"];
    newMonths = months[transfer.getMonth()];
    var name_day = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    newNameDay = name_day[transfer.getDay()];
    return newMonths + ' ' + newNameDay;
}
console.log(getNames(new Date(1, 0)));


//12.Разница в годах
function differenceInYears(dateOne, dateTwo) {
    var differenceYear = Math.abs(dateOne - dateTwo) / (365 * 24 * 3600) / 1000;
    var differenceRound = Math.round(differenceYear * 10) * 0.1;
    return differenceRound;
}
console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));