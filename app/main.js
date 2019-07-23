/*Liste des fonctions dans d3*/
console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('data/caracteristiques-2017.csv');
        console.log('data', data);

        /* Calcul nombre occurence par département,acc va stocker le nbr d'occurence, reduce va faire l'équivalent d'un group by en sql*/
        /*je sélectionne que la propriété dep du tableau et pour chaque valeur de dep (valeur itération d) je fais un clean sur les numéros de deprtement
        , puis sur le tableau réultat créer des groupe de valeurs acc /dep*/
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

        /*Pour chaque ligne de valeur détectée on crée une barre, d à chaque fois un élément du tableau, on affiche le numéro de département + la taille de la barre
        chaque class est référencée dans CSS */
        bars.enter()
            .append('div')
            .classed('dept', true)
            .html(d => `
            <span class="dept-num">${d.dept}</span>
            <div class="bar" style="width: ${(100 * d['nbr-accident'] / 7000)}%;"></div>
            <span class="nbr-accident">${d['nbr-accident']}
            `);


    } catch (error) {
        console.error('error', error);
    }
    console.log('coucou');
})();