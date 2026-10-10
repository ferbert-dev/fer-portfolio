#!/usr/bin/env python3
"""Builds the D-style subpages (Contact, Blog, Legal, Mobile) from one shared shell.

Tokens and base classes are copied verbatim from D-Home.dc.html so all pages share one look.
usage: python3 build_pages.py <design/canvas dir>
"""
import re
import sys
from pathlib import Path

canvas = Path(sys.argv[1])
home = (canvas / 'D-Home.dc.html').read_text()

# Token block (dark default, light, auto) straight from the home page.
tokens = '\n'.join(l for l in home.splitlines() if l.startswith('.d{--bg') or l.startswith('.d.t-light') or l.startswith('@media (prefers-color-scheme: light){.d.t-auto'))
assert tokens.count('--bg') == 3, 'token block not found'

BASE = r"""
body{margin:0}
.d{background:var(--bg);color:var(--tx);min-height:100vh;font-family:'Geist',system-ui,sans-serif;font-size:16px;line-height:1.45;letter-spacing:-.01em;overflow-x:clip}
.d a{color:inherit}
.d ::selection{background:var(--acc);color:var(--on-acc)}
.d :focus-visible{outline:2px solid var(--acc-tx);outline-offset:3px;border-radius:4px}
.d [id]{scroll-margin-top:72px}
.wrap{max-width:1392px;margin:0 auto;padding-left:24px;padding-right:24px}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;line-height:1.3;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--sub)}
.lab{display:flex;align-items:center;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--ln)}
.lab::before{content:"";width:6px;height:6px;background:var(--acc-tx)}
.xl{margin:0;font-size:clamp(42px,6.25vw,90px);line-height:.93;letter-spacing:-.04em;font-weight:400;text-wrap:balance}
.lg{margin:0;font-size:clamp(38px,5vw,72px);line-height:.97;letter-spacing:-.04em;font-weight:400;text-wrap:balance}
.md{margin:0;font-size:clamp(24px,2.4vw,34px);line-height:1.18;letter-spacing:-.02em;font-weight:400}
.sub{color:var(--sub)}
.panel{background:var(--p1);border:1px solid var(--ln);border-radius:20px}
.pill{display:inline-flex;align-items:center;min-height:24px;padding:0 10px;border:1px solid var(--ln2);border-radius:999px}
.mk{display:inline-block;padding:0 .09em;color:var(--on-acc);background:var(--acc)}
.btn{display:inline-flex;align-items:stretch;gap:4px;text-decoration:none;border:0;padding:0;background:none;font:inherit;cursor:pointer}
.btn-l{display:inline-flex;align-items:center;min-height:46px;padding:0 18px;border-radius:10px;background:linear-gradient(90deg,var(--inv) 0,var(--inv) 50%,var(--acc) 100%);background-size:200% 100%;background-position:0 0;color:var(--on-inv);font-size:14px;font-weight:500;letter-spacing:-.01em;white-space:nowrap;transition:background-position .55s cubic-bezier(.16,1,.3,1),color .3s}
.btn-t{flex:0 0 46px;border-radius:10px;background:var(--acc);color:var(--on-acc);display:grid;place-items:center;transition:transform .45s cubic-bezier(.16,1,.3,1)}
.btn:hover .btn-l{background-position:100% 0;color:var(--on-acc)}
.btn:hover .btn-t{transform:translateX(3px)}
.lnk{display:inline-flex;align-items:center;gap:10px;min-height:44px;text-decoration:none;color:var(--tx)}
.lnk-t{flex:0 0 26px;height:26px;border-radius:50%;background:var(--acc-tint);color:var(--acc-tx);display:grid;place-items:center;transition:background .3s,color .3s,transform .45s cubic-bezier(.16,1,.3,1)}
.lnk:hover .lnk-t{background:var(--acc);color:var(--on-acc);transform:translateX(3px)}
.navl{text-decoration:none;color:var(--tx);padding:14px 0;transition:color .2s}
.navl:hover{color:var(--acc-tx)}
.navl[aria-current="page"]{color:var(--acc-tx)}
.th{transition:background .25s,color .25s}
.row{transition:background .3s}
.row:hover{background:var(--p1)}
.menu-btn{display:none}
@media (max-width:900px){
.nav-links,.th-seg,.hide-s{display:none!important}
.th-one,.menu-btn{display:inline-flex!important}
}
@media (prefers-reduced-motion: reduce){.btn-l,.btn-t,.lnk-t{transition:none!important}}
"""

