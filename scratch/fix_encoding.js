
const fs = require("fs");

const cx = 200, cy = 260;
const startAngle = -46;
const endAngle = 46;

function getRot(val, min, max) {
    return startAngle + ((val - min) / (max - min)) * (endAngle - startAngle);
}

let svg = `<svg class="w-full h-full absolute top-0 left-0" viewBox="0 0 400 270" style="background: white;">\n`;
svg += `<g transform="translate(${cx}, ${cy})">\n`;

const ohmMap = [
    {v: "0", a: 46}, {v: "1", a: 41}, {v: "2", a: 36}, {v: "5", a: 22}, {v: "10", a: 6},
    {v: "20", a: -8}, {v: "30", a: -16}, {v: "50", a: -26}, {v: "100", a: -34},
    {v: "200", a: -40}, {v: "500", a: -44}, {v: "1k", a: -46}, {v: "2k", a: -47.5}
];

svg += `<path d="M ${-220 * Math.sin(48*Math.PI/180)} ${-220 * Math.cos(48*Math.PI/180)} A 220 220 0 0 1 ${-220 * Math.sin(-48*Math.PI/180)} ${-220 * Math.cos(-48*Math.PI/180)}" fill="none" stroke="black" stroke-width="1.5"/>\n`;

for(let o of ohmMap) {
    svg += `<g transform="rotate(${o.a})">
        <line x1="0" y1="-220" x2="0" y2="-226" stroke="black" stroke-width="2"/>
        <text x="0" y="-230" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle" transform="rotate(${-o.a}, 0, -230)">${o.v}</text>
    </g>\n`;
}

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

const rMirr1 = 135;
const rMirr2 = 145;
svg += `<path d="M ${-rMirr1 * Math.sin(46*Math.PI/180)} ${-rMirr1 * Math.cos(46*Math.PI/180)} A ${rMirr1} ${rMirr1} 0 0 1 ${-rMirr1 * Math.sin(-46*Math.PI/180)} ${-rMirr1 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#ccc" stroke-width="10"/>\n`;
svg += `<path d="M ${-rMirr1 * Math.sin(46*Math.PI/180)} ${-rMirr1 * Math.cos(46*Math.PI/180)} A ${rMirr1} ${rMirr1} 0 0 1 ${-rMirr1 * Math.sin(-46*Math.PI/180)} ${-rMirr1 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#999" stroke-width="1"/>\n`;
svg += `<path d="M ${-rMirr2 * Math.sin(46*Math.PI/180)} ${-rMirr2 * Math.cos(46*Math.PI/180)} A ${rMirr2} ${rMirr2} 0 0 1 ${-rMirr2 * Math.sin(-46*Math.PI/180)} ${-rMirr2 * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#999" stroke-width="1"/>\n`;

const rAC = 125;
svg += `<path d="M ${-rAC * Math.sin(46*Math.PI/180)} ${-rAC * Math.cos(46*Math.PI/180)} A ${rAC} ${rAC} 0 0 1 ${-rAC * Math.sin(-46*Math.PI/180)} ${-rAC * Math.cos(-46*Math.PI/180)}" fill="none" stroke="red" stroke-width="1.5"/>\n`;
for(let i=0; i<=10; i++) {
    let a = getRot(i*5, 0, 50); 
    svg += `<g transform="rotate(${a})">
        <text x="0" y="${-rAC + 10}" font-size="8" font-family="sans-serif" fill="red" text-anchor="middle" transform="rotate(${-a}, 0, ${-rAC + 10})">${i}</text>
    </g>\n`;
}

const rHFE = 100;
svg += `<path d="M ${-rHFE * Math.sin(46*Math.PI/180)} ${-rHFE * Math.cos(46*Math.PI/180)} A ${rHFE} ${rHFE} 0 0 1 ${-rHFE * Math.sin(-46*Math.PI/180)} ${-rHFE * Math.cos(-46*Math.PI/180)}" fill="none" stroke="#00aa00" stroke-width="1.5"/>\n`;

