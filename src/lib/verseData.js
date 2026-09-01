// Curated Verse-of-the-Day rotation. References are human-readable so they can
// be requested directly from bible-api.com (free, no API key) in the KJV
// translation. KJV text is public domain and fixed, so the selection below is
// what makes the verse "today's" — the text itself is always fetched in KJV.

export const dailyVerses = [
  { reference: "John 3:16", theme: "God's Love For the World" },
  { reference: "Romans 8:28", theme: "God Works for Our Good" },
  { reference: "Psalm 23:1", theme: "The Lord is My Shepherd" },
  { reference: "Isaiah 41:10", theme: "Fear Not, For I Am With You" },
  { reference: "Philippians 4:13", theme: "Strength Through Christ" },
  { reference: "Matthew 11:28", theme: "Rest for the Weary" },
  { reference: "Joshua 1:9", theme: "Be Strong and Courageous" },
  { reference: "Hebrews 11:1", theme: "Faith Defined" },
  { reference: "1 Corinthians 10:13", theme: "Dealing with Temptation" },
  { reference: "Proverbs 3:5-6", theme: "Trust in the Lord" },
  { reference: "James 1:2-3", theme: "Joy in Trials" },
  { reference: "Galatians 5:22-23", theme: "Fruits of the Spirit" },
  { reference: "Psalm 46:1", theme: "God Our Refuge" },
  { reference: "Isaiah 40:31", theme: "Renewed Strength" },
  { reference: "2 Timothy 1:7", theme: "Spirit of Power" },
  { reference: "Hebrews 12:2", theme: "Eyes on Jesus" },
  { reference: "Romans 12:12", theme: "Joyful Hope" },
  { reference: "Philippians 2:3-4", theme: "Humility and Service" },
  { reference: "Matthew 5:43-44", theme: "Love Your Enemies" },
  { reference: "Jeremiah 29:11", theme: "Plans for Hope" },
  { reference: "Proverbs 22:6", theme: "Training Children" },
  { reference: "Psalm 118:24", theme: "Rejoice in This Day" },
  { reference: "Isaiah 55:6-7", theme: "Seek the Lord" },
  { reference: "John 14:6", theme: "The Way, Truth, and Life" },
  { reference: "Romans 5:8", theme: "God's Love Demonstrated" },
  { reference: "Psalm 121:1-2", theme: "Help from the Lord" },
  { reference: "2 Corinthians 5:17", theme: "New Creation in Christ" },
  { reference: "Matthew 28:19", theme: "The Great Commission" },
  { reference: "1 Peter 5:7", theme: "Casting Your Cares" },
  { reference: "Revelation 21:4", theme: "No More Tears" },
];

// Deterministic selection so everyone sees the same verse on a given day.
export const getVerseForDate = (date = new Date()) => {
  const dayNumber = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000
  );
  const index = ((dayNumber % dailyVerses.length) + dailyVerses.length) %
    dailyVerses.length;
  return dailyVerses[index];
};

// KJV fallback shown if the live fetch fails, so the section is never blank.
export const FALLBACK_VERSE = {
  reference: "Proverbs 3:5-6",
  theme: "Trust in the Lord",
  text:
    "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
};
