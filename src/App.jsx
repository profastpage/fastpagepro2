import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Menu,
  MessageCircle,
  Moon,
  Shield,
  Star,
  Sun,
  Users,
  X,
  Zap
} from 'lucide-react';

const WHATSAPP_NUMBER = '51906431630';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop'
];

const TESTIMONIALS = [
  { name: 'Carlos Mendoza', hotel: 'Hotel Vista Boutique', text: 'La plataforma es rápida y elegante. Reservamos más por WhatsApp.' },
  { name: 'Ana Vega', hotel: 'Cabañas del Valle', text: 'Nos ayudó a profesionalizar la imagen del hotel.' },
  { name: 'Roberto Sánchez', hotel: 'Boutique Lima', text: 'Muy fácil de usar y con buen soporte.' }
];

const PLANS = [
  { name: 'START', price: '700', features: ['Hosting incluido', 'Botón WhatsApp', 'Diseño responsivo'] },
  { name: 'PRO', price: '1200', features: ['Todo START', 'SEO intermedio', 'Diseño premium'], featured: true },
  { name: 'BUSINESS', price: '1700', features: ['Todo PRO', 'PWA instalable', 'Soporte 24/7'] }
];

function WhatsAppButton({ text, message = 'Hola, quiero información', className = '', variant = 'primary' }) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const variants = {
    primary: 'bg-stone-950 text-white hover:bg-stone-800 dark:bg-white dark:text-stone-950',
    outline: 'border border-stone-200 text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:text-white dark:hover:bg-stone-800'
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition ${variants[variant]} ${className}`}
    >
      {text}
      <ArrowRight size={16} />
    </a>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 dark:border-stone-800">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between py-6 text-left">
        <span className="text-lg font-medium text-stone-900 dark:text-white">{q}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {open && (
          <p className="pb-6 text-stone-600 dark:text-stone-400">
            {a}
          </p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 transition-colors dark:bg-stone-950 dark:text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-stone-950/85 backdrop-blur text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 text-stone-950">
              <Zap size={20} className="fill-stone-950" />
            </div>
            FastPagePro
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {['demo', 'testimonios', 'planes', 'faq'].map((id) => (
              <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
                {id.toUpperCase()}
              </a>
            ))}
            <button onClick={toggleTheme} className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          <button onClick={() => setMobileMenu((v) => !v)} className="md:hidden grid h-10 w-10 place-items-center rounded-lg bg-white/10">
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <div className="border-t border-white/10 bg-stone-950 px-4 pb-4 md:hidden">
              {['demo', 'testimonios', 'planes', 'faq'].map((id) => (
                <a key={id} href={`#${id}`} className="block py-3 text-white/80" onClick={() => setMobileMenu(false)}>
                  {id.toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </AnimatePresence>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
        <AnimatePresence mode="wait">
          <img
            key={heroIdx}
            src={HERO_IMAGES[heroIdx]}
            alt="Hotel"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold tracking-[0.2em]">
            <Zap size={14} className="fill-yellow-400 text-yellow-400" /> +500 HOTELES
          </p>
          <h1 className="mx-auto mb-6 max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">Reservas directas. Sin comisiones.</h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-stone-200">Landing premium para hoteles con cierre de ventas directo por WhatsApp.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton text="Agendar Demo" />
            <WhatsAppButton text="Hablar con Asesor" variant="outline" className="!text-white !border-white hover:!bg-white/10" />
          </div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 text-white dark:bg-stone-900">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          {[
            { icon: Zap, value: '40%', label: 'Más reservas' },
            { icon: Users, value: '500+', label: 'Hoteles activos' },
            { icon: BarChart3, value: '18%', label: 'Comisión ahorrada' }
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <item.icon className="mx-auto mb-4" />
              <div className="mb-1 text-4xl font-bold">{item.value}</div>
              <div className="text-stone-300">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="bg-white py-24 dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">Demo de Conversión</h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-stone-500">Tu visitante ve, confía y te escribe directo al WhatsApp en segundos.</p>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 shadow-2xl dark:border-stone-800">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" alt="Demo" className="aspect-video w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="testimonios" className="bg-stone-50 py-24 dark:bg-stone-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Testimonios</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-stone-200 bg-white p-7 dark:border-stone-800 dark:bg-stone-950">
                <div className="mb-4 flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-stone-900 text-stone-900 dark:fill-white dark:text-white" />)}</div>
                <p className="mb-6 text-stone-600 dark:text-stone-300">"{t.text}"</p>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-stone-500">{t.hotel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="bg-stone-950 py-24 text-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Planes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`rounded-[2rem] border p-8 ${plan.featured ? 'bg-white text-stone-950 border-white' : 'bg-white/5 border-white/10'}`}>
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-4xl font-black">S/ {plan.price}</p>
                <ul className="mb-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check size={16} className={plan.featured ? 'text-stone-950' : 'text-white'} /> {feature}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton text="Seleccionar" message={`Quiero el plan ${plan.name}`} variant={plan.featured ? 'primary' : 'outline'} className="w-full !justify-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-24 dark:bg-stone-950">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-4xl font-bold">FAQ</h2>
          <FAQItem q="¿Necesito conocimientos técnicos?" a="No. Nos encargamos del diseño, hosting y configuración." />
          <FAQItem q="¿Puedo editar mi contenido?" a="Sí, te dejamos una base editable y soporte inicial." />
          <FAQItem q="¿Tiene soporte?" a="Sí, según plan, con prioridad y atención continua." />
        </div>
      </section>

      <footer className="bg-stone-950 py-12 text-center text-stone-400">
        <div className="container mx-auto px-4">
          <div className="mb-5 flex justify-center gap-6 text-sm">
            <span className="inline-flex items-center gap-1"><Shield size={14} /> SSL Seguro</span>
            <span className="inline-flex items-center gap-1"><Clock size={14} /> Soporte 24/7</span>
            <span className="inline-flex items-center gap-1"><Calendar size={14} /> Sin contrato</span>
          </div>
          <div className="mb-3 flex items-center justify-center gap-4">
            <Globe size={18} /> <MessageCircle size={18} />
          </div>
          <p className="text-xs">© 2026 FastPagePro</p>
        </div>
      </footer>
    </div>
  );
}

