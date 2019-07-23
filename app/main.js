console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('data/caracteristiques-2017.csv')
        console.log('data', data);
        const data2 = data.map(d => d['dep']).reduce((acc, n) => {
            acc[n] = (acc[n] === undefined) ? 1 : acc[n] + 1;
            return acc;
        }, {})
        console.log('data2', data2);

        /*Code pour paramétrer la taille des barres, i sera chaque ligne du fichier*/
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, i) => {
            bar.style.width = `${100* data[i]['nbr_accident']/1000}%`;
        });

    } catch (error) {
        console.log('error', error);
    }
    console.log('etape 3')
})();