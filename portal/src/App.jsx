import React, { useEffect, useState } from 'react'

const notebooks = [
  {
    id: "01",
    title: "บทที่ 1 — รู้จักข้อมูล",
    short: "รู้จักข้อมูล",
    desc: "สำรวจข้อมูลภาพดาวเทียม Sentinel-1 SAR เบื้องต้น ก่อนที่คอมพิวเตอร์จะมองเห็นพื้นที่ปลูกปาล์ม",
    file: "01_read_and_explore.ipynb",
    icon: <><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse></>
  },
  {
    id: "02",
    title: "บทที่ 2 — เตรียมแบบฝึกหัดให้ AI",
    short: "เตรียมแบบฝึกหัดให้ AI",
    desc: "เทคนิคการตัดภาพ (Tiling) และการเพิ่มข้อมูล (Augmentation) เพื่อสอนโมเดล AI",
    file: "02_prepare_tiles.ipynb",
    icon: <><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></>
  },
  {
    id: "03",
    title: "บทที่ 3 — ฝึกสอนโมเดล (Train Model)",
    short: "ฝึกสอนโมเดล",
    desc: "กระบวนการเทรนโมเดล AI เพื่อให้สามารถจำแนกพื้นที่ปลูกปาล์มได้อย่างแม่นยำ",
    file: "03_train_model.ipynb",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></>
  },
  {
    id: "04",
    title: "บทที่ 4 — SAM Basics",
    short: "SAM Basics",
    desc: "เรียนรู้พื้นฐานการใช้งาน Segment Anything Model (SAM) จาก Meta AI",
    file: "04_sam_basics.ipynb",
    icon: <><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></>
  },
  {
    id: "05",
    title: "บทที่ 5 — SAM Production",
    short: "SAM Production",
    desc: "การนำโมเดล SAM ไปประยุกต์ใช้ในระดับการผลิตจริง (Production Scale)",
    file: "05_sam_production.ipynb",
    icon: <><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></>
  },
  {
    id: "06",
    title: "บทที่ 6 — การลดทอนความซับซ้อน (Simplify)",
    short: "ลดทอนความซับซ้อน",
    desc: "จัดการผลลัพธ์ของโมเดลให้มีขนาดเหมาะสมและพร้อมใช้งานมากขึ้น",
    file: "06_simplify.ipynb",
    icon: <><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line></>
  },
  {
    id: "07",
    title: "บทที่ 7 — ทำนายและสร้างแผนที่ (Predict & Map)",
    short: "ทำนายและสร้างแผนที่",
    desc: "นำโมเดลที่เสร็จสมบูรณ์มา Predict และสร้างออกมาเป็นแผนที่แบบ Interactive",
    file: "07_predict_and_map.ipynb",
    icon: <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></>
  }
];

const colabUrl = (file) =>
  `https://colab.research.google.com/github/A-Phrom-A/ssb-workshop/blob/main/${file}`

const ColabIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12.0003 4.54565C8.03159 4.54565 4.79379 7.64333 4.56847 11.554H6.60263C6.8203 8.76104 9.17296 6.54565 12.0003 6.54565C14.8277 6.54565 17.1804 8.76104 17.398 11.554H19.4322C19.2069 7.64333 15.9691 4.54565 12.0003 4.54565Z" fill="#F9AB00"/>
    <path d="M17.398 12.446H19.4322C19.2069 16.3567 15.9691 19.4544 12.0003 19.4544C8.03159 19.4544 4.79379 16.3567 4.56847 12.446H6.60263C6.8203 15.239 9.17296 17.4544 12.0003 17.4544C14.8277 17.4544 17.1804 15.239 17.398 12.446Z" fill="#F9AB00"/>
  </svg>
)

