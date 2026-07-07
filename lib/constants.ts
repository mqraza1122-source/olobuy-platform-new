// Update this number to your business WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = '923000000000'

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi OloBuy! I'd like to start a Safe Deal (escrow) for an item.",
)

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
