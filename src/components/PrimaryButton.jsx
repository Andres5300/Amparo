const PrimaryButton = ({
  href,
  children,
  className = '',
  small = false,
  ariaLabel,
  withArrow = false
}) => {
  const sizeClass = small ? 'px-5 py-3 text-sm' : 'px-7 py-4 text-base';

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 ${sizeClass} font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${className}`}
    >
      <span>{children}</span>
      {withArrow ? <span aria-hidden="true">→</span> : null}
    </a>
  );
};

export default PrimaryButton;