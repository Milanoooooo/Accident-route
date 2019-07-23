console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('Data.csv')
        console.log('data', data);
    } catch (error) {
        console.log('error', error);
    }
    console.log('etape 3')
})();