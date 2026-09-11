import { readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
const assets=resolve(import.meta.dirname,"../dist/assets");
const files=await readdir(assets); const js=[];
for(const name of files.filter(name=>name.endsWith(".js"))){const size=(await stat(resolve(assets,name))).size;js.push({name,size});}
const tooLarge=js.filter(file=>file.size>250*1024);
console.log(`Bundle audit: ${js.length} JavaScript chunks · largest ${Math.round(Math.max(...js.map(file=>file.size))/1024)} KB`);
if(tooLarge.length){console.error(`Chunks over 250 KB: ${tooLarge.map(file=>file.name).join(", ")}`);process.exitCode=1;}
