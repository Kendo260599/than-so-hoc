// Simple Life Pyramid Calculator for Demo
class LifePyramidCalculator {
    constructor() {
        this.pyramidData = null;
    }

    // Tính tuổi hiện tại
    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    // Giảm số về 1 chữ số
    reduceToSingleDigit(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    }

    // Tính kim tự tháp cuộc đời
    async calculateLifePyramid(birthDate) {
        const day = birthDate.getDate();
        const month = birthDate.getMonth() + 1;
        const year = birthDate.getFullYear();
        const birthYear = year;

        // Tính các số cơ bản
        const dayNum = this.reduceToSingleDigit(day);
        const monthNum = this.reduceToSingleDigit(month);
        const yearNum = this.reduceToSingleDigit(year);
        const lifePathNum = this.reduceToSingleDigit(day + month + year);

        // Tính các vị trí kim tự tháp theo công thức truyền thống
        const pos1 = monthNum; // Tháng
        const pos2 = dayNum;   // Ngày
        const pos3 = yearNum;  // Năm
        const pos4 = this.reduceToSingleDigit(pos1 + pos2); // Tháng + Ngày
        const pos5 = this.reduceToSingleDigit(pos2 + pos3); // Ngày + Năm
        const pos6 = this.reduceToSingleDigit(pos4 + pos5); // Đỉnh kim tự tháp

        // Tạo cấu trúc kim tự tháp 4 tầng
        const pyramid = {
            level4: [this.createPosition(pos6, 46, 81, birthYear, "Đỉnh cao - Hoàn thiện")],
            level3: [
                this.createPosition(pos4, 28, 45, birthYear, "Giai đoạn thứ nhất"),
                this.createPosition(pos5, 28, 45, birthYear, "Giai đoạn thứ hai")
            ],
            level2: [
                this.createPosition(pos1, 9, 27, birthYear, "Chu kỳ đầu"),
                this.createPosition(pos2, 9, 27, birthYear, "Chu kỳ giữa"),
                this.createPosition(pos3, 9, 27, birthYear, "Chu kỳ cuối")
            ],
            level1: [
                this.createPosition(pos1, 0, 8, birthYear, "Khởi đầu"),
                this.createPosition(pos2, 0, 8, birthYear, "Phát triển"),
                this.createPosition(pos3, 0, 8, birthYear, "Ổn định"),
                this.createPosition(lifePathNum, 0, 8, birthYear, "Sứ mệnh")
            ]
        };

        return pyramid;
    }

    // Tạo một vị trí trong kim tự tháp
    createPosition(number, startAge, endAge, birthYear, phase) {
        return {
            number: number,
            startAge: startAge,
            endAge: endAge,
            startYear: birthYear + startAge,
            endYear: birthYear + endAge,
            meaning: this.getNumberMeaning(number),
            energy: this.getNumberEnergy(number),
            traits: this.getNumberTraits(number),
            challenges: this.getNumberChallenges(number),
            advice: this.getNumberAdvice(number),
            phase: phase
        };
    }

    // Ý nghĩa các số
    getNumberMeaning(num) {
        const meanings = {
            1: "Lãnh đạo, độc lập, khởi đầu mới, sáng tạo",
            2: "Hợp tác, cân bằng, quan hệ đối tác, nhạy cảm",
            3: "Sáng tạo, giao tiếp, nghệ thuật, vui vẻ",
            4: "Ổn định, thực tế, làm việc chăm chỉ, tổ chức",
            5: "Tự do, phiêu lưu, thay đổi, đa dạng",
            6: "Yêu thương, chăm sóc, gia đình, trách nhiệm",
            7: "Tâm linh, nghiên cứu, trí tuệ, huyền bí",
            8: "Vật chất, thành công, quyền lực, tham vọng",
            9: "Nhân đạo, hoàn thiện, phục vụ, từ bi",
            11: "Trực giác, cảm hứng, tâm linh, dẫn dắt",
            22: "Kiến trúc sư, tầm nhìn lớn, thực hiện",
            33: "Thầy giáo, chữa lành, yêu thương vô điều kiện"
        };
        return meanings[num] || meanings[1];
    }

    // Năng lượng số
    getNumberEnergy(num) {
        const energies = {
            1: "Năng lượng Yang - Mạnh mẽ, quyết đoán",
            2: "Năng lượng Yin - Dịu dàng, hỗ trợ",
            3: "Năng lượng Sáng tạo - Vui vẻ, biểu đạt",
            4: "Năng lượng Ổn định - Kiên định, thực tế",
            5: "Năng lượng Tự do - Linh hoạt, phiêu lưu",
            6: "Năng lượng Yêu thương - Ấm áp, chăm sóc",
            7: "Năng lượng Tâm linh - Sâu sắc, huyền bí",
            8: "Năng lượng Vật chất - Mạnh mẽ, thành công",
            9: "Năng lượng Phục vụ - Nhân đạo, rộng lượng",
            11: "Năng lượng Trực giác - Nhạy cảm, cảm hứng",
            22: "Năng lượng Xây dựng - Tầm nhìn, thực hiện",
            33: "Năng lượng Chữa lành - Yêu thương, dạy dỗ"
        };
        return energies[num] || energies[1];
    }

