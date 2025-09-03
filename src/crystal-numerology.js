/**
 * Crystal Numerology - Kết hợp Thần số học và Năng lượng đá quý
 */

// Mối liên hệ giữa số và đá quý/tinh thể
export const CRYSTAL_NUMEROLOGY = {
  1: {
    crystals: ['Hồng Ngọc Ruby', 'Garnet Đỏ', 'Mã Não Đỏ', 'Carnelian Cam'],
    vietnamese: ['Hồng ngọc - Đá của vua chúa', 'Garnet - Đá lửa thiêng', 'Mã não đỏ - Đá dũng khí', 'Carnelian - Đá sáng tạo'],
    chakra: 'Chakra Gốc (Mūlādhāra) - Trung tâm sức mạnh',
    colors: ['Đỏ rực rỡ', 'Cam đậm quyền lực', 'Đỏ thẫm uy nghiêm'],
    properties: [
      '🔥 Tăng cường năng lượng lãnh đạo và quyết đoán',
      '👑 Phát triển sự tự tin và uy quyền tự nhiên', 
      '💡 Kích thích sáng kiến và khởi đầu những dự án mới',
      '🛡️ Bảo vệ khỏi năng lượng tiêu cực và tác động xấu'
    ],
    meditation: '🧘‍♂️ Thiền với Hồng Ngọc Ruby vào buổi sáng để phát triển sức mạnh nội tại và khả năng lãnh đạo',
    placement: '🏢 Đặt ở bàn làm việc (góc phải) hoặc mang bên người để tăng tự tin trong giao tiếp',
    compatible_numbers: [3, 5, 9],
    avoid_with: [2, 4, 6],
    daily_use: 'Mang theo khi có cuộc họp quan trọng hoặc cần đưa ra quyết định lớn',
    cleansing: 'Làm sạch bằng nước mặn hoặc ánh sáng mặt trời vào buổi sáng'
  },
  
  2: {
    crystals: ['Đá Mặt Trăng', 'Thạch Anh Hồng', 'Amazonite Xanh', 'Prehnite Xanh Lá'],
    vietnamese: ['Đá Mặt trăng - Đá của trực giác', 'Thạch anh hồng - Đá tình yêu', 'Amazonite - Đá giao tiếp', 'Prehnite - Đá chữa lành'],
    chakra: 'Chakra Xương Chậu (Svādhiṣṭhāna) - Trung tâm cảm xúc',
    colors: ['Hồng nhạt dịu dàng', 'Xanh da trời nhạt', 'Trắng trong suốt như ánh trăng'],
    properties: [
      '🌙 Cân bằng cảm xúc và tăng cường trực giác nữ tính',
      '🤝 Phát triển khả năng hợp tác và thấu hiểu cảm xúc người khác',
      '💖 Chữa lành những tổn thương trong tim và mối quan hệ',
      '⚖️ Tăng cường sự kiên nhẫn và tìm kiếm sự ổn định trong cuộc sống'
    ],
    meditation: '🌕 Thiền với Đá Mặt Trăng vào đêm trăng tròn để phát triển trực giác và kết nối với năng lượng âm',
    placement: '🛏️ Đặt ở phòng ngủ hoặc không gian thư giãn để tạo năng lượng bình an',
    compatible_numbers: [4, 6, 8],
    avoid_with: [1, 3, 5],
    daily_use: 'Mang theo khi cần cân bằng cảm xúc hoặc trong các mối quan hệ quan trọng',
    cleansing: 'Làm sạch bằng ánh sáng mặt trăng hoặc nước suối trong'
  },

  3: {
    crystals: ['Citrine', 'Yellow Topaz', 'Amber', 'Sunstone'],
    vietnamese: ['Thạch anh vàng', 'Topaz vàng', 'Hổ phách', 'Đá Mặt trời'],
    chakra: 'Solar Plexus Chakra (Maṇipūra)',
    colors: ['Vàng', 'Cam sáng', 'Vàng kim'],
    properties: [
      'Kích thích sáng tạo và biểu đạt',
      'Tăng cường tự tin khi giao tiếp',
      'Mang lại niềm vui và lạc quan',
      'Phát triển tài năng nghệ thuật'
    ],
    meditation: 'Thiền với Citrine vào buổi sáng để tăng năng lượng sáng tạo',
    placement: 'Đặt ở studio nghệ thuật hoặc không gian làm việc sáng tạo',
    compatible_numbers: [1, 5, 7],
    avoid_with: [2, 4, 8]
  },

  4: {
    crystals: ['Green Aventurine', 'Moss Agate', 'Tree Agate', 'Emerald'],
    vietnamese: ['Aventurine xanh', 'Mã não rêu', 'Mã não cây', 'Ngọc lục bảo'],
    chakra: 'Heart Chakra (Anāhata)',
    colors: ['Xanh lá', 'Xanh rêu', 'Nâu đất'],
    properties: [
      'Tăng cường sự kiên trì và kỷ luật',
      'Mang lại ổn định và an toàn',
      'Phát triển tính thực tế và logic',
      'Hỗ trợ xây dựng nền tảng vững chắc'
    ],
    meditation: 'Thiền với Green Aventurine để phát triển sự kiên nhẫn',
    placement: 'Đặt ở góc làm việc hoặc khu vực cần tổ chức',
    compatible_numbers: [2, 6, 8],
    avoid_with: [1, 3, 5]
  },

  5: {
    crystals: ['Turquoise', 'Aquamarine', 'Blue Lace Agate', 'Sodalite'],
    vietnamese: ['Ngọc lam', 'Aquamarine', 'Mã não xanh', 'Sodalite'],
    chakra: 'Throat Chakra (Viśuddha)',
    colors: ['Xanh da trời', 'Xanh ngọc', 'Xanh dương nhạt'],
    properties: [
      'Khuyến khích tự do và phiêu lưu',
      'Tăng cường khả năng giao tiếp',
      'Phát triển tính linh hoạt và thích ứng',
      'Mở rộng tầm nhìn và kiến thức'
    ],
    meditation: 'Thiền với Turquoise trước khi du lịch hoặc thay đổi lớn',
    placement: 'Mang theo khi di chuyển hoặc đặt ở khu vực học tập',
    compatible_numbers: [1, 3, 7],
    avoid_with: [2, 4, 6]
  },

  6: {
    crystals: ['Rhodonite', 'Pink Tourmaline', 'Green Jade', 'Chrysocolla'],
    vietnamese: ['Rhodonite', 'Tourmaline hồng', 'Ngọc bích xanh', 'Chrysocolla'],
    chakra: 'Heart Chakra (Anāhata)',
    colors: ['Hồng', 'Xanh lá nhạt', 'Xanh ngọc'],
    properties: [
      'Phát triển lòng từ bi và tình yêu thương',
      'Tăng cường trách nhiệm gia đình',
      'Chữa lành và nuôi dưỡng mối quan hệ',
      'Mang lại hòa hợp và cân bằng'
    ],
    meditation: 'Thiền với Rose Quartz để mở rộng tình yêu vô điều kiện',
    placement: 'Đặt ở trung tâm nhà hoặc phòng khách',
    compatible_numbers: [2, 4, 8],
    avoid_with: [1, 3, 5]
  },

  7: {
    crystals: ['Amethyst', 'Labradorite', 'Fluorite', 'Clear Quartz'],
    vietnamese: ['Thạch anh tím', 'Labradorite', 'Fluorite', 'Thạch anh trắng'],
    chakra: 'Crown Chakra (Sahasrāra) & Third Eye (Ājñā)',
    colors: ['Tím', 'Xanh ánh kim', 'Trong suốt'],
    properties: [
      'Phát triển trực giác và tâm linh',
      'Tăng cường khả năng thiền định',
      'Mở mang trí tuệ và hiểu biết sâu sắc',
      'Bảo vệ khỏi năng lượng tiêu cực'
    ],
    meditation: 'Thiền với Amethyst để kết nối với trí tuệ cao hơn',
    placement: 'Đặt ở không gian thiền hoặc phòng học',
    compatible_numbers: [3, 5, 9],
    avoid_with: [2, 4, 6]
  },

  8: {
    crystals: ['Pyrite', 'Tiger Eye', 'Hematite', 'Black Tourmaline'],
    vietnamese: ['Pyrite', 'Mắt hổ', 'Hematite', 'Tourmaline đen'],
    chakra: 'Root Chakra (Mūlādhāra) & Solar Plexus (Maṇipūra)',
    colors: ['Vàng kim', 'Nâu vàng', 'Đen', 'Xám kim loại'],
    properties: [
      'Tăng cường sức mạnh và quyền lực',
      'Phát triển tư duy kinh doanh và tài chính',
      'Mang lại thành công vật chất',
      'Cung cấp sự bảo vệ và ổn định'
    ],
    meditation: 'Thiền với Pyrite để thu hút thịnh vượng và thành công',
    placement: 'Đặt ở văn phòng hoặc khu vực tài chính',
    compatible_numbers: [2, 4, 6],
    avoid_with: [1, 3, 5]
  },

  9: {
    crystals: ['Selenite', 'Moldavite', 'Lepidolite', 'Ametrine'],
    vietnamese: ['Selenite', 'Moldavite', 'Lepidolite', 'Ametrine'],
    chakra: 'Crown Chakra (Sahasrāra) & All Chakras',
    colors: ['Trắng trong', 'Xanh olivin', 'Tím nhạt', 'Vàng tím'],
    properties: [
      'Hoàn thiện và kết thúc chu kỳ',
      'Phát triển lòng từ bi toàn cầu',
      'Kết nối với nguồn năng lượng vũ trụ',
      'Chuyển hóa và thanh lọc năng lượng'
    ],
    meditation: 'Thiền với Selenite để kết nối với nguồn năng lượng cao nhất',
    placement: 'Đặt ở trung tâm ngôi nhà hoặc altar thiêng liêng',
    compatible_numbers: [1, 3, 7],
    avoid_with: [2, 4, 6]
  },

  11: {
    crystals: ['Rainbow Fluorite', 'Charoite', 'Sugilite', 'Moldavite'],
    vietnamese: ['Fluorite cầu vồng', 'Charoite', 'Sugilite', 'Moldavite'],
    chakra: 'Third Eye (Ājñā) & Crown (Sahasrāra)',
    colors: ['Tím sẫm', 'Xanh violet', 'Cầu vồng'],
    properties: [
      'Kích hoạt năng lực tâm linh và trực giác mạnh mẽ',
      'Phát triển khả năng dẫn dắt tinh thần',
      'Mở rộng ý thức và nhận thức',
      'Kết nối với chiều kích cao hơn'
    ],
    meditation: 'Thiền với Charoite để phát triển khả năng dẫn dắt tâm linh',
    placement: 'Đặt ở không gian thiền hoặc altar năng lượng cao',
    compatible_numbers: [2, 22, 33],
    avoid_with: [4, 8]
  },

  22: {
    crystals: ['Moldavite', 'Phenakite', 'Herderite', 'Natrolite'],
    vietnamese: ['Moldavite', 'Phenakite', 'Herderite', 'Natrolite'],
    chakra: 'All Chakras + Soul Star Chakra',
    colors: ['Xanh olivin', 'Trong suốt', 'Trắng ánh kim'],
    properties: [
      'Hiện thực hóa tầm nhìn vĩ đại',
      'Xây dựng nền tảng cho thế hệ tương lai',
      'Kết nối tâm linh với thực tế vật chất',
      'Phát triển khả năng kiến tạo master'
    ],
    meditation: 'Thiền với Moldavite để kết nối với sứ mệnh soul master',
    placement: 'Đặt ở trung tâm không gian làm việc quan trọng',
    compatible_numbers: [4, 11, 33],
    avoid_with: [3, 5, 7]
  },

  33: {
    crystals: ['Danburite', 'Petalite', 'Satyaloka Quartz', 'Azeztulite'],
    vietnamese: ['Danburite', 'Petalite', 'Satyaloka Quartz', 'Azeztulite'],
    chakra: 'Soul Star + Stellar Gateway',
    colors: ['Trắng tinh khiết', 'Trong suốt ánh kim'],
    properties: [
      'Dạy dỗ và chữa lành với tình yêu vô điều kiện',
      'Kết nối với Đại Thầy tâm linh',
      'Phục vụ nhân loại với lòng từ bi cao nhất',
      'Chuyển hóa toàn cầu và nâng tầm ý thức'
    ],
    meditation: 'Thiền với Danburite để phát triển tình yêu thương vô điều kiện',
    placement: 'Đặt ở altar thiêng liêng hoặc không gian chữa lành',
    compatible_numbers: [6, 11, 22],
    avoid_with: [1, 5, 8]
  }
};
