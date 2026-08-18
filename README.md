# 🕷️ Spider Love World

Website tình yêu phong cách Pixel Art / Minecraft-inspired + Spider-Man.

## Cấu trúc

```text
spiderman-love-world/
├── index.html
├── style.css
├── script.js
└── assets/
    └── music.mp3   ← tự thêm nhạc vào đây
```

## Chạy website

Mở `index.html` bằng Chrome/Edge.

## Chỗ cần sửa thường xuyên

### Nội dung
Mở `index.html` và tìm:
- `MY SPIDER GIRL`
- `LOVE LETTER`
- Nội dung bức thư
- `MY FAVORITE PERSON`
- `Thank you for being in my life`

### Màu sắc
Mở `style.css`, phần `:root`:

```css
--red
--pink
--pink-dark
--blue
--purple
--yellow
```

### Hiệu ứng
Mở `script.js`, phần `CONFIG`:

```js
heartInterval
maxHearts
clickHeartAmount
musicVolume
```

### Nhạc
Đặt file:

```text
assets/music.mp3
```

Sau đó bấm `PLAY MUSIC`.

## Gợi ý nâng cấp tiếp

1. Thay Spider-Man CSS bằng ảnh pixel-art thật.
2. Thêm ảnh thật của hai bạn vào phần `PHOTOS`.
3. Làm Spider-Man bắn tơ theo chuột.
4. Thêm nhân vật pixel của người yêu.
5. Làm hộp quà mở bằng animation.
6. Thêm màn hình cuối với câu hỏi "Làm người yêu anh nhé? ❤️".


## Bản cập nhật Spider-Man

- Spider-Man chính có mặt nạ đỏ, mắt trắng, thân đỏ/xanh và logo nhện.
- Love City có một Spider-Man pixel riêng.
- Love House có một Spider-Man riêng.
- Surprise có một Spider-Man riêng.
- Achievement có một Spider-Man riêng.
- Các popup cũng có icon Spider-Man.
- Có thêm web, sticker nhện, tim và sparkle trong từng khu vực.


## Bản V3 - mỗi khung một pose

- Love City: Spider-Man đu tơ.
- Love House: Spider-Man cầm hộp quà.
- Surprise: Spider-Man tạo dáng trái tim.
- Achievement: Spider-Man vẫy tay.
- Mỗi khung có logo nhện riêng ở tiêu đề.


## 💌 LOVE LETTER realtime — 2 người cùng đọc

Phần **LOVE LETTER** dùng Firebase Realtime Database. Hai người chỉ cần mở **cùng một Room ID**; thư gửi từ máy này sẽ xuất hiện trên máy kia gần như ngay lập tức. Không cần tạo tài khoản vì website dùng **Anonymous Authentication**.

### 1. Tạo Firebase

Trong Firebase Console:

1. Tạo/chọn một project.
2. Thêm **Web App** và copy `firebaseConfig`.
3. Vào **Authentication → Sign-in method → Anonymous → Enable**.
4. Vào **Realtime Database → Create Database**.

### 2. Dán config vào `script.js`

Tìm:

```js
const FIREBASE_CONFIG = {
  ...
};
```

và thay các `YOUR_...` bằng config thật của Firebase Web App.

### 3. Firebase Realtime Database Rules

Để chỉ người đã đăng nhập ẩn danh mới đọc/ghi được thư, dùng Rules này:

```json
{
  "rules": {
    "loveRooms": {
      "$roomId": {
        "letters": {
          ".read": "auth != null",
          ".write": "auth != null",
          "$letterId": {
            ".validate": "newData.hasChildren(['name', 'text', 'createdAt']) && newData.child('name').isString() && newData.child('text').isString() && newData.child('name').val().length <= 30 && newData.child('text').val().length <= 2000"
          }
        }
      }
    }
  }
}
```

> **Lưu ý:** Room ID hoạt động giống “mã phòng”. Ai có link phòng thì có thể đọc thư trong phòng đó, nên hãy dùng một Room ID khó đoán (ví dụ `nguyen-love-7x29q`).

### 4. Chia sẻ cho người ấy

Trong LOVE LETTER nhập Room ID → bấm **VÀO PHÒNG** → bấm **COPY LINK CHO NGƯỜI ẤY**.

Người ấy mở đúng link đó, nhập tên và viết thư. Hai bên sẽ nhìn thấy cùng một danh sách thư.
