# Form Builder Case

React + Node.js (Express) + MongoDB ile geliştirilen form oluşturma ve cevap toplama uygulaması. Kullanıcılar sürükle-bırak ile form oluşturur, yayınlar ve gelen cevapları görüntüler. Admin rolü; kullanıcıları, formları ve gönderimleri görebilir.

## İçerik
- Özellikler
- Ekran Görünümü (Özet)
- Kurulum
- Ortam Değişkenleri
- Çalıştırma
- Admin Hesabı (Seeder)
- API Hızlı Bakış
- SSS / Notlar

## Özellikler
- Sürükle-bırak form oluşturma (react-form-builder2)
- Formları listeleme, düzenleme, silme
- Form doldurma ve cevap kaydetme
- Cevapları kullanıcıya sade görünümlü modalda gösterme
- Modern UI (açık tema, kart/tablolar, erişilebilir odak durumları)
- Bildirim modalı (başarı/hata) ve onay modalı
- Rol tabanlı yetki: user, admin
- Admin Paneli: istatistikler, kullanıcılar, kullanıcının formları ve gönderileri

## Ekran Görünümü (Özet)
- Kullanıcı: Formlarım, Form Oluştur/Düzenle, Form Detay (doldur)
- Admin: Dashboard (dinamik sayılar), Kullanıcılar → Kullanıcı Formları → Gönderiler

## Kurulum
Önkoşullar: Node.js 18+, npm; MongoDB erişimi.

```bash
# Projeyi klonlayın
git clone <repo-url>
cd form-builder-case
```

### Backend kurulumu
```bash
cd backend
npm install
# .env dosyası oluşturun ve aşağıdaki anahtarları doldurun
```

## Ortam Değişkenleri (backend/.env)
```env
MONGO_URI=mongodb://localhost:27017/form-builder
JWT_SECRET=super-secret-key
PORT=4000
```

### Çalıştırma
Backend’i başlatın:
```bash
cd backend
npm run dev   # nodemon ile
# veya
npm start
```

Frontend’i başlatın:
```bash
cd ../frontend
npm install
npm start
```
Uygulama varsayılan olarak `http://localhost:3000` (frontend) ve `http://localhost:4000` (backend) üzerinde çalışır.

## Admin Hesabı (Seeder)
Öntanımlı admin kullanıcıyı oluşturmak için:
```bash
cd backend
npm run seed:admin
```
Bilgiler:
- Email: `admin@gmail.com`
- Şifre: `123456`

Giriş sonrası navbar’da “Admin” butonu görünür.

## API Hızlı Bakış
- Auth
  - `POST /api/auth/register` — kayıt
  - `POST /api/auth/login` — giriş (JWT döner)
- Forms (kullanıcı)
  - `GET /api/forms` — kullanıcının formları
  - `POST /api/forms` — form oluştur
  - `GET /api/forms/:id` — form getir
  - `PUT /api/forms/:id` — form güncelle
  - `DELETE /api/forms/:id` — form sil
  - `POST /api/forms/:id/responses` — cevap gönder
  - `GET /api/forms/:id/responses` — cevapları getir (sahip)
- Admin
  - `GET /api/admin/stats` — { usersCount, formsCount, responsesCount }
  - `GET /api/admin/users` — tüm kullanıcılar
  - `GET /api/admin/users/:userId/forms` — kullanıcının formları
  - `GET /api/admin/forms/:formId/responses` — form cevapları

Tüm korunan rotalar `Authorization: Bearer <token>` başlığı ister.
