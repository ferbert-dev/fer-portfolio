'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { ArrowTile } from '@/components/ui/Button';
import { Pill, ToggleChip } from '@/components/ui/Controls';

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
  const tile = <ArrowTile />;

  return (
    <>
      <div className="mono" role="group" aria-label={blog.filterLabel} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: 24 }}>
        {blog.filters.map((f, i) => (
          <ToggleChip key={f} variant="filter" mono pressed={i === tag} onClick={() => setTag(i)}>{f}</ToggleChip>
        ))}
      </div>
      {showFeat ? (
        <article className="panel lift feat">
          <div className="cover" style={{ minHeight: 380 }}><Pill style={{ background: 'var(--p1)' }}>{blog.cover}</Pill></div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32, padding: 'clamp(12px, 2vw, 28px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Pill tone="tint" mono={false}>{blog.featured}</Pill>
                <Pill mono={false}>{featured.topic}</Pill>
                <Pill mono={false}>{blog.date}</Pill>
                {featured.minutes ? <Pill mono={false}>{featured.minutes}</Pill> : null}
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
            <div className="cover" style={{ aspectRatio: 1.5 }}><Pill style={{ background: 'var(--p1)' }}>{blog.cover}</Pill></div>
            <span className="mono" style={{ display: 'flex', gap: 6, padding: '0 8px' }}><Pill mono={false}>{p.topic}</Pill><Pill mono={false}>{blog.date}</Pill></span>
            <h2 style={{ margin: 0, padding: '0 8px', fontSize: 22, lineHeight: 1.2, fontWeight: 400, letterSpacing: '-0.02em' }}>{p.title}</h2>
            <span className="lnk mono" style={{ padding: '0 8px', marginTop: 'auto' }}>{blog.read}{tile}</span>
          </article>
        ))}
      </div>
      {!showFeat && posts.length === 0 ? <p className="sub" style={{ margin: '24px 0 0' }}>{blog.empty}</p> : null}
    </>
  );
}
