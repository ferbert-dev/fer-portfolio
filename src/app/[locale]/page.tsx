import { notFound } from 'next/navigation';
import { getDictionary } from '@/content';
import { isLocale, localeHref } from '@/lib/i18n';
import { Hero } from '@/components/home/Hero';
import { ToolMarquee } from '@/components/home/ToolMarquee';
import { Workflow } from '@/components/home/Workflow';
import { WorkflowProvider } from '@/components/home/WorkflowState';
import { Analysis } from '@/components/home/Analysis';
import { AgentDemo } from '@/components/home/AgentDemo';
import { DocumentsDemo } from '@/components/home/DocumentsDemo';
import { Services } from '@/components/home/Services';
import { Trust } from '@/components/home/Trust';
import { HowWeWork } from '@/components/home/HowWeWork';
import { Pricing } from '@/components/home/Pricing';
import { Company } from '@/components/home/Company';
import { Faq } from '@/components/home/Faq';
import { Closing } from '@/components/home/Closing';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const h = t.home;
  const contact = localeHref(locale, '/contact');

  return (
    <WorkflowProvider>
      <Hero hero={h.hero} workflow={h.workflow} common={t.common} contactHref={contact} />
      <ToolMarquee tools={h.tools} common={t.common} />
      <Workflow workflow={h.workflow} common={t.common} />
      <Analysis analysis={h.analysis} cta={t.common.cta} contactHref={contact} />
      <AgentDemo agent={h.agent} demo={t.common.demo} />
      <DocumentsDemo knowledge={h.knowledge} />
      <Services services={h.services} />
      <Trust trust={h.trust} legalHref={localeHref(locale, '/legal#privacy')} />
      <HowWeWork how={h.how} />
      <Pricing pricing={h.pricing} cta={t.common.cta} contactHref={contact} />
      <Company company={h.company} />
      <Faq faq={h.faq} write={t.common.write} />
      <Closing closing={h.closing} cta={t.common.cta} write={t.common.write} contactHref={contact} />
    </WorkflowProvider>
  );
}