LOGO = '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M1 1h4v4H1zM1 9h4v4H1zM9 5h4v4H9z"></path></svg>'
ARROW = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 2.5L8 6l-3.5 3.5"></path></svg>'
HALF = '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="1.4"></circle><path d="M6 1a5 5 0 010 10z" fill="currentColor"></path></svg>'

NAV = [('Analysis', 'D-Home.dc.html#analysis'), ('Demos', 'D-Home.dc.html#demos'), ('Services', 'D-Home.dc.html#services'),
       ('Pricing', 'D-Home.dc.html#start'), ('Blog', 'D-Blog.dc.html')]


def header(current):
    links = ''.join(
        f'<a class="navl" href="{h}"{" aria-current=\"page\"" if n == current else ""}>{n}</a>' for n, h in NAV)
    menu_links = ''.join(
        f'<a class="navl" href="{h}" style="display: flex; justify-content: space-between; align-items: center; min-height: 52px; padding: 0; border-bottom: 1px solid var(--ln); font-family: \'Geist\', sans-serif; font-size: 26px; letter-spacing: -0.03em; text-transform: none;"{" aria-current=\"page\"" if n == current else ""}>{n}<span class="lnk-t">{ARROW}</span></a>'
        for n, h in NAV + [('Contact', 'D-Contact.dc.html')])
    contact_cur = ' aria-current="page"' if current == 'Contact' else ''
    return f'''<header style="position: sticky; top: 0; z-index: 20; background: var(--hdr); backdrop-filter: blur(14px); border-bottom: 1px solid var(--p3);">
<nav class="wrap mono" aria-label="Main" style="display: flex; align-items: center; justify-content: space-between; gap: 20px; min-height: 56px; color: var(--tx);">
<a href="D-Home.dc.html" aria-label="Ferbert, home" style="display: flex; align-items: center; gap: 14px; text-decoration: none;">
<span style="display: flex; align-items: center; gap: 8px; font-family: 'Geist', sans-serif; font-size: 19px; font-weight: 500; letter-spacing: -0.03em; text-transform: none;">{LOGO}ferbert</span>
<span class="nav-links" aria-hidden="true" style="width: 1px; height: 18px; background: var(--ln2);"></span>
<span class="nav-links" style="color: var(--sub);">AI automation company</span>
</a>
<div style="display: flex; align-items: center; gap: clamp(8px, 3vw, 44px);">
<div class="nav-links" style="display: flex; align-items: center; gap: clamp(16px, 3vw, 44px);">
{links}
</div>
<div class="th-seg" role="group" aria-label="Colour theme" style="display: flex; align-items: center; gap: 2px; padding: 2px; border: 1px solid var(--ln2); border-radius: 999px;">
<sc-for list="{{{{themes}}}}" as="t" hint-placeholder-count="3"><button type="button" class="mono th" onClick="{{{{t.pick}}}}" aria-pressed="{{{{t.pressed}}}}" style="min-height: 28px; padding: 0 11px; border: 0; border-radius: 999px; cursor: pointer; background: {{{{t.bg}}}}; color: {{{{t.fg}}}};">{{{{t.label}}}}</button></sc-for>
</div>
<button type="button" class="mono th th-one" onClick="{{{{cycleTheme}}}}" aria-label="{{{{themeAria}}}}" style="display: none; align-items: center; gap: 6px; min-height: 36px; padding: 0 12px; border: 1px solid var(--ln2); border-radius: 999px; background: transparent; color: var(--tx); cursor: pointer;">{HALF}{{{{themeLabel}}}}</button>
<a href="D-Contact.dc.html" class="navl nav-links" style="display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border: 1px solid var(--tx); border-radius: 999px; white-space: nowrap;"{contact_cur}>Contact us</a>
<button type="button" class="mono menu-btn" onClick="{{{{toggleMenu}}}}" aria-expanded="{{{{menuStr}}}}" aria-controls="d-menu" style="align-items: center; gap: 8px; min-height: 36px; padding: 0 12px; border: 1px solid var(--tx); border-radius: 999px; background: transparent; color: var(--tx); cursor: pointer;">{{{{menuLabel}}}}</button>
</div>
</nav>
<sc-if value="{{{{menu}}}}" hint-placeholder-val="{{{{false}}}}">
<div id="d-menu" class="wrap" style="padding-top: 8px; padding-bottom: 24px; border-top: 1px solid var(--ln); background: var(--bg);">
<nav aria-label="Mobile" style="display: flex; flex-direction: column;">
{menu_links}
</nav>
</div>
</sc-if>
</header>'''


