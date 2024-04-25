// mon_script.js

const { spawn } = require('child_process');

module.exports = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const knowledge = req.body.knowledge;

      // Appel de la fonction Python
      const pythonProcess = spawn('python', ['mon_script.py', knowledge]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`Résultat de la sortie : ${data}`);
        // Envoyez le résultat en réponse HTTP
        res.status(200).json({ message: 'Fonction Python exécutée avec succès', result: data.toString() });
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Erreur de sortie : ${data}`);
        // Gérez les erreurs
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'exécution de la fonction Python' });
      });
    } else {
      // Gérez les autres méthodes de requête si nécessaire
      res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    // Gérez les erreurs
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'exécution de la fonction Python' });
  }
};
