import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-6 text-base-content">
      <div className="space-y-5 text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-base-content/60">404</p>
        <h1 className="text-4xl sm:text-5xl">Page not found</h1>
        <p className="text-base-content/70">
          The page you requested does not exist on this site.
        </p>
        <Link className="btn btn-neutral btn-sm sm:btn-md" to="/">
          Back home
        </Link>
      </div>
    </main>
  )
}
