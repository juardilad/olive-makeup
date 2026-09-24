import Icon from './Icon'
import { WHATSAPP_NUMBER } from '../context/CartContext'

// Proxemia: zona de "red de seguridad" al final de la página.
// Ley de Simetría y Orden: columnas alineadas y distribuidas uniformemente.
export default function Footer() {
  return (
    <footer className="bg-olive-900 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-2xl text-cream-100 flex items-center gap-2">
            <Icon name="leaf" className="w-5 h-5 text-gold-500" />
            Olive Makeup
          </p>
          <p className="text-sm mt-3 text-olive-300">
            Maquillaje seleccionado con criterio, catálogo real y atención directa por WhatsApp.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-gold-500 hover:underline touch-target"
          >
            <Icon name="whatsapp" filled className="w-4 h-4" />
            Escríbenos por WhatsApp
          </a>
        </div>

        <div>
          <p className="font-semibold text-cream-100 mb-3">Explorar</p>
          <ul className="space-y-2 text-sm text-olive-300">
            <li><a href="#catalogo" className="hover:text-gold-500">Catálogo completo</a></li>
            <li><a href="#destacado" className="hover:text-gold-500">Producto destacado</a></li>
            <li><a href="#formula" className="hover:text-gold-500">Fórmula sin secretos</a></li>
            <li><a href="#resenas" className="hover:text-gold-500">Reseñas</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-cream-100 mb-3">Ayuda</p>
          <ul className="space-y-2 text-sm text-olive-300">
            <li><a href="#faq" className="hover:text-gold-500">Preguntas frecuentes</a></li>
            <li><a href="#faq" className="hover:text-gold-500">Política de cambio de tono</a></li>
            <li><a href="#faq" className="hover:text-gold-500">Envíos y tiempos de entrega</a></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-cream-100 mb-3">Confianza</p>
          <ul className="space-y-2 text-sm text-olive-300">
            <li className="flex items-center gap-2"><Icon name="shield" className="w-4 h-4 text-gold-500" />Garantía de cambio de tono</li>
            <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-gold-500" />Compra verificada</li>
            <li className="flex items-center gap-2"><Icon name="truck" className="w-4 h-4 text-gold-500" />Envíos a toda Colombia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-olive-500/30">
        <div className="max-w-7xl mx-auto px-4 py-5 text-xs text-olive-300 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} Olive Makeup. Todos los derechos reservados.</p>
          <p>
            * Sellos de "Dermatológicamente probado" y "Cruelty-Free" son referenciales — confirma la certificación
            real con cada marca antes de publicar el sitio.
          </p>
        </div>
      </div>
    </footer>
  )
}
