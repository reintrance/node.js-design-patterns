function asyncFlow(generatorFunction) {
    let generator = generatorFunction((err, ...results) => {
        if (err) {
            generator.throw(err);
        }

        generator.next(results.length > 1 ? results : results[0]);
    });

    generator.next();
}

module.exports = asyncFlow;