import type {ModEvent} from "$lib/interfaces/event";

export interface Trait {
    id: string;
    name: string;
    description: string;
    isPositive: boolean;
    flag: string;
    traitEffects: ModEvent[];
}