const fs = require('fs');

const renderItem = {
	question: (item) => `<section class="question" data-no="1">${item}</section>`,
	passage: (item) => `<section class="passage">${item}</section>`,
	passageOptions: (item) => `<section class="passageOptions">${item}</section>`,
	options: (item) => `
        <section class="options">
        <ol>
            ${item.map((option, index) => `<li>${option}</li>`).join('')}
        </ol>
        </section>`,
};

function createHTML(title, articles) {
	const DOMString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link rel="stylesheet" href="../common.css" />
		    <script type="module" src="../app.js"></script>
        </head>
        <body>
        <main id="questionBank">
            <header>
                <h1>객관식 페이지</h1>
            </header>
        ${articles
			.map(
				(article) => `
            <article>
                ${Object.entries(article)
					.map(([renderKey, item]) => (renderItem[renderKey] ?? (() => {}))(item))
					.filter((item) => item)
					.join('')}
            </article>
                `
			)
			.join('')}
            <section class="buttons">
                <button class="prev">이전</button>
                <button class="next">다음</button>
            </section>
		</main>
        </body>
        </html>
    `;

	const filePath = `html/${title}.html`;
	fs.writeFileSync(filePath, DOMString, 'utf8');
	console.log(`HTML file has been saved as ${filePath}`);
}

module.exports = { createHTML };
