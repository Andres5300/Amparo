import PrimaryButton from './PrimaryButton';
import { CTA_URL } from '../constants/links';

const navItems = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Casos comunes', href: '#para-quien' },
  { label: 'FAQ', href: '#faq' }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Ir al inicio de Amparo">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-xl font-black text-white">
            A
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">Amparo</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <PrimaryButton href={CTA_URL} small>
          Generar mi documento
        </PrimaryButton>
      </nav>
    </header>
  );
};

export default Navbar;