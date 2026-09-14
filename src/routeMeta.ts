/**
 * Title and description per route, in one place because two things read them:
 * scripts/prerender.mjs writes them into the static HTML it emits, and
 * <TitleSync /> keeps them right after a client-side navigation.
 */
export type RouteMeta = {
  title: string
  description: string
  /** Prerendered filename; home is left as the SPA shell. */
  file?: string
  noindex?: true
}

export const SITE = 'https://www.easilypromote.com'

export const HOME_META: RouteMeta = {
  title: 'EasilyPromote — Nothing goes live until you say so',
  description:
    'EasilyPromote is a performance marketing marketplace connecting Nigerian businesses with content creators. Fund a campaign upfront, approve every piece of content before it goes public, and creators earn on views verified through platform APIs.',
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': HOME_META,
  '/about': {
    title: 'About EasilyPromote — why we built it',
    description:
      'Why EasilyPromote exists: businesses approve every piece of content before it is published, and creators are paid on views verified through platform APIs.',
    file: 'about.html',
  },
  '/terms': {
    title: 'Terms and Conditions — EasilyPromote',
    description:
      'The terms governing use of EasilyPromote by businesses running campaigns and creators claiming placements.',
    file: 'terms.html',
  },
  '/privacy': {
    title: 'Privacy Policy — EasilyPromote',
    description:
      'What EasilyPromote collects, how connected platform accounts are used to verify views, who data is shared with, and how to delete an account.',
    file: 'privacy.html',
  },
  '/developers': {
    title: 'Referral webhooks for developers — EasilyPromote',
    description:
      'How to report conversions from creator referral codes to EasilyPromote: request signing, body fields, responses, retries, code examples and testing.',
    file: 'developers.html',
  },
  '/404': {
    title: 'Page not found — EasilyPromote',
    description: 'That page does not exist on easilypromote.com.',
    file: '404.html',
    noindex: true,
  },
}

export function metaFor(pathname: string): RouteMeta {
  return ROUTE_META[pathname] ?? ROUTE_META['/404']
}
