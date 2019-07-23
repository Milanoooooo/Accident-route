console.log('hello', d3);

(async() => {
    try {
        const data = await d3.csv('data/caracteristiques-2017.csv')
        console.log('data', data);

        /* Compte le nombre d'occurrence par département, champ dep dans fichier source 
        reduce correspond par un groupe by en SQL
        acc = valeur cumulative par département
        replace remplace les 0 du fichier initial*/
        const data2 = data.map(d => d['dep'].replace(/^(.*)0$/, '$1'))
            .reduce((acc, dep) => {
                acc[dep] = (acc[dep] === undefined) ? 1 : acc[dep] + 1;
                return acc;
            }, {})
        console.log('data2', data2);

        /* on recrée un fichier au format CSV + tri par rapport au nombre du département*/
        const data3 = Object.keys(data2)
            .map(key => ({ departement: key, 'nbr_accident': data2[key] }))
            .sort((a, b) => {
                return a.departement > b.departement ? 1 : -1;
            });
        console.log('data3', data3);

        /* Code pour rechercher la classe histo et le nombre de bar déclarée (0) et on les associe au jeu de donnée data3 */
        const bars = d3.select('.histo').selectAll('.bar').data(data3);

        /*Création de chaque barre*/
        bars.enter()
            .append('div')
            .classed('bar', true)
            .style('width', d => (100 * d['nbr_accident'] / 6000) + '%');

    } catch (error) {
        console.log('error', error);
    }
    console.log('etape 3')
})();