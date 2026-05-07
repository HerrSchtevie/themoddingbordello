# SOS Outfit Distribution Guide

---

This guide covers how the **JOJ Outfit Distribution** mod defines NPC outfits and how those outfits are assigned to specific NPCs using SkyPatcher. It also covers how to safely disable, modify, or add new outfit assignments.

> **Disclaimer – Read This First**
> This guide was originally assembled using **Journals of Jyggalag** as the reference list.
> While the instructions apply across all **Scrolls of Schtevie** modlists, some plugin orders, FormIDs, or filenames may differ slightly between lists.
> The core process and steps remain the same.

> Special thanks to [Guurzak](https://www.nexusmods.com/profile/Guurzak?gameId=1704) for originally creating this guide as a Tome post on the Discord server.

---

## Table of Contents

- [Overview](#overview)
- [Outfit Definition](#outfit-definition)
- [Outfit Assignment](#outfit-assignment)
- [Modifying Distribution](#modifying-distribution)

---

## Overview

The **JOJ Outfit Distribution** mod is split into two cooperating layers:

- **Plugins (`.esp`)** — these define *Outfit records*, which are groups of armor and clothing items bundled together as a wearable set.
- **SkyPatcher INIs (`.ini`)** — these map those Outfit records onto specific NPCs at runtime.

To inspect the mod, right-click **JOJ Outfit Distribution** in MO2 and select **Open in Explorer**. You will see the `.esp` files at the top level of the mod folder, with the SkyPatcher `.ini` files nested deeper inside the file structure.

> **Note:** SkyPatcher applies its changes at game load time rather than baking them into the Skyrim layered data model. This means edits to SkyPatcher INIs do **not** require a new save or a clean save to take effect — they apply on the next launch.

---

## Outfit Definition

How outfit records are constructed inside `JOJ - Outfits.esp`.

<details>
<summary>Inspecting Outfits in xEdit</summary>
<div class="details-content">

1. Launch **xEdit** from the MO2 applications dropdown
2. In the plugin selection window, load **`JOJ - Outfits.esp`**
3. Notice that this also loads a large number of armor mods as **masters**

An Outfit record can only reference armor and clothing items that its plugin already knows about, which is why every armor mod contributing pieces to a JOJ outfit is pulled in as a master.

Expand the plugin in the left pane and click through the **Outfit** category to inspect the records. Each Outfit is simply an `INAM` list — a list of armor records drawn from the various source mods.

</div>
</details>

<details>
<summary>Understanding Outfit Records</summary>
<div class="details-content">

Every Outfit record has a unique **FormID** that identifies it within its plugin. For example, the outfit named **Mageali 3 - Ysolda Custom** has a FormID of `FE047805`.

Take note of any FormID you intend to reference in an assignment — it will be used in the SkyPatcher INI in the next section.

When you are finished inspecting outfits, **close xEdit without saving**.

</div>
</details>

<details>
<summary>Creating a New Outfit Record</summary>
<div class="details-content">

If none of the existing outfits in your modlist suit your needs, you can define your own Outfit records in a small custom ESL-flagged plugin. The workflow is: create an empty plugin, add the armor mods you want to draw from as masters, then add new OTFT records inside it.

#### Create an Empty ESL Plugin

1. Launch **xEdit** from the MO2 applications dropdown
2. Load any armor mods containing pieces you intend to reference, then click **OK**
3. In the left pane, **right-click an empty area** → **Create New File...**
4. In the dialog that appears, select the **`<new file>.esp`** row that shows **`ESL`** on the right (and no `ESM`)
5. Click **OK** and name the file something descriptive, e.g. `MyCustomOutfits.esp`

The new plugin is created and placed in the modlist's xEdit output mod (e.g. `JOJ - xEdit Output`). You can leave it there or move it into a different mod folder afterwards — it just needs to be **enabled**.

> **Why ESL?** Conserves plugin slots and keeps the last-three-digits FormID shorthand consistent with the rest of this guide. Non-ESL plugins still work — you just lose the shorthand and consume a regular slot.

#### Add Masters

For your plugin to reference armor records from other mods, those mods must be added as **masters**:

1. Right-click your new plugin in the left pane → **Add Masters**
2. Check every armor mod whose pieces you intend to use
3. Confirm

#### Add Outfit Records

1. Right-click your plugin → **Add** → select **Outfit (OTFT)**
2. Set the new record's **EDID** (Editor ID) to something meaningful, e.g. `MyOutfit_Ysolda01`
3. On the new record, right-click the **INAM – Items** field → **Add** once for each armor piece you want included
4. For each new INAM entry, drag-and-drop the desired armor record from the left pane, or paste its FormID
5. Repeat steps 1–4 for any additional outfits, then save the plugin and exit xEdit

**Note each new outfit's FormID and the exact name of your plugin** — you'll need both when writing the SkyPatcher assignment line in the next section.

> ⚠️ Any newly added armor must be **built in BodySlide** before it displays correctly in-game. See the [SOS Tool Running Guide](/guides/sos-tool-running-guide) for BodySlide instructions.

</div>
</details>

---

## Outfit Assignment

How SkyPatcher INIs map Outfit records onto specific NPCs.

<details>
<summary>The SkyPatcher INI Format</summary>
<div class="details-content">

Locate and open **`zAIO JOJ - Outfit Distribution.ini`** inside the JOJ Outfit Distribution mod folder. You can reach it via Windows Explorer or via the MO2 **Data** pane.

This file is a SkyPatcher configuration file. Unlike a plugin, it is read and applied at runtime rather than modifying the Skyrim layered data model through xEdit.

For background on SkyPatcher syntax in general, see [this article](https://www.nexusmods.com/skyrimspecialedition/articles/6085) and the other articles on the SkyPatcher mod page.

</div>
</details>

<details>
<summary>Anatomy of an Assignment Line</summary>
<div class="details-content">

Scroll down to Ysolda's entry. You will see two lines:

```
; Ysolda - [00013BAB] | Skyrim.esm
filterByNpcs=Skyrim.esm|00013BAB:outfitDefault=JOJ - Outfits.esp|FE031805
```

**The first line is a comment.** It begins with a semicolon and exists purely to label the entry for human readers — SkyPatcher ignores it.

**The second line is the actual assignment.** It has two halves separated by a colon:

- **Target — `filterByNpcs=Skyrim.esm|00013BAB`**
  This identifies the NPC to modify. `Skyrim.esm` is the plugin that defines the NPC's base record, and `00013BAB` is the FormID of that NPC inside that plugin. Together, this resolves to Ysolda.

- **Modification — `outfitDefault=JOJ - Outfits.esp|FE031805`**
  `outfitDefault` tells SkyPatcher which property to change (the NPC's default outfit), and `JOJ - Outfits.esp|FE031805` specifies the Outfit record to assign.

</div>
</details>

<details>
<summary>ESL FormID Prefix Behavior</summary>
<div class="details-content">

You may notice that the FormID in the assignment line (`FE031805`) does not match the FormID you saw in xEdit for the same outfit (`FE047805`). This is expected behavior.

When SkyPatcher reads an assignment like `JOJ - Outfits.esp|FE031805`, it interprets the plugin prefix automatically based on the plugin name. For an **ESL-flagged** plugin — which is the case for essentially every plugin you are likely to be editing here — only the **last three digits** of the FormID are meaningful. The first five digits represent the load-order prefix and are resolved by SkyPatcher at runtime.

In practical terms, all of the following resolve to the same Outfit record:

- `JOJ - Outfits.esp|FE031805`
- `JOJ - Outfits.esp|FE047805`
- `JOJ - Outfits.esp|805`

When you write your own assignments, the only requirements are that:

- The plugin name matches exactly
- The last three digits of the FormID are correct

</div>
</details>

---

## Modifying Distribution

How to disable, change, or add outfit assignments.

> **Best Practice:** Before editing `zAIO JOJ - Outfit Distribution.ini` or any other existing SkyPatcher file, make a backup copy of the original. This gives you a known-good fallback if something goes wrong, and a reference for the original assignment if you later want to restore it.

<details>
<summary>Disabling an NPC's Custom Outfit</summary>
<div class="details-content">

To stop JOJ from applying its custom outfit to a specific NPC:

1. Locate the SkyPatcher INI that contains the NPC's entry (typically `zAIO JOJ - Outfit Distribution.ini`)
2. Find the assignment line for that NPC
3. Either:
   - **Comment it out** by adding a semicolon (`;`) at the start of the line, or
   - **Delete the line entirely**

Commenting is preferred over deletion in most cases — it preserves the original assignment as a reference and allows you to easily re-enable it later.

</div>
</details>

<details>
<summary>Changing or Creating an Assignment</summary>
<div class="details-content">

To change which outfit an NPC receives, or to assign an outfit to an NPC who does not currently have a JOJ assignment:

1. Identify the **Outfit record** you want to use:
   - Use an existing record from `JOJ - Outfits.esp`, or
   - Create a new Outfit record in your own custom outfits plugin
2. Identify the **NPC** by their source plugin and FormID
3. Add a new assignment line in either an existing SkyPatcher INI or a new one (see the next section), using the format:
   ```
   filterByNpcs=<NpcPlugin>|<NpcFormID>:outfitDefault=<OutfitPlugin>|<OutfitFormID>
   ```

</div>
</details>

<details>
<summary>Creating Your Own SkyPatcher INI</summary>
<div class="details-content">

If you want to keep your custom assignments in a separate file rather than editing the existing one, two requirements must be met:

#### Load Order

SkyPatcher INIs are processed alphabetically. If multiple files target the same NPC, the **last one to be processed wins**. Because the bundled file is named `zAIO JOJ - Outfit Distribution.ini`, your filename must come **alphabetically after `zAIO`** to override its assignments.

A safe convention is to prefix your filename with `zz`, for example:
- `zzMyOutfitDistribution.ini`

#### File Location

SkyPatcher only reads INI files from a specific path. Place your file at:

```
\SKSE\Plugins\Skypatcher\npc\zzMyOutfitDistribution.ini
```

The folder structure must match exactly — `SKSE\Plugins\Skypatcher\npc\` — or SkyPatcher will not process the file.

</div>
</details>

---

> ✅ Because SkyPatcher applies its changes at runtime, edits made to these INI files take effect on the next game launch. No new save, clean save, or tool run is required.
