// ==========================================================================
// Mảnh Ghép Platform - Main Application Logic & AI Simulator Engine
// ==========================================================================

// --- State Management ---
const AppState = {
  // REQUIREMENT 2: Khi mới mở web, người dùng ở trạng thái KHÁCH (chưa đăng nhập)
  isLoggedIn: false,
  currentUser: null,

  currentFilter: "all",
  currentNeed: "all",
  searchKeyword: "",
  searchRadiusKm: 10,
  
  // Real-time AI draft state
  aiDraft: {
    role: "Chưa xác định",
    need: "Chưa nhận diện",
    location: "Huyện Hoài Đức, Hà Nội",
    isApproved: false,
    moderationReason: ""
  },

  // REQUIREMENT 3: Tất cả bài viết mẫu khởi tạo ban đầu đều được gắn flag `isTestPost: true` (Bài viết kiểm thử)
  posts: [
    {
      id: "post-101",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "Chị Mai Hương",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        badge: "Người cho tặng",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "25 phút trước",
      location: "Xã An Khánh, Hoài Đức, Hà Nội",
      district: "Hoài Đức",
      roleType: "giveaway", // giveaway | help-needed | charity-org | campaign
      needCategory: "Quần áo",
      title: "Tặng 3 thùng quần áo ấm trẻ em (3 - 8 tuổi) và chăn nỉ còn rất mới",
      content: "Nhà mình dọn tủ chuẩn bị cho mùa đông mới, có phân loại được 3 thùng quần áo ấm bé trai bé gái từ 3 đến 8 tuổi, áo phao, áo len và 2 chăn nỉ. Quần áo đều đã được giặt sạch thơm tho. Ưu tiên tặng các gia đình công nhân khó khăn hoặc nhóm thiện nguyện gom đồ gửi vùng cao. Ai cần liên hệ mình để qua lấy nhé ạ!",
      images: [
        "https://images.unsplash.com/photo-1525562723836-d65714259988?w=800&h=500&fit=crop"
      ],
      aiTags: ["Tặng đồ 0đ", "Quần áo ấm", "Hoài Đức (Gần bạn)"],
      isNearby: true,
      likes: 42,
      isLiked: false,
      shares: 18,
      comments: [
        {
          id: "c1",
          author: "Trần Văn Bình",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
          text: "Chị ơi em ở gần khu Thiên Đường Bảo Sơn, em xin cho 2 bé nhà em được không ạ?",
          timeAgo: "15 phút trước"
        },
        {
          id: "c2",
          author: "CLB Áo Ấm Biên Cương",
          avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=80&h=80&fit=crop",
          text: "Dạ CLB chúng em cuối tuần này có chuyến xe lên Nậm Ban - Lai Châu, nếu chị chưa tặng ai thì xin được gom chung ạ!",
          timeAgo: "8 phút trước"
        }
      ]
    },
    {
      id: "post-102",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "Chú Tuấn (Bảo mật tên thật)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        badge: "Người cần giúp đỡ",
        isVerified: true,
        isAnonymous: true
      },
      timeAgo: "1 giờ trước",
      location: "Khu đô thị Nam An Khánh, Hoài Đức, Hà Nội",
      district: "Hoài Đức",
      roleType: "help-needed",
      needCategory: "Y tế",
      title: "Cần xin xe lăn cũ hoặc nạng tập đi cho con gái hồi phục chấn thương",
      content: "Chào cộng đồng, tôi chạy xe ôm quanh khu Hoài Đức, đợt này bé nhà tôi không may bị tai nạn gãy chân phải bó bột nằm viện. Gia đình kinh tế khó khăn, bác sĩ bảo cần nạng hoặc xe lăn để tập đi phục hồi chức năng trong 2-3 tháng. Anh chị nào có xe lăn cũ hoặc nạng nách không dùng nữa cho tôi xin hoặc mượn lại một thời gian, gia đình vô cùng biết ơn!",
      images: [
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=500&fit=crop"
      ],
      aiTags: ["Cần trợ giúp khẩn", "Dụng cụ Y tế", "Đã xác minh hoàn cảnh"],
      isNearby: true,
      likes: 88,
      isLiked: false,
      shares: 34,
      comments: [
        {
          id: "c3",
          author: "Bác Sĩ Dũng",
          avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop",
          text: "Phòng khám mình ở Vân Canh có đôi nạng nhôm mới 90%, chú qua mình tặng miễn phí cho cháu nhé!",
          timeAgo: "30 phút trước"
        }
      ]
    },
    {
      id: "post-103",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "CLB Thiện Nguyện Kết Nối Yêu Thương",
        avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100&h=100&fit=crop",
        badge: "Tổ chức gom đồ từ thiện",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "3 giờ trước",
      location: "Điểm tiếp nhận: Đường Cầu Giấy & Hoài Đức, Hà Nội",
      district: "Hà Nội",
      roleType: "charity-org",
      needCategory: "Quần áo",
      title: "Điểm tiếp nhận gom đồ cũ: Quần áo ấm, chăn bông, giày ủng ủng hộ học sinh Mèo Vạc",
      content: "Chương trình 'Đông Ấm Cho Em 2026' của CLB chính thức khởi động. Chúng tôi nhận gom tất cả các loại đồ dùng cũ còn sử dụng tốt: Quần áo mùa đông mọi lứa tuổi, chăn màn, áo khoác dày, giày dép, ủng đi mưa. Tình nguyện viên của nhóm có thể hỗ trợ đến tận nhà chở đồ nếu cô chú anh chị ở khu vực Hoài Đức, Cầu Giấy, Nam Từ Liêm gom được từ 2 bao trở lên.",
      images: [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop"
      ],
      aiTags: ["Tổ chức uy tín", "Gom đồ từ thiện", "Quy mô lớn"],
      isNearby: true,
      likes: 156,
      isLiked: false,
      shares: 72,
      comments: []
    },
    {
      id: "post-104",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "Cô giáo Hồng Liên",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
        badge: "Người cần hỗ trợ",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "5 giờ trước",
      location: "Xã Kim Chung, Hoài Đức, Hà Nội",
      district: "Hoài Đức",
      roleType: "help-needed",
      needCategory: "Sách vở",
      title: "Tìm xin bộ sách giáo khoa lớp 4 (bộ Kết Nối Tri Thức) và vở viết cho 2 học sinh nghèo",
      content: "Em chào các bố mẹ. Trong lớp em chủ nhiệm có 2 em hoàn cảnh mồ côi bố, mẹ làm thuê nuôi 3 con nên đến nay vẫn còn thiếu sách giáo khoa và đồ dùng học tập. Em đang tìm xin lại bộ sách lớp 4 cũ và vài tập vở viết. Ba mẹ nào có con đã học xong lớp 4 năm ngoái không dùng nữa xin cho 2 em nhé. Em xin thay mặt gia đình cảm ơn rất nhiều!",
      images: [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop"
      ],
      aiTags: ["Dụng cụ học sinh", "Sách giáo khoa", "Hoài Đức"],
      isNearby: true,
      likes: 67,
      isLiked: false,
      shares: 21,
      comments: []
    },
    {
      id: "post-105",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "Gia đình anh Hải",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        badge: "Người cho tặng",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "8 giờ trước",
      location: "Phường La Khê, Quận Hà Đông, Hà Nội",
      district: "Hà Đông",
      roleType: "giveaway",
      needCategory: "Đồ gia dụng",
      title: "Tặng lại bàn học sinh kèm giá sách gỗ thông và quạt cây cũ còn dùng tốt",
      content: "Nhà em sắp sửa lại phòng nên thừa ra 1 bộ bàn học sinh cho bé (có giá sách liền) và 1 quạt cây Asia hoạt động bình thường. Tặng bạn sinh viên hoặc gia đình nào có con nhỏ đang cần. Do đồ gỗ hơi nặng nên nhờ các bác tự gọi xe ba gác hoặc qua tự chở giúp em ạ.",
      images: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop"
      ],
      aiTags: ["Tặng đồ gia dụng", "Quà 0 đồng", "Hà Đông"],
      isNearby: false,
      likes: 31,
      isLiked: false,
      shares: 9,
      comments: []
    },
    {
      id: "post-106",
      isTestPost: true, // <--- BÀI VIẾT KIỂM THỬ
      author: {
        name: "Quỹ Bác Ái Hy Vọng (Đại diện Bệnh Viện)",
        avatar: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=100&h=100&fit=crop",
        badge: "Kêu gọi quyên góp viện phí",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "1 ngày trước",
      location: "Khoa Tim Mạch, Hà Nội",
      district: "Hà Nội",
      roleType: "campaign",
      needCategory: "Tài chính",
      title: "Tiếp sức viện phí mổ tim gấp cho bé An (8 tháng tuổi, quê Điện Biên)",
      content: "Bé An phát hiện dị tật tim bẩm sinh phức tạp, cần phẫu thuật khẩn cấp. Bố mẹ làm nương rẫy, đã vay mượn khắp nơi nhưng vẫn thiếu 25 triệu chi phí ngoài bảo hiểm y tế. Hồ sơ bệnh án và xác nhận viện phí đã được bệnh viện và ban quản trị AI Mảnh Ghép xác thực 100%. Mọi đóng góp trực tiếp vào tài khoản minh bạch của bệnh viện.",
      images: [
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=500&fit=crop"
      ],
      aiTags: ["Xác thực viện phí 100%", "Kêu gọi khẩn cấp", "Quỹ minh bạch"],
      isNearby: false,
      likes: 320,
      isLiked: false,
      shares: 245,
      comments: []
    }
  ]
};

