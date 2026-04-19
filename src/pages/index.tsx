import { useState } from "react";
import type { CSSProperties } from "react";

type LinkItem = {
  href: string;
  label: string;
  featured?: boolean;
};

const links: LinkItem[] = [
  { href: "https://twitter.com/nameko_simakaze", label: "Twitter (X)" },
  { href: "https://rielu.uniproject.jp", label: "プロフィールサイト", featured: true },
  { href: "https://qiita.com/aki-akatuki-namonakiheimin", label: "Qiita" },
  { href: "https://rielurandom.uniproject.jp", label: "ランダム数値ジェネレータ", featured: true },
  { href: "https://github.com/penti-nameko", label: "GitHub" },
  { href: "https://uniproject.jp", label: "Uniproject", featured: true },
];

const styles = {
  page: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    color: "#333",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    padding: "40px 20px",
    boxSizing: "border-box",
  } satisfies CSSProperties,

  container: {
    width: "100%",
    maxWidth: 480,
    textAlign: "center",
  } satisfies CSSProperties,

  profileImg: {
    width: 200,
    height: "auto",
    borderRadius: "50%",
    marginBottom: 16,
    objectFit: "cover",
    display: "block",
    margin: "0 auto 16px",
  } satisfies CSSProperties,

  heading: {
    fontSize: "1.25rem",
    margin: "0 0 8px",
  } satisfies CSSProperties,

  bio: {
    fontSize: "0.9rem",
    color: "#666",
    margin: "0 0 32px",
  } satisfies CSSProperties,

  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  } satisfies CSSProperties,

  linkItem: {
    display: "block",
    padding: 16,
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: 12,
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  } satisfies CSSProperties,

  linkItemHover: {
    backgroundColor: "#333",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  } satisfies CSSProperties,

  featured: {
    backgroundColor: "#f5deb3",
    color: "#fff",
    border: "none",
  } satisfies CSSProperties,

  featuredHover: {
    backgroundColor: "#0056b3",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  } satisfies CSSProperties,

  footer: {
    marginTop: 48,
    fontSize: "0.8rem",
    color: "#aaa",
  } satisfies CSSProperties,
} as const;

export default function Home(): JSX.Element {
  const [hovered, setHovered] = useState<number | null>(null);

  const getLinkStyle = (link: LinkItem, index: number): CSSProperties => ({
    ...styles.linkItem,
    ...(link.featured ? styles.featured : {}),
    ...(hovered === index
      ? link.featured
        ? styles.featuredHover
        : styles.linkItemHover
      : {}),
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* プロフィール画像 */}
        <img
          src="/profile.png"
          alt="プロフィール画像"
          style={styles.profileImg}
        />

        <h1 style={styles.heading}>りえるのいろいろ</h1>
        <p style={styles.bio}>作ってきたサイトとか</p>

        {/* リンク一覧 */}
        <div style={styles.linkList}>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={getLinkStyle(link, i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <footer style={styles.footer}>
          &copy; 2026 rielu All rights reserved.
        </footer>
      </div>
    </div>
  );
}
