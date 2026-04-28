import { useState } from 'react';
import { 
  CircleHelp, 
  ChevronDown, 
  MessageSquareText, 
  Send,
  BookOpen,
  MailCheck
} from 'lucide-react';

const FAQ_DATA = [
  {
    question: "Comment exporter le rapport du personnel ?",
    answer: "Rendez-vous dans la rubrique 'Personnel' de la barre latérale. En haut à droite, vous trouverez un bouton gris 'Exporter Répertoire'. Un clic génère automatiquement un fichier CSV à jour formaté pour Excel."
  },
  {
    question: "Où puis-je modifier le nom de l'hôpital répertorié ?",
    answer: "Accédez à la section 'Paramètres' (icône d'engrenage). Sous l'onglet 'Établissement', modifiez le nom officiel et cliquez sur 'Enregistrer les modifications' en haut de la page."
  },
  {
    question: "Qu'est-ce que l'Alerte d'Afflux et quand l'utiliser ?",
    answer: "Le bouton rouge 'Alerte Afflux' en bas à gauche de la navigation permet de signaler l'arrivée imminente de plusieurs victimes critiques. Il bloque le dashboard sur un bandeau de crise prioritaire pour alerter tous les utilisateurs connectés."
  },
  {
    question: "Le mode sombre ne s'active pas correctement ?",
    answer: "Si les couleurs semblent inversées de façon inattendue, le moteur d'apparence peut nécessiter un rafraîchissement. Retournez dans les Paramètres, re-sélectionnez le thème Clair, puis relancez le thème Sombre."
  }
];

export default function HelpCenterDashboard() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTicketSubject('');
      setTicketMessage('');
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Info */}
      <div className="mb-10 flex items-center gap-4 border-b border-gray-200 pb-8">
        <div className="w-14 h-14 bg-[#EEF4FF] rounded-2xl flex items-center justify-center">
           <CircleHelp className="w-7 h-7 text-[#0B56FA]" />
        </div>
        <div>
          <h2 className="text-[34px] font-extrabold text-gray-900 leading-tight">
            Centre d'Aide & Support
          </h2>
          <p className="text-[#5D6470] text-[15px] font-medium mt-1">
            Documentation interne et assistance technique pour la plateforme Sanctuary Admin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: FAQ */}
        <div className="lg:col-span-7">
           <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-gray-400" />
              <h3 className="text-[20px] font-extrabold text-gray-900">Questions Fréquemment Posées</h3>
           </div>

           <div className="space-y-4">
              {FAQ_DATA.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'border-[#0B56FA]/30 shadow-md shadow-blue-500/10' : 'border-[#E5E9F0]/80 hover:border-gray-300'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between p-5 text-left bg-transparent"
                    >
                      <span className={`text-[15px] font-bold pr-8 transition-colors ${isOpen ? 'text-[#0B56FA]' : 'text-gray-900'}`}>{item.question}</span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0B56FA]' : 'text-gray-400'}`} />
                    </button>
                    <div 
                      className={`px-5 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                    >
                      <p className="text-[14px] text-[#5D6470] font-medium leading-relaxed border-t border-gray-100 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Right Column: Contact IT */}
        <div className="lg:col-span-5">
           <div className="bg-white rounded-[32px] p-8 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] relative overflow-hidden">
             
             {/* Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-70"></div>
             
             <div className="relative z-10">
               <h3 className="text-[20px] font-extrabold text-gray-900 flex items-center gap-2 mb-2">
                 <MessageSquareText className="w-5 h-5 text-[#0B56FA]"/> Contacter l'équipe Technique
               </h3>
               <p className="text-[13px] text-[#8C93A1] font-medium mb-8">
                 Une anomalie bloquante ou une suggestion d'amélioration ? Ouvrez un ticket, le service IT vous répondra rapidement.
               </p>

               {isSent ? (
                 <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500">
                       <MailCheck className="w-8 h-8" />
                    </div>
                    <h4 className="text-[16px] font-bold text-emerald-800 mb-2">Message Envoyé !</h4>
                    <p className="text-[13px] text-emerald-600 font-medium">Votre ticket IT a été créé avec succès.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSendTicket} className="space-y-5">
                   <div>
                     <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Sujet de la demande</label>
                     <input 
                        required
                        type="text" 
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        placeholder="Ex: Problème d'exportation CSV..."
                        className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3.5 text-[14px] font-semibold text-gray-900 outline-none focus:bg-white focus:border-[#0B56FA] focus:ring-4 focus:ring-[#0B56FA]/10 transition-all"
                      />
                   </div>
                   
                   <div>
                     <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Détail du problème</label>
                     <textarea 
                        required
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Décrivez précisément ce qui s'est passé..."
                        className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-medium text-gray-900 outline-none focus:bg-white focus:border-[#0B56FA] focus:ring-4 focus:ring-[#0B56FA]/10 transition-all resize-none h-32"
                      ></textarea>
                   </div>

                   <button 
                     type="submit"
                     disabled={isSending || !ticketSubject || !ticketMessage}
                     className="w-full flex items-center justify-center gap-2 text-white bg-[#0B56FA] hover:bg-blue-700 font-bold py-4 px-6 rounded-xl text-[14px] transition-all shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:scale-100 mt-2"
                   >
                     {isSending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <><Send className="w-4 h-4" /> Soumettre le Ticket IT</>
                     )}
                   </button>
                 </form>
               )}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
