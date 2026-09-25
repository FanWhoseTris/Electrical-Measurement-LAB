
const fs = require("fs");

let svg = `<svg class="absolute w-[220px] h-[220px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="-110 -110 220 220">\n`;

// Helper for polar text
function polarText(text, r, angleDeg, color, size, weight="normal", bold=false) {
    let a = (angleDeg - 90) * Math.PI / 180;
    let x = r * Math.cos(a);
    let y = r * Math.sin(a);
    return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${bold||weight==='bold'?'bold':'normal'}" fill="${color}" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle" transform="rotate(${angleDeg}, ${x}, ${y})">${text}</text>\n`;
}

// 1. OFF
svg += polarText("OFF", 85, 0, "white", 10, "bold");

// 2. ACV (Red, right side)
// 1000, 250, 50, 10
// Angles roughly 30 to 80
svg += polarText("ACV", 90, 30, "red", 11, "bold");
svg += polarText("1000", 75, 25, "red", 9, "bold");
svg += polarText("250", 75, 45, "red", 9, "bold");
svg += polarText("50", 75, 65, "red", 9, "bold");
svg += polarText("10", 75, 85, "red", 9, "bold");
// Red Arc for ACV
svg += `<path d="M ${85 * Math.cos((25-90)*Math.PI/180)} ${85 * Math.sin((25-90)*Math.PI/180)} A 85 85 0 0 1 ${85 * Math.cos((85-90)*Math.PI/180)} ${85 * Math.sin((85-90)*Math.PI/180)}" fill="none" stroke="red" stroke-width="1.5"/>\n`;

// 3. OHM (Green/White, bottom right)
// x10K, x1K, x100, x10, x1
// Angles roughly 100 to 160
svg += polarText("x10K", 75, 100, "white", 9, "bold");
svg += polarText("x1K", 75, 115, "white", 9, "bold");
svg += polarText("x100", 75, 130, "white", 9, "bold");
svg += polarText("x10", 75, 145, "white", 9, "bold");
svg += polarText("x1", 75, 160, "white", 9, "bold");
svg += polarText("O", 90, 155, "#00ff00", 14, "bold");
// Green arc
svg += `<path d="M ${85 * Math.cos((100-90)*Math.PI/180)} ${85 * Math.sin((100-90)*Math.PI/180)} A 85 85 0 0 1 ${85 * Math.cos((160-90)*Math.PI/180)} ${85 * Math.sin((160-90)*Math.PI/180)}" fill="none" stroke="#00ff00" stroke-width="1.5"/>\n`;

// 4. DCmA (White, bottom left)
// 250, 25, 2.5, 50µA
// Angles roughly 200 to 240
svg += polarText("250", 75, 200, "white", 9, "bold");
svg += polarText("25", 75, 215, "white", 9, "bold");
svg += polarText("2.5", 75, 230, "white", 9, "bold");
svg += polarText("50µA", 75, 245, "white", 9, "bold");
svg += polarText("DCmA", 90, 220, "white", 10, "bold");
// White arc
svg += `<path d="M ${85 * Math.cos((200-90)*Math.PI/180)} ${85 * Math.sin((200-90)*Math.PI/180)} A 85 85 0 0 1 ${85 * Math.cos((245-90)*Math.PI/180)} ${85 * Math.sin((245-90)*Math.PI/180)}" fill="none" stroke="white" stroke-width="1.5"/>\n`;

// 5. DCV (White, left to top left)
// 0.1, 0.5, 2.5, 10, 50, 250, 1000
// Angles roughly 260 to 340 (-100 to -20)
svg += polarText("DCV", 90, -45, "white", 11, "bold");
svg += polarText("0.1", 75, -100, "white", 9, "bold");
svg += polarText("0.5", 75, -85, "white", 9, "bold");
svg += polarText("2.5", 75, -70, "white", 9, "bold");
svg += polarText("10", 75, -55, "white", 9, "bold");
svg += polarText("50", 75, -40, "white", 9, "bold");
svg += polarText("250", 75, -25, "white", 9, "bold");
svg += polarText("1000", 75, -10, "white", 9, "bold");
// White arc
svg += `<path d="M ${85 * Math.cos((-100-90)*Math.PI/180)} ${85 * Math.sin((-100-90)*Math.PI/180)} A 85 85 0 0 1 ${85 * Math.cos((-10-90)*Math.PI/180)} ${85 * Math.sin((-10-90)*Math.PI/180)}" fill="none" stroke="white" stroke-width="1.5"/>\n`;

// 6. BATT (White, bottom)
// 1.5V, 9V
svg += polarText("1.5V", 75, 175, "white", 8, "bold");
svg += polarText("9V", 75, 185, "white", 8, "bold");
svg += polarText("BATT", 90, 180, "white", 9, "bold");

svg += `</svg>`;

let html = fs.readFileSync("index.html", "utf-8");

// Find the center knob container and replace the pointer-events-none div
// The div to replace is:
// <div class="absolute w-full h-full pointer-events-none">
// ...
// </div>

const startTag = `<div class="absolute w-full h-full pointer-events-none">`;
const endTag = `</div>\n\n                <!-- Knob Element -->`;
let startIndex = html.indexOf(startTag);
if (startIndex !== -1) {
    let endIndex = html.indexOf(endTag, startIndex);
    if (endIndex !== -1) {
        html = html.substring(0, startIndex) + svg + "\n                <!-- Knob Element -->" + html.substring(endIndex + endTag.length);
        fs.writeFileSync("index.html", html, "utf-8");
        console.log("Success");
    } else {
        console.log("End tag not found");
    }
} else {
    console.log("Start tag not found");
}


