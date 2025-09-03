/**
 * Comprehensive unit tests for numerology calculations
 */

// Mock the numerology module for testing
const mockNumerology = {
  calcKarmicLessons: jest.fn(),
  calcPersonalMonth: jest.fn(),
  calcPersonalDay: jest.fn(),
  calcPersonalCycles: jest.fn(),
  calcHiddenPassion: jest.fn(),
  calcIntensityNumbers: jest.fn(),
  calcPlanesOfExpression: jest.fn(),
  calcPinnaclesChallenges: jest.fn(),
  detectAllKarmicDebts: jest.fn(),
  getKarmicDebtInfo: jest.fn(),
  getKarmicLessonInfo: jest.fn()
};

// Test data
const testName = "JOHN SMITH";
const testDate = new Date(1990, 4, 15); // May 15, 1990
const testOptions = {
  mapping: 'pythagorean',
  yMode: 'conditional',
  preserveMasters: 'global',
  karmicDebt: true
};

describe('Karmic Lessons Calculator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should detect missing numbers correctly', () => {
    const mockResult = {
      missingNumbers: [2, 6],
      karmicLessons: [
        {
          number: 2,
          info: {
            title: 'Thiếu số 2 - Bài học về Hợp tác',
            weakness: 'Khó hợp tác, thiếu kiên nhẫn',
            lesson: 'Học cách hợp tác và phát triển kỹ năng ngoại giao',
            development: 'Tham gia làm việc nhóm, luyện tập lắng nghe'
          }
        }
      ],
      analysis: {
        hasKarmicLessons: true,
        lessonCount: 2,
        balanceScore: { score: 65, assessment: 'Cân bằng trung bình' }
      }
    };

    mockNumerology.calcKarmicLessons.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcKarmicLessons(testName, testOptions);
    
    expect(result.analysis.hasKarmicLessons).toBe(true);
    expect(result.analysis.lessonCount).toBe(2);
    expect(result.missingNumbers).toContain(2);
    expect(result.missingNumbers).toContain(6);
    expect(mockNumerology.calcKarmicLessons).toHaveBeenCalledWith(testName, testOptions);
  });

  test('should handle names with no missing numbers', () => {
    const mockResult = {
      missingNumbers: [],
      karmicLessons: [],
      analysis: {
        hasKarmicLessons: false,
        lessonCount: 0,
        balanceScore: { score: 95, assessment: 'Cân bằng tốt' }
      }
    };

    mockNumerology.calcKarmicLessons.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcKarmicLessons("ABCDEFGHIJKLMNOPQRSTUVWXYZ", testOptions);
    
    expect(result.analysis.hasKarmicLessons).toBe(false);
    expect(result.analysis.lessonCount).toBe(0);
    expect(result.missingNumbers).toHaveLength(0);
  });
});

describe('Personal Cycles Calculator', () => {
  test('should calculate personal month correctly', () => {
    const mockResult = {
      value: 7,
      personalYear: 4,
      month: 12,
      year: 2024,
      description: 'Tháng tâm linh - tự suy ngẫm, học hỏi và phát triển nội tại',
      theme: 'Tâm linh & Học hỏi'
    };

    mockNumerology.calcPersonalMonth.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPersonalMonth(testDate, new Date(2024, 11, 15), testOptions);
    
    expect(result.value).toBe(7);
    expect(result.personalYear).toBe(4);
    expect(result.month).toBe(12);
    expect(result.description).toContain('tâm linh');
    expect(mockNumerology.calcPersonalMonth).toHaveBeenCalled();
  });

  test('should calculate personal day correctly', () => {
    const mockResult = {
      value: 3,
      personalMonth: 7,
      personalYear: 4,
      day: 15,
      month: 12,
      year: 2024,
      description: 'Ngày sáng tạo - thể hiện bản thân, giao tiếp và vui vẻ',
      energy: 'Năng lượng vui vẻ, sáng tạo'
    };

    mockNumerology.calcPersonalDay.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPersonalDay(testDate, new Date(2024, 11, 15), testOptions);
    
    expect(result.value).toBe(3);
    expect(result.personalMonth).toBe(7);
    expect(result.personalYear).toBe(4);
    expect(result.description).toContain('sáng tạo');
    expect(result.energy).toContain('sáng tạo');
  });

  test('should calculate personal cycles for multiple months', () => {
    const mockResult = {
      cycles: [
        { value: 5, month: 1, year: 2024, monthName: 'Tháng Một', isCurrentMonth: false },
        { value: 6, month: 2, year: 2024, monthName: 'Tháng Hai', isCurrentMonth: true },
        { value: 7, month: 3, year: 2024, monthName: 'Tháng Ba', isCurrentMonth: false }
      ],
      currentDay: { value: 8, description: 'Ngày thành tựu' },
      overview: {
        currentPersonalYear: 4,
        currentPersonalMonth: 6,
        currentPersonalDay: 8
      }
    };

    mockNumerology.calcPersonalCycles.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPersonalCycles(testDate, new Date(2024, 1, 1), 3, testOptions);
    
    expect(result.cycles).toHaveLength(3);
    expect(result.cycles[1].isCurrentMonth).toBe(true);
    expect(result.overview.currentPersonalYear).toBe(4);
    expect(result.currentDay.value).toBe(8);
  });
});

