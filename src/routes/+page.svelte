<script lang="ts">
    import type {Mod} from "$lib/interfaces/mod";
    import General from "$lib/pages/General.svelte";
    import Patches from "$lib/pages/Patches.svelte";
    import Traits from "$lib/pages/Traits.svelte";
    import {exportModToZip, importModFromZip} from "$lib/functions/mod";

    let modContent: Mod = $state({
        id: "my_name.my_mod",
        name: "MyMod",
        version: "1.0.0",
        description: "My awesome mod",
        author: "MyName",
        website: "https://cotlmodcreator.pebloop.dev/",
        patches: [],
        traits: [],
    });

    let page = "general";

    function setPage(newPage: string) {
        page = newPage;
    }

    function exportMod() {
        exportModToZip(modContent);
    }

    function importMod() {
        let input = document.getElementById('import') as HTMLInputElement;
        if (input.files && input.files[0]) {
            let file = input.files[0];
            importModFromZip(file).then((mod) => {
                modContent = mod;
            });
        }
    }
</script>

<div class="w-full flex flex-row items-center justify-between bg-gray-600">
    <div class="flex flex-row items-center p-4 space-x-2">
        <input type="text" bind:value={modContent.name} placeholder="MyMod"
           class="w-52 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <p>V.</p>
        <input type="text" bind:value={modContent.version} placeholder="1.0.0"
               class="w-40 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
    <div class="flex flex-row items-center p-2 gap-2">
        <label for="import" class="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">IMPORT</label>
        <input type="file" id="import" class="hidden" accept=".zip" on:change={importMod}/>
        <button class="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600" on:click={exportMod}>EXPORT</button>
    </div>
</div>
<div class="flex flex-row items-stretch justify-between h-full">
    <div class="flex flex-col items-stretch justify-start  bg-gray-600 w-25">
        <button class={"button " + (page === "general" ? "button_selected" : "button_unselected") } on:click={() => setPage("general")}>General</button>
        <button class={"button " + (page === "patches" ? "button_selected" : "button_unselected") } on:click={() => setPage("patches")}>Patches</button>
        <button class={"button " + (page === "traits" ? "button_selected" : "button_unselected") } on:click={() => setPage("traits")}>Traits</button>
    </div>
    <div class="flex-1 p-4">
        {#if page === "general"}
            <General />
        {:else if page === "patches"}
            <Patches />
        {:else if page === "traits"}
            <Traits />
        {/if}
    </div>
</div>

<style>
    @import 'tailwindcss';

    .button {
        @apply font-bold w-full hover:bg-gray-500 flex items-center justify-center p-2;
    }

    .button_selected {
        @apply bg-gray-500;
    }

    .button_unselected {
        @apply cursor-pointer;
    }
</style>