// --- Preset Testing Post Samples ---
const samplePosts = {
  giveaway: {
    title: "Tặng 3 bao quần áo ấm trẻ em từ 3 - 8 tuổi và sách vở cũ",
    content: "Mình ở gần ngã tư Trạm Trôi, huyện Hoài Đức. Có 3 bao quần áo mùa đông còn lành lặn, sạch sẽ của các bé không dùng tới nữa muốn tặng lại cho ai thực sự khó khăn hoặc tổ chức thiện nguyện đến lấy mang đi cứu trợ bà con vùng cao.",
    image: "https://images.unsplash.com/photo-1525562723836-d65714259988?w=800&h=500&fit=crop"
  },
  help: {
    title: "Cần xin sách giáo khoa lớp 4 và bộ đồ dùng học tập cho con",
    content: "Gia đình em mới chuyển về thuê trọ ở khu vực An Khánh Hoài Đức. Chồng em đau ốm, em bán vé số dạo, cháu năm nay lên lớp 4 mà chưa có sách học và cặp sách. Có bố mẹ nào con học xong lớp 4 cho em xin lại sách cũ với ạ. Em xin cảm ơn rất nhiều!",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop"
  },
  spam: {
    title: "Bán xả kho áo gió nam nữ giá chỉ 99k freeship toàn quốc!",
    content: "Xưởng may thanh lý lô áo khoác giá rẻ giật mình 99k. Mua 2 chiếc miễn phí giao hàng tận nhà. Hàng VNXK cao cấp bao đẹp bao đổi trả. Ai mua ib Zalo 0912345678 chốt đơn ngay kẻo hết size!",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=500&fit=crop"
  }
};

// ==========================================================================
// REQUIREMENT 2: AUTHENTICATION FLOW (Guest -> Logged In)
// ==========================================================================

function updateAuthUI() {
  const guestAuthNav = document.getElementById("guestAuthNav");
  const userProfileButton = document.getElementById("userProfileButton");
  const guestSidebarCard = document.getElementById("guestSidebarCard");
  const userSidebarCard = document.getElementById("userSidebarCard");
  const composerAvatar = document.getElementById("composerUserAvatar");

  if (AppState.isLoggedIn && AppState.currentUser) {
    // Show logged-in UI
    if (guestAuthNav) guestAuthNav.classList.add("hidden");
    if (userProfileButton) {
      userProfileButton.classList.remove("hidden");
      userProfileButton.classList.add("flex");
    }
    if (guestSidebarCard) guestSidebarCard.classList.add("hidden");
    if (userSidebarCard) userSidebarCard.classList.remove("hidden");

    // Populate user info
    const headerAvatar = document.getElementById("headerUserAvatar");
    const headerName = document.getElementById("headerUserName");
    const headerRole = document.getElementById("headerUserRole");
    const leftAvatar = document.getElementById("leftUserAvatar");
    const leftName = document.getElementById("leftUserName");
    const leftLoc = document.getElementById("leftUserLocation");

    if (headerAvatar) headerAvatar.src = AppState.currentUser.avatar;
    if (headerName) headerName.textContent = AppState.currentUser.name;
    if (headerRole) headerRole.textContent = AppState.currentUser.role;
    if (leftAvatar) leftAvatar.src = AppState.currentUser.avatar;
    if (leftName) leftName.textContent = AppState.currentUser.name;
    if (leftLoc) leftLoc.textContent = AppState.currentUser.location;
    if (composerAvatar) composerAvatar.src = AppState.currentUser.avatar;

  } else {
    // Show guest/visitor UI (Trang chủ chung)
    if (guestAuthNav) guestAuthNav.classList.remove("hidden");
    if (userProfileButton) {
      userProfileButton.classList.add("hidden");
      userProfileButton.classList.remove("flex");
    }
    if (guestSidebarCard) guestSidebarCard.classList.remove("hidden");
    if (userSidebarCard) userSidebarCard.classList.add("hidden");

    if (composerAvatar) {
      composerAvatar.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop";
    }
  }
}

