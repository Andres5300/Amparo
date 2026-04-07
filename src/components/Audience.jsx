import SectionTitle from './SectionTitle';

const cases = [
  {
    title: 'EPS no autoriza procedimiento',
    icon: (
      <>
        <path
          d="M14 3l7 7-3 3-7-7M6 21l6-6M5 14l5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )
  },
  {
    title: 'Sin agua o luz',
    icon: (
      <>
        <path
          d="M9 18h6M10 21h4M8 14c-1.9-1.5-2.8-4-2.1-6.4A6.5 6.5 0 0 1 12 3a6.5 6.5 0 0 1 6.1 4.6c.7 2.4-.2 4.9-2.1 6.4-.8.7-1.2 1.2-1.4 2H9.4c-.2-.8-.6-1.3-1.4-2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )
  },
  {
    title: 'Banco no responde',
    icon: (
      <>
        <path
          d="M3 9l9-5 9 5M5 10h14M7 10v8M12 10v8M17 10v8M4 20h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )
  },
  {
    title: 'Entidad pública no responde',
    icon: (
      <>
        <path
          d="M3 8l9-5 9 5M4.5 9.5h15M6.5 9.5v8M12 9.5v8M17.5 9.5v8M4 20h16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )
  }
];

const Audience = () => {
  return (
    <section id="para-quien" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionTitle
          eyebrow="¿Para quién es?"
          title="Casos reales donde Amparo te ayuda"
          description="Si sientes que no te responden, esta herramienta te permite actuar con un documento sólido."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-emerald-200"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-warm-100 text-emerald-700"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;