import React, { useState } from "react";
import Head from "next/head";

type LinkItem = {
  href: string;
  label: string;
  featured?: boolean;
};

const links: LinkItem[] = [
  { href: "https://twitter.com/nameko_simakaze", label: "Twitter (X)" },
  { href: "https://rielu.uniproject.jp", label: "プロフィールサイト", featured: true },
  { href: "https://qiita.com/aki-akatuki-namonakiheimin", label: "qiita" },
  { href: "https://rielurandom.uniproject.jp", label: "ランダム数値ジェネレータ", featured: true },
  { href: "https://github.com/penti-nameko", label: "Github" },
  { href: "https://uniproject.jp", label: "Uniproject", featured: true },
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ベースとなるページ全体のスタイル
  const pageStyle: React.CSSProperties = {
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
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "480px",
    textAlign: "center",
  };

  const profileImgStyle: React.CSSProperties = {
    width: "200px",
    height: "auto",
    borderRadius: "50%",
    marginBottom: "16px",
    objectFit: "cover",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const bioStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "32px",
  };

  const linkListStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  // 動的にスタイルを生成する関数
  const getLinkStyle = (link: LinkItem, index: number): React.CSSProperties => {
    const isHovered = hoveredIndex === index;

    const base: React.CSSProperties = {
      display: "block",
      padding: "16px",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      boxShadow: isHovered ? "0 4px 12px rgba(0,0,0,0.1)" : "0 2px 4px rgba(0,0,0,0.05)",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    };

    if (link.featured) {
      // 強調リンク (featured)
      return {
        ...base,
        backgroundColor: isHovered ? "#0056b3" : "#f5deb3",
        color: "white",
        border: "none",
      };
    } else {
      // 通常リンク
      return {
        ...base,
        backgroundColor: isHovered ? "#333" : "#ffffff",
        color: isHovered ? "#fff" : "#333",
        border: "1px solid #e0e0e0",
      };
    }
  };

  return (
    <div style={pageStyle}>
      <Head>
        <title>りえるのリンクまとめ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={containerStyle}>
        <img src="/profile.png" alt="profile" style={profileImgStyle} />
        
        <h1 style={headingStyle}>りえるのいろいろ</h1>
        <p style={bioStyle}>作ってきたサイトとか</p>

        <div style={linkListStyle}>
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={getLinkStyle(link, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <footer style={{ marginTop: "48px", fontSize: "0.8rem", color: "#aaa" }}>
          &copy; 2026 rielu All rights reserved.
        </footer>
      </div>
    </div>
  );
}
