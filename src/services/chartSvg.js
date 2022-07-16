const chartSvgStyles = require('../lib/chartSvgStyles');
const { generateChart } = require('./generateChart');

const chartSvg = async (data, options) => {

    // TODO validate and add defaults to options

    const chart = await generateChart('line', options, data);

    return `
    <svg
        width="${options.width}"
        height="${options.height}"
        viewBox="0 0 ${options.width} ${options.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
            <rect xmlns="http://www.w3.org/2000/svg" id="cardBg"
            x="0" y="0" rx="2.5" height="100%" stroke="#E4E2E2" fill-opacity="1"
            width="100%" fill="#282a36" stroke-opacity="1" style="stroke:#ccc; stroke-width:1;"/>
        <style>
            ${chartSvgStyles()}
        </style>
        <g transform="translate(-8, 0)">
            ${chart}
        </g>
    </svg>
`;
};

module.exports = { chartSvg };