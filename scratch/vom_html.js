
const fs = require("fs");
let svg = fs.readFileSync("scratch/out_v2.svg", "utf-8");

let modal = `
<!-- VOM Modal -->
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
            ${svg.trim()}
            
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

fs.writeFileSync("scratch/modal.html", modal);
console.log("Written modal.html");

