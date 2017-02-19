function* fruitGenerator () {
    yield 'apple';
    yield 'pen';
    return 'pineapple';
}

const generator =  fruitGenerator();
let fruit;
while (fruit = generator.next()) {
    console.log(fruit);

    if (fruit.done) {
        break;
    }
}