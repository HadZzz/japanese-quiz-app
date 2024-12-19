const fs = require('fs');

// Kata-kata dasar yang sering digunakan
const basicWords = [
  'こんにちは', 'ありがとう', 'さようなら', 'おはよう', 'こんばんは',
  '私', '君', '彼', '彼女', '友達',
  '食べる', '飲む', '行く', '来る', '見る',
  '一', '二', '三', '四', '五',
  '今日', '明日', '昨日', '朝', '夜',
  '家', '学校', '駅', '店', '病院',
  '本', '鉛筆', '机', '椅子', 'ドア',
  '犬', '猫', '鳥', '魚', '馬',
  '赤', '青', '黄色', '白', '黒',
  '大きい', '小さい', '高い', '安い', '新しい'
];

// Kata-kata tingkat lanjut
const advancedWords = [
  '環境', '経済', '政治', '文化', '社会',
  '技術', '科学', '医療', '教育', '研究',
  '開発', '改善', '解決', '分析', '評価',
  '戦略', '方針', '計画', '目標', '成果',
  '理論', '哲学', '思想', '概念', '原理'
];

// Baca file vocabulary.js
const vocabContent = fs.readFileSync('./data/vocabulary.js', 'utf-8');
let vocabData = JSON.parse(vocabContent.split('VOCABULARY_DATA =')[1].split(';')[0]);

// Update level berdasarkan kompleksitas kata
vocabData = vocabData.map(word => {
  // Jika kata ada di daftar kata dasar
  if (basicWords.includes(word.word)) {
    return { ...word, level: 'basic' };
  }
  // Jika kata ada di daftar kata lanjut
  else if (advancedWords.includes(word.word)) {
    return { ...word, level: 'advanced' };
  }
  // Jika kata memiliki kanji kompleks atau panjang > 2
  else if (word.word.length > 2 || /[一-龯]/.test(word.word)) {
    return { ...word, level: 'advanced' };
  }
  // Sisanya tetap intermediate
  return { ...word, level: 'intermediate' };
});

// Tulis kembali ke file
const newContent = `
export const VOCABULARY_LEVELS = [
  { id: 'all', name: 'Semua Level' },
  { id: 'basic', name: 'Dasar' },
  { id: 'intermediate', name: 'Menengah' },
  { id: 'advanced', name: 'Lanjut' },
];

export const VOCABULARY_CATEGORIES = [
  { id: 'all', name: 'Semua Kategori' },
  { id: 'salam', name: 'Salam & Ungkapan' },
  { id: 'makanan', name: 'Makanan & Minuman' },
  { id: 'angka', name: 'Angka & Perhitungan' },
  { id: 'keluarga', name: 'Keluarga & Hubungan' },
  { id: 'cuaca', name: 'Cuaca & Musim' },
  { id: 'waktu', name: 'Waktu & Tanggal' },
  { id: 'tempat', name: 'Tempat & Lokasi' },
  { id: 'aktivitas', name: 'Aktivitas & Kegiatan' },
  { id: 'perasaan', name: 'Perasaan & Emosi' },
  { id: 'pekerjaan', name: 'Pekerjaan & Karir' },
  { id: 'transportasi', name: 'Transportasi' },
  { id: 'pendidikan', name: 'Pendidikan' },
  { id: 'hiburan', name: 'Hiburan & Hobi' },
  { id: 'kesehatan', name: 'Kesehatan' },
  { id: 'lainnya', name: 'Lainnya' }
];

export const VOCABULARY_DATA = ${JSON.stringify(vocabData, null, 2)};
`;

fs.writeFileSync('./data/vocabulary.js', newContent);
console.log('Berhasil memperbarui level kosakata');
