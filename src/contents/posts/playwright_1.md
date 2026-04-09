---
title: Playwright et programmation fonctionnelle
published: 2026-04-08
description: Le cauchemar de la maintenance des tests
tags: [playwright, qa]
category: QA & Tests
cover: "/images/articles/playwright_1/playwright_cover.jpg"
draft: false
---

## Introduction : la tentation des raccourcis

Au démarrage d'un projet, on écrit des tests Playwright en mode "rapide et simple". Des sélecteurs directs, des locators éparpillés dans chaque test. Ça marche, on valide des features, on se sent productif. Trop productif peut-être.

Puis, après des semaines ou des mois, quand le projet prend de l'ampleur, il y a un moment où on le réalise : on a écrit des raccourcis partout. Des locators hardcodés, des dépendances cachées, du code dupliqué. Et même avec l'expérience, on repousse le refactoring. "C'est juste une dette technique, on la rembourse plus tard..." Sauf que "plus tard" arrive avec chaque déploiement frontend qui casse 30 tests à la fois.

J'ai compris qu'il fallait adopter la bonne méthodologie **dès le départ**, pas la rattraper quand ça devient critique. Pas par perfection, mais parce que c'est plus économe. Je me suis structuré autour de **locators réutilisables** et de **programmation fonctionnelle**. Résultat ? Les changements frontend cassent moins souvent les tests, et quand ça arrive, c'est facile à réparer : une ou deux fonctions à mettre à jour, point. 

Cet article partage cette approche pour vous aider à écrire les bons tests dès le début, histoire de ne pas vous traîner cette dette plus tard.

---

## Le piège des locators hardcodés

Avant de parler de la solution, il faut bien comprendre le problème.

### Locators fragiles : un exemple réel

Imaginez votre frontend avec cette structure :

```html
<div id="article-list">
  <article data-article="123">
    <div class="header">
      <h2>Mon article</h2>
    </div>
    <div class="content">
      <span class="description">Ceci est la description</span>
    </div>
  </article>
</div>
```

Un locator hardcodé ressemble à ça. Il existe deux façons de l'écrire, toutes les deux mauvaises :

**Approche 1 : locators en cascade**

```typescript
// ❌ Fragile et non-réutilisable
const description = page.locator('#article-list')
  .locator('article')
  .nth(0)
  .locator('div.content')
  .locator('span.description');
```

**Approche 2 : CSS selecteur mélangé**

```typescript
// ❌ Tout aussi fragile
const description = page.locator('#article-list > article').nth(0).locator('div.content > span.description');
```

**Les problèmes (identiques dans les deux cas)** :
- ❌ **Non-réutilisable** : chaque test qui cherche une description doit copier-coller ce sélecteur
- ❌ **Dépend de la hiérarchie HTML** : un wrapper ajouté = test cassé
- ❌ **Dépend du CSS** : renommer une classe = test cassé
- ❌ **Dépend de l'ordre** : `.nth(0)` casse si un autre article arrive avant
- ❌ **Impossible à lire** : le CSS devient une soupe illisible quand la page grandit

Au premier déploiement frontend qui change la structure ou le styling, c'est le carnage. Vous passez plus de temps à réparer les tests qu'à en écrire de nouveaux.

### Pourquoi ça change si vite ?

Les développeurs changent le design, réorganisent le DOM pour des raisons de performance ou d'accessibilité, renomment les classes pour la maintenabilité du CSS. C'est normal, c'est leur boulot. Mais vous, vous vous retrouvez bloqué avec une suite de tests cassés.

---

## Comprendre le frontend : penser en composants

**La clé est d'aligner votre approche de test sur la façon dont le frontend est construit**.

Les applications modernes (React, Angular, Vue, Svelte) sont construites avec des **composants réutilisables**. Une liste d'articles est un composant. Chaque article est un composant. La description est un composant atomique plus petit.

### Utiliser les `data-testid` : une interface stable

Plutôt que de vous accrocher au CSS ou à la hiérarchie HTML qui changent constamment, créez une interface stable avec les développeurs. Demandez-leur d'ajouter des balises de test (où ajoutez les vous-même) :

