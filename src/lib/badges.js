const visits = (visits) => `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="70" height="20" role="img" aria-label="Visits: ${visits}">
    <title>Visits: ${visits}</title>
    <linearGradient id="s" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <clipPath id="r">
        <rect width="70" height="20" rx="3" fill="#fff"/>
    </clipPath>
    <g clip-path="url(#r)">
        <rect width="39" height="20" fill="#555"/>
        <rect x="39" width="31" height="20" fill="#4c1"/>
        <rect width="70" height="20" fill="url(#s)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text aria-hidden="true" x="205" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)">Visits</text>
        <text x="205" y="140" transform="scale(.1)" fill="#fff">Visits</text>
        <text aria-hidden="true" x="535" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)">${visits}</text>
        <text x="535" y="140" transform="scale(.1)" fill="#fff">${visits}</text>
    </g>
</svg>`;

module.exports = { visits };