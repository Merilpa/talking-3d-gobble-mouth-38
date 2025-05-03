
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ExportButton = () => {
  const { toast } = useToast();
  
  const handleExport = async () => {
    toast({
      title: "Preparazione esportazione",
      description: "Sto preparando i file del robot...",
      duration: 3000,
    });
    
    // In un'applicazione reale, qui genereremmo il pacchetto
    // Poiché non possiamo farlo direttamente nel browser, mostriamo le istruzioni
    setTimeout(() => {
      toast({
        title: "Esportazione pronta",
        description: "Scarica il pacchetto del robot cliccando il pulsante qui sotto",
        duration: 10000,
        action: (
          <a 
            href="/robot-package.zip" 
            download="robot-parlante.zip"
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              backgroundColor: "hsl(var(--primary))",
              color: "white",
              borderRadius: "0.375rem",
              textDecoration: "none",
              marginTop: "0.5rem"
            }}
          >
            Scarica ZIP
          </a>
        ),
      });
    }, 1500);
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <Download size={16} />
      <span>Esporta Robot</span>
    </Button>
  );
};

export default ExportButton;