```html
<div data-testid="article-list">
  <article data-testid="article-title-Mon article">
    <div>
      <h2>Mon article</h2>
    </div>
    <div>
      <span data-testid="article-description">Ceci est la description</span>
    </div>
  </article>
</div>
```

Ces balises `data-testid` ne sont **pas du styling**, elles ne changent pas quand le design change. Elles représentent l'**intention du composant**, pas son implémentation technique.

Playwright offre même une méthode dédiée pour ça :

```typescript
// ✅ Méthode idéale de Playwright
const description = page.getByTestId('article-description');
```

C'est plus clair que `page.locator('[data-testid="article-description"]')` et c'est recommandé.

### Le contrat d'interface

- **Frontend** ajoute des `data-testid` sur les composants clés
- **Tests** utilisent ces balises via des fonctions de locators
- **Changement frontend** : le styling et la hiérarchie changent, mais les `data-testid` restent

Résultat : les changements frontend ne cassent pas vos tests. Seules les fonctions qui ciblent directement un `data-testid` modifié doivent être mises à jour.

---

## Pourquoi la programmation fonctionnelle pour les tests ?

Maintenant qu'on comprend le problème et l'interface, parlons de la **programmation fonctionnelle** : pourquoi c'est idéal pour structurer les tests.

### Clarté des signatures

Avec TypeScript et la programmation fonctionnelle, les signatures des fonctions deviennent une **documentation vivante**. Regardez la différence :

```typescript
// ❌ Approche OOP : quoi de caché ?
const page = new PageObject();
await page.setup();
const element = page.findArticleDescription();
```

On ne sait pas : les dépendances, l'état interne, les effets de bord cachés.

```typescript
// ✅ Approche fonctionnelle : tout clair
const article = articleByTitle(page, "Mon article");
const description = articleDescription(article);
```

Les signatures sont explicites : *« donne-moi l'article avec ce titre, puis extrais sa description »*. Aucun mystère, aucun état caché.

### Fonctions pures : prévisibilité

Une fonction pure retourne toujours le même résultat pour les mêmes entrées, sans modifier l'état global. C'est crucial en tests pour la prévisibilité :

```typescript
// ✅ Fonction pure
function articleByTitle(page: Page, title: string): Locator {
  return page.getByTestId('article-list')
    .filter({ has: page.getByText(title) });
}
```

Appelez-la 10 fois avec les mêmes arguments : vous obtenez 10 fois exactement le même résultat. Pas de surprise, pas de variation aléatoire.

### Imutabilité et pas d'effets de bord

Les fonctions ne modifient pas l'état global. Elles prennent des données en entrée, les traitent, retournent un résultat. Pas de surprise cachée.

```typescript
// ✅ Pas de modification d'état caché
const article = articleByTitle(page, "Mon article");   // ne modifie rien
const description = articleDescription(article);       // ne modifie rien
await description.click();                             // une action explicite et volontaire
```

Chaque fonction reste isolée, facile à comprendre, facile à déboguer. Pas de "mais pourquoi mon test change le comportement du test d'à côté ?" : c'est impossible.

---

## Construire un framework de locators réutilisables

Maintenant, voyons comment mettre tout ça en pratique en construisant un **framework de locators** étape par étape.

### Étape 1 : les composants génériques

Créez un fichier `functions/generic-components.ts` pour les éléments de base réutilisables :

```typescript
import { Page, Locator } from '@playwright/test';

// Retourne le locator de la liste d'articles
export function articleList(page: Page): Locator {
  return page.getByTestId('article-list');
}
```

C'est simple : une fonction, un locator, une responsabilité unique.

### Étape 2 : les composants métier

Créez un fichier `functions/articles.ts` pour les éléments spécifiques au domaine métier :

```typescript
import { Page, Locator } from '@playwright/test';
import { articleList } from './generic-components';

// Trouver un article par son titre
export function articleByTitle(page: Page, title: string): Locator {
  return articleList(page)
    .filter({ has: page.getByText(title) });
}

// Extraire la description d'un article
export function articleDescription(article: Locator): Locator {
  return article.getByTestId('article-description');
}
```

Remarquez la **composition** : `articleDescription` prend un `Locator` en entrée, pas une `Page`. Cela la rend réutilisable à différents niveaux de granularité.

### Étape 3 : utiliser le framework dans les tests

