// verseData.js
export const dailyVerses = [
  {
    id: "JHN.3.16",
    description: "God's Love For the World",
  },
  {
    id: "ROM.8.28",
    description: "God Works for Our Good",
  },
  {
    id: "PSA.23.1",
    description: "The Lord is My Shepherd",
  },
  {
    id: "ISA.41.10",
    description: "Fear Not, For I Am With You",
  },
  {
    id: "PHP.4.13",
    description: "Strength Through Christ",
  },
  {
    id: "MAT.11.28",
    description: "Rest for the Weary",
  },
  {
    id: "JOS.1.9",
    description: "Be Strong and Courageous",
  },
  {
    id: "HEB.11.1",
    description: "Faith Defined",
  },
  {
    id: "1COR.10.13",
    description: "Dealing with Temptation",
  },
  {
    id: "PRO.3.5-6",
    description: "Trust in the Lord",
  },
  {
    id: "JAM.1.2-3",
    description: "Joy in Trials",
  },
  {
    id: "GAL.5.22-23",
    description: "Fruits of the Spirit",
  },
  {
    id: "PSA.46.1",
    description: "God Our Refuge",
  },
  {
    id: "ISA.40.31",
    description: "Renewed Strength",
  },
  {
    id: "2TI.1.7",
    description: "Spirit of Power",
  },
  {
    id: "HEB.12.2",
    description: "Eyes on Jesus",
  },
  {
    id: "ROM.12.12",
    description: "Joyful Hope",
  },
  {
    id: "PHP.2.3-4",
    description: "Humility and Service",
  },
  {
    id: "MAT.5.43-44",
    description: "Love Your Enemies",
  },
  {
    id: "JER.29.11",
    description: "Plans for Hope",
  },
  {
    id: "PRO.22.6",
    description: "Training Children",
  },
  {
    id: "PSA.118.24",
    description: "Rejoice in This Day",
  },
  {
    id: "ISA.55.6-7",
    description: "Seek the Lord",
  },
  {
    id: "JHN.14.6",
    description: "The Way, Truth, and Life",
  },
  {
    id: "ROM.5.8",
    description: "God's Love Demonstrated",
  },
  {
    id: "PSA.121.1-2",
    description: "Help from the Lord",
  },
  {
    id: "2COR.5.17",
    description: "New Creation in Christ",
  },
  {
    id: "MAT.28.19",
    description: "The Great Commission",
  },
  {
    id: "1PET.5.7",
    description: "Casting Your Cares",
  },
  {
    id: "REV.21.4",
    description: "No More Tears",
  },
];

export const getVerseIds = () => dailyVerses.map((verse) => verse.id);

export const getVerseDescription = (verseId) => {
  const verse = dailyVerses.find((v) => v.id === verseId);
  return verse ? verse.description : "";
};
