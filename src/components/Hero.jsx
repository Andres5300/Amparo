import PrimaryButton from './PrimaryButton';
import { CTA_URL } from '../constants/links';

const TrustPill = ({ text }) => (
  <div className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
    {text}
  </div>
);

const HeroIllustration = () => {
  return (
    <div
      className="relative mx-auto mt-10 w-full max-w-md rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-card sm:p-8 lg:mt-0"
      data-reveal
    >
      <div className="absolute -left-5 top-8 h-10 w-10 rounded-full bg-warm-300/80 blur-sm" aria-hidden="true" />
      <div className="absolute -right-4 bottom-12 h-14 w-14 rounded-full bg-emerald-200/80 blur-sm" aria-hidden="true" />

      <svg viewBox="0 0 360 320" className="h-full w-full animate-float" role="img" aria-label="Persona tranquila usando su celular">
        <rect x="18" y="36" width="324" height="250" rx="26" fill="#ffffff" />
        <rect x="34" y="52" width="290" height="220" rx="20" fill="#effef6" />

        <circle cx="104" cy="102" r="33" fill="#f6d673" />
        <path d="M78 166c12-24 49-29 70-9 17 16 20 45 8 65H60c0-18 6-39 18-56z" fill="#0e9f6e" />
        <rect x="118" y="142" width="48" height="86" rx="11" fill="#0a7a54" />
        <rect x="125" y="151" width="34" height="64" rx="7" fill="#ffffff" />
        <circle cx="142" cy="219" r="2.8" fill="#d8fbe8" />

        <rect x="194" y="89" width="108" height="25" rx="10" fill="#d8fbe8" />
        <rect x="194" y="122" width="120" height="17" rx="8" fill="#c8f1dd" />
        <rect x="194" y="145" width="100" height="17" rx="8" fill="#c8f1dd" />

        <circle cx="202" cy="198" r="27" fill="#f4c95d" />
        <path d="M189 198l10 10 17-17" stroke="#054130" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left" data-reveal>
          <p className="inline-flex items-center rounded-full bg-warm-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-warm-700">
            Solución legaltech en Colombia
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            ¿Te están ignorando? Exige tu derecho hoy.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
            Genera tu tutela o derecho de petición en menos de 10 minutos, sin abogado y sin
            complicaciones.
          </p>

          <div className="mt-8 flex justify-center">
            <PrimaryButton href={CTA_URL} withArrow ariaLabel="Empezar ahora por 30 mil pesos">
              Empezar ahora — $30.000
            </PrimaryButton>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Si no quedas satisfecho, te devolvemos tu dinero.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <TrustPill text="Proceso guiado paso a paso" />
            <TrustPill text="Pago único, sin suscripciones" />
            <TrustPill text="Listo para presentar" />
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
};

export default Hero;