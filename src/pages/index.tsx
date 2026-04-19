import { useState, useCallback, useRef } from "react";

type Theme = "light" | "dark";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .rng-root {
    --bg: #f0ede8;
    --card: #faf8f5;
    --text: #1a1410;
    --muted: #8c7b6e;
    --accent: #c0392b;
    --accent2: #e67e22;
    --border: #ddd5c8;
    --chip-bg: #ede8e0;
    --shadow: rgba(192,57,43,0.13);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    transition: background 0.4s, color 0.4s;
    position: relative;
    overflow: hidden;
  }
  .rng-root.dark {
    --bg: #141010;
    --card: #1e1917;
    --text: #f0ede8;
    --muted: #8c7b6e;
    --accent: #e05c4e;
    --accent2: #f0965a;
    --border: #2e2420;
    --chip-bg: #2a2220;
    --shadow: rgba(224,92,78,0.2);
  }
  .rng-bg-text {
    position: absolute;
    font-family: 'Syne', sans-serif;
    font-size: 30vw;
    font-weight: 800;
    color: var(--border);
    pointer-events: none;
    user-select: none;
    line-height: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
    transition: color 0.4s;
    z-index: 0;
  }
  .rng-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 440px;
    text-align: center;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 40px var(--shadow), 0 2px 8px rgba(0,0,0,0.05);
    transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
  }
  .rng-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .rng-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  .rng-theme-btn {
    background: var(--chip-bg);
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background 0.2s, transform 0.2s;
    color: var(--text);
  }
  .rng-theme-btn:hover { transform: rotate(20deg); background: var(--border); }

  .rng-range {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
    align-items: center;
    background: var(--chip-bg);
    padding: 14px;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid var(--border);
  }
  .rng-range span {
    color: var(--muted);
    font-size: 1.1rem;
    font-weight: 600;
  }
  .rng-range-label {
    font-size: 0.7rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
    text-align: center;
  }
  .rng-input {
    width: 100%;
    padding: 8px 6px;
    background: var(--card);
    color: var(--text);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-align: center;
    font-size: 1.1rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
  }
  .rng-input:focus { border-color: var(--accent); }

  .rng-options {
    display: flex;
    justify-content: center;
    gap: 18px;
    margin-bottom: 20px;
  }
  .rng-option {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.2s;
  }
  .rng-option:hover { color: var(--text); }
  .rng-option input { accent-color: var(--accent); cursor: pointer; }

  .rng-generate-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    box-shadow: 0 4px 16px var(--shadow);
  }
  .rng-generate-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px var(--shadow); }
  .rng-generate-btn:active:not(:disabled) { transform: translateY(0); }
  .rng-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .rng-sub-btns {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
  .rng-sub-btn {
    flex: 1;
    padding: 8px;
    font-size: 0.8rem;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    border-radius: 8px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s, color 0.2s;
  }
  .rng-sub-btn:hover { background: var(--chip-bg); color: var(--text); }

  .rng-result-area {
    margin: 28px 0 20px;
    cursor: pointer;
    position: relative;
  }
  .rng-number {
    font-family: 'Syne', sans-serif;
    font-size: 5.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    min-height: 1.1em;
    transition: transform 0.2s;
    display: block;
  }
  .rng-number:hover { transform: scale(1.06); }
  .rng-number.pop { animation: pop 0.18s ease-out; }
  @keyframes pop {
    0% { transform: scale(0.85); }
    60% { transform: scale(1.12); }
    100% { transform: scale(1); }
  }
  .rng-hint {
    font-size: 0.7rem;
    color: var(--muted);
    margin-top: 6px;
    min-height: 1.2em;
  }
  .rng-hint.copied { color: var(--accent); }

  .rng-details { margin-top: 4px; text-align: left; }
  .rng-summary {
    cursor: pointer;
    color: var(--accent);
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 8px;
    list-style: none;
    user-select: none;
    border-radius: 8px;
    transition: background 0.15s;
  }
  .rng-summary:hover { background: var(--chip-bg); }
  .rng-history {
    margin-top: 10px;
    padding: 12px;
    background: var(--chip-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 40px;
  }
  .rng-chip {
    background: var(--card);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    transition: background 0.15s;
  }
  .rng-chip.latest {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    border-color: transparent;
  }
  .rng-empty { color: var(--muted); font-size: 0.85rem; }
`;

export default function RandomGenerator() {
  const [theme, setTheme] = useState<Theme>("light");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(75);
  const [noDuplicate, setNoDuplicate] = useState(false);
  const [useAnimation, setUseAnimation] = useState(true);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hint, setHint] = useState("数字をクリックでコピー");
  const [hintCopied, setHintCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [animDisplay, setAnimDisplay] = useState<number | null>(null);

  const getRandomInt = useCallback(
    (lo: number, hi: number, hist: number[], noDup: boolean): number => {
      let num: number;
      let tries = 0;
      do {
        num = Math.floor(Math.random() * (hi - lo + 1)) + lo;
        tries++;
      } while (noDup && hist.includes(num) && tries < 1000);
      return num;
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    if (isGenerating) return;
    if (isNaN(min) || isNaN(max)) return alert("数値を入力してください");
    if (min >= max) return alert("最大値は最小値より大きくしてください");
    if (noDuplicate && history.length >= max - min + 1) {
      return alert("すべての数字が出尽くしました！");
    }

    setIsGenerating(true);
    setHint("抽選中...");
    setHintCopied(false);

    if (useAnimation) {
      await new Promise<void>((resolve) => {
        let count = 0;
        const frames = 20;
        animRef.current = setInterval(() => {
          setAnimDisplay(Math.floor(Math.random() * (max - min + 1)) + min);
          count++;
          if (count > frames) {
            clearInterval(animRef.current!);
            resolve();
          }
        }, 50);
      });
    }

    setAnimDisplay(null);
    const final = getRandomInt(min, max, history, noDuplicate);
    setResult(final);
    setHistory((h) => [...h, final]);
    setPopKey((k) => k + 1);
    setIsGenerating(false);
    setHint("数字をクリックでコピー");
  }, [isGenerating, min, max, noDuplicate, useAnimation, history, getRandomInt]);

  const handleCopy = useCallback(() => {
    const val = result !== null ? String(result) : null;
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => {
      setHint("コピーしました！ ✅");
      setHintCopied(true);
      setTimeout(() => {
        setHint("数字をクリックでコピー");
        setHintCopied(false);
      }, 1500);
    });
  }, [result]);

  const handleReset = useCallback(() => {
    if (!confirm("履歴をリセットしてもよろしいですか？")) return;
    setHistory([]);
    setResult(null);
    setAnimDisplay(null);
  }, []);

  const displayValue = animDisplay !== null ? animDisplay : result;

  return (
    <div className={`rng-root${theme === "dark" ? " dark" : ""}`}>
      <style>{css}</style>
      <div className="rng-bg-text" aria-hidden="true">
        {displayValue !== null ? displayValue : "?"}
      </div>
      <div className="rng-card">
        <div className="rng-header">
          <span className="rng-title">🎲 乱数ジェネレーター</span>
          <button
            className="rng-theme-btn"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            title="テーマ切り替え"
          >
            🌓
          </button>
        </div>

        <div className="rng-range">
          <div>
            <div className="rng-range-label">最小</div>
            <input
              className="rng-input"
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value))}
            />
          </div>
          <span>〜</span>
          <div>
            <div className="rng-range-label">最大</div>
            <input
              className="rng-input"
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="rng-options">
          <label className="rng-option">
            <input
              type="checkbox"
              checked={noDuplicate}
              onChange={(e) => setNoDuplicate(e.target.checked)}
            />
            重複なし
          </label>
          <label className="rng-option">
            <input
              type="checkbox"
              checked={useAnimation}
              onChange={(e) => setUseAnimation(e.target.checked)}
            />
            演出あり
          </label>
        </div>

        <button
          className="rng-generate-btn"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "抽選中..." : "生成する！"}
        </button>

        <div className="rng-sub-btns">
          <button className="rng-sub-btn" onClick={handleCopy}>
            結果をコピー
          </button>
          <button className="rng-sub-btn" onClick={handleReset}>
            リセット
          </button>
        </div>

        <div className="rng-result-area" onClick={handleCopy}>
          <span
            key={popKey}
            className={`rng-number${result !== null && animDisplay === null ? " pop" : ""}`}
          >
            {displayValue !== null ? displayValue : "?"}
          </span>
          <div className={`rng-hint${hintCopied ? " copied" : ""}`}>{hint}</div>
        </div>

        <details
          className="rng-details"
          open={showHistory}
          onToggle={(e) => setShowHistory((e.target as HTMLDetailsElement).open)}
        >
          <summary className="rng-summary">
            <span>📜</span> 履歴を表示（計 {history.length} 件）
          </summary>
          <div className="rng-history">
            {history.length === 0 ? (
              <span className="rng-empty">履歴はまだありません</span>
            ) : (
              [...history]
                .reverse()
                .map((n, i) => (
                  <span key={i} className={`rng-chip${i === 0 ? " latest" : ""}`}>
                    {n}
                  </span>
                ))
            )}
          </div>
        </details>
      </div>
    </div>
  );
}
