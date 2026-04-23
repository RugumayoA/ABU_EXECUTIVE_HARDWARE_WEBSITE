export type SiteInfoSlug =
  | 'about'
  | 'visit'
  | 'why-us'
  | 'guarantee'
  | 'contact'
  | 'privacy'

export type SiteInfoEntry = {
  title: string
  paragraphs: string[]
  /** Optional subtle note below body */
  footnote?: string
}

export const SITE_INFO: Record<SiteInfoSlug, SiteInfoEntry> = {
  about: {
    title: 'About us',
    paragraphs: [
      'ABU Executive Hardware supplies contractors and DIYers in Uganda with dependable tools, safety gear, and construction materials at fair prices in Ugandan Shillings.',
      'We focus on practical stock for real job sites — from cement and steel to plumbing, ceramics, padlocks, tiles, and general hardware.',
      'We are a local shop — come in to see stock, get advice, and pay in person.',
      'Update this page with your street address, landmarks, parking notes, and opening hours when you are ready.',
      'Most unused items in original packaging can be returned within 30 days.',
      'Powered equipment must be unused. Some bulk or cut-to-length items may be final sale — ask staff before you buy.',
      'See in-store signage or speak with us for full policy details.',
      'For product questions, stock checks, or directions, phone is the fastest way to reach us during business hours.',
      'You can also visit the shop in person — we are happy to walk the floor with you.',
    ],
    footnote: 'Call ahead if you need bulk quantities or a special order.',
  },
  visit: {
    title: 'Visit us',
    paragraphs: [
      'We are a local shop — come in to see stock, get advice, and pay in person.',
      'Update this page with your street address, landmarks, parking notes, and opening hours when you are ready.',
    ],
    footnote: 'Call ahead if you need bulk quantities or a special order.',
  },
  'why-us': {
    title: 'Why buy from us?',
    paragraphs: [
      'Curated inventory so you are not lost in endless aisles of the wrong stock.',
      'Knowledgeable support for contractors and serious DIY projects.',
      'A straightforward returns process so you can keep your project moving.',
    ],
  },
  guarantee: {
    title: 'Our guarantee / returns',
    paragraphs: [
      'Most unused items in original packaging can be returned within 30 days.',
      'Powered equipment must be unused. Some bulk or cut-to-length items may be final sale — ask staff before you buy.',
      'See in-store signage or speak with us for full policy details.',
    ],
  },
  contact: {
    title: 'Contact us',
    paragraphs: [
      'For product questions, stock checks, or directions, phone is the fastest way to reach us during business hours.',
      'You can also visit the shop in person — we are happy to walk the floor with you.',
    ],
  },
  privacy: {
    title: 'Privacy policy',
    paragraphs: [
      'We use your information only for in-store service — for example to reach you about an order or special request — and to improve how we run the shop.',
      'We do not sell your personal data.',
      'Replace this summary with your full legal text before you go live, especially if you add online accounts or marketing emails.',
    ],
  },
}
