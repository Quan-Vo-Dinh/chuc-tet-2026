// ============================================================
// 🧧 LÌ XÌ BÍNH NGỌ 2026 — DỮ LIỆU LỜI CHÚC TẾT
// ============================================================
// Hướng dẫn chỉnh sửa:
//   - Thay đổi "name", "relation", "message" cho từng người.
//   - Đặt ảnh chân dung vào thư mục /public/images/family/
//     rồi cập nhật trường "photo" tương ứng.
//   - "slug" là phần xuất hiện trên URL: /li-xi/[slug]
// ============================================================

export interface FamilyMember {
  slug: string;
  name: string;
  relation: string;
  message: string;
  photo: string;
}

export const familyMembers: FamilyMember[] = [
  {
    slug: "ba",
    name: "Ba",
    relation: "Ba kính yêu",
    photo: "/images/family/ba.jpg",
    message: `Kính gửi Ba thương yêu,

Xuân Bính Ngọ 2026 đã gõ cửa, con muốn gửi đến Ba lời chúc chân thành nhất từ tận đáy lòng. Cảm ơn Ba đã luôn là chỗ dựa vững chắc, là ngọn hải đăng dẫn lối cho cả gia đình mình suốt bao năm qua.

Con kính chúc Ba năm mới mạnh khỏe, bình an, mọi ước nguyện đều thành hiện thực. Mong Ba luôn vui cười, tận hưởng những ngày tháng an nhiên bên gia đình.

Thương chúc, Minh Quân (Bin)`,
  },
  {
    slug: "me",
    name: "Mẹ",
    relation: "Mẹ yêu thương",
    photo: "/images/family/me.jpg",
    message: `Kính gửi Mẹ yêu thương,

Mỗi mùa Xuân đến, con lại càng thấm thía tình yêu vô bờ bến mà Mẹ dành cho cả nhà. Những bữa cơm Mẹ nấu, những lời dặn dò ân cần — tất cả đều là kho báu quý giá nhất đời con.

Năm Bính Ngọ 2026, con kính chúc Mẹ luôn khỏe mạnh, trẻ đẹp, nụ cười luôn nở trên môi. Mong Mẹ sẽ luôn hạnh phúc và bình an bên gia đình mình.

Thương chúc, Minh Quân (Bin)`,
  },
  {
    slug: "chi-bo",
    name: "Chị Bô",
    relation: "Chị gái thân yêu",
    photo: "/images/family/chi-bo.jpg",
    message: `Gửi Chị Bô thân yêu,

Xuân mới đến rồi nè chị! Em luôn biết ơn vì có một người chị tuyệt vời như Chị Bô — người luôn quan tâm, che chở và cho em những lời khuyên chân thành nhất.

Năm Bính Ngọ 2026, em chúc chị luôn rạng rỡ, xinh đẹp, công việc hanh thông và cuộc sống tràn đầy niềm vui. Phi nước đại trên mọi con đường chị chọn nha!

Thương chúc, Minh Quân (Bin)`,
  },
  {
    slug: "phuoc-tam",
    name: "Phước Tâm",
    relation: "Người anh em thân thiết",
    photo: "/images/family/phuoc-tam.jpg",
    message: `Gửi Phước Tâm,

Năm mới Bính Ngọ 2026, mình chúc Tâm một năm thật nhiều năng lượng, thật nhiều thành công và thật nhiều niềm vui. Cảm ơn Tâm vì luôn là người đồng hành đáng tin cậy.

Chúc Tâm mã đáo thành công, mọi dự định đều thuận buồm xuôi gió, sức khỏe dồi dào để chinh phục mọi mục tiêu trong năm mới!

Thương chúc, Minh Quân (Bin)`,
  },
  {
    slug: "bin",
    name: "Bin",
    relation: "Gửi chính mình",
    photo: "/images/family/bin.jpg",
    message: `Gửi Minh Quân — gửi chính mình,

Năm Bính Ngọ 2026, hãy tiếp tục dũng cảm, tiếp tục yêu thương và tiếp tục cố gắng. Cảm ơn mình đã kiên trì suốt một năm qua, đã không bỏ cuộc trước bất kỳ khó khăn nào.

Chúc mình năm mới tràn đầy cảm hứng, sáng tạo không giới hạn, sức khỏe thật tốt và luôn giữ được nụ cười trên môi. Phi nước đại thôi, Bin ơi!

Thương chúc, Minh Quân (Bin)`,
  },
];

// Lời chúc chung cho trang mặc định (khi không tìm thấy slug)
export const defaultGreeting = {
  name: "Gia đình thân yêu",
  relation: "Cả gia đình",
  photo: "/images/family/gia-dinh.jpg",
  message: `Kính gửi cả gia đình thân yêu,

Xuân Bính Ngọ 2026 đã về, mang theo hơi ấm của ngày Tết đoàn viên. Con/em xin gửi đến mọi người trong gia đình lời chúc chân thành và ấm áp nhất.

Chúc cả nhà mình năm mới an khang thịnh vượng, sức khỏe dồi dào, mọi điều tốt đẹp nhất sẽ đong đầy trong năm mới. Mong gia đình ta mãi gắn kết, yêu thương và luôn là bến đỗ bình yên cho nhau.

Mã đáo thành công — Ngựa vàng phi nước đại!

Thương chúc, Minh Quân (Bin)`,
};
