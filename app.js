// ==========================================================================
// Mảnh Ghép Platform - Main Application Logic & AI Simulator Engine
// ==========================================================================

// --- State Management ---
const AppState = {
  isLoggedIn: false, // Mặc định chưa đăng nhập khi mới mở web
  currentUser: null,

  currentFilter: "all",
  currentNeed: "all",
  searchKeyword: "",
  searchRadiusKm: 10,
  
  aiDraft: {
    role: "Chưa xác định",
    need: "Chưa nhận diện",
    location: "Huyện Hoài Đức, Hà Nội",
    isApproved: false,
    moderationReason: ""
  },

  // Bài viết mẫu có nhãn isTestPost: true
  posts: [
    {
      id: "post-101",
      isTestPost: true,
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
      roleType: "giveaway",
      needCategory: "Quần áo",
      title: "Tặng 3 thùng quần áo ấm trẻ em (3 - 8 tuổi) và chăn nỉ còn rất mới",
      content: "Nhà mình dọn tủ chuẩn bị cho mùa đông mới, có phân loại được 3 thùng quần áo ấm bé trai bé gái từ 3 đến 8 tuổi, áo phao, áo len và 2 chăn nỉ. Quần áo đều đã được giặt sạch thơm tho. Ưu tiên tặng các gia đình công nhân khó khăn hoặc nhóm thiện nguyện gom đồ gửi vùng cao. Ai cần liên hệ mình để qua lấy nhé ạ!",
      images: [
        "https://images.unsplash.com/photo-1525562723836-d65714259988?w=800&h=500&fit=crop"
      ],
      aiTags: ["Tặng đồ 0đ", "Quần áo ấm", "Hoài Đức"],
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
        }
      ]
    },
    {
      id: "post-102",
      isTestPost: true,
      author: {
        name: "Chú Tuấn (Bảo mật)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        badge: "Cần giúp đỡ",
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
      aiTags: ["Cần trợ giúp khẩn", "Dụng cụ Y tế", "Đã xác minh"],
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
      isTestPost: true,
      author: {
        name: "CLB Kết Nối Yêu Thương",
        avatar: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100&h=100&fit=crop",
        badge: "Tổ chức gom đồ",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "3 giờ trước",
      location: "Điểm tiếp nhận: Đường Cầu Giấy & Hoài Đức",
      district: "Hà Nội",
      roleType: "charity-org",
      needCategory: "Quần áo",
      title: "Điểm tiếp nhận gom đồ cũ: Quần áo ấm, chăn bông ủng hộ học sinh Mèo Vạc",
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
      isTestPost: true,
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
      title: "Tìm xin bộ sách giáo khoa lớp 4 và vở viết cho 2 học sinh nghèo",
      content: "Em chào các bố mẹ. Trong lớp em chủ nhiệm có 2 em hoàn cảnh mồ côi bố, mẹ làm thuê nuôi 3 con nên đến nay vẫn còn thiếu sách giáo khoa và đồ dùng học tập. Em đang tìm xin lại bộ sách lớp 4 cũ và vài tập vở viết. Ba mẹ nào có con đã học xong lớp 4 năm ngoái không dùng nữa xin cho 2 em nhé. Em xin thay mặt gia đình cảm ơn rất nhiều!",
      images: [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop"
      ],
      aiTags: ["Sách giáo khoa", "Hoài Đức"],
      isNearby: true,
      likes: 67,
      isLiked: false,
      shares: 21,
      comments: []
    },
    {
      id: "post-105",
      isTestPost: true,
      author: {
        name: "Gia đình anh Hải",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
        badge: "Người cho tặng",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "8 giờ trước",
      location: "Phường La Khê, Quận Hà Đông",
      district: "Hà Đông",
      roleType: "giveaway",
      needCategory: "Đồ gia dụng",
      title: "Tặng lại bàn học sinh kèm giá sách gỗ thông và quạt cây cũ còn dùng tốt",
      content: "Nhà em sắp sửa lại phòng nên thừa ra 1 bộ bàn học sinh cho bé (có giá sách liền) và 1 quạt cây Asia hoạt động bình thường. Tặng bạn sinh viên hoặc gia đình nào có con nhỏ đang cần. Do đồ gỗ hơi nặng nên nhờ các bác tự gọi xe ba gác hoặc qua tự chở giúp em ạ.",
      images: [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop"
      ],
      aiTags: ["Tặng đồ gia dụng", "Quà 0 đồng"],
      isNearby: false,
      likes: 31,
      isLiked: false,
      shares: 9,
      comments: []
    },
    {
      id: "post-106",
      isTestPost: true,
      author: {
        name: "Quỹ Bác Ái Hy Vọng",
        avatar: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=100&h=100&fit=crop",
        badge: "Kêu gọi viện phí",
        isVerified: true,
        isAnonymous: false
      },
      timeAgo: "1 ngày trước",
      location: "Bệnh Viện Nhi, Hà Nội",
      district: "Hà Nội",
      roleType: "campaign",
      needCategory: "Tài chính",
      title: "Tiếp sức viện phí mổ tim gấp cho bé An (8 tháng tuổi, quê Điện Biên)",
      content: "Bé An phát hiện dị tật tim bẩm sinh phức tạp, cần phẫu thuật khẩn cấp. Bố mẹ làm nương rẫy, đã vay mượn khắp nơi nhưng vẫn thiếu 25 triệu chi phí ngoài bảo hiểm y tế. Hồ sơ bệnh án và xác nhận viện phí đã được bệnh viện và ban quản trị AI Mảnh Ghép xác thực 100%. Mọi đóng góp trực tiếp vào tài khoản minh bạch của bệnh viện.",
      images: [
        "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=500&fit=crop"
      ],
      aiTags: ["Xác thực 100%", "Kêu gọi khẩn cấp"],
      isNearby: false,
      likes: 320,
      isLiked: false,
      shares: 245,
      comments: []
    }
  ]
};

// Preset Samples
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
// MOBILE DRAWER CONTROLS
// ==========================================================================

function openMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  if (drawer) {
    drawer.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById("mobileDrawer");
  if (drawer) {
    drawer.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

// ==========================================================================
// AUTHENTICATION FLOW
// ==========================================================================

function updateAuthUI() {
  const guestAuthNav = document.getElementById("guestAuthNav");
  const userProfileButton = document.getElementById("userProfileButton");
  const guestSidebarCard = document.getElementById("guestSidebarCard");
  const userSidebarCard = document.getElementById("userSidebarCard");
  const composerAvatar = document.getElementById("composerUserAvatar");
  const mobileNavProfileText = document.getElementById("mobileNavProfileText");

  if (AppState.isLoggedIn && AppState.currentUser) {
    if (guestAuthNav) guestAuthNav.classList.add("hidden");
    if (userProfileButton) {
      userProfileButton.classList.remove("hidden");
      userProfileButton.classList.add("flex");
    }
    if (guestSidebarCard) guestSidebarCard.classList.add("hidden");
    if (userSidebarCard) userSidebarCard.classList.remove("hidden");

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
    if (mobileNavProfileText) mobileNavProfileText.textContent = "Hồ sơ";

  } else {
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
    if (mobileNavProfileText) mobileNavProfileText.textContent = "Đăng nhập";
  }
}

function handleCreatePostClick(presetRole) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để đăng bài kết nối an toàn!", "info");
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
  showToast("🎉 Đăng nhập Google thành công! Thông tin cá nhân được bảo mật 100%.", "success");
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
  showToast("🎉 Xác thực OTP thành công! Dữ liệu được mã hóa bảo mật 100%.", "success");
}

function logoutUser() {
  AppState.isLoggedIn = false;
  AppState.currentUser = null;
  updateAuthUI();
  showToast("Đã đăng xuất an toàn khỏi nền tảng Mảnh Ghép.", "info");
}

function openProfileDropdown() {
  openAuthModal();
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
      reason: "Vui lòng nhập ít nhất 10 ký tự để AI Mảnh Ghép phân tích."
    };
  }

  // AI Content Moderation Check
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
      reason: `❌ TỪ CHỐI DUYỆT: AI phát hiện từ khóa bán hàng ("${detectedSpamWord}"). Mảnh Ghép chỉ dành riêng cho việc chia sẻ trợ giúp phi lợi nhuận!`
    };
  }

  // AI Role Classification
  let role = "Người cho tặng đồ";
  let roleType = "giveaway";

  const helpKeywords = ["cần xin", "xin", "cần giúp", "khó khăn", "thiếu", "đau ốm", "bệnh tật", "không có tiền", "hoàn cảnh", "cần mượn"];
  const orgKeywords = ["clb", "tổ chức", "nhóm thiện nguyện", "gom đồ", "chuyến xe", "tiếp nhận", "phát động", "tình nguyện viên"];
  const campaignKeywords = ["quyên góp", "kêu gọi", "viện phí", "mổ tim", "ung thư", "bão lũ", "cứu trợ", "quỹ"];

  if (campaignKeywords.some(kw => text.includes(kw))) {
    role = "Kêu gọi quyên góp";
    roleType = "campaign";
  } else if (orgKeywords.some(kw => text.includes(kw))) {
    role = "Tổ chức gom đồ";
    roleType = "charity-org";
  } else if (helpKeywords.some(kw => text.includes(kw))) {
    role = "Người cần trợ giúp";
    roleType = "help-needed";
  } else {
    role = "Người cho tặng đồ (0đ)";
    roleType = "giveaway";
  }

  // AI Needs Recognition
  let need = "Nhu cầu chung";
  if (/quần áo|áo ấm|áo khoác|giày|dép|chăn|màn|quần|áo len/.test(text)) {
    need = "Quần áo & Giày dép";
  } else if (/sách|giáo khoa|vở|bút|cặp|dụng cụ học tập|học sinh/.test(text)) {
    need = "Sách vở & Học tập";
  } else if (/xe lăn|nạng|thuốc|bệnh viện|viện phí|y tế|chấn thương/.test(text)) {
    need = "Y tế & Thiết bị";
  } else if (/gạo|mì tôm|lương thực|thực phẩm|sữa|cơm/.test(text)) {
    need = "Lương thực & Thực phẩm";
  } else if (/bàn|ghế|tủ|quạt|tủ lạnh|nồi cơm|xe đạp|đồ gia dụng/.test(text)) {
    need = "Đồ gia dụng";
  } else if (/tiền|kinh phí|chi phí/.test(text)) {
    need = "Hỗ trợ tài chính / Viện phí";
  }

  // Safe Location
  let safeLocation = currentLoc;
  if (/hoài đức|an khánh|trạm trôi|vân canh|kim chung|song phương/.test(text)) {
    safeLocation = "Huyện Hoài Đức (Đã bảo mật)";
  } else if (/hà đông|la khê|mộ lao|văn quán/.test(text)) {
    safeLocation = "Quận Hà Đông (Đã bảo mật)";
  } else if (/nam từ liêm|mỹ đình|tây mỗ|đại mỗ/.test(text)) {
    safeLocation = "Quận Nam Từ Liêm (Đã bảo mật)";
  } else if (/cầu giấy/.test(text)) {
    safeLocation = "Quận Cầu Giấy (Đã bảo mật)";
  }

  return {
    role,
    roleType,
    need,
    location: safeLocation,
    isApproved: true,
    reason: "✅ ĐẠT TIÊU CHUẨN: Bài viết hướng đến kết nối tương trợ nhân văn, tuân thủ tôn chỉ Mảnh Ghép và đã được che địa chỉ riêng tư."
  };
}

