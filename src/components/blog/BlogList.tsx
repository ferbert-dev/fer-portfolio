'use client';

import { useState } from 'react';
import type { Dictionary } from '@/content';
import { ArrowTile } from '@/components/ui/Button';
import { Pill, ToggleChip } from '@/components/ui/Controls';
import { trackEvent } from '@/lib/analytics';

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
      <div className="mono blog-filters" role="group" aria-label={blog.filterLabel}>
        {blog.filters.map((f, i) => (
          <ToggleChip key={f} variant="filter" mono pressed={i === tag} onClick={() => { setTag(i); trackEvent('blog_filter', 'blog', f); }}>{f}</ToggleChip>
        ))}
      </div>
      {showFeat ? (
        <article className="panel lift feat">
          <div className="cover"><Pill>{blog.cover}</Pill></div>
          <div className="feat-body">
            <div className="feat-copy">
              <span className="mono pills">
                <Pill tone="tint" mono={false}>{blog.featured}</Pill>
                <Pill mono={false}>{featured.topic}</Pill>
                <Pill mono={false}>{blog.date}</Pill>
                {featured.minutes ? <Pill mono={false}>{featured.minutes}</Pill> : null}
              </span>
              <h2 className="md feat-title">{featured.title}</h2>
              {featured.summary ? <p className="sub">{featured.summary}</p> : null}
            </div>
            <span className="lnk mono">{blog.readPost}{tile}</span>
          </div>
        </article>
      ) : null}
      <div className="posts">
        {posts.map((p) => (
          <article key={p.title} className="panel post">
            <div className="cover"><Pill>{blog.cover}</Pill></div>
            <span className="mono post-tags"><Pill mono={false}>{p.topic}</Pill><Pill mono={false}>{blog.date}</Pill></span>
            <h2 className="post-title">{p.title}</h2>
            <span className="lnk mono post-read">{blog.read}{tile}</span>
          </article>
        ))}
      </div>
      {!showFeat && posts.length === 0 ? <p className="sub blog-empty">{blog.empty}</p> : null}
    </>
  );
}