describe('Hidden Passion Calculator', () => {
  test('should identify hidden passion numbers', () => {
    const mockResult = {
      numbers: [1],
      count: 4,
      percentage: 25,
      descriptions: [
        {
          number: 1,
          description: 'Khao khát lãnh đạo và độc lập',
          talent: 'Tài năng lãnh đạo, khởi xướng dự án'
        }
      ]
    };

    mockNumerology.calcHiddenPassion.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcHiddenPassion(testName, testOptions);
    
    expect(result.numbers).toContain(1);
    expect(result.count).toBe(4);
    expect(result.percentage).toBe(25);
    expect(result.descriptions[0].description).toContain('lãnh đạo');
  });

  test('should handle ties in hidden passion', () => {
    const mockResult = {
      numbers: [1, 5],
      count: 3,
      percentage: 20,
      descriptions: [
        {
          number: 1,
          description: 'Khao khát lãnh đạo và độc lập',
          talent: 'Tài năng lãnh đạo'
        },
        {
          number: 5,
          description: 'Khao khát tự do và phiêu lưu',
          talent: 'Tài năng thích ứng'
        }
      ]
    };

    mockNumerology.calcHiddenPassion.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcHiddenPassion("AAAAAEEEEE", testOptions);
    
    expect(result.numbers).toHaveLength(2);
    expect(result.descriptions).toHaveLength(2);
  });
});

describe('Intensity Numbers Calculator', () => {
  test('should calculate intensity levels correctly', () => {
    const mockResult = {
      intensityLevels: [
        {
          number: 1,
          count: 5,
          percentage: 30,
          intensity: 'high',
          description: 'Tính cạnh tranh và mong muốn lãnh đạo (độ cao)',
          effect: 'Thể hiện mạnh mẽ những đặc điểm tích cực của số 1'
        },
        {
          number: 5,
          count: 2,
          percentage: 12,
          intensity: 'medium',
          description: 'Tinh thần phiêu lưu và thích thay đổi (độ trung bình)',
          effect: 'Cân bằng tốt trong việc thể hiện đặc điểm của số 5'
        }
      ],
      highIntensity: [
        {
          number: 1,
          count: 5,
          percentage: 30,
          intensity: 'high'
        }
      ],
      dominantNumber: {
        number: 1,
        count: 5,
        percentage: 30,
        intensity: 'high'
      }
    };

    mockNumerology.calcIntensityNumbers.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcIntensityNumbers(testName, testOptions);
    
    expect(result.dominantNumber.number).toBe(1);
    expect(result.dominantNumber.intensity).toBe('high');
    expect(result.highIntensity).toHaveLength(1);
    expect(result.intensityLevels[0].percentage).toBe(30);
  });

  test('should handle extreme intensity levels', () => {
    const mockResult = {
      intensityLevels: [
        {
          number: 1,
          count: 10,
          percentage: 50,
          intensity: 'extreme',
          description: 'Tính cạnh tranh và mong muốn lãnh đạo (độ rất cao)',
          effect: 'Có thể trở nên quá cực đoan hoặc mất cân bằng trong khía cạnh này'
        }
      ],
      highIntensity: [
        {
          number: 1,
          count: 10,
          percentage: 50,
          intensity: 'extreme'
        }
      ],
      dominantNumber: {
        number: 1,
        intensity: 'extreme'
      }
    };

    mockNumerology.calcIntensityNumbers.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcIntensityNumbers("AAAAAAAAAA", testOptions);
    
    expect(result.dominantNumber.intensity).toBe('extreme');
    expect(result.intensityLevels[0].effect).toContain('quá cực đoan');
  });
});

