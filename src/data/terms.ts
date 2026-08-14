export interface TermsClause {
  number: string
  text: string
}

export interface TermsSection {
  number: number
  title: string
  clauses: TermsClause[]
}

export const termsMeta = {
  wordmark: 'EasilyPromote',
  website: 'easilypromote.com',
  email: 'easilypromote@gmail.com',
  phone: '09011918305',
  title: 'Creator Terms and Conditions',
  intro: 'The terms on which content creators use the EasilyPromote platform.',
  effective: 'Effective from: 8 August, 2026 · Version 1.0',
}

export const termsSections: TermsSection[] = [
  {
    number: 1,
    title: 'Who these terms are between',
    clauses: [
      {
        number: '1.1',
        text: "These Terms and Conditions govern your use of the EasilyPromote platform as a content creator. They are an agreement between you and EasilyPromote, a business name registered with the Corporate Affairs Commission of Nigeria under the name EASILY PROMOTE, with business name registration number 9726778, whose principal place of business is at A6 Stellar, Lightwell Garden Estate, Dan Suleiman Street, Utako, Municipal Area Council (AMAC), Federal Capital Territory, Abuja, Nigeria (“EasilyPromote”, “we”, “us” or “our”).",
      },
      {
        number: '1.2',
        text: 'By creating an account, claiming a brief, or producing or publishing any content through the platform, you confirm that you have read these Terms, that you understand them, and that you agree to be bound by them.',
      },
      {
        number: '1.3',
        text: 'If you do not agree with any part of these Terms, you should not use the platform.',
      },
    ],
  },
  {
    number: 2,
    title: 'Definitions',
    clauses: [
      {
        number: '2.1',
        text: '“Brief” means the written instructions issued for a particular campaign, including the subject matter, the view target, the fee, what must be said, what must not be said, and any deadline.',
      },
      {
        number: '2.2',
        text: '“Campaign” means a body of promotional work commissioned by a Client and published on the platform.',
      },
      {
        number: '2.3',
        text: '“Client” means the business, institution or individual whose product, service or programme is the subject of a Campaign.',
      },
      {
        number: '2.4',
        text: '“Content” means any video, image, audio, caption or other material you produce or publish in connection with a Brief.',
      },
      {
        number: '2.5',
        text: '“Verified Views” means the number of views recorded for your Content by the measurement methods described in clause 8.',
      },
    ],
  },
  {
    number: 3,
    title: 'Eligibility',
    clauses: [
      {
        number: '3.1',
        text: 'You must be at least eighteen (18) years of age to use the platform.',
      },
      {
        number: '3.2',
        text: 'You must be the genuine owner of, and have full control over, every social media account you register with us.',
      },
      {
        number: '3.3',
        text: 'You must provide accurate, current and complete information when registering, and you must keep that information up to date. This includes the bank account details to which your earnings will be paid.',
      },
      {
        number: '3.4',
        text: 'We may decline any application, or remove any creator from the platform, at our discretion and without being required to give reasons, provided that any fees already earned in accordance with these Terms remain payable to you.',
      },
    ],
  },
  {
    number: 4,
    title: 'Your account',
    clauses: [
      {
        number: '4.1',
        text: 'You may hold only one creator account. Operating multiple accounts is a breach of these Terms.',
      },
      {
        number: '4.2',
        text: 'You are responsible for keeping your login details confidential and for all activity that takes place under your account.',
      },
      {
        number: '4.3',
        text: 'You must notify us immediately if you believe your account has been accessed by anybody else.',
      },
      {
        number: '4.4',
        text: 'You are responsible for ensuring that the bank details on your account are correct. We are not liable for payments made to an incorrect account where the details were supplied by you.',
      },
    ],
  },
  {
    number: 5,
    title: 'The nature of our relationship',
    clauses: [
      {
        number: '5.1',
        text: 'You are an independent contractor. Nothing in these Terms creates a contract of employment, a partnership, an agency, or a joint venture between you and EasilyPromote or between you and any Client.',
      },
      {
        number: '5.2',
        text: 'You are not entitled to any employment benefit, pension, leave, severance or similar entitlement.',
      },
      {
        number: '5.3',
        text: 'You are solely responsible for your own tax obligations, including any personal income tax arising on amounts paid to you, and for any statutory filings applicable to you.',
      },
      {
        number: '5.4',
        text: 'Nothing in these Terms prevents you from working with other platforms, brands or agencies, except where a particular Brief expressly states an exclusivity requirement, and you have accepted that Brief on those terms.',
      },
    ],
  },
  {
    number: 6,
    title: 'Briefs and claiming work',
    clauses: [
      {
        number: '6.1',
        text: 'Being registered on the platform does not entitle you to any minimum number of Briefs, to any particular Brief, or to any minimum level of earnings.',
      },
      {
        number: '6.2',
        text: 'Briefs are made available to creators whose audience matches the requirements of the Campaign. We select creators for each Campaign at our discretion, and a Client may also be entitled to review and approve the creators proposed for their Campaign.',
      },
      {
        number: '6.3',
        text: 'A Brief may be withdrawn, amended or reissued at any time before you have accepted it.',
      },
      {
        number: '6.4',
        text: 'Once you accept a Brief, you are undertaking to produce and publish Content in accordance with it, within the timeframe stated.',
      },
      {
        number: '6.5',
        text: 'If you are unable to complete an accepted Brief, you must inform us at the earliest opportunity so that the work may be reassigned.',
      },
    ],
  },
  {
    number: 7,
    title: 'Producing and publishing content',
    clauses: [
      {
        number: '7.1',
        text: 'You must produce Content that complies with the Brief in all material respects, including the subject matter, the required message, and anything the Brief states must not be said.',
      },
      {
        number: '7.2',
        text: 'Content must be your own original work. You must not use any material in which a third party holds rights, including music, footage or images, unless you are permitted to do so.',
      },
      {
        number: '7.3',
        text: 'You must not make any claim about a Client, a product or a service that is false, misleading, or that the Brief does not authorise you to make. This applies with particular force to any claim concerning income, financial returns, health or medical outcomes.',
      },
      {
        number: '7.4',
        text: 'You must comply with the rules of the platform on which you publish, and with all applicable Nigerian law, including any requirement to identify content as an advertisement or a paid partnership.',
      },
      {
        number: '7.5',
        text: 'Content must be submitted to us for review before it is published. We will review it against the Brief and either approve it or return it to you with the changes required. You must not publish Content that has not been approved.',
      },
      {
        number: '7.6',
        text: 'Once published, Content must remain publicly visible on your account for a minimum of ninety (90) days. You must not delete it, archive it, restrict it, or make your account private during that period. Doing so may result in the forfeiture of the fee for that Content.',
      },
    ],
  },
  {
    number: 8,
    title: 'How views are counted',
    clauses: [
      {
        number: '8.1',
        text: 'Views are counted from the figures reported by the social media platform on which the Content is published, as recorded by EasilyPromote.',
      },
      {
        number: '8.2',
        text: 'The figures recorded by EasilyPromote are the figures used to calculate your earnings and, in the absence of manifest error, are final.',
      },
      {
        number: '8.3',
        text: 'Views are counted from the moment of publication until the end of the counting period stated in the Brief. Where the Brief states no counting period, views are counted for sixty (60) days from publication.',
      },
      {
        number: '8.4',
        text: 'We may exclude from the count any views which we reasonably believe to be artificial, purchased, automated, or otherwise not genuine.',
      },
    ],
  },
  {
    number: 9,
    title: 'Payment',
    clauses: [
      {
        number: '9.1',
        text: 'You are paid on delivery, not on posting. Your fee is calculated on the Verified Views your Content has delivered, at the rate or against the target stated in the Brief.',
      },
      {
        number: '9.2',
        text: 'Payments are made at the end of each calendar month, in respect of Verified Views recorded up to that point, to the bank account registered on your account.',
      },
      {
        number: '9.3',
        text: 'Where a Brief states a fixed fee against a view target rather than a rate per view, no fee is payable unless and until the target is reached, save where the Brief expressly provides otherwise.',
      },
      {
        number: '9.4',
        text: 'We may withhold payment in respect of any Content which is under investigation under clause 10, until that investigation is concluded.',
      },
      {
        number: '9.5',
        text: 'Any bank charges, transfer fees or similar costs incurred in making payment to you may be deducted from the amount paid.',
      },
    ],
  },
  {
    number: 10,
    title: 'Prohibited conduct',
    clauses: [
      {
        number: '10.1',
        text: 'You must not purchase views, likes, followers or engagement of any kind, whether for the Content or for the account on which it is published.',
      },
      {
        number: '10.2',
        text: 'You must not use bots, automated services, engagement pods, incentivised viewing, or any other artificial means of inflating the performance of Content.',
      },
      {
        number: '10.3',
        text: 'You must not misrepresent your audience, your reach, or the ownership of any account.',
      },
      {
        number: '10.4',
        text: 'You must not publish Content that is unlawful, defamatory, obscene, discriminatory, or that brings a Client, EasilyPromote or any third party into disrepute.',
      },
      {
        number: '10.5',
        text: 'Where we reasonably determine that this clause has been breached, we may withhold or reverse payment for the Content concerned, remove you from the Campaign, and suspend or permanently close your account. Serious or repeated breaches may be reported to the Client and to the relevant platform.',
      },
    ],
  },
  {
    number: 11,
    title: 'Ownership and use of your content',
    clauses: [
      {
        number: '11.1',
        text: 'You retain ownership of the Content you create. Nothing in these Terms transfers ownership of your Content to EasilyPromote or to any Client.',
      },
      {
        number: '11.2',
        text: 'You grant EasilyPromote a licence to view, record, measure and report on the Content for the purposes of running and verifying the Campaign, and to reference it internally and in reports to the Client.',
      },
      {
        number: '11.3',
        text: 'A Client does not acquire any right to reuse your Content by reason of the Campaign alone. Where a Client wishes to use your Content on its own channels, in its advertising, on its website or in any other manner, permission must first be obtained from you.',
      },
      {
        number: '11.4',
        text: 'Any such permission will be requested through EasilyPromote, and any terms attaching to it, including any additional fee, are a matter for agreement between you and the Client through us. You are entitled to decline.',
      },
      {
        number: '11.5',
        text: 'You grant EasilyPromote permission to reference the existence of your participation in a Campaign, and to display your handle and performance figures, for the purposes of reporting to Clients and describing our own work.',
      },
    ],
  },
  {
    number: 12,
    title: 'Confidentiality',
    clauses: [
      {
        number: '12.1',
        text: 'Briefs, Client information, rates, and any material shared with you for the purposes of a Campaign are confidential.',
      },
      {
        number: '12.2',
        text: 'You must not disclose that information to any third party, or use it for any purpose other than completing the Brief, without our prior written consent.',
      },
      {
        number: '12.3',
        text: 'This obligation continues after your involvement in a Campaign has ended.',
      },
    ],
  },
  {
    number: 13,
    title: 'Conduct at studios and third party premises',
    clauses: [
      {
        number: '13.1',
        text: "Where a Campaign involves attendance at a studio, a Client's premises, or any other location, you must conduct yourself professionally and with courtesy at all times.",
      },
      {
        number: '13.2',
        text: 'You must comply with the rules of the premises, take proper care of any equipment made available to you, and follow any instruction given by the owner or operator of the premises.',
      },
      {
        number: '13.3',
        text: 'You are responsible for any loss or damage caused by your own negligence or misconduct at such premises.',
      },
      {
        number: '13.4',
        text: 'Any creator who does not conduct themselves properly may be removed from the Campaign and from the platform immediately.',
      },
    ],
  },
  {
    number: 14,
    title: 'Suspension and termination',
    clauses: [
      {
        number: '14.1',
        text: 'You may close your account at any time. Fees properly earned before closure remain payable to you in the ordinary payment cycle.',
      },
      {
        number: '14.2',
        text: 'We may suspend or terminate your account where you breach these Terms, where we reasonably suspect fraud or view manipulation, or where your conduct exposes EasilyPromote or a Client to reputational or legal risk.',
      },
      {
        number: '14.3',
        text: 'Termination does not affect any obligation of confidentiality, or any obligation in respect of Content already published.',
      },
    ],
  },
  {
    number: 15,
    title: 'Liability',
    clauses: [
      {
        number: '15.1',
        text: 'EasilyPromote does not guarantee the performance of any Content, the availability of any Brief, or any level of earnings.',
      },
      {
        number: '15.2',
        text: 'We are not liable for the acts or omissions of any Client, nor for any decision by a social media platform to remove, restrict or demonetise Content.',
      },
      {
        number: '15.3',
        text: 'Save in respect of death or personal injury caused by negligence, or any other liability which cannot lawfully be excluded, our total liability to you in connection with any Campaign is limited to the fees payable to you in respect of that Campaign.',
      },
      {
        number: '15.4',
        text: 'Nothing in these Terms excludes liability for fraud.',
      },
    ],
  },
  {
    number: 16,
    title: 'Data',
    clauses: [
      {
        number: '16.1',
        text: 'We collect and process personal data about you in accordance with the Nigeria Data Protection Act and our Privacy Policy, which is available on our website and forms part of these Terms.',
      },
    ],
  },
  {
    number: 17,
    title: 'Changes to these terms',
    clauses: [
      {
        number: '17.1',
        text: 'We may amend these Terms from time to time. The amended version will be published on our website with a new version number and effective date.',
      },
      {
        number: '17.2',
        text: 'Where the change is material, we will give notice to you by email or through the platform before it takes effect.',
      },
      {
        number: '17.3',
        text: 'Continued use of the platform after the effective date constitutes acceptance of the amended Terms. The version in force at the time you accept a Brief governs that Brief.',
      },
    ],
  },
  {
    number: 18,
    title: 'Governing law and disputes',
    clauses: [
      {
        number: '18.1',
        text: 'These Terms are governed by the laws of the Federal Republic of Nigeria.',
      },
      {
        number: '18.2',
        text: 'The parties will first attempt in good faith to resolve any dispute amicably through discussion.',
      },
      {
        number: '18.3',
        text: 'Where a dispute cannot be resolved amicably within thirty (30) days, it shall be submitted to the courts of the Federal Capital Territory, Abuja, which shall have exclusive jurisdiction.',
      },
    ],
  },
  {
    number: 19,
    title: 'Contact',
    clauses: [
      {
        number: '19.1',
        text: 'Questions about these Terms may be sent to easilypromote@gmail.com, or by telephone to 09011918305.',
      },
    ],
  },
]
