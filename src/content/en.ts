/**
 * English copy, taken word for word from the approved design (direction D,
 * design/canvas/D-*.dc.html, 2026-10-19). The shape of this object is the
 * `Dictionary` type: a German dictionary has to provide the same keys
 * (see ./index.ts).
 *
 * Headings with a lime marker are split into { before, mark, after } so the
 * marked word can be wrapped without HTML in the copy. Keep the punctuation
 * in `after`; the component keeps it on the same line as the marked word.
 *
 * Values the owner still has to supply are written in [SQUARE BRACKETS] and
 * rendered as-is. Do not invent them.
 */
export const en = {
  meta: {
    title: 'Ferbert — AI process analysis and agents',
    description:
      'Ferbert analyses how your company works, shows which processes AI can take over and what that saves, then builds the agents that run them.',
  },
  common: {
    skip: 'Skip to content',
    cta: 'Book a free call',
    ctaNote: 'Free · 30 minutes · An honest view of what is worth automating',
    write: 'Write to us',
    demo: 'Demo',
    pause: 'Pause',
    play: 'Play',
  },
  header: {
    home: 'Ferbert, home',
    tagline: 'AI automation company',
    navLabel: 'Main',
    menu: 'Menu',
    close: 'Close',
    mobileNavLabel: 'Mobile',
    theme: { label: 'Colour theme', auto: 'Auto', light: 'Light', dark: 'Dark', change: 'Change theme' },
  },
  /**
   * Header links, the same on every page. The phone menu adds `menuExtra`.
   * Blog joins as a fifth link once it has real posts (owner decision,
   * design/handoff/DESIGN.md §7). No language switch until de.ts exists.
   */
  nav: [
    { href: '/#analysis', label: 'Analysis' },
    { href: '/#demos', label: 'Demos' },
    { href: '/#services', label: 'What we automate' },
    { href: '/#start', label: 'Pricing' },
  ],
  menuExtra: [{ href: '/contact', label: 'Contact' }],
  footer: {
    links: [
      { href: '/#analysis', label: 'Analysis' },
      { href: '/#demos', label: 'Demos' },
      { href: '/#services', label: 'What we automate' },
      { href: '/contact', label: 'Contact' },
    ],
    github: 'GitHub',
    impressum: 'Impressum',
    privacy: 'Privacy',
    copyright: '© 2026 Ferbert, Valencia, Spain',
  },

  home: {
    hero: {
      label: 'Process analysis first · then agents',
      title: { before: 'Find the work AI should do. Then let ', mark: 'agents', after: ' do it.' },
      lead: 'Ferbert analyses how your company works, shows you which processes AI can take over and what that saves, then builds the agents that run them.',
      secondary: 'Watch an agent think',
      card: 'An automation company that starts with an analysis, not a guess.',
      railStatus: 'Status',
      railPlace: 'Valencia · Europe',
    },
    tools: {
      label: 'Tools we connect',
      lead: 'We connect agents to the tools you already use, for example',
      pauseLabel: 'Pause the scrolling tool list',
      playLabel: 'Play the scrolling tool list',
      list: ['Gmail', 'Outlook', 'Google Drive', 'SharePoint', 'Slack', 'WhatsApp', 'Shopify', 'HubSpot', 'Zendesk', 'DATEV', 'SAP', 'Holded'],
    },
    workflow: {
      label: 'Live example',
      title: { before: 'An invoice, handled ', mark: 'end to end', after: '.' },
      lead: 'An example automation for illustration. It runs on every new email. Yours is designed around your process.',
      name: 'Invoice intake',
      status: { arriving: 'new email arriving', running: 'running', done: 'done, waiting for the next email' },
      short: { arriving: 'new email', running: 'running', done: 'done' },
      railStatus: { running: 'running', idle: 'idle' },
      logLabel: 'Run log',
      nodes: [
        { kind: 'Trigger', short: 'New email', title: 'New email with invoice', detail: 'Inbox: invoices@' },
        { kind: 'AI step', short: 'Read invoice', title: 'Read the invoice', detail: 'Supplier, totals, VAT, due date' },
        { kind: 'Knowledge', short: 'Match order', title: 'Match to order', detail: 'Finds the purchase order' },
        { kind: 'Check', short: 'Human review', title: 'Human review if unsure', detail: 'Only unclear cases' },
        { kind: 'Action', short: 'Book it', title: 'Book in accounting', detail: 'Entered in your ERP' },
      ],
      logs: [
        { t: '09:41:02', msg: 'Invoice from Müller GmbH received' },
        { t: '09:41:03', msg: 'Read: 1.284,50 EUR, VAT 19 %, due in 30 days' },
        { t: '09:41:04', msg: 'Matched to purchase order PO-20817' },
        { t: '09:41:04', msg: 'Confident match, no review needed' },
        { t: '09:41:05', msg: 'Booked in accounting. Done in 3 seconds' },
      ],
    },
    analysis: {
      label: 'Process analysis',
      title: { before: 'Start with an ', mark: 'analysis', after: ', not a guess.' },
      lead: 'In two to three weeks we map how work moves through your company, measure every process in hours, and rank what AI can take over by savings and risk. You keep the report, whether or not we build anything.',
      deliverables: [
        'A map of your key processes: who does what, in which tools, how often',
        'Hours per week for each process, measured with your team',
        'What AI can take over, ranked by savings and risk',
        'A build plan with cost, timeline and expected payback',
      ],
      report: {
        title: 'Process analysis',
        note: 'Sample report · fictional company',
        cols: { process: 'Process', hours: 'Hours per week, today and with agents', potential: 'Potential' },
        phoneKey: 'Hours per week: today, then with agents',
        unit: 'h',
        rows: [
          { name: 'Invoice intake', before: 38, after: 3, potential: 'high' },
          { name: 'Customer emails', before: 25, after: 8, potential: 'high' },
          { name: 'Order entry', before: 18, after: 4, potential: 'high' },
          { name: 'Monthly reporting', before: 12, after: 2, potential: 'medium' },
          { name: 'Quotes', before: 10, after: 6, potential: 'low' },
        ],
        levels: { high: 'High', medium: 'Medium', low: 'Low' },
        total: 'Total',
        totalValue: { before: '103 h', after: '23 h', unit: 'per week' },
        saved: '80 h saved',
      },
    },
    agent: {
      label: 'Demo · sample data',
      title: { before: 'Watch a support agent ', mark: 'think', after: '.' },
      lead: 'Ask the shop assistant a question. Alongside the chat you see every step it takes before it answers: understanding, searching your help centre, checking your order database, following your rules.',
      inside: 'Inside the agent',
      waiting: 'Waiting for a question',
      answeredIn: 'Answered in 5.1 s',
      working: 'Working…',
      shop: 'Nordwind Shop support',
      avatar: 'N',
      online: 'AI agent, online',
      greeting: 'Hi! I’m Nordwind’s assistant. Ask me about orders, returns or delivery.',
      thinking: 'Agent is thinking',
      choose: 'Choose a question',
      hint: 'Pick a question above. This demo uses sample data.',
      steps: [
        { title: 'Message received', tag: 'Chat' },
        { title: 'Understand the question', tag: 'Language model' },
        { title: 'Search the help centre', tag: 'RAG' },
        { title: 'Look up the customer’s order', tag: 'Database' },
        { title: 'Check the rules', tag: 'Guardrails' },
        { title: 'Write the answer', tag: 'Language model' },
      ],
      scenarios: [
        {
          ask: 'Where is my order?',
          rag: [
            { title: 'Delivery times', score: '0.91', text: 'Germany and Austria: 2–3 working days with DHL after dispatch.' },
            { title: 'Tracking your parcel', score: '0.87', text: 'The tracking link is in your shipping email and in your account.' },
          ],
          dbTable: 'orders · #48213',
          db: [
            ['Status', 'Shipped'],
            ['Carrier', 'DHL 00340434 48213'],
            ['Shipped', '6 Oct 2026'],
            ['Estimated delivery', 'Fri 9 Oct'],
          ],
          details: [
            '“Where is my order?”',
            'Intent: order status. Customer is logged in.',
            'Found 2 articles: “Delivery times”, “Tracking your parcel”',
            'Order #48213: shipped 6 Oct with DHL, arriving Fri 9 Oct',
            'Order data may be shared with the logged-in customer',
            'Answer written from 3 sources',
          ],
          answer:
            'Your order #48213 is on the way! It left our warehouse on 6 October with DHL and should arrive on Friday, 9 October. Here is your tracking link: dhl.de/track/48213',
          sources: ['Order #48213', 'Tracking your parcel'],
        },
        {
          ask: 'Can I return my shoes?',
          rag: [
            { title: 'Returns policy', score: '0.93', text: 'Return within 30 days of delivery. Returns are free in Germany and Austria.' },
            { title: 'Free return labels', score: '0.84', text: 'Labels can be created in chat or in your account after delivery.' },
          ],
          dbTable: 'orders · #48213',
          db: [
            ['Items', 'Trail runner, size 42'],
            ['Status', 'Shipped, not delivered'],
            ['Return window', 'Starts on delivery'],
          ],
          details: [
            '“Can I return my shoes?”',
            'Intent: return request for order #48213.',
            'Found: “Returns policy”, “Free return labels”',
            'Order #48213 not delivered yet',
            'No refund without the customer confirming',
            'Answer written from 3 sources',
          ],
          answer:
            'Yes. You can return them free of charge within 30 days of delivery. Your order hasn’t arrived yet; once it has, I can create the return label for you right here.',
          sources: ['Returns policy', 'Order #48213'],
        },
        {
          ask: 'I’d like to talk to a person',
          rag: [],
          dbTable: 'tickets · new',
          db: [
            ['Ticket', 'T-1182'],
            ['Assigned to', 'Laura, support team'],
            ['Includes', 'Full chat history'],
          ],
          details: [
            '“I’d like to talk to a person”',
            'Intent: human handover.',
            'Not needed for this request',
            'Ticket T-1182 created with the chat history',
            'Support team online Mon–Fri, 9:00–18:00',
            'Handover message written',
          ],
          answer:
            'Of course. I’ve passed our conversation to Laura from the support team, with everything you’ve told me. She’ll reply here in about 10 minutes.',
          sources: ['Ticket T-1182'],
        },
      ],
    },
    knowledge: {
      label: 'Demo · sample documents',
      title: { before: 'Your team can ask the company’s ', mark: 'documents', after: ' too.' },
      lead: 'The same retrieval works internally. The agent finds the right passages first, then answers only from them, and shows where each fact came from.',
      ask: 'Ask a question',
      found: 'Passages the agent found',
      answer: 'Answer, with sources',
      note: 'Demo with sample documents of a fictional company.',
      /** hits are [document index, passage index] pairs into `docs`. */
      questions: [
        {
          text: 'Can a customer cancel the annual plan early?',
          hits: [[0, 1], [1, 0]],
          answer: 'Yes. Annual plans can be cancelled with 30 days’ notice, and the unused months are refunded minus a 10 % fee.',
          sources: ['Terms 2025, §7.2', 'Pricing.pdf, p. 2'],
        },
        {
          text: 'What warranty do we give on repairs?',
          hits: [[2, 0]],
          answer: 'Repairs carry a 12-month warranty on parts and labour, extended to 24 months for business customers on a service contract.',
          sources: ['Service handbook, 4.1'],
        },
        {
          text: 'Who approves discounts above 15 %?',
          hits: [[2, 2], [0, 2]],
          answer: 'Discounts above 15 % need approval from the sales lead; above 25 % the managing director must sign off.',
          sources: ['Service handbook, 6.3', 'Terms 2025, §3.4'],
        },
      ],
      docs: [
        {
          name: 'Terms 2025.pdf',
          chunks: [
            '§3 Prices may be adjusted once per year…',
            '§7.2 Annual plans: 30 days’ notice, unused months refunded minus 10 %.',
            '§3.4 Discounts over 25 % require managing director approval.',
          ],
        },
        {
          name: 'Pricing.pdf',
          chunks: ['Annual plan refunds are calculated per full month.', 'Monthly plans renew automatically…', 'Volume pricing from 50 seats…'],
        },
        {
          name: 'Service handbook.docx',
          chunks: [
            '4.1 Warranty: 12 months parts and labour; 24 months on service contracts.',
            '5.2 Response times by priority…',
            '6.3 Discounts above 15 % need sales lead approval.',
          ],
        },
      ],
    },
    services: {
      label: 'What we automate',
      title: { before: 'What we ', mark: 'automate', after: '.' },
      lead: 'Five kinds of work. Where a demo on this page shows it, the row takes you there.',
      includes: 'Includes',
      rows: [
        {
          title: 'Process analysis',
          body: 'The best place to start. We find the processes worth automating, estimate cost and savings, and plan the agents step by step.',
          tags: ['Process map', 'Hours measured', 'Ranked by savings', 'Build plan'],
          href: '#analysis',
          link: 'See a sample report',
        },
        {
          title: 'Customer support agents',
          body: 'Chat and email agents that answer from your help centre and order data, and hand over to your team when they should.',
          tags: ['Chat and email', 'Help centre answers', 'Order lookup', 'Human handover'],
          href: '#demos',
          link: 'Watch the support agent',
        },
        {
          title: 'Documents and email',
          body: 'Invoices, orders, contracts and requests read, checked and entered into your systems.',
          tags: ['Invoices', 'Orders', 'Contracts', 'Human review'],
          href: '#workflow',
          link: 'See the invoice workflow',
        },
        {
          title: 'Company knowledge',
          body: 'An assistant that answers your team from handbooks, products and past cases, with sources.',
          tags: ['Handbooks', 'Product data', 'Past cases', 'Sources shown'],
          href: '#knowledge',
          link: 'Try the documents demo',
        },
        {
          title: 'Integrations and software',
          body: 'When off-the-shelf tools don’t fit: connectors, backends and data pipelines built properly.',
          tags: ['Connectors', 'Backends', 'Data pipelines'],
          href: null,
          link: null,
        },
      ],
    },
    trust: {
      label: 'Data protection',
      title: { before: 'Built for ', mark: 'European', after: ' data rules.' },
      lead: 'Automation only works if you know where your data goes. These are the rules every Ferbert project follows.',
      link: 'Read our privacy notice',
      items: [
        { title: 'Your data stays in the EU', body: 'We build on EU-hosted infrastructure and EU-region AI models, and show you where each part runs.' },
        { title: 'GDPR and a data processing agreement', body: 'We sign a data processing agreement before any personal data touches an agent.' },
        { title: 'People approve what matters', body: 'Unclear or sensitive cases go to your team. Every agent action is logged and can be reviewed.' },
        { title: 'You own everything', body: 'Code, prompts, data and accounts belong to you. No lock-in, and a clean handover if you take it in-house.' },
      ],
    },
    how: {
      label: 'How we work',
      title: { before: 'From first call to ', mark: 'running agent', after: '.' },
      cadence: ['30 min', '2–3 weeks', '[N] weeks.'],
      cadenceLabel: '30 minutes, 2 to 3 weeks, N weeks',
      cadenceLead: 'A free first call. A process analysis in two to three weeks. Then your first agent, tested on your real cases before it goes live.',
      steps: [
        { title: 'Free call.', body: 'We learn how your team works and where time goes.' },
        { title: 'Process analysis.', body: 'Each process measured in hours, with a clear list of what to automate.' },
        { title: 'Build.', body: 'We build the first agents, test them on your real cases, and train your team.' },
        { title: 'Run and improve.', body: 'Monitoring, cost tracking and monthly improvements.' },
      ],
    },
    pricing: {
      label: 'Pricing',
      title: { before: 'Three ways to ', mark: 'start', after: '.' },
      lead: 'Pick the stage you are at. If you are not sure, begin with the analysis: it tells you whether building is worth it.',
      recommended: 'Recommended',
      timeline: 'Timeline',
      /** Only the recommended offer carries the call-to-action button. */
      offers: [
        {
          title: 'Process analysis',
          line: 'Know what to automate before you pay for building.',
          time: '2–3 weeks',
          when: 'Recommended first step',
          items: [
            'A map of your key processes',
            'Hours per week, measured with your team',
            'What AI can take over, ranked by savings and risk',
            'A build plan with cost, timeline and payback',
            'The report is yours to keep',
          ],
          price: '[PRICE]',
          unit: 'fixed',
          recommended: true,
        },
        {
          title: 'Agent build',
          line: 'Your first agents, built, tested and handed over.',
          time: '[N] weeks',
          when: 'Best if you already know the process',
          items: [
            'The agents your analysis ranks highest',
            'Connected to the tools you already use',
            'Tested on your real cases',
            'Human review where the agent is unsure',
            'Training for your team',
          ],
          price: 'By estimate',
          unit: '',
          recommended: false,
        },
        {
          title: 'Run and improve',
          line: 'We keep your agents healthy and make them better.',
          time: 'Ongoing',
          when: 'Best if agents are already running',
          items: ['Monitoring and alerts', 'Cost tracking for each agent', 'Fixes when a tool or a model changes', 'Monthly improvements'],
          price: '[RATE]',
          unit: '/ hour',
          recommended: false,
        },
      ],
      how: {
        title: 'How pricing works.',
        steps: [
          { label: '01 · Fixed price', body: 'The analysis costs a fixed amount, agreed before we start.' },
          { label: '02 · Written estimate', body: 'What comes next depends on what we automate. You get an estimate in hours at our hourly rate.' },
          { label: '03 · You approve', body: 'We build only after you approve the estimate. You pay for the hours worked.' },
        ],
      },
    },
    company: {
      label: 'Company',
      title: { before: 'A new company, built on ', mark: 'production', after: ' engineering.' },
      lead: 'Ferbert is an AI automation company from Valencia, working with companies across Europe.',
      body: 'We’re starting small on purpose: every client works directly with senior engineers. Our background is backend engineering: Java, Kotlin, Kafka, cloud infrastructure. We build agents the same way, with retries, monitoring and human review.',
    },
    faq: {
      label: 'FAQ',
      title: { before: 'Pre-call ', mark: 'questions', after: '.' },
      notHere: 'Your question is not here?',
      items: [
        {
          q: 'Do we need an AI strategy before we talk to you?',
          a: 'No. You need one process that costs your team too many hours. The process analysis turns that into a ranked list of what to automate first, with cost and expected savings.',
        },
        {
          q: 'How fast will we see something working?',
          a: 'The process analysis takes two to three weeks. The first agent is live [N] weeks after that, depending on the process and the tools it connects to.',
        },
        {
          q: 'Will agents replace people on our team?',
          a: 'Agents take over the repetitive steps: reading, checking, entering data, answering routine questions. Unclear and sensitive cases go to your team, and people approve what matters.',
        },
        {
          q: 'What happens to our data?',
          a: 'We build on EU-hosted infrastructure and EU-region AI models, and show you where each part runs. We sign a data processing agreement before any personal data touches an agent.',
        },
        {
          q: 'Will you show our project to other clients?',
          a: 'No. Your project stays confidential. We never name clients or show their automations without permission.',
        },
        {
          q: 'Are we locked in after the project?',
          a: 'No. Code, prompts, data and accounts belong to you. If you take the agents in-house, we hand everything over cleanly.',
        },
        {
          q: 'What if an agent gets something wrong or stops?',
          a: 'We build agents with retries, monitoring and human review for unclear cases, and every action is logged. With “Run and improve” we watch the agents and fix them when a tool or a model changes.',
        },
      ],
    },
    closing: {
      label: 'One process is enough to start',
      title: { before: 'Which process should ', mark: 'run itself', after: ' first?' },
      lead: 'It starts with a free 30-minute call. We’ll look at your processes together and tell you honestly what is worth automating.',
      you: 'You',
    },
  },

  contact: {
    metaTitle: 'Contact — Ferbert',
    label: 'Contact',
    title: { before: 'Tell us what eats your ', mark: 'week', after: '.' },
    lead: 'Describe one process. We reply within [2 WORKING DAYS] with where AI fits, what it would take, and whether it’s worth it. In English, German or Spanish.',
    booking: {
      label: 'Free call · 30 min',
      format: 'Video',
      title: 'Prefer to talk? Book a free 30-minute call.',
      body: 'Pick a time that suits you. We look at one process together and tell you honestly whether it’s worth automating.',
      missingUrl: '[BOOKING URL]',
    },
    other: 'Other ways to reach us',
    /** Handles in brackets have no link yet; render them as text, not as links. */
    channels: [
      { name: 'Email', handle: 'ferbertigo@gmail.com', key: 'email' },
      { name: 'LinkedIn', handle: '[LINKEDIN PAGE]', key: 'linkedin' },
      { name: 'WhatsApp', handle: '[NUMBER]', key: 'whatsapp' },
      { name: 'Telegram', handle: '[HANDLE]', key: 'telegram' },
      { name: 'X', handle: '[HANDLE]', key: 'x' },
      { name: 'GitHub', handle: 'ferbert-dev', key: 'github' },
    ],
    form: {
      label: 'Contact form',
      name: 'Name',
      email: 'Work email',
      company: 'Company',
      size: 'Team size',
      sizes: ['1–10', '11–50', '51–250', '250+'],
      sizeDefault: '11–50',
      topics: 'What should we look at?',
      topicList: ['Process analysis', 'Documents and email', 'Customer support agents', 'Company knowledge', 'Integrations and software'],
      message: 'Which process takes your team too long?',
      placeholder: 'e.g. Two people spend most of Monday copying orders from email into our ERP.',
      hint: 'Who does it, how often, in which tools. Rough numbers are fine.',
      opensMail: 'Opens your email app with the message ready to send.',
      privacy: 'We only use your details to reply.',
      privacyLink: 'Privacy',
      submit: 'Send message',
      /** Not drawn in the design; written for the build's inline validation. */
      errors: {
        name: 'Enter your name so we know who to reply to.',
        email: 'Enter a work email address, for example anna@company.com.',
        message: 'Describe the process in a sentence or two.',
      },
      /** The email the form prepares; see Contact in design/handoff/COMPONENTS.md. */
      mail: {
        subject: 'Process enquiry from',
        anonymous: 'the website',
        name: 'Name',
        email: 'Work email',
        company: 'Company',
        size: 'Team size',
        topics: 'Topics',
        none: 'not given',
      },
    },
    /** Shown after submit, when the visitor's email app has been asked to open. */
    sent: {
      title: 'Your email app should be open now.',
      body: 'Your message is ready in a new email to ferbertigo@gmail.com. Send it from there and we reply within [2 WORKING DAYS].',
      fallbackBefore: 'Nothing opened?',
      fallbackLink: 'Open the email again',
      fallbackAfter: 'or write to',
      back: 'Back to the form',
    },
  },

  /** Not linked at launch (owner decision); kept for when there are real posts. */
  blog: {
    metaTitle: 'Blog — Ferbert',
    label: 'Blog',
    title: { before: 'What we learn building ', mark: 'agents', after: '.' },
    lead: 'Notes from real projects: RAG, automation, and the engineering that keeps agents running.',
    filterLabel: 'Filter by topic',
    filters: ['All', 'RAG', 'Automation', 'Engineering'],
    featured: 'Featured',
    readPost: 'Read the post',
    read: 'Read',
    cover: '[COVER IMAGE]',
    date: '[DATE]',
    empty: 'No posts on this topic yet.',
    /** Placeholder posts until the owner supplies real ones. The first is featured. */
    posts: [
      {
        topic: 'Automation',
        minutes: '8 min',
        title: '[POST TITLE: e.g. How we measure a process in hours before we automate it]',
        summary: '[TWO-SENTENCE SUMMARY OF THE POST]',
      },
      { topic: 'RAG', minutes: '', title: '[POST TITLE: e.g. Keeping RAG answers correct as your documents change]', summary: '' },
      { topic: 'Automation', minutes: '', title: '[POST TITLE: e.g. What a process analysis found in one week of invoices]', summary: '' },
      { topic: 'Engineering', minutes: '', title: '[POST TITLE: e.g. Retries, idempotency and why demos break in production]', summary: '' },
    ],
  },

  legal: {
    metaTitle: 'Impressum and privacy — Ferbert',
    label: 'Legal',
    title: { before: 'Impressum and ', mark: 'privacy', after: '.' },
    updated: 'Last updated [DATE]',
    binding: 'The German version of this page is the legally binding one for clients in Germany.',
    draft: 'Draft structure for your lawyer to complete. Not legal advice.',
    toc: 'On this page',
    impressum: {
      title: 'Impressum',
      rows: [
        ['Company', '[LEGAL NAME, e.g. Ferbert S.L.]'],
        ['Address', '[STREET, POSTCODE] Valencia, Spain'],
        ['Represented by', 'Igor Ferbert'],
        ['Email', 'ferbertigo@gmail.com'],
        ['Phone', '[PHONE]'],
        ['Commercial register', '[REGISTRO MERCANTIL, ENTRY]'],
        ['VAT ID', '[ES NIF / VAT NUMBER]'],
      ],
    },
    privacy: {
      title: 'Privacy notice',
      paragraphs: [
        'We only collect what we need to answer you and run this website. When you write to us through the contact form, we use your name, email, company and message to reply. We keep enquiries for [RETENTION PERIOD] and never sell or share them for advertising.',
        'This website is hosted by [HOSTING PROVIDER, REGION]. We use [ANALYTICS: e.g. none / privacy-friendly analytics without cookies].',
      ],
    },
    ai: {
      title: 'How our agents use data',
      items: [
        'Client data is processed only under a signed data processing agreement (AVV / DPA).',
        'Agents run on EU-hosted infrastructure and EU-region AI models: [PROVIDERS AND REGIONS].',
        'Client data is not used to train AI models.',
        'Every agent action is logged; clients can review and export the logs.',
      ],
    },
    rights: {
      title: 'Your rights',
      before: 'You can ask what data we hold about you, have it corrected or deleted, and object to its use. Write to ',
      after: '. You can also complain to your data protection authority.',
    },
  },

  /** Not drawn in the design; keep it in the same layout as the Legal page header. */
  notFound: {
    title: 'This page does not exist.',
    lead: 'The link may be old, or the address has a typo.',
    home: 'Back to the home page',
  },
};
