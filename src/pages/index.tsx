import { useState } from "react";

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

export default function RieluLinks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* プロフィール */}
        <img
          src="profile.png"
          alt="プロフィール画像"
          style={styles.profileImg}
        />
        <h1 style={styles.heading}>りえるのいろいろ</h1>
        <p style={styles.bio}>作ってきたサイトとか</p>

        {/* リンク一覧 */}
        <div style={styles.linkList}>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.linkItem,
                ...(link.featured ? styles.featured : {}),
                ...(hovered === i
                  ? link.featured
                    ? styles.featuredHover
                    : styles.linkItemHover
                  : {}),
              }}
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

const styles: Record<string, React.CSSProperties> = {
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
  },
  container: {
    width: "100%",
    maxWidth: 480,
    textAlign: "center",
  },
  profileImg: {
    width: 200,
    height: "auto",
    borderRadius: "50%",
    marginBottom: 16,
    objectFit: "cover",
  },
  heading: {
    fontSize: "1.25rem",
    marginBottom: 8,
  },
  bio: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: 32,
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
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
  },
  linkItemHover: {
    backgroundColor: "#333",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  featured: {
    backgroundColor: "#f5deb3",
    color: "#fff",
    border: "none",
  },
  featuredHover: {
    backgroundColor: "#0056b3",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  footer: {
    marginTop: 48,
    fontSize: "0.8rem",
    color: "#aaa",
  },
};