```typescript
import { test, expect } from '@playwright/test';
import { articleByTitle, articleDescription } from './functions/articles';

test('afficher la description d\'un article', async ({ page }) => {
  await page.goto('/blog');
  
  const article = articleByTitle(page, "Ma première expérience");
  const description = articleDescription(article);
  
  await expect(description).toBeVisible();
  await expect(description).toContainText('Un texte intéressant');
});
```

Comparez avec l'approche hardcodée : c'est **bien plus lisible et réutilisable**.

### Avantages de cette approche

**Réutilisabilité** : Chaque fonction peut être utilisée dans des dizaines de tests. Pas de duplication.

```typescript
// Test 1 : affichage
const description = articleDescription(article);
await expect(description).toBeVisible();

// Test 2 : scroll
const description = articleDescription(article);
await description.scrollIntoViewIfNeeded();

// Test 3 : contenu
const description = articleDescription(article);
expect(await description.textContent()).toBeTruthy();
```

**Maintenabilité** : Un jour, les développeurs changent le `data-testid="article-description"` en `data-testid="description"`. Une seule fonction à mettre à jour :

```typescript
// Avant
export function articleDescription(article: Locator): Locator {
  return article.getByTestId('article-description');
}

// Après
export function articleDescription(article: Locator): Locator {
  return article.getByTestId('description');
}
```

**Tous vos tests marchent à nouveau**. Pas besoin de parcourir 50 fichiers de test.

**Pas d'effets de bord** : Chaque appel à `articleByTitle` retourne un nouveau Locator sans modifier l'état. Vous pouvez l'appeler plusieurs fois sans risque :

```typescript
const article1 = articleByTitle(page, "Article 1");
const article2 = articleByTitle(page, "Article 2");
const article3 = articleByTitle(page, "Article 3");

// Chaque variable est totalement indépendante
```

---

## Encapsuler les workflows : les actions

Au-delà des locators, vous avez des **workflows** qui se répètent : ajouter un article, le modifier, le supprimer. Encapsulez-les dans des fonctions métier.

Créez un fichier `functions/actions.ts` :

```typescript
import { Page } from '@playwright/test';
import { articleByTitle } from './articles';

// Action : ajouter un article
export async function addArticle(
  page: Page,
  title: string,
  description: string
): Promise<void> {
  await page.getByTestId('btn-new-article').click();
  await page.getByTestId('input-title').fill(title);
  await page.getByTestId('textarea-description').fill(description);
  await page.getByTestId('btn-save').click();
  await page.waitForURL('/blog');
}

// Action : supprimer un article
export async function deleteArticle(page: Page, title: string): Promise<void> {
  const article = articleByTitle(page, title);
  await article.getByTestId('btn-delete').click();
  await page.getByTestId('confirm-delete').click();
}

// Action : vérifier qu'un article existe
export async function articleExists(
  page: Page,
  title: string
): Promise<boolean> {
  const article = articleByTitle(page, title);
  return article.isVisible();
}
```

Maintenant, vos tests parlent le **langage métier**, pas le langage technique :

```typescript
test('créer et supprimer un article', async ({ page }) => {
  await page.goto('/blog');
  
  await addArticle(page, "Mon test", "Une description");
  expect(await articleExists(page, "Mon test")).toBe(true);
  
  await deleteArticle(page, "Mon test");
  expect(await articleExists(page, "Mon test")).toBe(false);
});
```

Plus de sélecteurs obscurs, plus de détails d'implémentation : juste la logique métier. C'est tellement plus clair.

---

## Conclusion : du hack à la stratégie

Cette approche transforme votre suite de tests d'une collection de scripts fragiles en un **véritable framework applicatif**.

**Ce qu'on gagne** :
- ✅ **Clarté** : les signatures TypeScript documentent le code, pas besoin de commentaire
- ✅ **Réutilisabilité** : chaque fonction est écrite une fois, maintenue une fois
- ✅ **Maintenance simplifiée** : un changement frontend casse moins de tests, et c'est facile à réparer
- ✅ **Scalabilité** : ajouter de nouveaux tests devient rapide et sans erreur

C'est cette approche qui permet à une équipe QA d'accompagner un produit qui évolue rapidement, sans être noyée par la maintenance des tests.

À bientôt ! 🚀