function triggerAIAnalysis() {
  const title = document.getElementById("postTitleInput").value;
  const content = document.getElementById("postContentInput").value;

  const result = analyzePostWithAI(title, content);
  AppState.aiDraft = result;

  const statusEl = document.getElementById("aiAnalysisStatus");
  const roleEl = document.getElementById("aiDetectedRole");
  const needEl = document.getElementById("aiDetectedNeed");
  const locEl = document.getElementById("aiDetectedLocation");
  const verdictDetailEl = document.getElementById("aiVerdictDetail");
  const verdictBoxEl = document.getElementById("aiModerationVerdict");
  const btnPublish = document.getElementById("btnPublishPost");
  const currentLoc = AppState.currentUser ? AppState.currentUser.location : "Huyện Hoài Đức, Hà Nội";

  if (!title && !content) {
    statusEl.textContent = "Chờ nhập...";
    statusEl.className = "text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-mono";
    roleEl.innerHTML = `<span>Chưa xác định</span>`;
    needEl.innerHTML = `<span>Chưa nhận diện</span>`;
    locEl.innerHTML = `<span>${currentLoc}</span>`;
    verdictDetailEl.textContent = "Hãy nhập nội dung bài viết. AI sẽ kiểm tra tính xác thực và đảm bảo chỉ có bài tương trợ thiện nguyện được phê duyệt.";
    verdictBoxEl.className = "p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs flex items-start gap-2";
    btnPublish.disabled = false;
    btnPublish.classList.remove("opacity-50", "cursor-not-allowed");
    return;
  }

  statusEl.textContent = "AI Đang xử lý";
  statusEl.className = "text-[10px] bg-brand-500 text-white px-2 py-0.5 rounded-full font-mono animate-pulse";

  roleEl.innerHTML = `<span class="truncate">${result.role}</span>`;
  needEl.innerHTML = `<span class="truncate">${result.need}</span>`;
  locEl.innerHTML = `<span class="truncate">${result.location}</span>`;

  verdictDetailEl.textContent = result.reason;

  if (result.isApproved) {
    verdictBoxEl.className = "p-2 sm:p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs flex items-start gap-2";
    btnPublish.disabled = false;
    btnPublish.classList.remove("opacity-50", "cursor-not-allowed", "bg-slate-400");
    btnPublish.classList.add("bg-brand-600", "hover:bg-brand-700");
  } else {
    verdictBoxEl.className = "p-2 sm:p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs flex items-start gap-2";
    btnPublish.disabled = true;
    btnPublish.classList.add("opacity-50", "cursor-not-allowed", "bg-slate-400");
    btnPublish.classList.remove("bg-brand-600", "hover:bg-brand-700");
  }
}

