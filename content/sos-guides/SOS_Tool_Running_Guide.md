## 🛠️ Tool Running Guide – Scrolls of Schtevie Modlists

---

This is the **complete guide** to running your tools on the **Scrolls of Schtevie** modlists.

This guide walks you through **how to run all tools**, but not all of them need to be run **every time** you make changes. Below is a summary of when and why each tool should be run:

---

<a id="top"></a>

## 📚 Table of Contents

- ⚠️ [Disclaimer – Read This First](#disclaimer)
- 🗂️ [Tool Overviews](#summary)
- 🧵 [Step 0: Run BodySlide](#bodyslide)
- 🕺 [Step 0.5: Run Pandora](#pandora)
- ⚙️ [Step 1: Run Synthesis](#synthesis)
- 🔧 [Step 1.5: VRAMr Output](#vramr)
- 🧱 [Step 2: Run ParallaxGen](#parallaxgen)
- 🌄 [Step 3: Run xLODGen](#xlodgen)
- 🌾 [Step 3.5: Grass Cache (Optional / Advanced)](#grass)
- 🧵 [Step 4: Run TexGen](#texgen)
- 🧠 [Step 5: Run DynDOLOD](#dyndolod)
- ✅ [Conclusion](#conclusion)

---
<a id="disclaimer"></a>

## ⚠️ Disclaimer – Read This First

> This guide was originally assembled using **Journals of Jyggalag** as the reference list.  
> While the instructions apply across all **Scrolls of Schtevie** modlists, some screenshots, plugin orders, or plugin numbers may differ slightly between lists. The core process and steps remain the same.

Adding any mods to **Scrolls of Schtevie Modlists** falls under **Rule 11**:  
You are modifying the list **at your own risk**.

While we're happy to try and assist in the Discord, the team is **not obligated** to troubleshoot issues caused by your additions or changes.

The Scrolls of Schtevie Modlists are **complete modlists**.  
By making alterations, you accept that:

- Everything this guide explains is **not recommended** unless you have prior modding experience or are willing to experiment and learn on your own.
- **You are solely responsible** for anything you break while making modifications.
- If you choose to alter the list, you accept that **you may break your install**, and it's up to **you** to fix it or re-install and start from scratch.

Proceed with caution. You have been warned.

---
<a id="summary"></a>
<h2 class="visually-hidden">Tool Overviews</h2>

<details>
<summary>📚 Tool Overviews</summary>

#### 🧵 BodySlide
  - **When to run:** After adding or updating any **armor or clothing mod** (including replacers).  
  - **What it does:** Builds the 3D meshes for armors and clothing based on your chosen body type and preset.  
    - In any SOS list, you must use the **Zeroed Sliders preset** so OBody can apply morphs correctly.  
    - Ensures male armors match the **HIMBO Body - SOS** and female armors match the **CBBE 3BBB Body Amazing**.  
  - Without running BodySlide, newly added armors will appear **invisible in-game**.
#### 🕺 Pandora
  - **When to run:** After **adding or removing any animation mod** — including locomotion, idle, combat, OAR animations, or MCO/DAR-based behavior changes.  
  - **What it does:** Compiles behavior data and animation bindings into a functioning output using OAR (Open Animation Replacer). Ensures animations play correctly in-game by linking conditions, behaviors, and transitions into a single cache.

#### ⚙️ Synthesis
  - **When to run:** After adding gameplay mods, appearance overhauls, perk overhauls, combat mods, or other systems that use Synthesis patchers (really after adding/removing anything at all).  
  - **What it does:** Automatically generates compatibility patches for things like perks, spells, leveled lists, appearance, high-poly head, terrain, and more, depending on the patchers active for your profile.

#### 🔧 VRAMr (Optional)
  - **When to run:** Before running **ParallaxGen** or **xLODGen** if you are using the **Performance profile**.  
  - **What it does:** Generates optimized texture atlases to reduce VRAM usage, improve performance, and lower stutter without sacrificing major visual fidelity.

#### 🧱 ParallaxGen
  - **When to run:** After adding or removing **parallax-enabled textures** or **meshes** (terrain, architecture, armor, clutter, etc.).  
  - **What it does:** Generates height data files used by parallax shaders to create a 3D illusion of depth on **nearby surfaces** like stone walls, roads, cliffs, or ground textures.

#### 🌄 xLODGen
  - **When to run:** After adding or removing worldspace-affecting mods (like new landmasses or city overhauls) or landscape textures.  
  - **What it does:** Generates the terrain LOD meshes and textures for worldspaces (LOD4, 8, 16, 32), allowing you to see distant terrain.

#### 🌾 Grass Cache (Optional)
  - **When to run:** Only if you have added or removed major **landscape/worldspace mods** or changed grass INI settings.  
  - **What it does:** Pre-generates grass placement data for consistent visuals and improved performance. Ensures grass matches the terrain in both nearby and distant views.

#### 🧵 TexGen
  - **When to run:** After adding or removing any mod that affects landscape textures, tree models, lighting, weather, or object appearances **that you want represented in LODs**.  
  - **What it does:** Generates texture and normal map data used **exclusively by DynDOLOD**. TexGen must be run before DynDOLOD so distant objects have the correct lighting, shading, and texture data in the final LOD output.

#### 🧠 DynDOLOD
  - **When to run:** After running TexGen, and after **any** change to worldspace (like buildings, trees, city overhauls, or anything that modifies what's visible in the distance).  
  - **What it does:** Creates the dynamic LODs for all objects in the game world — trees, cities, distant clutter — and ties it all together for smooth performance and visuals.


---

You'll find detailed, step-by-step instructions for each tool below — including how to set them up properly for each profile and how to avoid common errors.

These tools **build off one another in a specific sequence**, and must be run in the **order listed above** for everything to function correctly.
  
If you're unsure, just follow the guide **step-by-step, top to bottom** — it's written in the exact order you should run each tool.

</details>

---

<a id="bodyslide"></a>
<h2 class="visually-hidden">🧵 Step 0: Run BodySlide (Only if Using Custom Armors)</h2>

<details>
<summary>🧵 Step 0: Run BodySlide (Only if Using Custom Armors)</summary>

This step is required if you've **added your own armor or clothing mods** to JOJ.  
If you don't build them in BodySlide, they will appear **invisible in-game**.  
If you haven't added any custom armors, you can **skip this step** and move on.

---

#### ⚙️ 1. Open BodySlide

- Launch **BodySlide** from the **MO2 executable dropdown**.

![image](https://github.com/user-attachments/assets/0aff9d36-4fd4-49ab-868b-6071a5fbce32)

---

#### 🛠️ 2. Configure Output Path

- In the bottom right, click **Settings → Advanced**.
- Set the **Output Path** to match the correct mod folder:  

  - `JOJ - BodySlide Output` *(default)*  
  - If you are following the [SOS Rule 11 Guide](/guides/sos-rule-11-guide), you should have created your **own BodySlide Output** folder to overwrite mine. Use that instead.

![image](https://github.com/user-attachments/assets/362d61df-6cfa-4ece-b31b-a35d9447118b)

> 🔑 **Important:** If your output path is wrong, your armor will not show up in-game.

---

#### 🔍 3. Clear Filters

- In the **top-right corner**, remove any filters so all outfits are visible.

---

#### 🧍 4. Select the Correct Body

- For **female armor**: choose `CBBE 3BBB Body Amazing` for the Outfit/Body, and `- Zeroed Sliders -` for the Preset  

![image](https://github.com/user-attachments/assets/1cb617ed-96c8-48da-bfb6-42ff6660cc47)  

- For **male armor**: choose `HIMBO Body - SOS` for the Outfit/Body, and `HIMBO Zero for OBody` for the Preset  

![image](https://github.com/user-attachments/assets/8ac8b671-d4de-4be0-b6a2-9cfa972ed53a)  

- Why do we set the **Preset** to: `- Zeroed Sliders -` or `HIMBO Zero for OBody`  

> 📝 This is **essential** for OBody to function correctly in any SOS list.  
> Do not use any other preset unless you know exactly what you're doing and are choosing not to use OBody.

---

#### 📂 5. Select Groups

- Click the **Choose Groups** button (next to Outfit/Body selector). For this guide, I will be using the "Girl's Travel Outfit" as an example.  

![image](https://github.com/user-attachments/assets/468002ad-b541-4711-8a68-d82a83ef7325)  

- Check the boxes for any new outfits you added.  

![image](https://github.com/user-attachments/assets/534e5b6f-45f8-4a1a-bab9-89f059c66453)  

- If you can't find them, use **Filter Outfits** and type part of the armor's name.

![image](https://github.com/user-attachments/assets/55f73637-4184-4f89-b123-b5df01ca6b68)    

---

#### 🏗️ 6. Batch Build

- Click **Batch Build** in the bottom left.
- In the pop-up window:  
  - ✅ Make sure **all the armors that you want to build** are checked.  
  - Make sure the `meshes` box and the `Build Morphs` boxes are checked in the bottom left. 
  - Click **Build**.

![image](https://github.com/user-attachments/assets/019895ec-1383-4af4-96e0-13a92a3d996a)

---

#### ✅ Completion

Once finished, BodySlide will output meshes to your configured folder:  

```
Custom - BodySlide Output
```

*(or whatever you named your custom BodySlide output when following the Rule 11 guide).*

Your custom armor mods should now appear **properly in-game** — no more invisible armors! 🎉

> 🔄 **Don't forget to refresh MO2** after running BodySlide so the new output is recognized properly.

That's all there is to it — you've successfully built your custom armor and clothing into the game.  
From here on, you only need to **re-run BodySlide** if you:

- Add new armor/clothing mods 🛡️  
- Update an existing armor/clothing mod 🔄   

Otherwise, you can safely move on to the next tool in the guide.  
Your characters are now fully dressed and ready for adventure! 🗡️👗

</details>

---

<a id="pandora"></a>
<h2 class="visually-hidden">🕺 Step 0.5: Run Pandora (Only if Using Animations)</h2>

<details>
<summary>🕺 Step 0.5: Run Pandora (Only if Using Animations)</summary>

This step is only required if you're **adding or removing animation mods** in JOJ — including OAR, MCO, DAR-based movement, combat, or idle animations.  
If you haven't changed any animations, you can **skip this step** and proceed directly to **Step 1: Synthesis**.

---

#### 🧹 1. Clear Old Pandora Output

- In **MO2**, scroll down to the `Outputs` separator.
- Locate the mod:  
  `JOJ - Pandora Output`
- Right-click > **Open in Explorer**
- **Delete everything** inside this folder.

---

#### ⚙️ 2. Open Pandora Behavior Engine+

- Launch **Pandora Behavior Engine+** from the **MO2 executable dropdown**.

---

#### ☑️ 3. Select All Patchers

- In the **top-left corner**, check the box labeled **Select All**.

![image](https://github.com/user-attachments/assets/ad25c912-3ced-4539-afa4-ea37efa79102)

---

#### ▶️ 4. Click Run

- Click the **Run** button at the **bottom of the window**.

---

#### 📁 Output

By default, Pandora is configured to output to:

```
JOJ - Pandora Output
```

![image](https://github.com/user-attachments/assets/4a57a161-0d81-4dd7-866b-f93aafd83a34)

This is already set correctly for JOJ and does **not** need to be changed.  
However, if you want to change the output location, you can do so by editing the executable settings in MO2 — though this is **not recommended** unless you know exactly what you're doing.

---

#### ✅ Completion

Once Pandora finishes generating the behavior data, you'll see a message at the bottom of the window that says:

> **"Launch finished in (X) seconds"**

![image](https://github.com/user-attachments/assets/a4bf97e5-a311-46f1-8d76-3187f64ba989)

You're good to **close Pandora** at this point.

> 🔄 **Don't forget to refresh MO2** after closing Pandora so the output is recognized properly.

</details>

---
<a id="synthesis"></a>
<h2 class="visually-hidden">⚙️ Step 1: Run Synthesis</h2>

<details>
<summary>⚙️ Step 1: Run Synthesis</summary>

Each **Journals of Jyggalag** profile uses a prebuilt Synthesis configuration.

**Supported Profiles:**
- `Lord's Vision` – Full experience  
- `Performance` – Lower fidelity, same content  

---

#### 🧭 Steps

1. Open **Synthesis** from the MO2 dropdown.

![image](https://github.com/user-attachments/assets/8dd42abb-231d-4e96-8df9-77b02ab1ff24)

2. In the **top-right corner**, click the **profile**.

![image](https://github.com/user-attachments/assets/00fbcd9f-d797-4df3-9701-381cb96c6047)

   From the list, select the profile that matches your current MO2 profile:
   - `Lord's Vision`
   - `Performance`

![image](https://github.com/user-attachments/assets/924a565a-6ee5-49c2-8c46-9c6a9a70d920)

3. Once you have selected your profile, click the left arrow at the top left of the screen to return to the main window, then click the **Run** button in the **bottom-left corner**.  
   Synthesis will now execute all patchers relevant to your chosen profile.
<img width="1050" height="663" alt="image" src="https://github.com/user-attachments/assets/d25c391b-27cb-42ef-bbd2-40c7d0adaa64" />


4. When complete, you'll see **"Complete"** in purple text at the top-left corner.

![image](https://github.com/user-attachments/assets/95153c12-8ecf-4ffc-bd30-377fad04ffbf)

5. You can now **close Synthesis**.

---

#### ❗ Troubleshooting

If you receive a **blocking error** when launching or running Synthesis:

1. Wait. It's normal to see temporary blocking errors during app initialization. These should clear up in 2 minutes or less.
2. Close Synthesis and try again.  
3. If the issue persists, it's typically caused by **Windows permissions** and is **not** related to Synthesis or JOJ.

**Recommended Fixes:**
- Run **MO2 as Administrator** and try again.
- Reboot your PC to clear temp/cache files and try again.
- Ensure .Net 8 and .Net 9 are installed and updated, and .Net 10 is NOT installed. 

</details>

---
<a id="vramr"></a>
<h2 class="visually-hidden">🔧 Step 1.5: VRAMr Output (Recommended for Performance Users)</h2>

<details>
<summary>🔧 Step 1.5: VRAMr Output (Recommended for Performance Users)</summary>

This step is **optional** if you want to increase the overall performance of the list.  
However, it is **absolutely mandatory** if your PC specs are **below the recommended minimum** listed in the Readme of whichever SOS list you are using.

VRAMr generates optimized texture atlases to reduce VRAM usage, improve performance, and lower stutter.  
If your specs meet or exceed the recommended, you can skip this step, but it will still help with performance regardless.

---

#### ⚠️ Notes

- If you are going to **run VRAMr**, do so *before* running **ParallaxGen** 
- The **VRAMr Output** mod must be **disabled** while running:
  - ❌ ParallaxGen
  - ❌ xLODGen
  - ❌ TexGen
  - ❌ DynDOLOD

- After all tools are finished, you may **enable the VRAMr Output** for normal gameplay.

---

✅ If you're not generating a custom VRAMr output, skip this step and move on to **ParallaxGen**.

---

#### 📂 1. Select Profile in MO2, then launch VRAMr.

- In **MO2**, make sure you have the correct **JOJ profile** selected before running VRAMr.
- From the **MO2 executable dropdown**, select **VRAMr**.  
- Click **Run**.

![image](https://github.com/user-attachments/assets/cf8768dc-ad91-4f5c-aa10-b73c85a5c1af)  


---

#### ▶️ 2. Select the Stock Game folder.

- Choose option 2 to find your Skyrim location
- Then browse to the modlist folder and select the Stock Game folder within it. Click OK.

<img width="921" height="594" alt="image" src="https://github.com/user-attachments/assets/4db31307-633f-4ccb-b2d3-08b173c312ce" />


---

#### 🅿️ 3. Choose Optimization Preset

- When prompted, type **`P` for Performance preset**.  
- This is the recommended setting for JOJ Performance.  

![image](https://github.com/user-attachments/assets/24248cb1-399e-4899-a43b-8fc45c948a7b)  

---

#### 💾 4. Select Temporary Working Drive

- Choose a **drive root** (e.g., `D:\` or `E:\`) with **at least 260 GB of free space**.  
  - ⚠️ Must be the **root of the drive**, not a subdirectory.  
  - Space is only required during processing; the final output will be **15–30 GB**.

💡 **Tip:** If you're low on space, consider temporarily deleting your **Wabbajack Downloads** folder.

![image](https://github.com/user-attachments/assets/9ea9050c-9ff9-4143-a8c9-5789b91325b7)  

---

#### 📁 5. Select Profile Directory

- Point VRAMr to the **profile directory** of the JOJ profile you are running.

![image](https://github.com/user-attachments/assets/d8004268-79fc-4c06-bf9c-f09b648eda01)  

---

#### ⏳ 6. Let It Run

- **Do not use your PC while VRAMr is running.**  
- Depending on your system, this may take several hours.  
- Best practice: start it before bed and let it run overnight.  
- Doing other tasks during the process can cause **corrupted output**.

---

#### 🏁 7. Finish Process

- Once VRAMr completes, it will prompt:  
  > *Press any key to close…*  
- Hit a key and the window will close.

---

#### 📦 8. Prepare Output

- Navigate to the **VRAMr folder** on the drive you specified.  
- Rename the `dragndrop` folder to:  

  ```
  VRAMr Output
  ```

![image](https://github.com/user-attachments/assets/92e310c3-ee79-43ae-bc78-c713f98e3c2a)  

---

#### 📥 9. Add to MO2

- Drag `VRAMr Output` into **MO2**.  
- Place it in the **Outputs section**, just above `JOJ - ParallaxGen Output`.  
- ✅ Check the box to enable it.

![image](https://github.com/user-attachments/assets/ecfe29ab-6110-421b-9895-fe9ee969caca)  

---

#### 🔄 10. Tool Stack Integration (Optional)

- **If you are running the LOD tool stack after this**, note that you should keep the VRAMr output *disabled* until you have finished with the rest of the tools. 

- Only proceed to the rest of the guide if you have a specific reason to do so; it is not beneficial to rerun the full stack just because you ran VRAMr.

---

#### ✅ Completion

- Once all tools are done, return the MO2 **application dropdown** to: 

  ```
  Journals of Jyggalag
  ```

![image](https://github.com/user-attachments/assets/98466317-007a-497f-ad0c-d6c5633e8603)  

- You're ready to keep modding or jump into the game! 🎉

From here, you only need to **re-run VRAMr** if you:  
- Update the list after a major update is published
- Add a large number of **new texture-heavy mods** 🖼️  
- Need to lower VRAM usage on a system below minimum specs 🖥️  

Otherwise, you can safely move on to the next tool in the stack.  
Your game should now run **smoother, with fewer stutters and lower VRAM load**. 🚀 

---

#### 🛠️ Troubleshooting

- If you encounter unexpected errors running VRAMr:  
1. Open **Windows Terminal Settings**.  
2. Ensure the **Default Terminal Application** is set to **Windows Console Host**. 

![image](https://github.com/user-attachments/assets/a29a6499-7f06-4100-ba39-37cf5016f5cc)  

---

If your VRAMr output is hundreds of GB instead of a couple dozen, it's very likely that a part of the optimization process was blocked by Windows Smart App Control. To disable this "helpful" "security" "feature":

* Press the Windows key and type Settings, then click Open.,
* Navigate to Privacy & security from the left-hand menu.,
* Under Security, click on Windows Security.,
* Select App & browser control in the Windows Security window.,
* Click on Smart App Control settings under the Smart App Control section.,
* Choose Off to disable Smart App Control.,
* Confirm the action by selecting Yes, I'm sure in the pop-up menu.

</details>

---
<a id="parallaxgen"></a>
<h2 class="visually-hidden">🏔️ Step 2: Run ParallaxGen</h2>

<details>
<summary>🏔️ Step 2: Run ParallaxGen</summary>

> ⚠️ Before you run ParallaxGen, follow these steps carefully.

---

#### 🔻 1. Disable Existing Outputs

In **Mod Organizer 2**, scroll to the bottom of the left panel and locate the `Outputs` separator.  
**Disable** the following mods:

- `JOJ - Grass Cache (Your Profile)`
- `JOJ - xLODGen Output (Your Profile)`
- `JOJ - TexGen Output (Your Profile)`
- `JOJ - DynDOLOD Output (Your Profile)`

![image](https://github.com/user-attachments/assets/48ff007c-b863-4c6f-ab28-b206206f74bb)


✅ Keep `JOJ - TexGen Output (Your Profile)` and `JOJ - DynDOLOD Output (Your Profile)` disabled even after the ParallaxGen step is complete.

---

#### 🧹 2. Clear Old Output Files

1. **Delete the contents** of the existing output mod folder:
- In MO2, right-click on `JOJ - ParallaxGen Output (Your Profile)` and choose **Open in Explorer**
- Delete **all files inside** this folder

---

#### ▶️ 3. Run ParallaxGen

1. Open **ParallaxGen**.
2. In the **Profile** dropdown, make sure the profile you're currently using is selected.
3. Depending on your profile:
   - For `Lord's Vision` (ENB-enabled):  
     ✅ **Check** the box **"Fix Mesh Lighting (ENB ONLY)"** in the top right.
   - For `Performance` (no ENB):  
     ❌ **Leave this box unchecked**.
4. In the **Output** field, choose a destination folder.  
   > 📁 It's recommended to create a folder like `Journals of Jyggalag - Outputs\ParallaxGen Output` on the same drive as your installation to keep things organized.
5. ⚠️ **Do not check** the box for **"Zip Output"**.  
   While it won't break anything, it will make it more difficult to manually copy the generated files later.
6. Click **Start Patching**.
7. Let the process run until **complete**.

![image](https://github.com/user-attachments/assets/de2d83bb-164f-4893-89f2-ea4a0c91505f)

8. You will see the following steps as PG runs. When you get the popup asking for `Set Mod Priority`, just click "Okay".

![image](https://github.com/user-attachments/assets/dc481c03-177b-4253-87e2-074a77057508)  
![image](https://github.com/user-attachments/assets/13332f68-8096-48e5-947b-98ae895441d8)  
![image](https://github.com/user-attachments/assets/b7478cd1-6fac-42c8-80b8-fcefb98c5f35)  
![image](https://github.com/user-attachments/assets/23f5ba5d-01cf-4ef6-a828-88c8be025957)  
![image](https://github.com/user-attachments/assets/17bac67b-0e2b-4564-8d72-f61f45a95252)  
![image](https://github.com/user-attachments/assets/ea46d1ed-0373-45e0-97df-3c749c5ff3b8)  

> 💬 **Note:** You may see warnings — that's perfectly fine. As long as ParallaxGen finishes without a critical error, you're good to go.

---

#### 📦 4. Move the Output to MO2

Once ParallaxGen finishes, you must manually move the generated files into the correct mod folder.

1. Navigate to wherever you told ParallaxGen to Output the data:

Your Drive:\Journals of Jyggalag - Outputs if you're following along exactly


2. Inside, you'll find these files

![image](https://github.com/user-attachments/assets/1d68a23d-766e-4bd4-b8af-9160fe550e98)
   
- Cut and paste the contents of the output folder into the folder below:
  ```
  Journals of Jyggalag\mods\JOJ - ParallaxGen Output (Your Profile)
  ```

3. Back in MO2, click the **Refresh** button so it detects the new files

4. **Enable** the `JOJ - ParallaxGen Output (Your Profile)` mod in the left panel

---

#### 📜 5. Sort Plugins Correctly

In the **right-side Plugins tab** of MO2:

- Scroll to the bottom under the `Outputs` section
- Find and move these plugins **under** `Your Profile - Synthesis Patchers`:
- `ParallaxGen.esp`
- `PG_1.esp`

![image](https://github.com/user-attachments/assets/119102c2-79c2-48c5-8bf8-f56d9550e426)

You're now ready to move on to the next tool!

</details>

---
<a id="xlodgen"></a>
<h2 class="visually-hidden">🌄 Step 3: Run xLODGen</h2>

<details>
<summary>🌄 Step 3: Run xLODGen</summary>

> ⚠️ This tool must be configured correctly for all four LOD levels (LOD4, LOD8, LOD16, LOD32).

> 📸 I've included two screenshots for **each** LOD level below — one for Lord's Vision and one for Performance. Please double-check the title above each image to ensure you're using the correct settings for the profile you're configuring.

---

#### 📁 1. Output Location

By default, xLODGen will save its output to:

```
YourDrive:\Journals of Jyggalag - Outputs
```

This is already pre-configured in **MO2 > Modify Executables**, but you can change it if needed.  

![image](https://github.com/user-attachments/assets/62575a96-91b2-4e74-9803-d61e5f5d8eb7)

---

#### 🔛 2. Enable Required Resource

In **Mod Organizer 2**, scroll to the `Outputs` separator and **enable**:

- `xLODGen Resource - SSE Terrain Tamriel`

![image](https://github.com/user-attachments/assets/199c2905-0e07-4926-8958-6d7450fb1ef5)

This is required for proper terrain LOD generation.

---

#### 🧭 3. Configure Each LOD Level  
Check all worldspaces in the left panel (right-click > **Select All**)

---

#### 🔹 LOD4 Settings
- **Lord's Vision**

![image](https://github.com/user-attachments/assets/f8342944-4aac-4e44-9070-a5de883a74f3)

- **Performance**  

![image](https://github.com/user-attachments/assets/e685caab-5760-4554-a173-2c631ccc13df)

---

#### 🔹 LOD8 Settings
- **Lord's Vision**  

![image](https://github.com/user-attachments/assets/a96541f1-18bb-4d64-901f-3db691ae8fb7)

- **Performance**  

![image](https://github.com/user-attachments/assets/3eaf00e7-8400-4012-bc2e-22581909ea13)

---

#### 🔹 LOD16 Settings
- **Lord's Vision**  

![image](https://github.com/user-attachments/assets/00738425-81a7-47b2-9e81-1f23054499a8)

- **Performance**  

![image](https://github.com/user-attachments/assets/2aa518a3-978d-459e-8ac4-13940d14410b)

---

#### 🔹 LOD32 Settings
- **Lord's Vision**  

![image](https://github.com/user-attachments/assets/0b617d8f-053a-46f1-84fa-5bc6b2d9067f)

- **Performance**  

![image](https://github.com/user-attachments/assets/4b3e75b9-5e44-44a2-a611-3ecd8a82e082)

- Once the desired settings are configured for **all four** LOD levels, click **Generate** and allow the tool to run.

---

#### 📁 4. Move the Output to MO2

After the LOD levels have been generated, your files will be located in:

`Journals of Jyggalag - Outputs\xLODGen Output\`


1. Navigate to the following folder:

    ```
    Journals of Jyggalag\mods\JOJ - xLODGen Output (Your Profile)
    ```

2. **Delete everything inside this folder** to ensure no remnant files remain  
3. Now open:

    ```
    Journals of Jyggalag - Outputs\xLODGen Output\
    ```

4. Locate the `meshes` and `textures` folders (these should be the only files present)  
5. Copy both folders into the `JOJ - xLODGen Output (Your Profile)` mod folder  
6. Back in MO2, click the **Refresh** button so the changes take effect  

---

#### ⚠️ 5. Cleanup

> **You MUST disable** the `xLODGen Resource - SSE Terrain Tamriel` mod after generating your LODs.  
> Leaving it enabled will cause broken or ugly terrain in-game.

> At this point, you should **reenable** `JOJ - Grass Cache (Your Profile)`. You will need it enabled for either of the next tasks in this process.

✅ That's it! You're now ready to move on to **TexGen** if you are not regenerating Grass Cache.

</details>

---
<a id="grass"></a>
<h2 class="visually-hidden">🌾 Step 3.5: Grass Cache (Optional / Advanced)</h2>

<details>
<summary>🌾 Step 3.5: Grass Cache (Optional / Advanced)</summary>

This step is **optional** — JOJ includes pre-generated grass caches for both supported profiles.  
You may simply use the included `JOJ - Grass Cache (Your Profile)` mod without any extra work.

However, you **should regenerate your own grass cache** if:
- You've added or removed **large worldspace/landscape mods** (e.g., major quest or new land mods)  
- You've made **significant terrain edits** or changed **grass INI settings**

---

#### 🧹 1. Clear Previous Grass Files
- Navigate to:

    ```
    JOJ - Grass Cache (Your Profile)
    ```

- **Delete only** the `grass` folder.  
- ❌ Do **not** delete the `SKSE` folder unless you want to regenerate a fresh INI file.  
> The provided INI is pre-configured — stick with it unless you know exactly what you're doing.
- Leave the mod **enabled** in MO2.

![image](https://github.com/user-attachments/assets/a32a27e6-3a0e-4c75-9934-5c52f7db13b3)

---

#### 🚫 2. Disable Mods for Stability
To reduce crashing during the caching process (crashes are still expected):
- Disable:
- `TrueHUD - HUD Additions` (UI Foundations separator)  
- `Auto Parallax` (SKSE & Core DLL Mods separator)  
- `Discord Rich Presence` (Mod Tools & Resources separator)

![image](https://github.com/user-attachments/assets/9b849d81-ccb1-43d8-987d-c8d8a6aeb117)  

![image](https://github.com/user-attachments/assets/112bbbdc-5326-4858-98cd-2a379a31b85a)  

![image](https://github.com/user-attachments/assets/a21f110e-b1e3-4104-a8f4-e1c620cfdff0)  

---

#### 📖 3. Gather Worldspaces with Grass
1. Open **xEdit** from MO2.  
2. On the **Module Selection** popup, just click **OK** to load everything.  
 - Loading may take several minutes (mine ~2–3 minutes, your mileage may vary depending on hardware).  
 - Wait until you see:  

   ```
   Background Loader: finished
   ```

3. Once loaded:
 - Click one plugin in the left panel  
 - Press **Ctrl+A** to select all plugins  
 - Right-click > **Apply Script...**
4. Search for **"grass"** and select:  

   ```
   List worldspaces with grass
   ```

![image](https://github.com/user-attachments/assets/fd963b27-5442-40ff-b8c1-33891bdfb720)

5. Run the script. A popup for debug files will appear, just click "OK". 

![image](https://github.com/user-attachments/assets/1a8da4d1-7a36-443e-8e37-dc5ad3300763)

Another popup with text will then appear.  
- Copy **all** of the text (Ctrl+A > Ctrl+C).  
- Paste into a Notepad file as a backup.  
- Click "OK" to close the popup > Close xEdit

![image](https://github.com/user-attachments/assets/82644fa9-c691-4ca8-8343-08675d6c38db)  

![image](https://github.com/user-attachments/assets/218bdef7-e38e-48c4-84e8-ef2454f6be52)

---

#### 📝 4. Update GrassControl.ini
1. Open:

   ```
   JOJ - Grass Cache (Your Profile) > SKSE > Plugins > GrassControl.ini
   ```

*(Or double-click the mod in MO2 and use the INI Files tab)*

2. Find the line:

   ```
   Only-pregenerate-world-spaces =
   ```

3. Paste the text you copied from xEdit into this line (usually around line 79).  
4. Save and close the INI file.

![image](https://github.com/user-attachments/assets/16dfe3d4-20e9-42b7-baa5-7251f85c7739)

---

#### ✅ 5. Enable Required Mod
- Enable the mod:

   ```
   No Grass in Objects
   ```

*(Located in the Outputs separator, above `JOJ - Grass Cache (Your Profile)`)*

![image](https://github.com/user-attachments/assets/082fac49-7265-42f3-ae49-22856abc3306)

---

#### ▶️ 6. Run the Precache Process
1. In **MO2**, go to:  
 **Tools > Tool Plugins > Precache Grass**  
2. Click **Yes** on the popup.

---

#### ⏳ 7. Wait Patiently During Grass Generation
- Once you've confirmed that the modlist boots and the Grass Cache process has started, the **best thing you can do is walk away from your PC**.  
- While the process runs, expect:
  - A flashing screen (this is normal)  
  - The game to crash repeatedly — **this is also normal**  
  - Each time it crashes, the process will automatically restart and continue from where it left off  
- On a fast, modern PC this usually takes **a little over an hour**. On slower systems it can take longer, but it should not drag on indefinitely.  

⚠️ **Troubleshooting:**  
- If it has been running for **several hours** with no sign of completion, you likely **skipped or misread a step** above.  
- If you must start over:  
  - First delete the partially generated `grass` folder found in your **Overwrite** directory  
  - Then carefully repeat the steps from the beginning  

---

#### 🏁 8. Finalizing the Cache
- When complete:
- A popup will confirm **Grass generation finished successfully!** → click **OK**  

![image](https://github.com/user-attachments/assets/52452ba0-44f3-4e82-92c6-d59f6fe21496)  

- The game will close automatically  
- MO2 will display another popup → click **OK**

![image](https://github.com/user-attachments/assets/28d7fb12-f316-46b6-909e-6d7b5f3fb827)  

- The new cache will be in:

   ```
   Overwrite > grass
   ```

- Cut (not copy) the entire `grass` folder and paste it into:

   ```
   JOJ - Grass Cache (Your Profile)
   ```

---

#### 🔄 9. Restore Normal Mod Order
1. **Re-enable** the following mods in MO2:
 - `TrueHUD - HUD Additions`  
 - `Auto Parallax`  
 - `Discord Rich Presence`
2. **Disable**:
 - `No Grass in Objects`  
3. In the **Plugins tab**:
 - Move `TrueHUD.esl` into the **Master Plugins** group  
 - Place it **between**:
   ```
   SimpleChildren.esp
   SmoothCam.esl
   ```

![image](https://github.com/user-attachments/assets/ec6b0294-86c1-4b54-b549-568a552f69b2)

---

#### ✅ Completion
You have successfully generated a fresh Grass Cache!  
This is often considered the **most tedious tool run**, but it ensures stable and consistent grass visuals across all worldspaces.

---

✅ Once finished (or skipped), you're ready to move on to **TexGen**.

</details>

---
<a id="texgen"></a>
<h2 class="visually-hidden">🎨 Step 4: Run TexGen</h2>

<details>
<summary>🎨 Step 4: Run TexGen</summary>

> ⚠️ **Important for Performance Users:**  
> If you are using the **Performance** profile and have generated your own VRAMr Output, you must **disable it** before running TexGen.  
> Keep it disabled until **after DynDOLOD** has finished running (the next step).

---

> 🧹 **Clean Slate Reminder:**  
> Just like with ParallaxGen, you must **delete your previous TexGen outputs** before generating new ones.

---

#### 🧹 1. Clear Old TexGen Files

1. In **MO2**, scroll down to the `Outputs` separator
2. **Double-click** `JOJ - TexGen Output (Your Profile)` and choose **Open in Explorer**
3. Inside the folder, **delete the `textures` folder** completely

---

#### ▶️ 2. Run TexGen

1. Launch **TexGen** from the MO2 dropdown menu
2. Allow it to load completely
3. Make sure your settings match the image below:

![image](https://github.com/user-attachments/assets/4928201a-f07c-4f1e-98f7-3f84f1ad1219)

4. Click **Start** to begin the process

---

#### ✅ 3. Completion

Once TexGen completes, it will display a message and a **button to exit**:

![texgen done](https://github.com/user-attachments/assets/706d79ce-f63a-4d36-930e-95c4b1fec907)

- Click **"Exit TexGen"**  
- **DO NOT change the output path** — leave it set to the default

---

#### 📁 4. Move the Output to MO2

1. At the top of the TexGen window, you'll see the output path  
   *(`Journals of Jyggalag - Outputs\TexGen Output`)*

2. Open that folder, and **copy the `textures` folder** from it

3. Paste it into:

`Journals of Jyggalag\mods\JOJ - TexGen Output (Your Profile)`

4. Back in MO2, click **Refresh**. Re-enable `JOJ - TexGen Output` on the left.

✅ TexGen is now complete! You're ready for the final step: DynDOLOD.

</details>

---
<a id="dyndolod"></a>
<h2 class="visually-hidden">🏰 Step 5: Run DynDOLOD</h2>

<details>
<summary>🏰 Step 5: Run DynDOLOD</summary>

> Just like with ParallaxGen and TexGen, you must delete the old output before running DynDOLOD.

---

#### 🧹 1. Clear Old DynDOLOD Files

1. In **MO2**, scroll to the `Outputs` separator
2. **Double-click** `JOJ - DynDOLOD Output` and choose **Open in Explorer**
3. **Delete all files** inside the folder

---

#### ▶️ 2. Run DynDOLOD

1. Launch **DynDOLOD** from the MO2 dropdown menu  
2. Allow it to fully load

> 📁 **Output Location Notice:**  
> The output path for DynDOLOD is set **inside the initial DynDOLOD window**, at the top of the interface.  
> By default, it should point to:  
> `Journals of Jyggalag\tools\DynDOLOD\DynDOLOD_Output\`  
> You may change this path if needed **before starting generation**.

> It is recommended to change your Output location to this so all of your Outputs go in the same place. This isn't required, but it helps keep all your output files organized in one place.:  
> `Journals of Jyggalag - Outputs\DynDOLOD Output\`

![image](https://github.com/user-attachments/assets/1d3a75e3-39e1-4494-9d61-9dd9c49590d0)

---

#### ⚙️ 3. Configure DynDOLOD Settings

1. Click `Advanced >>>`

2. In the Worldspaces list in the **top-left pane**, make sure **everything is checked**  
   *(Right-click > Select All)*

3. Double-check that your **Output Path** is set to:  
   `Journals of Jyggalag - Outputs\DynDOLOD Output\`

4. In the **top-right corner**, select your quality preset based on your profile:

   - **Lord's Vision** → Click **High**  
     If you're using **Lord's Vision**, you must also set the following:
     - ✅ **Check the Grass LOD** box  
     - **Density**: `100%`  
     - **Mode**: `1`  
     ![Lord's Vision Settings](https://github.com/user-attachments/assets/abcd4db9-3f41-49ae-a9b7-d92756804767)  

   - **Performance** → Click **Medium**  
     ![Performance Settings](https://github.com/user-attachments/assets/9ec0025d-bca2-4bf4-ab00-e1b47cb6a2d2)  

5. Click OK to start the DynDOLOD tool run.  
   ⏳ Be patient — this generally takes **at least an hour**, sometimes two depending on your PC specs.

6. Once it completes, click `Save and Exit`
    
---

#### 📁 4. Move the Output to MO2

Once DynDOLOD completes, the output files will be located at:

`Journals of Jyggalag - Outputs\DynDOLOD Output` if you followed the above recommended steps.

1. Open that folder and **copy everything inside**
2. Paste all files into:

`Journals of Jyggalag\mods\JOJ - DynDOLOD Output (Your Profile)`


5. Back in MO2, click **Refresh**. Re-enable the Dyndolod output mod.

---

#### 📜 5. Sort Plugins Correctly

Once you've copied the generated DynDOLOD files to the correct folder and enabled the `JOJ - DynDOLOD Output` mod in MO2, you'll see **three new plugins** in the **right-side Plugins tab**:

- `DynDOLOD.esm` (near the top under Master Plugins)

![image](https://github.com/user-attachments/assets/c53e5bcb-231f-4ce5-a205-a3cc2109747c)

- `DynDOLOD.esp`
- `Occlusion.esp`

![image](https://github.com/user-attachments/assets/1e53a9fd-3fe3-437b-ab85-29e11d7bcd15)

---

#### 🔧 6. Organize the Plugins

Make sure **all three are enabled**, then drag them into the correct plugin groups:

- Move `DynDOLOD.esm` into the `Master Plugins` plugin group
- Move `DynDOLOD.esp` and `Occlusion.esp` into the `Outputs` plugin group
- Ensure that **`DynDOLOD.esp` and `Occlusion.esp` are the final two entries** at the very bottom of your load order.

> ⚠️ **Important for Performance Users:**  
> If you are using the **Performance** profiles and have a VRAMr Output, you must **re-enable** it.

</details>

---
<a id="conclusion"></a>
<h2 class="visually-hidden">✅ Conclusion</h2>

<details>
<summary>✅ Conclusion</summary>

You've now finished running all 9 major tools for your **Scrolls of Schtevie Modlist**:
- BodySlide
- Pandora
- Synthesis
- VRAMr
- ParallaxGen
- xLODGen
- Grass Cache
- TexGen
- DynDOLOD

If you've followed each step carefully, your modlist is now fully rebuilt with accurate terrain, texture, parallax, LOD, and worldspace data.

</details>

---

<a id="final"></a>

> ⚠️ **Final Reminder — Rule 11**
>
> Adding any mods to Journals of Jyggalag falls under **Rule 11**:  
> You are modifying the list at your own risk.
>
> While we're happy to try and assist in the [Discord](https://discord.gg/themoddingbordello), the team is **not obligated** to troubleshoot problems caused by your personal additions or changes.
>
> You are responsible for **everything you add or modify** after the Wabbajack install is complete.

---

Thank you for using Journals of Jyggalag. May your LODs be crisp and your crashes few. 🧠✨

Herr Schtevie

![Jyggalag_red_resized](https://github.com/user-attachments/assets/b1db96ec-04b4-44d8-b8ed-cccade05bc57)
