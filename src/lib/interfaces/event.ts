import type {Action} from "$lib/interfaces/action";

export interface ModEvent {
    trigger: string;
    conditions: string[];
    actions: Action[];
}