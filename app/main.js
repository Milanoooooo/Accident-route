console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('data/caracteristiques-2017.csv')
        console.log('data', data);

        /* Calcul nombre occurence par département,acc va stocker le nbr d'occurence, reduce va faire l'équivalent d'un group by en sql*/

        const data2 = data.map(d => d['dep'].replace(/^(.*)0$/, '$1'))
            .reduce((acc, dep) => {
                acc[dep] = (acc[dep] === undefined) ? 1 : acc[dep] + 1;
                return acc;
            }, {});
        console.log('data2', data2);

        /*Affectation à des noms de colonnes à data3, tri par numéro de département*/
        const data3 = Object.keys(data2)
            .map(key => ({ dept: key, 'nbr-accident': data2[key] }))
            .sort((a, b) => {
                return a.dept > b.dept ? 1 : -1;
            });
        console.log('data3', data3);

        /*La valeur des bars va dépendre du jeu de donnes data3 */
        const bars = d3.select('.histo').selectAll('.dept').data(data3);

        /*Pour chaque ligne de valeur détectée on crée une barre*/
        bars.enter()
            .append('div')
            .classed('dept', true)
            .html(d => `<span class="dept-num">${d.dept}</span><div class="bar" style="width: ${(100 * d['nbr-accident'] / 6000)}%;"></div>`);


    } catch (error) {
        console.log('error', error);
    }
    console.log('coucou');
})();