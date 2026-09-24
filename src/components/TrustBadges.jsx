import Icon from './Icon'

const BADGES = [
  { icon: 'shield', title: 'Garantía de cambio de tono', desc: 'Si el tono no te queda, te lo cambiamos 100% gratis.' },
  { icon: 'truck', title: 'Envíos a toda Colombia', desc: 'Costo de envío exacto visible antes de pagar, sin sorpresas.' },
  { icon: 'whatsapp', title: 'Atención directa por WhatsApp', desc: 'Resolvemos dudas de tono y disponibilidad en minutos.' },
  { icon: 'check', title: 'Compra verificada', desc: 'Cada reseña con foto viene de una compradora real.' },
]

// Ley de Semejanza: las 4 tarjetas comparten tamaño, tipografía e icono para
// leerse como un mismo conjunto de "razones para confiar".
export default function TrustBadges() {
  return (
    <section className="bg-cream-200 border-b border-olive-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {BADGES.map((b) => (
          <div key={b.title} className="flex flex-col items-start gap-2 rounded-2xl bg-cream-100 border border-olive-200 p-4 sm:p-5">
            <span className="inline-flex h-10 w-10 rounded-full bg-olive-900 text-gold-500 items-center justify-center">
              <Icon name={b.icon} className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-olive-950 text-sm sm:text-base">{b.title}</h3>
            <p className="text-xs sm:text-sm text-olive-500">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
