// Life Pyramid Numerology System - Kim Tự Tháp Thần Số Học
class LifePyramidCalculator {
    constructor() {
        this.pyramidData = null;
    }

    // Tính toán Kim tự tháp cuộc sống dựa trên ngày sinh
    calculateLifePyramid(birthDate) {
        // Chuyển đổi date object hoặc string thành các thành phần
        let day, month, year;
        
        if (birthDate instanceof Date) {
            day = birthDate.getDate();
            month = birthDate.getMonth() + 1; // getMonth() trả về 0-11
            year = birthDate.getFullYear();
        } else if (typeof birthDate === 'string') {
            const date = new Date(birthDate);
            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();
        } else {
            // Nếu truyền vào 3 tham số riêng biệt
            day = arguments[0];
            month = arguments[1];
            year = arguments[2];
        }

        const birthData = {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year)
        };

        // Tầng 1 - Nền tảng (Base Level)
        const base = this.calculateBaseLevel(birthData);
        
        // Tầng 2 - Phát triển (Development Level)
        const development = this.calculateDevelopmentLevel(base);
        
        // Tầng 3 - Đỉnh cao (Peak Level)
        const peak = this.calculatePeakLevel(development);
        
        // Tầng 4 - Hoàn thiện (Completion Level)
        const completion = this.calculateCompletionLevel(peak);

        this.pyramidData = {
            level1: base,
            level2: development,
            level3: peak,
            level4: completion,
            birthData,
            lifePath: this.calculateLifePath(birthData)
        };

