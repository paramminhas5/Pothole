'use client';

import { useState, useEffect } from 'react';
import { PageShell, PageHeader } from '@/components/ui/PageShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Badge } from '@/components/ui/Badge';
import type { CampaignTemplateDTO } from '@/types/dto';
import { useRouter } from 'next/navigation';

type Step = 'template' | 'details' | 'target' | 'demand' | 'review';

export function CreateCampaignClient() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('template');
  const [templates, setTemplates] = useState<CampaignTemplateDTO[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplateDTO | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [form, setForm] = useState({
    title: '',
    issueStatement: '',
    city: '',
    area: '',
    category: '',
    targetInstitution: '',
    targetJurisdiction: '',
    primaryDemand: '',
    deadline: '',
  });

  useEffect(() => {
    fetch('/api/campaign/templates')
      .then(r => r.json())
      .then(d => setTemplates(d.templates || []));
  }, []);

  function selectTemplate(t: CampaignTemplateDTO) {
    setSelectedTemplate(t);
    setForm(prev => ({
      ...prev,
      category: t.category,
      targetInstitution: t.typicalTargetType,
    }));
    setStep('details');
  }

  function startFromScratch() {
    setSelectedTemplate(null);
    setStep('details');
  }

  async function handleSubmit() {
    setSubmitting(true);
    setErrors({});

    const res = await fetch('/api/campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        templateSlug: selectedTemplate?.slug,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.errors) setErrors(data.errors);
      else setErrors({ general: data.error || 'Failed to create campaign' });
      setSubmitting(false);
      return;
    }

    router.push(`/campaign/${data.campaign.slug}`);
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <PageShell size="md">
      <PageHeader
        title="Start a Campaign"
        titleHi="अभियान शुरू करें"
        subtitle="Every campaign needs: a named institutional target, a clear demand, and a deadline."
        subtitleHi="हर अभियान में चाहिए: एक नामित संस्थागत लक्ष्य, एक स्पष्ट माँग, और एक समय सीमा।"
      />

      {/* Step indicator */}
      <div className="flex gap-1 mb-8">
        {(['template', 'details', 'target', 'demand', 'review'] as Step[]).map((s, i) => (
          <div key={s} className={[
            'flex-1 h-2 rounded-full',
            i <= ['template', 'details', 'target', 'demand', 'review'].indexOf(step)
              ? 'bg-[var(--saffron)]'
              : 'bg-[var(--paper-dark)]',
          ].join(' ')} />
        ))}
      </div>

      {/* Step: Template Selection */}
      {step === 'template' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Choose a template or start from scratch</h2>
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {templates.map(t => (
              <Card key={t.slug} hoverable padding="sm" onClick={() => selectTemplate(t)}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{t.title}</h3>
                    <p className="text-xs text-[var(--ink-muted)] mt-1">{t.description}</p>
                  </div>
                  <Badge variant="ghost" size="sm">{t.category}</Badge>
                </div>
                <div className="mt-2 flex gap-1 flex-wrap">
                  {t.typicalInstruments.map(inst => (
                    <Badge key={inst} variant="saffron" size="sm">{inst}</Badge>
                  ))}
                </div>
                <p className="text-[10px] font-[var(--font-mono)] text-[var(--ink-muted)] mt-2">
                  ~{t.typicalTimelineDays} days typical
                </p>
              </Card>
            ))}
          </div>
          <Button variant="ghost" onClick={startFromScratch} fullWidth>
            Start from scratch (advanced)
          </Button>
        </div>
      )}

      {/* Step: Details */}
      {step === 'details' && (
        <div className="space-y-5">
          <FormField
            label="Campaign Title"
            labelHi="अभियान शीर्षक"
            required
            placeholder="e.g., Fix MG Road Potholes in Pune"
            value={form.title}
            onChange={update('title')}
            error={errors.title}
          />
          <FormField
            as="textarea"
            label="What's the issue?"
            labelHi="समस्या क्या है?"
            required
            placeholder="Describe the problem clearly. What is happening, who is affected, how long has it been going on?"
            value={form.issueStatement}
            onChange={update('issueStatement')}
            error={errors.issueStatement}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              as="select"
              label="City"
              labelHi="शहर"
              required
              value={form.city}
              onChange={update('city')}
              error={errors.city}
            >
              <option value="">Select city</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </FormField>
            <FormField
              as="select"
              label="Category"
              labelHi="श्रेणी"
              required
              value={form.category}
              onChange={update('category')}
              error={errors.category}
            >
              <option value="">Select category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="accountability">Accountability</option>
              <option value="welfare">Welfare</option>
              <option value="health">Health</option>
              <option value="governance">Governance</option>
              <option value="other">Other</option>
            </FormField>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setStep('template')}>Back</Button>
            <Button variant="primary" onClick={() => setStep('target')} fullWidth>Next: Target</Button>
          </div>
        </div>
      )}

      {/* Step: Target */}
      {step === 'target' && (
        <div className="space-y-5">
          <Card variant="flat" padding="sm">
            <p className="text-xs font-bold text-[var(--purple)]">
              Target must be an institution or office — never a private individual.
            </p>
          </Card>
          <FormField
            label="Target Institution"
            labelHi="लक्षित संस्था"
            required
            placeholder="e.g., Municipal Corporation Pune, PWD Maharashtra"
            value={form.targetInstitution}
            onChange={update('targetInstitution')}
            error={errors.targetInstitution}
            help="The government body, office, or public institution responsible."
          />
          <FormField
            label="Jurisdiction (optional)"
            labelHi="क्षेत्राधिकार"
            placeholder="e.g., Ward 24, Zone 3, District Collector Office"
            value={form.targetJurisdiction}
            onChange={update('targetJurisdiction')}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setStep('details')}>Back</Button>
            <Button variant="primary" onClick={() => setStep('demand')} fullWidth>Next: Demand</Button>
          </div>
        </div>
      )}

      {/* Step: Demand & Deadline */}
      {step === 'demand' && (
        <div className="space-y-5">
          <FormField
            as="textarea"
            label="Your Demand"
            labelHi="आपकी माँग"
            required
            placeholder="State exactly what you want the institution to do. Be specific and actionable."
            value={form.primaryDemand}
            onChange={update('primaryDemand')}
            error={errors.primaryDemand}
            help="A good demand is specific: 'Repair all potholes on MG Road within 30 days' not 'Fix roads'"
          />
          <FormField
            label="Deadline"
            labelHi="समय सीमा"
            required
            type="date"
            value={form.deadline}
            onChange={update('deadline')}
            error={errors.deadline}
            help="When should the institution have responded or acted? Be realistic but firm."
          />
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setStep('target')}>Back</Button>
            <Button variant="primary" onClick={() => setStep('review')} fullWidth>Review Campaign</Button>
          </div>
        </div>
      )}

      {/* Step: Review */}
      {step === 'review' && (
        <div className="space-y-5">
          <Card variant="accent">
            <h3 className="font-bold mb-3">Campaign Summary</h3>
            <dl className="grid gap-2 text-sm">
              <div><dt className="font-bold text-[var(--ink-muted)] text-xs uppercase">Title</dt><dd>{form.title || '—'}</dd></div>
              <div><dt className="font-bold text-[var(--ink-muted)] text-xs uppercase">Issue</dt><dd className="line-clamp-3">{form.issueStatement || '—'}</dd></div>
              <div><dt className="font-bold text-[var(--ink-muted)] text-xs uppercase">Target</dt><dd>{form.targetInstitution || '—'} ({form.city})</dd></div>
              <div><dt className="font-bold text-[var(--ink-muted)] text-xs uppercase">Demand</dt><dd>{form.primaryDemand || '—'}</dd></div>
              <div><dt className="font-bold text-[var(--ink-muted)] text-xs uppercase">Deadline</dt><dd className="font-[var(--font-mono)]">{form.deadline || '—'}</dd></div>
            </dl>
          </Card>

          {/* Consent */}
          <Card variant="flat" padding="sm">
            <p className="text-xs text-[var(--ink-muted)]">
              By publishing, your campaign becomes a public page. The demand, target institution, and timeline will be visible to everyone. Your identity will be shown as campaign lead.
            </p>
          </Card>

          {errors.general && (
            <p className="text-sm font-bold text-[var(--red)] p-3 border-2 border-[var(--red)] rounded-[var(--radius-md)]">
              {errors.general}
            </p>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setStep('demand')}>Back</Button>
            <Button variant="primary" onClick={handleSubmit} loading={submitting} fullWidth>
              Create Campaign
            </Button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
