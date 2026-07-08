# Carte Lovelace : Île‑de‑France Mobilité

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square&logo=HomeAssistantCommunityStore&logoColor=white)](https://github.com/hacs/integration)
[![release](https://img.shields.io/github/v/release/bontiv/lovelace-idf-mobilite?style=flat-square)](https://github.com/bontiv/lovelace-idf-mobilite/releases)
[![last_commit](https://img.shields.io/github/last-commit/bontiv/lovelace-idf-mobilite/main?style=flat-square)](https://github.com/bontiv/lovelace-idf-mobilite/commits/main)
[![issues](https://img.shields.io/github/issues/bontiv/lovelace-idf-mobilite?style=flat-square)](https://github.com/bontiv/lovelace-idf-mobilite/issues)
[![stars](https://img.shields.io/github/stars/bontiv/lovelace-idf-mobilite?style=flat-square)](https://github.com/bontiv/lovelace-idf-mobilite/stargazers)
[![license](https://img.shields.io/github/license/bontiv/lovelace-idf-mobilite?style=flat-square)](https://github.com/bontiv/lovelace-idf-mobilite/blob/main/LICENSE)

[![companion_badge](https://img.shields.io/badge/Companion%20Integration-IDF%20Mobilité%20Assistant-5A4FCF?style=flat-square&logo=homeassistant&logoColor=white)](https://github.com/yyrkoon94/idf-mobilite-assistant)
[![prim_api](https://img.shields.io/badge/Made%20for-IDFM%20PRIM%20API-0078D4?style=flat-square)](https://prim.iledefrance-mobilites.fr/)
[![made_in_idf](https://img.shields.io/badge/Made%20in-%C3%8Ele--de--France-E1000F?style=flat-square&logo=france&logoColor=white)](https://www.iledefrance.fr/)

---

Ce dépôt reprend une grande partie du travail de [yyrkoon94](https://github.com/yyrkoon94/lovelace-idf-mobilite), mais avec un bon nettoyage, un petit coup de bundle, une meilleure compatibilité avec les dernières version de Home Assistant (testé avec la version 2026).

## Installation

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=bontiv&repository=lovelace-idf-mobilite&category=plugin)

Installation par HACS.

---

## 🆕 Intégration Home Assistant dédiée

La carte nécessite **l'intégration Home Assistant IDF Mobilite**, permettant :

- configuration **100% UI** (plus de YAML)
- recherche d’arrêt intégrée
- création automatique des entités
- gestion des perturbations et messages
- compatibilité totale avec la carte Lovelace

👉 **Intégration IDF Mobilité Assistant :**
https://github.com/yyrkoon94/idf-mobilite-assistant

---

## Présentation

Cette carte Lovelace affiche les prochains passages des transports du réseau **Île‑de‑France Mobilités** :

- Bus
- Tram
- Métro
- RER
- SNCF

Elle utilise l’API **PRIM** (*Plateforme Régionale d’Information pour la Mobilité*).

> ⚠️ **Quota PRIM** : les comptes créés depuis mars 2024 disposent de 1000 appels/jour.
> Ajustez la fréquence de rafraîchissement ou demandez une augmentation de quota.

---

## Captures d’écran
<p align="center">
  <img src="https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/screenshot1.png" width="450">
  <img src="https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/screenshot1.png" width="450">
</p>

<p align="center">
   <img src="https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/screenshot2.png" width="450">
</p>

---

### 1. Installer l’intégration
→ Paramètres → Appareils & Services → Ajouter une intégration → **IDF Mobilité Assistant**

### 2. Ajouter vos arrêts
L’intégration vous permet :

- de rechercher un arrêt
- de rechercher une ligne pour les messages de perturbation
- de créer automatiquement les entités nécessaires

### 3. Ajouter la carte Lovelace
Dans votre tableau de bord :

- Ajouter une carte
- Choisir **Carte IDF Mobilité**
- Sélectionner les entités créées par l’intégration

---

# Configuration de la carte

La carte dispose d’un éditeur graphique complet dans Home Assistant.

<p align="center">
   <img src="https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/cardeditor.png" width="700">
</p>

---

## 🟦 1. Type d’arrêt

Choisissez le type de ligne :

- **RER / SNCF**
- **Bus / Tram / Métro**

Certaines options dépendent de ce choix.

---

## 🟩 2. Premier arrêt

Sélectionnez l’entité contenant les données **Siri**.

### Filtrage des lignes

- **Lignes à exclure**
  Exemple : `bus-210;metro-11`

- **Références de lignes à exclure**
  Pour filtrer des branches spécifiques.

### Options BUS
- Inclure uniquement certaines destinations
- Ou exclure certaines destinations
- Switch pour inverser le comportement

### Options RER / SNCF
- Nombre de départs à afficher
- Délai maximum (minutes)
- Afficher l’heure au lieu du délai
  - Option : conserver le délai pour X départs
- Afficher le quai
- Grouper les destinations
  - Libellé personnalisé possible

---

## 🟧 3. Second arrêt (optionnel)

Permet d’afficher une seconde ligne dans la même carte.

Options identiques au premier arrêt.

---

## 🟥 4. Messages (optionnel)

La carte peut afficher les messages d’information et de perturbation.

### Sélection des entités
Vous pouvez sélectionner **une ou plusieurs entités** contenant `disruptions`.

### Options
- Filtrer les messages par texte
- Afficher les perturbations
- Afficher les alertes
- Afficher les messages d’information
- Mode statique (pas de défilement)

---

## 🟦 5. Options générales d’affichage

- Mode écran (style panneau TV)
- Afficher le nom de la station
- Mode sans bordure
- Faire scroller les destination si elle
- BUS : afficher “à l’approche / à l’arrêt”
- BUS : afficher 3 départs
- RER : afficher les bus de remplacement
- Gestion des transports supprimés ou retardés
<img src="https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/cancel_and_three.png" width="400">
---

## 🟪 6. Aide à la configuration

- Afficher les références des lignes
  → utile pour configurer les filtres avancés

---
# Configuration manuelle (optionnelle)

Depuis la sortie de l’intégration **IDF Mobilité Assistant**, la création manuelle de capteurs REST n’est plus nécessaire.

Cependant, pour les utilisateurs souhaitant conserver une configuration entièrement manuelle, voici les exemples de configuration REST pour les données PRIM.

---

## Capteur REST — Prochains passages (StopMonitoring)

```yaml
sensor:
  - platform: rest
    name: prim_la_defense
    unique_id: 00000000-0000-0000-0000-000000000000
    resource: https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring
    method: GET
    params:
      MonitoringRef: "STIF:StopArea:SP:71517:"     # StopArea ou StopPoint
    headers:
      apiKey: "VOTRE_API_KEY_PRIM"
    scan_interval: 60
    timeout: 30
    value_template: "OK"
    json_attributes:
      - Siri
```
### Trouver votre StopArea et votre LineRef

#### StopArea et StopPoint

Un **StopArea** est une chaîne de la forme :
**STIF:StopArea:SP:XXXXX:**
où **XXXXX** correspond au code de la zone d’arrêt.

Pour trouver cette valeur, rendez‑vous sur le [référentiel IDFM des arrêts][area-reference-url]. Vous verrez une carte similaire à celle‑ci :

![Screenshot](https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/stoparea1.png)

Dans le menu de droite, désélectionnez **Accès** et **Arrêts Transporteur**, puis recherchez une adresse (ou déplacez la carte) pour atteindre l’endroit souhaité.
En zoomant, vous verrez trois types d’éléments :

1. **Zone de correspondance** (trait rouge épais)
2. **StopArea** (trait rouge fin)
3. **Stop / arrêt ponctuel** (icône marqueur)

![Screenshot](https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/stoparea2.png)

Cliquez sur l’un de ces éléments pour afficher les détails et récupérer le **code de zone** :

![Screenshot](https://raw.githubusercontent.com/yyrkoon94/lovelace-idf-mobilite/master/areacode.png)

Dans cet exemple, le code est **71517**, ce qui donne :
**STIF:StopArea:SP:71517:**

Si vous choisissez un **StopPoint**, vous pouvez utiliser :

- la syntaxe StopArea : **STIF:StopArea:SP:43032:**
- ou la syntaxe StopPoint : **STIF:StopPoint:Q:41442:**

---

Vous pouvez créer autant de capteurs que nécessaire pour suivre un StopArea, un StopPoint ou une ligne spécifique.

---

## Crédits

Carte inspirée du travail de [Lesensei](https://github.com/lesensei) sur [idfm-card](https://github.com/lesensei/idfm-card).
