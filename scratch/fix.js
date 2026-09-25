const fs = require("fs");
let html = fs.readFileSync("index.html", "utf-8");

// regex to remove the entire relative div containing add-btn
html = html.replace(/<div class="relative">\s*<button id="add-btn"[\s\S]*?<!-- other items can go here later -->\s*<\/div>\s*<\/div>/g, "");

// Now add it exactly once in the Header Actions
let btnHtml = `
            <div class="relative">
                <button id="add-btn" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow flex items-center gap-2 text-sm font-medium transition-all active:scale-95">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    Thêm +
                </button>
                <div id="add-menu" class="hidden absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button onclick="document.getElementById('vom-modal').classList.remove('hidden'); document.getElementById('add-menu').classList.add('hidden');" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đồng hồ VOM</button>
                </div>
            </div>`;

// Find <div class="flex gap-3"> in the header actions block
// It should be the first one.
html = html.replace('          <div class="flex gap-3">', '          <div class="flex gap-3">' + btnHtml);

fs.writeFileSync("index.html", html);
console.log("Fixed add-btn");
