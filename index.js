const sharp = require('sharp');

/**
 * Ajoute le nom de l'artiste en tant que métadonnée à une image et le superpose en transparence.
 * @param {string} inputImagePath - Chemin de l'image d'entrée.
 * @param {string} outputImagePath - Chemin de l'image de sortie avec les métadonnées ajoutées.
 * @param {string} artistName - Nom de l'artiste à ajouter en tant que métadonnée et superposé sur l'image.
 */
async function addArtistMetadataAndOverlay(inputImagePath, outputImagePath, artistName) {
    try {
        // Vérifier le format de l'image
        const metadata = await sharp(inputImagePath).metadata();
        const format = metadata.format;

        // Vérifier si le format est pris en charge
        if (['jpeg', 'png', 'webp', 'tif', 'tiff', 'jpg'].includes(format)) {
            // Ajouter le nom de l'artiste en tant que métadonnée
            await sharp(inputImagePath).toFile(outputImagePath, {
                jpeg: { [format === 'jpeg' ? 'quality' : '']: 100 }, // Pour conserver la qualité d'origine pour les images jpeg
                webp: { lossless: true }, // Pour conserver la qualité d'origine pour les images webp
                png: { compressionLevel: 9 }, // Pour conserver la qualité d'origine pour les images png
                icc: true, // Inclure les profils de couleur ICC pour conserver la qualité des couleurs
                metadata: {
                    artist: artistName // Ajouter le nom de l'artiste
                }
            });

            console.log(`Le nom de l'artiste "${artistName}" a été ajouté aux métadonnées de l'image.`);

            // Superposer le nom de l'artiste en transparence sur l'image
            const watermarkBuffer = Buffer.from(`<svg><text x="50%" y="50%" font-family="Arial" font-size="40" fill="rgba(255, 255, 255, 0.5)" text-anchor="middle">${artistName}</text></svg>`);

            await sharp(inputImagePath)
                .composite([{ input: watermarkBuffer }])
                .toFile(outputImagePath, (err, info) => {
                    if (err) throw err;
                    console.log(`Le nom de l'artiste "${artistName}" a été superposé sur l'image avec transparence.`);
                });
        } else {
            console.error(`Le format d'image "${format}" n'est pas pris en charge.`);
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'ajout des métadonnées et de la superposition du nom de l\'artiste :', error);
    }
}

// Exemple d'utilisation
const inputImagePath = 'illustrations/illustration.webp'; // Chemin de l'image d'entrée
const outputImagePath = 'Résultats/output.webp'; // Chemin de l'image de sortie avec les métadonnées ajoutées et le nom de l'artiste superposé
const artistName = 'Filigrane-Test'; // Nom de l'artiste à ajouter

// Appel de la fonction pour ajouter les métadonnées de l'artiste et superposer le nom de l'artiste sur l'image
addArtistMetadataAndOverlay(inputImagePath, outputImagePath, artistName);
