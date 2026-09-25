
const fs = require("fs");
let html = fs.readFileSync("index.html", "utf-8");

const scriptAdd = `
        const addBtn = document.getElementById("add-btn");
        const addMenu = document.getElementById("add-menu");
        if (addBtn && addMenu) {
            addBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                addMenu.classList.toggle("hidden");
            });
            document.addEventListener("click", () => {
                addMenu.classList.add("hidden");
            });
        }
`;
html = html.replace("// --- NEW: VOM Logic ---", scriptAdd + "\n        // --- NEW: VOM Logic ---");
fs.writeFileSync("index.html", html);
console.log("Injected JS logic");

