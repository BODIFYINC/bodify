import { motion } from 'framer-motion';
import { Mic, Watch, Ruler, Activity, Fingerprint } from 'lucide-react';

const items = [
  { Icon: VoiceIcon, label: 'Voice control' },
  { Icon: Watch, label: 'Wearable sync' },
  { Icon: Ruler, label: 'Body metrics' },
  { Icon: Activity, label: 'Activity level' },
  { Icon: Fingerprint, label: 'Biometric auth' },
];

function VoiceIcon(props: any) { return <Mic {...props} />; }

export default function BiometricsStrip() {
  return (
    <section aria-label="Personalization & Biometrics" className="py-16 bg-gradient-to-b from-bodify-darker via-bodify-dark to-bodify-darker">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {items.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="glassmorphism rounded-2xl p-4 border-0 text-center"
            >
              <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-bodify-gradient flex items-center justify-center animate-icon-pop">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-white/80 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
