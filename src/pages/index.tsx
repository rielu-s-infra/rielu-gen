import Head from "next/head";
import React from "react";

export default function Home() {
  const links = [
    { href: "https://twitter.com/nameko_simakaze", label: "Twitter (X)", featured: false },
    { href: "https://rielu.uniproject.jp", label: "プロフィールサイト", featured: true },
    { href: "https://qiita.com/aki-akatuki-namonakiheimin", label: "Qiita", featured: false },
    { href: "https://rielurandom.uniproject.jp", label: "ランダム数値ジェネレータ", featured: true },
    { href: "https://github.com/penti-nameko", label: "GitHub", featured: false },
    { href: "https://uniproject.jp", label: "Uniproject", featured: true },
  ];

  return (
    <>
      <Head>
        <title>りえるのリンクまとめ</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --bg-color: #f8f9fa;
            --text-main: #333333;
            --text-muted: #666666;
            --white: #ffffff;
            --primary: #0056b3;
            --featured: #f5deb3;
            --border: #e0e0e0;
            --shadow: rgba(0, 0, 0, 0.05);
            --shadow-hover: rgba(0, 0, 0, 0.1);
          }

          body {
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            margin: 0;
            line-height: 1.6;
          }

          .wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 60px 20px;
            box-sizing: border-box;
          }

          .container {
            width: 100%;
            max-width: 480px;
            text-align: center;
          }

          .profile-img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px var(--shadow);
          }

          h1 {
            font-size: 1.5rem;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }

          .bio {
            font-size: 1rem;
            color: var(--text-muted);
            margin-bottom: 40px;
          }

          .link-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }

          .link-item {
            display: block;
            width: 100%;
            padding: 18px;
            box-sizing: border-box;
            background-color: var(--white);
            border: 1px solid var(--border);
            border-radius: 14px;
            text-decoration: none;
            color: var(--text-main);
            font-weight: 700;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 4px var(--shadow);
          }

          .link-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px var(--shadow-hover);
            background-color: #333;
            color: var(--white);
          }

          /* Featured Link (小麦色) */
          .link-item.featured {
            background-color: var(--featured);
            color: var(--white);
            border: none;
          }

          .link-item.featured:hover {
            background-color: var(--primary);
          }

          footer {
            margin-top: 60px;
            font-size: 0.85rem;
            color: #aaa;
          }

          @media (max-width: 500px) {
            .wrapper {
              padding: 40px 15px;
            }
          }
        `}</style>
      </Head>

      <div className="wrapper">
        <main className="container">
          <img src="profile.png" alt="rielu" className="profile-img" />
          
          <h1>りえるのいろいろ</h1>
          <p className="bio">作ってきたサイトとか</p>

          <nav className="link-list">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`link-item ${link.featured ? "featured" : ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <footer>
            &copy; 2026 rielu All rights reserved.
          </footer>
        </main>
      </div>
    </>
  );
}
