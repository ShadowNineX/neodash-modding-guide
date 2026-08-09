---
title: Game Findings
description: Verified engine, build, package, runtime, and modding information from the installed Neodash game.
---

This page records findings from a read-only inspection of the installed game. It separates confirmed file evidence from workflows that still require an in-game test.

For path examples, `<Neodash>` means the game installation directory, such as:

```text
G:\SteamLibrary\steamapps\common\Neodash
```

## Engine identity

| Finding | Value | Confidence |
| --- | --- | --- |
| Internal Unreal project | `Runway` | Confirmed |
| Engine generation | Unreal Engine 4.26 | Confirmed |
| Exact engine patch | `4.26.2` | Confirmed from launcher file version `4.26.2.0` |
| Target platform | 64-bit Windows, Shipping configuration | Confirmed |
| Steam app ID | `1514950` | Confirmed |
| Steam build ID | `12044548` | Confirmed for the inspected install |

`Runway-Win64-Shipping.exe` contains the engine signatures `++UE4+Release-4.26` and `++UE4+Release-4.26-CL-0`, along with source paths rooted at `C:/UnrealEngine-4.26/`. Packaged plugin descriptors also declare `EngineVersion: 4.26.0`.

The bootstrap launcher's Windows version resource reports file version `4.26.2.0` and product version `++UE4+Release-4.26-CL-0`. Together, this identifies the shipped engine patch as **Unreal Engine 4.26.2**. The zero changelist still suggests a source or custom engine build.

The Windows launcher and shipping executable are x86-64 PE32+ GUI programs compiled on December 23, 2022. Use UE 4.26.2-compatible tools and cooked assets.

## Steam package metadata

The inspected `appmanifest_1514950.acf` records:

| Field | Value |
| --- | --- |
| Depot | `1514951` |
| Depot manifest | `5946976397029615961` |
| Installed size | `2,808,250,686` bytes |
| Build ID | `12044548` |

No separate semantic game version such as `1.2.3` was found. Modding notes should therefore record the Steam build ID alongside the tool version used.

## Main Pak archive

The main cooked archive is:

```text
<Neodash>\Runway\Content\Paks\Runway-WindowsNoEditor.pak
```

| Property | Value |
| --- | --- |
| Size | `2,495,305,888` bytes |
| Pak format | V11, `Fnv64BugFix` |
| Mount point | `../../../` |
| Index encryption | None |
| Compression | None |
| Total entries | `6,842` |
| `.uasset` entries | `2,511` |
| `.uexp` entries | `2,525` |
| `.ubulk` entries | `209` |
| `.umap` entries | `14` |

The archive includes `Runway/AssetRegistry.bin`, project and global SM5 shader archives, the packaged `Runway.uproject`, and plugin descriptors.

### Notable maps

```text
Runway/Content/persistentLevel
Runway/Content/editor/mapEditor
Runway/Content/editor/playMap2
Runway/Content/mainMenu/MainMenuMap
Runway/Content/cinematic/cinematicMap
Runway/Content/testing/carTestLevel
```

Major asset groups include `editor`, `GUI`, `audio`, `vehicles`, `mainMenu`, effects, cosmetics, the level browser, and save-related content. The editor group contains more than 1,200 placeable asset files.

Editor data tables cover roads, obstacles, pickups, effects, decor, procedural objects, essentials, panels, and the complete placeable list. Assets named `mapSaverAndLoader` and `SAVE_mapSave` support the observed map serialization workflow.

## Loose levels and ghosts

The lowest-risk content surface is outside the Pak:

```text
<Neodash>\Runway\Content\external\levels
<Neodash>\Runway\Content\external\thumbnails
<Neodash>\Runway\Content\external\savedGhosts
```

The inspected installation contains:

- 107 level CSV files
- 78 thumbnail PNG files
- 86 ghost CSV files

Level CSV rows contain several kinds of data:

1. Metadata key/value pairs.
2. Environment vector and scalar settings.
3. Time- or distance-based deletion samples.
4. A placeable identifier and Unreal transform: location, rotation, and scale.
5. Optional typed variables, material parameters, and spline data.

Downloaded community levels use the same general schema. This makes loose level files the best first target for format documentation and controlled experiments.

Ghost CSV files begin with references to vehicle and cosmetic asset paths. Later rows contain timestamped replay-state samples.

### User data

Runtime-generated data is stored beneath:

```text
%LOCALAPPDATA%\Runway\Saved
```

Relevant locations include:

```text
downloads\levels
external\savedGhosts
SaveGames
Config\WindowsNoEditor
```

Back up these directories before changing level files, saves, or generated configuration.

## Modding paths

This guide treats **UE4SS** and **classic UE4 Pak overrides** as the primary external modding approaches. The built-in level editor remains a separate, officially supported creation path.

### UE4SS

Use UE4SS for runtime-focused work such as:

- Inspecting UObject classes, instances, properties, and functions.
- Lua scripting and repeatable runtime experiments.
- Hooking functions to observe or alter behavior.
- Discovering names and relationships needed for later reference pages.

Target a UE 4.26.2-compatible UE4SS setup. Record the UE4SS version, Neodash Steam build ID, enabled settings, and reproduction steps with each finding.

The stock executable does not contain UE4SS or UnrealModLoader signatures. This is expected for an external injector and does not prevent installing UE4SS separately.

### Classic Pak overrides

Use Pak overrides for cooked-asset replacement. A replacement must:

- Be serialized and cooked compatibly with Unreal Engine 4.26.2.
- Reproduce the original package path beneath the Pak mount point.
- Include the required `.uasset`, `.uexp`, and `.ubulk` companions.
- Load after the stock archive with sufficient priority to override it.
- Remain removable without altering the original archive.

The unencrypted, uncompressed Pak can be inspected directly. However, the exact mod-Pak filename convention, discovery directory, and load order have **not yet been proven in an isolated runtime test**. Do not publish a definitive packaging recipe until that experiment succeeds.


## Runtime technologies

Packaged runtime components include:

- Steamworks `v147`
- Advanced Sessions and Advanced Steam Sessions for UE 4.26
- PhysX and PhysX Vehicles
- Niagara
- Synthesis and audio-analysis modules
- Sound Visualizations
- WebCommunication `1.24`
- WinDualShock
- Chromium Embedded Framework

PythonScriptPlugin and editor-scripting modules appear in project metadata, but the relevant modules are editor-only or uncooked-only. They do not establish a Python API in the shipping game.

## What still needs runtime verification

The following claims remain open until tested in an isolated, recoverable setup:

- Which UE4SS release and configuration works reliably with this build.
- Whether object dumps and Lua hooks remain stable across level transitions.
- Where the game discovers additional Pak files.
- The filename and priority rules for Pak overrides.
- Whether loose cooked packages are discovered outside a Pak.
- Which assets can be replaced without incompatible Blueprint or native-code dependencies.

Keep stock files recoverable, change one variable per experiment, and record both successful and failed results. Steam file verification can restore stock installation files when necessary.
