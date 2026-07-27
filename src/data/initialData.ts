import { Product, Category, ContactConfig, HeroSlide, ConsultationInquiry, EditorialArticle } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Áo Dài Truyền Thống',
    slug: 'ao-dai-truyen-thong',
    image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Thêu tay thủ công trên nền lụa tơ tằm Bảo Lộc thượng hạng, phom dáng tôn vinh đường nét người phụ nữ Việt.',
    itemCount: 18
  },
  {
    id: 'cat-2',
    name: 'Áo Dài Cách Tân',
    slug: 'ao-dai-cach-tan',
    image: 'https://images.pexels.com/photos/31157326/pexels-photo-31157326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Sự kết hợp tinh tế giữa di sản Á Đông và xu hướng thời trang đương đại, tơ gấm cao cấp thanh lịch.',
    itemCount: 14
  },
  {
    id: 'cat-3',
    name: 'Váy Cưới Luxury',
    slug: 'vay-cuoi-luxury',
    image: 'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Tuyệt tác Couture lộng lẫy đính kết pha lê Swarovski, ren Pháp cao cấp dành cho ngày chung đôi hoàn hảo.',
    itemCount: 22
  },
  {
    id: 'cat-4',
    name: 'Vest Cưới Chú Rể',
    slug: 'vest-cuoi',
    image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Bộ âu phục may đo Ý sắc nét, chất liệu Wool 100% thoáng nhẹ, phong thái quý ông lịch lãm & đẳng cấp.',
    itemCount: 16
  },
  {
    id: 'cat-5',
    name: 'Trang Phục Sự Kiện',
    slug: 'trang-phuc-su-kien',
    image: 'https://images.pexels.com/photos/26741263/pexels-photo-26741263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Đầm dạ hội & Áo dài tiệc cao cấp dành cho thảm đỏ, tiệc Gala, lễ ra mắt & các sự kiện sang trọng.',
    itemCount: 12
  },
  {
    id: 'cat-6',
    name: 'Phụ Kiện Cưới',
    slug: 'phu-kien-cuoi',
    image: 'https://images.pexels.com/photos/31247125/pexels-photo-31247125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Mấn đính ngọc trai, khăn voan thêu viền, vương miện hoàng gia, cà vạt lụa & hoa cài áo thủ công.',
    itemCount: 25
  },
  {
    id: 'cat-7',
    name: 'Đồng phục công sở',
    slug: 'dong-phuc-cong-so',
    image: 'https://images.pexels.com/photos/7697450/pexels-photo-7697450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Bộ sưu tập đồng phục công sở nam nữ may đo lịch lãm, hiện đại, chuẩn phom dáng doanh nghiệp.',
    itemCount: 16,
    level: 1
  },
  {
    id: 'cat-7-1',
    name: 'Đồng phục công sở nữ',
    slug: 'dong-phuc-cong-so-nu',
    image: 'https://images.pexels.com/photos/7697450/pexels-photo-7697450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Áo sơ mi lụa, blazer & đầm công sở nữ may đo tôn dáng sang trọng.',
    itemCount: 8,
    parentId: 'cat-7',
    level: 2
  },
  {
    id: 'cat-7-2',
    name: 'Đồng phục công sở nam',
    slug: 'dong-phuc-cong-so-nam',
    image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    description: 'Sơ mi nam & âu phục công sở chuẩn phong thái doanh nhân.',
    itemCount: 8,
    parentId: 'cat-7',
    level: 2
  }
];

