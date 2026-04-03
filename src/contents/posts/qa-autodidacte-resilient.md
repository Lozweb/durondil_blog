---
title: "QA : L'autodidacte résilient"
published: 2026-04-03
description: Sans diplôme, 70h par semaine, un seul entretien obtenu — et pourtant.
tags: [QA, Playwright, Parcours, Autodidacte]
category: QA & Tests
cover: "https://durondil-blog.any-app.fr/storage/durondil_blog/qa.jpg"
draft: false
---

Ce qui m'a frappé en découvrant ce milieu : il n'existe pas vraiment de formation sérieuse pour ce métier. Les bootcamps vendent du volume, les produits no-code vendent de la simplicité. Ce qu'on trouve rarement, c'est du contenu de fond — architecture, maintenabilité, analyse. Le vrai métier, celui qui consiste à comprendre un produit en profondeur et à en remonter l'état de santé avec précision, se construit sur le terrain.

Voici comment je l'ai construit, le mien — et comment une reconversion professionnelle un peu chaotique m'a finalement mené là.

---

Pas de diplôme. Des réalisations, oui — des sites, des plugins, des thèmes, un logiciel complet en C#. Mais pas de diplôme. Et dans le monde du recrutement, ça pèse lourd.

---

## 70h par semaine, c'est pas une vie

Pendant longtemps, j'ai jonglé entre l'auto-entrepreneuriat et un emploi salarié à plein temps. En théorie, c'est valorisant. En pratique, ça fait des semaines à 70h de moyenne, et à un moment ton corps et ta tête te présentent la facture.

J'ai donc commencé à chercher une sortie. Un vrai poste permanent dans le dev. Quelque chose qui m'appartienne vraiment, sans devoir être partout à la fois.

---

## Les formations : elles vendent du rêve

Soyons directs : les bootcamps et formations qualifiantes vendent un produit. C'est leur métier. Et comme tout produit, il y a une part de marketing qui dépasse un peu la réalité.

Ce que j'ai appris de plus précieux, je l'ai appris en faisant des projets perso. En me les faisant hacker. En les regardant devenir des monstres impossibles à maintenir trois mois plus tard. En me cassant la gueule dessus, et en me relevant.

C'est là qu'on cherche de meilleures méthodes. Qu'on étudie les design patterns. Qu'on recommence. Puis les technos deviennent obsolètes, alors on se met à jour et on recommence encore.

> *Un certificat peut ouvrir une porte. Mais c'est ce que tu as construit toi-même qui décide si tu passes le seuil.*

Je parle ici de la période d'apprentissage, pas du quotidien en poste — parce qu'une fois qu'on travaille, le temps manque, et c'est bien normal. Mais quand on apprend, les projets perso sont irremplaçables. Ceux qui se contentent du cours sans jamais expérimenter à côté passent souvent à côté de l'essentiel. Ce n'est pas une question de talent, c'est une question d'engagement envers soi-même.

---

## La décision

Un jour, j'en ai eu assez. J'ai pris la décision de rentrer dans une école pour une formation de 2 ans. Mais avant d'y accéder, il fallait passer par une VAE — une validation des acquis permettant d'obtenir un niveau bac ou BTS ouvrant les portes du cursus.

J'ai préparé mes dossiers, mis à jour mon portfolio en ligne, et j'ai commencé à démarcher des entreprises. CV, portfolio, relances. Le lot classique.

---

## Un seul entretien

Un seul. J'en ai obtenu un seul.

Il faut dire que je vis dans la France profonde, là où les entreprises tech ne sont pas légion. Mais c'était ma chance, et j'ai tout donné.

Test technique au programme. Et la question qui fâche : *"Est-ce que tu peux affirmer que ton code est safe et fonctionne dans tous les cas ?"*

Honnêtement ? Non. Pas de tests unitaires dans mon rendu. Je ne me suis pas vraiment raté — j'ai fait ce que j'ai pu dans le temps imparti — mais j'ai surtout poussé fort sur la résolution du problème en lui-même. Assez fort apparemment, parce qu'ils m'ont convoqué à d'autres entretiens.

Et j'ai été pris.

---

## Le projet qui attendait

Je démarre au support, avec une mission claire : reprendre le projet de tests automatisés existant, écrit en Cypress.

