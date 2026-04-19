import React, { useState, useEffect } from "react";
import Head from "next/head";

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

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // ハイドレーションエラー防止
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // スタイル定義
  const styles: Record<string, React.CSSProperties> = {
    page: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      width: "100%",
      margin: 0,
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', sans-serif",
      boxSizing: "border-box",
    },
    container: {
      width: "100%",
      maxWidth: "480px", // ここがボタンの最大幅になります
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    profileImg: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      marginBottom: "20px",
      objectFit: "cover",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: "0 0 8px 0",
      color: "#333",
    },
    bio: {
      fontSize: "0.95rem",
      color: "#666",
      margin: "0 0 32px 0",
    },
    linkList: {
      width: "100%", // コンテナいっぱいに広げる
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    footer: {
      marginTop: "48px",
      fontSize: "0.8rem",
      color: "#aaa",
    }
  };

  const getLinkStyle = (link: LinkItem, index: number): React.CSSProperties => {
    const isHovered = hoveredIndex === index;
    
    const baseStyle: React.CSSProperties = {
      display: "block",
      width: "100%", // ボタンを横いっぱいに広げる
      padding: "18px 24px", // 上下を少し厚くして「広さ」を演出
      borderRadius: "14px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "1rem",
      transition: "all 0.25s ease-in-out",
      boxSizing: "border-box", // パディングを含めて100%にする
      textAlign: "center",
      boxShadow: isHovered ? "0 6px 15px rgba(0,0,0,0.12)" : "0 2px 5px rgba(0,0,0,0.05)",
      transform: isHovered ? "translateY(-3px)" : "translateY(0)",
    };

    if (link.featured) {
      return {
        ...baseStyle,
        backgroundColor: isHovered ? "#0056b3" : "#f5deb3",
        color: "#ffffff",
        border: "none",
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: isHovered ? "#333" : "#ffffff",
        color: isHovered ? "#fff" : "#333",
        border: "1px solid #e0e0e0",
      };
    }
  };

  return (
    <div style={styles.page}>
      <Head>
        <title>りえるのリンクまとめ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={styles.container}>
        <img src="/profile.png" alt="profile" style={styles.profileImg} />
        
        <h1 style={styles.heading}>りえるのいろいろ</h1>
        <p style={styles.bio}>作ってきたサイトとか</p>

        <nav style={styles.linkList}>
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
        </nav>

        <footer style={styles.footer}>
          &copy; 2026 rielu All rights reserved.
        </footer>
      </div>
    </div>
  );
}
