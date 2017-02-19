function* twoWayGenerator () {
    let what = yield null;
    console.log(`Hello ${what}`);
}

let generator = twoWayGenerator();
generator.next();
generator.next('world');