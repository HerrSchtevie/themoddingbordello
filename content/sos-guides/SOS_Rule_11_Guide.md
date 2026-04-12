
# A Prepper's Guide to Rule 11 — Scrolls of Schtevie

---

Written by Voice of Order - **Aaronavich**

Edits and additions by fellow Team Members - **Rauty79**, **Guurzak**, **Juntii**, and **BackBeatN**

---

> **Disclaimer:**  
> This guide was originally assembled using **Journals of Jyggalag** as the reference list.  
> While the instructions apply across all **Scrolls of Schtevie** modlists, some screenshots, plugin orders, or plugin numbers may differ slightly between lists. The core process and steps remain the same.

---

## Table of Contents

- [Introduction](#introduction)
- [Preparing MO2](#preparing-mo2)
- [Re-installing / Editing Mods](#re-installing--editing-mods)
- [Adding New Mods](#adding-new-mods)
- [Plugin Placement](#plugin-placement)
- [What Tools Should I Re-run?](#what-tools-should-i-re-run)
- [Disabling and Removing Mods](#disabling-and-removing-mods)
- [Appendix](#appendix)

---

## Introduction

So, you want to introduce a little chaos to order? Read on…

---

## Preparing MO2

We all love customizing our lists, however MO2 is a powerful tool and, if set up correctly, makes nearly anything easily reversible should something go wrong. This is mainly due to it's use of a virtual file system.

Follow these steps to protect yourself and make sure all is reversible!

### Create a Custom Profile in Mod Organizer 2

1. Click the profile drop down menu at the top of the left pane and select 'Manage'

![image](https://github.com/user-attachments/assets/0b537ce6-eb1a-4cdd-bd7e-9065d8103b7c)

2. In the pop-up window select Journals of Jyggalag Lord's Vision (or whatever SOS list you are using)
3. Select copy
4. Name your new profile 'Custom' or something else
5. Click select, close the profiles window.

![image](https://github.com/user-attachments/assets/26d7699c-3fd1-471f-b835-bb273f4585d8)

> ⚠️ **Make sure your custom profile is now selected in MO2!**

---

### Make Your Own Output Folders

When we add or remove mods from the list, tools like synthesis, Pandora and BodySlide usually need to be re-run. We don't want to overwrite the original output or we will corrupt the original profile!

1. Scroll to the bottom of the left pane in MO2 and right click the 'Not yet Installed separator
2. Hover over All Mods
3. Create Empty Mod Inside and name it 'Custom BodySlide Output'

![image](https://github.com/user-attachments/assets/acea7ed5-3f1e-43dd-bffc-54d0f6af9596)

4. Create new mods for all the output folders shown below

![image](https://github.com/user-attachments/assets/4f27c5c2-2308-4ac1-b0bb-f2c771fc480e)

5. Expand the 'Outputs' separator and move each folder directly below the original of the same name and activate

![image](https://github.com/user-attachments/assets/62ef8cae-f048-4a5c-a511-1660bc33f1bf)

---

### Link the Tools to Your Custom Output Mods

By default, all the tools are set to output to the originals or to the overwrite section
We need to change the path to our new ones and deactivate the original output of any tools we are planning to rerun.

![image](https://github.com/user-attachments/assets/94b8903e-1d6e-4948-bb84-288daaa00c4e)

1. Click the gears icon at the top of MO2, this will open the executables window.

![image](https://github.com/user-attachments/assets/0819959c-a2e2-4e09-a6dd-9a2dcb0f3f99)

2. Select the BodySlide tool on the left pane
3. Tick the box next to 'Create files in mod instead of overwrite'
4. Select 'Custom - BodySlide Output'
5. Click apply.

> **Note:** Some of the tools that you have created custom outputs for do not output to their originals and do not make use of 'Create files in mod instead of overwrite'. This is normal for tools like xLODGen and others.
> The main ones you need to set the path for are: **BodySlide, Pandora, Synthesis, and NPC2**.

6. Close the executables window and run BodySlide.

![image](https://github.com/user-attachments/assets/52eb68bb-255c-4f59-bd47-0b44cd2075ca)

7. Open settings

![image](https://github.com/user-attachments/assets/8a440fae-ecd8-475b-8138-7ba9ad9efea4)

8. Expand 'advanced', locate 'Output path', click Browse and select 'Custom – BodySlide Output'. Close Bodyslide.

![image](https://github.com/user-attachments/assets/f5db7576-580a-4fc8-aa6c-6a7a0b45d43f)

9. Lastly, reorder the columns in MO2's left pane: Mod name > Priority > Conflicts.

This will help later on.

![image](https://github.com/user-attachments/assets/5073cfc2-8626-45d1-aa3e-cc982c2db04c)

Congratulations! You have now completed the basic prep, read on to learn best practices for actually adding / removing stuff.

---

## Re-installing / Editing Mods

You may want to re-install a mod to pick different FOMOD options. Creating a new profile does not protect the mods from being overwritten.

**Follow the rules below:**

1. Right click the mod and choose reinstall mod.

2. If the mod does not have install options (FOMOD), you will be greeted with the 'quick install' pop-up.

![image](https://github.com/user-attachments/assets/b35c6456-84da-4716-9036-b6fa8685b675)

3. Rename the mod by adding the prefix 'Custom'

4. If the mod you are reinstalling does have a FOMOD, before choosing new options, select the name field and rename the mod by adding the prefix 'Custom' same as above.

![image](https://github.com/user-attachments/assets/d4559032-5fac-475e-bcfa-45acc64c5927)

Go ahead and change your options.

> ⚠️ **Never merge or replace the original!** There are exactly 0 good reasons to do this and it will corrupt the original profile you copied!

5. Once renamed and installed, locate the original version of the mod and make a note of the priority number in the second column of the left pane.

![image](https://github.com/user-attachments/assets/5abaa118-3444-4f00-b2ac-f478e025dad7)

6. Now locate your renamed version at the bottom of MO2 and set it's priority so that it will sit directly below the original.

![image](https://github.com/user-attachments/assets/1d7246b5-1d61-45c7-bbd4-980f0e786fd4)

**Warning** - Do not use the filter box in the left pane and/or drag mods up through your mod list, it is very easy to place your mod incorrectly doing this.

7. Once in place, activate your new mod BEFORE deactivating the original, this will ensure that the plugin load order is preserved!

![image](https://github.com/user-attachments/assets/517f2c15-8c0c-46f0-b30c-6751ac5aa6f5)

8. De-activate the original version of the mod and leave it in place.

> 📌 **Note:** Always check the bottom of the Plugins tab (Right pane of MO2) and check if any new plugins have appeared, if there are and you weren't expecting this then it is best to carefully consider what changes you've made before proceeding to edit the load order.

---

## Adding New Mods

This section is a bit more involved but will only cover generically applicable rules for all additions you might want to make.

A 10-page guide could be written for this section alone, so this is not exhaustive and won't go into what types of mods are safe to add and what aren't.

You can ask in Rule 11 chat and maybe a kind Priest or Crusader will give you assistance.

### Simple Rules to Help Keep You Right

1. Use the search function in discord! Someone may have already added the mod you want and there may be useful info to digest before proceeding!

![image](https://github.com/user-attachments/assets/71200222-ad44-4417-a906-346b86a339e6)

2. Create a new separator at the bottom the left pane of MO2 and name it 'Newly added'. You can do this by clicking the (small) wrench and screwdriver icon where we went to refresh MO2 earlier in this guide.

![image](https://github.com/user-attachments/assets/e6a75942-284a-4158-bd8d-c5ef74e6455d)
![image](https://github.com/user-attachments/assets/2e3c582c-a71a-4ab5-a144-cfa8d5ee1f4a)

3. Read the Mod Page! Check requirements, find compatibility sections and read them carefully! Check for pins in the comments section. Make sure as best you can, that the mod you want to add is compatible with the list.

![image](https://github.com/user-attachments/assets/a8f9a677-ee3b-4e74-93e4-0aae0568bc26)

4. Check the 'bugs' section! If a mod has hundreds of bug reports, it is a good bet that it has problems. However, many excellent mods have proven over time to be perfectly stable and yet still get bug reports because… 'humans with computers'. Common sense judgement calls are required.

5. Once you've downloaded and installed your mod, activate it but don't move it yet!

![image](https://github.com/user-attachments/assets/e2d4d2a3-547b-438c-9812-2e59720ea03b)

6. Double click the mod in the left pane and make use of the various tabs to examine the mod, there is so much useful information here to help guide you.

![image](https://github.com/user-attachments/assets/f721505f-a4f3-45b3-8bb3-f158974e38b7)

7. Navigate to the conflicts tab in the same pop-up window. There are three sections here, familiarize yourself with them and make a note of what files your new mod is overwriting (if any). It may also be getting overwritten if your new mod contains BSA (archive) files (loose files always overwrite BSA's regardless of load order)

Pro tip - MO2 has the ability to display conflicts within BSA's if you tick the box beside 'enable archive parsing' in the 'workarounds' section of MO2's settings.

![image](https://github.com/user-attachments/assets/16299e4c-789f-473c-b316-b8b69bd7ebac)

8. Now you need to engage your grey matter- are the files your mod is overwriting what you were expecting it to? You need to figure out where to place your new mod and if it is even compatible!

9. If you've decided to keep the mod, then in general, I recommend creating your own separators for all your additions even if they would logically belong in one of the original separators, the only exception to this is if you MUST place your mod between two mods within the same section to avoid unwanted overwrites.

10. You'll have to use discernment here to decide where to place it or ask in the applicable rule 11 chat if you're unsure!

11. Select a standout colour for your separators by right clicking it > select colour. This will make your custom sections stand out for convenience.

![image](https://github.com/user-attachments/assets/fe6cefa7-d44a-400c-973e-46d484fadc2a)

12. If your new mod contains a plugin/s then you must always run synthesis again unless you really know what you're doing (but then you wouldn't be reading this guide!) so just do it (once you've finished reading the rest of the guide first).

There is so much more to cover here but the scope of this guide is limited so I'll leave it there. To learn more, consult your friend- the interwebs.

---

## Plugin Placement

**Do Not Run Loot** to sort your added plugins! Hand place your mod additions yourself instead! This modlist has a carefully crafted plugin order which LOOT will disrupt.

Unless you are making sweeping changes to the list, it will usually be best to keep your mods and their plugins in a dedicated My Mods group just above the Outputs section in both panes.
<img width="1191" height="275" alt="image" src="https://github.com/user-attachments/assets/c439929e-9c8c-438b-932f-5e97dcf41c40" />

The principal exception to this is **adding NPC replacers** and you do *not* intend to rerun NPC2, in which case your new mods and plugins should be placed in the Outputs section and sorted *below* the NPC Merge, but *above* the Synthesis in both the left and right panes.

In General the best thing you can do is- [learn to use xEdit](https://www.youtube.com/watch?v=cKU_R1Hqa4o&ab_channel=Swissenergy). There are really no shortcuts here, if you want to be sure where your added plugins should go or if they are even safe to use at all then you'll need to learn the basics of xEdit, but if you aren't inclined to put the time in then use common sense and position the plugin similarly to where you've positioned the mod folder in the left pane.

---

## What Tools Should I Re-run?

> ⚠️ **Non-exhaustive! Use common sense!**

**Official SOS GitHub Guide on re-running Tools:**
[SOS Tool Running Guide](/guides/sos-tool-running-guide)

**Bodyslide**
Armour / Clothing / equipment / hair / added followers / 'attachment' mods

**Pandora**
Anything that adds or changes animations. (OAR / DAR animations usually don't require it but it only takes a couple of minutes so just do it anyway and save yourself an occasional reboot!

**Synthesis**
Anytime you add/remove/replace or update a mod that contains a plugin

**NPC Plugin Chooser 2**
Anytime you add/remove/replace or make changes to NPC replacer mods
[NPC2 Guide](/guides/sos-npc-plugin-chooser-2-guide) 

**XLODGen / TexGen / DynDOLOD**
Mods that add or remove stuff to the exterior world space (Check in Xedit)
Town or city overhauls
New player homes or buildings in general
Added world spaces from DLC sized mods

**ParallaxGen**
Armour / Clothing / Equipment etc
Environmental textures- town overalls etc
If you are re-running DynDOLOD, probably re-run this

> 📌 **Note:** Before re-running a tool it is best practice to deactivate the output folders of tools that are lower down in the order (reference the mod load order in the outputs section of the left pane). Usually it is sensible to delete the contents of the output folder for the tool you are about to re-run beforehand.

> ⚠️ **Ensure that the tool is set to output to YOUR output folder and not the original Output!**

> **Caution:** When you reactivate DynDOLOD output, the plugins can sometimes be in reverse order. Ensure Occlusion.esp is below DynDOLOD.esp at the bottom of your load order.

---

## Disabling and Removing Mods

In general, just don't disable mods, if there is something you want to remove from your game then ask for help from a Crusader or Arbiter

Where possible, always use MCM settings to disable mods instead of removing/disabling in MO2!

> ⚠️ **Warning:** Removing a mod entirely removes it for ALL PROFILES and will invalidate your original install. There is never a good reason to remove a mod!

That concludes the Rule 11 Guide, those that follow it have the best chance of success and make the job of our support team far easier. If you are asking for help from them, feel free to mention that you followed this guide.

---

## Appendix

[Reading Crash Logs](https://www.reddit.com/r/skyrimmods/comments/1d0r0f0/reading_crash_logs/)


[xEdit - How to check for conflicts between mods](https://www.youtube.com/watch?v=cKU_R1Hqa4o)


[xEdit - Simple Conflict Resolution](https://www.youtube.com/watch?v=WSZviB4jqE8)


[Walkthrough of Conflict Resolution and 3D Space Patching](https://www.nexusmods.com/skyrimspecialedition/mods/37651)


[Bodyslide Quick Start Guide](https://youtu.be/zil1RwoW3OE)


[Outfit Studio Tutorial Series](https://youtube.com/playlist?list=PLrGqMZcWJgElCxyW6GnIlt9HAeeSFlkDI&si=ilug2phlIs7LF1rk)


[Creation Kit Basics](https://www.youtube.com/playlist?list=PLD5AA9F15CAA68B07)


[A TLDR on Immersive Equipment Displays](https://wiki.wildlandermod.com/11Deep-Dives/Immersive-Equipment-Display/)


---

Happy Rule 11 Modding,

Aaronavich & the SOS Support Team
