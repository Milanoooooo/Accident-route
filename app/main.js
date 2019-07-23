console.log('hello', d3);

(async() => {
    d3.csv('Data.csv')
        .then(function(data) {
            console.log('data', data)
        })
        .catch(function(error) {
            console.log('error', error)
        });

    console.log('etape 3')
})();