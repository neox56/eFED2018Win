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
(function (transfer) {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "Octember", "November", "December"];
    var name_day = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    transfer.name = function (day) {
        return months[day];
    };
    transfer.day = function (name) {
        return name_day[name];
    };
})(this.month = {});

console.log(month.name(0));
console.log(month.day(2));



//12.Разница в годах


