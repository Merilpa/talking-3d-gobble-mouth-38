
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ExportButton = () => {
  const { toast } = useToast();
  
  const handleExport = async () => {
    toast({
      title: "Informazioni sull'esportazione",
      description: "Per ottenere un pacchetto ZIP funzionante, segui le istruzioni...",
      duration: 5000,
    });
    
    // Mostra istruzioni dettagliate dopo un breve ritardo
    setTimeout(() => {
      toast({
        title: "Come esportare il robot",
        description: "Per ottenere un pacchetto ZIP funzionante del robot, esegui questi passaggi nel tuo terminale:",
        duration: 20000,
        action: (
          <div className="mt-2 text-sm">
            <p className="mb-2 font-medium">Passaggi:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Clona il repository: <code className="bg-muted px-1 rounded">git clone [URL-REPOSITORY]</code></li>
              <li>Installa le dipendenze: <code className="bg-muted px-1 rounded">npm install</code></li>
              <li>Esegui il comando: <code className="bg-muted px-1 rounded">npm run build:robot-zip</code></li>
              <li>Troverai il file <code className="bg-muted px-1 rounded">robot-package.zip</code> nella cartella principale</li>
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Nota: Il download diretto dal browser potrebbe creare ZIP corrotti a causa delle limitazioni del browser stesso.</p>
          </div>
        ),
      });
    }, 1000);
    
    // Aggiungiamo istruzioni su come utilizzare lo zip dopo averlo scaricato
    setTimeout(() => {
      toast({
        title: "Come utilizzare il robot sul tuo sito",
        description: "Dopo aver ottenuto il file ZIP, segui questi passaggi per integrare il robot sul tuo sito web:",
        duration: 30000,
        action: (
          <div className="mt-2 text-sm">
            <p className="mb-2 font-medium">Passaggi per l'installazione:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Estrai il contenuto del file ZIP</li>
              <li>Carica i file estratti (cartella <code className="bg-muted px-1 rounded">robot-assets</code>) sul tuo server web</li>
              <li>Aggiungi questo codice nella pagina HTML del tuo sito:</li>
            </ol>
            
            <div className="mt-3 p-3 bg-muted rounded-md overflow-x-auto text-xs">
              <pre>{`<!-- Nel tag <head> del tuo HTML -->
<link rel="stylesheet" href="robot-assets/talking-robot.css">

<!-- Nel punto dove vuoi inserire il robot -->
<div id="robot-container" style="width: 100%; height: 500px;"></div>

<!-- Prima della chiusura del tag </body> -->
<script src="robot-assets/talking-robot.umd.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il robot
    const robotApi = window.InitTalkingRobot('robot-container');
    
    // Per farlo parlare, usa:
    // robotApi.speak('Ciao mondo!', 'it-IT');
  });
</script>`}</pre>
            </div>
            
            <p className="mt-3 mb-1">Importante: Assicurati che i nomi dei file corrispondano esattamente a quelli nella cartella <code className="bg-muted px-1 rounded">robot-assets</code>. Potrebbero essere <code>talking-robot.umd.js</code> e <code>talking-robot.css</code> invece di <code>index.js</code> e <code>index.css</code>.</p>
            <p className="text-xs text-muted-foreground">Se continui a vedere errori 404, controlla i nomi esatti dei file nella cartella e modifica di conseguenza i percorsi nel codice HTML.</p>
          </div>
        ),
      });
    }, 6000);

    // Aggiungiamo un toast con soluzioni ai problemi comuni
    setTimeout(() => {
      toast({
        title: "Risoluzione di problemi comuni",
        description: "Se stai riscontrando errori 404 o altri problemi nell'integrazione del robot:",
        duration: 40000,
        action: (
          <div className="mt-2 text-sm">
            <p className="mb-2 font-medium">Problemi comuni e soluzioni:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Errori 404 per i file JS/CSS:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Verifica che i nomi dei file corrispondano esattamente a quelli nella cartella <code>robot-assets</code></li>
                  <li>Prova ad usare percorsi assoluti (es. <code>https://tuosito.com/robot-assets/talking-robot.umd.js</code>)</li>
                  <li>Controlla che la cartella <code>robot-assets</code> sia accessibile dal tuo server web</li>
                </ul>
              </li>
              <li>
                <strong>Errore 404 per manifest.json:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Questo non è necessario per il robot, puoi ignorarlo</li>
                  <li>Se il problema persiste, aggiungi un file vuoto <code>manifest.json</code> nella cartella principale</li>
                </ul>
              </li>
              <li>
                <strong>Robot non visibile:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Assicurati che il container abbia una larghezza e altezza definite (es. <code>height: 500px</code>)</li>
                  <li>Verifica che non ci siano errori nella console del browser</li>
                </ul>
              </li>
              <li>
                <strong>Errori di caricamento Three.js:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Assicurati che tutti i file nella cartella <code>robot-assets</code> siano stati caricati</li>
                  <li>Potrebbe essere necessario aggiungere <code>crossorigin="anonymous"</code> ai tag script</li>
                </ul>
              </li>
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">Nota: Il robot utilizza Three.js che richiede un server web funzionante. Non funzionerà aprendo semplicemente il file HTML in locale.</p>
          </div>
        ),
      });
    }, 12000);
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download size={16} />
      <span>Esporta Robot</span>
    </Button>
  );
};

export default ExportButton;
