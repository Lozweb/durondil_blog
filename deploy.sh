#!/bin/bash
# =============================================================
#  deploy.sh — Mise à jour du blog durondil.fr
#  Usage : ./deploy.sh
#  Note  : Sur le serveur, utilise plutôt : app blog deploy prod
# =============================================================

set -e  # Arrête le script si une commande échoue

# Chemin du dépôt sur le serveur (doit correspondre à blog.rs dans la CLI)
REPO_DIR="/home/julien/blog/durondil_blog"
DIST_DIR="$REPO_DIR/dist"

echo "🔄  [1/3] Pull des dernières modifications..."
cd "$REPO_DIR"
git pull origin main

echo "📦  [2/3] Installation des dépendances..."
pnpm install --frozen-lockfile

echo "🔨  [3/3] Build du projet Astro..."
pnpm build
# Le dossier dist/ est monté directement dans le container nginx
# via le volume : $REPO_DIR/dist → /var/www/html/blog
# Aucune copie supplémentaire nécessaire.

echo "✅  Blog mis à jour avec succès ! (dist/ → nginx via volume Docker)"

