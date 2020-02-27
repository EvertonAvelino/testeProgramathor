// scraper.js

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const statsTable = $('.statsTableContainer > tr');
        const topPremierLeagueScorers = [];

        statsTable.each(function () {
            const rank = $(this).find('.rank > strong').text();
            const playerName = $(this).find('.playerName > strong').text();
            const nationality = $(this).find('.playerCountry').text();
            const goals = $(this).find('.mainStat').text();



            topPremierLeagueScorers.push({
                rank,
                name: playerName,
                nationality,
                goals,
            });

        })
        let England = topPremierLeagueScorers.filter((nacional) => {
            return nacional.nationality === 'England';
        });
        console.log(England);

        function filtrar(nationality) {
            var cont = 0;

            for (var i = 0; i < topPremierLeagueScorers.length; i++) {

                for (var j = 0; j < topPremierLeagueScorers.length; j++) {

                    if (topPremierLeagueScorers[i].nationality == topPremierLeagueScorers[j].nationality) {

                        cont = cont + 1;
                    }

                }
                console.log(topPremierLeagueScorers[i].nationality, ':', cont);
            }
        }
        console.log('nacionalidades:\n ')
        filtrar(topPremierLeagueScorers);


    })
    .catch(console.error);