export const initialContactConfig: ContactConfig = {
  phone: '0988889999',
  phoneFormatted: '0988.889.999',
  zaloUrl: 'https://zalo.me/0988889999',
  messengerUrl: 'https://m.me/maisondesOie.couture',
  facebookUrl: 'https://facebook.com/maisondesOie.couture',
  tiktokUrl: 'https://tiktok.com/@maisondesOie.official',
  instagramUrl: 'https://instagram.com/maisondesOie_couture',
  shopeeUrl: 'https://shopee.vn/maisondesOie_official',
  googleMapsUrl: 'https://maps.google.com/?q=MAISON+DE+SOIE+Ha+Noi',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.113303642358!2d105.8458!3d21.0285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzQyLjYiTiAxMDXCsDUwJzQ0LjkiRQ!5e0!3m2!1svi!2svn!4v1680000000000!5m2!1svi!2svn',
  email: 'contact@maisondesOie.vn',
  showroomAddress: 'Showroom 1: 88 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội',
  showroomBranch2: 'Showroom 2: 168 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
  openHours: '08:30 - 21:30 (Tất cả các ngày trong tuần)'
};

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000',
    title: 'Nâng Tầm Vẻ Đẹp Việt',
    subtitle: 'Tuyệt tác Áo dài truyền thống & Váy cưới Couture may đo độc bản cho ngày trọng đại của bạn.',
    badge: 'COLLECTION 2026 • HAUTE COUTURE',
    ctaPrimaryText: 'Khám Phá Bộ Sưu Tập',
    ctaSecondaryText: 'Đặt Lịch Thử Đồ VIP',
    categorySlug: 'ao-dai-truyen-thong'
  },
  {
    id: 'slide-2',
    image: 'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000',
    title: 'Khoác Lên Mình Sự Hoàn Mỹ',
    subtitle: 'Đội ngũ thiết kế 15 năm kinh nghiệm. Đính kết thủ công pha lê & thêu lụa tơ tằm đỉnh cao.',
    badge: 'LUXURY BRIDAL GOWNS',
    ctaPrimaryText: 'Bộ Sưu Tập Váy Cưới',
    ctaSecondaryText: 'Tư Vấn May Đo',
    categorySlug: 'vay-cuoi-luxury'
  },
  {
    id: 'slide-3',
    image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000',
    title: 'Lịch Lãm & Đẳng Cấp Quý Ông',
    subtitle: 'Âu phục & Vest chú rể chuẩn phom dáng Ý, chất liệu Wool nhập khẩu cao cấp.',
    badge: 'GROOM TUXEDO & SUITS',
    ctaPrimaryText: 'Xem Mẫu Vest Cưới',
    ctaSecondaryText: 'Đặt Lịch Đo Dáng',
    categorySlug: 'vest-cuoi'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    sku: 'AD-HOANGGIA-01',
    title: 'Áo Dài Lụa Tơ Tằm "Phượng Hoàng Triều Cốc"',
    slug: 'ao-dai-lua-to-tam-phuong-hoang-trieu-coc',
    categoryId: 'cat-1',
    categoryName: 'Áo Dài Truyền Thống',
    salePrice: 18500000,
    rentalPrice: 3800000,
    rentalDeposit: 5000000,
    mainImage: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/31247125/pexels-photo-31247125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/31157334/pexels-photo-31157334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Trắng Ngọc Trai', 'Đỏ Hoàng Gia', 'Vàng Hoàng Yến'],
    material: 'Lụa Tơ Tằm Bảo Lộc 100%, Thêu Kim Tuyến Thủ Công & Đính Đá Swarovski',
    style: 'Hoàng Gia Cổ Điển',
    occasion: 'Lễ Đám Hỏi, Lễ Rước Dâu',
    description: 'Tuyệt tác Áo dài truyền thống "Phượng Hoàng Triều Cốc" lấy cảm hứng từ họa tiết cung đình Huế, được các nghệ nhân đính kết hơn 120 giờ làm việc tỉ mỉ. Phom dáng ôm ngọc ngà, tôn vinh vóc dáng người phụ nữ Việt Nam trong ngày vui trọng đại.',
    highlightFeatures: [
      'Chất liệu lụa tơ tằm Bảo Lộc mềm mịn, co giãn nhẹ và thấm hút mồ hôi',
      'Họa tiết Chim Phượng Hoàng thêu tay nổi 3D kết hợp hạt cườm Nhật Bản',
      'Đường may may đo ẩn chỉ theo kỹ thuật may thủ công truyền thống',
      'Đi kèm mấn đội đầu đồng bộ đính ngọc trai thiên nhiên'
    ],
    careInstructions: 'Giặt khô hấp nhẹ chuyên dụng. Tránh phơi trực tiếp dưới ánh nắng gay gắt. Bảo quản trong túi bọc lụa tặng kèm.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 5.0,
    viewCount: 1420
  },
  {
    id: 'prod-2',
    sku: 'VC-CELESTIAL-02',
    title: 'Váy Cưới Couture "Celestial Princess Ballgown"',
    slug: 'vay-cuoi-couture-celestial-princess',
    categoryId: 'cat-3',
    categoryName: 'Váy Cưới Luxury',
    salePrice: 42000000,
    rentalPrice: 8500000,
    rentalDeposit: 10000000,
    mainImage: 'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/8459374/pexels-photo-8459374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/26741263/pexels-photo-26741263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Trắng Kem Off-White', 'Hồng Quartz', 'Champagne Glow'],
    material: 'Ren Pháp Chantilly, Tulle 7 Lớp Nhập Khẩu Italia, Đính 3.000+ Viên Pha Lê Swarovski',
    style: 'Hoàng Gia - Công Chúa lộng lẫy',
    occasion: 'Lễ Cưới Sảnh Khách Sạn / Tiệc Đêm Luxury',
    description: 'Chiếc váy cưới dệt nên ước mơ công chúa của mọi cô dâu. Phom dáng Xòe Bồng Royal Ballgown với phần corset siết eo vi diệu, tạo hiệu ứng vòng 2 thon gọn vượt trội. Đuôi váy xòe dài 2m5 lấp lánh như dải ngân hà dưới ánh đèn sân khấu.',
    highlightFeatures: [
      'Gọng Corset cấu trúc chuẩn Châu Âu giúp định hình phom dáng thon gọn',
      'Phủ 3.000 viên pha lê Swarovski chính hãng phát sáng lấp lánh',
      'Phần vai áo trễ trần vai quyến rũ, giấu khuyết điểm bắp tay khéo léo',
      'Đuôi váy xòe dài 2.5m có thể thu gọn bằng móc đính ẩn khi làm lễ & đi bàn'
    ],
    careInstructions: 'Dịch vụ giặt khô tiệt trùng cao cấp do Maison De Soie phụ trách toàn bộ sau khi trả váy.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 4.9,
    viewCount: 2890
  },
  {
    id: 'prod-3',
    sku: 'VT-ITALIAN-03',
    title: 'Bộ Vest Chú Rể "Royal Italian Tuxedo Black & Gold"',
    slug: 'bo-vest-chu-re-royal-italian-tuxedo',
    categoryId: 'cat-4',
    categoryName: 'Vest Cưới Chú Rể',
    salePrice: 15500000,
    rentalPrice: 2800000,
    rentalDeposit: 3000000,
    mainImage: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/15536109/pexels-photo-15536109.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/16925520/pexels-photo-16925520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'May đo'],
    colors: ['Đen Tuxedo Klasik', 'Xanh Midnight Blue', 'Rượu Red Wine'],
    material: 'Vải Wool 100% Super 150s Nhập Khẩu Ý, Lót Satin Lụa Cao Cấp',
    style: 'Tuxedo Quý Ông Châu Âu',
    occasion: 'Tiệc Cưới, Gala Dinner, Thảm Đỏ',
    description: 'Thiết kế Tuxedo cổ ve nhọn (Peak Lapel) bọc satin đen huyền bí. Đường cắt may 3D chuẩn xác đến từng milimet, giúp tôn bờ vai thái thái và phom dáng vạm vỡ của chú rể.',
    highlightFeatures: [
      'Chất liệu Wool 100% thoáng khí, đứng phom, chống nhăn vượt trội',
      'Nẹp ve áo và khuy bọc vải Satin dệt thủ công sang trọng',
      'Trọn bộ gồm: Áo Jacket, Quần âu, Gilet gấm đính khuy và Nơ bướm lụa',
      'Hỗ trợ chỉnh sửa độ dài gấu quần và tay áo theo số đo chuẩn'
    ],
    careInstructions: 'Ủi hơi nước áp suất nhẹ. Bảo quản trong móc treo gỗ sồi và túi bọc vest đệm bông.',
    status: 'In Stock',
    featured: true,
    isNew: false,
    rating: 5.0,
    viewCount: 1150
  },
  {
    id: 'prod-4',
    sku: 'AD-MODERN-04',
    title: 'Áo Dài Cách Tân "Dáng Ngọc Sông Sen"',
    slug: 'ao-dai-cach-tan-dang-ngoc-song-sen',
    categoryId: 'cat-2',
    categoryName: 'Áo Dài Cách Tân',
    salePrice: 9800000,
    rentalPrice: 2200000,
    rentalDeposit: 3000000,
    mainImage: 'https://images.pexels.com/photos/31157326/pexels-photo-31157326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/31157326/pexels-photo-31157326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/31157334/pexels-photo-31157334.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Đỏ Đô Nhung', 'Hồng Phấn Rose', 'Xanh Ngọc Bích'],
    material: 'Organza Tơ Tằm Cung Đình & Lụa Satin Cao Cấp',
    style: 'Hiện Đại - Thanh Lịch',
    occasion: 'Chụp Ảnh Concept, Tiệc Đám Hỏi, Lễ Tết',
    description: 'Mẫu Áo dài cách tân "Dáng Ngọc Sông Sen" mang vẻ đẹp mộng mơ quyến rũ. Thiết kế tay phồng xuyên thấu cách điệu cùng họa tiết hoa sen thêu tay nổi bật trên nền vải organza bóng mờ sang trọng.',
    highlightFeatures: [
      'Tay áo may lớp Organza tạo hiệu ứng bồng bềnh thanh thoát',
      'Hoa sen thêu chỉ tơ tằm phối hạt cườm ngọc trai thủ công tỉ mỉ',
      'Quần lụa dập ly xòe rộng thanh lịch như váy xếp nếp',
      'Mặc cực kỳ thoải mái và dễ dàng di chuyển'
    ],
    careInstructions: 'Giặt tay nhẹ nhàng bằng nước mát. Không vắt mạnh.',
    status: 'In Stock',
    featured: false,
    isNew: true,
    rating: 4.8,
    viewCount: 980
  },
  {
    id: 'prod-5',
    sku: 'SK-REDGALA-05',
    title: 'Đầm Dạ Hội Sự Kiện "Royal Scarlet Velvet Gown"',
    slug: 'dam-da-hoi-su-kien-royal-scarlet-velvet',
    categoryId: 'cat-5',
    categoryName: 'Trang Phục Sự Kiện',
    salePrice: 24000000,
    rentalPrice: 4500000,
    rentalDeposit: 6000000,
    mainImage: 'https://images.pexels.com/photos/26741263/pexels-photo-26741263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/26741263/pexels-photo-26741263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/14581481/pexels-photo-14581481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Đỏ Scarlet', 'Đen Quyến Rũ', 'Vàng Champagne'],
    material: 'Nhung Tơ Tằm Ý Cao Cấp & Đá Pha Lê Tiệp Khắc',
    style: 'Thảm Đỏ Luxury - Kiêu Sa',
    occasion: 'Tiệc Gala, Thảm Đỏ Sự Kiện, Tiệc Khiêu Vũ',
    description: 'Thiết kế đầm dạ hội nhung tơ tằm mềm mịn quyến rũ với phần xẻ tà đùi táo bạo và cổ xẻ V quyến rũ. Đuôi đầm lướt nhẹ tạo vẻ uyển chuyển quý phái cho quý cô trong các đêm tiệc thượng lưu.',
    highlightFeatures: [
      'Nhung tơ tằm co giãn nhẹ, tôn trọn vẹn đường cong quyến rũ',
      'Điểm nhấn nẹp eo đính đá pha lê Tiệp Khắc lấp lánh',
      'Kèm mút ngực định hình cao cấp không lo bị xô lệch',
      'Mặt lưng đan dây dải lụa tùy chỉnh độ ôm vừa vặn'
    ],
    careInstructions: 'Giặt khô chuyên dụng tại showroom Maison De Soie.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 5.0,
    viewCount: 1840
  },
  {
    id: 'prod-6',
    sku: 'PK-CROWN-06',
    title: 'Bộ Mấn & Vương Miện Cưới "Imperial Pearl Crown"',
    slug: 'bo-man-vuong-mien-cuoi-imperial-pearl',
    categoryId: 'cat-6',
    categoryName: 'Phụ Kiện Cưới',
    salePrice: 4500000,
    rentalPrice: 850000,
    rentalDeposit: 1500000,
    mainImage: 'https://images.pexels.com/photos/31247125/pexels-photo-31247125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/31247125/pexels-photo-31247125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Ngọc Trai Trắng', 'Vàng Cung Đình', 'Bạc Ánh Kim'],
    material: 'Hợp Kim Mạ Vàng 18K, Ngọc Trai Tự Nhiên & Pha Lê Swarovski',
    style: 'Hoàng Gia Cung Đình',
    occasion: 'Phụ Kiện Áo Dài & Váy Cưới',
    description: 'Tuyệt tác phụ kiện đội đầu kết hợp giữa mấn truyền thống bọc lụa thêu tay và vương miện đính ngọc trai tự nhiên. Tạo nên thần thái kiêu sa chuẩn vị hoàng tộc cho cô dâu.',
    highlightFeatures: [
      'Ngọc trai đính tỉ mỉ kết hợp kim cương nhân tạo sáng bóng',
      'Chất liệu mạ vàng 18K không bay màu hay kích ứng da đầu',
      'Trọng lượng nhẹ, thiết kế ôm vừa khít đầu không gây đau mỏi',
      'Đi kèm hộp đựng cao cấp bọc nhung dập logo mạ vàng'
    ],
    careInstructions: 'Tránh tiếp xúc trực tiếp hóa chất sấy xịt tóc. Lau bằng khăn mềm.',
    status: 'In Stock',
    featured: false,
    isNew: false,
    rating: 4.9,
    viewCount: 760
  },
  {
    id: 'prod-7',
    sku: 'AD-HOANGCUC-07',
    title: 'Áo Dài Cặp Đôi Đám Hỏi "Hoàng Cúc Son"',
    slug: 'ao-dai-cap-doi-dam-hoi-hoang-cuc-son',
    categoryId: 'cat-1',
    categoryName: 'Áo Dài Truyền Thống',
    salePrice: 28000000,
    rentalPrice: 5500000,
    rentalDeposit: 7000000,
    mainImage: 'https://images.pexels.com/photos/14581481/pexels-photo-14581481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/14581481/pexels-photo-14581481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'May đo'],
    colors: ['Đỏ Son Cung Đình', 'Trắng Kem'],
    material: 'Gấm Thượng Hải Nhập Khẩu & Lụa Tơ Tằm Bảo Lộc',
    style: 'Cặp Đôi Song Hỷ',
    occasion: 'Lễ Đám Hỏi, Lễ Rước Dâu, Lễ Ra Ra Mắt Gia Tiên',
    description: 'Bộ áo dài đôi Tân Bàn - Tân Nương thiết kế đồng điệu. Áo cô dâu họa tiết Chim Công múa lượn, áo chú rể họa tiết Rồng Mây oai phong. Tượng trưng cho tình yêu viên mãn, long phụng sum vầy.',
    highlightFeatures: [
      'Chất liệu gấm hoa ẩn dệt nổi sang trọng, bền màu',
      'Thêu tay nổi 3D họa tiết Long - Phụng bằng chỉ tơ mạ kim',
      'Gồm trọn bộ áo nữ + quần lụa + mấn đính đá + áo nam + quần âu',
      'Hỗ trợ tinh chỉnh số đo nam nữ theo vóc dáng chuẩn'
    ],
    careInstructions: 'Giặt khô tiệt trùng tiêu chuẩn Maison De Soie.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 5.0,
    viewCount: 2100
  },
  {
    id: 'prod-8',
    sku: 'VC-MERMAID-08',
    title: 'Váy Cưới Đuôi Cáp "Elegance Mermaid Tail"',
    slug: 'vay-cuoi-duoi-cap-elegance-mermaid-tail',
    categoryId: 'cat-3',
    categoryName: 'Váy Cưới Luxury',
    salePrice: 36000000,
    rentalPrice: 6800000,
    rentalDeposit: 8000000,
    mainImage: 'https://images.pexels.com/photos/35182498/pexels-photo-35182498.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/35182498/pexels-photo-35182498.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/8459382/pexels-photo-8459382.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Trắng Pure White', 'Trắng Kem Ivory'],
    material: 'Satin Silk Lụa Ý, Ren Nổi 3D Guipure',
    style: 'Đuôi Cáp Mermaid Tối Giản Lux',
    occasion: 'Lễ Cưới Sảnh VIP & Tiệc Cưới Ngoài Trời Beach Wedding',
    description: 'Dành cho những cô dâu yêu thích phong cách tối giản kiêu hãnh. Phom váy đuôi cá ôm sát 3 vòng hoàn hảo, phần lưng khoét sâu quyến rũ đính dải ngọc trai dọc cột sống.',
    highlightFeatures: [
      'Chất vải Satin lụa Ý đứng dáng nhưng vẫn giữ được độ rủ mềm mại',
      'Đuôi váy có thể tháo rời tà xòe phụ linh hoạt khi di chuyển',
      'Cổ xẻ sâu vừa phải đính lớp lưới tệp màu da vô hình',
      'Tôn chiều cao tuyệt đối và tạo thắt eo thon gọn'
    ],
    careInstructions: 'Giặt hấp cao cấp. Móc treo bảo quản chuyên dụng.',
    status: 'In Stock',
    featured: false,
    isNew: false,
    rating: 4.9,
    viewCount: 1650
  },
  {
    id: 'prod-9',
    sku: 'VT-CHAMPAGNE-09',
    title: 'Vest Chú Rể Champagne Double-Breasted',
    slug: 'vest-chu-re-champagne-double-breasted',
    categoryId: 'cat-4',
    categoryName: 'Vest Cưới Chú Rể',
    salePrice: 16800000,
    rentalPrice: 3200000,
    rentalDeposit: 3500000,
    mainImage: 'https://images.pexels.com/photos/34317978/pexels-photo-34317978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/34317978/pexels-photo-34317978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/7230160/pexels-photo-7230160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'May đo'],
    colors: ['Champagne Gold', 'Kem Beige', 'Xanh Navy'],
    material: 'Wool Cashmere Nhập Khẩu Anh Quốc',
    style: '6 Khuy Hoàng Gia Châu Âu',
    occasion: 'Lễ Cưới Ban Ngày, Tiệc Cưới Sân Vườn Luxury',
    description: 'Mẫu Vest cưới màu Champagne vàng ánh kim thanh lịch đỉnh cao. Thiết kế 6 khuy Double-Breasted chuẩn tinh thần sartorial thượng lưu.',
    highlightFeatures: [
      'Chất liệu Wool pha Cashmere mềm mại, nhẹ nhàng và cực kỳ thoáng mát',
      'Khuy cài mạ đồng chạm khắc hoa văn cổ điển',
      'Form dáng ôm vừa vặn tôn bờ ngực và vòng eo nam tính',
      'Bộ gồm Jacket + Quần Âu phom Slimfit'
    ],
    careInstructions: 'Ủi hơi nước áp suất nhẹ.',
    status: 'In Stock',
    featured: false,
    isNew: true,
    rating: 4.8,
    viewCount: 890
  },
  {
    id: 'prod-10',
    sku: 'PK-VEIL-10',
    title: 'Khăn Voan Cưới "Royal Cathedral Lace Veil 3M"',
    slug: 'khan-voan-cuoi-cathedral-lace-veil',
    categoryId: 'cat-6',
    categoryName: 'Phụ Kiện Cưới',
    salePrice: 3800000,
    rentalPrice: 750000,
    rentalDeposit: 1000000,
    mainImage: 'https://images.pexels.com/photos/36478467/pexels-photo-36478467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/36478467/pexels-photo-36478467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['M', 'L'],
    colors: ['Trắng Tinh Khôi', 'Kem Ivory'],
    material: 'Lưới Voan Nhập Khẩu Pháp & Viền Ren Thêu Tay',
    style: 'Cathedral Royal Veil',
    occasion: 'Lễ Cưới Sánh Bước Lễ Đường Sảnh Khách Sạn',
    description: 'Khăn voan cưới chiều dài 3 mét kiêu sa, thêu ren hoa hồng viền chân tỉ mỉ. Khi cô dâu sải bước vào lễ đường, làn voan tung bay tựa thiên thần.',
    highlightFeatures: [
      'Độ dài 3m chuẩn Hoàng gia Châu Âu',
      'Đính gài lược kim loại chắc chắn dễ dàng cố định vào tóc',
      'Chất liệu voan siêu nhẹ không làm nặng tóc cô dâu'
    ],
    careInstructions: 'Hấp hơi nhẹ trước khi đeo.',
    status: 'In Stock',
    featured: false,
    isNew: false,
    rating: 5.0,
    viewCount: 640
  },
  {
    id: 'prod-7-1',
    sku: 'DP-NU-LUX-01',
    title: 'Đồng Phục Sơ Mi Lụa & Vest Nữ Công Sở Executive',
    slug: 'dong-phuc-so-mi-lua-vest-nu-cong-so',
    categoryId: 'cat-7-1',
    categoryName: 'Đồng phục công sở nữ',
    salePrice: 3500000,
    rentalPrice: 850000,
    rentalDeposit: 1500000,
    mainImage: 'https://images.pexels.com/photos/7697450/pexels-photo-7697450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/7697450/pexels-photo-7697450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      'https://images.pexels.com/photos/26741263/pexels-photo-26741263.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'May đo'],
    colors: ['Trắng Cream', 'Xanh Paste', 'Đen Thanh Lịch'],
    material: 'Lụa Mango Cao Cấp & Tuýt Si Hàn Quốc Chống Nhăn',
    style: 'Doanh Nhân Nữ Hiện Đại',
    occasion: 'Đồng Phục Công Ty, Hội Nghị, Gặp Đối Tác',
    description: 'Set đồng phục công sở nữ cao cấp gồm áo sơ mi lụa mềm mại kết hợp áo vest blazer chiết eo chuẩn phom. Chất liệu chống nhăn thoáng mát cả ngày dài.',
    highlightFeatures: [
      'Chất liệu lụa Mango cao cấp mềm mịn và mát dịu làn da',
      'Phom may chiết eo tỉ mỉ giúp tôn vóc dáng nữ công sở',
      'Áo vest 2 lớp đứng phom lịch sự sang trọng'
    ],
    careInstructions: 'Giặt máy chế độ nhẹ hoặc giặt tay. Ủi hơi nước nhiệt độ vừa.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 5.0,
    viewCount: 980
  },
  {
    id: 'prod-7-2',
    sku: 'DP-NAM-LUX-02',
    title: 'Set Đồng Phục Sơ Mi & Suit Nam Công Sở Premium',
    slug: 'set-dong-phuc-so-mi-suit-nam-cong-so',
    categoryId: 'cat-7-2',
    categoryName: 'Đồng phục công sở nam',
    salePrice: 4200000,
    rentalPrice: 950000,
    rentalDeposit: 2000000,
    mainImage: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: [
      'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'May đo'],
    colors: ['Trắng Tinh Khôi', 'Xanh Navy', 'Ghi Sáng'],
    material: 'Vải Kate Bamboo Kháng Khuẩn & Wool Pha Cao Cấp',
    style: 'Doanh Nhân Nam Lịch Lãm',
    occasion: 'Đồng Phục Văn Phòng, Sự Kiện Doanh Nghiệp',
    description: 'Đồng phục công sở nam phong cách Châu Âu hiện đại. Áo sơ mi Bamboo chống nhăn tuyệt đối kết hợp quần âu & áo vest sang trọng.',
    highlightFeatures: [
      'Chất vải Sơ mi Bamboo sợi tre thiên nhiên thoáng khí',
      'Quần âu may may đo đứng dáng chống nhăn nếp',
      'Phù hợp may đo số lượng lớn cho tập đoàn & công ty'
    ],
    careInstructions: 'Giặt nhẹ, giặt khô hấp nhẹ định hình phom dáng.',
    status: 'In Stock',
    featured: true,
    isNew: true,
    rating: 5.0,
    viewCount: 1150
  }
];

