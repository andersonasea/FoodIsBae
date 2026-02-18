import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('Message envoyé ! Nous vous répondrons rapidement.')
    reset()
  }

  return (
    <div className="min-h-screen">
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Une question, une suggestion ? N'hésitez pas à nous écrire.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-gray-500">123 Rue de la Gastronomie<br />75001 Paris, France</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Téléphone</h3>
                  <p className="text-gray-500">01 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-500">contact@foodisbae.fr</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horaires</h3>
                  <p className="text-gray-500">
                    Lun - Ven : 11h00 - 22h00<br />
                    Sam - Dim : 10h00 - 23h00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-sm p-8 space-y-5"
          >
            <h2 className="text-2xl font-bold mb-2">Envoyez-nous un message</h2>

            <div>
              <label className="text-sm font-medium text-dark mb-2 block">Nom</label>
              <input
                type="text"
                {...register('name', { required: 'Le nom est requis' })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="Votre nom"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-dark mb-2 block">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: "L'email est requis",
                  pattern: { value: /^\S+@\S+$/, message: 'Email invalide' },
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-dark mb-2 block">Message</label>
              <textarea
                {...register('message', { required: 'Le message est requis' })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                placeholder="Votre message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
