This guide covers multiple methods to improve performance on the Modding Bordello modlists. These methods can be used individually or combined for maximum effect.

> **Disclaimer – Read This First**
> This guide was originally assembled using **Journals of Jyggalag** as the reference list.
> While the instructions apply across all **Modding Bordello** modlists, some settings or results may vary slightly.
> The core process and steps remain the same.

> Special thanks to [Guurzak](https://www.nexusmods.com/profile/Guurzak?gameId=1704) for originally creating and compiling these performance methods.

---

## Who This Guide Is For

This guide is intended for:

- Users on lower-end hardware struggling with performance
- Users who want smoother gameplay without heavily compromising visuals
- Users looking to fine-tune performance beyond the list as shipped

You can follow individual sections as needed, or combine multiple methods for maximum performance gains.

---

## Quick Wins

One simple change that can improve performance without a significant visual tradeoff.

1. **Set SSGI to AO Only:**
   - In game, open the CS menu with the `End` key
   - Set SSGI to `AO Only`
     <img width="2098" height="1192" alt="image" src="https://github.com/user-attachments/assets/832324f8-432b-4ed3-91a1-84ab6d562030" />


---

> **MO2 Tip**
>
> - Always make changes in your active MO2 profile
> - Use the **Data tab (right panel)** to search for files (bottom search bar)
> - Select the **winning file** (the one overriding others)
> - Most tools (VRAMr, BethINI) should be launched from MO2's application list

---

## VRAMr

Reduce VRAM usage and improve performance by generating optimized texture atlases. Use this if you experience stuttering or your GPU is VRAM-limited.

Run **VRAMr** from MO2's application list. For full step-by-step instructions, see the [SOS Tool Running Guide](/guides/sos-tool-running-guide).

> **Note on VRAMr**
>
> VRAMr replaces textures and does not typically require a full tool rerun.
> If you notice visual inconsistencies (especially distant objects), you may optionally rerun TexGen and DynDOLOD.

---

## Texture Downscaler

Every Bordello list ships [Texture Downscaler](https://www.nexusmods.com/skyrimspecialedition/mods/187049) **disabled**, installed on its **Balanced** preset. Enable it in MO2's left pane to use it. It is an SKSE plugin that skips the largest mip levels when a texture loads, so a 4K texture can sit in video memory as a 1K one. Nothing on disk changes, nothing runs per frame, and uninstalling it brings every texture back to full size. Sky, terrain, LOD, DynDOLOD, face tints and facegen are left alone in every preset.

The installer offers four presets. Balanced is what the list ships; Performance and Quality are the two knobs worth turning once the mod is enabled:

| Preset | Diffuse | Normal and other maps | Notes |
|---|---|---|---|
| Quality | 2048 | 2048 | Characters, armor, clothes and PBR stay at full size; dragon normal maps up to 4096 |
| Balanced (shipped) | 1024 | 1024 | Characters, armor, clothes, PBR, landscape and tree normal maps up to 2048 |
| Performance | 1024 | 512 | Characters and landscape normal maps up to 1024 |
| Custom | full size | full size | Nothing capped until you write your own rules in the ini |

### Enabling it and changing the preset

1. In MO2, find `Texture Downscaler` in the left pane (type the name into the filter box at the bottom) and tick its checkbox. On the Balanced preset that is all you need to do.
2. To change the preset, right-click it and choose **Reinstall Mod**.
3. Pick **Performance** for lower VRAM use or **Quality** for sharper close-ups, then finish the installer. If MO2 asks whether to merge or replace, choose **Replace**; keep the mod name as it is.
4. Make sure the mod is still ticked after the reinstall, then launch the game. Textures already in memory keep their size, so a fresh load is what shows the difference.

Performance is the preset to try first on cards with 8 GB of VRAM or less, or whenever new areas stream in with stutter. Quality is for 16 GB cards that want the last bit of texture detail back. If Performance looks too soft on armor and faces, raise the limits in `Texture Downscaler > SKSE > Plugins > TextureDownscaler.ini` (the mod page explains the per-folder rules) or go back to Balanced. A list update puts the mod back to disabled and on Balanced, so enable it again after updating.

> **How it relates to VRAMr:** they stack. VRAMr rewrites the texture files once; Texture Downscaler decides how much of each file to load. On a low-VRAM card run both.

---

## BethINI

Optimize Skyrim's engine-level INI settings for better performance across the board.

### Setup

1. Run **BethINI** from MO2's application list
2. Go into **Edit > Setup** and configure:
   - **Game path** — set to your Stock Game folder
   - **INI path** — set to your selected profile

![image](https://github.com/user-attachments/assets/d727024b-95b9-4c3f-a06b-552f4d73d031)  

### Preset Selection

3. Choose the **BethINI Medium** preset
4. Check **Apply Recommended Tweaks**
5. Uncheck **64-bit Render Targets**

![image](https://github.com/user-attachments/assets/af82245a-290a-4b4c-b322-eeb95cbeaf7d)  

### Shadow Settings

6. Switch to the **Shadows** tab:
   - **Disable Ambient Occlusion** — CS and ENB both handle AO on their own
   - **Reduce shadow resolution** from `1024` to `512`

### View Distance

7. Switch to the **View Distance** tab:
   - Adjust the **Distant Details** settings per the screenshot provided in MO2

![image](https://github.com/user-attachments/assets/174fdfa5-d1ba-4730-bdea-dc2f87a1cbfb)  

8. Go to **File > Save**, save all, and exit BethINI

---

## AVX / SMP Optimization

Improve CPU-side performance for physics-heavy scenes using Faster SMP.

Check the specs on your CPU to determine what version of AVX is supported. If your system supports **AVX2** or **AVX512**, you may get better performance by reinstalling **Faster SMP** and selecting the appropriate feature in the FOMOD.

![image](https://github.com/user-attachments/assets/0e047523-3d37-46af-ad5e-9c95b498df35)  

---

## Potato Mode

A guided path for users on low-end hardware. Apply these steps in order for maximum performance gains, then follow up with the tools above.

### Texture Downscaler

Enable **Texture Downscaler** in MO2 and reinstall it on its **Performance** preset (steps in the [Texture Downscaler](#texture-downscaler) section above). It is the cheapest VRAM win in the list and takes a minute.

### Resolution Scaling

If you are running at a resolution higher than 1920x1080, lowering your game resolution will make a *dramatic* improvement in performance.

1. In MO2, search the Data tab for `ssedisplaytweaks`
2. Open the winning `.ini` file at `JOJ - MCM and INI Settings > SKSE > Plugins > SSEDisplayTweaks.ini`

![image](https://github.com/user-attachments/assets/375be827-6f27-42e4-a79b-c77f76e76c1b)  

4. Go to **line 66** and locate the resolution override line
5. If the line starts with `#`, it is **disabled** — remove the `#` to enable it
6. Set your desired resolution and save

> **Default behavior:** If left commented out, the game uses the resolution set in `SkyrimPrefs.ini` (outside MO2).

### SSE Display Tweaks

Enable Performance Mode in SSE Display Tweaks to reduce rendering overhead.

1. In MO2, search the Data tab for `ssedisplaytweaks`
2. Open the winning `.ini` file at `JOJ - MCM and INI Settings > SKSE > Plugins > SSEDisplayTweaks.ini`
3. Find `performancemode` and set it to `performancemode=true`
4. Save the file

![image](https://github.com/user-attachments/assets/695a4398-0b67-48c5-9a74-b1934c05413e)  

> **Important**
>
> Make sure you are editing the correct (winning) file in MO2, or your changes will have no effect.

After completing these steps, continue with [VRAMr](#vramr), [Texture Downscaler](#texture-downscaler), [BethINI](#bethini), and [AVX / SMP Optimization](#avx--smp-optimization) above for additional gains.

---

## Advanced Optimization Checklist

For best results on low-end systems:

<div style="list-style:none;padding:0;margin:0;">
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Run VRAMr</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Enable Texture Downscaler and reinstall it on the Performance preset</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Apply BethINI tweaks</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Enable <code>performancemode=true</code> in SSEDisplayTweaks</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Set SSGI to AO Only in game</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Lower resolution if above 1080p</label>
<label style="display:block;padding:4px 0;cursor:pointer;"><input type="checkbox"> Check AVX support for Faster SMP</label>
</div>

---

## Final Notes

- These methods trade visual fidelity for performance. Expect reduced texture quality, shorter draw distances, and simplified shadows.
- Every list ships one Community Shaders profile, and these optimizations are tuned for it as shipped.
- VRAMr and BethINI changes persist across saves and do not need to be reapplied unless you update the list.
