'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { Chevron } from '@/components/ui/icons';

/**
 * Posts are placeholders until the owner supplies real ones, so cards are not
 * links yet (no dead links). The first post is the featured one.
 */
export function BlogList({ blog }: { blog: Dictionary['blog'] }) {
  const [tag, setTag] = useState(0);
  const all = tag === 0;
  const topic = blog.filters[tag];
  const [featured, ...rest] = blog.posts;
  const showFeat = all || featured.topic === topic;
  const posts = rest.filter((p) => all || p.topic === topic);
  const tile = (
    <span className="lnk-t"><Chevron /></span>
  );

  return (
    <>
      <div className="mono" role="group" aria-label={blog.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: 24 }}>
        {blog.filters.map((f, i) => {
          const on = i === tag;
          return (
            <button key={f} type="button" className="mono fl" onClick={() => setTag(i)} aria-pressed={on} style={{ border: `1px solid ${on ? 'var(--inv)' : 'var(--ln2)'}`, background: on ? 'var(--inv)' : 'transparent', color: on ? 'var(--on-inv)' : 'var(--tx)' }}>{f}</button>
          );
        })}
      </div>
      {showFeat ? (
        <article className="panel lift feat">
          <div className="cover" style={{ minHeight: 380 }}><span className="mono pill" style={{ background: 'var(--p1)' }}>{blog.cover}</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32, padding: 'clamp(12px, 2vw, 28px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <span className="pill" style={{ borderColor: 'var(--acc-bd)', background: 'var(--acc-tint)', color: 'var(--acc-tx)' }}>{blog.featured}</span>
                <span className="pill">{featured.topic}</span>
                <span className="pill">{blog.date}</span>
                {featured.minutes ? <span className="pill">{featured.minutes}</span> : null}
              </span>
              <h2 className="md" style={{ fontSize: 'clamp(26px, 2.8vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em' }}>{featured.title}</h2>
              {featured.summary ? <p className="sub" style={{ margin: 0 }}>{featured.summary}</p> : null}
            </div>
            <span className="lnk mono">{blog.readPost}{tile}</span>
          </div>
        </article>
      ) : null}
      <div className="posts" style={{ marginTop: 12 }}>
        {posts.map((p) => (
          <article key={p.title} className="panel post">
            <div className="cover" style={{ aspectRatio: 1.5 }}><span className="mono pill" style={{ background: 'var(--p1)' }}>{blog.cover}</span></div>
            <span className="mono" style={{ display: 'flex', gap: 6, padding: '0 8px' }}><span className="pill">{p.topic}</span><span className="pill">{blog.date}</span></span>
            <h2 style={{ margin: 0, padding: '0 8px', fontSize: 22, lineHeight: 1.2, fontWeight: 400, letterSpacing: '-0.02em' }}>{p.title}</h2>
            <span className="lnk mono" style={{ padding: '0 8px', marginTop: 'auto' }}>{blog.read}{tile}</span>
          </article>
        ))}
      </div>
      {!showFeat && posts.length === 0 ? <p className="sub" style={{ margin: '24px 0 0' }}>{blog.empty}</p> : null}
    </>
  );
}