/* ลายแปลงปลูกปาล์มจากดาวเทียม (ตกแต่งมุมการ์ด Hero) */
const ParcelArt = () => (
  <svg className="hero-art" viewBox="0 0 340 340" aria-hidden="true">
    <rect className="p1" x="20"  y="20"  width="90" height="90" rx="18" />
    <rect className="p3" x="122" y="20"  width="90" height="90" rx="18" />
    <rect className="p2" x="224" y="20"  width="90" height="90" rx="18" />
    <rect className="p3" x="20"  y="122" width="90" height="90" rx="18" />
    <rect className="p2" x="122" y="122" width="90" height="90" rx="18" />
    <rect className="p1" x="224" y="122" width="90" height="90" rx="18" />
    <rect className="p2" x="20"  y="224" width="90" height="90" rx="18" />
    <rect className="p1" x="122" y="224" width="90" height="90" rx="18" />
    <rect className="warn" x="224" y="224" width="90" height="90" rx="18" />
    {[[50,50],[80,80],[152,52],[182,82],[52,152],[82,182],[254,152],[284,182],[152,254],[182,284],[52,52],[152,152]].map(([x, y], i) => (
      <circle key={i} className="pd" cx={x} cy={y} r="5" />
    ))}
  </svg>
)

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{children}</svg>
)

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('gislab-theme') || 'light' } catch { return 'light' }
  })
  const [aura, setAura] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('gislab-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => {
    setAura(true)
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  const regular = notebooks.slice(0, 6)
  const last = notebooks[6]

  return (
    <div className="portal-container">
      {/* TOPBAR */}
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Svg><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18"></path><path d="M12 3a14 14 0 0 1 0 18"></path><path d="M12 3a14 14 0 0 0 0 18"></path></Svg>
          </div>
          <div>
            GIS Lab True Miracle
            <small>Palm Prediction Workshop</small>
          </div>
        </div>
        <button
          className={`theme-toggle${aura ? ' aura' : ''}`}
          onClick={toggleTheme}
          onAnimationEnd={() => setAura(false)}
          aria-label={theme === 'light' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดสว่าง'}
        >
          {theme === 'light'
            ? <Svg><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></Svg>
            : <Svg><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></Svg>}
        </button>
      </div>

      <main>
        {/* HERO + ROADMAP */}
        <section className="bento-grid">
          <div className="col-8">
            <div className="card hero-card">
              <ParcelArt />
              <span className="eyebrow">Interactive Workshop</span>
              <h1>การใช้งานแก้ไข Model Palm Prediction</h1>
              <p>
                โดย GIS Lab True Miracle — เข้าสู่บทเรียนการจำแนกพื้นที่ปลูกปาล์มน้ำมันด้วย AI
                กดปุ่มด้านล่างเพื่อเปิด Google Colab และเริ่มรันโค้ดได้ทันที
              </p>
              <div className="hero-actions">
                <a className="btn-primary" href={colabUrl(notebooks[0].file)} target="_blank" rel="noreferrer">
                  เริ่มบทที่ 1
                </a>
                <a className="btn-ghost" href="#lessons">ดูบทเรียนทั้งหมด</a>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card">
              <h2 className="card-label">เส้นทางการเรียน</h2>
              <p className="card-sub">เรียนตามลำดับ จากข้อมูลดิบสู่แผนที่</p>
              <ol className="roadmap">
                {notebooks.map((nb) => (
                  <li key={nb.id}>
                    <a href={`#lesson-${nb.id}`}>
                      <span className="dot">{nb.id}</span>
                      {nb.short}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bento-grid">
          <div className="col-4">
            <div className="card stat-card">
              <div className="stat-icon"><Svg><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></Svg></div>
              <div>
                <div className="stat-value">{notebooks.length} บท</div>
                <div className="stat-label">Notebook พร้อมรัน</div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card stat-card blue">
              <div className="stat-icon"><Svg><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path><circle cx="12" cy="12" r="9"></circle></Svg></div>
              <div>
                <div className="stat-value">Sentinel-1</div>
                <div className="stat-label">ข้อมูลภาพเรดาร์ SAR</div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card stat-card amber">
              <div className="stat-icon"><Svg><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></Svg></div>
              <div>
                <div className="stat-value">Colab</div>
                <div className="stat-label">ไม่ต้องติดตั้งโปรแกรม</div>
              </div>
            </div>
          </div>
        </section>

        {/* LESSONS */}
        <div className="section-head" id="lessons">
          <h2>บทเรียนทั้งหมด</h2>
          <span>กดเพื่อเปิดใน Google Colab</span>
        </div>

        <section className="bento-grid">
          {regular.map((nb) => (
            <div className="col-4" key={nb.id} id={`lesson-${nb.id}`}>
              <div className="card lesson-card">
                <span className="card-num">{nb.id}</span>
                <div className="card-header">
                  <div className="card-icon"><Svg>{nb.icon}</Svg></div>
                  <h3 className="card-title">{nb.title}</h3>
                </div>
                <p className="card-desc">{nb.desc}</p>
                <div className="card-foot">
                  <span className="file-tag">{nb.file}</span>
                  <a href={colabUrl(nb.file)} target="_blank" rel="noreferrer" className="btn-colab">
                    <ColabIcon /> Open in Colab
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* บทสุดท้าย — ผลลัพธ์ของทั้งเวิร์กช็อป */}
          <div className="col-12" id={`lesson-${last.id}`}>
            <div className="card lesson-card featured">
              <div className="card-icon"><Svg>{last.icon}</Svg></div>
              <div className="featured-body">
                <h3 className="card-title">{last.title}</h3>
                <p className="card-desc" style={{ margin: '6px 0 0' }}>{last.desc}</p>
              </div>
              <div className="card-foot">
                <span className="file-tag">{last.file}</span>
                <a href={colabUrl(last.file)} target="_blank" rel="noreferrer" className="btn-colab">
                  <ColabIcon /> Open in Colab
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>GIS Lab True Miracle</span>
        <span>Palm Prediction Workshop — Sentinel-1 SAR + SAM</span>
      </footer>
    </div>
  )
}

export default App