200 tests environ. Difficiles à mettre à jour. Un suivi manuel chronophage. Et par conception, Cypress interdit le multi-domaine — ce qui posait un vrai problème pour notre périmètre. Il fallait donc faire des choix : architecture, outils, et peut-être tout réécrire de zéro.

J'ai choisi de tout réécrire.

---

## La refonte

D'abord une traduction du code Cypress vers Playwright, puis une réécriture complète de la logique de test et la création de notre librairie interne de sélecteurs.

Ensuite s'est posée la question des rapports et des historiques. Les outils existants ne suffisaient pas. Alors j'ai conçu de zéro une application interne — front, back, base de données PostgreSQL — pour stocker les résultats, les logs et les traces de chaque run, et les consulter dans un dashboard.

Petit à petit, j'y ai ajouté des métriques, des outils d'analyse automatique, la comparaison entre les runs. Les tests sont devenus plus stables, plus robustes aux changements du frontend, et on en écrit de nouveaux régulièrement.

C'est encore en construction. Et c'est exactement là où je veux être.

---

## Le run dure 4h — problème suivant

Très vite, nouvelle contrainte : le run complet prend presque 4 heures. Intenable. Il faut trouver une solution pour paralléliser sans tout casser.

La réponse : Docker. On passe une suite de tests à un conteneur, et hop — une stack parallèle que je maîtrise entièrement. Le temps de run tombe. Le problème suivant peut commencer.

C'est aussi à cette période qu'on me confie une partie du développement de ce que j'appelle la **quincaillerie interne** : réécrire les scripts shell éparpillés en une CLI unifiée en **Rust** (avec [Clap](https://docs.rs/clap)), pour regrouper tous ces outils difficiles à maintenir — ajouter un client, mettre à jour un environnement, start, stop, install. Tout au même endroit, avec une interface cohérente.

Ce chantier m'a ouvert une nouvelle base : le déploiement d'applications conteneurisées, le DevOps au sens concret du terme. Nouvelles armes, nouveau front. J'apprends Rust frénétiquement, je multiplie les projets perso, et je réécris au passage mon dashboard de suivi pour le rendre plus performant, plus pertinent, plus intelligent.

Aujourd'hui je serais perdu sans lui. Je maintiens près de **1 350 tests**, que j'analyse tous les jours pour remonter des rapports précis et rapides à l'équipe de développement.

Un run, c'est **1h45**.

---

## La suite, c'est maintenant

Avec tout ça, je passe officiellement dans l'équipe de développement — au même titre que les autres qui bossent sur le produit qu'on vend. Les retours de mes collègues m'encouragent à aller encore plus loin.

J'ai appris énormément dans cette équipe. C'est une chance que j'ai eue, et je suis du genre à me donner à fond.

Tous les jours est un défi. Je le vois comme une chance.

J'adore ce métier. C'est comme jouer aux Lego techniques tous les jours — avec presque toutes les pièces qui existent dans le monde, et la liberté de construire ce que je veux, à partir du moment où ça sert aux autres.

Vous imaginez un gamin à qui on demande de faire ce qui lui plaît, avec pour seule condition que sa création doit aider les autres ?

C'est exactement ça.

---

## Conclusion : la résilience, c'est la méthode

Pas de formation dédiée. Peu de documentation pour les projets complexes. Beaucoup de situations où on est seul face à un problème que personne n'a vraiment documenté, parce que ça n'est tout simplement pas documenté.

C'est là que la résilience devient une compétence à part entière. Se planter, comprendre pourquoi, recommencer autrement. Pas une fois — en boucle, sur des années. C'est inconfortable, parfois décourageant, mais c'est aussi là que les choses sérieuses se construisent.

Je ne suis pas ingénieur de formation. Je n'ai pas de diplôme qui valide ce que je fais. Et pourtant, aujourd'hui je maintiens 1 350 tests, j'ai conçu les outils qui permettent de les analyser, et je contribue au quotidien à un produit utilisé par de vraies personnes.

Ce n'est pas malgré le manque de formation. C'est en partie grâce à lui — parce qu'il m'a forcé à chercher, à comprendre vraiment, à ne jamais me contenter d'une réponse copiée-collée sans en saisir le sens.

Si tu es dans une situation similaire : ne baisse pas les bras. Le chemin est plus long, c'est vrai. Mais ce que tu construis dessus t'appartient entièrement.