export const initialConsultations: ConsultationInquiry[] = [
  {
    id: 'inq-1',
    fullName: 'Nguyễn Thị Hồng Hạnh',
    phone: '0912345678',
    email: 'honghanh.wedding@gmail.com',
    preferredDate: '2026-04-15',
    preferredTime: '10:00 AM',
    serviceType: 'Thuê Áo Dài & Váy Cưới',
    productSku: 'AD-HOANGGIA-01',
    productTitle: 'Áo Dài Lụa Tơ Tằm "Phượng Hoàng Triều Cốc"',
    showroomBranch: 'Showroom 1: 88 Phố Tràng Tiền, Hà Nội',
    status: 'pending',
    notes: 'Em muốn thử áo dài đám hỏi và váy cưới cho đám cưới ngày 20/05/2026.',
    createdAt: '2026-03-28 09:30'
  },
  {
    id: 'inq-2',
    fullName: 'Trần Văn Hoàng',
    phone: '0987654321',
    email: 'hoangtran.ceo@gmail.com',
    preferredDate: '2026-04-18',
    preferredTime: '15:30 PM',
    serviceType: 'May Đo Thiết Kế Vest Cưới',
    productSku: 'VT-ITALIAN-03',
    productTitle: 'Bộ Vest Chú Rể "Royal Italian Tuxedo Black & Gold"',
    showroomBranch: 'Showroom 2: 168 Đồng Khởi, TP. Hồ Chí Minh',
    status: 'contacted',
    notes: 'Muốn đặt may vest tuxedo độc bản cho lễ cưới tại GEM Center.',
    createdAt: '2026-03-27 14:15'
  }
];

