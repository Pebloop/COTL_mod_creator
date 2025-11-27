import type {ModEvent} from "$lib/interfaces/event";
import type {Trait} from "$lib/interfaces/trait";

export interface Mod {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    website: string;

    patches: ModEvent[];
    traits: Trait[];

}