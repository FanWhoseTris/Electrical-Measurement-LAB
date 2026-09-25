
const fs = require("fs");
const path = "C:/Users/ADMIN/.gemini/antigravity-ide/brain/d9ad7974-9628-49ec-957e-c8da837b969b/.system_generated/logs/transcript_full.jsonl";
const lines = fs.readFileSync(path, "utf-8").split("\n");
let lastHTML = null;
for(let i = lines.length - 1; i >= 0; i--) {
    if(!lines[i]) continue;
    try {
        const obj = JSON.parse(lines[i]);
        if(obj.tool_calls) {
            for(let call of obj.tool_calls) {
                if(call.function === "default_api:replace_file_content" || call.function === "default_api:multi_replace_file_content") {
                    // This is too hard if it was a partial replace.
                }
                if(call.function === "default_api:write_to_file") {
                    if(call.arguments && call.arguments.TargetFile && call.arguments.TargetFile.endsWith("index.html")) {
                        lastHTML = call.arguments.CodeContent;
                        break;
                    }
                }
            }
        }
        if (lastHTML) break;
    } catch(e) {}
}
if(lastHTML) {
    fs.writeFileSync("scratch/recovered_index.html", lastHTML);
    console.log("Recovered index.html from write_to_file!");
} else {
    console.log("Could not find a write_to_file for index.html. Try searching for replace_file_content or terminal commands.");
}

