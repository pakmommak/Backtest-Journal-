Backtest Journal Bull — image/note viewer patch

Files in this package:
- index.html: updated to open saved chart thumbnails in a full-screen image viewer and open saved notes in a readable dialog.
- manifest.json, sw.js, icon-192.png, icon-512.png: included from the current PWA package.

IMPORTANT:
This patch does not prove or guarantee the Android install/open issue is fixed. The actual GitHub Pages URL is required to validate the manifest start_url, scope, service worker URL/scope, and whether the deployed files are being served from the expected project path. Do not clear site storage or uninstall an app if that might risk local records. Export a JSON backup first.

Deploy all six files to the root of the existing Backtest Journal GitHub Pages repository, preserving the existing project URL. Wait for Pages to publish, then test the website in Chrome before testing installation.
