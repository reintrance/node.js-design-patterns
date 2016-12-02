// Synchronous continuation-passing style

function addSync (a, b, callback) {
    callback(a + b);
}

console.log('before');

addSync(1, 2, function (result) {
    console.log('Result: ' + result);
});

console.log('after');

// Asynchronous continuation-passing style

function addAsync (a, b, callback) {
    setTimeout(function () {
        callback(a + b);
    }, 1);
}

console.log('before');

addAsync(1, 2, function (result) {
    console.log('Result: ' + result);
});

console.log('after');