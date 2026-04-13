# SOS Performance Tuning Guide

---

This guide covers multiple methods to improve performance on the Scrolls of Schtevie modlists. These methods can be used individually or combined for maximum effect.

> **Disclaimer – Read This First**
> This guide was originally assembled using **Journals of Jyggalag** as the reference list.
> While the instructions apply across all **Scrolls of Schtevie** modlists, some settings or results may vary slightly.
> The core process and steps remain the same.

> Special thanks to [Guurzak](https://www.nexusmods.com/profile/Guurzak?gameId=1704) for originally creating and compiling these performance methods.

---

## Who This Guide Is For

This guide is intended for:

- Users on lower-end hardware struggling with performance
- Users who want smoother gameplay without heavily compromising visuals
- Users looking to fine-tune performance beyond the default profile

You can follow individual sections as needed, or combine multiple methods for maximum performance gains.

---

## Quick Wins

Two simple changes that can improve performance without significant visual tradeoffs.

1. **Choose the Performance profile** in MO2 if you haven't already. This is the foundation for all other optimizations.

2. **Set SSGI to AO Only:**
   - In game, open the CS menu with the `End` key
   - Set SSGI to `AO Only`

---

> 💡 **MO2 Tip**
>
> - Always make changes in your active MO2 profile
> - Use the **Data tab (right panel)** to search for files (bottom search bar)
> - Select the **winning file** (the one overriding others)
> - Most tools (VRAMr, BethINI) should be launched from MO2's application list

---

## VRAMr

Reduce VRAM usage and improve performance by generating optimized texture atlases. Use this if you experience stuttering or your GPU is VRAM-limited.

Run **VRAMr** from MO2's application list. For full step-by-step instructions, see the [SOS Tool Running Guide](/guides/sos-tool-running-guide).

> ⚠️ **Note on VRAMr**
>
> VRAMr replaces textures and does not typically require a full tool rerun.
> If you notice visual inconsistencies (especially distant objects), you may optionally rerun TexGen and DynDOLOD.

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

### Performance Profile

Select the **Performance** profile in MO2. This should always be your starting point before applying any other tweaks.

### Resolution Scaling

If you are running at a resolution higher than 1920x1080, lowering your game resolution will make a *dramatic* improvement in performance.

1. In MO2, search the Data tab for `ssedisplaytweaks`
2. Open the winning `.ini` file at `SKSE > Plugins > SSEDisplayTweaks.ini`
3. Go to **line 66** and locate the resolution override line
4. If the line starts with `#`, it is **disabled** — remove the `#` to enable it
5. Set your desired resolution and save

> **Default behavior:** If left commented out, the game uses the resolution set in `SkyrimPrefs.ini` (outside MO2).

### SSE Display Tweaks

Enable Performance Mode in SSE Display Tweaks to reduce rendering overhead.

1. In MO2, search the Data tab for `ssedisplaytweaks`
2. Open the winning `.ini` file at `SKSE > Plugins > SSEDisplayTweaks.ini`
3. Find `performancemode` and set it to `performancemode=true`
4. Save the file

> ⚠️ **Important**
>
> Make sure you are editing the correct (winning) file in MO2, or your changes will have no effect.

After completing these steps, continue with [VRAMr](#vramr), [BethINI](#bethini), and [AVX / SMP Optimization](#avx--smp-optimization) above for additional gains.

---

## Advanced Optimization Checklist

For best results on low-end systems:

- [ ] Select the Performance profile
- [ ] Run VRAMr
- [ ] Apply BethINI tweaks
- [ ] Enable `performancemode=true` in SSEDisplayTweaks
- [ ] Set SSGI to AO Only in game
- [ ] Lower resolution if above 1080p
- [ ] Check AVX support for Faster SMP

---

## Final Notes

- These methods trade visual fidelity for performance. Expect reduced texture quality, shorter draw distances, and simplified shadows.
- The Performance profile is designed to work alongside these optimizations — always start there.
- VRAMr and BethINI changes persist across saves and do not need to be reapplied unless you update the list.
