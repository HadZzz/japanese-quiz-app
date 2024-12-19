export const KATAKANA_DATA = [
  // Vowels
  { kana: 'ア', romaji: 'a', type: 'vowel' },
  { kana: 'イ', romaji: 'i', type: 'vowel' },
  { kana: 'ウ', romaji: 'u', type: 'vowel' },
  { kana: 'エ', romaji: 'e', type: 'vowel' },
  { kana: 'オ', romaji: 'o', type: 'vowel' },

  // K-group
  { kana: 'カ', romaji: 'ka', type: 'k' },
  { kana: 'キ', romaji: 'ki', type: 'k' },
  { kana: 'ク', romaji: 'ku', type: 'k' },
  { kana: 'ケ', romaji: 'ke', type: 'k' },
  { kana: 'コ', romaji: 'ko', type: 'k' },

  // S-group
  { kana: 'サ', romaji: 'sa', type: 's' },
  { kana: 'シ', romaji: 'shi', type: 's' },
  { kana: 'ス', romaji: 'su', type: 's' },
  { kana: 'セ', romaji: 'se', type: 's' },
  { kana: 'ソ', romaji: 'so', type: 's' },

  // T-group
  { kana: 'タ', romaji: 'ta', type: 't' },
  { kana: 'チ', romaji: 'chi', type: 't' },
  { kana: 'ツ', romaji: 'tsu', type: 't' },
  { kana: 'テ', romaji: 'te', type: 't' },
  { kana: 'ト', romaji: 'to', type: 't' },

  // N-group
  { kana: 'ナ', romaji: 'na', type: 'n' },
  { kana: 'ニ', romaji: 'ni', type: 'n' },
  { kana: 'ヌ', romaji: 'nu', type: 'n' },
  { kana: 'ネ', romaji: 'ne', type: 'n' },
  { kana: 'ノ', romaji: 'no', type: 'n' },

  // H-group
  { kana: 'ハ', romaji: 'ha', type: 'h' },
  { kana: 'ヒ', romaji: 'hi', type: 'h' },
  { kana: 'フ', romaji: 'fu', type: 'h' },
  { kana: 'ヘ', romaji: 'he', type: 'h' },
  { kana: 'ホ', romaji: 'ho', type: 'h' },

  // M-group
  { kana: 'マ', romaji: 'ma', type: 'm' },
  { kana: 'ミ', romaji: 'mi', type: 'm' },
  { kana: 'ム', romaji: 'mu', type: 'm' },
  { kana: 'メ', romaji: 'me', type: 'm' },
  { kana: 'モ', romaji: 'mo', type: 'm' },

  // Y-group
  { kana: 'ヤ', romaji: 'ya', type: 'y' },
  { kana: 'ユ', romaji: 'yu', type: 'y' },
  { kana: 'ヨ', romaji: 'yo', type: 'y' },

  // R-group
  { kana: 'ラ', romaji: 'ra', type: 'r' },
  { kana: 'リ', romaji: 'ri', type: 'r' },
  { kana: 'ル', romaji: 'ru', type: 'r' },
  { kana: 'レ', romaji: 're', type: 'r' },
  { kana: 'ロ', romaji: 'ro', type: 'r' },

  // W-group
  { kana: 'ワ', romaji: 'wa', type: 'w' },
  { kana: 'ヲ', romaji: 'wo', type: 'w' },

  // N
  { kana: 'ン', romaji: 'n', type: 'n' },

  // Dakuten variations
  { kana: 'ガ', romaji: 'ga', type: 'k-dakuten' },
  { kana: 'ギ', romaji: 'gi', type: 'k-dakuten' },
  { kana: 'グ', romaji: 'gu', type: 'k-dakuten' },
  { kana: 'ゲ', romaji: 'ge', type: 'k-dakuten' },
  { kana: 'ゴ', romaji: 'go', type: 'k-dakuten' },

  { kana: 'ザ', romaji: 'za', type: 's-dakuten' },
  { kana: 'ジ', romaji: 'ji', type: 's-dakuten' },
  { kana: 'ズ', romaji: 'zu', type: 's-dakuten' },
  { kana: 'ゼ', romaji: 'ze', type: 's-dakuten' },
  { kana: 'ゾ', romaji: 'zo', type: 's-dakuten' },

  { kana: 'ダ', romaji: 'da', type: 't-dakuten' },
  { kana: 'ヂ', romaji: 'ji', type: 't-dakuten' },
  { kana: 'ヅ', romaji: 'zu', type: 't-dakuten' },
  { kana: 'デ', romaji: 'de', type: 't-dakuten' },
  { kana: 'ド', romaji: 'do', type: 't-dakuten' },

  { kana: 'バ', romaji: 'ba', type: 'h-dakuten' },
  { kana: 'ビ', romaji: 'bi', type: 'h-dakuten' },
  { kana: 'ブ', romaji: 'bu', type: 'h-dakuten' },
  { kana: 'ベ', romaji: 'be', type: 'h-dakuten' },
  { kana: 'ボ', romaji: 'bo', type: 'h-dakuten' },

  // Handakuten variations
  { kana: 'パ', romaji: 'pa', type: 'h-handakuten' },
  { kana: 'ピ', romaji: 'pi', type: 'h-handakuten' },
  { kana: 'プ', romaji: 'pu', type: 'h-handakuten' },
  { kana: 'ペ', romaji: 'pe', type: 'h-handakuten' },
  { kana: 'ポ', romaji: 'po', type: 'h-handakuten' },

  // Special combinations
  { kana: 'キャ', romaji: 'kya', type: 'combination' },
  { kana: 'キュ', romaji: 'kyu', type: 'combination' },
  { kana: 'キョ', romaji: 'kyo', type: 'combination' },
  { kana: 'シャ', romaji: 'sha', type: 'combination' },
  { kana: 'シュ', romaji: 'shu', type: 'combination' },
  { kana: 'ショ', romaji: 'sho', type: 'combination' },
  { kana: 'チャ', romaji: 'cha', type: 'combination' },
  { kana: 'チュ', romaji: 'chu', type: 'combination' },
  { kana: 'チョ', romaji: 'cho', type: 'combination' },
  { kana: 'ニャ', romaji: 'nya', type: 'combination' },
  { kana: 'ニュ', romaji: 'nyu', type: 'combination' },
  { kana: 'ニョ', romaji: 'nyo', type: 'combination' },
  { kana: 'ヒャ', romaji: 'hya', type: 'combination' },
  { kana: 'ヒュ', romaji: 'hyu', type: 'combination' },
  { kana: 'ヒョ', romaji: 'hyo', type: 'combination' },
  { kana: 'ミャ', romaji: 'mya', type: 'combination' },
  { kana: 'ミュ', romaji: 'myu', type: 'combination' },
  { kana: 'ミョ', romaji: 'myo', type: 'combination' },
  { kana: 'リャ', romaji: 'rya', type: 'combination' },
  { kana: 'リュ', romaji: 'ryu', type: 'combination' },
  { kana: 'リョ', romaji: 'ryo', type: 'combination' },
  { kana: 'ギャ', romaji: 'gya', type: 'combination' },
  { kana: 'ギュ', romaji: 'gyu', type: 'combination' },
  { kana: 'ギョ', romaji: 'gyo', type: 'combination' },
  { kana: 'ジャ', romaji: 'ja', type: 'combination' },
  { kana: 'ジュ', romaji: 'ju', type: 'combination' },
  { kana: 'ジョ', romaji: 'jo', type: 'combination' },
  { kana: 'ビャ', romaji: 'bya', type: 'combination' },
  { kana: 'ビュ', romaji: 'byu', type: 'combination' },
  { kana: 'ビョ', romaji: 'byo', type: 'combination' },
  { kana: 'ピャ', romaji: 'pya', type: 'combination' },
  { kana: 'ピュ', romaji: 'pyu', type: 'combination' },
  { kana: 'ピョ', romaji: 'pyo', type: 'combination' },
];