export const initialArticles: EditorialArticle[] = [
  {
    id: 'art-1',
    title: 'Xu Hướng Áo Dài Cưới 2026: Tinh Hoa Lụa Tơ Tằm & Đính Kết Hoàng Gia',
    slug: 'xu-huong-ao-dai-cuoi-2026',
    category: 'Xu Hướng Thời Trang',
    image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    date: '25 Tháng 03, 2026',
    excerpt: 'Khám phá sự trỗi dậy của chất liệu lụa tơ tằm Bảo Lộc kết hợp họa tiết cung đình thêu tay thủ công nâng tầm nét đẹp dịu dàng của cô dâu Việt.',
    readTime: '5 phút đọc',
    author: 'Giám Đốc Sáng Tạo Maison De Soie'
  },
  {
    id: 'art-2',
    title: 'Bí Quyết Chọn Váy Cưới Phù Hợp Với Dáng Người Dành Cho Cô Dâu',
    slug: 'bi-quyet-chon-vay-cuoi-phu-hop',
    category: 'Cẩm Nang Cưới',
    image: 'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    date: '20 Tháng 03, 2026',
    excerpt: 'Dù bạn sở hữu dáng đồng hồ cát, dáng quả lê hay bờ vai thanh mảnh, Maison De Soie sẽ giúp bạn tìm ra thiết kế tôn vinh vóc dáng tuyệt vời nhất.',
    readTime: '7 phút đọc',
    author: 'Stylist Cao Cấp'
  },
  {
    id: 'art-3',
    title: 'Quy Trình May Đo Vest Cưới Chuẩn Sartorial Ý Cho Chú Rể Thượng Lưu',
    slug: 'quy-trinh-may-do-vest-cuoi-y',
    category: 'Thời Trang Nam',
    image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    date: '15 Tháng 03, 2026',
    excerpt: 'Từ việc lựa chọn dòng vải Wool Super 150s đến từng mũi chỉ dựng canh dựng dựng phom 3D, hãy cùng khám phá hành trình tạo nên bộ suit đỉnh cao.',
    readTime: '6 phút đọc',
    author: 'Master Tailor'
  }
];

