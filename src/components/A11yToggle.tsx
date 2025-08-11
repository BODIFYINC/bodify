import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accessibility, Contrast } from 'lucide-react';

export default function A11yToggle() {
  const [large, setLarge] = useState(false);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-large-font', large);
  }, [large]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('a11y-high-contrast', contrast);
  }, [contrast]);

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setLarge(v => !v)} aria-pressed={large} className="rounded-lg">
        <Accessibility className="h-4 w-4 mr-2" /> A+
      </Button>
      <Button variant="outline" onClick={() => setContrast(v => !v)} aria-pressed={contrast} className="rounded-lg">
        <Contrast className="h-4 w-4 mr-2" /> Contrast
      </Button>
    </div>
  );
}
