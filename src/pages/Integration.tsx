
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Integration = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Istruzioni per l'Integrazione</h1>
          <Link to="/">
            <Button variant="outline">Torna al Robot</Button>
          </Link>
        </div>
      </header>
      
      <main>
        <Tabs defaultValue="iframe" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="iframe">Integrazione con iFrame</TabsTrigger>
            <TabsTrigger value="javascript">Integrazione JavaScript</TabsTrigger>
            <TabsTrigger value="export">Esportazione Completa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="iframe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrazione con iFrame</CardTitle>
                <CardDescription>
                  Il metodo più semplice per integrare il robot nel tuo sito
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Copia e incolla questo codice HTML nel punto in cui vuoi che appaia il robot:
                </p>
                <div className="bg-muted p-4 rounded-md overflow-auto">
                  <pre className="text-sm">
{`<iframe 
  src="https://tuo-url-qui.com" 
  width="100%" 
  height="600" 
  frameborder="0"
  allow="microphone"
></iframe>`}
                  </pre>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Controllo tramite JavaScript</h3>
                  <p className="mb-4">
                    Puoi comunicare con il robot attraverso l'iFrame usando questo JavaScript:
                  </p>
                  <div className="bg-muted p-4 rounded-md overflow-auto">
                    <pre className="text-sm">
{`// Riferimento all'iFrame
const robotFrame = document.getElementById('robot-frame');

// Fai parlare il robot
function speakText(text, language = 'it-IT') {
  robotFrame.contentWindow.postMessage({
    text: text,
    language: language, // 'it-IT', 'fr-FR', 'de-DE', 'es-ES'
    speak: true
  }, '*');
}

// Esempio di utilizzo
speakText('Ciao, sono un robot!', 'it-IT');`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="javascript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrazione JavaScript</CardTitle>
                <CardDescription>
                  Integrazione avanzata per siti statici senza Node.js
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Questa opzione richiede di copiare i file compilati nella tua cartella di assets:
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Passo 1: Scarica i file</h3>
                <p className="mb-4">
                  Dopo aver implementato l'app, scarica i file dalla cartella <code>dist</code> generati
                  con il comando <code>npm run build</code>.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Passo 2: Carica i file sul tuo server</h3>
                <p className="mb-4">
                  Carica tutti i file nella cartella <code>assets</code> o <code>public</code> del tuo sito.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Passo 3: Aggiungi al tuo HTML</h3>
                <div className="bg-muted p-4 rounded-md overflow-auto">
                  <pre className="text-sm">
{`<!-- Nel tag <head> del tuo HTML -->
<link rel="stylesheet" href="/percorso/ai-assets/index.css">

<!-- Nel punto dove vuoi inserire il robot -->
<div id="robot-container" style="width: 100%; height: 600px;"></div>

<!-- Prima della chiusura del tag </body> -->
<script src="/percorso/ai-assets/index.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il robot
    if (window.InitTalkingRobot) {
      window.InitTalkingRobot('robot-container');
      
      // Esempio di come farlo parlare
      // window.robotAPI.speak('Ciao mondo!', 'it-IT');
    }
  });
</script>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Esportazione Completa</CardTitle>
                <CardDescription>
                  Come esportare tutto il progetto per hosting senza Node.js
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Se vuoi ospitare l'applicazione completa su un server senza Node.js:
                </p>
                
                <h3 className="text-lg font-medium mb-2">Passo 1: Compila l'applicazione</h3>
                <div className="bg-muted p-4 rounded-md overflow-auto">
                  <pre className="text-sm">
{`# Nel terminale del progetto
npm run build`}
                  </pre>
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Passo 2: Trasferisci i file generati</h3>
                <p className="mb-4">
                  Dopo la compilazione, tutti i file necessari saranno nella cartella <code>dist</code>.
                  Trasferisci tutti questi file nella cartella principale del tuo hosting web.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Passo 3: Configurare il server</h3>
                <p className="mb-4">
                  Per hosting che non supportano routing SPA, aggiungi un file <code>.htaccess</code> (Apache) o equivalente per il tuo server:
                </p>
                
                <div className="bg-muted p-4 rounded-md overflow-auto mt-2">
                  <pre className="text-sm">
{`# Per Apache (.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`}
                  </pre>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md dark:bg-blue-950 dark:border-blue-400">
                  <h3 className="text-lg font-medium mb-2 text-blue-700 dark:text-blue-300">Nota importante</h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    Questo metodo è adatto per hosting statici come GitHub Pages, Amazon S3, Netlify, ecc.
                    Funziona anche su hosting tradizionali con server web come Apache o Nginx.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Integration;
