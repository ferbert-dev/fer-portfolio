import type { Dictionary } from './index';

/**
 * German copy. PLACEHOLDER: generated from en.ts on 2026-10-19.
 * Every text still starting with "[DE] " is untranslated English. Translate in place:
 * replace the whole string, including the "[DE] " prefix. Keep the keys and the
 * shape exactly as they are; `npm run check:content` fails when a key is missing.
 * Values in [SQUARE BRACKETS] are owner placeholders, the same as in en.ts.
 */
export const de: Dictionary = {
  "meta": {
    "title": "[DE] Ferbert — AI process analysis and agents",
    "description": "[DE] Ferbert analyses how your company works, shows which processes AI can take over and what that saves, then builds the agents that run them."
  },
  "common": {
    "skip": "[DE] Skip to content",
    "cta": "[DE] Book a free call",
    "ctaNote": "[DE] Free · 30 minutes · An honest view of what is worth automating",
    "write": "[DE] Write to us",
    "demo": "[DE] Demo",
    "pause": "[DE] Pause",
    "play": "[DE] Play"
  },
  "header": {
    "home": "[DE] Ferbert, home",
    "tagline": "[DE] AI automation company",
    "navLabel": "[DE] Main",
    "menu": "[DE] Menu",
    "close": "[DE] Close",
    "mobileNavLabel": "[DE] Mobile",
    "theme": {
      "label": "[DE] Colour theme",
      "auto": "[DE] Auto",
      "light": "[DE] Light",
      "dark": "[DE] Dark",
      "change": "[DE] Change theme"
    },
    "languages": {
      "en": "English",
      "de": "Deutsch",
      "enShort": "EN",
      "deShort": "DE"
    }
  },
  "nav": [
    {
      "href": "/#analysis",
      "label": "[DE] Analysis"
    },
    {
      "href": "/#demos",
      "label": "[DE] Demos"
    },
    {
      "href": "/#services",
      "label": "[DE] What we automate"
    },
    {
      "href": "/#start",
      "label": "[DE] Pricing"
    },
    {
      "href": "/#faq",
      "label": "[DE] FAQ"
    },
    {
      "href": "/blog",
      "label": "[DE] Blog"
    },
    {
      "href": "/contact",
      "label": "[DE] Contact"
    }
  ],
  "footer": {
    "links": [
      {
        "href": "/#analysis",
        "label": "[DE] Analysis"
      },
      {
        "href": "/#demos",
        "label": "[DE] Demos"
      },
      {
        "href": "/#services",
        "label": "[DE] What we automate"
      },
      {
        "href": "/blog",
        "label": "[DE] Blog"
      },
      {
        "href": "/contact",
        "label": "[DE] Contact"
      }
    ],
    "github": "[DE] GitHub",
    "impressum": "[DE] Impressum",
    "privacy": "[DE] Privacy",
    "copyright": "[DE] © 2026 Ferbert, Valencia, Spain"
  },
  "home": {
    "hero": {
      "label": "[DE] Process analysis first · then agents",
      "title": {
        "before": "[DE] Find the work AI should do. Then let ",
        "mark": "agents",
        "after": " do it."
      },
      "lead": "[DE] Ferbert analyses how your company works, shows you which processes AI can take over and what that saves, then builds the agents that run them.",
      "secondary": "[DE] Watch an agent think",
      "card": "[DE] An automation company that starts with an analysis, not a guess.",
      "railStatus": "[DE] Status",
      "railPlace": "[DE] Valencia · Europe"
    },
    "tools": {
      "label": "[DE] Tools we connect",
      "lead": "[DE] We connect agents to the tools you already use, for example",
      "pauseLabel": "[DE] Pause the scrolling tool list",
      "playLabel": "[DE] Play the scrolling tool list",
      "list": [
        "[DE] Gmail",
        "[DE] Outlook",
        "[DE] Google Drive",
        "[DE] SharePoint",
        "[DE] Slack",
        "[DE] WhatsApp",
        "[DE] Shopify",
        "[DE] HubSpot",
        "[DE] Zendesk",
        "[DE] DATEV",
        "[DE] SAP",
        "[DE] Holded"
      ]
    },
    "workflow": {
      "label": "[DE] Live example",
      "title": {
        "before": "[DE] An invoice, handled ",
        "mark": "end to end",
        "after": "."
      },
      "lead": "[DE] An example automation for illustration. It runs on every new email. Yours is designed around your process.",
      "name": "[DE] Invoice intake",
      "status": {
        "arriving": "[DE] new email arriving",
        "running": "[DE] running",
        "done": "[DE] done, waiting for the next email"
      },
      "short": {
        "arriving": "[DE] new email",
        "running": "[DE] running",
        "done": "[DE] done"
      },
      "railStatus": {
        "running": "[DE] running",
        "idle": "[DE] idle"
      },
      "logLabel": "[DE] Run log",
      "nodes": [
        {
          "kind": "[DE] Trigger",
          "short": "[DE] New email",
          "title": "[DE] New email with invoice",
          "detail": "[DE] Inbox: invoices@"
        },
        {
          "kind": "[DE] AI step",
          "short": "[DE] Read invoice",
          "title": "[DE] Read the invoice",
          "detail": "[DE] Supplier, totals, VAT, due date"
        },
        {
          "kind": "[DE] Knowledge",
          "short": "[DE] Match order",
          "title": "[DE] Match to order",
          "detail": "[DE] Finds the purchase order"
        },
        {
          "kind": "[DE] Check",
          "short": "[DE] Human review",
          "title": "[DE] Human review if unsure",
          "detail": "[DE] Only unclear cases"
        },
        {
          "kind": "[DE] Action",
          "short": "[DE] Book it",
          "title": "[DE] Book in accounting",
          "detail": "[DE] Entered in your ERP"
        }
      ],
      "logs": [
        {
          "t": "09:41:02",
          "msg": "[DE] Invoice from Müller GmbH received"
        },
        {
          "t": "09:41:03",
          "msg": "[DE] Read: 1.284,50 EUR, VAT 19 %, due in 30 days"
        },
        {
          "t": "09:41:04",
          "msg": "[DE] Matched to purchase order PO-20817"
        },
        {
          "t": "09:41:04",
          "msg": "[DE] Confident match, no review needed"
        },
        {
          "t": "09:41:05",
          "msg": "[DE] Booked in accounting. Done in 3 seconds"
        }
      ]
    },
    "analysis": {
      "label": "[DE] Process analysis",
      "title": {
        "before": "[DE] Start with an ",
        "mark": "analysis",
        "after": ", not a guess."
      },
      "lead": "[DE] In two to three weeks we map how work moves through your company, measure every process in hours, and rank what AI can take over by savings and risk. You keep the report, whether or not we build anything.",
      "deliverables": [
        "[DE] A map of your key processes: who does what, in which tools, how often",
        "[DE] Hours per week for each process, measured with your team",
        "[DE] What AI can take over, ranked by savings and risk",
        "[DE] A build plan with cost, timeline and expected payback"
      ],
      "report": {
        "title": "[DE] Process analysis",
        "note": "[DE] Sample report · fictional company",
        "cols": {
          "process": "[DE] Process",
          "hours": "[DE] Hours per week, today and with agents",
          "potential": "Potential"
        },
        "phoneKey": "[DE] Hours per week: today, then with agents",
        "unit": "[DE] h",
        "rows": [
          {
            "name": "[DE] Invoice intake",
            "before": 38,
            "after": 3,
            "potential": "high"
          },
          {
            "name": "[DE] Customer emails",
            "before": 25,
            "after": 8,
            "potential": "high"
          },
          {
            "name": "[DE] Order entry",
            "before": 18,
            "after": 4,
            "potential": "high"
          },
          {
            "name": "[DE] Monthly reporting",
            "before": 12,
            "after": 2,
            "potential": "medium"
          },
          {
            "name": "[DE] Quotes",
            "before": 10,
            "after": 6,
            "potential": "low"
          }
        ],
        "levels": {
          "high": "[DE] High",
          "medium": "[DE] Medium",
          "low": "[DE] Low"
        },
        "total": "[DE] Total",
        "totalValue": {
          "before": "[DE] 103 h",
          "after": "[DE] 23 h",
          "unit": "[DE] per week"
        },
        "saved": "[DE] 80 h saved"
      }
    },
    "agent": {
      "label": "[DE] Demo · sample data",
      "title": {
        "before": "[DE] Watch a support agent ",
        "mark": "think",
        "after": "."
      },
      "lead": "[DE] Ask the shop assistant a question. Alongside the chat you see every step it takes before it answers: understanding, searching your help centre, checking your order database, following your rules.",
      "inside": "[DE] Inside the agent",
      "waiting": "[DE] Waiting for a question",
      "answeredIn": "[DE] Answered in 5.1 s",
      "working": "[DE] Working…",
      "shop": "[DE] Nordwind Shop support",
      "avatar": "[DE] N",
      "online": "[DE] AI agent, online",
      "greeting": "[DE] Hi! I’m Nordwind’s assistant. Ask me about orders, returns or delivery.",
      "thinking": "[DE] Agent is thinking",
      "choose": "[DE] Choose a question",
      "hint": "[DE] Pick a question above. This demo uses sample data.",
      "steps": [
        {
          "title": "[DE] Message received",
          "tag": "[DE] Chat"
        },
        {
          "title": "[DE] Understand the question",
          "tag": "[DE] Language model"
        },
        {
          "title": "[DE] Search the help centre",
          "tag": "[DE] RAG"
        },
        {
          "title": "[DE] Look up the customer’s order",
          "tag": "[DE] Database"
        },
        {
          "title": "[DE] Check the rules",
          "tag": "[DE] Guardrails"
        },
        {
          "title": "[DE] Write the answer",
          "tag": "[DE] Language model"
        }
      ],
      "scenarios": [
        {
          "ask": "[DE] Where is my order?",
          "rag": [
            {
              "title": "[DE] Delivery times",
              "score": "0.91",
              "text": "[DE] Germany and Austria: 2–3 working days with DHL after dispatch."
            },
            {
              "title": "[DE] Tracking your parcel",
              "score": "0.87",
              "text": "[DE] The tracking link is in your shipping email and in your account."
            }
          ],
          "dbTable": "[DE] orders · #48213",
          "db": [
            [
              "[DE] Status",
              "[DE] Shipped"
            ],
            [
              "[DE] Carrier",
              "[DE] DHL 00340434 48213"
            ],
            [
              "[DE] Shipped",
              "[DE] 6 Oct 2026"
            ],
            [
              "[DE] Estimated delivery",
              "[DE] Fri 9 Oct"
            ]
          ],
          "details": [
            "[DE] “Where is my order?”",
            "[DE] Intent: order status. Customer is logged in.",
            "[DE] Found 2 articles: “Delivery times”, “Tracking your parcel”",
            "[DE] Order #48213: shipped 6 Oct with DHL, arriving Fri 9 Oct",
            "[DE] Order data may be shared with the logged-in customer",
            "[DE] Answer written from 3 sources"
          ],
          "answer": "[DE] Your order #48213 is on the way! It left our warehouse on 6 October with DHL and should arrive on Friday, 9 October. Here is your tracking link: dhl.de/track/48213",
          "sources": [
            "[DE] Order #48213",
            "[DE] Tracking your parcel"
          ]
        },
        {
          "ask": "[DE] Can I return my shoes?",
          "rag": [
            {
              "title": "[DE] Returns policy",
              "score": "0.93",
              "text": "[DE] Return within 30 days of delivery. Returns are free in Germany and Austria."
            },
            {
              "title": "[DE] Free return labels",
              "score": "0.84",
              "text": "[DE] Labels can be created in chat or in your account after delivery."
            }
          ],
          "dbTable": "[DE] orders · #48213",
          "db": [
            [
              "[DE] Items",
              "[DE] Trail runner, size 42"
            ],
            [
              "[DE] Status",
              "[DE] Shipped, not delivered"
            ],
            [
              "[DE] Return window",
              "[DE] Starts on delivery"
            ]
          ],
          "details": [
            "[DE] “Can I return my shoes?”",
            "[DE] Intent: return request for order #48213.",
            "[DE] Found: “Returns policy”, “Free return labels”",
            "[DE] Order #48213 not delivered yet",
            "[DE] No refund without the customer confirming",
            "[DE] Answer written from 3 sources"
          ],
          "answer": "[DE] Yes. You can return them free of charge within 30 days of delivery. Your order hasn’t arrived yet; once it has, I can create the return label for you right here.",
          "sources": [
            "[DE] Returns policy",
            "[DE] Order #48213"
          ]
        },
        {
          "ask": "[DE] I’d like to talk to a person",
          "rag": [],
          "dbTable": "[DE] tickets · new",
          "db": [
            [
              "[DE] Ticket",
              "[DE] T-1182"
            ],
            [
              "[DE] Assigned to",
              "[DE] Laura, support team"
            ],
            [
              "[DE] Includes",
              "[DE] Full chat history"
            ]
          ],
          "details": [
            "[DE] “I’d like to talk to a person”",
            "[DE] Intent: human handover.",
            "[DE] Not needed for this request",
            "[DE] Ticket T-1182 created with the chat history",
            "[DE] Support team online Mon–Fri, 9:00–18:00",
            "[DE] Handover message written"
          ],
          "answer": "[DE] Of course. I’ve passed our conversation to Laura from the support team, with everything you’ve told me. She’ll reply here in about 10 minutes.",
          "sources": [
            "[DE] Ticket T-1182"
          ]
        }
      ]
    },
    "knowledge": {
      "label": "[DE] Demo · sample documents",
      "title": {
        "before": "[DE] Your team can ask the company’s ",
        "mark": "documents",
        "after": " too."
      },
      "lead": "[DE] The same retrieval works internally. The agent finds the right passages first, then answers only from them, and shows where each fact came from.",
      "ask": "[DE] Ask a question",
      "found": "[DE] Passages the agent found",
      "answer": "[DE] Answer, with sources",
      "note": "[DE] Demo with sample documents of a fictional company.",
      "questions": [
        {
          "text": "[DE] Can a customer cancel the annual plan early?",
          "hits": [
            [
              0,
              1
            ],
            [
              1,
              0
            ]
          ],
          "answer": "[DE] Yes. Annual plans can be cancelled with 30 days’ notice, and the unused months are refunded minus a 10 % fee.",
          "sources": [
            "[DE] Terms 2025, §7.2",
            "[DE] Pricing.pdf, p. 2"
          ]
        },
        {
          "text": "[DE] What warranty do we give on repairs?",
          "hits": [
            [
              2,
              0
            ]
          ],
          "answer": "[DE] Repairs carry a 12-month warranty on parts and labour, extended to 24 months for business customers on a service contract.",
          "sources": [
            "[DE] Service handbook, 4.1"
          ]
        },
        {
          "text": "[DE] Who approves discounts above 15 %?",
          "hits": [
            [
              2,
              2
            ],
            [
              0,
              2
            ]
          ],
          "answer": "[DE] Discounts above 15 % need approval from the sales lead; above 25 % the managing director must sign off.",
          "sources": [
            "[DE] Service handbook, 6.3",
            "[DE] Terms 2025, §3.4"
          ]
        }
      ],
      "docs": [
        {
          "name": "[DE] Terms 2025.pdf",
          "chunks": [
            "[DE] §3 Prices may be adjusted once per year…",
            "[DE] §7.2 Annual plans: 30 days’ notice, unused months refunded minus 10 %.",
            "[DE] §3.4 Discounts over 25 % require managing director approval."
          ]
        },
        {
          "name": "[DE] Pricing.pdf",
          "chunks": [
            "[DE] Annual plan refunds are calculated per full month.",
            "[DE] Monthly plans renew automatically…",
            "[DE] Volume pricing from 50 seats…"
          ]
        },
        {
          "name": "[DE] Service handbook.docx",
          "chunks": [
            "[DE] 4.1 Warranty: 12 months parts and labour; 24 months on service contracts.",
            "[DE] 5.2 Response times by priority…",
            "[DE] 6.3 Discounts above 15 % need sales lead approval."
          ]
        }
      ]
    },
    "services": {
      "label": "[DE] What we automate",
      "title": {
        "before": "[DE] What we ",
        "mark": "automate",
        "after": "."
      },
      "lead": "[DE] Five kinds of work. Where a demo on this page shows it, the row takes you there.",
      "includes": "[DE] Includes",
      "rows": [
        {
          "title": "[DE] Process analysis",
          "body": "[DE] The best place to start. We find the processes worth automating, estimate cost and savings, and plan the agents step by step.",
          "tags": [
            "[DE] Process map",
            "[DE] Hours measured",
            "[DE] Ranked by savings",
            "[DE] Build plan"
          ],
          "href": "#analysis",
          "link": "[DE] See a sample report"
        },
        {
          "title": "[DE] Customer support agents",
          "body": "[DE] Chat and email agents that answer from your help centre and order data, and hand over to your team when they should.",
          "tags": [
            "[DE] Chat and email",
            "[DE] Help centre answers",
            "[DE] Order lookup",
            "[DE] Human handover"
          ],
          "href": "#demos",
          "link": "[DE] Watch the support agent"
        },
        {
          "title": "[DE] Documents and email",
          "body": "[DE] Invoices, orders, contracts and requests read, checked and entered into your systems.",
          "tags": [
            "[DE] Invoices",
            "[DE] Orders",
            "[DE] Contracts",
            "[DE] Human review"
          ],
          "href": "#workflow",
          "link": "[DE] See the invoice workflow"
        },
        {
          "title": "[DE] Company knowledge",
          "body": "[DE] An assistant that answers your team from handbooks, products and past cases, with sources.",
          "tags": [
            "[DE] Handbooks",
            "[DE] Product data",
            "[DE] Past cases",
            "[DE] Sources shown"
          ],
          "href": "#knowledge",
          "link": "[DE] Try the documents demo"
        },
        {
          "title": "[DE] Integrations and software",
          "body": "[DE] When off-the-shelf tools don’t fit: connectors, backends and data pipelines built properly.",
          "tags": [
            "[DE] Connectors",
            "[DE] Backends",
            "[DE] Data pipelines"
          ],
          "href": null,
          "link": null
        }
      ]
    },
    "trust": {
      "label": "[DE] Data protection",
      "title": {
        "before": "[DE] Built for ",
        "mark": "European",
        "after": " data rules."
      },
      "lead": "[DE] Automation only works if you know where your data goes. These are the rules every Ferbert project follows.",
      "link": "[DE] Read our privacy notice",
      "items": [
        {
          "title": "[DE] Your data stays in the EU",
          "body": "[DE] We build on EU-hosted infrastructure and EU-region AI models, and show you where each part runs."
        },
        {
          "title": "[DE] GDPR and a data processing agreement",
          "body": "[DE] We sign a data processing agreement before any personal data touches an agent."
        },
        {
          "title": "[DE] People approve what matters",
          "body": "[DE] Unclear or sensitive cases go to your team. Every agent action is logged and can be reviewed."
        },
        {
          "title": "[DE] You own everything",
          "body": "[DE] Code, prompts, data and accounts belong to you. No lock-in, and a clean handover if you take it in-house."
        }
      ]
    },
    "how": {
      "label": "[DE] How we work",
      "title": {
        "before": "[DE] From first call to ",
        "mark": "running agent",
        "after": "."
      },
      "cadence": [
        "[DE] 30 min",
        "[DE] 2–3 weeks",
        "[N] weeks."
      ],
      "cadenceLabel": "[DE] 30 minutes, 2 to 3 weeks, N weeks",
      "cadenceLead": "[DE] A free first call. A process analysis in two to three weeks. Then your first agent, tested on your real cases before it goes live.",
      "steps": [
        {
          "title": "[DE] Free call.",
          "body": "[DE] We learn how your team works and where time goes."
        },
        {
          "title": "[DE] Process analysis.",
          "body": "[DE] Each process measured in hours, with a clear list of what to automate."
        },
        {
          "title": "[DE] Build.",
          "body": "[DE] We build the first agents, test them on your real cases, and train your team."
        },
        {
          "title": "[DE] Run and improve.",
          "body": "[DE] Monitoring, cost tracking and monthly improvements."
        }
      ]
    },
    "pricing": {
      "label": "[DE] Pricing",
      "title": {
        "before": "[DE] Three ways to ",
        "mark": "start",
        "after": "."
      },
      "lead": "[DE] Pick the stage you are at. If you are not sure, begin with the analysis: it tells you whether building is worth it.",
      "recommended": "[DE] Recommended",
      "timeline": "[DE] Timeline",
      "offers": [
        {
          "title": "[DE] Process analysis",
          "line": "[DE] Know what to automate before you pay for building.",
          "time": "[DE] 2–3 weeks",
          "when": "[DE] Recommended first step",
          "items": [
            "[DE] A map of your key processes",
            "[DE] Hours per week, measured with your team",
            "[DE] What AI can take over, ranked by savings and risk",
            "[DE] A build plan with cost, timeline and payback",
            "[DE] The report is yours to keep"
          ],
          "price": "[PRICE]",
          "unit": "[DE] fixed",
          "recommended": true
        },
        {
          "title": "[DE] Agent build",
          "line": "[DE] Your first agents, built, tested and handed over.",
          "time": "[N] weeks",
          "when": "[DE] Best if you already know the process",
          "items": [
            "[DE] The agents your analysis ranks highest",
            "[DE] Connected to the tools you already use",
            "[DE] Tested on your real cases",
            "[DE] Human review where the agent is unsure",
            "[DE] Training for your team"
          ],
          "price": "[DE] By estimate",
          "unit": "",
          "recommended": false
        },
        {
          "title": "[DE] Run and improve",
          "line": "[DE] We keep your agents healthy and make them better.",
          "time": "[DE] Ongoing",
          "when": "[DE] Best if agents are already running",
          "items": [
            "[DE] Monitoring and alerts",
            "[DE] Cost tracking for each agent",
            "[DE] Fixes when a tool or a model changes",
            "[DE] Monthly improvements"
          ],
          "price": "[RATE]",
          "unit": "/ hour",
          "recommended": false
        }
      ],
      "how": {
        "title": "[DE] How pricing works.",
        "steps": [
          {
            "label": "[DE] 01 · Fixed price",
            "body": "[DE] The analysis costs a fixed amount, agreed before we start."
          },
          {
            "label": "[DE] 02 · Written estimate",
            "body": "[DE] What comes next depends on what we automate. You get an estimate in hours at our hourly rate."
          },
          {
            "label": "[DE] 03 · You approve",
            "body": "[DE] We build only after you approve the estimate. You pay for the hours worked."
          }
        ]
      }
    },
    "company": {
      "label": "[DE] Company",
      "title": {
        "before": "[DE] A new company, built on ",
        "mark": "production",
        "after": " engineering."
      },
      "lead": "[DE] Ferbert is an AI automation company from Valencia, working with companies across Europe.",
      "body": "[DE] We’re starting small on purpose: every client works directly with senior engineers. Our background is backend engineering: Java, Kotlin, Kafka, cloud infrastructure. We build agents the same way, with retries, monitoring and human review."
    },
    "faq": {
      "label": "[DE] FAQ",
      "title": {
        "before": "[DE] Pre-call ",
        "mark": "questions",
        "after": "."
      },
      "notHere": "[DE] Your question is not here?",
      "items": [
        {
          "q": "[DE] Do we need an AI strategy before we talk to you?",
          "a": "[DE] No. You need one process that costs your team too many hours. The process analysis turns that into a ranked list of what to automate first, with cost and expected savings."
        },
        {
          "q": "[DE] How fast will we see something working?",
          "a": "[DE] The process analysis takes two to three weeks. The first agent is live [N] weeks after that, depending on the process and the tools it connects to."
        },
        {
          "q": "[DE] Will agents replace people on our team?",
          "a": "[DE] Agents take over the repetitive steps: reading, checking, entering data, answering routine questions. Unclear and sensitive cases go to your team, and people approve what matters."
        },
        {
          "q": "[DE] What happens to our data?",
          "a": "[DE] We build on EU-hosted infrastructure and EU-region AI models, and show you where each part runs. We sign a data processing agreement before any personal data touches an agent."
        },
        {
          "q": "[DE] Will you show our project to other clients?",
          "a": "[DE] No. Your project stays confidential. We never name clients or show their automations without permission."
        },
        {
          "q": "[DE] Are we locked in after the project?",
          "a": "[DE] No. Code, prompts, data and accounts belong to you. If you take the agents in-house, we hand everything over cleanly."
        },
        {
          "q": "[DE] What if an agent gets something wrong or stops?",
          "a": "[DE] We build agents with retries, monitoring and human review for unclear cases, and every action is logged. With “Run and improve” we watch the agents and fix them when a tool or a model changes."
        }
      ]
    },
    "closing": {
      "label": "[DE] One process is enough to start",
      "title": {
        "before": "[DE] Which process should ",
        "mark": "run itself",
        "after": " first?"
      },
      "lead": "[DE] It starts with a free 30-minute call. We’ll look at your processes together and tell you honestly what is worth automating.",
      "you": "[DE] You"
    }
  },
  "contact": {
    "metaTitle": "[DE] Contact — Ferbert",
    "label": "[DE] Contact",
    "title": {
      "before": "[DE] Tell us what eats your ",
      "mark": "week",
      "after": "."
    },
    "lead": "[DE] Describe one process. We reply within [2 WORKING DAYS] with where AI fits, what it would take, and whether it’s worth it. In English, German or Spanish.",
    "booking": {
      "label": "[DE] Free call · 30 min",
      "format": "[DE] Video",
      "title": "[DE] Prefer to talk? Book a free 30-minute call.",
      "body": "[DE] Pick a time that suits you. We look at one process together and tell you honestly whether it’s worth automating.",
      "missingUrl": "[BOOKING URL]"
    },
    "other": "[DE] Other ways to reach us",
    "channels": [
      {
        "name": "[DE] Email",
        "handle": "ferbertigo@gmail.com",
        "key": "email"
      },
      {
        "name": "[DE] LinkedIn",
        "handle": "[LINKEDIN PAGE]",
        "key": "linkedin"
      },
      {
        "name": "[DE] WhatsApp",
        "handle": "[NUMBER]",
        "key": "whatsapp"
      },
      {
        "name": "[DE] Telegram",
        "handle": "[HANDLE]",
        "key": "telegram"
      },
      {
        "name": "[DE] X",
        "handle": "[HANDLE]",
        "key": "x"
      },
      {
        "name": "[DE] GitHub",
        "handle": "ferbert-dev",
        "key": "github"
      }
    ],
    "form": {
      "label": "[DE] Contact form",
      "name": "[DE] Name",
      "email": "[DE] Work email",
      "company": "[DE] Company",
      "size": "[DE] Team size",
      "sizes": [
        "1–10",
        "11–50",
        "51–250",
        "[DE] 250+"
      ],
      "sizeDefault": "11–50",
      "topics": "[DE] What should we look at?",
      "topicList": [
        "[DE] Process analysis",
        "[DE] Documents and email",
        "[DE] Customer support agents",
        "[DE] Company knowledge",
        "[DE] Integrations and software"
      ],
      "message": "[DE] Which process takes your team too long?",
      "placeholder": "[DE] e.g. Two people spend most of Monday copying orders from email into our ERP.",
      "hint": "[DE] Who does it, how often, in which tools. Rough numbers are fine.",
      "privacy": "[DE] We only use your details to reply.",
      "privacyLink": "[DE] Privacy",
      "submit": "[DE] Send message",
      "errors": {
        "name": "[DE] Enter your name so we know who to reply to.",
        "email": "[DE] Enter a work email address, for example anna@company.com.",
        "message": "[DE] Describe the process in a sentence or two."
      }
    },
    "sent": {
      "title": "[DE] Thanks. Your message is with us.",
      "body": "[DE] We reply within [2 WORKING DAYS] from ferbertigo@gmail.com. If it’s urgent, book a call instead.",
      "again": "[DE] Send another message"
    }
  },
  "blog": {
    "metaTitle": "[DE] Blog — Ferbert",
    "label": "[DE] Blog",
    "title": {
      "before": "[DE] What we learn building ",
      "mark": "agents",
      "after": "."
    },
    "lead": "[DE] Notes from real projects: RAG, automation, and the engineering that keeps agents running.",
    "filterLabel": "[DE] Filter by topic",
    "filters": [
      "[DE] All",
      "[DE] RAG",
      "[DE] Automation",
      "[DE] Engineering"
    ],
    "featured": "[DE] Featured",
    "readPost": "[DE] Read the post",
    "read": "[DE] Read",
    "cover": "[COVER IMAGE]",
    "date": "[DATE]",
    "empty": "[DE] No posts on this topic yet.",
    "posts": [
      {
        "topic": "[DE] Automation",
        "minutes": "[DE] 8 min",
        "title": "[POST TITLE: e.g. How we measure a process in hours before we automate it]",
        "summary": "[TWO-SENTENCE SUMMARY OF THE POST]"
      },
      {
        "topic": "[DE] RAG",
        "minutes": "",
        "title": "[POST TITLE: e.g. Keeping RAG answers correct as your documents change]",
        "summary": ""
      },
      {
        "topic": "[DE] Automation",
        "minutes": "",
        "title": "[POST TITLE: e.g. What a process analysis found in one week of invoices]",
        "summary": ""
      },
      {
        "topic": "[DE] Engineering",
        "minutes": "",
        "title": "[POST TITLE: e.g. Retries, idempotency and why demos break in production]",
        "summary": ""
      }
    ]
  },
  "legal": {
    "metaTitle": "[DE] Impressum and privacy — Ferbert",
    "label": "[DE] Legal",
    "title": {
      "before": "[DE] Impressum and ",
      "mark": "privacy",
      "after": "."
    },
    "updated": "[DE] Last updated [DATE]",
    "binding": "[DE] The German version of this page is the legally binding one for clients in Germany.",
    "draft": "[DE] Draft structure for your lawyer to complete. Not legal advice.",
    "toc": "[DE] On this page",
    "impressum": {
      "title": "[DE] Impressum",
      "rows": [
        [
          "[DE] Company",
          "[LEGAL NAME, e.g. Ferbert S.L.]"
        ],
        [
          "[DE] Address",
          "[STREET, POSTCODE] Valencia, Spain"
        ],
        [
          "[DE] Represented by",
          "[DE] Igor Ferbert"
        ],
        [
          "[DE] Email",
          "[DE] ferbertigo@gmail.com"
        ],
        [
          "[DE] Phone",
          "[PHONE]"
        ],
        [
          "[DE] Commercial register",
          "[REGISTRO MERCANTIL, ENTRY]"
        ],
        [
          "[DE] VAT ID",
          "[ES NIF / VAT NUMBER]"
        ]
      ]
    },
    "privacy": {
      "title": "[DE] Privacy notice",
      "paragraphs": [
        "[DE] We only collect what we need to answer you and run this website. When you write to us through the contact form, we use your name, email, company and message to reply. We keep enquiries for [RETENTION PERIOD] and never sell or share them for advertising.",
        "[DE] This website is hosted by [HOSTING PROVIDER, REGION]. We use [ANALYTICS: e.g. none / privacy-friendly analytics without cookies]."
      ]
    },
    "ai": {
      "title": "[DE] How our agents use data",
      "items": [
        "[DE] Client data is processed only under a signed data processing agreement (AVV / DPA).",
        "[DE] Agents run on EU-hosted infrastructure and EU-region AI models: [PROVIDERS AND REGIONS].",
        "[DE] Client data is not used to train AI models.",
        "[DE] Every agent action is logged; clients can review and export the logs."
      ]
    },
    "rights": {
      "title": "[DE] Your rights",
      "before": "[DE] You can ask what data we hold about you, have it corrected or deleted, and object to its use. Write to ",
      "after": "[DE] . You can also complain to your data protection authority."
    }
  },
  "notFound": {
    "title": "[DE] This page does not exist.",
    "lead": "[DE] The link may be old, or the address has a typo.",
    "home": "[DE] Back to the home page"
  }
};
