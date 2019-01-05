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
function MultiplicatorUnitFailure(notice) {
    this.notice = notice;
}
function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure('exclusion');
}
function reliableMultiply(a, b) {
    while (true) {
        try {
            return multiplyOrThrow(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure)
                console.log(e.notice);
            else
                throw e;
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
//console.log(month.name(0));
//console.log(month.day(2));



//12.Разница в годах
function differenceInYears(dateOne, dateTwo) {
    var differenceYear = Math.abs(dateOne - dateTwo) / (365 * 24 * 3600) / 1000;
    var differenceRound = Math.round(differenceYear * 10) * 0.1;
    return differenceRound;
}
console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));