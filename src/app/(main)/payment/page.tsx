"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { updateUser } from "@/src/services/apiClient";
import { SavedCard } from "@/src/lib/types";
import clsx from "clsx";
import { IMaskInput } from 'react-imask';

type CardFormData = { cardNumber: string; expiryDate: string; cvv: string; };
type CardFormProps = { isLoading: boolean; onSubmit: (data: CardFormData, saveCard: boolean) => void; };

function CardForm({ isLoading, onSubmit }: CardFormProps) {
    const [formData, setFormData] = useState<CardFormData>({ cardNumber: '', expiryDate: '', cvv: '' });
    const [saveCard, setSaveCard] = useState(true);
    const handleMaskedChange = (value: string, fieldName: keyof CardFormData) => {
        setFormData({ ...formData, [fieldName]: value });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData, saveCard);
    };
    const inputClasses = "w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500 border border-transparent";
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="cardNumber" className="block text-xs font-medium text-white/60 mb-1.5">Kart Numarası</label>
                <IMaskInput mask="0000 0000 0000 0000" value={formData.cardNumber} onAccept={(value) => handleMaskedChange(String(value), 'cardNumber')} id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" className={inputClasses} required />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <label htmlFor="expiryDate" className="block text-xs font-medium text-white/60 mb-1.5">Son Kullanma Tarihi</label>
                    <IMaskInput mask="00/00" value={formData.expiryDate} onAccept={(value) => handleMaskedChange(String(value), 'expiryDate')} id="expiryDate" name="expiryDate" placeholder="AA/YY" className={inputClasses} required />
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-xs font-medium text-white/60 mb-1.5">CVV</label>
                    <input id="cvv" name="cvv" type="password" required maxLength={3} placeholder="***" className={inputClasses} onChange={handleChange} value={formData.cvv} />
                </div>
            </div>
            <div className="flex items-center">
                <input id="saveCard" name="saveCard" type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-500 rounded bg-white/10" />
                <label htmlFor="saveCard" className="ml-2 block text-sm text-white/90">Kartımı sonraki alışverişler için kaydet</label>
            </div>
            <button type="submit" disabled={isLoading} className="w-full justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50">
                {isLoading ? "İşleniyor..." : "Ödemeyi Onayla"}
            </button>
        </form>
    );
}

const Spinner = () => (<div className="border-4 border-t-4 border-gray-600 border-t-rose-500 rounded-full w-12 h-12 animate-spin"></div>);
const formatCardNumber = (cardNumber: string) => { const cleaned = cardNumber.replace(/\s/g, ''); return `**** **** **** ${cleaned.slice(-4)}`; };

export default function PaymentPage() {
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const { user, setUser } = useAuthStore();
    const [selectedCard, setSelectedCard] = useState<SavedCard | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    const handlePayment = async (cardData: { cardNumber: string; expiryDate: string; cvv: string; }, saveCard: boolean) => {
        setStatus("loading");
        if (saveCard && user) {
            const newCard: SavedCard = { cardNumber: cardData.cardNumber.replace(/\s/g, ''), expiryDate: cardData.expiryDate };
            const existingCards = Array.isArray(user.savedCards) ? user.savedCards : [];
            const isAlreadySaved = existingCards.some(c => c.cardNumber === newCard.cardNumber);
            if (!isAlreadySaved) {
                const updatedCards = [...existingCards, newCard];
                try {
                    const updatedUser = await updateUser(user.id, { savedCards: updatedCards });
                    setUser(updatedUser);
                } catch (error) { console.error("Kart kaydedilirken hata oluştu:", error); }
            }
        }
        setTimeout(() => { setStatus("success"); }, 1500);
    };

    const isFormLoading = status === "loading";

    if (!isClient || !user) {
        return (<div className="flex justify-center items-center h-96"><p>Yükleniyor...</p></div>);
    }

    const savedCards = Array.isArray(user.savedCards) ? user.savedCards : [];

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-white/10 bg-gray-900/80 backdrop-blur-sm">
                {status === "idle" && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-white">Güvenli Ödeme</h1>
                        {savedCards.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-white/70">Kayıtlı Kartlarım</h3>
                                {savedCards.map((card, index) => (
                                    <div key={index} onClick={() => setSelectedCard(card)}
                                        className={clsx("p-3 border rounded-md cursor-pointer flex justify-between items-center transition-all bg-white/5", selectedCard?.cardNumber === card.cardNumber ? "border-rose-500 ring-2 ring-rose-900/50" : "border-white/10 hover:border-white/20")}>
                                        <div>
                                            <p className="font-mono font-semibold text-white">{formatCardNumber(card.cardNumber)}</p>
                                            <p className="text-xs text-white/60">Son Kullanma: {card.expiryDate}</p>
                                        </div>
                                        {selectedCard?.cardNumber === card.cardNumber && (
                                            <button onClick={(e) => { e.stopPropagation(); setSelectedCard(null); }} className="text-xs text-rose-500 hover:underline">Yeni Kart Gir</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {!selectedCard && (<CardForm isLoading={isFormLoading} onSubmit={handlePayment} />)}
                        {selectedCard && (
                            <form onSubmit={(e) => { e.preventDefault(); const cvv = (e.currentTarget.elements.namedItem('cvv') as HTMLInputElement).value; handlePayment({ ...selectedCard, cvv }, false); }} className="space-y-4 pt-4 border-t border-white/10">
                                <div>
                                    <label htmlFor="cvv" className="block text-xs font-medium text-white/60 mb-1.5">CVV</label>
                                    <input id="cvv" name="cvv" type="password" required maxLength={3} placeholder="***" className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-500 border border-transparent" />
                                </div>
                                <button type="submit" disabled={isFormLoading} className="w-full justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50">
                                    {isFormLoading ? "İşleniyor..." : `Ödemeyi Onayla (${formatCardNumber(selectedCard.cardNumber)})`}
                                </button>
                            </form>
                        )}
                    </>
                )}
                {status === "loading" && (<div className="flex flex-col items-center justify-center space-y-4 h-64"><Spinner /><p className="text-white/70">Ödemeniz işleniyor, lütfen bekleyin...</p></div>)}
                {status === "success" && (<div className="text-center space-y-4 h-64 flex flex-col justify-center items-center"><svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h2 className="text-2xl font-bold text-white">Ödeme Başarılı!</h2><p className="text-white/70">Biletiniz başarıyla oluşturuldu. İyi yolculuklar dileriz!</p><button onClick={() => router.push("/")} className="w-full justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-rose-600 hover:bg-rose-500">Ana Sayfaya Dön</button></div>)}
            </div>
        </div>
    );
}