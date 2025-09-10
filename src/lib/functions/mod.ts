import type {Mod} from "$lib/interfaces/mod";
import JSZip from "jszip";

export async function importModFromZip(file: File): Promise<Mod> {
    let mod: Mod = {
        id: "my_name.my_mod",
        name: "MyMod",
        version: "1.0.0",
        description: "My awesome mod",
        author: "MyName",
        patches: [],
        traits: [],
    }
    let zip = new JSZip();
    let loadedZip = await zip.loadAsync(file);
    let modFile = loadedZip.file(/Mods\/.*\.json/)[0];
    if (modFile) {
        let modContent = await modFile.async("string");
        mod = JSON.parse(modContent);
    }

    return mod;
}

export function exportModToZip(mod: Mod) {
    let modJson = JSON.stringify(mod, null, 2);
    let zip = new JSZip();
    zip.folder("Mods")?.file(`${mod.id}.json`, modJson);
    zip.generateAsync({type: "blob"}).then((content) => {
        let url = URL.createObjectURL(content);
        // change current tab to download url
        window.location.href = url;
    });
}