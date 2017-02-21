function asyncFlow(generatorFunction) {
    function callback (err, ...results) {
        if (err) {
            generator.throw(err);
        }

        let thunk = generator.next(results.length > 1 ? results : results[0]).value;
        thunk && thunk(callback);
    }

    let generator = generatorFunction();
    let thunk = generator.next().value;
    thunk && thunk(callback);
}

module.exports = asyncFlow;