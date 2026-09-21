This guide covers how to reduce overt eroticism in the list while retaining NSFW functionality like OStim for users who prefer things "behind closed doors."

> **How to Use This Guide**
>  
> This is not a sequential guide.  
> Each section is independent — pick and choose the changes that suit your preferences.  
> You do NOT need to complete every section.

> **Important:** Armor changes will not reliably affect NPCs who already have generated inventories. For best results, apply these changes before starting a new save.

---

## Table of Contents

- [Armor Replacements](#armor-replacements)
- [NPC Appearance](#npc-appearance)
- [Gameplay Adjustments](#gameplay-adjustments)
- [Daedric Statues](#daedric-statues)

---

> **Disclaimer – Read This First**
> This guide was originally assembled using **Journals of Jyggalag** as the reference list.
> While the instructions apply across all **Modding Bordello** modlists, some screenshots, plugin orders, or plugin numbers may differ slightly between lists.
> The core process and steps remain the same.

> Special thanks to [Guurzak](https://www.nexusmods.com/profile/Guurzak?gameId=1704) for originally creating this guide as a Tome post on the Discord server.

---

## Armor Replacements

Replace default outfits and armor with less revealing alternatives.

> **Most of this is already done for you.** Every list now ships Somewhere in Between as its armor and clothing replacer, enabled by default, and the skimpier replacers ship disabled. A default install is already the less revealing configuration, so only the first step below is still needed.

<details>
<summary>Required Steps</summary>
<div class="details-content">

Search the left pane for `Outfit Distribution` and disable **`JOJ - Outfit Distribution`**. It carries the JOJ prefix on every list, not just JOJ.

That mod is a SkyPatcher layer of 127 rules that assigns revealing outfits to NPCs by faction and gender, drawing on Talos' Tease, Immersive Wenches and SkyrimDressUp. It applies whether or not the skimpy replacers are enabled, which is why it is the one step here that still matters.

</div>
</details>

<details>
<summary>Already Shipped, Nothing To Do</summary>
<div class="details-content">

These used to be manual steps in this guide. They are now part of every list, installed and enabled:

- `Somewhere in Between - 3BA Clothes Replacer`
- `Somewhere in Between - 3BA Armor Replacer`, plus `Somewhere in Between - Helmets`
- `CBBE 3BA Vanilla Outfits Redone`

And the spicier layer ships **disabled**, so there is nothing to remove. Simply leave these off:

- `TAWOBA Replacer (3BA)` and `TEWOBA Replacer (3BA)`
- `SkyTittie's Vanilla Clothing Replacer (3BA)`
- `Kreiste's Skimpy Outfits for HIMBO - Vanilla Male Armors and Clothing Replacers`
- the three `SOS - BodySlide Output (Spicier ...)` mods
- `Spicier Armor and Clothing - INSTRUCTIONS`

</div>
</details>

<details>
<summary>Advanced Alternative</summary>
<div class="details-content">

The list ships Somewhere in Between with prebuilt meshes, so nothing needs building. If you would rather build it yourself, or use a different replacer entirely, download the **NPM** (not-prebuilt) version of whichever replacer you want, place it in a **My Mods** section just above the Outputs section, and run BodySlide to build the outfit groups. Select zaps if desired.

On the right side, move any new plugins to just below the `PG_1` plugin in the Outputs section so they win their conflicts.

</div>
</details>

<details>
<summary>Underwear Mods</summary>
<div class="details-content">

- [Underwear.dll](https://www.nexusmods.com/skyrimspecialedition/mods/99021)
- [N.U.D.E. powered by Underwear.dll](https://www.nexusmods.com/skyrimspecialedition/mods/99717)

</div>
</details>

---

## NPC Appearance

Adjust NPC body presets and face overhauls to suit your visual preferences.

<details>
<summary>OBody Adjustments</summary>
<div class="details-content">

#### Curate Body Presets

- Review presets in MO2 **3BA** section (and/or HIMBO)
- Enable ones you like
- Disable ones you don't

Tip: right-click a preset mod, then select **Visit on Nexus** for previews.

#### New vs Existing Save

- **New save** — nothing else needed
- **Existing save** — reset required (see below)

#### Reset OBody

1. Go to a small interior cell with no NPCs
2. Open **OBody MCM**
3. Check:
   - `Reset all distributed presets`
4. Save
5. Quit to desktop
6. Restart game

#### Blacklist Specific Bodies

1. Find the preset `.xml` file
2. Copy the filename (without `.xml`)
3. Open:
   - `Obody_presetDistributionConfig.json`
4. Add the filename to:
   - `blacklistedPresetsFromRandomDistribution`
5. Save

If using this step, repeat the reset process above.

#### Optional: Diverse NPC Heights

- [Diverse NPC Heights](https://www.nexusmods.com/skyrimspecialedition/mods/141006)

</div>
</details>

<details>
<summary>De-Glam</summary>
<div class="details-content">

Bordello modlists intentionally deliver a high-glam NPC aesthetic. If you prefer a more grounded, lore-friendly population, follow the steps below to replace NPC appearances.

#### Install Dibella's Blessing

Download and install:

- [Dibella's Blessing](https://www.nexusmods.com/skyrimspecialedition/mods/82606)

During the FOMOD installer, select:

- CBBE
- Your preferred option for Elisif
- Your preferred option for Aela
- Yes, and AE
- USSEP + AI Overhaul

After installation:

- Move the mod into the **NPC Overhauls** section in MO2
- Leave the mod **unchecked**

#### Generate NPC Appearances

Use NPC Plugin Chooser 2 to apply Dibella's Blessing selectively:

- Launch **NPC Plugin Chooser 2** from the applications dropdown in MO2
- Locate any NPC with a **Dibella's Blessing** option
- Right-click the Dibella's Blessing entry
- Select **"Select All From This Mod"**
- Confirm the selection
- Click **Run**
- Click **Run Patch Generation**
- Wait for **"Patch generation process completed"**, then exit

For a full walkthrough, see the
[SOS NPC Plugin Chooser 2 Guide](/guides/sos-npc-plugin-chooser-2-guide)

#### Run Required Tools

This step requires a generated NPC appearance patch:

- Launch **Synthesis**
- Run the **Synthesis Character pipeline**

For full instructions, see the
[SOS Tool Running Guide](/guides/sos-tool-running-guide)

#### Optional: Custom NPC Selection

You are not required to use Dibella's Blessing as a full replacer.

NPC Plugin Chooser 2 allows you to:
- Mix and match NPC appearances from multiple mods
- Select individual faces instead of full overhauls
- Build a fully customized NPC population

Refer to the
[SOS NPC Plugin Chooser 2 Guide](/guides/sos-npc-plugin-chooser-2-guide)
for advanced usage such as mugshots and manual selection.

#### Alternative NPC Overhaul Suggestions

If Dibella's Blessing is not to your preference, consider:

- [Lein's Perhaps Realistic NPCs](https://www.nexusmods.com/skyrimspecialedition/mods/80058)
- [Faithful Faces](https://www.nexusmods.com/skyrimspecialedition/mods/114342)
- [Nordic Faces](https://www.nexusmods.com/skyrimspecialedition/mods/40658)

</div>
</details>

---

## Gameplay Adjustments

Modify NPC behavior, animations, and remove optional NSFW content.

<details>
<summary>OStim NPC Behavior</summary>
<div class="details-content">

In game, open the **OStim NPCs MCM**, check:

- `Disable automatic scene starts`

</div>
</details>

<details>
<summary>Hip Sway Adjustments</summary>
<div class="details-content">

Our animation set has a very feminine walk and run moveset for female PCs and NPCs, which is consistent regardless of armor worn.

#### Disable for Female NPCs

1. Press `Shift + X` to open the OAR menu
2. Select **User Mode** at the top right
3. Find and expand **Feminine Walk and Run**
4. Uncheck:
   - `Female NPC`
5. Click **Save Submod Config**

#### Disable for Your Female Player Character

Uncheck:

- `Female Player Character`

Save the config.

#### Replacement Animation Suggestions

- Runway Walk — clothing
- Goetia — mages
- Vanargand — light armor
- Leviathan — heavy armor

</div>
</details>

<details>
<summary>Immersive Wenches</summary>
<div class="details-content">

Use the MCM to reduce or disable wench classes.

</div>
</details>

<details>
<summary>Optional Content Removal</summary>
<div class="details-content">

Disable:

- `Arcs WispMother Redux NSFW`
- `New Night Mother SE`

</div>
</details>

<details>
<summary>Removing Amorous Adventures</summary>
<div class="details-content">

Disable all AA-related mods and patches:

- `AA OStim Sequences - Vampire Fix Patch`
- `JOJ - AA IFD Quest Patch`
- `Amorous Adventures for Ostim`
- `Amorous Adventures for OStim Standalone - Patch and Fixes`
- `Amorous Adventures OStim Standalone - OStim Sequences`
- `Amorous Adventures for Ostim - Script Fix`

Also disable:

- `SOS - Ostim Sequences AA Sybille Vamp`
- `Typo Fixes by Jirasu`

Plugins:

- `SDA-AA Patch.esp`
- `JKs Bards College - AA patch.esp`
- `JKs COW - OCW - AA patch.esp`

</div>
</details>

<details>
<summary>Removing OStim Entirely</summary>
<div class="details-content">

Disable:

- All OStim mods
- `An Evening With Angi`
- `Naughty Voices for ColdSun's Girls`
- `OCum Ascended`
- `Kaidan NSFW`

Plugin:

- `Talos' Tease - Ostim Integration.esp`

</div>
</details>

---

## Daedric Statues

Replace NSFW daedric statues, shrines and standing stones with lore-friendly alternatives.

> **Warning:** This section requires a full tool suite run after completion. See the [SOS Tool Running Guide](/guides/sos-tool-running-guide).

<details>
<summary>Remove Statue Masters</summary>
<div class="details-content">

This is smaller than it looks. Across the whole load order exactly **one** record actually uses the statuettes: the container `MerchantWCollegeUragChest` [CONT:0010C430], which `<ACR> - Archivum Ultima.esp` overrides to add `1x AABookStatuettes`. Every other plugin that declares `PsBoss's Statuettes Crafting.esp` as a master never references a single form from it.

So the job is:

1. Open `<ACR> - Archivum Ultima.esp` in xEdit (`JOJ - Archivum Ultima.esp`, `HOH - Archivum Ultima.esp`, and so on for your list).
2. In `MerchantWCollegeUragChest`, delete the `AABookStatuettes` item entry.
3. Run Clean Masters on that plugin. `PsBoss's Statuettes Crafting.esp` drops off by itself.

For a visual guide to the master removal, see:
[Biggie's EASILY Remove Masters From Plugins | SSEEdit & xEdit Guide](https://www.youtube.com/watch?v=5cHJ0i7hE2U)

On HOH and DOD two further plugins declare the master, `HOH - Patch of the Hunt 1.2.0.esp` or `DOD - Patch of Desire 1.0.0.esp`, and `PronounsPatch.esp`. Neither references anything from it, so Clean Masters removes it from both with no editing at all.

> **About `PronounsPatch.esp`:** it lives in `<ACR> - xEdit Output` and is nothing more than the output of the Pronouns mod's xEdit script. Since it references no statuette forms you can leave it alone, clean its masters, rerun the script yourself, or simply disable it for the purposes of this guide. Any of the four is fine.

`Aio Statue Fixes.esp`, from `New NSFW Statues AIO SE`, needs no master removal on any list. Nothing masters it, so disabling the mod is enough.

Also disable the following mods in MO2:

- `New Night Mother SE`
- `New NSFW Statues AIO SE`
- `PsBoss's Statuettes`
- `Whispers of the Daedric Princes` (audio only, the looping whispers at daedric shrines; nothing is shown or unlocked by it, so keep it if you like the ambience)
- `Standing Stones AIO with New Fixes`
- `PSBoss Standing Stones AiO - Compatibility Patches`

Disabling `New NSFW Statues AIO SE` returns 249 of its 250 statue meshes and textures to vanilla, which is what the replacements below are for. `New Night Mother SE` needs no replacement at all; see the suggestions block.

> **On the standing stones:** the last two are on JOJ, HOH, DOD and MOM, and on DOD and MOM the first of them is named `PSBoss Standing Stones AIO with New Fixes`. Nothing masters either plugin, so there is no master to remove; the stones return to their vanilla models and no replacement mod is needed.
>
> **Then reinstall the `Halls of Order` FOMOD and deselect the standing stones patch.** It drops the 13 standing stones in the Halls of Order by 5 to 10 units each to suit PSBoss's taller base, so with the vanilla stones back they would sit sunk into the floor. Leaving that option out restores Halls of Order's own placement, which is the one built for the vanilla stones.
>
> **One thing you cannot undo from MO2.** The same correction was made for the Dragonborn Hall displays in the Legacy of the Dragonborn museum, where LotD places its 13 miniature stones for the vanilla meshes. That one lives inside `<ACR> - Late Loaders.esp` rather than in a plugin of its own, so it stays after you disable the standing stones: the 13 miniatures and the gallery niche insert end up off by up to 11 units, and two of them face backwards. It is museum dressing and affects nothing else. If it bothers you, revert those 14 references in xEdit.

</div>
</details>

<details>
<summary>Install Replacements</summary>
<div class="details-content">

- [Daedric Shrines - All in One](https://www.nexusmods.com/skyrimspecialedition/mods/78772)
- [Daedric Shrines - Mehrunes Dagon Fixes by Xtudo - Majestic Northfires Photoreal Riton Medieval Vivid Skyland Dave Holy True Nordic Rustic Darkside Atlantean Gecko Real Polar Tamrielic Northfires ERM](https://www.nexusmods.com/skyrimspecialedition/mods/76942)

</div>
</details>

<details>
<summary>Statue Replacements Suggestions</summary>
<div class="details-content">

Three of these are already handled by mods the list ships, so do not go looking for them:

- **Kynareth** is covered by `Aedric Shrines - Statue of Kynareth`, already installed and enabled.
- **Azura** is covered by `A Shrine of Azura at The Shrine of Azura`, already installed and enabled.
- **The Night Mother** is covered by `Much Better Night Mother`, already installed. It sits directly below `New Night Mother SE` and takes over her mesh the moment you disable that mod, so there is nothing to install and nothing to reorder.

Worth adding if you want more than the vanilla statue:

- [Statue of Mara](https://www.nexusmods.com/skyrimspecialedition/mods/93909)
- [Dibella statue](https://www.nexusmods.com/skyrimspecialedition/mods/61553)
- [Wooden Talos Statue](https://www.nexusmods.com/skyrimspecialedition/mods/81250)

</div>
</details>

<details>
<summary>Run Full Tool Suite</summary>
<div class="details-content">

Run in this order (see [SOS Tool Running Guide](/guides/sos-tool-running-guide)):

1. Synthesis
2. Full tool suite
3. Synthesis again

</div>
</details>

---

> Regardless of which changes you make, it is recommended to run Synthesis after modifying your modlist.
