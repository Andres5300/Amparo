const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 md:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-black text-white">
              A
            </span>
            <span className="text-2xl font-extrabold text-slate-900">Amparo</span>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Herramienta de asistencia para redacción de documentos. No constituye asesoría
            jurídica.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-600 md:text-right">
          <p>
            <a href="#" className="font-medium transition hover:text-emerald-700">
              Términos y condiciones
            </a>
            {' · '}
            <a href="#" className="font-medium transition hover:text-emerald-700">
              Política de privacidad
            </a>
          </p>
          <p>
            WhatsApp:{' '}
            <a
              href="https://wa.me/573001112233"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-emerald-700 transition hover:text-emerald-800"
            >
              +57 300 111 2233
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;