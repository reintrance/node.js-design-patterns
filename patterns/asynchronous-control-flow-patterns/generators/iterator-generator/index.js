function* iteratorGenerator (arr) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

let array = ['apple', 'pen', 'pineapple'];
let iterator = iteratorGenerator(array);

let currentItem = iterator.next();
while (!currentItem.done) {
    console.log(currentItem.value);
    currentItem = iterator.next();
}