def footer():
    pills = ''.join(f'<a class="pill navl" href="{h}" style="padding: 0 12px; min-height: 32px;">{n}</a>' for n, h in
                    [('Analysis', 'D-Home.dc.html#analysis'), ('Demos', 'D-Home.dc.html#demos'), ('Services', 'D-Home.dc.html#services'),
                     ('Blog', 'D-Blog.dc.html'), ('Contact', 'D-Contact.dc.html')])
    return f'''<footer style="padding: 12px;">
<div class="panel" style="border-radius: 28px; padding: clamp(24px, 3vw, 44px); display: flex; flex-wrap: wrap; gap: 40px 24px; justify-content: space-between; align-items: flex-end;">
<div style="display: flex; flex-direction: column; gap: 22px; min-width: 0;">
<a href="mailto:ferbertigo@gmail.com" style="font-size: clamp(24px, 3vw, 44px); letter-spacing: -0.03em; text-decoration: none; overflow-wrap: anywhere;">ferbertigo@gmail.com</a>
<div class="mono" style="display: flex; flex-wrap: wrap; gap: 6px;">
{pills}
</div>
</div>
<div class="mono" style="display: flex; flex-direction: column; gap: 14px; align-items: flex-start;">
<span style="display: flex; flex-wrap: wrap; gap: 8px 22px;"><a class="navl" href="https://github.com/ferbert-dev" style="padding: 0;">GitHub</a><a class="navl" href="D-Legal.dc.html" style="padding: 0;">Impressum</a><a class="navl" href="D-Legal.dc.html" style="padding: 0;">Privacy</a></span>
<span>© 2026 Ferbert, Valencia, Spain</span>
</div>
</div>
</footer>'''


THEME_JS = r"""  componentDidMount() {
    try { var saved = window.localStorage.getItem('ferbert-theme'); if (saved === 'light' || saved === 'dark') { this.setState({ theme: saved }); } } catch (e) {}
  }
  setTheme(mode) {
    this.setState({ theme: mode });
    try { window.localStorage.setItem('ferbert-theme', mode); } catch (e) {}
  }
  shell() {
    var self = this, mode = this.state.theme, order = ['auto', 'light', 'dark'], names = { auto: 'Auto', light: 'Light', dark: 'Dark' };
    return {
      themeCls: 't-' + mode, themeLabel: names[mode],
      themes: order.map(function (m) { var on = m === mode; return { label: names[m], pressed: on ? 'true' : 'false', bg: on ? 'var(--inv)' : 'transparent', fg: on ? 'var(--on-inv)' : 'var(--sub)', pick: function () { self.setTheme(m); } }; }),
      themeAria: 'Colour theme: ' + names[mode] + '. Change theme',
      cycleTheme: function () { self.setTheme(order[(order.indexOf(mode) + 1) % 3]); },
      menu: !!this.state.menu, menuStr: this.state.menu ? 'true' : 'false', menuLabel: this.state.menu ? 'Close' : 'Menu',
      toggleMenu: function () { self.setState({ menu: !self.state.menu }); }
    };
  }"""


