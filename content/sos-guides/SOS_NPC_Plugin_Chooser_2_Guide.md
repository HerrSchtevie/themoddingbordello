## 🎭 Scrolls of Schtevie - NPC Plugin Chooser 2 (NPC2) Guide

### 📖 Introduction

**NPC Plugin Chooser 2** is a utility created by [**Piranha91**](https://next.nexusmods.com/profile/Piranha91?gameId=1704), available on [Nexus Mods](https://www.nexusmods.com/skyrimspecialedition/mods/157055).

> ⚠️ **Before You Begin**  
This guide is meant as a **quick overview** to help you get started.  
For the full documentation — covering both basic and advanced usage — see the official GitHub guide:  
👉 [**NPC Plugin Chooser 2 – GitHub Guide by Piranha91**](https://github.com/Piranha91/NPC-Plugin-Chooser-2)  

🙏 **Acknowledgement**  
Enormous thanks to [**Piranha91**](https://next.nexusmods.com/profile/Piranha91?gameId=1704) for developing such an amazing tool. NPC Plugin Chooser 2 has transformed how we handle NPC overhauls, turning what used to be a frustrating, error-prone process into something intuitive and reliable.  
If this tool improves your game (and it will), please take a moment to **endorse Piranha’s work on Nexus Mods** — it’s the best way to support the author.  

---

NPC Plugin Chooser 2 allows you to control **which mod provides the appearance of each NPC** in Skyrim.  
When multiple NPC overhauls are installed, they often conflict — leading to mismatched faces, missing headparts, or the dreaded **dark face bug**.  


With NPC2, you can:
- **Mix and match NPC overhauls** — choose your favorite appearance for each character from any installed mod  
- **Avoid conflicts automatically** — NPC2 ensures only one appearance “wins” so your load order stays clean  
- **Prevent dark face bugs** — by generating a single merged plugin, NPC2 keeps faces and headparts consistent  

### 🎯 Why We Use It
The Scrolls of Schtevie lists rely on many appearance overhauls to create a more immersive, visually appealing Skyrim.  
Without a tool like NPC2, these mods would constantly overwrite each other and cause broken NPC visuals.  

By running NPC2:
- We keep the **best appearance options** from multiple mods  
- We ensure NPC visuals remain **stable and consistent**  
- We make the modlist easier to update and maintain without rebuilding merges manually  

In short: **NPC2 is our safeguard against NPC conflicts**, and it allows for maximum flexibility while preserving stability.

---

### 🧑‍🤝‍🧑 NPC Overhauls in Scrolls of Schtevie
All **Scrolls of Schtevie modlists** come preconfigured with the full set of NPC replacers we utilize.  
This makes it much easier for users to:
- **Mix and match NPC appearances** across different replacer mods  
- **Customize or completely overhaul** all NPCs in the game with minimal effort  

Whether you want to swap just a handful of characters or redesign every NPC, NPC2 streamlines the process.

---

## 🚀 Getting Started

---

### 1) Add Your NPC Replacers  

As per our [Rule 11 Guide](/guides/sos-rule-11-guide), you should always maintain your own separator in MO2 for personal mods. This includes NPC replacers and overhauls.

The only reason you’d be running NPC2 is because you downloaded some NPC replacers/overhauls that you’d like to use instead of my choices (how dare you — but I forgive you).

Before doing anything else, download the NPC replacers you want and place them into **your own NPC Overhauls separator** in MO2. Do not put them into the main list’s separators.

(If you need help finding NPC replacers that suit your preferences, https://npcfacefinder.com allows you to view many different replacers at once for any NPC of interest.)

> ⚠️ **Important Notes:**
> - These mods do **not** need to be enabled. NPC2 automatically detects them, so you don’t have to enable them or touch their plugins.  
> - The replacer mods can sit anywhere in the load order, as long as they remain disabled. For proper organization, always keep them in your own NPC Overhauls separator, separate from the core list.  
> - The **NPC Resources** separator in MO2 has a note saying *“Always keep enabled”*. Do not disable or change anything in NPC Resources — leave them alone.  


![image](https://github.com/user-attachments/assets/c394c599-5af3-422d-b972-cc980495eeeb)  

---

### 2) Prepare Your NPC Merge Mod
Since the Scrolls of Schtevie modlists already come with a preconfigured `JOJ - NPC Merge` mod and plugin, you have two options:

1. **Replace the existing merge**  
   - Delete the contents of the previous output located in the `JOJ - NPC Merge` mod under the **Outputs** separator  
   - Build your own merge, making sure the **output path points back to that same mod folder**  

> ⚠️ **Note:** As per our [Rule 11 Guide](/guides/sos-rule-11-guide), this approach is **not recommended**. Creating your own separate output is the preferred method to avoid overwriting core list outputs and to keep your changes isolated.  
  

2. **(Recommended) Create your own NPC Merge mod**  
   - Right-click the **Outputs** separator → **All Mods** → **Create empty mod inside**  
   - Name this new mod (for example: `My NPC2 Output`)  
   - Place your new mod directly **below** the existing `JOJ - NPC Merge` mod  
   - Deactivate the original `JOJ - NPC Merge` mod  

- This way you have a safe backup to revert to as well

![image](https://github.com/user-attachments/assets/d98999e7-c90d-427f-85c1-f0bf4f7d6d8b)  

---

### 3) Setup a Mugshots Folder
Mugshots are preview images of NPCs that make it much easier to choose between different replacer options.  

- You’ll need to collect mugshots for the NPC replacer mods you want to use.  
- Many of these are already available in **community mugshot packs** on Nexus:

   - [SirLach's EasyNPC Mugshot Packs](https://www.nexusmods.com/skyrimspecialedition/mods/74398?tab=description)  
     *Includes mugshots for many major NPC overhauls used in JOJ.*  

   - [Natural Lighting Mugshots (for EasyNPC)](https://www.nexusmods.com/skyrimspecialedition/mods/97595)  
     *Well-lit mugshots with a clean background for a wide variety of NPCs.*  

> 📌 **Note:** Mugshots are optional.  
> NPC2 will work fine without them, but having mugshots makes choosing between multiple NPC appearances **much easier and more user-friendly**.

---

### 🌐 Alternative: NPC Face Finder
If you don’t want to download mugshot packs, you can simply use the website [**NPC Face Finder**](https://npcfacefinder.com/) side-by-side while running NPC2.  
This site provides searchable previews for many NPC overhauls, which can help guide your choices without extra downloads.

---

### 4) Booting NPC Plugin Chooser 2  

Before booting NPC2, you must disable everything in the **Outputs** plugin group, otherwise NPC2 will try to incorporate things in this group. (Disable the Output *plugins*. Do NOT disable the Output **mods**, as this will destroy your plugin order.)

![image](https://github.com/user-attachments/assets/3cc25878-a064-4a23-8cc8-428738eee9ac)  

- Launch **NPC Plugin Chooser 2** from the MO2 dropdown menu.  
- On first launch, you may see an error message about:  
  `RU_CityTreesSE.esm`  
  This can be **safely ignored**. Just click **OK** and NPC2 will continue to load as normal.  


![image](https://github.com/user-attachments/assets/bf37dd52-8a4d-4020-9dd1-53c312f476cd)  

---

### 5) Verify Settings and Paths
After your first boot into NPC2, click the **Settings** tab in the top-left corner.  
*(screenshot)*  

Ensure the following (these values are preconfigured in the Scrolls of Schtevie modlists, but it’s always good to double check):  

**Game Environment Section**  
- **Skyrim Game Data Path:** `YourDrive:\Journals of Jyggalag\Stock Game\data`    
- **Skyrim Version:** `Skyrim SE`    

**Mod Environment Section**  
- **Mods Folder:** `YourDrive:\Journals of Jyggalag\mods`    
- **Mugshots Folder (Optional):** `A:\Mugshots` 
  *(Only needed if you’re using mugshots. Yours will differ depending on setup.)*  

**Output Settings Section**  
- **Output Mod Name:** `My NPC2 Output`   
- **Output Plugin Name:** `My NPC2 Merge`   
- **Patching Mode:** `CreateAndPatch`  
- **Override Handling Mode:** `Ignore`  
- ❌ The rest of the settings can be ignored.  

![image](https://github.com/user-attachments/assets/d0d7eca2-222d-4b39-9d7d-6ff789bd811a)  

---

### 6) Backup & Restore Choices
Once NPC2 has fully loaded, untick **“Show single option NPCs”** and **“Show unloaded NPCs”** to declutter the NPC tab. 

![image](https://github.com/user-attachments/assets/86203f27-bfea-4024-ad49-041c3b497e97)  

My previous selections will **automatically load** in NPC Plugin Chooser 2 — there’s no need to import them manually.  

However, if you’d like to **revert to your old setup** or simply keep a **backup copy** of your selections, a ready-to-use file has been included for you.  

To restore your backup choices:  

- Click **Import My Choices** in the top-right corner of NPC2.  
- Navigate to:  

   ```
   Your Drive:\Journals of Jyggalag\tools\NPC Plugin Chooser\NPC Merge Profile\JOJ - NPC2 Choices.json
   ```

![image](https://github.com/user-attachments/assets/b99adc7a-9a59-4ee4-8732-4a01b9dbacf7)  

- Select `Open`.    

![image](https://github.com/user-attachments/assets/005b44b6-c2d3-4e3c-be83-39718a8b5024)  

- Click **OK** on the confirmation dialog.  

At this point, all of my previously selected NPC choices have been successfully loaded into NPC2.

---

### 7) Making NPC Selections
This is where you can scroll through NPC2 and **pick and choose the replacers you want**. You can change just a follower or two, or overhaul every NPC in Skyrim.  

**Tips:**  
- You can search NPCs by **name** if you already know which ones you want to change.  
- You can also search by **mod** to see which NPCs are affected by a specific overhaul.  
- To select a face for an NPC, just click once on the mugshot (or box) you want.  
  - The box will turn **green** when selected — this means that appearance will be used for that NPC.  

> ⚠️ **Note:** Watch out for NPCs with the *“shared with another NPC”* icon in the top-right corner of their mugshot. Choosing one of these will make them identical twins in your game — unless, of course, that’s what you want. 

![image](https://github.com/user-attachments/assets/a6cf2f15-a2e4-4196-b680-85bb55eb5a2f)  

---

### 8) Exporting Your Choices
Once you’re happy with your selections, it’s a good idea to **save your own .json file**. This makes it easy to make minor edits later without having to reselect a bunch of NPCs from scratch.  

- Click **Export My Choices** in the top-right corner
- Save the .json file wherever you like, with whatever name you prefer  
- ✅ Recommended: Save it in the same location as the preconfigured file for organizational purposes:  
  Journals of Jyggalag\tools\NPC Plugin Chooser\NPC Merge Profile\MyNpcChoices.json  

---

### 9) Run NPC2
Once you’ve made all of your choices and saved your .json file for future edits, all that’s left to do is **run the tool**.  

- Go to the **Run** tab in the top-left corner  
- Click **Run Patch Generation**

![image](https://github.com/user-attachments/assets/c967c405-1edf-4770-9b46-3df61d983335)  
 
- Wait for the process to complete — when it’s finished, you’ll see **“Finished”** at the bottom of the window  
- You can now safely **close NPC2**  

![image](https://github.com/user-attachments/assets/1541e8fd-327b-4285-9406-dc36a27ba17c)  

---

### 10) Organize Your Plugins
Once the merge has been run and you close out of NPC2, refresh MO2.  

- You will now see your `My NPC Merge` plugin at the bottom of the Plugins panel  
- Move this plugin to just **above** the `Lord's Vision (or Performance) - Synthesis Terrain` plugin 
- ⚠️ Note: Your merge plugin may be named differently depending on what you called it  

Additionally, the **Synthesis Character plugin** will most likely have shifted in load order.  
- Move it back so it sits **between** the `Synthesis Terrain` plugin and the `Synthesis Gameplay` plugin

![image](https://github.com/user-attachments/assets/88e397b4-ecd4-46e3-a963-d41fd42b5538)  

---

### 11) Rerun Synthesis
After organizing the plugins, you must **rerun Synthesis** to ensure everything is patched correctly.  

If you need help with this step, refer to the [SOS Tool Running Guide](/guides/sos-tool-running-guide) for detailed instructions.  

---

### 12) 🎉 That’s It!
You’re done!  
Your NPC merge has been built, organized, and patched into your list. From here on out, Skyrim will run with your chosen NPC appearances without conflicts or dark face bugs.  

Enjoy your new characters — whether you’ve tweaked just a few favorites or overhauled the entire game, your changes are now safely in place.  

---

## 🧑‍🤝‍🧑 A Note from Herr Schtevie

Thank you for taking the time to follow this guide and make NPC Plugin Chooser 2 work for you.  
This tool gives you the freedom to tailor Skyrim’s faces and personalities to your taste, while keeping the list stable and free from conflicts.  

⚠️ **Rule 11 Reminder:** By adding your own replacers and generating your own merge, you are modifying the list at your own risk.  
If something breaks, crashes, or looks strange, support may be limited. The team will always try to help, but you are ultimately responsible for maintaining your changes.  

That said — I hope you enjoy bringing your own vision of Skyrim’s characters to life. Thanks again for being part of this project and this community.  

![image](https://github.com/user-attachments/assets/8c8a43ca-872d-42e2-a12e-54e7354669ce)  

— Herr Schtevie  