export const initialServicesList = [
  {
    id: 'srv-1',
    title: 'Cho Thuê & May Đo Áo Dài Couture VIP',
    subtitle: 'Lụa Tơ Tằm Bảo Lộc & Thêu Tay Hoàng Gia 3D',
    priceTag: 'Giá Thuê Từ 2.800.000đ',
    image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    description: 'Dịch vụ may đo và cho thuê Áo dài cưới, Áo dài lễ đám hỏi thượng hạng. Nghệ nhân 15 năm kinh nghiệm trực tiếp đo dáng và đính kết kim tuyến, pha lê thủ công.',
    features: [
      'Chất liệu lụa tơ tằm Bảo Lộc 100% tự nhiên',
      'Đo đạc tỉ mỉ theo 18 chỉ số cơ thể cô dâu',
      'Miễn phí chỉnh sửa phom dáng vừa vặn tuyệt đối',
      'Tặng kèm mấn đội đầu & túi bọc lụa cao cấp'
    ]
  },
  {
    id: 'srv-2',
    title: 'Váy Cưới Luxury Ballgown & Mermaid Couture',
    subtitle: 'Đính Kết Pha Lê Swarovski & Ren Pháp Độc Bản',
    priceTag: 'Giá Thuê Từ 5.500.000đ',
    image: 'https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    description: 'Bộ sưu tập váy cưới hoàng gia xoè lộng lẫy và váy cưới đuôi cá tôn dáng. Đính kết thủ công hàng ngàn viên pha lê Swarovski lấp lánh dưới ánh đèn lễ đường.',
    features: [
      'Tùng váy thiết kế 10 lớp voan cao cấp siêu nhẹ',
      'Khung gọng corset siết eo định hình đồng hồ cát',
      'Tặng kèm khăn voan dài thêu viền & vương miện',
      'Bảo quản túi chống bụi tiệt trùng tiêu chuẩn'
    ]
  },
  {
    id: 'srv-3',
    title: 'May Đo Âu Phục & Vest Cưới Chú Rể Sartorial',
    subtitle: 'Phong Thái Quý Ông Lịch Lãm Chuẩn Phom Ý',
    priceTag: 'Giá Thuê Từ 2.200.000đ',
    image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    description: 'Dịch vụ âu phục may đo và cho thuê Tuxedo chú rể. Dòng vải Wool nhập khẩu Ý thoáng mát, nẹp vai dựng canh sắc nét giúp chú rể tỏa sáng uy nghi.',
    features: [
      'Vải Wool Super 150s nhập khẩu trực tiếp từ Ý',
      'Cắt dựng phom dáng ôm tôn vai & thắt lưng',
      'Đầy đủ phụ kiện cà vạt, nơ cài, nơ cổ & nơ lưng',
      'Hỗ trợ chỉnh sửa chiều dài quần & tay áo trong 2 giờ'
    ]
  }
];

