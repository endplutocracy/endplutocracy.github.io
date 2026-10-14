# Destinned

Destinned is a personal astrology chart program that runs entirely in your web browser. It does not need a server, a database, a build step or an internet connection.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The whole program. The ephemeris, asteroid tables, fixed stars, city list, world map and tarot images are all built into this file. |
| `fonts/` | Poppins, Manrope and Noto Sans Symbols. They're stored here so the site never loads anything from Google. |
| `icons/`, `manifest.webmanifest` | The home-screen icon and app name, used when you add the site to a phone or install it as an app. |
| `sw.js` | A small offline helper. After the first visit, the site keeps working with no connection. |
| `LICENSES.md` | Credits and licenses for the data, fonts and images. |

## Using it on your own computer

Double-click `index.html`. Everything works except the offline helper and add-to-home-screen, which browsers only allow on a real web address.

## Hosting it on the web

Upload the **whole folder**, keeping its layout, to any static web host. Any of these work, and most are free:

- **Netlify Drop:** go to app.netlify.com/drop and drag the folder onto the page.
- **Cloudflare Pages** or **Vercel:** create a project and upload the folder.
- **GitHub Pages:** put the files in a repository and turn on Pages in the repository's settings.
- **Your own web hosting:** upload the folder by FTP or SFTP into your public folder, or into a subfolder such as `/orrery/`.

You can host it in a subfolder or on its own domain; nothing else needs configuring. Use **https** so the offline helper and add-to-home-screen work.

To add it to a phone's home screen:
- **iPhone:** open the site in Safari, tap Share, then tap Add to Home Screen.
- **Android:** open the site in Chrome, open the ⋮ menu, then tap Install app.

## Where your charts are stored

When you host it yourself, your charts, settings and tarot readings are saved in **each browser's own storage** (localStorage). That has three consequences:

- Each device and browser has its own separate set of charts.
- Clearing your browser's site data deletes them. Use **Charts → Export CSV** now and then as a backup.
- To move charts between devices, export a CSV on one device and use **Import** on the other.

**To bring over charts from the Claude version:** open Destinned in Claude, go to Charts and choose Export CSV. Then, on your hosted copy, go to Charts and choose Import, and pick that file.

If you make the site public, every visitor gets their own private, empty chart list in their own browser. Nobody can see anyone else's charts.

## Updating

Replace `index.html` (and any other files that changed) with the new version. If you keep the offline helper, the new version appears after you reload the page once or twice. You can also change `orrery-v1` to `orrery-v2` at the top of `sw.js` to make browsers pick up the update right away.
