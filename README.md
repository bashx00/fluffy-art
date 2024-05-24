# fluffy-art

Ce script permet d'ajouter le nom de l'artiste en tant que métadonnée à une image et de le superposer en transparence également.

## Installation

Avant d'exécuter ce script, assurez-vous d'avoir ``Node.js`` installé sur votre machine. <br>
Ensuite, vous pouvez installer les dépendances nécessaires en exécutant la commande suivante :

```bash
npm install sharp
```
Puis pour lancer le script: 
```bash
npm index.js
```

## Utilisation

### Fonction ``addArtistMetadataAndOverlay`` : <br>
La fonction ``addArtistMetadataAndOverlay`` permet d'ajouter le nom de l'artiste en tant que métadonnée à une image et de le superposer en transparence.

### Paramètres:
``inputImagePath``: Chemin de l'image d'entrée.<br>
``outputImagePath``: Chemin de l'image de sortie avec les métadonnées ajoutées.<br>
``artistName``: Nom de l'artiste à ajouter en tant que métadonnée et superposé sur l'image.

```js

const sharp = require('sharp');

async function addArtistMetadataAndOverlay(inputImagePath, outputImagePath, artistName) {
    // Code de la fonction ici...
}

const inputImagePath = 'illustrations/illustration.webp'; // Chemin de l'image d'entrée
const outputImagePath = 'Résultats/output.webp'; // Chemin de l'image de sortie avec les métadonnées ajoutées et le nom de l'artiste superposé
const artistName = 'Filigrane-Test'; // Nom de l'artiste à ajouter

addArtistMetadataAndOverlay(inputImagePath, outputImagePath, artistName);
```
## Formats d'image pris en charge
Le script prend en charge les formats d'image suivants : ``JPEG, PNG, WEBP, TIFF et TIF.``