function handleCreatePostClick(presetRole) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập bằng Google hoặc Số điện thoại để đăng bài kết nối an toàn!", "info");
    openAuthModal();
    return;
  }
  openCreatePostModal(presetRole);
}

function simulateGoogleLogin() {
  AppState.isLoggedIn = true;
  AppState.currentUser = {
    name: "Vũ Thu Trang",
    email: "vuthutrang.social@gmail.com",
    phone: "0987 *** 892",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    location: "Huyện Hoài Đức, Hà Nội",
    role: "Người hỗ trợ (Hoài Đức)",
    isAnonymous: false,
    learnedInterests: ["Quần áo", "Hoài Đức"]
  };

  updateAuthUI();
  closeAuthModal();
  showToast("🎉 Đăng nhập Google thành công! Thông tin cá nhân của bạn được bảo mật 100%.", "success");
}

function simulateSendOTP() {
  const phoneVal = document.getElementById("authPhoneInput").value.trim();
  if (!phoneVal) {
    showToast("Vui lòng nhập số điện thoại bảo mật!", "error");
    return;
  }

  AppState.isLoggedIn = true;
  AppState.currentUser = {
    name: "Người dùng (" + phoneVal.substring(0, 4) + " ***)",
    email: "user.mobile@security.local",
    phone: phoneVal.substring(0, 4) + " *** " + phoneVal.slice(-3),
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=faces",
    location: document.getElementById("userLocationSelect").value || "Huyện Hoài Đức, Hà Nội",
    role: "Thành viên Mảnh Ghép",
    isAnonymous: false,
    learnedInterests: ["Đồ cũ", "Hoài Đức"]
  };

  updateAuthUI();
  closeAuthModal();
  showToast("🎉 Xác thực số điện thoại OTP thành công! Dữ liệu được mã hóa bảo mật 100%.", "success");
}

function logoutUser() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  updateAuthUI();
  showToast("Đã đăng xuất an toàn khỏi nền tảng Mảnh Ghép.", "info");
}

function openProfileDropdown() {
  if (AppState.isLoggedIn) {
    openAuthModal();
  }
}

// ==========================================================================
// AI RECOGNITION & CONTENT MODERATION ENGINE
// ==========================================================================

function analyzePostWithAI(title, content) {
  const text = (title + " " + content).toLowerCase();
  const currentLoc = AppState.currentUser ? AppState.currentUser.location : "Huyện Hoài Đức, Hà Nội";
  
  if (!text.trim() || text.trim().length < 10) {
    return {
      role: "Chưa đủ dữ liệu",
      roleType: "giveaway",
      need: "Chưa nhận diện",
      location: currentLoc,
      isApproved: false,
      reason: "Vui lòng nhập ít nhất 10 ký tự để AI Mảnh Ghép có thể phân tích nội dung."
    };
  }

  // 1. AI Content Moderation Check (Kiểm duyệt chống spam/bán hàng thương mại)
  const spamKeywords = [
    "bán", "giá rẻ", "freeship", "chốt đơn", "xả kho", "vnxk", "thanh lý giá",
    "mua 1 tặng 1", "liên hệ mua", "order", "inbox giá", "bảo hiểm", "vay tiền",
    "vay vốn", "lãi suất", "tiền nhanh", "hoa hồng", "đầu tư", "tiền ảo"
  ];
  
  let isSpam = false;
  let detectedSpamWord = "";
  for (const word of spamKeywords) {
    if (text.includes(word)) {
      isSpam = true;
      detectedSpamWord = word;
      break;
    }
  }

  if (isSpam) {
    return {
      role: "🚫 Không hợp lệ",
      roleType: "rejected",
      need: "Thương mại / Bán hàng",
      location: currentLoc,
      isApproved: false,
      reason: `❌ TỪ CHỐI DUYỆT: AI phát hiện từ khóa mang tính bán hàng/thương mại ("${detectedSpamWord}"). Mảnh Ghép chỉ dành riêng cho việc chia sẻ trợ giúp và thiện nguyện phi lợi nhuận!`
    };
  }

  // 2. AI Role Classification (Phân loại đối tượng)
  let role = "Người cho tặng đồ";
  let roleType = "giveaway";

  const helpKeywords = ["cần xin", "xin", "cần giúp", "khó khăn", "thiếu", "đau ốm", "bệnh tật", "không có tiền", "hoàn cảnh", "cần mượn"];
  const orgKeywords = ["clb", "tổ chức", "nhóm thiện nguyện", "gom đồ", "chuyến xe", "tiếp nhận", "phát động", "tình nguyện viên"];
  const campaignKeywords = ["quyên góp", "kêu gọi", "viện phí", "mổ tim", "ung thư", "bão lũ", "cứu trợ", "quỹ"];

  if (campaignKeywords.some(kw => text.includes(kw))) {
    role = "Kêu gọi quyên góp cứu trợ";
    roleType = "campaign";
  } else if (orgKeywords.some(kw => text.includes(kw))) {
    role = "Tổ chức gom đồ từ thiện";
    roleType = "charity-org";
  } else if (helpKeywords.some(kw => text.includes(kw))) {
    role = "Người đang cần trợ giúp";
    roleType = "help-needed";
  } else {
    role = "Người hỗ trợ / Cho tặng đồ (0đ)";
    roleType = "giveaway";
  }

  // 3. AI Needs Recognition (Nhận diện nhu yếu phẩm)
  let need = "Nhu cầu chung";
  if (/quần áo|áo ấm|áo khoác|giày|dép|chăn|màn|quần|áo len/.test(text)) {
    need = "Quần áo & Giày dép";
  } else if (/sách|giáo khoa|vở|bút|cặp|dụng cụ học tập|học sinh/.test(text)) {
    need = "Sách vở & Học tập";
  } else if (/xe lăn|nạng|thuốc|bệnh viện|viện phí|y tế|chấn thương/.test(text)) {
    need = "Y tế & Thiết bị hỗ trợ";
  } else if (/gạo|mì tôm|lương thực|thực phẩm|sữa|cơm/.test(text)) {
    need = "Lương thực & Thực phẩm";
  } else if (/bàn|ghế|tủ|quạt|tủ lạnh|nồi cơm|xe đạp|đồ gia dụng/.test(text)) {
    need = "Đồ gia dụng & Phương tiện";
  } else if (/tiền|kinh phí|chi phí/.test(text)) {
    need = "Hỗ trợ tài chính / Viện phí";
  }

  // 4. AI Safe Location Extraction & Privacy Masking
  let safeLocation = currentLoc;
  if (/hoài đức|an khánh|trạm trôi|vân canh|kim chung|song phương/.test(text)) {
    safeLocation = "Huyện Hoài Đức, Hà Nội (Đã bảo mật)";
  } else if (/hà đông|la khê|mộ lao|văn quán/.test(text)) {
    safeLocation = "Quận Hà Đông, Hà Nội (Đã bảo mật)";
  } else if (/nam từ liêm|mỹ đình|tây mỗ|đại mỗ/.test(text)) {
    safeLocation = "Quận Nam Từ Liêm, Hà Nội (Đã bảo mật)";
  } else if (/cầu giấy/.test(text)) {
    safeLocation = "Quận Cầu Giấy, Hà Nội (Đã bảo mật)";
  }

  return {
    role,
    roleType,
    need,
    location: safeLocation,
    isApproved: true,
    reason: "✅ ĐẠT TIÊU CHUẨN: Bài viết hướng đến kết nối tương trợ nhân văn, tuân thủ tôn chỉ Mảnh Ghép và đã được bảo vệ quyền riêng tư vị trí."
  };
}

