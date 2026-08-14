import { useState } from 'react';

const QUESTIONS = [
  {
    q: 'Do I need to connect my bank account?',
    a: "No. FinPilot works entirely from transactions you log yourself, so there's nothing to link and nothing to share with a third party.",
  },
  {
    q: 'Is FinPilot free to use?',
    a: 'Yes — creating an account, logging transactions, and setting budgets and goals costs nothing.',
  },
  {
    q: 'Can I export my data?',
    a: "It's your ledger. You can pull your transaction history any time; nothing is locked in.",
  },
  {
    q: 'What happens to my data?',
    a: 'Your data is stored against your account only and is never sold or shared with advertisers.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-brand">Questions</p>
      <h2 className="font-display mt-3 text-center text-4xl font-semibold text-ink">Before you ask</h2>

      <div className="mt-12 divide-y-2 divide-ink border-y-2 border-ink">
        {QUESTIONS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <span
                  className={`font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink text-base transition-transform ${isOpen ? 'rotate-45 bg-accent' : ''}`}
                >
                  +
                </span>
              </button>
              {isOpen && <p className="max-w-xl pb-6 text-sm leading-relaxed text-ink-soft">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
