
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
<link rel="stylesheet" href="/percorso/robot-assets/index.css">

<!-- Nel punto dove vuoi inserire il robot -->
<div id="robot-container" style="width: 100%; height: 500px;"></div>

<!-- Prima della chiusura del tag </body> -->
<script src="/percorso/robot-assets/index.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il robot
    const robotApi = window.InitTalkingRobot('robot-container');
    
    // Per farlo parlare, usa:
    // robotApi.speak('Ciao mondo!', 'it-IT');
  });
</script>`}</pre>
            </div>
            
            <p className="mt-3 mb-1">Ricorda di sostituire <code className="bg-muted px-1 rounded">/percorso/</code> con il percorso effettivo dove hai caricato i file sul tuo server.</p>
            <p className="text-xs text-muted-foreground">Il pacchetto include anche un file README.md con ulteriori dettagli e opzioni di configurazione.</p>
          </div>
        ),
      });
    }, 6000);
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download size={16} />
      <span>Esporta Robot</span>
    </Button>
  );
};

export default ExportButton;
