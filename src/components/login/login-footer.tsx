const footerLinks = [
  ['Home', 'https://fofoca.me'],
  ['Contato', 'mailto:contato@fofoca.me'],
  ['Política de Privacidade', 'https://google.com.br'],
  ['Política de Cookies', 'https://google.com.br'],
  ['Termos de uso', 'https://google.com.br']
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
