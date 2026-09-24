import { useEffect } from 'react'
import Icon from './Icon'

// Proxemia móvil (zona íntima): zoom táctil inmediato a la imagen real del
// catálogo para examinar textura, acabado y swatches sin salir de la ficha.
export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] bg-olive-950/90 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 touch-target rounded-full bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center"
      >
        <Icon name="close" className="w-6 h-6" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-full rounded-xl shadow-2xl touch-pinch-zoom"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
