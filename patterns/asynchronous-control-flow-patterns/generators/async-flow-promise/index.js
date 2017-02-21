function asyncFlow(generatorFunction) {
    function callback (...results) {
        let promise = generator.next(results.length > 1 ? results : results[0]).value;
        promise && promise.then(callback).catch((err) => {
            generator.throw(err)
        });
    }

    let generator = generatorFunction();
    let promise = generator.next().value;
    promise && promise.then(callback);
}

module.exports = asyncFlow;