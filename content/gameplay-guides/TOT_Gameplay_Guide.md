# Tomes of Talos Gameplay Guide

## 📖 Introduction

Welcome, Seeker of Order.

This guide is your comprehensive companion to the **Tomes of Talos** modlist for Skyrim. It provides essential information to help you navigate the early game, understand the systems and mechanics at play, and fully enjoy the carefully curated experience this list offers.

Whether you are a first-time player or a returning champion of Tamriel, this guide covers everything from character creation and combat mechanics to questing and troubleshooting. It is strongly recommended that you read through at least the **Character Creation and Progression** section before starting your journey.

All information here is accurate to the latest release of the modlist and assumes no additional modifications. For additional support, updates, and discussion, please join the official **Tomes of Talos Discord server**.

Let the path of Order guide you.

---

## 📚 Table of Contents

1. 🧙 [Character Creation and Progression](#-character-creation-and-progression)
2. 💾 [Skyrim Save System Overhaul 3](#-skyrim-save-system-overhaul-3)
3. 🧭 [Questing](#-questing)
4. 🧑‍🎨 [Face & Appearance Issues](#-face--appearance-issues)
5. 🗺️ [Map Marker Issues](#-map-marker-issues)
6. 🏃 [Change Dodge Key](#-change-dodge-key)
7. 💀 [Shadow of Skyrim Death System](#-shadow-of-skyrim-death-system)
8. 🗡️ [Attacking Innocents](#-attacking-innocents)
9. ✅ [Conclusion](#-conclusion)


## 🧙 Character Creation and Progression

### Race Selection
- Your choice of race determines:
  - Racial bonuses
  - Standing Stone bonuses
  - Available deities for worship
- Recommended reading before character creation:
  - [Mannaz](https://www.nexusmods.com/skyrimspecialedition/mods/87219) Integrated Races of Skyrim
  - [Freyr](https://www.nexusmods.com/skyrimspecialedition/mods/88043) Integrated Standing Stones of Skyrim
  - [Wintersun](https://www.nexusmods.com/skyrimspecialedition/mods/22506) Faiths of Skyrim
- **Do not** use console commands to change your race after creation.

---

### OBody and Character Appearance
- Your character may appear **distorted or incorrect** in RaceMenu, or may be unable to apply tattoos/overlays during initial setup. This is expected. Finalizing your character and then reopening Racemenu via the Vanity Mirror should resolve most such issues. 

- You may be accustomed to adjusting your body proportions in Racemenu during character creation. This is not possible or needed on our lists. Instead, we use Obody, which allows you to change your own body shape or any NPC's to any installed body preset at will.

- Once you have completed character setup, simply press O and select a preset of your choice from the menu that appears. (If your modlist includes a copy of The Firmament in the starting room, and you would like to use it to choose your starting stone, do that BEFORE selecting body presets.) You may do this as much as you like. If your clothing/armor fails to resize to the new preset correctly, re-equipping it should solve that.

- You can change body shapes for NPCs in the same way, by targeting them with your crosshair at close range and pressing O. Also note that all NPCs are assigned body shapes at random from the available presets when first encountered, so the same NPC may have very different default proportions from one playthrough to the next.

- If you would like to modify the selection of body presets available in your list, see [this guide](https://discord.com/channels/1355637388281385071/1386171993522704504/1386171993522704504) on our Discord server.

---

### Starting Room Behavior

- Once you enter the game:
  - Your character will load into a small setup room.
  - A **JOJ Welcome message** will pop up immediately — this explains that the list is performing initial setup in the background and that **you must wait**.
  - It is OK to select your pronouns immediately.
  - Wait to press "Commence" until the initial stream of notifications has ended, i.e. after the Honed Metal message fades.
  - After pressing "Commence", walk away from your keyboard, let everything initialize, and wait for the final confirmation message.
  - Once you see the popup that says **“Museum is done setting up,”** it’s safe to proceed.

---

### Starting Tools and Options
- Items found in the starting room:
  - A copy of **The Firmament**: lets you choose any Standing Stone.
  - A **Vanity Mirror**: lets you change your appearance at any time. (Hotkey the Vanity Mirror to use it; using it directly from inventory will cause blur.)
  - A custom **Wolong Ring** in a jewelry chest, when equipped, your moveset will switch to [Wolong movesets](https://next.nexusmods.com/profile/black364/mods?gameId=1704) by default.
  - A wide variety of starting weapons, armor, and spells
  - A **Hookshot** to make climbing and traversal easier
  - Some starting supplies, consumables, and funding
- Exit options:
  - Speak to the dragon to choose an **alternate start**.
  - Exit the door to begin in Helgen as a **spectator** to the execution. (NOT RECOMMENDED)
  - Press the **hidden button behind the table** to begin just after Helgen.

---

### Leveling and Experience System
- Vanilla leveling has been **replaced** with:
  - **Experience** (XP gained from exploration, combat, and quests)
  - **Static Skill Leveling** (skill points spent manually at level-up)
- This means:
  - No more grinding skills like smithing or lockpicking.
  - You're free to play naturally without being penalized for your actions.

#### Recommended early-game skill strategy:
- Choose:
  - 1 offensive skill
  - 1 defensive skill
  - 1 crafting or utility skill
- Expand to additional skills as you gain more points through leveling.

---

### Skyshards and Destiny Points

- **Boss chests** may contain **Skyshards**:  
  - Use them from your inventory to **gain extra XP**.

- You can also encounter **glowing Skyshards** while exploring the world:  
  - Touching **three** of these will grant you **one perk point**.

- **Destiny Points**:  
  - Awarded at **character creation** and **milestone levels**  
  - Activate the **“Destiny” power** in your powers menu to access a unique progression tree

---

### Difficulty Notes
- **Combat is intentionally difficult** at low levels.
- Suggested approach:
  - Use a follower early on.
  - Explore and level up before entering dungeons or bandit caves.
- Enemy scaling examples:
  - Bandit zones: minimum level 5
  - Draugr zones: minimum level 10
- The list has two mods for *very difficult* enemy encounters intended to challenge your combat preparation and skill: Sinister Seven, and Moonlight Tales.
  - One or more of The Sinister Seven will seek you out every few levels starting at 12. If you're able to kill one, you should read the notes they carry, and consider those notes carefully as you prepare for the next attack. 
  - Moonlight Werewolves are less predictable and might be encountered almost anywhere, mostly at night time. Running from them is an option... if you start early. 
  - If you are certain that you prefer not to be surprised with boss-tier encounters during your Skyrim play, you have the option to disable Werewolf encounters in the Moonlight Tales MCM, and to change the S7 trigger levels to an arbitrarily high value in that MCM. We encourage you not to do this, though; the most memorable gaming moments are often from surprises.
 
---

## 💾 Skyrim Save System Overhaul 3

---

**SSSO3** is a powerful utility mod that replaces the vanilla autosave, save, and load system with more stable and customizable tools. However, it does require a small amount of manual configuration per character.

---


---

### 🎮 Save Your Game & Restart

- Once you've finished the intro and entered the main game world (e.g., just outside the Helgen cave or your chosen start):
  - Create a **manual save**.
  - **Exit the game completely.**
  - If this is your *first new character* after installing or updating the list, also **exit and restart MO2**.
- Relaunch the game.
- Load your save.
- Open the **Safe Save System Overhaul** MCM and *enable* the mod
- Reopen the mod's MCM and configure the settings below.

You're done! The new save system is now active and tailored to your character.

Note: the system assumes that any character with the default name "Prisoner" is a throwaway and does not set up safe saving for them. Give your character *any other name* if you intend to play them for more than a few minutes.

---

⚙️ Recommended settings:
- 🕔 Enable Timed Save: **enabled**
- 🕔 Autosave every: **5 minutes**
- ⏳ Force autosave every: **15 minutes**
- ♻️ Rotate autosaves after: **5 copies**
- 📦 Rotate manual saves after: **5 copies**  
- 🛡️ In the **Save Shield** section, check the boxes for:
  
  - ✅ Combat State
  - ✅ Riding
  - ✅ High Speed

- 🎮 Controls:
  
  - In the main Skyrim Controls interface, remap **vanilla quicksave** to any unused key
  - In the SSSO3 MCM, set **Save Shortcut** to `F5`
  - Always use `F5` to save. **Do not** use the Pause Menu save option; that menu does not engage SSSO3's quality protection logic.
  - Do not use either the vanilla or SSSO3 quickload option. If you must reload your game, exit to desktop first and restart Skyrim.

---

## 🧭 Questing

This list includes expansions of many vanilla quests as well as quite a few new ones. Most of these can be explored simply by encountering them through normal gameplay, or you can check the quest list in **Mod Organizer** to see if there's something you want to make a point of seeking out.

### General Advice
- Many new quests will activate **organically** during exploration.
- For guidance or spoilers, you can:
  - Check the installed mod list in MO2
  - Look through the “Quests” category to see what’s been added

<details>
 <summary>List of Major Quests</summary>
Legacy of the Dragonborn<br> 
Dac0da<br> 
Vigilant<br>
Unslaad<br>
Glenmoril<br>
The Tools of Kagrenac<br>
Moon and Star<br>
Wyrmstooth<br>
Olenveld<br>
The Forgotten City<br>
Sirenroot<br>
Project AHO<br>
Heart of the Reach<br>
Sleepwalking Into a Nightmare<br>
Legends of Aetherium<br>
Siege at Icemoth<br>
The Gray Cowl of Nocturnal (10A Edition)<br>
Saints and Seducers Extended Cut<br>
There Is No Umbra Chapter I-III<br>
Penitus Oculatus
</details>

---

### Vicn Questline

The **Vicn series of quests** require more specific preparation and progression. To access this interconnected storyline, follow these steps:

#### DAc0da
To commence this quest you must reach level 25 and complete Yngol's Barrow.

#### Vigilant
To commence this quest you must reach level 25 and complete House of Horrors.

#### Glen Moril
To commence this quest you must complete Vigilant and Discerning the Transmundane.

#### Unslaad
To commence this capstone quest, you must complete the three preceding Vicn quests as well as defeating Alduin.

These quests are large, story-rich expansions with unique environments and mechanics. Approach them when you are ready for long-form, high-difficulty content.

---

### Project AHO

The standard start for AHO is a bit abrupt and can be disorienting to players who aren't expecting it. We have chosen to implement a modified start to prevent this disruptive experience.

When you are ready to start Project AHO, and are level 15 or higher, head to the Braidwood Inn in Kynesgrove. Talk to Iddra the innkeeper; she will have a note for you to investigate a suspicious orc at Mixwater Mill. After reading the note, the mod's storyline will commence the next time you approach the mill.

---

## 🧑‍🎨 Face & Appearance Issues

### Problem: Black Face or Unexpected Tattoos

You may notice:
- Your character's face turns black
- Unwanted or strange facial tattoos appear

These are usually caused by:
- RaceMenu misfires
- Texture or facegen desync

---

### Solution: Vanity Mirror (Preferred)

If you received the **Vanity Mirror** in the starting room:

1. Open your **Inventory**
2. Click on the **Vanity Mirror**
3. This will open **Limited RaceMenu**
4. Press `R` to finalize and confirm your appearance
5. Your character’s face should now display correctly

---

### Alternative Fix: Using Console

If you **did not** get the Vanity Mirror:

1. Press the **`~` key** (tilde, left of `1`) to open the console  
2. Type: `showlimitedracemenu` and press **Enter**  
3. Press `~` again to close the console  
4. Press `R` to finalize your appearance  
5. Hit **Enter** to confirm and exit

Using `showlimitedracemenu` ensures your character’s appearance is refreshed without resetting your race or other critical values. This should correct black face bugs or visual glitches.

---

## 🗺️ Map Marker Issues

### Problem: “I’m at a map marker, but there’s nothing here!”

This is a known issue caused by **Soul Cairn markers** from the Atlas MCM.

---

### Solution: Disable Soul Cairn Markers

1. Open the **Mod Configuration Menu (MCM)**
2. Navigate to the **Atlas** settings
3. Go to the **Atlas Map Markers** section
4. **Disable** the set of markers for the **Soul Cairn**

This will remove the “?” markers from your world map and prevent confusion while exploring.

---

## 🏃 Change Dodge Key

By default, dodging is triggered by tapping your Sprint key. If you want to change this behavior, you’ll need to manually edit the TK Dodge configuration file.

To do this, open Mod Organizer 2, go to the right-hand pane, and navigate to the **Data** tab. Locate the active version of `TK Dodge RE.ini`. Right-click the file and select **Open**.

Inside the file, change the following lines:

`EnableSprintKeyDodge = false`
`Dodge hotkey = [your desired key's scancode]`


Make sure to replace `[your desired key's scancode]` with the actual scancode of the key you want to assign. Note that the scancode link provided in the `.ini` file is outdated. For an accurate list, refer to: https://ck.uesp.net/wiki/Input_Script

---

## 💀 Shadow of Skyrim Death System

**Tomes of Talos** uses **[Shadow of Skyrim - Nemesis and Alternative Death System](https://www.nexusmods.com/skyrimspecialedition/mods/65136)** by default.

Please review the modpage for more detail.

---

## 🗡️ Attacking Innocents

We use Simple Offense Suppression to ensure that you don't accidentally hurt innocent NPCs during chaotic brawls with Miraak cultists or the Sinister Seven. We understand that this can be frustrating when you want to just murder your favorite drinking buddy or send Nazeem to the actual Cloud District; for such moments, just use the SOS MCM to toggle NPC protection off.

---

## ✅ Conclusion

Tomes of Talos is built to be a user-friendly and immersive experience right out of the box. You don’t need to read this entire guide to enjoy the list — it’s here to help answer common questions, smooth out any confusion, and give you a bit of extra insight into how everything works under the hood.

Whether you're a seasoned modlist veteran or totally new to modern Skyrim overhauls, JOJ is designed to feel intuitive, stable, and rewarding from the very first load screen.

If you ever get stuck, want to learn more, or just feel like sharing your adventures, hop into our Discord — we’re always happy to help.

Enjoy your journey, and may your path be clear and orderly.

---

