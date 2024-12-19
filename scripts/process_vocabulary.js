const fs = require('fs');

// Data terjemahan dan contoh untuk kata-kata umum
const commonWords = {
  'はじめまして': {
    meaning: 'Senang bertemu dengan Anda',
    example: 'はじめまして、田中です。',
    category: 'salam',
    level: 'basic'
  },
  'こんにちは': {
    meaning: 'Selamat siang/Halo',
    example: 'こんにちは、お元気ですか。',
    category: 'salam',
    level: 'basic'
  },
  'ありがとう': {
    meaning: 'Terima kasih',
    example: 'ありがとうございます。',
    category: 'salam',
    level: 'basic'
  },
  '食べる': {
    meaning: 'Makan',
    example: '朝ごはんを食べます。',
    category: 'makanan',
    level: 'basic'
  },
  '飲む': {
    meaning: 'Minum',
    example: '水を飲みます。',
    category: 'makanan',
    level: 'basic'
  },
  '行く': {
    meaning: 'Pergi',
    example: '学校に行きます。',
    category: 'aktivitas',
    level: 'basic'
  },
  '来る': {
    meaning: 'Datang',
    example: '友達が来ます。',
    category: 'aktivitas',
    level: 'basic'
  },
  '見る': {
    meaning: 'Melihat',
    example: 'テレビを見ます。',
    category: 'aktivitas',
    level: 'basic'
  },
  '聞く': {
    meaning: 'Mendengar/Bertanya',
    example: '音楽を聞きます。',
    category: 'aktivitas',
    level: 'basic'
  },
  '話す': {
    meaning: 'Berbicara',
    example: '日本語を話します。',
    category: 'aktivitas',
    level: 'basic'
  },
  '勉強': {
    meaning: 'Belajar',
    example: '日本語を勉強します。',
    category: 'pendidikan',
    level: 'basic'
  },
  '仕事': {
    meaning: 'Pekerjaan',
    example: '仕事に行きます。',
    category: 'pekerjaan',
    level: 'basic'
  },
  '家族': {
    meaning: 'Keluarga',
    example: '私の家族です。',
    category: 'keluarga',
    level: 'basic'
  },
  '友達': {
    meaning: 'Teman',
    example: '友達と遊びます。',
    category: 'keluarga',
    level: 'basic'
  },
  '天気': {
    meaning: 'Cuaca',
    example: '今日は良い天気です。',
    category: 'cuaca',
    level: 'basic'
  }
};

// Baca file vocabulary.js yang ada
const vocabContent = fs.readFileSync('./data/vocabulary.js', 'utf-8');
let vocabData = JSON.parse(vocabContent.split('VOCABULARY_DATA =')[1].split(';')[0]);

// Update data dengan terjemahan dan contoh
vocabData = vocabData.map(word => {
  if (commonWords[word.word]) {
    return {
      ...word,
      ...commonWords[word.word]
    };
  }
  return word;
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
console.log('Berhasil menambahkan terjemahan dan contoh untuk kata-kata umum');
