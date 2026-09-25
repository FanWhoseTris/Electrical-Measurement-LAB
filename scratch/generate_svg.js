
const cx = 200, cy = 260;
const startAngle = -46;
const endAngle = 46;

function getRot(val, min, max) {
    return startAngle + ((val - min) / (max - min)) * (endAngle - startAngle);
}

let svg = `<svg class="w-full h-full absolute top-0 left-0" viewBox="0 0 400 220" style="background: white;">\n`;
svg += `<g transform="translate(${cx}, ${cy})">\n`;

// 1. OHM Arc (Black) - non-linear
// Approx angles for Ohm:
// 0: 46 (right)
// 1: 43
// 2: 39
// 5: 28
// 10: 15
// 20: -1
// 30: -10
// 50: -20
// 100: -30
// 200: -36
// 500: -41
// 1k: -43.5
// 2k: -45
// infinity: -48
const ohmMap = [
    {v: "0", a: 46}, {v: "1", a: 41}, {v: "2", a: 36}, {v: "5", a: 22}, {v: "10", a: 6},
    {v: "20", a: -8}, {v: "30", a: -16}, {v: "50", a: -26}, {v: "100", a: -34},
    {v: "200", a: -40}, {v: "500", a: -44}, {v: "1k", a: -46}, {v: "2k", a: -47.5}
];

// Draw Ohm Arc
svg += `<path d="M ${-220 * Math.sin(48*Math.PI/180)} ${-220 * Math.cos(48*Math.PI/180)} A 220 220 0 0 1 ${-220 * Math.sin(-48*Math.PI/180)} ${-220 * Math.cos(-48*Math.PI/180)}" fill="none" stroke="black" stroke-width="1.5"/>\n`;

for(let o of ohmMap) {
    svg += `<g transform="rotate(${o.a})">
        <line x1="0" y1="-220" x2="0" y2="-226" stroke="black" stroke-width="2"/>
        <text x="0" y="-230" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle" transform="rotate(${-o.a}, 0, -230)">${o.v}</text>
    </g>\n`;
}

// 2. DCV Arc (Black)
const rDC = 180;
svg += `<path d="M ${-rDC * Math.sin(46*Math.PI/180)} ${-rDC * Math.cos(46*Math.PI/180)} A ${rDC} ${rDC} 0 0 1 ${-rDC * Math.sin(-46*Math.PI/180)} ${-rDC * Math.cos(-46*Math.PI/180)}" fill="none" stroke="black" stroke-width="1.5"/>\n`;

for(let i=0; i<=50; i++) {
    let a = getRot(i, 0, 50);
    let isMajor = i % 10 === 0;
    let isHalf = i % 5 === 0 && !isMajor;
    let len = isMajor ? 6 : (isHalf ? 4 : 2);
    let sw = isMajor ? 1.5 : 1;
    svg += `<line x1="0" y1="${-rDC}" x2="0" y2="${-rDC + len}" stroke="black" stroke-width="${sw}" transform="rotate(${a})"/>\n`;
    
    if (isMajor) {
        let val250 = i * 5;
        let val50 = i;
        let val10 = i / 5;
        svg += `<g transform="rotate(${a})">
            <text x="0" y="${-rDC + 15}" font-size="9" font-family="sans-serif" text-anchor="middle" transform="rotate(${-a}, 0, ${-rDC + 15})">${val10}</text>
            <text x="0" y="${-rDC + 25}" font-size="9" font-family="sans-serif" text-anchor="middle" transform="rotate(${-a}, 0, ${-rDC + 25})">${val50}</text>
            <text x="0" y="${-rDC + 35}" font-size="9" font-family="sans-serif" text-anchor="middle" transform="rotate(${-a}, 0, ${-rDC + 35})">${val250}</text>
        </g>\n`;
    }
}

