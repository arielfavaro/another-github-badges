const chartist = require('node-chartist/lib/chartist');
const chartistGenerateChart = require('node-chartist/lib/chart');
const chartistGenerateLegend = require('node-chartist/lib/legend');
const is = require('is_js');
const Ru = require('@panosoft/ramda-utils');

const generateChart = async (type, options, data) => {
    const environment = await chartist.initialize();
    const window = environment.window;
    const Chartist = environment.Chartist;
    // process options
    options = is.function(options) ? options(Chartist) : options;
    if (is.not.json(options)) throw new TypeError('options must be an object or a function that returns an object.');
    options = Ru.defaults({ legend: false }, options);
    // create chart
    const chart = await chartistGenerateChart(Chartist, window, type, options, data);
    const legend = options.legend ? chartistGenerateLegend(data) : '';
    return `${chart}${legend}`;
};

module.exports = { generateChart };