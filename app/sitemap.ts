import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/process", "/work", "/work/stream-tools", "/work/harvest", "/work/atom", "/collector", "/about", "/contact", "/privacy"];
  return paths.map((path) => ({ url: `https://kantimitsu.com${path}`, lastModified: new Date("2026-09-13"), changeFrequency: path === "" ? "monthly" : "yearly", priority: path === "" ? 1 : 0.7 }));
}
