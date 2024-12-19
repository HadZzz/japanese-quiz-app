const fs = require('fs');
const csv = require('csv-parse/sync');
const path = require('path');

// Tentukan path yang benar
const csvPath = path.join(__dirname, '..', 'data', 'heisig-kanjis.csv');
const outputPath = path.join(__dirname, '..', 'data', 'kanji.js');

console.log('Reading CSV file from:', csvPath);

// Baca file CSV
const csvData = fs.readFileSync(csvPath, 'utf-8');
const records = csv.parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

console.log('Total records found:', records.length);

// Fungsi untuk mengkategorikan kanji
function getCategory(keyword) {
  const categories = {
    numbers: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'hundred', 'thousand'],
    time: ['day', 'month', 'year', 'time', 'minute', 'hour', 'week', 'spring', 'summer', 'autumn', 'winter'],
    nature: ['tree', 'fire', 'water', 'earth', 'gold', 'mountain', 'river', 'rice field', 'sun', 'moon', 'star', 'rain', 'snow', 'wind', 'cloud', 'thunder', 'lightning'],
    actions: ['see', 'go', 'come', 'eat', 'drink', 'read', 'write', 'speak', 'live', 'die', 'walk', 'run', 'stand', 'sit', 'sleep', 'wake', 'work', 'play', 'study', 'teach'],
    adjectives: ['big', 'small', 'long', 'short', 'high', 'low', 'good', 'bad', 'new', 'old', 'hot', 'cold', 'heavy', 'light', 'fast', 'slow', 'easy', 'difficult'],
    people: ['person', 'woman', 'man', 'child', 'father', 'mother', 'sister', 'brother', 'friend', 'teacher', 'student', 'doctor', 'nurse'],
    places: ['country', 'city', 'village', 'house', 'school', 'hospital', 'store', 'restaurant', 'park', 'station', 'airport', 'port'],
    objects: ['book', 'pen', 'paper', 'money', 'car', 'train', 'plane', 'ship', 'phone', 'computer', 'table', 'chair', 'door', 'window']
  };

  const lowercaseKeyword = keyword.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(k => lowercaseKeyword.includes(k))) {
      return category;
    }
  }
  return 'objects'; // default category
}

// Konversi data ke format yang dibutuhkan
const kanjiData = records.map(record => {
  const category = getCategory(record.keyword_6th_ed);
  const meaning = record.keyword_6th_ed.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    kanji: record.kanji,
    meaning: meaning,
    onyomi: record.on_reading.replace(/;/g, '、').trim(),
    kunyomi: record.kun_reading.replace(/;/g, '、').trim(),
    examples: [], // Akan ditambahkan nanti
    category: category,
    level: record.jlpt || 'N5',
    stroke_count: parseInt(record.stroke_count),
    heisig_id: parseInt(record.id_6th_ed)
  };
});

console.log('Data converted successfully');
console.log('Categories distribution:');
const categoryCount = {};
kanjiData.forEach(k => {
  categoryCount[k.category] = (categoryCount[k.category] || 0) + 1;
});
console.log(categoryCount);

// Tulis hasil ke file JavaScript
const output = `// Auto-generated from heisig-kanjis.csv
export const KANJI_DATA = ${JSON.stringify(kanjiData, null, 2)};

export const KANJI_CATEGORIES = [
  { id: 'all', name: 'Semua' },
  { id: 'numbers', name: 'Angka' },
  { id: 'time', name: 'Waktu' },
  { id: 'nature', name: 'Alam' },
  { id: 'people', name: 'Orang' },
  { id: 'actions', name: 'Kata Kerja' },
  { id: 'adjectives', name: 'Kata Sifat' },
  { id: 'objects', name: 'Benda' },
  { id: 'places', name: 'Tempat' }
];

export const JLPT_LEVELS = [
  { id: 'all', name: 'Semua Level' },
  { id: 'N5', name: 'N5 (Dasar)' },
  { id: 'N4', name: 'N4' },
  { id: 'N3', name: 'N3' },
  { id: 'N2', name: 'N2' },
  { id: 'N1', name: 'N1 (Lanjut)' }
];`;

fs.writeFileSync(outputPath, output, 'utf-8');
console.log('File saved to:', outputPath); 