export interface PrivacyBlock {
  type: 'heading' | 'paragraph' | 'list' | 'table'
  text?: string
  ordered?: boolean
  items?: string[]
  headers?: string[]
  rows?: string[][]
}

export interface PrivacySection {
  number: number
  title: string
  blocks: PrivacyBlock[]
}

export const privacyMeta = {
  title: 'EasilyPromote Privacy Policy',
  effective: 'Effective from: 8 August, 2026',
}

export const privacySections: PrivacySection[] = [
  {
    number: 1,
    title: 'Introduction',
    blocks: [
      {
        type: 'paragraph',
        text: 'EasilyPromote ("EasilyPromote," "we," "us," or "our") operates a performance marketing marketplace that connects businesses with content creators in Nigeria. This Privacy Policy explains how we collect, use, disclose, and protect information across our Brand App, Creator App, marketing website, and related services (collectively, the "Platform").',
      },
      {
        type: 'paragraph',
        text: 'This Policy is written to align with the Nigeria Data Protection Act 2023 (NDPA) and the Nigeria Data Protection Regulation (NDPR). By using the Platform, you agree to the practices described here.',
      },
      {
        type: 'paragraph',
        text: 'If you do not agree with this Policy, please do not use the Platform.',
      },
    ],
  },
  {
    number: 2,
    title: 'Who This Policy Applies To',
    blocks: [
      {
        type: 'paragraph',
        text: 'This Policy covers:',
      },
      {
        type: 'list',
        items: [
          '**Businesses** who create and fund campaigns ("Brands")',
          '**Creators** who claim campaign slots and earn by delivering verified views',
          '**Visitors** to our marketing website',
          "**Admin users** who operate the Platform's internal console",
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Information We Collect',
    blocks: [
      {
        type: 'heading',
        text: '3.1 Information You Provide Directly',
      },
      {
        type: 'list',
        items: [
          '**Account information:** name, email address, phone number, password',
          '**Verification information:** OTP codes, identity or business verification documents (e.g., CAC registration for Brands, government ID for Creators)',
          '**Profile information:** business name, industry, social media handles, creator niche/category, profile photo',
          '**Payment and payout information:** bank account details, wallet transaction history, billing address',
          '**Campaign content:** campaign briefs, creative assets, submission content, captions, and approval decisions',
          '**Communications:** messages you send us via support channels, feedback, or in-app messaging',
        ],
      },
      {
        type: 'heading',
        text: '3.2 Information Collected Automatically',
      },
      {
        type: 'list',
        items: [
          '**Usage data:** pages viewed, features used, session duration, click patterns',
          '**Device and technical data:** IP address, device type, operating system, browser type, unique device identifiers',
          '**Location data:** approximate location derived from IP address (used for regional relevance, not precise tracking)',
          '**Log data:** timestamps, error logs, crash reports',
        ],
      },
      {
        type: 'heading',
        text: '3.3 Information from Third-Party Platform APIs',
      },
      {
        type: 'paragraph',
        text: "Because EasilyPromote verifies views and engagement through creators' connected social media accounts, we collect:",
      },
      {
        type: 'list',
        items: [
          'Verified view counts, engagement metrics, and post performance data via authorized platform APIs (e.g., Instagram, TikTok, YouTube, X)',
          'Basic public profile data (follower counts, handle, account status) needed to confirm delivery and eligibility',
        ],
      },
      {
        type: 'paragraph',
        text: 'We only access what is necessary to verify campaign delivery and calculate payouts. We do not access private messages, contacts, or content unrelated to a claimed campaign slot.',
      },
      {
        type: 'heading',
        text: '3.4 Information from Third Parties',
      },
      {
        type: 'list',
        items: [
          'Identity verification providers (KYC/KYB checks)',
          'Payment processors and financial institutions',
          'Fraud prevention and analytics partners',
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'How We Use Your Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'We use collected information to:',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Create and manage accounts across the Brand, Creator, and Admin surfaces',
          'Verify identities and business legitimacy (fraud and abuse prevention)',
          'Facilitate campaign creation, slot claiming, and content submission',
          'Verify creator delivery through platform APIs and calculate accurate payouts',
          'Process escrow funding, holds, releases, and wallet transactions',
          'Enable the pre-publish content approval workflow between Brands and Creators',
          'Communicate with you about campaigns, transactions, and account activity',
          'Provide customer support and resolve disputes',
          'Detect, investigate, and prevent fraud, fake engagement, or Platform abuse',
          'Improve the Platform through analytics and product research',
          'Comply with legal, tax, and regulatory obligations',
          'Send marketing communications (with your consent, where required)',
        ],
      },
    ],
  },
  {
    number: 5,
    title: 'Legal Basis for Processing',
    blocks: [
      {
        type: 'paragraph',
        text: 'Depending on the context, we process personal data under one or more of the following bases:',
      },
      {
        type: 'list',
        items: [
          '**Consent** — e.g., marketing communications, optional profile data',
          '**Contractual necessity** — e.g., processing needed to deliver campaigns, payouts, and account services',
          '**Legal obligation** — e.g., KYC/AML requirements, tax reporting',
          '**Legitimate interest** — e.g., fraud prevention, Platform security, service improvement',
        ],
      },
    ],
  },
  {
    number: 6,
    title: 'How We Share Information',
    blocks: [
      {
        type: 'paragraph',
        text: 'We do not sell personal data. We share information only in these circumstances:',
      },
      {
        type: 'table',
        headers: ['Recipient', 'Purpose'],
        rows: [
          ['Brands', 'Creator profile and delivery data relevant to a claimed campaign slot'],
          ['Creators', 'Campaign brief details published by a Brand'],
          ['Payment processors', 'To fund escrow, process payouts, and handle wallet transactions'],
          ['Identity verification providers', 'To confirm Brand or Creator identity'],
          ['Social media platforms (via API)', 'To verify views/engagement tied to a claimed slot'],
          ['Service providers', 'Hosting, analytics, customer support tooling — bound by confidentiality obligations'],
          ['Regulators / law enforcement', 'Where legally required, or to protect rights, safety, or prevent fraud'],
          ['Business transfers', 'In connection with a merger, acquisition, or asset sale, subject to continued protection of your data'],
        ],
      },
    ],
  },
  {
    number: 7,
    title: 'Escrow, Payments, and Financial Data',
    blocks: [
      {
        type: 'paragraph',
        text: 'Campaign funds are held in escrow and released only upon verified delivery. Payment and payout data (bank details, transaction history) is processed through licensed payment partners and is retained as required for financial recordkeeping, dispute resolution, and regulatory compliance.',
      },
    ],
  },
  {
    number: 8,
    title: 'Data Retention',
    blocks: [
      {
        type: 'paragraph',
        text: 'We retain personal data for as long as your account is active and as needed to:',
      },
      {
        type: 'list',
        items: [
          'Fulfill the purposes described in this Policy',
          'Meet legal, tax, and regulatory recordkeeping requirements',
          'Resolve disputes and enforce our agreements',
        ],
      },
      {
        type: 'paragraph',
        text: 'When no longer needed, data is securely deleted or anonymized, except where longer retention is required by law (e.g., financial transaction records).',
      },
    ],
  },
  {
    number: 9,
    title: 'Data Security',
    blocks: [
      {
        type: 'paragraph',
        text: 'We implement technical and organizational safeguards including encryption in transit, access controls, and regular security reviews to protect your data. No system is completely secure, and we encourage you to use strong passwords and safeguard your account credentials.',
      },
    ],
  },
  {
    number: 10,
    title: 'Your Rights',
    blocks: [
      {
        type: 'paragraph',
        text: 'Subject to applicable law (including the NDPA), you may have the right to:',
      },
      {
        type: 'list',
        items: [
          'Access the personal data we hold about you',
          'Request correction of inaccurate or incomplete data',
          'Request deletion of your data, subject to legal retention requirements',
          'Withdraw consent for optional processing (e.g., marketing)',
          'Object to or restrict certain processing',
          'Request a copy of your data in a portable format',
          'Lodge a complaint with the Nigeria Data Protection Commission (NDPC)',
        ],
      },
      {
        type: 'paragraph',
        text: 'To exercise these rights, contact us at easilypromote@gmail.com.',
      },
    ],
  },
  {
    number: 11,
    title: "Children's Privacy",
    blocks: [
      {
        type: 'paragraph',
        text: 'The Platform is not intended for individuals under 18. We do not knowingly collect personal data from minors. If we learn we have collected data from a minor, we will delete it promptly.',
      },
    ],
  },
  {
    number: 12,
    title: 'International Data Transfers',
    blocks: [
      {
        type: 'paragraph',
        text: 'If data is processed or stored outside Nigeria (e.g., via cloud infrastructure or platform API partners), we take steps to ensure an adequate level of protection consistent with NDPA requirements.',
      },
    ],
  },
  {
    number: 13,
    title: 'Cookies and Tracking Technologies',
    blocks: [
      {
        type: 'paragraph',
        text: 'Our marketing website and apps may use cookies and similar technologies to remember preferences, understand usage patterns, and improve performance. You can manage cookie preferences through your browser or device settings.',
      },
    ],
  },
  {
    number: 14,
    title: 'Third-Party Links and Integrations',
    blocks: [
      {
        type: 'paragraph',
        text: 'The Platform may link to or integrate with third-party services (e.g., social media platforms for verification). This Policy does not cover the privacy practices of those third parties; please review their respective privacy policies.',
      },
    ],
  },
  {
    number: 15,
    title: 'Changes to This Policy',
    blocks: [
      {
        type: 'paragraph',
        text: 'We may update this Policy from time to time. Material changes will be communicated via the Platform or email prior to taking effect. Continued use of the Platform after changes take effect constitutes acceptance.',
      },
    ],
  },
  {
    number: 16,
    title: 'Contact Us',
    blocks: [
      {
        type: 'paragraph',
        text: 'If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, contact:',
      },
      {
        type: 'paragraph',
        text: '**EasilyPromote**',
      },
      {
        type: 'paragraph',
        text: 'Email: easilypromote@gmail.com',
      },
      {
        type: 'paragraph',
        text: 'Telephone: 09011918305',
      },
    ],
  },
]
