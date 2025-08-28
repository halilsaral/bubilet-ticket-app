# bubilet - Otobüs Bilet Satış Uygulaması

`bubilet`, Projesoft için bir teknik değerlendirme projesi olarak geliştirilmiş modern bir otobüs bilet satış uygulamasıdır. Kullanıcıların sefer aramasına, koltuk seçimi yapmasına ve ödeme süreçlerini simüle etmesine olanak tanır.

## Proje Özeti

Bu proje, bir adayın modern front-end teknolojilerindeki yetkinliğini ölçmek amacıyla tasarlanmıştır. Uygulama, kullanıcı kaydından başlayarak bilet satın alma sürecinin sonuna kadar olan temel akışları içermektedir. Proje, `Next.js` ve `TypeScript` kullanılarak geliştirilmiş olup, durum yönetimi için `Zustand` ve backend simülasyonu için `MockAPI` kullanılmıştır.

## ✨ Özellikler

- **Kullanıcı Kimlik Doğrulama:**

  - E-posta, parola, ad, soyad, cinsiyet ve doğum tarihi gibi bilgilerle güvenli kullanıcı kaydı.
  - Kayıtlı kullanıcılar için e-posta ve parola ile sisteme giriş.
  - `localStorage` üzerinde oturum (session) yönetimi ile kalıcı kullanıcı girişi.

- **Sefer Arama ve Listeleme:**

  - Kalkış yeri, varış yeri ve tarihe göre dinamik sefer arama.
  - Arama sonuçlarını listeleyen ve sefer detaylarını (boş koltuk, fiyat vb.) gösteren sonuç sayfası.
  - Aranan kriterlere uygun sefer bulunamadığında kullanıcıyı bilgilendirme.

- **Koltuk Seçimi:**

  - Sefere özel interaktif koltuk haritası.
  - Dolu koltukların cinsiyete göre renklendirilmesi (`mavi`/`pembe`).
  - Karşı cinsin yanına koltuk seçmeyi engelleyen iş kuralı.
  - En fazla beş koltuk seçme limiti.

- **Ödeme Süreci:**
  - Kayıtlı kartları listeleme ve hızlı ödeme imkanı.
  - Belirli bir formatta (`1111 1111 2222 2222`) yeni kart girişi için giriş maskeleme (input masking).
  - Ödeme sırasında yeni girilen kartı gelecekteki kullanımlar için kaydetme seçeneği.
  - 1-2 saniyelik yükleme animasyonu (spinner) ile simüle edilmiş ödeme onayı.
  - Başarılı ödeme sonrası bilgilendirme ve ana sayfaya dönüş.

## 🛠️ Kullanılan Teknolojiler

- **Framework:** Next.js (React.js)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Backend:** MockAPI (Sahte API Servisi)
- **Form Geliştirmeleri:** React-IMask (Giriş Maskeleme için)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- Node.js (v18.x veya üstü)
- npm veya yarn

### 1. Projeyi Klonlama

```bash
git clone [https://github.com/halilsaral/bubilet-ticket-app.git](https://github.com/halilsaral/bubilet-ticket-app.git)
cd bubilet-ticket-app
```