    // Đặc điểm
    getNumberTraits(num) {
        const traits = {
            1: ["Lãnh đạo", "Độc lập", "Tiên phong", "Sáng tạo", "Quyết đoán"],
            2: ["Hợp tác", "Nhạy cảm", "Kiên nhẫn", "Hòa bình", "Hỗ trợ"],
            3: ["Sáng tạo", "Giao tiếp", "Vui vẻ", "Nghệ thuật", "Lạc quan"],
            4: ["Thực tế", "Ổn định", "Chăm chỉ", "Tổ chức", "Tin cậy"],
            5: ["Tự do", "Linh hoạt", "Phiêu lưu", "Tò mò", "Năng động"],
            6: ["Yêu thương", "Chăm sóc", "Trách nhiệm", "Gia đình", "Hòa hợp"],
            7: ["Trí tuệ", "Tâm linh", "Nghiên cứu", "Trực giác", "Huyền bí"],
            8: ["Thành công", "Vật chất", "Quyền lực", "Tổ chức", "Tham vọng"],
            9: ["Nhân đạo", "Rộng lượng", "Phục vụ", "Trí tuệ", "Hoàn thiện"],
            11: ["Trực giác", "Cảm hứng", "Tâm linh", "Dẫn dắt", "Nhạy cảm"],
            22: ["Tầm nhìn", "Xây dựng", "Thực hiện", "Kiến trúc", "Quy mô lớn"],
            33: ["Chữa lành", "Dạy dỗ", "Yêu thương", "Phục vụ", "Hy sinh"]
        };
        return traits[num] || traits[1];
    }

    // Thử thách
    getNumberChallenges(num) {
        const challenges = {
            1: ["Khuynh hướng độc đoán", "Cần học cách hợp tác", "Tránh quá ích kỷ"],
            2: ["Thiếu tự tin", "Quá nhạy cảm", "Cần học cách quyết đoán"],
            3: ["Thiếu tập trung", "Nói nhiều hơn làm", "Cần học cách kiên nhẫn"],
            4: ["Quá cứng nhắc", "Sợ thay đổi", "Cần học cách linh hoạt"],
            5: ["Thiếu kiên nhẫn", "Khó cam kết", "Cần học cách ổn định"],
            6: ["Quá can thiệp", "Hy sinh quá mức", "Cần học cách cân bằng"],
            7: ["Quá cô lập", "Khó giao tiếp", "Cần học cách mở lòng"],
            8: ["Quá tham vọng", "Coi thường tinh thần", "Cần học cách cân bằng"],
            9: ["Quá lý tưởng", "Dễ thất vọng", "Cần học cách thực tế"],
            11: ["Quá nhạy cảm", "Khó kiểm soát cảm xúc", "Cần học cách bình tĩnh"],
            22: ["Áp lực quá lớn", "Mệt mỏi vì tầm nhìn", "Cần học cách từ từ"],
            33: ["Gánh nặng quá lớn", "Hy sinh quá nhiều", "Cần học cách tự chăm sóc"]
        };
        return challenges[num] || challenges[1];
    }

    // Lời khuyên
    getNumberAdvice(num) {
        const advice = {
            1: "Hãy dẫn dắt với lòng khiêm tốn và luôn lắng nghe ý kiến của người khác.",
            2: "Tin tương vào bản thân và học cách đưa ra quyết định độc lập khi cần thiết.",
            3: "Tập trung hoàn thành những gì bạn bắt đầu và sử dụng tài năng sáng tạo một cách có ích.",
            4: "Học cách linh hoạt và mở lòng với những cơ hội mới trong cuộc sống.",
            5: "Tìm sự cân bằng giữa tự do và trách nhiệm, học cách cam kết lâu dài.",
            6: "Chăm sóc bản thân trước khi chăm sóc người khác, học cách nói 'không' khi cần.",
            7: "Chia sẻ kiến thức và trí tuệ của bạn với thế giới, đừng giữ cho riêng mình.",
            8: "Sử dụng quyền lực và thành công để giúp đỡ người khác, đừng quên giá trị tinh thần.",
            9: "Hoàn thiện bản thân trước khi giúp đỡ người khác, học cách buông bỏ.",
            11: "Học cách quản lý năng lượng nhạy cảm và biến trực giác thành hành động thực tế.",
            22: "Thực hiện tầm nhìn của bạn từng bước một, đừng vội vàng.",
            33: "Chữa lành bản thân trước khi chữa lành người khác, dạy dỗ bằng gương sống."
        };
        return advice[num] || advice[1];
    }

    // Tạo lời khuyên tổng thể
    generateAdvice(pyramid, currentAge) {
        const advice = {
            main: this.getMainAdvice(currentAge),
            lessons: this.getLifeLessons(currentAge)
        };
        return advice;
    }

    getMainAdvice(age) {
        if (age < 9) return "Giai đoạn hình thành tính cách. Hãy khám phá và học hỏi.";
        if (age < 28) return "Thời kỳ phát triển và xây dựng nền tảng. Tận dụng cơ hội học hỏi.";
        if (age < 46) return "Giai đoạn thành tựu và phát triển sự nghiệp. Hãy quyết đoán và hành động.";
        return "Thời kỳ hoàn thiện và chia sẻ trí tuệ. Tận hưởng thành quả và hướng dẫn người khác.";
    }

    getLifeLessons(age) {
        if (age < 9) return [
            "Khám phá thế giới xung quanh",
            "Học cách giao tiếp và kết bạn",
            "Phát triển sở thích và tài năng"
        ];
        if (age < 28) return [
            "Xây dựng nền tảng kiến thức vững chắc",
            "Phát triển kỹ năng mềm và cứng",
            "Tìm hiểu bản thân và định hướng tương lai"
        ];
        if (age < 46) return [
            "Tập trung phát triển sự nghiệp",
            "Xây dựng mối quan hệ bền vững",
            "Cân bằng giữa công việc và cuộc sống"
        ];
        return [
            "Chia sẻ kinh nghiệm và trí tuệ",
            "Tận hưởng thành quả của cuộc đời",
            "Hướng dẫn và truyền cảm hứng cho người khác"
        ];
    }
}

// Export cho global scope
window.LifePyramidCalculator = LifePyramidCalculator;
