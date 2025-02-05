const baseUrl = "https://tembisa-independent-baptist.vercel.app/";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tembisa Independent Baptist Church | KJV Bible",
    template: "%s | Tembisa Independent Baptist Church",
  },
  description:
    "Tembisa Independent Baptist Church is a vibrant community of believers dedicated to spreading God's love and grace through Biblical teaching, worship, and fellowship.",
  keywords: [
    "Baptist Church",
    "Tembisa Church",
    "Independent Baptist",
    "KJV Bible",
    "Christian Community",
    "Bible Study",
    "Worship Service",
    "Biblical Teaching",
    "Christian Fellowship",
    "Gospel",
    "Salvation",
    "Jesus Christ",
  ],
  authors: [{ name: "Tembisa Independent Baptist Church" }],
  creator: "Tembisa Independent Baptist Church",
  publisher: "Tembisa Independent Baptist Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: baseUrl,
    siteName: "Tembisa Independent Baptist Church",
    title: "Tembisa Independent Baptist Church | KJV Bible",
    description:
      "Tembisa Independent Baptist Church is a vibrant community of believers dedicated to spreading God's love and grace through Biblical teaching, worship, and fellowship.",
    images: [
      {
        url: "/assets/TIBC.png",
        width: 1200,
        height: 630,
        alt: "Tembisa Independent Baptist Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tembisa Independent Baptist Church | KJV Bible",
    description:
      "Tembisa Independent Baptist Church is a vibrant community of believers dedicated to spreading God's love and grace through Biblical teaching, worship, and fellowship.",
    images: ["/assets/TIBC.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
};
