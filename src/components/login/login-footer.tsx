const footerLinks = [
  ['Home', 'https://fofoca.me'],
  ['Contato', 'mailto:contato@fofoca.me'],
  ['Política de Privacidade', '/rules-and-policies/privacy-policy'],
  ['Política de Cookies', '/rules-and-policies/cookies'],
  ['Termos de uso', '/rules-and-policies/terms']
] as const;

export function LoginFooter(): JSX.Element {
  return (
    <footer className='hidden justify-center p-4 text-sm text-light-secondary dark:text-dark-secondary lg:flex'>
      <nav className='flex flex-wrap justify-center gap-4 gap-y-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={linkName}
          >
            {linkName}
          </a>
        ))}
        <p>© 2024 Fofoca.me</p>
      </nav>
    </footer>
  );
}
