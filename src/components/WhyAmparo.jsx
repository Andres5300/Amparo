import SectionTitle from './SectionTitle';

const benefits = [
  {
    heading: 'Rápido',
    body: 'Listo en 10 minutos'
  },
  {
    heading: 'Económico',
    body: 'Desde $30.000 — sin abogado'
  },
  {
    heading: 'Confiable',
    body: 'Documentos con respaldo jurídico'
  }
];

const WhyAmparo = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionTitle
          eyebrow="Por qué Amparo"
          title="La forma moderna de defender tus derechos"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map((item, index) => (
            <article
              key={item.heading}
              data-reveal
              className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-white to-emerald-50/70 p-7 shadow-card"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-extrabold text-emerald-700">{item.heading}</h3>
              <p className="mt-3 text-lg font-medium text-slate-700">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAmparo;