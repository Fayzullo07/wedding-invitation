# To'y taklifnomasi sahifasi — dizayn

## Maqsad

Instagram'dagi @momento_bzf demo videosidan ilhomlanib, bitta juftlik uchun statik to'y taklifnomasi veb-sahifasi yaratish. Hozircha demo/placeholder kontent bilan (ism, sana, manzil, telefon raqami keyinroq real ma'lumot bilan almashtiriladi).

## Doirasi

- Til: faqat o'zbek tili
- Platforma: statik HTML/CSS/JS (build tool yo'q), server kerak emas
- Deploy: GitHub Pages yoki Netlify kabi statik hosting

## Arxitektura

Bitta sahifali loyiha:

```
index.html
style.css
script.js
images/          # galereya uchun placeholder rasmlar
```

Build tool, framework yoki backend yo'q. Sahifa to'g'ridan-to'g'ri brauzerda ochiladi va statik hostingga deploy qilinadi.

## Vizual uslub

**Romantik + Minimal** kombinatsiyasi:
- Fon: yumshoq pushti/krem gradient (`#fdf8f5` → `#f8ece4`)
- Sarlavha shrifti: Georgia serif, italik (masalan juftlik ismlari uchun)
- Matn shrifti: Helvetica Neue / Arial, ingichka (light/regular weight), keng letter-spacing kichik matnlarda
- Aksent: gul emoji/ikonka faqat burchaklarda, minimal miqdorda — og'ir gulli naqsh emas
- Rang palitrasi: qo'ng'ir-pushti tonlar (`#5c4a42`, `#c9a896`)

## Sahifa tuzilishi (bo'limlar tartibi)

Bitta uzun scroll-sahifa, quyidagi tartibda:

1. **Hero** — juftlik ismlari ("Ali & Nilufar" — placeholder), sana, "pastga suring" ishorasi
2. **Countdown timer** — to'y sanasigacha kun/soat/minut/sekund, real vaqtda yangilanadi
3. **Dastur/Kun tartibi** — marosim vaqtlari vertikal timeline ko'rinishida (masalan: Nikoh to'yi, Kelin-kuyov kirishi va h.k. — placeholder vaqtlar)
4. **Manzil (Map)** — to'y zali nomi, manzil matni, Google Maps iframe/link, "Yo'nalishni ochish" tugmasi
5. **Galereya** — juftlik suratlari grid ko'rinishida (placeholder rasmlar)
6. **Sovg'a** — bank rekvizitlari/karta raqami matn ko'rinishida, "Nusxalash" tugmasi bilan
7. **RSVP** — "Kelishingizni tasdiqlang" tugmasi, bosilganda WhatsApp'ga oldindan tayyorlangan xabar bilan yo'naltiradi

## O'zaro ta'sir va xatoliklarni boshqarish

- **Countdown**: `setInterval` bilan har sekundda yangilanadi. Agar sana o'tib ketgan bo'lsa, countdown o'rniga tabrik matni ("Baxtli kunimiz keldi! 🎉") ko'rsatiladi. JS ishlamasa, statik sana matni fallback sifatida ko'rinadi (HTML'da mavjud bo'ladi, JS uni countdown bilan almashtiradi).
- **RSVP**: `https://wa.me/<placeholder raqam>?text=<oldindan tayyorlangan xabar>` formatidagi havola. Raqam placeholder qiymat bilan boshlanadi, foydalanuvchi keyin real raqam bilan almashtiradi.
- **Sovg'a bo'limi nusxalash**: Clipboard API (`navigator.clipboard.writeText`) ishlatiladi. API mavjud bo'lmasa (eski brauzer), tugma matni o'zgarmaydi va foydalanuvchi karta raqamini qo'lda belgilab nusxalay oladi (matn har doim tanlanadigan holatda qoladi).
- **Manzil**: Google Maps iframe embed (placeholder koordinata/manzil bilan) + alohida "Xaritada ochish" tugmasi (`https://maps.google.com/?q=<placeholder manzil>`).
- **Galereya rasmlari**: rasm yuklanmasa, `<img>` uchun fon rangi (bo'sh joy) ko'rsatiladi, brauzerning standart "buzilgan rasm" ikonkasi chiqmasligi uchun CSS orqali yashiriladi.

## Testlash yondashuvi

Avtomatlashtirilgan testlar yo'q (statik demo sahifa). Qo'lda tekshirish:
- Mobil (390px) va desktop (1280px+) o'lchamlarida barcha bo'limlarni vizual tekshirish
- Countdown to'g'ri hisoblayotganini tekshirish
- RSVP tugmasi to'g'ri WhatsApp linkini ochishini tekshirish
- "Nusxalash" tugmasi ishlashini tekshirish
- Sahifa scroll qilinganda barcha bo'limlar to'g'ri ko'rinishini tekshirish

## Doiradan tashqarida (keyingi bosqichlar uchun)

- Real kontent bilan almashtirish (ism, sana, manzil, telefon raqami, rasmlar)
- Ko'p tillilik (agar keyinroq kerak bo'lsa)
- Real RSVP backend (agar WhatsApp yetarli bo'lmasa)