def page(title, extra_css, body, js_state, js_vals, preview, extra_js=''):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&amp;family=Geist+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
<style>
{tokens}{BASE}{extra_css.strip()}
</style>
</helmet>
{body}
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{{"$preview":{{"width":{preview[0]},"height":{preview[1]}}}}}'>
class Component extends DCLogic {{
  constructor(props) {{ super(props); this.state = Object.assign({{ theme: 'auto', menu: false }}, {js_state}); }}
{THEME_JS}{extra_js}
  renderVals() {{
    var self = this;
    return Object.assign(this.shell(), {js_vals});
  }}
}}
</script>
</body>
</html>
'''


# ---------------------------------------------------------------- Contact
CONTACT_CSS = r"""
.fld{display:flex;flex-direction:column;gap:8px;min-width:0}
.inp{box-sizing:border-box;width:100%;min-height:48px;padding:12px 14px;border:1px solid var(--ln2);border-radius:10px;background:var(--p2);color:var(--tx);font:inherit;font-size:15px;transition:border-color .2s}
.inp:hover{border-color:var(--ln4)}
.inp:focus{outline:none;border-color:var(--acc-tx);box-shadow:0 0 0 3px var(--acc-tint)}
.inp::placeholder{color:var(--mut)}
.tp{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:999px;font:inherit;font-size:14px;cursor:pointer;transition:border-color .2s,background .2s}
.tp:hover{border-color:var(--acc-tx)!important}
.ch{display:flex;align-items:center;gap:16px;min-height:60px;padding:0 4px;border-top:1px solid var(--ln);text-decoration:none}
.ch:hover .lnk-t{background:var(--acc);color:var(--on-acc);transform:translateX(3px)}
.ct-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:24px;align-items:start}
.f2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
@media (max-width:900px){.ct-grid,.f2{grid-template-columns:minmax(0,1fr)}}
"""

CONTACT_BODY = f'''<div class="d {{{{themeCls}}}}">
{header('Contact')}
<main class="wrap" style="padding-top: clamp(56px, 7vw, 104px); padding-bottom: clamp(56px, 7vw, 104px);">
<div class="mono lab">Contact</div>
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; padding: clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 64px);">
<h1 class="xl" style="max-width: 11ch;">Tell us what eats your <span class="mk">week</span>.</h1>
<p class="sub" style="margin: 0; max-width: 420px; font-size: 17px;">Describe one process. We reply within [2 WORKING DAYS] with where AI fits, what it would take, and whether it’s worth it. In English, German or Spanish.</p>
</div>
<div class="ct-grid">
<div style="display: flex; flex-direction: column; gap: 24px; min-width: 0;">
<a href="[BOOKING URL]" class="panel" style="display: flex; flex-direction: column; gap: 28px; padding: clamp(20px, 2.4vw, 32px); text-decoration: none; background-image: radial-gradient(var(--dot) 1px, transparent 1px); background-size: 22px 22px;">
<span class="mono" style="display: flex; justify-content: space-between; align-items: center;"><span style="color: var(--tx);">Free call · 30 min</span><span>Video</span></span>
<span style="display: flex; flex-direction: column; gap: 10px;">
<span class="md">Prefer to talk? Book a free 30-minute call.</span>
<span class="sub">Pick a time that suits you. We look at one process together and tell you honestly whether it’s worth automating.</span>
</span>
<span class="btn" style="align-self: flex-start;"><span class="btn-l">Book a call</span><span class="btn-t">{ARROW}</span></span>
</a>
<div class="panel" style="padding: clamp(20px, 2.4vw, 32px);">
<div class="mono" style="padding-bottom: 14px;">Other ways to reach us</div>
<sc-for list="{{{{channels}}}}" as="c" hint-placeholder-count="6">
<a class="ch" href="{{{{c.href}}}}">
<span class="mono" style="flex: 0 0 96px; color: var(--tx);">{{{{c.name}}}}</span>
<span class="sub" style="flex: 1; min-width: 0; overflow-wrap: anywhere;">{{{{c.handle}}}}</span>
<span class="lnk-t">{ARROW}</span>
</a>
</sc-for>
</div>
</div>
<div class="panel" style="padding: clamp(20px, 2.8vw, 40px); min-width: 0;">
<sc-if value="{{{{sent}}}}" hint-placeholder-val="{{{{false}}}}">
<div role="status" style="display: flex; flex-direction: column; gap: 20px; min-height: 520px; justify-content: center; align-items: flex-start;">
<span style="width: 48px; height: 48px; border-radius: 50%; background: var(--acc); color: var(--on-acc); display: grid; place-items: center;"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4L16 6"></path></svg></span>
<h2 class="md">Thanks. Your message is with us.</h2>
<p class="sub" style="margin: 0; max-width: 460px;">We reply within [2 WORKING DAYS] from ferbertigo@gmail.com. If it’s urgent, book a call instead.</p>
<button type="button" class="lnk mono" onClick="{{{{reset}}}}" style="border: 0; background: none; padding: 0; cursor: pointer;">Send another message<span class="lnk-t">{ARROW}</span></button>
</div>
</sc-if>
<sc-if value="{{{{notSent}}}}" hint-placeholder-val="{{{{true}}}}">
<form onSubmit="{{{{submit}}}}" aria-label="Contact form" style="display: flex; flex-direction: column; gap: 28px;">
<div class="f2">
<div class="fld"><label class="mono" for="n">Name</label><input class="inp" id="n" type="text" autocomplete="name" required></div>
<div class="fld"><label class="mono" for="e">Work email</label><input class="inp" id="e" type="email" autocomplete="email" required></div>
<div class="fld"><label class="mono" for="co">Company</label><input class="inp" id="co" type="text" autocomplete="organization"></div>
<div class="fld"><label class="mono" for="sz">Team size</label><select class="inp" id="sz"><option>1–10</option><option selected>11–50</option><option>51–250</option><option>250+</option></select></div>
</div>
<fieldset style="margin: 0; padding: 0; border: 0; display: flex; flex-direction: column; gap: 12px;">
<legend class="mono" style="padding: 0 0 12px;">What should we look at?</legend>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<sc-for list="{{{{topics}}}}" as="t" hint-placeholder-count="5"><button type="button" class="tp" onClick="{{{{t.toggle}}}}" aria-pressed="{{{{t.pressed}}}}" style="border: 1px solid {{{{t.border}}}}; background: {{{{t.bg}}}}; color: var(--tx);"><span aria-hidden="true" style="width: 8px; height: 8px; border-radius: 2px; background: {{{{t.dot}}}};"></span>{{{{t.label}}}}</button></sc-for>
</div>
</fieldset>
<div class="fld"><label class="mono" for="msg">Which process takes your team too long?</label><textarea class="inp" id="msg" rows="6" placeholder="e.g. Two people spend most of Monday copying orders from email into our ERP." style="resize: vertical; line-height: 1.5;"></textarea><span class="sub" style="font-size: 13px;">Who does it, how often, in which tools. Rough numbers are fine.</span></div>
<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding-top: 20px; border-top: 1px solid var(--ln);">
<span class="sub" style="font-size: 13px;">We only use your details to reply. <a href="D-Legal.dc.html" style="color: var(--tx);">Privacy</a></span>
<button type="submit" class="btn"><span class="btn-l">Send message</span><span class="btn-t">{ARROW}</span></button>
</div>
</form>
</sc-if>
</div>
</div>
</main>
{footer()}
</div>'''

CONTACT_VALS = r"""{
      sent: !!this.state.sent, notSent: !this.state.sent,
      submit: function (e) { if (e && e.preventDefault) { e.preventDefault(); } self.setState({ sent: true }); },
      reset: function () { self.setState({ sent: false }); },
      topics: [['audit', 'Process analysis'], ['docs', 'Documents and email'], ['support', 'Customer support agents'], ['rag', 'Company knowledge'], ['soft', 'Integrations and software']].map(function (d) {
        var on = !!self.state.on[d[0]];
        return { label: d[1], pressed: on ? 'true' : 'false', border: on ? 'var(--acc-bd)' : 'var(--ln2)', bg: on ? 'var(--acc-tint)' : 'transparent', dot: on ? 'var(--acc-tx)' : 'var(--ln4)',
          toggle: function () { var n = Object.assign({}, self.state.on); n[d[0]] = !n[d[0]]; self.setState({ on: n }); } };
      }),
      channels: [
        { name: 'Email', handle: 'ferbertigo@gmail.com', href: 'mailto:ferbertigo@gmail.com' },
        { name: 'LinkedIn', handle: '[LINKEDIN PAGE]', href: '#' },
        { name: 'WhatsApp', handle: '[NUMBER]', href: '#' },
        { name: 'Telegram', handle: '[HANDLE]', href: '#' },
        { name: 'X', handle: '[HANDLE]', href: '#' },
        { name: 'GitHub', handle: 'ferbert-dev', href: 'https://github.com/ferbert-dev' }
      ]
    }"""

# ---------------------------------------------------------------- Blog
BLOG_CSS = r"""
.fl{min-height:36px;padding:0 14px;border-radius:999px;cursor:pointer;transition:background .25s,color .25s,border-color .25s}
.fl:hover{border-color:var(--acc-tx)!important}
.cover{border-radius:14px;border:1px solid var(--ln);background-color:var(--p2);background-image:repeating-radial-gradient(circle at 18% 118%,transparent 0,transparent 9px,var(--ring) 9px,var(--ring) 10px);display:grid;place-items:center}
.post{display:flex;flex-direction:column;gap:18px;padding:12px 12px 24px;text-decoration:none;transition:border-color .3s}
.post:hover{border-color:var(--ln2)}
.post:hover .lnk-t{background:var(--acc);color:var(--on-acc);transform:translateX(3px)}
.feat{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:12px;padding:12px;text-decoration:none}
.feat:hover .lnk-t{background:var(--acc);color:var(--on-acc);transform:translateX(3px)}
.posts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
@media (max-width:900px){.feat,.posts{grid-template-columns:minmax(0,1fr)}}
"""

BLOG_BODY = f'''<div class="d {{{{themeCls}}}}">
{header('Blog')}
<main class="wrap" style="padding-top: clamp(56px, 7vw, 104px); padding-bottom: clamp(56px, 7vw, 104px);">
<div class="mono lab">Blog</div>
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; padding: clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 56px);">
<h1 class="xl" style="max-width: 12ch;">What we learn building <span class="mk">agents</span>.</h1>
<p class="sub" style="margin: 0; max-width: 420px; font-size: 17px;">Notes from real projects: RAG, automation, and the engineering that keeps agents running.</p>
</div>
<div class="mono" role="group" aria-label="Filter by topic" style="display: flex; flex-wrap: wrap; gap: 6px; padding-bottom: 24px;">
<sc-for list="{{{{filters}}}}" as="f" hint-placeholder-count="4"><button type="button" class="mono fl" onClick="{{{{f.pick}}}}" aria-pressed="{{{{f.pressed}}}}" style="border: 1px solid {{{{f.border}}}}; background: {{{{f.bg}}}}; color: {{{{f.fg}}}};">{{{{f.label}}}}</button></sc-for>
</div>
<sc-if value="{{{{showFeat}}}}" hint-placeholder-val="{{{{true}}}}">
<a href="#" class="panel feat">
<div class="cover" style="min-height: 380px;"><span class="mono pill" style="background: var(--p1);">[COVER IMAGE]</span></div>
<div style="display: flex; flex-direction: column; justify-content: space-between; gap: 32px; padding: clamp(12px, 2vw, 28px);">
<div style="display: flex; flex-direction: column; gap: 18px;">
<span class="mono" style="display: flex; flex-wrap: wrap; gap: 6px;"><span class="pill" style="border-color: var(--acc-bd); background: var(--acc-tint); color: var(--acc-tx);">Featured</span><span class="pill">Automation</span><span class="pill">[DATE]</span><span class="pill">8 min</span></span>
<h2 class="md" style="font-size: clamp(26px, 2.8vw, 40px); line-height: 1.08; letter-spacing: -0.03em;">[POST TITLE: e.g. How we measure a process in hours before we automate it]</h2>
<p class="sub" style="margin: 0;">[TWO-SENTENCE SUMMARY OF THE POST]</p>
</div>
<span class="lnk mono">Read the post<span class="lnk-t">{ARROW}</span></span>
</div>
</a>
</sc-if>
<div class="posts" style="margin-top: 12px;">
<sc-for list="{{{{posts}}}}" as="p" hint-placeholder-count="3">
<a href="#" class="panel post">
<div class="cover" style="aspect-ratio: 1.5;"><span class="mono pill" style="background: var(--p1);">[COVER IMAGE]</span></div>
<span class="mono" style="display: flex; gap: 6px; padding: 0 8px;"><span class="pill">{{{{p.tag}}}}</span><span class="pill">[DATE]</span></span>
<h2 style="margin: 0; padding: 0 8px; font-size: 22px; line-height: 1.2; font-weight: 400; letter-spacing: -0.02em;">{{{{p.title}}}}</h2>
<span class="lnk mono" style="padding: 0 8px; margin-top: auto;">Read<span class="lnk-t">{ARROW}</span></span>
</a>
</sc-for>
</div>
<sc-if value="{{{{empty}}}}" hint-placeholder-val="{{{{false}}}}">
<p class="sub" style="margin: 24px 0 0;">No posts on this topic yet.</p>
</sc-if>
</main>
{footer()}
</div>'''

BLOG_VALS = r"""{
      filters: ['All', 'RAG', 'Automation', 'Engineering'].map(function (f) {
        var on = self.state.tag === f;
        return { label: f, pressed: on ? 'true' : 'false', bg: on ? 'var(--inv)' : 'transparent', fg: on ? 'var(--on-inv)' : 'var(--tx)', border: on ? 'var(--inv)' : 'var(--ln2)', pick: function () { self.setState({ tag: f }); } };
      }),
      showFeat: self.state.tag === 'All' || self.state.tag === 'Automation',
      posts: [
        { tag: 'RAG', title: '[POST TITLE: e.g. Keeping RAG answers correct as your documents change]' },
        { tag: 'Automation', title: '[POST TITLE: e.g. What a process analysis found in one week of invoices]' },
        { tag: 'Engineering', title: '[POST TITLE: e.g. Retries, idempotency and why demos break in production]' }
      ].filter(function (p) { return self.state.tag === 'All' || p.tag === self.state.tag; }),
      empty: false
    }"""

# ---------------------------------------------------------------- Legal
LEGAL_CSS = r"""
.lg-grid{display:flex;flex-wrap:wrap;gap:40px 24px;align-items:flex-start}
.toc{flex:1 1 260px;max-width:340px;display:flex;flex-direction:column}
.toc a{display:flex;justify-content:space-between;align-items:center;min-height:48px;border-top:1px solid var(--ln);text-decoration:none;color:var(--tx);transition:color .2s}
.toc a:hover{color:var(--acc-tx)}
.art{flex:999 1 560px;min-width:0;max-width:820px}
.art h2{margin:0}
.art p{margin:0;color:var(--sub);max-width:68ch}
.blk{display:flex;flex-direction:column;gap:20px;padding-top:56px}
.imp{margin:0;display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr)}
.imp dt,.imp dd{margin:0;padding:14px 0;border-top:1px solid var(--ln)}
.imp dd{padding-left:16px}
.chk{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.chk li{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-top:1px solid var(--ln)}
@media (max-width:600px){.imp{grid-template-columns:minmax(0,1fr)}.imp dd{padding-left:0;padding-top:0;border-top:0}}
"""

CHECK = '<span aria-hidden="true" style="flex: 0 0 20px; height: 20px; margin-top: 1px; border-radius: 50%; background: var(--acc-tint); color: var(--acc-tx); display: grid; place-items: center;"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.3l2 2L8 3"></path></svg></span>'

LEGAL_BODY = f'''<div class="d {{{{themeCls}}}}">
{header('')}
<main class="wrap" style="padding-top: clamp(56px, 7vw, 104px); padding-bottom: clamp(56px, 7vw, 104px);">
<div class="mono lab">Legal</div>
<div style="display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; padding: clamp(28px, 4vw, 56px) 0 clamp(36px, 4.5vw, 64px);">
<h1 class="lg">Impressum and <span class="mk">privacy</span>.</h1>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 440px;">
<span class="mono">Last updated [DATE]</span>
<p class="sub" style="margin: 0;">The German version of this page is the legally binding one for clients in Germany.</p>
<p class="mono" style="margin: 0; padding: 10px 12px; border: 1px dashed var(--warn-bd); border-radius: 10px; color: var(--warn-tx); line-height: 1.5;">Draft structure for your lawyer to complete. Not legal advice.</p>
</div>
</div>
<div class="lg-grid">
<nav class="toc mono" aria-label="On this page">
<span style="padding-bottom: 14px;">On this page</span>
<a href="#impressum">Impressum<span class="lnk-t">{ARROW}</span></a>
<a href="#privacy">Privacy notice<span class="lnk-t">{ARROW}</span></a>
<a href="#ai">How our agents use data<span class="lnk-t">{ARROW}</span></a>
<a href="#rights">Your rights<span class="lnk-t">{ARROW}</span></a>
</nav>
<article class="art">
<section class="blk" id="impressum" style="padding-top: 0;">
<span class="mono">01</span>
<h2 class="md">Impressum</h2>
<dl class="imp">
<sc-for list="{{{{imprint}}}}" as="r" hint-placeholder-count="7"><dt class="mono" style="padding-top: 17px;">{{{{r.k}}}}</dt><dd>{{{{r.v}}}}</dd></sc-for>
</dl>
</section>
<section class="blk" id="privacy">
<span class="mono">02</span>
<h2 class="md">Privacy notice</h2>
<p>We only collect what we need to answer you and run this website. When you write to us through the contact form, we use your name, email, company and message to reply. We keep enquiries for [RETENTION PERIOD] and never sell or share them for advertising.</p>
<p>This website is hosted by [HOSTING PROVIDER, REGION]. We use [ANALYTICS: e.g. none / privacy-friendly analytics without cookies].</p>
</section>
<section class="blk" id="ai">
<span class="mono">03</span>
<h2 class="md">How our agents use data</h2>
<ul class="chk">
<li>{CHECK}<span>Client data is processed only under a signed data processing agreement (AVV / DPA).</span></li>
<li>{CHECK}<span>Agents run on EU-hosted infrastructure and EU-region AI models: [PROVIDERS AND REGIONS].</span></li>
<li>{CHECK}<span>Client data is not used to train AI models.</span></li>
<li>{CHECK}<span>Every agent action is logged; clients can review and export the logs.</span></li>
</ul>
</section>
<section class="blk" id="rights">
<span class="mono">04</span>
<h2 class="md">Your rights</h2>
<p>You can ask what data we hold about you, have it corrected or deleted, and object to its use. Write to <a href="mailto:ferbertigo@gmail.com" style="color: var(--tx);">ferbertigo@gmail.com</a>. You can also complain to your data protection authority.</p>
</section>
</article>
</div>
</main>
{footer()}
</div>'''

LEGAL_VALS = r"""{
      imprint: [
        { k: 'Company', v: '[LEGAL NAME, e.g. Ferbert S.L.]' },
        { k: 'Address', v: '[STREET, POSTCODE] Valencia, Spain' },
        { k: 'Represented by', v: 'Igor Ferbert' },
        { k: 'Email', v: 'ferbertigo@gmail.com' },
        { k: 'Phone', v: '[PHONE]' },
        { k: 'Commercial register', v: '[REGISTRO MERCANTIL, ENTRY]' },
        { k: 'VAT ID', v: '[ES NIF / VAT NUMBER]' }
      ]
    }"""

# ---------------------------------------------------------------- Mobile (phone frame of the home's first screen)
MOBILE_CSS = r"""
.th-seg,.nav-links{display:none!important}
.th-one,.menu-btn{display:inline-flex!important}
.ph{width:390px;height:844px;overflow:hidden;position:relative}
"""

MOBILE_BODY = f'''<div class="d ph {{{{themeCls}}}}">
{header('')}
<main style="padding: 12px;">
<div style="position: relative; overflow: hidden; border: 1px solid var(--ln2); border-radius: 24px; background-color: var(--frame); background-image: radial-gradient(80% 60% at 78% 20%, var(--glow) 0%, transparent 62%), radial-gradient(var(--dot) 1px, transparent 1px); background-size: auto, 22px 22px; padding: 22px 18px 18px; display: flex; flex-direction: column; gap: 22px;">
<div class="mono" style="display: flex; justify-content: space-between;"><span>Process analysis first · then agents</span><span aria-hidden="true" style="display: flex; gap: 4px; align-items: center;"><span style="width: 4px; height: 4px; border-radius: 50%; background: var(--ln4);"></span><span style="width: 4px; height: 4px; border-radius: 50%; background: var(--tx);"></span></span></div>
<h1 style="margin: 0; font-size: 44px; line-height: .95; letter-spacing: -0.045em; font-weight: 400;">Find the work AI should do. Then let <span class="mk">agents</span> do it.</h1>
<p class="sub" style="margin: 0; font-size: 16px;">Ferbert analyses how your company works, shows you which processes AI can take over and what that saves, then builds the agents that run them.</p>
<div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
<a class="btn" href="D-Contact.dc.html"><span class="btn-l">Get a process analysis</span><span class="btn-t">{ARROW}</span></a>
<a class="lnk mono" href="D-Home.dc.html#demos">Watch an agent think<span class="lnk-t">{ARROW}</span></a>
</div>
<div style="border: 1px solid var(--ln2); border-radius: 14px; background: var(--card); overflow: hidden;">
<div class="mono" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; border-bottom: 1px solid var(--ln);"><span style="display: flex; align-items: center; gap: 8px; color: var(--tx);"><span style="width: 6px; height: 6px; border-radius: 50%; background: var(--acc-tx);"></span>Invoice intake</span><span>Running</span></div>
<ol class="mono" aria-label="Invoice intake steps" style="list-style: none; margin: 0; padding: 6px 14px 10px;">
<sc-for list="{{{{steps}}}}" as="s" hint-placeholder-count="4"><li style="display: flex; justify-content: space-between; align-items: center; min-height: 32px; color: var(--tx);"><span style="display: flex; align-items: center; gap: 10px;"><span style="width: 6px; height: 6px; background: var(--acc-tx);"></span>{{{{s}}}}</span><span style="color: var(--acc-tx);">Done</span></li></sc-for>
</ol>
</div>
</div>
</main>
</div>'''

MOBILE_VALS = r"""{ steps: ['New email', 'Read invoice', 'Match order', 'Book it'] }"""

pages = {
    'D-Contact.dc.html': page('Ferbert — Contact', CONTACT_CSS, CONTACT_BODY, "{ on: { audit: true }, sent: false }", CONTACT_VALS, (1440, 1400)),
    'D-Blog.dc.html': page('Ferbert — Blog', BLOG_CSS, BLOG_BODY, "{ tag: 'All' }", BLOG_VALS, (1440, 1700)),
    'D-Legal.dc.html': page('Ferbert — Impressum and privacy', LEGAL_CSS, LEGAL_BODY, "{}", LEGAL_VALS, (1440, 1900)),
    'D-Mobile.dc.html': page('Ferbert — Home on a phone', MOBILE_CSS, MOBILE_BODY, "{}", MOBILE_VALS, (390, 844)),
}
for name, src in pages.items():
    assert '{{{' not in src and '}}}' not in src.replace('}}}}', ''), name
    (canvas / name).write_text(src)
    print(name, len(src))
