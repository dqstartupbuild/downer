# SortDock website

The `web` directory contains SortDock's Next.js marketing site.

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Release-aware download

The site checks the latest published GitHub release every 15 minutes. It shows
`Coming soon` until that release includes a `.dmg`, `.pkg`, or `.zip` asset. As
soon as a supported asset is published, the same controls become direct
downloads without another website deployment.

No environment variables are required for the default repository. Copy
`.env.example` only when you need to override the public URL, release repository,
or provide an optional read-only GitHub token.

## Checks

```sh
npm run check
npm run build
```

## Vercel

When importing the Git repository into Vercel:

- Set the project root directory to `web`.
- Keep the detected framework as Next.js.
- Keep the detected install command and use `npm run build` as the build command.
- Set `SITE_URL` to the final custom domain when one is connected. Vercel's
  production URL is used automatically until then.
- Optionally set `GITHUB_RELEASE_TOKEN` to a fine-grained, read-only token if the
  unauthenticated GitHub API limit becomes an issue. Do not expose it as a
  `NEXT_PUBLIC_` variable.

Vercel Git integration will build preview deployments for branches and production
deployments from the configured production branch.
