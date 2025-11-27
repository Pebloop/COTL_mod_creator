import type {Mod} from "$lib/interfaces/mod";

export default function (mod: Mod) {
    let manifest = {
        namespace: mod.name,
        name: mod.name,
        description: mod.description,
        version_number: mod.version,
        dependencies : [
            "BepInEx-BepInExPack_CultOfTheLamb-5.4.21",
            "API_dev-COTL_API-0.2.12"
        ],
        website_url: mod.website,
    }
    return JSON.stringify(manifest, null, 2);
}