// Triggered when user types in post inputs
function triggerAIAnalysis() {
  const title = document.getElementById("postTitleInput").value;
  const content = document.getElementById("postContentInput").value;

  const result = analyzePostWithAI(title, content);
  AppState.aiDraft = result;

  // Update UI Elements in Modal
  const statusEl = document.getElementById("aiAnalysisStatus");
  const roleEl = document.getElementById("aiDetectedRole");
  const needEl = document.getElementById("aiDetectedNeed");
  const locEl = document.getElementById("aiDetectedLocation");
  const verdictDetailEl = document.getElementById("aiVerdictDetail");
  const verdictBoxEl = document.getElementById("aiModerationVerdict");
  const btnPublish = document.getElementById("btnPublishPost");
  const currentLoc = AppState.currentUser ? AppState.currentUser.location : "Huyện Hoài Đức, Hà Nội";

  if (!title && !content) {
    statusEl.textContent = "Chờ nhập nội dung...";
    statusEl.className = "text-[11px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-mono";
    roleEl.innerHTML = `<i class="fa-solid fa-question text-xs text-slate-400"></i> <span>Chưa xác định</span>`;
    needEl.innerHTML = `<i class="fa-solid fa-tags text-xs text-slate-400"></i> <span>Chưa nhận diện</span>`;
    locEl.innerHTML = `<i class="fa-solid fa-location-dot text-xs text-rose-400"></i> <span>${currentLoc}</span>`;
    verdictDetailEl.textContent = "Hãy nhập nội dung bài viết. AI sẽ tự động phân tích đối tượng, nhu cầu và kiểm duyệt tính nhân đạo.";
    verdictBoxEl.className = "p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-start gap-2.5";
    btnPublish.disabled = false;
    btnPublish.classList.remove("opacity-50", "cursor-not-allowed");
    return;
  }

  statusEl.textContent = "AI Đang xử lý realtime";
  statusEl.className = "text-[11px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-mono animate-pulse";

  roleEl.innerHTML = `<i class="fa-solid fa-user-check text-xs text-emerald-400"></i> <span class="truncate">${result.role}</span>`;
  needEl.innerHTML = `<i class="fa-solid fa-box-open text-xs text-teal-400"></i> <span class="truncate">${result.need}</span>`;
  locEl.innerHTML = `<i class="fa-solid fa-shield-halved text-xs text-blue-400"></i> <span class="truncate">${result.location}</span>`;

  verdictDetailEl.textContent = result.reason;

  if (result.isApproved) {
    verdictBoxEl.className = "p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs flex items-start gap-2.5";
    btnPublish.disabled = false;
    btnPublish.classList.remove("opacity-50", "cursor-not-allowed", "bg-slate-400");
    btnPublish.classList.add("bg-brand-600", "hover:bg-brand-700");
  } else {
    verdictBoxEl.className = "p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs flex items-start gap-2.5";
    btnPublish.disabled = true;
    btnPublish.classList.add("opacity-50", "cursor-not-allowed", "bg-slate-400");
    btnPublish.classList.remove("bg-brand-600", "hover:bg-brand-700");
  }
}

// Quick Sample Post Loader
function loadSamplePost(type) {
  const sample = samplePosts[type];
  if (!sample) return;

  document.getElementById("postTitleInput").value = sample.title;
  document.getElementById("postContentInput").value = sample.content;
  document.getElementById("postImageUrlInput").value = sample.image;
  previewPostImage(sample.image);

  triggerAIAnalysis();
  showToast(`Đã nạp bài thử nghiệm AI: "${sample.title.substring(0, 30)}..."`, "info");
}

function loadRandomItemImage() {
  const images = [
    "https://images.unsplash.com/photo-1525562723836-d65714259988?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop"
  ];
  const chosen = images[Math.floor(Math.random() * images.length)];
  document.getElementById("postImageUrlInput").value = chosen;
  previewPostImage(chosen);
}

function previewPostImage(url) {
  const container = document.getElementById("imagePreviewContainer");
  const img = document.getElementById("imagePreviewElement");
  if (url && url.trim().length > 5) {
    img.src = url.trim();
    container.classList.remove("hidden");
  } else {
    container.classList.add("hidden");
  }
}

function removePostImage() {
  document.getElementById("postImageUrlInput").value = "";
  document.getElementById("imagePreviewContainer").classList.add("hidden");
}

// ==========================================================================
// FEED RENDERING & FILTERING
// ==========================================================================

