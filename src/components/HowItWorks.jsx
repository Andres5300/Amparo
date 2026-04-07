import SectionTitle from './SectionTitle';

const steps = [
  {
    title: 'Cuéntanos qué pasó',
    description: 'Respondes unas preguntas sencillas sobre tu caso',
    icon: (
      <path
        d="M4 5.5C4 4.12 5.12 3 6.5 3h11C18.88 3 20 4.12 20 5.5v8.25c0 1.38-1.12 2.5-2.5 2.5h-6.02l-3.98 3v-3H6.5A2.5 2.5 0 0 1 4 13.75z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  },
  {
    title: 'Generamos tu documento',
    description: 'En segundos, listo para presentar',
    icon: (
      <>
        <path
          d="M7 3.5h8l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M15 3.7V8h4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    )
  },
  {
    title: 'Descárgalo y preséntalo',
    description: 'Te decimos exactamente dónde y cómo',
    icon: (
      <>
        <path
          d="M12 4v10m0 0l-4-4m4 4l4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 16.8V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    )
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionTitle
          eyebrow="Cómo funciona"
          title="Resuelve tu trámite en tres pasos"
          description="Una experiencia simple y guiada para que ejerzas tu derecho sin vueltas ni tecnicismos."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              data-reveal
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  {step.icon}
                </svg>
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-emerald-700">
                Paso {index + 1}
              </p>
              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;