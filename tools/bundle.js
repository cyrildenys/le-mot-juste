/* =====================================================================
   Le Mot Juste — Bundler
   Assemble CSS + JS + données en un seul fichier HTML autonome
   (aucune ressource externe → ouvrable d'un double-clic, hors-ligne).
   Usage : node tools/bundle.js
   ===================================================================== */
const fs = require("fs");
const path = require("path");

const BASE = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(BASE, p), "utf8");

// Même ordre que index.html
const SCRIPTS = [
  "js/core.js",
  "data/regles.js", "data/confusions.js", "data/mauvais-usages.js",
  "data/nuances.js", "data/grammaire.js", "data/mots.js",
  "data/verbes.js", "data/dictees.js", "data/quiz.js", "data/approfondissements.js",
  "js/conjugueur.js", "js/view-regles.js", "js/view-motdujour.js",
  "js/view-dictee.js", "js/app.js",
];

const css = read("css/styles.css");
const js = SCRIPTS.map((f) => `/* ===== ${f} ===== */\n` + read(f)).join("\n\n");
const favicon = "data:image/svg+xml;base64," + Buffer.from(read("icons/icon.svg")).toString("base64");

const head =
  `<title>Le Mot Juste</title>\n` +
  `<meta name="theme-color" content="#8E2C3B">\n` +
  `<link rel="icon" href="${favicon}">\n` +
  `<style>\n${css}\n</style>`;

const body =
  `<div id="app">\n` +
  `  <header class="app-header" id="app-header"></header>\n` +
  `  <main class="view" id="view" role="main"></main>\n` +
  `  <nav class="tabbar" id="tabbar" role="tablist"></nav>\n` +
  `</div>\n` +
  `<script>\n${js}\n</script>`;

// 1) Fichier autonome complet (double-clic / file://)
const standalone =
  `<!DOCTYPE html>\n<html lang="fr">\n<head>\n` +
  `<meta charset="utf-8">\n` +
  `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n` +
  head + `\n</head>\n<body>\n` + body + `\n</body>\n</html>\n`;

fs.writeFileSync(path.join(BASE, "le-mot-juste-autonome.html"), standalone);

// 2) Contenu « corps seul » pour l'aperçu Artifact (sans doctype/html/head/body)
const artifactContent = head + "\n" + body + "\n";
const outArtifact = process.argv[2];
if (outArtifact) fs.writeFileSync(outArtifact, artifactContent);

const kb = (s) => Math.round(Buffer.byteLength(s) / 1024);
console.log(`✓ le-mot-juste-autonome.html (${kb(standalone)} Ko)`);
if (outArtifact) console.log(`✓ aperçu Artifact → ${outArtifact} (${kb(artifactContent)} Ko)`);