const rBatt = 70;
svg += `<path d="M ${-rBatt * Math.sin(46*Math.PI/180)} ${-rBatt * Math.cos(46*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-46*Math.PI/180)} ${-rBatt * Math.cos(-46*Math.PI/180)}" fill="none" stroke="red" stroke-width="1"/>\n`;
svg += `<path d="M ${-rBatt * Math.sin(10*Math.PI/180)} ${-rBatt * Math.cos(10*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-2*Math.PI/180)} ${-rBatt * Math.cos(-2*Math.PI/180)}" fill="none" stroke="red" stroke-width="4"/>\n`;
svg += `<path d="M ${-rBatt * Math.sin(-2*Math.PI/180)} ${-rBatt * Math.cos(-2*Math.PI/180)} A ${rBatt} ${rBatt} 0 0 1 ${-rBatt * Math.sin(-15*Math.PI/180)} ${-rBatt * Math.cos(-15*Math.PI/180)}" fill="none" stroke="green" stroke-width="4"/>\n`;

svg += `<text x="-165" y="-120" font-size="10" font-weight="bold" fill="black">DCV.A</text>\n`;
svg += `<text x="135" y="-120" font-size="10" font-weight="bold" fill="black">DCV.A</text>\n`;
svg += `<text x="-140" y="-100" font-size="10" font-weight="bold" fill="red">ACV</text>\n`;
svg += `<text x="120" y="-100" font-size="10" font-weight="bold" fill="red">ACV</text>\n`;
svg += `<text x="-120" y="-80" font-size="10" font-weight="bold" fill="#00aa00">hFE</text>\n`;
svg += `<text x="-100" y="-55" font-size="10" font-weight="bold" fill="red">dB</text>\n`;
svg += `<text x="90" y="-55" font-size="10" font-weight="bold" fill="red">dB</text>\n`;
svg += `<text x="-120" y="-40" font-size="10" font-weight="bold" fill="black">BATT</text>\n`;

svg += `<g id="meter-needle" transform="rotate(-46)" style="transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);">
    <line x1="0" y1="0" x2="0" y2="-230" stroke="red" stroke-width="1.5" />
    <circle cx="0" cy="0" r="10" fill="white" stroke="#ccc" stroke-width="2" />
    <circle cx="0" cy="0" r="4" fill="#555" />
</g>\n`;

svg += `</g>\n`;
svg += `</svg>`;

