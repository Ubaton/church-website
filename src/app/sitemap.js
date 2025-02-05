const baseUrl = "https://tembisa-independent-baptist.vercel.app/";

export default function sitemap() {
  const routes = [
    "",
    "/about",
    "/sermons",
    "/sermons/all-sermons",
    "/contact-us",
    "/plan-your-visit",
    "/events",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
