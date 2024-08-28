const fs = require('fs');
const { selectAll } = require('./mysqlQueries');

function generateHTMLTable(rows) {
    return new Promise((resolve, reject) => {
        if (!rows) resolve(false);

        const tHeads = ['rating_id', 'rating_created_at', 'user_query', 'bot_response', 'rating'];

        let HTML = '';

        const begTableHTML = '<table><caption>Chatbot Response Ratings</caption>';
        const tHeadsHTML = `<thead><tr>${tHeads.map(v => `<th>${v}</th>`).join('')}</tr></thead>`;
        const tRowsHTML = `<tbody>${rows.map(row => `<tr>${tHeads.map(k => `<td>${row[k] ? row[k] : ''}</td>`).join('')}</tr>`).join('')}</tbody>`;
        const tFooterHTML = `<tfoot><tr><td colspan="${tHeads.length}">2023 IRS Publication 17 Chatbot Response Ratings</td></tr></tfoot>`;
        const endTableHTML = '</table>';

        const endHTML = '</body></html>';

        fs.readFile('mailerEmailHTML/begHTML.html', 'utf8', (error, begHTML) => {
            if (error) reject(error);
            else resolve(`${begHTML}${begTableHTML}${tHeadsHTML}${tRowsHTML}${tFooterHTML}${endTableHTML}${endHTML}`);
        });
    });

}

selectAll().then(rows => generateHTMLTable(rows)).then(r => console.log(r));