import type { IconType } from 'react-icons'
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { SiThreads } from 'react-icons/si'
import { ThemeToggle } from '../components/theme-toggle'

type SocialLink = {
  label: string
  href: string
  icon: IconType
}

type ProjectEntry = {
  title: string
  href: string
  description: string
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/tksohishi', icon: FaGithub },
  { label: 'X / Twitter', href: 'https://x.com/ohishi', icon: FaXTwitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tksohishi', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/tksohishi', icon: FaInstagram },
  { label: 'Threads', href: 'https://www.threads.net/@tksohishi', icon: SiThreads },
]

const PROFILE = {
  name: 'Takeshi',
  avatarUrl: 'https://avatars.githubusercontent.com/u/84346?v=4',
  intro: 'Product builder in Brooklyn, NY. Building practical developer tools for terminal and AI agent workflows.',
}

const PROJECT_ENTRIES: ProjectEntry[] = [
  {
    title: 'wayfinder',
    href: 'https://github.com/tksohishi/wayfinder',
    description: 'Travel search for your terminal and your AI agents.',
  },
  {
    title: 'tgcli',
    href: 'https://github.com/tksohishi/tgcli',
    description: 'Telegram for your terminal and your AI agents.',
  },
  {
    title: 'houston',
    href: 'https://github.com/tksohishi/houston',
    description: 'Automation and orchestration tooling for AI agent workflows.',
  },
]

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-base-100 text-base-content">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:py-32">
        <div className="flex flex-col gap-16">
          <section className="flex flex-col gap-4">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src={PROFILE.avatarUrl}
              alt={PROFILE.name}
            />
            <h1 className="text-2xl font-semibold leading-8">Takeshi Ohishi</h1>
            <p className="text-2xl font-semibold leading-8 text-base-content/70">
              {PROFILE.intro}
            </p>
          </section>

          <section aria-label="Social links">
            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-base-300 text-base-content/70 transition-colors hover:border-base-content/80 hover:text-base-content"
                  >
                    <link.icon size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="projects" className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-base-content">Projects</h2>
            <ul className="flex flex-col gap-2">
              {PROJECT_ENTRIES.map((project) => (
                <li key={project.title}>
                  <a href={project.href} className="group block py-1">
                    <p className="text-xl leading-7 text-base-content transition-colors group-hover:text-base-content/60">
                      {project.title}
                    </p>
                    <p className="text-base leading-7 text-base-content/60">{project.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
