console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('data/caracteristiques-2017.csv')
        console.log('data', data);

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