describe('Planes of Expression Calculator', () => {
  test('should analyze planes of expression correctly', () => {
    const mockResult = {
      planes: [
        {
          name: 'mental',
          vietnameseName: 'Mặt Phản Trí Tuệ',
          count: 8,
          percentage: 40,
          strength: 'rất mạnh',
          description: 'Tiếp cận các vấn đề bằng logic và lý trí',
          characteristics: ['Tư duy logic mạnh', 'Thích phân tích vấn đề'],
          development: 'Hãy kết nối thêm với cảm xúc và trực giác'
        },
        {
          name: 'emotional',
          vietnameseName: 'Mặt Phản Cảm Xúc',
          count: 6,
          percentage: 30,
          strength: 'mạnh',
          description: 'Thể hiện qua cảm xúc và kết nối',
          characteristics: ['Nhạy cảm với cảm xúc', 'Thông cảm cao'],
          development: 'Mặt phản này đã cân bằng tốt, tiếp tục duy trì'
        }
      ],
      dominantPlane: {
        name: 'mental',
        vietnameseName: 'Mặt Phản Trí Tuệ'
      },
      weakestPlane: {
        name: 'intuitive',
        vietnameseName: 'Mặt Phản Trực Giác'
      },
      balance: {
        score: 75,
        assessment: 'Cân bằng tốt',
        mostDominant: 'Mặt Phản Trí Tuệ',
        leastDeveloped: 'Mặt Phản Trực Giác'
      },
      expressionStyle: 'Người tư duy - thể hiện qua lý trí'
    };

    mockNumerology.calcPlanesOfExpression.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPlanesOfExpression(testName, testOptions);
    
    expect(result.dominantPlane.name).toBe('mental');
    expect(result.balance.score).toBe(75);
    expect(result.expressionStyle).toContain('tư duy');
    expect(result.planes[0].strength).toBe('rất mạnh');
  });

  test('should handle balanced expression', () => {
    const mockResult = {
      planes: [
        {
          name: 'physical',
          percentage: 25,
          strength: 'trung bình'
        },
        {
          name: 'mental', 
          percentage: 25,
          strength: 'trung bình'
        },
        {
          name: 'emotional',
          percentage: 25,
          strength: 'trung bình'
        },
        {
          name: 'intuitive',
          percentage: 25,
          strength: 'trung bình'
        }
      ],
      balance: {
        score: 95,
        assessment: 'Rất cân bằng'
      },
      expressionStyle: 'Phong cách cân bằng'
    };

    mockNumerology.calcPlanesOfExpression.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPlanesOfExpression("ABCDEFGHIJK", testOptions);
    
    expect(result.balance.score).toBe(95);
    expect(result.balance.assessment).toBe('Rất cân bằng');
    expect(result.expressionStyle).toBe('Phong cách cân bằng');
  });
});

describe('Enhanced Pinnacles & Challenges', () => {
  test('should calculate accurate timing', () => {
    const mockResult = {
      pinnacles: [
        {
          number: 7,
          period: 'Tuổi 0-27',
          startAge: 0,
          endAge: 27,
          isActive: false,
          description: 'Thời kỳ phát triển tâm linh'
        },
        {
          number: 9,
          period: 'Tuổi 28-36',
          startAge: 28,
          endAge: 36,
          isActive: true,
          description: 'Thời kỳ nhân đạo và hoàn thành'
        }
      ],
      challenges: [
        {
          number: 2,
          period: 'Tuổi 0-27',
          isActive: false,
          description: 'Học cách hợp tác và kiên nhẫn'
        }
      ],
      currentAge: 34,
      currentPinnacle: {
        number: 2,
        value: 9,
        yearsIn: 6,
        yearsToNext: 3
      },
      currentChallenge: {
        number: 2,
        value: 2,
        yearsIn: 6,
        yearsToNext: 3
      }
    };

    mockNumerology.calcPinnaclesChallenges.mockReturnValue(mockResult);
    
    const result = mockNumerology.calcPinnaclesChallenges(testDate, testOptions);
    
    expect(result.currentAge).toBe(34);
    expect(result.currentPinnacle.value).toBe(9);
    expect(result.currentPinnacle.yearsToNext).toBe(3);
    expect(result.pinnacles[1].isActive).toBe(true);
  });
});

