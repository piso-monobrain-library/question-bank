const { datas } = require('./data');
const { createHTML } = require('./html');

for (const { articleName, articles } of datas) {
	createHTML(articleName, articles);
}