let html = fs.readFileSync("index.html", "utf-8");
// The corrupted SVG starts with < s v g and ends with </svg> which might also be corrupted, or just plain text.
// Actually, let us just replace the whole vom-modal block since it is localized.
// I will extract everything between <!-- VOM Modal --> and the next <!-- Oscilloscope Modal --> or script.
let startIndex = html.indexOf("<!-- VOM Modal -->");
let endIndex = html.indexOf("<script>", startIndex);
if (startIndex !== -1 && endIndex !== -1) {
    let cleanModal = `<!-- VOM Modal -->
<div id="vom-modal" class="hidden absolute top-10 left-10 w-[400px] h-[550px] bg-[#f0f0f0] border-2 border-gray-400 rounded-lg shadow-2xl flex flex-col z-50 font-sans select-none" style="resize: both; overflow: auto; min-width: 300px; min-height: 400px;">
    <!-- Header/Drag Handle -->
    <div id="vom-header" class="w-full bg-[#ccc] h-8 cursor-move flex items-center justify-between px-2 rounded-t-lg border-b border-gray-400">
        <span class="font-bold text-gray-700 text-sm">Multimeter (VOM)</span>
        <button id="vom-close" class="text-red-500 font-bold hover:text-red-700">&times;</button>
    </div>

    <!-- Body -->
    <div class="flex-1 flex flex-col p-3 bg-[#e8e9e4]">
        <!-- Top Half: Analog Scale -->
        <div class="w-full bg-white border-2 border-[#8b8d86] rounded relative overflow-hidden" style="height: 220px;">
            ${svg}
            
            <div class="absolute bottom-2 left-2">
                <div class="font-bold text-[14px] text-red-500 tracking-wider">DEGMM</div>
            </div>
            <div class="absolute bottom-2 right-2 flex flex-col items-end">
                <div class="text-[12px] text-green-700 font-bold opacity-75">DE-960TR</div>
            </div>
        </div>

        <!-- Bottom Half: Controls -->
        <div class="w-full bg-[#3c3d39] rounded p-2 text-white flex mt-1 relative border-t-2 border-[#8b8d86] flex-1">
            
            <!-- Left: Jacks -->
            <div class="flex flex-col justify-between items-center w-12 h-full py-1">
                <div class="flex flex-col items-center">
                    <div id="vom-jack-output" class="w-6 h-6 rounded-full border-4 border-[#222] bg-[#111] flex items-center justify-center relative shadow-inner cursor-pointer" onclick="handleJackClick(event, 'vom-out')">
                        <div class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="text-red-500 font-bold text-[7px] mt-1">OUTPUT</div>
                </div>
                <div class="flex flex-col items-center">
                    <div id="vom-jack-25a" class="w-6 h-6 rounded-full border-4 border-[#222] bg-[#111] flex items-center justify-center relative shadow-inner cursor-pointer" onclick="handleJackClick(event, 'vom-25a')">
                        <div class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="text-red-500 font-bold text-[9px] mt-1">2.5A</div>
                </div>
            </div>

            <!-- Center: Knob -->
            <div class="flex-1 flex items-center justify-center relative">
                <!-- Knob scale values -->
                <div class="absolute w-full h-full pointer-events-none">
                    <!-- Resistance (Top Right) -->
                    <div class="absolute top-2 right-6 text-[#00ff00] font-bold text-[10px]">&Omega;</div>
                    <div class="absolute top-6 right-2 text-[#00ff00] text-[9px]">x1k</div>
                    <div class="absolute top-10 right-0 text-[#00ff00] text-[9px]">x100</div>
                    <div class="absolute top-14 right-1 text-[#00ff00] text-[9px]">x10</div>
                    <div class="absolute top-18 right-2 text-[#00ff00] text-[9px]">x1</div>
                    
                    <!-- DCV (Right Bottom) -->
                    <div class="absolute top-24 right-2 text-white font-bold text-[10px]">DC.V</div>
                    <div class="absolute top-28 right-4 text-white text-[9px]">1000</div>
                    <div class="absolute bottom-10 right-6 text-white text-[9px]">250</div>
                    <div class="absolute bottom-6 right-12 text-white text-[9px]">50</div>
                    <div class="absolute bottom-2 right-18 text-white text-[9px]">10</div>
                    <div class="absolute bottom-1 right-24 text-white text-[9px]">2.5</div>
                    <div class="absolute bottom-2 left-20 text-white text-[9px]">0.1</div>
                    <div class="absolute bottom-4 left-14 text-white text-[9px]">0.5</div>
                    
                    <!-- ACV (Left Bottom) -->
                    <div class="absolute top-24 left-2 text-red-500 font-bold text-[10px]">AC.V</div>
                    <div class="absolute top-28 left-4 text-red-500 text-[9px]">1000</div>
                    <div class="absolute bottom-10 left-6 text-red-500 text-[9px]">250</div>
                    <div class="absolute bottom-6 left-12 text-red-500 text-[9px]">50</div>
                    <div class="absolute bottom-2 left-18 text-red-500 text-[9px]">10</div>
                </div>

                <!-- Knob Element -->
                <div id="vom-knob" class="w-32 h-32 rounded-full bg-[#2a2b27] border-4 border-[#1a1b17] shadow-xl relative cursor-pointer z-10 flex items-center justify-center">
                    <div class="w-full h-2 bg-white absolute top-1/2 left-0 transform -translate-y-1/2 pointer-events-none"></div>
                    <div class="w-24 h-24 rounded-full bg-[#333]"></div>
                </div>
            </div>

            <!-- Right: Jacks & Zero Ohm Adjust -->
            <div class="flex flex-col justify-between items-center w-12 h-full py-1">
                <div class="flex flex-col items-center">
                    <div id="vom-jack-com" class="w-6 h-6 rounded-full border-4 border-[#222] bg-[#111] flex items-center justify-center relative shadow-inner cursor-pointer" onclick="handleJackClick(event, 'vom-com')">
                        <div class="w-3 h-3 rounded-full bg-[#ccc]"></div>
                    </div>
                    <div class="text-white font-bold text-[9px] mt-1">-COM</div>
                </div>
                <div class="flex flex-col items-center">
                    <div id="vom-jack-p" class="w-6 h-6 rounded-full border-4 border-[#222] bg-[#111] flex items-center justify-center relative shadow-inner cursor-pointer" onclick="handleJackClick(event, 'vom-p')">
                        <div class="w-3 h-3 rounded-full bg-[#ccc]"></div>
                    </div>
                    <div class="text-white font-bold text-[9px] mt-1">+</div>
                </div>
            </div>
            
        </div>
    </div>
</div>

    `;
    html = html.substring(0, startIndex) + cleanModal + html.substring(endIndex);
    fs.writeFileSync("index.html", html, "utf-8");
    console.log("Fixed encoding issue!");
} else {
    console.log("Could not find bounds");
}

