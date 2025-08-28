# bubilet - Otobüs Bilet Satış Uygulaması

[cite_start]`bubilet`, Projesoft için bir teknik değerlendirme projesi olarak geliştirilmiş modern bir otobüs bilet satış uygulamasıdır. [cite: 1, 7] [cite_start]Kullanıcıların sefer aramasına, koltuk seçimi yapmasına ve ödeme süreçlerini simüle etmesine olanak tanır. [cite: 7, 25]

## Proje Özeti

[cite_start]Bu uygulama,[cite: 4] [cite_start] kullanıcı kaydından başlayarak bilet satın alma sürecinin sonuna kadar olan temel akışları içermektedir. [cite: 78] [cite_start]Proje, `Next.js` ve `TypeScript` kullanılarak geliştirilmiş olup, durum yönetimi için `Zustand` ve backend simülasyonu için `MockAPI` kullanılmıştır. [cite: 9, 10, 11, 27, 28, 29]

## ✨ Özellikler

- **Kullanıcı Kimlik Doğrulama:**

  - [cite_start]E-posta, parola, ad, soyad, cinsiyet ve doğum tarihi gibi bilgilerle güvenli kullanıcı kaydı. [cite: 20, 37]
  - [cite_start]Kayıtlı kullanıcılar için e-posta ve parola ile sisteme giriş. [cite: 16, 33]
  - `localStorage` üzerinde oturum (session) yönetimi ile kalıcı kullanıcı girişi.

- **Sefer Arama ve Listeleme:**

  - [cite_start]Kalkış yeri, varış yeri ve tarihe göre dinamik sefer arama. [cite: 41, 51]
  - [cite_start]Arama sonuçlarını listeleyen ve sefer detaylarını (boş koltuk, fiyat vb.) gösteren sonuç sayfası. [cite: 48, 60]
  - [cite_start]Aranan kriterlere uygun sefer bulunamadığında kullanıcıyı bilgilendirme. [cite: 62, 92]

- **Koltuk Seçimi:**

  - [cite_start]Sefere özel interaktif koltuk haritası. [cite: 67, 69]
  - [cite_start]Dolu koltukların cinsiyete göre renklendirilmesi (`mavi`/`pembe`). [cite: 71, 97]
  - [cite_start]Karşı cinsin yanına koltuk seçmeyi engelleyen iş kuralı. [cite: 98, 104]
  - [cite_start]En fazla beş koltuk seçme limiti. [cite: 73]

- **Ödeme Süreci:**
  - Kayıtlı kartları listeleme ve hızlı ödeme imkanı.
  - Belirli bir formatta (`1111 1111 2222 2222`) yeni kart girişi için giriş maskeleme (input masking).
  - Ödeme sırasında yeni girilen kartı gelecekteki kullanımlar için kaydetme seçeneği.
  - [cite_start]1-2 saniyelik yükleme animasyonu (spinner) ile simüle edilmiş ödeme onayı. [cite: 111, 101]
  - [cite_start]Başarılı ödeme sonrası bilgilendirme ve ana sayfaya dönüş. [cite: 112, 113, 103]

## 🛠️ Kullanılan Teknolojiler

- [cite_start]**Framework:** Next.js (React.js) [cite: 9, 27]
- [cite_start]**Dil:** TypeScript [cite: 10, 28]
- **Styling:** Tailwind CSS
- [cite_start]**State Management:** Zustand [cite: 10, 28]
- [cite_start]**Backend:** MockAPI (Sahte API Servisi) [cite: 11, 29]
- **Form Geliştirmeleri:** React-IMask (Giriş Maskeleme için)

## 🚀 Kurulum ve Çalıştırma

[cite_start]Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin. [cite: 118]

### Gereksinimler

- Node.js (v18.x veya üstü)
- npm veya yarn

### 1. Projeyi Klonlama

```bash
git clone [projenin_github_linki]
cd bubilet
```
