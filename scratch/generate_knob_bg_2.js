
const fs = require("fs");

let svg = `<svg class="absolute w-[300px] h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="-150 -150 300 300">\n`;

// Helper for horizontal text placed radially
function horizontalText(text, r, angleDeg, color, size, weight="bold") {
    let a = (angleDeg - 90) * Math.PI / 180;
    let x = r * Math.cos(a);
    let y = r * Math.sin(a);
    return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" font-family="sans-serif, Arial" text-anchor="middle" dominant-baseline="central">${text}</text>\n`;
}

// Tick marks
function drawTick(angleDeg, color) {
    let a = (angleDeg - 90) * Math.PI / 180;
    let r1 = 70;
    let r2 = 76;
    let x1 = r1 * Math.cos(a);
    let y1 = r1 * Math.sin(a);
    let x2 = r2 * Math.cos(a);
    let y2 = r2 * Math.sin(a);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" />\n`;
}

// Arc
function drawArc(startAngle, endAngle, color) {
    let r = 76;
    let a1 = (startAngle - 90) * Math.PI / 180;
    let a2 = (endAngle - 90) * Math.PI / 180;
    let x1 = r * Math.cos(a1);
    let y1 = r * Math.sin(a1);
    let x2 = r * Math.cos(a2);
    let y2 = r * Math.sin(a2);
    let largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    return `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="2"/>\n`;
}

const positions = [
  { angle: 0, text: "OFF", color: "white", noTick: true },
  { angle: 15, text: "1000", color: "#ff4444" },
  { angle: 30, text: "250", color: "#ff4444" },
  { angle: 45, text: "50", color: "#ff4444" },
  { angle: 60, text: "10", color: "#ff4444" },
  { angle: 75, text: "", color: "white", noTick: true },
  { angle: 90, text: "x10K", color: "white" },
  { angle: 105, text: "x1K", color: "white" },
  { angle: 120, text: "x100", color: "white" },
  { angle: 135, text: "x10", color: "white" },
  { angle: 150, text: "x1", color: "white" },
  { angle: 165, text: "9V", color: "white" },
  { angle: 180, text: "1.5V", color: "white" },
  { angle: 195, text: "250", color: "white" },
  { angle: 210, text: "25", color: "white" },
  { angle: 225, text: "2.5 A", color: "white" },
  { angle: 240, text: "50µA", color: "white" },
  { angle: 255, text: "0.1", color: "white" },
  { angle: 270, text: "0.5", color: "white" },
  { angle: 285, text: "2.5", color: "white" },
  { angle: 300, text: "10", color: "white" },
  { angle: 315, text: "50", color: "white" },
  { angle: 330, text: "250", color: "white" },
  { angle: 345, text: "1000", color: "white" }
];

const arcs = [
  { start: 15, end: 60, color: "#ff4444" }, // ACV
  { start: 90, end: 150, color: "#00ff00" }, // Ohm
  { start: 165, end: 180, color: "white" }, // BATT
  { start: 195, end: 240, color: "white" }, // DCmA
  { start: 255, end: 345, color: "white" }  // DCV
];

const categories = [
  { text: "ACV", angle: 37.5, r: 120, color: "#ff4444", size: 14 },
  { text: "O", angle: 150, r: 110, color: "#00ff00", size: 18 },
  { text: "BATT", angle: 172.5, r: 115, color: "white", size: 12 },
  { text: "DCmA", angle: 217.5, r: 120, color: "white", size: 13 },
  { text: "DCV", angle: 300, r: 120, color: "white", size: 14 }
];

// Draw arcs
for (let arc of arcs) {
    svg += drawArc(arc.start, arc.end, arc.color);
}

// Draw ticks and labels
let rText = 92;
for (let p of positions) {
    if (!p.noTick) {
        svg += drawTick(p.angle, p.color === "white" ? "white" : p.color);
    }
    if (p.text) {
        // Adjust text radius slightly for longer texts so they dont overlap
        let tr = rText;
        if (p.text.length >= 4) tr = 96;
        svg += horizontalText(p.text, tr, p.angle, p.color, 11);
    }
}

// Draw category labels
for (let c of categories) {
    svg += horizontalText(c.text, c.r, c.angle, c.color, c.size, "bold");
}

svg += `</svg>`;

let html = fs.readFileSync("index.html", "utf-8");

const startTag = `<svg class="absolute w-[220px]`;
const endTag = `</svg>`;
let startIndex = html.indexOf(startTag);
if (startIndex !== -1) {
    let endIndex = html.indexOf(endTag, startIndex);
    if (endIndex !== -1) {
        html = html.substring(0, startIndex) + svg + html.substring(endIndex + endTag.length);
        fs.writeFileSync("index.html", html, "utf-8");
        console.log("Success");
    } else {
        console.log("End tag not found");
    }
} else {
    console.log("Start tag not found");
}

