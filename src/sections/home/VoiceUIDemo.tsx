import { useEffect, useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VoiceUIDemo() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [answer, setAnswer] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Basic voice recognition (browser dependent)
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setTranscript(text);
        // Placeholder: short, fitness-focused response
        setAnswer('Focus on consistency: 30–45 min strength + 8k steps daily. Keep protein high and hydrate.');
      };
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const start = () => {
    if (recognitionRef.current && !listening) {
      setTranscript('');
      setAnswer('');
      setListening(true);
      recognitionRef.current.start();
    }
  };
  const stop = () => recognitionRef.current?.stop();

  return (
    <section aria-label="Voice UI Demo" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Voice User Interface</h2>
          <p className="text-white/70">Hands-free fitness guidance with concise answers.</p>
        </div>
        <div className="glassmorphism rounded-2xl p-6 border-0 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {!listening ? (
              <Button onClick={start} className="btn-primary rounded-xl px-6">
                <Mic className="h-5 w-5 mr-2" /> Ask by Voice
              </Button>
            ) : (
              <Button variant="outline" onClick={stop} className="rounded-xl px-6">
                <Square className="h-5 w-5 mr-2" /> Stop
              </Button>
            )}
          </div>
          <div className="mt-6 grid gap-4">
            {transcript && (
              <div className="bg-background/40 rounded-xl p-4"><p className="text-sm text-white/70">You</p><p className="text-white">{transcript}</p></div>
            )}
            {answer && (
              <div className="bg-background/60 rounded-xl p-4 border border-border"><p className="text-sm text-white/70">Bodify Coach</p><p className="text-white/90">{answer}</p></div>
            )}
          </div>
          <p className="text-xs text-center text-white/50 mt-4">Note: Voice features depend on browser support.</p>
        </div>
      </div>
    </section>
  );
}