// 3. Mirror
const rMirr1 = 135;
const rMirr2 = 145;
svg += `<path d="M ${-rMirr1 * Math.sin(46*Math.PI/180)} ${-rMirr1 * Math.cos(46*Math.PI/180)} A ${rMirr1} ${rMirr1} 0 0 1 ${-rMirr1 * Math.sin(-46*Math.PI/180)} ${-rMirr1 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#ccc" stroke-width="10"/>\n`;
svg += `<path d="M ${-rMirr1 * Math.sin(46*Math.PI/180)} ${-rMirr1 * Math.cos(46*Math.PI/180)} A ${rMirr1} ${rMirr1} 0 0 1 ${-rMirr1 * Math.sin(-46*Math.PI/180)} ${-rMirr1 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#999" stroke-width="1"/>\n`;
svg += `<path d="M ${-rMirr2 * Math.sin(46*Math.PI/180)} ${-rMirr2 * Math.cos(46*Math.PI/180)} A ${rMirr2} ${rMirr2} 0 0 1 ${-rMirr2 * Math.sin(-46*Math.PI/180)} ${-rMirr2 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#999" stroke-width="1"/>\n`;

// 4. AC 10V (Red)
const rAC = 125;
svg += `<path d="M ${-rAC * Math.sin(46*Math.PI/180)} ${-rAC * Math.cos(46*Math.PI/180)} A ${rAC} ${rAC} 0 0 1 ${-rAC * Math.sin(-46*Math.PI/180)} ${-rAC * Math.cos(-46*Math.PI/180)}" fill="none" stroke="red" stroke-width="1.5"/>\n`;

// 5. hFE (Green)
const rHFE = 100;
svg += `<path d="M ${-rHFE * Math.sin(46*Math.PI/180)} ${-rHFE * Math.cos(46*Math.PI/180)} A ${rHFE} ${rHFE} 0 0 1 ${-rHFE * Math.sin(-46*Math.PI/180)} ${-rHFE * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#00aa00" stroke-width="1.5"/>\n`;

// 6. BATT/dB (Red)
const rBatt = 70;
svg += `<path d="M ${-rBatt * Math.sin(46*Math.PI/180)} ${-rBatt * Math.cos(46*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-46*Math.PI/180)} ${-rBatt * Math.cos(-46*Math.PI/180)}" fill="none" stroke="red" stroke-width="1"/>\n`;

// Add thick BATT arc
svg += `<path d="M ${-rBatt * Math.sin(10*Math.PI/180)} ${-rBatt * Math.cos(10*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-2*Math.PI/180)} ${-rBatt * Math.cos(-2*Math.PI/180)}" fill="none" stroke="red" stroke-width="4"/>\n`;
svg += `<path d="M ${-rBatt * Math.sin(-2*Math.PI/180)} ${-rBatt * Math.cos(-2*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-15*Math.PI/180)} ${-rBatt * Math.cos(-15*Math.PI/180)}" fill="none" stroke="green" stroke-width="4"/>\n`;

// Add text labels
svg += `<text x="-165" y="-120" font-size="10" font-weight="bold" fill="black">DCV.A</text>\n`;
svg += `<text x="135" y="-120" font-size="10" font-weight="bold" fill="black">DCV.A</text>\n`;
svg += `<text x="-140" y="-100" font-size="10" font-weight="bold" fill="red">ACV</text>\n`;
svg += `<text x="120" y="-100" font-size="10" font-weight="bold" fill="red">ACV</text>\n`;
svg += `<text x="-120" y="-80" font-size="10" font-weight="bold" fill="#00aa00">hFE</text>\n`;
svg += `<text x="-100" y="-55" font-size="10" font-weight="bold" fill="red">dB</text>\n`;
svg += `<text x="90" y="-55" font-size="10" font-weight="bold" fill="red">dB</text>\n`;
svg += `<text x="-120" y="-40" font-size="10" font-weight="bold" fill="black">BATT</text>\n`;


svg += `</g>\n`;
svg += `</svg>\n`;

console.log(svg);