export const initialRentalProcessSteps = [
  {
    stepNumber: 1,
    title: 'Bước 1: Chọn Mẫu & Nhận Tư Vấn VIP',
    subtitle: 'Trải Nghiệm Catalogue Trực Tuyến Hoặc Tại Showroom',
    description: 'Khách hàng xem qua Catalogue trên website hoặc trực tiếp đến Showroom để chọn thiết kế Áo dài, Váy cưới phù hợp.',
    details: [
      'Stylist cá nhân hỗ trợ chọn trang phục theo tone da và vóc dáng',
      'Tư vấn phối phụ kiện mấn, khăn voan và trang sức đi kèm'
    ]
  },
  {
    stepNumber: 2,
    title: 'Bước 2: Thử Đồ & Chỉnh Sửa Phom Dáng',
    subtitle: 'May Đo Chỉnh Sửa Vừa Vặn 100%',
    description: 'Chuyên viên kỹ thuật tiến hành đo đạc và điều chỉnh eo, ngực, chiều dài váy vừa khít với cơ thể khách hàng.',
    details: [
      'Hỗ trợ bóp eo, lên gấu quần/váy hoàn toàn miễn phí',
      'Thử đồ trực tiếp tại phòng VIP có gương 360 độ'
    ]
  },
  {
    stepNumber: 3,
    title: 'Bước 3: Nhận Trang Phục & Đặt Cọc',
    subtitle: 'Đóng Gói Tiệt Trùng & Giao Nhận An Toàn',
    description: 'Trang phục được giặt khô tiệt trùng, là hơi phẳng và đóng gói trong túi lụa cao cấp kèm biên bản niêm phong.',
    details: [
      'Thời gian thuê chuẩn 3 ngày (hoặc nới lỏng theo nhu cầu)',
      'Đặt cọc linh hoạt bằng giấy tờ tùy thân hoặc chuyển khoản'
    ]
  },
  {
    stepNumber: 4,
    title: 'Bước 4: Trả Trang Phục & Hoàn Cọc',
    subtitle: 'Nhanh Chóng - Tiện Lợi - Không Phát Sinh Phí',
    description: 'Khách hàng hoàn trả trang phục sau sự kiện. Kiểm tra tình trạng sản phẩm và nhận lại 100% tiền cọc lập tức.',
    details: [
      'Nhân viên tiếp nhận trả hàng trong 5 phút',
      'Hoàn cọc tức thì qua tài khoản ngân hàng hoặc tiền mặt'
    ]
  }
];

export const initialPricingPolicies = [
  {
    id: 'prc-1',
    category: 'Áo Dài Truyền Thống & Cách Tân VIP',
    rental3DaysPrice: '2.800.000đ - 4.500.000đ',
    rental7DaysPrice: '4.200.000đ - 6.800.000đ',
    depositRate: '3.000.000đ / bộ',
    tailorPrice: '12.000.000đ - 22.000.000đ'
  },
  {
    id: 'prc-2',
    category: 'Váy Cưới Luxury Ballgown & Couture',
    rental3DaysPrice: '5.500.000đ - 12.000.000đ',
    rental7DaysPrice: '8.500.000đ - 18.000.000đ',
    depositRate: '5.000.000đ - 10.000.000đ / bộ',
    tailorPrice: '25.000.000đ - 65.000.000đ'
  },
  {
    id: 'prc-3',
    category: 'Vest Cưới Chú Rể Sartorial Ý',
    rental3DaysPrice: '2.200.000đ - 3.800.000đ',
    rental7DaysPrice: '3.500.000đ - 5.500.000đ',
    depositRate: '2.000.000đ / bộ',
    tailorPrice: '9.500.000đ - 18.000.000đ'
  }
];

