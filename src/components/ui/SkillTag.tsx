'use client';

import type { SkillType } from '@/types/database';

const skillLabels: Record<SkillType, { en: string; hi: string; icon: string }> = {
  legal: { en: 'Legal', hi: 'कानूनी', icon: '⚖️' },
  design: { en: 'Design', hi: 'डिज़ाइन', icon: '🎨' },
  translation: { en: 'Translation', hi: 'अनुवाद', icon: '🌐' },
  photography: { en: 'Photography', hi: 'फोटोग्राफी', icon: '📷' },
  video: { en: 'Video', hi: 'वीडियो', icon: '🎬' },
  writing: { en: 'Writing', hi: 'लेखन', icon: '✍️' },
  research: { en: 'Research', hi: 'अनुसंधान', icon: '🔍' },
  field_volunteer: { en: 'Field', hi: 'फील्ड', icon: '🏃' },
  medical: { en: 'Medical', hi: 'चिकित्सा', icon: '🏥' },
  tech: { en: 'Tech', hi: 'तकनीक', icon: '💻' },
  transport: { en: 'Transport', hi: 'परिवहन', icon: '🚗' },
  supplies: { en: 'Supplies', hi: 'आपूर्ति', icon: '📦' },
  training: { en: 'Training', hi: 'प्रशिक्षण', icon: '🎓' },
  media: { en: 'Media', hi: 'मीडिया', icon: '📰' },
  other: { en: 'Other', hi: 'अन्य', icon: '🔧' },
};

interface SkillTagProps {
  skill: SkillType;
  locale?: 'en' | 'hi';
  showIcon?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function SkillTag({ skill, locale = 'en', showIcon = true, selected = false, onClick }: SkillTagProps) {
  const info = skillLabels[skill] || skillLabels.other;
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 px-2.5 py-1',
        'text-xs font-bold rounded-[var(--radius-sm)] border-2',
        'transition-colors duration-[var(--duration-fast)]',
        selected
          ? 'bg-[var(--saffron)] text-[#0F0F0F] border-[var(--ink)]'
          : 'bg-[var(--paper-alt)] text-[var(--ink)] border-[var(--ink-faint)] hover:border-[var(--ink)]',
        onClick ? 'cursor-pointer' : '',
      ].join(' ')}
    >
      {showIcon && <span>{info.icon}</span>}
      <span>{locale === 'hi' ? info.hi : info.en}</span>
    </Tag>
  );
}

export default SkillTag;
