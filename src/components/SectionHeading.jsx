import { Reveal } from './motion'

export default function SectionHeading({ eyebrow, heading, sub, align = 'center' }) {
  const alignClass = align === 'start' ? 'text-start items-start' : 'text-center items-center'
  return (
    <Reveal className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-block rounded-full border-2 border-ink bg-honey px-4 py-1 font-display text-sm font-bold uppercase tracking-wide shadow-token-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{heading}</h2>
      {sub && <p className="max-w-xl text-lg text-ink-soft">{sub}</p>}
    </Reveal>
  )
}