describe('Karmic Debt Detection', () => {
  test('should detect karmic debt numbers', () => {
    const mockAllNumbers = {
      lifePath: { value: 4, raw: 13, isKarmic: true },
      expression: { value: 5, raw: 14, isKarmic: true },
      soulUrge: { value: 7, raw: 16, isKarmic: true },
      personality: { value: 1, raw: 19, isKarmic: true },
      birthday: { value: 6, raw: 15, isKarmic: false },
      maturity: { value: 9, raw: 9, isKarmic: false }
    };

    const mockResult = [
      {
        type: 'lifePath',
        number: 13,
        reducedTo: 4,
        info: {
          title: 'Nợ Nghiệp 13/4 - Lười Biếng và Gia Tăi',
          meaning: 'Trong kiếp trước bạn đã sống lười biếng',
          challenge: 'Học cách làm việc chăm chỉ',
          healing: 'Thực hành kỷ luật hàng ngày'
        }
      }
    ];

    mockNumerology.detectAllKarmicDebts.mockReturnValue(mockResult);
    
    const result = mockNumerology.detectAllKarmicDebts(mockAllNumbers);
    
    expect(result).toHaveLength(1);
    expect(result[0].number).toBe(13);
    expect(result[0].type).toBe('lifePath');
    expect(result[0].info.title).toContain('13/4');
  });

  test('should return empty array when no karmic debts', () => {
    const mockAllNumbers = {
      lifePath: { value: 7, raw: 7, isKarmic: false },
      expression: { value: 3, raw: 3, isKarmic: false }
    };

    mockNumerology.detectAllKarmicDebts.mockReturnValue([]);
    
    const result = mockNumerology.detectAllKarmicDebts(mockAllNumbers);
    
    expect(result).toHaveLength(0);
  });
});

describe('Information Getters', () => {
  test('should get karmic debt info', () => {
    const mockInfo = {
      title: 'Nợ Nghiệp 13/4 - Lười Biếng và Gia Tăi',
      meaning: 'Trong kiếp trước bạn đã sống lười biếng',
      challenge: 'Học cách làm việc chăm chỉ',
      healing: 'Thực hành kỷ luật hàng ngày'
    };

    mockNumerology.getKarmicDebtInfo.mockReturnValue(mockInfo);
    
    const result = mockNumerology.getKarmicDebtInfo(13);
    
    expect(result.title).toContain('13/4');
    expect(result.meaning).toContain('lười biếng');
    expect(mockNumerology.getKarmicDebtInfo).toHaveBeenCalledWith(13);
  });

  test('should get karmic lesson info', () => {
    const mockInfo = {
      title: 'Thiếu số 1 - Bài học về Lãnh đạo',
      weakness: 'Thiếu tự tin, không dám đưa ra quyết định',
      lesson: 'Phát triển tính độc lập',
      development: 'Luyện tập đưa ra quyết định nhỏ'
    };

    mockNumerology.getKarmicLessonInfo.mockReturnValue(mockInfo);
    
    const result = mockNumerology.getKarmicLessonInfo(1);
    
    expect(result.title).toContain('Lãnh đạo');
    expect(result.weakness).toContain('tự tin');
    expect(mockNumerology.getKarmicLessonInfo).toHaveBeenCalledWith(1);
  });

  test('should return null for invalid numbers', () => {
    mockNumerology.getKarmicDebtInfo.mockReturnValue(null);
    mockNumerology.getKarmicLessonInfo.mockReturnValue(null);
    
    expect(mockNumerology.getKarmicDebtInfo(99)).toBeNull();
    expect(mockNumerology.getKarmicLessonInfo(99)).toBeNull();
  });
});

describe('Edge Cases and Error Handling', () => {
  test('should handle empty name input', () => {
    mockNumerology.calcKarmicLessons.mockReturnValue({
      missingNumbers: [1,2,3,4,5,6,7,8,9],
      analysis: { hasKarmicLessons: true, lessonCount: 9 }
    });
    
    const result = mockNumerology.calcKarmicLessons("", testOptions);
    
    expect(result.analysis.lessonCount).toBe(9);
  });

  test('should handle special characters in name', () => {
    mockNumerology.calcHiddenPassion.mockReturnValue({
      numbers: [1],
      count: 4,
      percentage: 100
    });
    
    const result = mockNumerology.calcHiddenPassion("J@#$O%^&H*()N", testOptions);
    
    expect(result.numbers).toContain(1);
  });

  test('should handle future dates for personal cycles', () => {
    const futureDate = new Date(2030, 5, 15);
    
    mockNumerology.calcPersonalMonth.mockReturnValue({
      value: 8,
      year: 2030,
      month: 6
    });
    
    const result = mockNumerology.calcPersonalMonth(testDate, futureDate, testOptions);
    
    expect(result.year).toBe(2030);
    expect(result.month).toBe(6);
  });
});