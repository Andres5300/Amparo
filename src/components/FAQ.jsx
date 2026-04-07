import { useState } from 'react';
import SectionTitle from './SectionTitle';

const faqItems = [
  {
    question: '¿Necesito abogado?',
    answer:
      'No. La plataforma está diseñada para que cualquier persona pueda generar su documento con guía clara y lenguaje sencillo.'
  },
  {
    question: '¿Funciona realmente?',
    answer:
      'Sí. La tutela y el derecho de petición son mecanismos válidos en Colombia y normalmente exigen respuesta en aproximadamente 10 días hábiles, según el caso.'
  },
  {
    question: '¿Y si no me sirve?',
    answer: 'Te devolvemos tu dinero si no quedas satisfecho con el resultado del servicio.'
  },
  {
    question: '¿Dónde presento?',
    answer:
      'Al finalizar, te mostramos paso a paso dónde radicar tu documento y qué soporte adicional puedes adjuntar para fortalecer tu solicitud.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <SectionTitle
          eyebrow="FAQ"
          title="Resolvemos tus dudas antes de empezar"
          description="Transparencia total para que tomes la decisión con confianza."
        />

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                data-reveal
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-slate-900 sm:text-lg">{item.question}</span>
                  <span
                    className={`text-2xl font-light text-emerald-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-600 sm:px-6">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;