function renderFeed() {
  const container = document.getElementById("postsFeedContainer");
  const emptyState = document.getElementById("emptyFeedState");
  container.innerHTML = "";

  // Apply filters
  let filtered = AppState.posts.filter(post => {
    // 1. Category Filter
    if (AppState.currentFilter === "nearby" && !post.isNearby) return false;
    if (AppState.currentFilter === "giveaway" && post.roleType !== "giveaway") return false;
    if (AppState.currentFilter === "help-needed" && post.roleType !== "help-needed") return false;
    if (AppState.currentFilter === "charity-org" && post.roleType !== "charity-org") return false;
    if (AppState.currentFilter === "campaign" && post.roleType !== "campaign") return false;
    
    // AI Suggested filter
    if (AppState.currentFilter === "ai-suggested") {
      const interests = (AppState.currentUser && AppState.currentUser.learnedInterests) ? AppState.currentUser.learnedInterests : ["Quần áo", "Hoài Đức"];
      const matchesInterest = interests.some(kw => 
        post.needCategory.toLowerCase().includes(kw.toLowerCase()) ||
        post.title.toLowerCase().includes(kw.toLowerCase()) ||
        post.content.toLowerCase().includes(kw.toLowerCase())
      );
      if (!matchesInterest && !post.isNearby) return false;
    }

    // 2. Specific Need Category Filter
    if (AppState.currentNeed !== "all") {
      if (!post.needCategory.toLowerCase().includes(AppState.currentNeed.toLowerCase())) {
        return false;
      }
    }

    // 3. Search Keyword
    if (AppState.searchKeyword.trim()) {
      const q = AppState.searchKeyword.toLowerCase().trim();
      const inTitle = post.title.toLowerCase().includes(q);
      const inContent = post.content.toLowerCase().includes(q);
      const inLoc = post.location.toLowerCase().includes(q);
      const inTags = post.aiTags.some(t => t.toLowerCase().includes(q));
      if (!inTitle && !inContent && !inLoc && !inTags) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    filtered.forEach(post => {
      container.appendChild(createPostCardElement(post));
    });
  }

  updateCategoryCounts();
}

// REQUIREMENT 3: Hiển thị ghi chú "Bài viết kiểm thử" cho các bài mẫu, còn bài người dùng thật thì KHÔNG có
function createPostCardElement(post) {
  const card = document.createElement("article");
  card.className = "post-card bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 relative";
  card.id = `card-${post.id}`;

  // Role Badge Styling
  let badgeColorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let badgeIcon = "fa-gift";
  if (post.roleType === "help-needed") {
    badgeColorClass = "bg-amber-50 text-amber-800 border-amber-200";
    badgeIcon = "fa-hand-holding-heart";
  } else if (post.roleType === "charity-org") {
    badgeColorClass = "bg-indigo-50 text-indigo-700 border-indigo-200";
    badgeIcon = "fa-boxes-packing";
  } else if (post.roleType === "campaign") {
    badgeColorClass = "bg-rose-50 text-rose-700 border-rose-200";
    badgeIcon = "fa-bullhorn";
  }

  // Tags HTML
  const tagsHtml = post.aiTags.map(tag => `
    <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">#${tag}</span>
  `).join("");

  // REQUIREMENT 3: Đánh dấu bài viết kiểm thử rõ ràng
  let testPostBadgeHtml = "";
  if (post.isTestPost) {
    testPostBadgeHtml = `
      <span class="text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs" title="Đây là bài viết dữ liệu mẫu để kiểm thử tính năng của hệ thống">
        <i class="fa-solid fa-flask-vial text-[10px] text-amber-700"></i>
        <span>Bài viết kiểm thử</span>
      </span>
    `;
  } else {
    testPostBadgeHtml = `
      <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs" title="Bài viết do người dùng thật đăng tải đã qua AI kiểm duyệt">
        <i class="fa-solid fa-circle-check text-[10px] text-emerald-600"></i>
        <span>Bài viết cộng đồng</span>
      </span>
    `;
  }

  // Images HTML
  let imageSection = "";
  if (post.images && post.images.length > 0) {
    imageSection = `
      <div class="mt-3 rounded-2xl overflow-hidden border border-slate-100 max-h-96 bg-slate-50">
        <img src="${post.images[0]}" alt="Hình ảnh bài đăng" class="w-full object-cover max-h-96 hover:scale-101 transition duration-300">
      </div>
    `;
  }

  // Comments HTML
  const commentsHtml = post.comments.map(c => `
    <div class="flex items-start gap-2.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
      <img src="${c.avatar}" class="w-7 h-7 rounded-full object-cover shrink-0" alt="${c.author}">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800">${c.author}</span>
          <span class="text-[10px] text-slate-400">${c.timeAgo}</span>
        </div>
        <p class="text-slate-600 mt-0.5">${c.text}</p>
      </div>
    </div>
  `).join("");

  card.innerHTML = `
    <!-- Post Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <img src="${post.author.avatar}" class="w-11 h-11 rounded-full object-cover border border-slate-200" alt="${post.author.name}">
        <div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <h4 class="font-bold text-slate-900 text-sm hover:text-brand-600 cursor-pointer transition">${post.author.name}</h4>
            ${post.author.isVerified ? `<i class="fa-solid fa-circle-check text-blue-500 text-xs" title="Đã xác minh số điện thoại"></i>` : ""}
            ${post.author.isAnonymous ? `<span class="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">Bảo mật</span>` : ""}
          </div>
          
          <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>${post.timeAgo}</span>
            <span>•</span>
            <span class="flex items-center gap-1 text-slate-600 truncate max-w-[200px]" title="${post.location}">
              <i class="fa-solid fa-location-dot text-rose-500 text-[10px]"></i>
              ${post.location}
            </span>
          </div>
        </div>
      </div>

      <!-- AI Detected Role Badge -->
      <span class="text-xs px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5 shrink-0 ${badgeColorClass}">
        <i class="fa-solid ${badgeIcon} text-[10px]"></i>
        <span>${post.author.badge}</span>
      </span>
    </div>

    <!-- AI Tagging Strip & Test Post Indicator -->
    <div class="flex items-center gap-1.5 flex-wrap mt-3">
      ${testPostBadgeHtml}
      <span class="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
        <i class="fa-solid fa-sparkles text-[9px] text-amber-500"></i> AI Đã Duyệt
      </span>
      <span class="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
        ${post.needCategory}
      </span>
      ${tagsHtml}
    </div>

    <!-- Post Title & Content -->
    <div class="mt-3">
      <h3 class="font-extrabold text-slate-900 text-base leading-snug mb-1.5">${post.title}</h3>
      <p class="text-slate-700 text-sm leading-relaxed whitespace-pre-line">${post.content}</p>
    </div>

    ${imageSection}

    <!-- Post Engagement Counts -->
    <div class="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
      <div class="flex items-center gap-1.5">
        <span class="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
          <i class="fa-solid fa-heart"></i>
        </span>
        <span id="like-count-${post.id}" class="font-semibold text-slate-700">${post.likes}</span> người quan tâm
      </div>
      <div class="flex items-center gap-3">
        <span>${post.comments.length} bình luận</span>
        <span>${post.shares} chia sẻ</span>
      </div>
    </div>

    <!-- Post Action Buttons -->
    <div class="grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
      
      <!-- Care / Like Button -->
      <button onclick="toggleLike('${post.id}')" id="btn-like-${post.id}" class="py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition ${post.isLiked ? 'text-rose-600 font-bold' : ''}">
        <i class="${post.isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-sm"></i>
        <span>${post.isLiked ? 'Đã quan tâm' : 'Quan tâm'}</span>
      </button>

      <!-- Comment Toggle Button -->
      <button onclick="toggleCommentsSection('${post.id}')" class="py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition">
        <i class="fa-regular fa-comment-dots text-sm text-slate-500"></i>
        <span>Bình luận</span>
      </button>

      <!-- Share Button -->
      <button onclick="openShareModal('${post.id}')" class="py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition">
        <i class="fa-solid fa-share-nodes text-sm text-slate-500"></i>
        <span>Chia sẻ</span>
      </button>

      <!-- Safe Connect Action Button -->
      <button onclick="handleSafeConnectClick('${post.id}')" class="py-1.5 px-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-1 transition shadow-sm">
        <i class="fa-solid fa-hand-holding-heart text-xs"></i>
        <span class="truncate">${post.roleType === 'giveaway' ? 'Xin nhận' : 'Giúp đỡ'}</span>
      </button>
    </div>

    <!-- Comments Section Accordion -->
    <div id="comments-section-${post.id}" class="hidden mt-3 pt-3 border-t border-slate-100 space-y-2.5">
      <div class="space-y-2" id="comments-list-${post.id}">
        ${commentsHtml}
      </div>

      <!-- Add New Comment Input -->
      <div class="flex items-center gap-2 pt-1">
        <img src="${AppState.currentUser ? AppState.currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}" class="w-7 h-7 rounded-full object-cover shrink-0" alt="Avatar">
        <input 
          type="text" 
          id="comment-input-${post.id}" 
          placeholder="${AppState.isLoggedIn ? 'Viết bình luận sẻ chia, hỗ trợ...' : 'Đăng nhập để viết bình luận...'}" 
          class="flex-1 bg-slate-100 px-3 py-1.5 rounded-full text-xs outline-none focus:bg-white focus:ring-1 focus:ring-brand-500"
          onkeydown="if(event.key === 'Enter') submitComment('${post.id}')"
        >
        <button onclick="submitComment('${post.id}')" class="text-brand-600 hover:text-brand-700 text-xs font-bold px-2 py-1">
          Gửi
        </button>
      </div>
    </div>
  `;

  return card;
}

// Update category counter numbers in Left Sidebar
function updateCategoryCounts() {
  document.getElementById("countAll").textContent = AppState.posts.length;
  document.getElementById("countNearby").textContent = AppState.posts.filter(p => p.isNearby).length;
  document.getElementById("countGiveaway").textContent = AppState.posts.filter(p => p.roleType === "giveaway").length;
  document.getElementById("countHelpNeeded").textContent = AppState.posts.filter(p => p.roleType === "help-needed").length;
  document.getElementById("countCharityOrg").textContent = AppState.posts.filter(p => p.roleType === "charity-org").length;
  document.getElementById("countCampaign").textContent = AppState.posts.filter(p => p.roleType === "campaign").length;
}

// ==========================================================================
// INTERACTIVE ACTIONS & FEED INTERACTIONS
// ==========================================================================

function toggleLike(postId) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để lưu sự quan tâm tới bài viết này!", "info");
    openAuthModal();
    return;
  }

  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;

  const countEl = document.getElementById(`like-count-${postId}`);
  const btnEl = document.getElementById(`btn-like-${postId}`);

  if (countEl) countEl.textContent = post.likes;
  if (btnEl) {
    if (post.isLiked) {
      btnEl.className = "py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition text-rose-600 font-bold";
      btnEl.innerHTML = `<i class="fa-solid fa-heart text-sm text-rose-500"></i><span>Đã quan tâm</span>`;
      showToast("Đã lưu sự quan tâm của bạn tới mảnh ghép này!", "heart");
    } else {
      btnEl.className = "py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition text-slate-600";
      btnEl.innerHTML = `<i class="fa-regular fa-heart text-sm"></i><span>Quan tâm</span>`;
    }
  }
}

