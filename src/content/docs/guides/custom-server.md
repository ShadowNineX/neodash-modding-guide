---
title: Install the Custom Server Mod
description: Install UE4SS and the CustomServer Lua mod to replace Neodash's server URL.
---

This mod replaces the server URL used by Neodash. It requires **UE4SS (Unreal Engine 4 Scripting System)**, because the custom server is a Lua mod loaded at runtime.

## Requirements

- A Windows installation of Neodash.
- A UE4SS release compatible with Neodash's Unreal Engine 4.26.2 build.
- The [CustomServer UE4SS mod](https://www.dropbox.com/scl/fi/b4wf31kldf8cok0p6pfry/CustomServer.zip?rlkey=iiigm9lnim4icu9hy94jk7epc&st=r2t4yhq1&dl=1).

## Install UE4SS

1. Download a UE4SS release that supports Unreal Engine 4.26.2 from the [official UE4SS project](https://github.com/UE4SS-RE/RE-UE4SS/releases).
2. Extract the UE4SS files into Neodash's `Runway\Binaries\Win64` directory. This is the directory containing `Runway-Win64-Shipping.exe`.
3. Confirm that the loader files are beside the executable. The working installation contains files such as:

   ```text
   Runway\Binaries\Win64\dwmapi.dll
   Runway\Binaries\Win64\UE4SS.dll
   Runway\Binaries\Win64\UE4SS-settings.ini
   ```

4. Launch Neodash once, then close it. UE4SS creates or updates the `Mods` directory and writes `UE4SS.log` beside the executable.
5. Check `UE4SS.log` and confirm that it reports the `Mods` directory under `Runway\Binaries\Win64`.

For Neodash, do not put the UE4SS loader files in the top-level game directory. They belong in `Runway\Binaries\Win64`, beside `Runway-Win64-Shipping.exe`.

## Install CustomServer

1. Download the [CustomServer UE4SS mod](https://www.dropbox.com/scl/fi/b4wf31kldf8cok0p6pfry/CustomServer.zip?rlkey=iiigm9lnim4icu9hy94jk7epc&st=r2t4yhq1&dl=1).
2. Extract the archive so the Lua script is at this exact path:

   ```text
   Runway\Binaries\Win64\Mods\CustomServer\Scripts\main.lua
   ```

3. If the archive extracts into an extra folder, move the `CustomServer` folder so it is directly under `Runway\Binaries\Win64\Mods`.
4. Open `Runway\Binaries\Win64\Mods\mods.txt` and make sure it contains this enabled entry:

   ```text
   CustomServer : 1
   ```

5. Start Neodash. UE4SS loads `CustomServer\Scripts\main.lua`, and that script replaces the game's server URL.

The installed mod does not need its own `enabled.txt`; it is enabled through the `CustomServer : 1` entry in `mods.txt`. To disable the override, change that entry to `CustomServer : 0`, remove the entry, or rename the `CustomServer` folder, then launch the game again.
