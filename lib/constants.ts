// Update this number to your business WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = '923043031572'

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi OloBuy! I'd like to start a Safe Deal (escrow) for an item."
)

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