function toggleCommentsSection(postId) {
  const section = document.getElementById(`comments-section-${postId}`);
  if (section) {
    section.classList.toggle("hidden");
  }
}

function submitComment(postId) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để tham gia bình luận trao đổi!", "info");
    openAuthModal();
    return;
  }

  const input = document.getElementById(`comment-input-${postId}`);
  if (!input || !input.value.trim()) return;

  const commentText = input.value.trim();
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  const newComment = {
    id: "c-" + Date.now(),
    author: AppState.currentUser.name,
    avatar: AppState.currentUser.avatar,
    text: commentText,
    timeAgo: "Vừa xong"
  };

  post.comments.push(newComment);

  const commentsList = document.getElementById(`comments-list-${postId}`);
  if (commentsList) {
    const el = document.createElement("div");
    el.className = "flex items-start gap-2.5 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 animate-fadeIn";
    el.innerHTML = `
      <img src="${newComment.avatar}" class="w-7 h-7 rounded-full object-cover shrink-0" alt="${newComment.author}">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800">${newComment.author}</span>
          <span class="text-[10px] text-slate-400">Vừa xong</span>
        </div>
        <p class="text-slate-600 mt-0.5">${newComment.text}</p>
      </div>
    `;
    commentsList.appendChild(el);
  }

  input.value = "";
  showToast("Bình luận của bạn đã được đăng thành công!", "success");
}

function handleSafeConnectClick(postId) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để gửi yêu cầu kết nối an toàn!", "info");
    openAuthModal();
    return;
  }
  openContactModal(postId);
}

// ==========================================================================
// REQUIREMENT 4: SEARCH & RETURN TO HOMEPAGE VIA "TẤT CẢ BÀI VIẾT"
// ==========================================================================

function handleGlobalSearch(term) {
  AppState.searchKeyword = term;
  
  const searchNotice = document.getElementById("searchActiveNotice");
  const keywordLabel = document.getElementById("searchKeywordLabel");

  if (term.trim().length > 0) {
    if (searchNotice) searchNotice.classList.remove("hidden");
    if (keywordLabel) keywordLabel.textContent = `"${term.trim()}"`;

    if (term.trim().length > 2) {
      learnUserInterest(term.trim());
    }
  } else {
    if (searchNotice) searchNotice.classList.add("hidden");
  }

  renderFeed();
}

function quickSearch(keyword) {
  const input = document.getElementById("globalSearchInput");
  input.value = keyword;
  document.getElementById("searchSuggestions").classList.add("hidden");
  handleGlobalSearch(keyword);
}