function loadSamplePost(type) {
  const sample = samplePosts[type];
  if (!sample) return;

  document.getElementById("postTitleInput").value = sample.title;
  document.getElementById("postContentInput").value = sample.content;
  document.getElementById("postImageUrlInput").value = sample.image;
  previewPostImage(sample.image);

  triggerAIAnalysis();
  showToast(`Đã nạp bài mẫu: "${sample.title.substring(0, 25)}..."`, "info");
}

function loadRandomItemImage() {
  const images = [
    "https://images.unsplash.com/photo-1525562723836-d65714259988?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=500&fit=crop"
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
// FEED RENDERING & FILTERING (Mobile Optimized)
// ==========================================================================

function renderFeed() {
  const container = document.getElementById("postsFeedContainer");
  const emptyState = document.getElementById("emptyFeedState");
  container.innerHTML = "";

  let filtered = AppState.posts.filter(post => {
    if (AppState.currentFilter === "nearby" && !post.isNearby) return false;
    if (AppState.currentFilter === "giveaway" && post.roleType !== "giveaway") return false;
    if (AppState.currentFilter === "help-needed" && post.roleType !== "help-needed") return false;
    if (AppState.currentFilter === "charity-org" && post.roleType !== "charity-org") return false;
    if (AppState.currentFilter === "campaign" && post.roleType !== "campaign") return false;
    
    if (AppState.currentFilter === "ai-suggested") {
      const interests = (AppState.currentUser && AppState.currentUser.learnedInterests) ? AppState.currentUser.learnedInterests : ["Quần áo", "Hoài Đức"];
      const matchesInterest = interests.some(kw => 
        post.needCategory.toLowerCase().includes(kw.toLowerCase()) ||
        post.title.toLowerCase().includes(kw.toLowerCase()) ||
        post.content.toLowerCase().includes(kw.toLowerCase())
      );
      if (!matchesInterest && !post.isNearby) return false;
    }

    if (AppState.currentNeed !== "all") {
      if (!post.needCategory.toLowerCase().includes(AppState.currentNeed.toLowerCase())) {
        return false;
      }
    }

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

// Render a single post card (Responsive for Mobile and PC)
function createPostCardElement(post) {
  const card = document.createElement("article");
  card.className = "post-card bg-white rounded-2xl p-3.5 sm:p-5 shadow-sm border border-slate-200/90 relative";
  card.id = `card-${post.id}`;

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

  const tagsHtml = post.aiTags.map(tag => `
    <span class="text-[10px] sm:text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">#${tag}</span>
  `).join("");

  // Test Post Label vs Real Community Post Label
  let testPostBadgeHtml = "";
  if (post.isTestPost) {
    testPostBadgeHtml = `
      <span class="text-[10px] sm:text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs" title="Bài viết kiểm thử mẫu">
        <i class="fa-solid fa-flask-vial text-[9px] text-amber-700"></i>
        <span>Bài viết kiểm thử</span>
      </span>
    `;
  } else {
    testPostBadgeHtml = `
      <span class="text-[10px] sm:text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs" title="Bài viết do người dùng thật đăng">
        <i class="fa-solid fa-circle-check text-[9px] text-emerald-600"></i>
        <span>Bài viết cộng đồng</span>
      </span>
    `;
  }

  let imageSection = "";
  if (post.images && post.images.length > 0) {
    imageSection = `
      <div class="mt-2.5 sm:mt-3 rounded-2xl overflow-hidden border border-slate-100 max-h-72 sm:max-h-96 bg-slate-50">
        <img src="${post.images[0]}" alt="Hình ảnh" class="w-full object-cover max-h-72 sm:max-h-96">
      </div>
    `;
  }

  const commentsHtml = post.comments.map(c => `
    <div class="flex items-start gap-2 text-xs bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100">
      <img src="${c.avatar}" class="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0" alt="${c.author}">
      <div class="flex-1 overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 text-[11px] sm:text-xs">${c.author}</span>
          <span class="text-[9px] sm:text-[10px] text-slate-400">${c.timeAgo}</span>
        </div>
        <p class="text-slate-600 mt-0.5 text-[11px] sm:text-xs leading-relaxed">${c.text}</p>
      </div>
    </div>
  `).join("");

  card.innerHTML = `
    <!-- Header Post -->
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2.5">
        <img src="${post.author.avatar}" class="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border border-slate-200 shrink-0" alt="${post.author.name}">
        <div>
          <div class="flex items-center gap-1 flex-wrap">
            <h4 class="font-bold text-slate-900 text-xs sm:text-sm hover:text-brand-600 cursor-pointer transition">${post.author.name}</h4>
            ${post.author.isVerified ? `<i class="fa-solid fa-circle-check text-blue-500 text-[10px] sm:text-xs"></i>` : ""}
            ${post.author.isAnonymous ? `<span class="text-[9px] bg-slate-200 text-slate-700 px-1 rounded font-mono">Bảo mật</span>` : ""}
          </div>
          
          <div class="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
            <span>${post.timeAgo}</span>
            <span>•</span>
            <span class="flex items-center gap-1 text-slate-600 truncate max-w-[140px] sm:max-w-[200px]" title="${post.location}">
              <i class="fa-solid fa-location-dot text-rose-500 text-[9px]"></i>
              <span class="truncate">${post.location}</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Role Badge -->
      <span class="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold border flex items-center gap-1 shrink-0 ${badgeColorClass}">
        <i class="fa-solid ${badgeIcon} text-[9px]"></i>
        <span class="truncate">${post.author.badge}</span>
      </span>
    </div>

    <!-- Tags Strip -->
    <div class="flex items-center gap-1.5 flex-wrap mt-2.5">
      ${testPostBadgeHtml}
      <span class="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
        <i class="fa-solid fa-sparkles text-[8px] text-amber-500"></i> AI Duyệt
      </span>
      <span class="text-[10px] sm:text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
        ${post.needCategory}
      </span>
      ${tagsHtml}
    </div>

    <!-- Title & Content -->
    <div class="mt-2.5">
      <h3 class="font-extrabold text-slate-900 text-sm sm:text-base leading-snug mb-1">${post.title}</h3>
      <p class="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">${post.content}</p>
    </div>

    ${imageSection}

    <!-- Counters -->
    <div class="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
      <div class="flex items-center gap-1">
        <span class="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px] sm:text-[10px]">
          <i class="fa-solid fa-heart"></i>
        </span>
        <span id="like-count-${post.id}" class="font-semibold text-slate-700">${post.likes}</span> quan tâm
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <span>${post.comments.length} bình luận</span>
        <span>${post.shares} chia sẻ</span>
      </div>
    </div>

    <!-- Action Buttons Responsive Grid -->
    <div class="grid grid-cols-4 gap-1 mt-1.5 pt-1.5 border-t border-slate-100 text-[11px] sm:text-xs font-semibold text-slate-600">
      
      <!-- Care / Like -->
      <button onclick="toggleLike('${post.id}')" id="btn-like-${post.id}" class="py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 sm:gap-1.5 transition ${post.isLiked ? 'text-rose-600 font-bold' : ''}">
        <i class="${post.isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart text-xs sm:text-sm"></i>
        <span>${post.isLiked ? 'Đã thích' : 'Quan tâm'}</span>
      </button>

      <!-- Comment Toggle -->
      <button onclick="toggleCommentsSection('${post.id}')" class="py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 sm:gap-1.5 transition">
        <i class="fa-regular fa-comment-dots text-xs sm:text-sm text-slate-500"></i>
        <span>Bình luận</span>
      </button>

      <!-- Share -->
      <button onclick="openShareModal('${post.id}')" class="py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 sm:gap-1.5 transition">
        <i class="fa-solid fa-share-nodes text-xs sm:text-sm text-slate-500"></i>
        <span>Chia sẻ</span>
      </button>

      <!-- Safe Connect -->
      <button onclick="handleSafeConnectClick('${post.id}')" class="py-1.5 sm:py-2 px-1 rounded-xl bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center gap-1 transition shadow-sm">
        <i class="fa-solid fa-hand-holding-heart text-[10px] sm:text-xs"></i>
        <span class="truncate">${post.roleType === 'giveaway' ? 'Xin nhận' : 'Giúp đỡ'}</span>
      </button>
    </div>

    <!-- Comments Section -->
    <div id="comments-section-${post.id}" class="hidden mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
      <div class="space-y-1.5" id="comments-list-${post.id}">
        ${commentsHtml}
      </div>

      <div class="flex items-center gap-1.5 pt-1">
        <img src="${AppState.currentUser ? AppState.currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'}" class="w-6 h-6 rounded-full object-cover shrink-0" alt="Avatar">
        <input 
          type="text" 
          id="comment-input-${post.id}" 
          placeholder="${AppState.isLoggedIn ? 'Viết bình luận hỗ trợ...' : 'Đăng nhập để bình luận...'}" 
          class="flex-1 bg-slate-100 px-3 py-1.5 rounded-full text-[11px] sm:text-xs outline-none focus:bg-white focus:ring-1 focus:ring-brand-500"
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

function updateCategoryCounts() {
  const countAll = document.getElementById("countAll");
  const countNearby = document.getElementById("countNearby");
  const countGiveaway = document.getElementById("countGiveaway");
  const countHelpNeeded = document.getElementById("countHelpNeeded");
  const countCharityOrg = document.getElementById("countCharityOrg");
  const countCampaign = document.getElementById("countCampaign");

  if (countAll) countAll.textContent = AppState.posts.length;
  if (countNearby) countNearby.textContent = AppState.posts.filter(p => p.isNearby).length;
  if (countGiveaway) countGiveaway.textContent = AppState.posts.filter(p => p.roleType === "giveaway").length;
  if (countHelpNeeded) countHelpNeeded.textContent = AppState.posts.filter(p => p.roleType === "help-needed").length;
  if (countCharityOrg) countCharityOrg.textContent = AppState.posts.filter(p => p.roleType === "charity-org").length;
  if (countCampaign) countCampaign.textContent = AppState.posts.filter(p => p.roleType === "campaign").length;
}

// ==========================================================================
// INTERACTIVE ACTIONS
// ==========================================================================

function toggleLike(postId) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để lưu sự quan tâm!", "info");
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
      btnEl.className = "py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 sm:gap-1.5 transition text-rose-600 font-bold";
      btnEl.innerHTML = `<i class="fa-solid fa-heart text-xs sm:text-sm text-rose-500"></i><span>Đã thích</span>`;
      showToast("Đã lưu sự quan tâm của bạn tới mảnh ghép này!", "heart");
    } else {
      btnEl.className = "py-1.5 sm:py-2 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 sm:gap-1.5 transition text-slate-600";
      btnEl.innerHTML = `<i class="fa-regular fa-heart text-xs sm:text-sm"></i><span>Quan tâm</span>`;
    }
  }
}

function toggleCommentsSection(postId) {
  const section = document.getElementById(`comments-section-${postId}`);
  if (section) section.classList.toggle("hidden");
}

function submitComment(postId) {
  if (!AppState.isLoggedIn) {
    showToast("Vui lòng đăng nhập để bình luận trao đổi!", "info");
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
    el.className = "flex items-start gap-2 text-xs bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-100 animate-fadeIn";
    el.innerHTML = `
      <img src="${newComment.avatar}" class="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover shrink-0" alt="${newComment.author}">
      <div class="flex-1 overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 text-[11px] sm:text-xs">${newComment.author}</span>
          <span class="text-[9px] sm:text-[10px] text-slate-400">Vừa xong</span>
        </div>
        <p class="text-slate-600 mt-0.5 text-[11px] sm:text-xs leading-relaxed">${newComment.text}</p>
      </div>
    `;
    commentsList.appendChild(el);
  }

  input.value = "";
  showToast("Bình luận của bạn đã được gửi thành công!", "success");
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
// SEARCH & RETURN TO HOMEPAGE (All Platforms)
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
      <span class="text-[10px] sm:text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">
        🔍 ${tag}
      </span>
    `).join("") + `<button onclick="resetAILearning()" class="text-[10px] sm:text-[11px] text-slate-400 hover:text-rose-500 underline ml-1">Đặt lại</button>`;
  }
}

function resetAILearning() {
  const defaultTags = ["Quần áo", "Hoài Đức"];
  if (AppState.currentUser) AppState.currentUser.learnedInterests = defaultTags;
  
  const tagsContainer = document.getElementById("aiLearnedTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = `
      <span class="text-[10px] sm:text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">👕 Quần áo</span>
      <span class="text-[10px] sm:text-[11px] bg-white border border-teal-200 text-teal-800 font-semibold px-2 py-0.5 rounded-md">📍 ~10km</span>
      <button onclick="resetAILearning()" class="text-[10px] sm:text-[11px] text-slate-400 hover:text-rose-500 underline ml-1">Đặt lại</button>
    `;
  }
  showToast("Đã đặt lại dữ liệu AI về mặc định!", "info");
  renderFeed();
}

function dismissAIBanner() {
  document.getElementById("aiRecommendationBanner").classList.add("hidden");
}

function setFilter(filterType) {
  if (filterType === 'all') {
    AppState.searchKeyword = "";
    const searchInput = document.getElementById("globalSearchInput");
    if (searchInput) searchInput.value = "";

    const searchNotice = document.getElementById("searchActiveNotice");
    if (searchNotice) searchNotice.classList.add("hidden");

    const searchSuggestions = document.getElementById("searchSuggestions");
    if (searchSuggestions) searchSuggestions.classList.add("hidden");

    AppState.currentNeed = "all";
    document.querySelectorAll(".need-chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.need === "all");
    });

    showToast("Đã về trang chủ Mảnh Ghép: Tất cả bài viết", "info");
  }

  AppState.currentFilter = filterType;

  // Update Left Category buttons
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filterType);
  });

  // Update Feed Tab buttons
  document.querySelectorAll(".feed-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === filterType);
  });

  // Update Mobile bottom nav active indicator
  const homeBtn = document.getElementById("mobileNavHome");
  if (homeBtn) {
    homeBtn.classList.toggle("active", filterType === "all");
  }

  renderFeed();
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const label = document.getElementById("radiusLabel");
  if (label) label.textContent = `${val} km`;
  showToast(`AI đã điều chỉnh quét trong bán kính ${val} km`, "info");
}

// ==========================================================================
// SUBMIT NEW POST (AI MODERATION)
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

  const aiResult = analyzePostWithAI(title, content);

  if (!aiResult.isApproved) {
    showToast("Bài viết không được phê duyệt do vi phạm tiêu chuẩn thiện nguyện!", "error");
    return;
  }

  // Real user post: isTestPost = false
  const newPost = {
    id: "post-" + Date.now(),
    isTestPost: false,
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

  AppState.posts.unshift(newPost);

  closeCreatePostModal();
  document.getElementById("postTitleInput").value = "";
  document.getElementById("postContentInput").value = "";
  document.getElementById("postImageUrlInput").value = "";
  removePostImage();

  renderFeed();
  showToast("🎉 Bài viết đã được AI duyệt và đăng thành công!", "success");

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// MODAL CONTROLLERS & PRIVACY HELPERS
// ==========================================================================

function openCreatePostModal(presetRole) {
  document.getElementById("createPostModal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

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
  document.body.classList.add("overflow-hidden");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function updateUserLocation(newLoc) {
  if (AppState.currentUser) {
    AppState.currentUser.location = newLoc;
  }
  const leftLoc = document.getElementById("leftUserLocation");
  const modalLoc = document.getElementById("modalUserLocationText");
  if (leftLoc) leftLoc.textContent = newLoc;
  if (modalLoc) modalLoc.textContent = newLoc;
  showToast(`Đã cập nhật khu vực: ${newLoc}`, "info");
  renderFeed();
}

function toggleAnonymousMode(checked) {
  if (!AppState.currentUser) return;
  AppState.currentUser.isAnonymous = checked;
  const leftName = document.getElementById("leftUserName");
  if (checked) {
    if (leftName) leftName.textContent = "Ẩn danh (" + AppState.currentUser.name + ")";
    showToast("Đã kích hoạt chế độ ẩn danh!", "info");
  } else {
    if (leftName) leftName.textContent = AppState.currentUser.name;
    showToast("Đã hiển thị tên thông thường.", "info");
  }
}

function openContactModal(postId) {
  const post = AppState.posts.find(p => p.id === postId);
  if (!post) return;

  const modalBody = document.getElementById("contactModalBody");
  modalBody.innerHTML = `
    <div class="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
      <img src="${post.author.avatar}" class="w-10 h-10 rounded-full object-cover" alt="User">
      <div>
        <h5 class="font-bold text-slate-900 text-xs sm:text-sm">${post.author.name}</h5>
        <p class="text-[11px] text-slate-500">${post.location}</p>
        <span class="text-[9px] bg-brand-100 text-brand-800 font-bold px-1.5 py-0.2 rounded-full mt-0.5 inline-block">
          ${post.author.badge}
        </span>
      </div>
    </div>
    
    <div class="mt-2 space-y-1 text-xs">
      <div class="font-semibold text-slate-700 text-[11px]">Mảnh ghép kết nối:</div>
      <p class="bg-slate-100 p-2 rounded-xl text-slate-800 font-medium text-[11px]">"${post.title}"</p>
    </div>

    <div class="text-[11px] text-slate-600 space-y-1 mt-2">
      <div class="flex items-center gap-1.5">
        <i class="fa-solid fa-lock text-emerald-600"></i>
        <span>SĐT người đăng: <b>098x *** 892 (Bảo mật 100%)</b></span>
      </div>
      <div class="flex items-center gap-1.5">
        <i class="fa-solid fa-comments text-brand-600"></i>
        <span>Trao đổi qua kênh tin nhắn mã hóa nội bộ.</span>
      </div>
    </div>
  `;

  document.getElementById("contactModal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeContactModal() {
  document.getElementById("contactModal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function confirmSafeConnect() {
  closeContactModal();
  showToast("Đã gửi yêu cầu kết nối! Hãy đợi đối phương phản hồi tin nhắn.", "success");
}

function openShareModal(postId) {
  document.getElementById("shareModal").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeShareModal() {
  document.getElementById("shareModal").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function copyPostLink() {
  navigator.clipboard.writeText(window.location.href);
  closeShareModal();
  showToast("Đã sao chép link bài viết vào bộ nhớ tạm!", "success");
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
  showToast("Đã nạp bài mẫu Spam để kiểm thử AI!", "info");
}

function toggleNotificationDropdown() {
  const dropdown = document.getElementById("notificationDropdown");
  dropdown.classList.toggle("hidden");

  if (!dropdown.classList.contains("hidden")) {
    const list = document.getElementById("notificationList");
    list.innerHTML = `
      <div class="p-2 sm:p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs text-slate-700 flex items-start gap-2">
        <i class="fa-solid fa-puzzle-piece text-brand-600 mt-0.5 text-xs"></i>
        <div>
          <p class="font-bold text-teal-900 text-xs">AI Mảnh Ghép: Bài mới gần bạn</p>
          <p class="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">Một bài đăng tặng quần áo ấm mới xuất hiện tại xã An Khánh (~2.3km).</p>
          <span class="text-[9px] text-slate-400 mt-1 block">10 phút trước</span>
        </div>
      </div>
      <div class="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
        <i class="fa-solid fa-shield-heart text-emerald-600 mt-0.5 text-xs"></i>
        <div>
          <p class="font-bold text-slate-800 text-xs">Bảo mật thông tin 100%</p>
          <p class="text-[10px] sm:text-[11px] text-slate-600 mt-0.5">Tất cả bài viết được AI che số nhà và mã hóa số điện thoại.</p>
          <span class="text-[9px] text-slate-400 mt-1 block">Hôm qua</span>
        </div>
      </div>
    `;
  }
}

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

  toast.className = `toast-item flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-xl text-xs font-semibold ${bg}`;
  toast.innerHTML = `<i class="fa-solid ${icon} shrink-0"></i> <span>${message}</span>`;

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
  updateAuthUI();
  renderFeed();

  const searchInput = document.getElementById("globalSearchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");

  searchInput.addEventListener("focus", () => {
    searchSuggestions.classList.remove("hidden");
  });

  searchInput.addEventListener("input", (e) => {
    handleGlobalSearch(e.target.value);
  });

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
