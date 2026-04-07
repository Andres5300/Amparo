import PrimaryButton from './PrimaryButton';
import { CTA_URL } from '../constants/links';

const FinalCTA = () => {
  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24" data-reveal>
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-emerald-700 px-6 py-12 text-center shadow-soft sm:px-12">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Tu derecho no puede esperar más.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
          Empieza hoy y obtén tu documento listo para radicar en minutos.
        </p>

        <div className="mt-8">
          <PrimaryButton
            href={CTA_URL}
            className="bg-white text-emerald-700 hover:bg-warm-100"
            ariaLabel="Generar mi documento ahora"
            withArrow
          >
            Generar mi documento ahora
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;