function learnUserInterest(keyword) {
  const interests = AppState.currentUser ? AppState.currentUser.learnedInterests : ["Quần áo", "Hoài Đức"];
  if (!interests.includes(keyword)) {
    interests.unshift(keyword);
    if (interests.length > 4) interests.pop();
  }

  const banner = document.getElementById("aiRecommendationBanner");
  const desc = document.getElementById("aiBannerDescription");
  const tagsContainer = document.getElementById("aiLearnedTags");

  if (banner && desc && tagsContainer) {
    banner.classList.remove("hidden");
    desc.innerHTML = `Dựa trên tìm kiếm gần đây về <b>"${keyword}"</b>, AI Mảnh Ghép đã ưu tiên gợi ý các bài viết liên quan lên đầu bảng tin!`;

    tagsContainer.innerHTML = interests.map(tag => `
      <span class="text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">
        🔍 ${tag}
      </span>
    `).join("") + `<button onclick="resetAILearning()" class="text-[11px] text-slate-400 hover:text-rose-500 underline ml-1">Đặt lại</button>`;
  }
}

function resetAILearning() {
  const defaultTags = ["Quần áo", "Hoài Đức"];
  if (AppState.currentUser) AppState.currentUser.learnedInterests = defaultTags;
  
  const tagsContainer = document.getElementById("aiLearnedTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = `
      <span class="text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">👕 Quần áo ấm</span>
      <span class="text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">📍 Bán kính ~10km</span>
      <button onclick="resetAILearning()" class="text-[11px] text-slate-400 hover:text-rose-500 underline ml-1">Đặt lại</button>
    `;
  }
  showToast("Đã đặt lại dữ liệu học thói quen AI!", "info");
  renderFeed();
}

function dismissAIBanner() {
  document.getElementById("aiRecommendationBanner").classList.add("hidden");
}

// REQUIREMENT 4: Khi bấm vào "Tất cả bài viết" -> Xóa từ khóa tìm kiếm và đưa trang web về trang chủ ban đầu
function setFilter(filterType) {
  if (filterType === 'all') {
    // 1. Xóa từ khóa tìm kiếm
    AppState.searchKeyword = "";
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) searchInput.value = "";

    // 2. Ẩn thông báo đang tìm kiếm
    const searchNotice = document.getElementById("searchActiveNotice");
    if (searchNotice) searchNotice.classList.add("hidden");

    // 3. Đóng gợi ý tìm kiếm
    const searchSuggestions = document.getElementById("searchSuggestions");
    if (searchSuggestions) searchSuggestions.classList.add("hidden");

    // 4. Đặt lại bộ lọc nhu yếu phẩm về "Tất cả"
    AppState.currentNeed = "all";
    document.querySelectorAll(".need-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.need === "all");
    });

    showToast("Đã trở về trang chủ Mảnh Ghép: Hiển thị tất cả bài viết", "info");
  }

  AppState.currentFilter = filterType;

  // Update Left Category buttons active class
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filterType);
  });

  // Update Feed Tab buttons active class
  document.querySelectorAll(".feed-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === filterType);
  });

  renderFeed();
}

function toggleNeedFilter(need) {
  AppState.currentNeed = need;
  document.querySelectorAll(".need-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.need === need);
  });
  renderFeed();
}

function updateRadius(val) {
  AppState.searchRadiusKm = val;
  document.getElementById("radiusLabel").textContent = `${val} km`;
  showToast(`AI đã điều chỉnh quét bài viết trong bán kính ${val} km`, "info");
}

// ==========================================================================
// SUBMIT NEW POST (AI MODERATION VERIFIED)
// ==========================================================================

function submitNewPost() {
  if (!AppState.isLoggedIn || !AppState.currentUser) {
    showToast("Vui lòng đăng nhập trước khi đăng bài!", "error");
    openAuthModal();
    return;
  }

  const title = document.getElementById("postTitleInput").value.trim();
  const content = document.getElementById("postContentInput").value.trim();
  const imageUrl = document.getElementById("postImageUrlInput").value.trim();
  const isAnon = document.getElementById("postAnonymousCheck").checked;

  if (!title || !content) {
    showToast("Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết!", "error");
    return;
  }

  // Run AI Moderation Verification
  const aiResult = analyzePostWithAI(title, content);

  if (!aiResult.isApproved) {
    showToast("Bài viết không được phê duyệt do vi phạm tiêu chuẩn thiện nguyện!", "error");
    return;
  }

  // REQUIREMENT 3: Bài đăng của người dùng thật -> isTestPost = false (KHÔNG có ghi chú bài kiểm thử)
  const newPost = {
    id: "post-" + Date.now(),
    isTestPost: false, // <--- BÀI ĐĂNG THẬT CỦA NGƯỜI DÙNG
    author: {
      name: isAnon ? "Người dùng ẩn danh (AI bảo mật)" : AppState.currentUser.name,
      avatar: isAnon ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" : AppState.currentUser.avatar,
      badge: aiResult.role,
      isVerified: true,
      isAnonymous: isAnon
    },
    timeAgo: "Vừa xong",
    location: aiResult.location,
    district: "Hoài Đức",
    roleType: aiResult.roleType,
    needCategory: aiResult.need,
    title: title,
    content: content,
    images: imageUrl ? [imageUrl] : [],
    aiTags: ["Mảnh Ghép Cộng Đồng", aiResult.need, "Hoài Đức"],
    isNearby: true,
    likes: 1,
    isLiked: false,
    shares: 0,
    comments: []
  };

  // Prepend to top of feed
  AppState.posts.unshift(newPost);

  // Close modal and reset form
  closeCreatePostModal();
  document.getElementById("postTitleInput").value = "";
  document.getElementById("postContentInput").value = "";
  document.getElementById("postImageUrlInput").value = "";
  removePostImage();

  renderFeed();
  showToast("🎉 Bài viết đã được AI duyệt và xuất bản thành công lên Mảnh Ghép!", "success");

  // Scroll to top of feed
  window.scrollTo({ top: 100, behavior: 'smooth' });
}

// ==========================================================================
// MODAL CONTROLLERS & PRIVACY HELPERS
// ==========================================================================

function openCreatePostModal(presetRole) {
  document.getElementById("createPostModal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  // Populate user info in modal if logged in
  if (AppState.currentUser) {
    const modalAvatar = document.getElementById("modalUserAvatar");
    const modalName = document.getElementById("modalUserName");
    const modalRole = document.getElementById("modalUserRoleBadge");
    const modalLoc = document.getElementById("modalUserLocationText");

    if (modalAvatar) modalAvatar.src = AppState.currentUser.avatar;
    if (modalName) modalName.textContent = AppState.currentUser.name;
    if (modalRole) modalRole.textContent = AppState.currentUser.role;
    if (modalLoc) modalLoc.textContent = AppState.currentUser.location;
  }

  if (presetRole === "giveaway") {
    loadSamplePost("giveaway");
  } else if (presetRole === "help-needed") {
    loadSamplePost("help");
  }
}

function closeCreatePostModal() {
  document.getElementById("createPostModal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function openAuthModal() {
  document.getElementById("authModal").classList.remove("hidden");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.add("hidden");
}

function updateUserLocation(newLoc) {
  if (AppState.currentUser) {
    AppState.currentUser.location = newLoc;
  }
  const leftLoc = document.getElementById("leftUserLocation");
  const modalLoc = document.getElementById("modalUserLocationText");
  if (leftLoc) leftLoc.textContent = newLoc;
  if (modalLoc) modalLoc.textContent = newLoc;
  showToast(`Đã cập nhật khu vực ưu tiên: ${newLoc}`, "info");
  renderFeed();
}

function toggleAnonymousMode(checked) {
  if (!AppState.currentUser) return;
  AppState.currentUser.isAnonymous = checked;
  const leftName = document.getElementById("leftUserName");
  if (checked) {
    if (leftName) leftName.textContent = "Ẩn danh (" + AppState.currentUser.name + ")";
    showToast("Đã kích hoạt chế độ ẩn danh: Bài đăng của bạn sẽ tự động ẩn tên thật!", "info");
  } else {
    if (leftName) leftName.textContent = AppState.currentUser.name;
    showToast("Đã trở về chế độ hiển thị tên thông thường.", "info");
  }
}

function openContactModal(postId) {
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  const modalBody = document.getElementById("contactModalBody");
  modalBody.innerHTML = `
    <div class="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
      <img src="${post.author.avatar}" class="w-12 h-12 rounded-full object-cover" alt="User">
      <div>
        <h5 class="font-bold text-slate-900 text-sm">${post.author.name}</h5>
        <p class="text-xs text-slate-500">${post.location}</p>
        <span class="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
          ${post.author.badge}
        </span>
      </div>
    </div>
    
    <div class="mt-2 space-y-2 text-xs">
      <div class="font-semibold text-slate-700">Mảnh ghép kết nối:</div>
      <p class="bg-slate-100 p-2.5 rounded-xl text-slate-800 font-medium">"${post.title}"</p>
    </div>

    <div class="text-xs text-slate-600 space-y-1">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-lock text-emerald-600"></i>
        <span>Số điện thoại người đăng: <b>098x *** 892 (Bảo mật 100%)</b></span>
      </div>
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-comments text-brand-600"></i>
        <span>Bạn có thể trao đổi trực tiếp qua kênh tin nhắn mã hóa nội bộ.</span>
      </div>
    </div>
  `;

  document.getElementById("contactModal").classList.remove("hidden");
}

function closeContactModal() {
  document.getElementById("contactModal").classList.add("hidden");
}

function confirmSafeConnect() {
  closeContactModal();
  showToast("Đã gửi yêu cầu kết nối! Hãy đợi đối phương phản hồi tin nhắn an toàn.", "success");
}

function openShareModal(postId) {
  document.getElementById("shareModal").classList.remove("hidden");
}

function closeShareModal() {
  document.getElementById("shareModal").classList.add("hidden");
}

function copyPostLink() {
  navigator.clipboard.writeText(window.location.href);
  closeShareModal();
  showToast("Đã sao chép liên kết bài viết Mảnh Ghép vào bộ nhớ tạm!", "success");
}

function shareToFacebook() {
  closeShareModal();
  window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), "_blank");
}

function shareToZalo() {
  closeShareModal();
  showToast("Đang mở chia sẻ qua ứng dụng Zalo...", "info");
}

function openAIInspectorTool() {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập trước khi dùng công cụ thử nghiệm AI!", "info");
    openAuthModal();
    return;
  }
  openCreatePostModal();
  loadSamplePost("spam");
  showToast("Đã nạp bài mẫu Spam/Bán hàng. Hãy bấm vào để xem AI Mảnh Ghép từ chối phê duyệt!", "info");
}

// Notifications Dropdown Toggle
function toggleNotificationDropdown() {
  const dropdown = document.getElementById("notificationDropdown");
  dropdown.classList.toggle("hidden");

  if (!dropdown.classList.contains("hidden")) {
    const list = document.getElementById("notificationList");
    list.innerHTML = `
      <div class="p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-slate-700 flex items-start gap-2.5">
        <i class="fa-solid fa-puzzle-piece text-brand-600 mt-0.5"></i>
        <div>
          <p class="font-bold text-teal-900">AI Mảnh Ghép: Gợi ý bài mới gần bạn</p>
          <p class="text-[11px] text-slate-600 mt-0.5">Một bài đăng tặng quần áo ấm mới xuất hiện tại xã An Khánh, Hoài Đức (~2.3km).</p>
          <span class="text-[10px] text-slate-400 mt-1 block">10 phút trước</span>
        </div>
      </div>
      <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5">
        <i class="fa-solid fa-shield-heart text-emerald-600 mt-0.5"></i>
        <div>
          <p class="font-bold text-slate-800">Bảo mật thông tin 100%</p>
          <p class="text-[11px] text-slate-600 mt-0.5">Tất cả bài viết được AI che số nhà và mã hóa số điện thoại.</p>
          <span class="text-[10px] text-slate-400 mt-1 block">Hôm qua</span>
        </div>
      </div>
    `;
  }
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  let icon = "fa-circle-info";
  let bg = "bg-slate-900 text-white";
  if (type === "success") {
    icon = "fa-circle-check";
    bg = "bg-emerald-600 text-white";
  } else if (type === "error") {
    icon = "fa-triangle-exclamation";
    bg = "bg-rose-600 text-white";
  } else if (type === "heart") {
    icon = "fa-heart";
    bg = "bg-rose-500 text-white";
  }

  toast.className = `toast-item flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold ${bg}`;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Check and setup Initial Guest state
  updateAuthUI();

  // Render initial posts
  renderFeed();

  // Search input listeners
  const searchInput = document.getElementById("globalSearchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");

  searchInput.addEventListener("focus", () => {
    searchSuggestions.classList.remove("hidden");
  });

  searchInput.addEventListener("input", (e) => {
    handleGlobalSearch(e.target.value);
  });

  // Close search suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
      searchSuggestions.classList.add("hidden");
    }
    const notifBtn = document.querySelector('[onclick="toggleNotificationDropdown()"]');
    const notifDrop = document.getElementById("notificationDropdown");
    if (notifBtn && notifDrop && !notifBtn.contains(e.target) && !notifDrop.contains(e.target)) {
      notifDrop.classList.add("hidden");
    }
  });
});