        return this.pyramidData;
    }

    // Tầng 1: Tính toán nền tảng
    calculateBaseLevel(birthData) {
        const { day, month, year } = birthData;
        
        // Vị trí 5: Tháng (giảm xuống 1 chữ số)
        const position5 = this.reduceToSingleDigit(month);
        
        // Vị trí 1: Ngày (giảm xuống 1 chữ số)
        const position1 = this.reduceToSingleDigit(day);
        
        // Vị trí 3: Năm (giảm xuống 1 chữ số)
        const position3 = this.reduceToSingleDigit(year);

        return {
            position1: {
                number: position1,
                meaning: this.getNumberMeaning(position1),
                element: "Ngày sinh - Bản chất cá nhân",
                energy: this.getNumberEnergy(position1)
            },
            position3: {
                number: position3,
                meaning: this.getNumberMeaning(position3),
                element: "Năm sinh - Sứ mệnh thế hệ",
                energy: this.getNumberEnergy(position3)
            },
            position5: {
                number: position5,
                meaning: this.getNumberMeaning(position5),
                element: "Tháng sinh - Cảm xúc và trực giác",
                energy: this.getNumberEnergy(position5)
            }
        };
    }

    // Tầng 2: Giai đoạn phát triển
    calculateDevelopmentLevel(base) {
        // Vị trí 6: Tổng của position 5 và position 1
        const position6Number = this.reduceToSingleDigit(base.position5.number + base.position1.number);
        const position6Age = this.calculatePyramidAge(base.position5.number, base.position1.number);
        
        // Vị trí 4: Tổng của position 1 và position 3
        const position4Number = this.reduceToSingleDigit(base.position1.number + base.position3.number);
        const position4Age = this.calculatePyramidAge(base.position1.number, base.position3.number);

        return {
            position6: {
                number: position6Number,
                age: position6Age,
                year: new Date().getFullYear() - new Date().getFullYear() + position6Age, // Tính năm dựa trên tuổi
                meaning: this.getNumberMeaning(position6Number),
                element: "Phát triển cảm xúc và tài năng",
                energy: this.getNumberEnergy(position6Number),
                period: "Giai đoạn xây dựng nền tảng"
            },
            position4: {
                number: position4Number,
                age: position4Age,
                year: new Date().getFullYear() - new Date().getFullYear() + position4Age,
                meaning: this.getNumberMeaning(position4Number),
                element: "Phát triển sự nghiệp và mối quan hệ",
                energy: this.getNumberEnergy(position4Number),
                period: "Giai đoạn thành lập gia đình/sự nghiệp"
            }
        };
    }

    // Tầng 3: Đỉnh cao
    calculatePeakLevel(development) {
        const position10Number = this.reduceToSingleDigit(development.position6.number + development.position4.number);
        const position10Age = Math.round((development.position6.age + development.position4.age) / 2) + 9;

        return {
            position10: {
                number: position10Number,
                age: position10Age,
                year: new Date().getFullYear() - new Date().getFullYear() + position10Age,
                meaning: this.getNumberMeaning(position10Number),
                element: "Đỉnh cao trí tuệ và kinh nghiệm",
                energy: this.getNumberEnergy(position10Number),
                period: "Giai đoạn thành tựu và lãnh đạo"
            }
        };
    }

    // Tầng 4: Hoàn thiện
    calculateCompletionLevel(peak) {
        // Sử dụng Life Path number cho đỉnh cuối cùng
        const position8Number = 8; // Theo hình ảnh
        const position8Age = peak.position10.age + 9;

        return {
            position8: {
                number: position8Number,
                age: position8Age,
                year: new Date().getFullYear() - new Date().getFullYear() + position8Age,
                meaning: this.getNumberMeaning(position8Number),
                element: "Hoàn thiện sứ mệnh cuộc đời",
                energy: this.getNumberEnergy(position8Number),
                period: "Giai đoạn truyền thụ và hoàn thiện"
            }
        };
    }

    // Tính tuổi cho kim tự tháp (công thức đặc biệt)
    calculatePyramidAge(num1, num2) {
        const diff = Math.abs(num1 - num2);
        return 27 + diff * 9; // Công thức tính tuổi trong pyramid
    }

    // Giảm số về 1 chữ số (trừ Master Numbers)
    reduceToSingleDigit(number) {
        if (number === 11 || number === 22 || number === 33) {
            return number; // Giữ Master Numbers
        }
        
        while (number > 9) {
            let sum = 0;
            while (number > 0) {
                sum += number % 10;
                number = Math.floor(number / 10);
            }
            number = sum;
        }
        return number;
    }

    // Tính Life Path Number
    calculateLifePath(birthData) {
        const { day, month, year } = birthData;
        const total = day + month + year;
        return this.reduceToSingleDigit(total);
    }

    // Ý nghĩa của từng số
    getNumberMeaning(number) {
        const meanings = {
            1: {
                title: "Người Tiên Phong",
                description: "Lãnh đạo, độc lập, sáng tạo, khởi đầu mới",
                traits: ["Tự lập", "Quyết đoán", "Sáng tạo", "Tiên phong"],
                challenges: ["Cô đơn", "Kiêu ngạo", "Thiếu kiên nhẫn"]
            },
            2: {
                title: "Người Hợp Tác",
                description: "Hòa hợp, hợp tác, nhạy cảm, làm việc nhóm",
                traits: ["Hợp tác", "Nhạy cảm", "Kiên nhẫn", "Hòa bình"],
                challenges: ["Thiếu tự tin", "Phụ thuộc", "Dễ bị tổn thương"]
            },
            3: {
                title: "Người Sáng Tạo",
                description: "Giao tiếp, sáng tạo, lạc quan, nghệ thuật",
                traits: ["Sáng tạo", "Giao tiếp", "Lạc quan", "Nghệ thuật"],
                challenges: ["Thiếu tập trung", "Phân tán", "Nông cạn"]
            },
            4: {
                title: "Người Xây Dựng",
                description: "Thực tế, tổ chức, kỷ luật, xây dựng",
                traits: ["Thực tế", "Kỷ luật", "Tổ chức", "Đáng tin cậy"],
                challenges: ["Cứng nhắc", "Thiếu linh hoạt", "Quá cẩn thận"]
            },
            5: {
                title: "Người Tự Do",
                description: "Tự do, phiêu lưu, linh hoạt, thay đổi",
                traits: ["Tự do", "Linh hoạt", "Phiêu lưu", "Năng động"],
                challenges: ["Thiếu ổn định", "Bồn chồn", "Thiếu cam kết"]
            },
            6: {
                title: "Người Nuôi Dưỡng",
                description: "Chăm sóc, trách nhiệm, gia đình, hòa hợp",
                traits: ["Chăm sóc", "Trách nhiệm", "Yêu thương", "Hòa hợp"],
                challenges: ["Quá bảo vệ", "Hy sinh quá mức", "Kiểm soát"]
            },
            7: {
                title: "Người Tìm Kiếm",
                description: "Tâm linh, phân tích, nội tâm, trí tuệ",
                traits: ["Tâm linh", "Trí tuệ", "Phân tích", "Nội tâm"],
                challenges: ["Cô lập", "Hoài nghi", "Thiếu thực tế"]
            },
            8: {
                title: "Người Thành Tựu",
                description: "Quyền lực, thành tựu, vật chất, tổ chức",
                traits: ["Quyền lực", "Thành tựu", "Tổ chức", "Thực tế"],
                challenges: ["Ham quyền", "Vật chất", "Thiếu cảm xúc"]
            },
            9: {
                title: "Người Phục Vụ",
                description: "Nhân đạo, phục vụ, hoàn thiện, từ bi",
                traits: ["Nhân đạo", "Phục vụ", "Từ bi", "Hoàn thiện"],
                challenges: ["Hy sinh quá mức", "Thiếu thực tế", "Cảm xúc"]
            },
            11: {
                title: "Master - Người Truyền Cảm Hứng",
                description: "Trực giác, cảm hứng, tâm linh, lãnh đạo tâm linh",
                traits: ["Trực giác", "Cảm hứng", "Tâm linh", "Sáng suốt"],
                challenges: ["Căng thẳng", "Nhạy cảm quá mức", "Mơ mộng"]
            },
            22: {
                title: "Master - Người Xây Dựng Vĩ Đại",
                description: "Xây dựng lớn, thực hiện ước mơ, lãnh đạo thế giới",
                traits: ["Tầm nhìn", "Xây dựng", "Lãnh đạo", "Thực tế"],
                challenges: ["Áp lực", "Hoàn hảo", "Quá tham vọng"]
            },
            33: {
                title: "Master - Người Thầy Vĩ Đại",
                description: "Dạy dỗ, chữa lành, phục vụ nhân loại",
                traits: ["Dạy dỗ", "Chữa lành", "Phục vụ", "Từ bi"],
                challenges: ["Gánh nặng", "Hy sinh", "Căng thẳng"]
            }
        };
        
        return meanings[number] || meanings[1];
    }

    // Năng lượng của số
    getNumberEnergy(number) {
        const energies = {
            1: "🔥 Năng lượng Yang - Chủ động, mạnh mẽ",
            2: "🌙 Năng lượng Yin - Nhận, hòa hợp",
            3: "⭐ Năng lượng Sáng tạo - Biểu đạt, vui vẻ",
            4: "🌍 Năng lượng Đất - Ổn định, thực tế",
            5: "💨 Năng lượng Khí - Tự do, thay đổi",
            6: "💖 Năng lượng Tình yêu - Chăm sóc, hòa hợp",
            7: "🔮 Năng lượng Tâm linh - Trí tuệ, nội tâm",
            8: "💎 Năng lượng Vật chất - Quyền lực, thành tựu",
            9: "🌟 Năng lượng Hoàn thiện - Phục vụ, nhân đạo",
            11: "✨ Năng lượng Trực giác - Cảm hứng, tâm linh",
            22: "🏗️ Năng lượng Xây dựng - Tầm nhìn, thực hiện",
            33: "🕊️ Năng lượng Chữa lành - Dạy dỗ, yêu thương"
        };
        
        return energies[number] || energies[1];
    }

    // Format dữ liệu để hiển thị
    formatPyramidDisplay() {
        if (!this.pyramidData) return null;

        const { base, development, peak, completion } = this.pyramidData;

        return {
            title: "🔺 Kim Tự Tháp Thần Số Học Của Bạn",
            description: "Chu kỳ cuộc sống và các giai đoạn phát triển",
            levels: [
                {
                    level: 4,
                    title: "Tầng 4 - Hoàn Thiện",
                    positions: [completion.position8],
                    description: "Giai đoạn truyền thụ và hoàn thiện sứ mệnh"
                },
                {
                    level: 3,
                    title: "Tầng 3 - Đỉnh Cao",
                    positions: [peak.position10],
                    description: "Đỉnh cao trí tuệ và kinh nghiệm sống"
                },
                {
                    level: 2,
                    title: "Tầng 2 - Phát Triển",
                    positions: [development.position6, development.position4],
                    description: "Giai đoạn phát triển sự nghiệp và gia đình"
                },
                {
                    level: 1,
                    title: "Tầng 1 - Nền Tảng",
                    positions: [base.position5, base.position1, base.position3],
                    description: "Nền tảng cơ bản của cuộc sống"
                }
            ]
        };
    }

    // Lời khuyên dựa trên giai đoạn hiện tại
    getCurrentLifeAdvice(currentAge) {
        if (!this.pyramidData) return null;

        const { development, peak, completion } = this.pyramidData;
        let currentPhase = null;
        let advice = "";

        if (currentAge <= development.position6.age) {
            currentPhase = development.position6;
            advice = "Đây là thời gian tập trung vào phát triển tài năng và cảm xúc. Hãy học hỏi và xây dựng nền tảng vững chắc.";
        } else if (currentAge <= development.position4.age) {
            currentPhase = development.position4;
            advice = "Giai đoạn quan trọng cho sự nghiệp và các mối quan hệ. Hãy tập trung vào mục tiêu dài hạn.";
        } else if (currentAge <= peak.position10.age) {
            currentPhase = peak.position10;
            advice = "Bạn đang ở đỉnh cao của cuộc sống. Đây là lúc phát huy tối đa khả năng và chia sẻ kinh nghiệm.";
        } else {
            currentPhase = completion.position8;
            advice = "Thời gian hoàn thiện và truyền đạt. Hãy tập trung vào việc để lại di sản và hướng dẫn thế hệ sau.";
        }

        return {
            currentPhase,
            advice,
            lifeLessons: this.getLifeLessons(currentPhase.number)
        };
    }

    // Bài học cuộc sống theo số
    getLifeLessons(number) {
        const lessons = {
            1: ["Học cách lãnh đạo một cách khiêm tốn", "Phát triển sự độc lập nhưng không cô lập"],
            2: ["Học cách hợp tác mà không mất đi bản thân", "Phát triển sự tự tin"],
            3: ["Học cách tập trung và hoàn thành công việc", "Sử dụng sáng tạo một cách có ích"],
            4: ["Học cách linh hoạt trong kế hoạch", "Cân bằng giữa công việc và cuộc sống"],
            5: ["Học cách cam kết và ổn định", "Sử dụng năng lượng một cách hiệu quả"],
            6: ["Học cách chăm sóc bản thân", "Không quá can thiệp vào cuộc sống người khác"],
            7: ["Học cách chia sẻ kiến thức", "Cân bằng giữa tâm linh và thực tế"],
            8: ["Học cách sử dụng quyền lực một cách khôn ngoan", "Không quên giá trị tinh thần"],
            9: ["Học cách phục vụ mà không hy sinh quá mức", "Hoàn thiện bản thân trước khi giúp đỡ"],
            11: ["Học cách quản lý năng lượng nhạy cảm", "Biến trực giác thành hành động thực tế"],
            22: ["Học cách thực hiện tầm nhìn một cách từ từ", "Cân bằng giữa lý tưởng và thực tế"],
            33: ["Học cách chữa lành bản thân trước", "Dạy dỗ bằng gương sống"]
        };
        
        return lessons[number] || lessons[1];
    }

    // Tính tuổi hiện tại từ ngày sinh
    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    // Tạo lời khuyên dựa trên kim tự tháp và tuổi hiện tại
    generateAdvice(pyramid, currentAge) {
        const currentLevel = this.getCurrentLevel(currentAge);
        const advice = {
            main: `Bạn hiện đang ở giai đoạn ${currentLevel.name} (${currentLevel.ages}). `,
            lessons: []
        };

        // Thêm lời khuyên chung
        if (currentAge < 28) {
            advice.main += "Đây là thời kỳ học hỏi và khám phá. Hãy tận dụng để xây dựng nền tảng vững chắc.";
            advice.lessons = [
                "Tập trung vào việc học và phát triển kỹ năng",
                "Xây dựng mối quan hệ tích cực",
                "Khám phá đam mê và tài năng của bạn"
            ];
        } else if (currentAge < 37) {
            advice.main += "Thời kỳ xây dựng sự nghiệp và ổn định cuộc sống. Hãy quyết đoán và hành động.";
            advice.lessons = [
                "Đặt mục tiêu rõ ràng cho sự nghiệp",
                "Cân bằng giữa công việc và cuộc sống",
                "Xây dựng mạng lưới quan hệ chuyên nghiệp"
            ];
        } else if (currentAge < 46) {
            advice.main += "Giai đoạn thành công và phát triển. Hãy tận dụng kinh nghiệm để đạt đỉnh cao.";
            advice.lessons = [
                "Phát huy thế mạnh và kinh nghiệm",
                "Hướng dẫn và truyền đạt cho thế hệ trẻ",
                "Mở rộng tầm nhìn và ảnh hưởng"
            ];
        } else {
            advice.main += "Thời kỳ hoàn thiện và truyền đạt. Hãy chia sẻ trí tuệ và tận hưởng thành quả.";
            advice.lessons = [
                "Chia sẻ kinh nghiệm và trí tuệ",
                "Tận hưởng thành quả của cuộc đời",
                "Để lại di sản tích cực cho thế hệ sau"
            ];
        }

        return advice;
    }

    // Xác định giai đoạn hiện tại
    getCurrentLevel(age) {
        if (age < 28) return { name: "Khởi đầu", ages: "0-27 tuổi" };
        if (age < 37) return { name: "Trưởng thành", ages: "28-36 tuổi" };
        if (age < 46) return { name: "Phát triển", ages: "37-45 tuổi" };
        return { name: "Thành tựu", ages: "46+ tuổi" };
    }
}

// Export cho global scope
window.LifePyramidCalculator = LifePyramidCalculator;
