import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jdongo.netlify.app";

  const routes = [
    "",
    "/about",
    "/activities",
    "/impact",
    "/daily-status",
    "/events",
    "/notices",
    "/gallery",
    "/reviews",
    "/membership",
    "/donate",
    "/members",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/daily-status" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/membership" || route === "/donate" ? 0.9 : 0.7,
  }));
}
