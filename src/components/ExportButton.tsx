
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
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download size={16} />
      <span>Esporta Robot</span>
    </Button>
  );
};

export default ExportButton;
