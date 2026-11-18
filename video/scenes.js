/* CRUX demo — every frame is a pure function of time t (seconds). HyperFrames seeks a GSAP
   proxy tween whose onUpdate calls renderAt(t), so the render is deterministic. */
const DURATION = 53.5;
const S = {
  intro: [0, 3.6],
  install: [3.6, 10.2],
  doc: [10.2, 16.4],
  cc: [16.4, 30.0],
  work: [30.0, 34.0],
  out: [34.0, 49.0],
  end: [49.0, 53.5],
};

const $ = (id) => document.getElementById(id);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* opacity of something living in [a, b] with fade-in fi and fade-out fo */
const win = (t, a, b, fi = 0.4, fo = 0.4) => (t < a || t > b ? 0 : clamp(Math.min((t - a) / fi, (b - t) / fo), 0, 1));
const typed = (s, t0, cps, t) => s.slice(0, clamp(Math.floor((t - t0) * cps), 0, s.length));
const blink = (t) => (Math.floor(t * 2) % 2 === 0 ? '<span class="cur"> </span>' : " ");
const solid = '<span class="cur"> </span>';
const L = (html, cls = "") => `<div class="t ${cls}">${html || ""}</div>`;
const C = window.CRUX;
/* whole device pixels (4K render = 2x): fractional offsets make thin glyphs shimmer */
const snap = (v) => Math.round(v * 2) / 2;

/* ---------------------------------------------------------------- install */
function installLines(u) {
  const p = '<span class="dim">~ $ </span>';
  const c1 = "claude plugin install crux --marketplace fontai/crux";
  const cps = 24;
  const t1 = 0.8, e1 = t1 + c1.length / cps;
  const out = [];
  out.push(L(p + esc(typed(c1, t1, cps, u)) + (u < e1 + 0.35 ? solid : "")));
  if (u > e1 + 0.9) out.push(L('<span class="b">✔</span> Successfully installed plugin: crux@fontai (scope: user)'), L(""));
  if (u > e1 + 1.6) out.push(L(p + blink(u)));
  return out.join("");
}

/* ---------------------------------------------------------------- document */
let pagesBuilt = false;
const PW = 456, PH = 645, GAP = 24, ROW = PH + GAP;
function buildPages() {
  if (pagesBuilt) return;
  pagesBuilt = true;
  const box = $("pages");
  (window.PAGES || []).forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.left = (i % 2) * (PW + GAP) + "px";
    img.style.top = Math.floor(i / 2) * ROW + "px";
    box.appendChild(img);
  });
  $("docname").textContent = C.file;
  $("docmeta").innerHTML = C.docMeta;
}
function renderDoc(u, len) {
  buildPages();
  const n = (window.PAGES || []).length || 38;
  const rows = Math.ceil(n / 2);
  const startTop = 200, endTop = 1080 - 200 - rows * ROW + GAP;
  const k = easeIO(clamp((u - 0.5) / (len - 1.3), 0, 1));
  const top = startTop + (endTop - startTop) * k;
  $("pages").style.transform = `translateY(${snap(top)}px)`;
  const row = clamp(Math.floor((540 - top) / ROW), 0, rows - 1);
  const page = clamp(row * 2 + 2, 1, n);
  $("pgnum").innerHTML = `page ${u < 0.6 ? 1 : page} <small>/ ${n}</small>`;
}

/* ---------------------------------------------------------------- Claude Code session */
const PROMPT = "crux " + C.file;
const CC = { typeAt: 0.6, cps: 22 };
CC.typedEnd = CC.typeAt + PROMPT.length / CC.cps;
CC.submit = CC.typedEnd + 0.35;
CC.skill = CC.submit + 0.3;
CC.picker = CC.skill + 0.7;

/* picker script: [time, action] relative to CC.picker. Built from C.questions[*].script */
function pickerState(u) {
  const qs = C.questions;
  let tab = 0, cur = 0;
  const checked = qs.map(() => new Set());
  const answered = qs.map(() => false);
  const custom = qs.map(() => null);
  let submitted = false, submitCur = 0;
  let tt = 0;
  const ev = [];
  qs.forEach((q, qi) => q.script.forEach(([dt, a]) => { tt += dt; ev.push([tt, qi, a]); }));
  C.submitScript.forEach(([dt, a]) => { tt += dt; ev.push([tt, qs.length, a]); });
  const rel = u - CC.picker;
  for (const [at, qi, a] of ev) {
    if (rel < at) break;
    if (qi < qs.length) {
      if (a === "down") cur++;
      else if (a === "toggle") checked[qi].has(cur) ? checked[qi].delete(cur) : checked[qi].add(cur);
      else if (a === "type") custom[qi] = typed(qs[qi].typeText, at, 25, rel);
      else if (a === "enter") {
        if (!qs[qi].multi) checked[qi] = new Set([cur]);
        answered[qi] = true; tab = qi + 1; cur = 0;
      }
    } else {
      if (a === "down") submitCur++;
      else if (a === "enter") submitted = true;
    }
  }
  for (let i = 0; i < qs.length; i++) if (custom[i] !== null && answered[i]) custom[i] = qs[i].typeText;
  return { tab, cur, checked, answered, custom, submitted, submitCur, endAt: CC.picker + tt };
}
const PICK_END = pickerState(999).endAt;

function answerText(q, set, custom) {
  if (custom) return custom;
  return [...set].sort().map((i) => q.opts[i].a || q.opts[i].l).join(", ");
}

function pickerLines(st) {
  const qs = C.questions;
  const out = [];
  out.push('<div class="rule"></div>');
  let tabs = '<span class="dim">←</span>  ';
  qs.forEach((q, i) => {
    const mark = st.answered[i] ? "☒" : "☐";
    tabs += `<span class="tab${st.tab === i ? " on" : ""}">${mark} ${q.tab}</span> `;
  });
  tabs += `<span class="tab${st.tab === qs.length ? " on" : ""}">✔ Submit</span>  <span class="dim">→</span>`;
  out.push(L(tabs), L(""));
  if (st.tab < qs.length) {
    const q = qs[st.tab];
    out.push(L(`<span class="b">${esc(q.q)}</span>`), L(""));
    q.opts.forEach((o, i) => {
      const on = st.cur === i;
      const ptr = on ? '<span class="sug">❯</span>' : " ";
      const box = q.multi ? (st.checked[st.tab].has(i) ? "[✔] " : "[ ] ") : "";
      const text = `${i + 1}. ${box}${esc(o.l)}`;
      out.push(L(`${ptr} ${on ? `<span class="sug">${text}</span>` : text}`));
      if (o.d) out.push(L(`<span class="dim">     ${q.multi ? "    " : ""}${esc(o.d)}</span>`));
    });
    const n = q.opts.length;
    if (q.multi) {
      const on = st.cur === n;
      out.push(L(`${on ? '<span class="sug">❯</span>' : " "} ${on ? '<span class="sug">' : ""}    Next${on ? "</span>" : ""}`));
    } else {
      const on = st.cur === n, ct = st.custom[st.tab];
      const label = ct !== null ? esc(ct) + (on ? solid : "") : "Type something.";
      out.push(L(`${on ? '<span class="sug">❯</span>' : " "} ${on ? `<span class="sug">${n + 1}. ${label}</span>` : `<span class="dim">${n + 1}. ${label}</span>`}`));
    }
    out.push(L(""), L('<span class="dim">Enter to select · Tab/Arrow keys to navigate · Esc to cancel</span>'));
  } else {
    out.push(L('<span class="b">Review your answers</span>'), L(""));
    qs.forEach((q, i) => {
      out.push(L(` <span class="dim">●</span> ${esc(q.short)}`));
      out.push(L(`   <span class="sug">→ ${esc(answerText(q, st.checked[i], st.custom[i]))}</span>`));
    });
    out.push(L(""), L("Ready to submit your answers?"), L(""));
    ["Submit answers", "Cancel"].forEach((s, i) => {
      const on = st.submitCur === i;
      out.push(L(`${on ? '<span class="sug">❯</span>' : " "} ${on ? `<span class="sug">${i + 1}. ${s}</span>` : `${i + 1}. ${s}`}`));
    });
  }
  return out;
}

function inputBox(text, cursorHtml) {
  return [
    '<div class="rule"></div>',
    L(`<span class="dim">&gt;</span> ${esc(text)}${cursorHtml}`),
    '<div class="rule"></div>',
    L('<span class="dim">  ? for shortcuts</span>'),
  ];
}

function transcript(u) {
  const out = [];
  out.push(L(`<span class="claude">✻</span> <span class="b">Claude Code</span>`));
  out.push(L(`<span class="dim">  ${C.cwd}</span>`), L(""));
  if (u < CC.submit) return out;
  out.push(L(`<span class="usr"><span class="dim">&gt;</span> ${esc(PROMPT)}</span>`), L(""));
  if (u > CC.skill) {
    out.push(L(`<span class="b">⏺</span> Skill(crux)`));
    out.push(L(`<span class="dim">  ⎿  Successfully loaded skill</span>`), L(""));
  }
  if (u > CC.skill + 0.35) {
    C.preIntake.forEach((l) => out.push(L(l)));
    out.push(L(""));
  }
  const st = pickerState(u);
  if (st.submitted) {
    out.push(L(`<span class="b">⏺</span> User answered Claude's questions:`));
    C.questions.forEach((q, i) => {
      const pre = i === 0 ? "  ⎿  " : "     ";
      out.push(L(`<span class="dim">${pre}· ${esc(q.short)} →</span> ${esc(answerText(q, st.checked[i], st.custom[i]))}`));
    });
    out.push(L(""));
    if (u > PICK_END + 0.6) {
      C.postIntake.forEach((l) => out.push(L(l)));
      out.push(L(""));
    }
  }
  return out;
}

function ccLines(u) {
  const out = transcript(u);
  if (u < CC.submit) return out.concat(inputBox(typed(PROMPT, CC.typeAt, CC.cps, u), u < CC.typedEnd + 0.1 ? solid : blink(u))).join("");
  if (u > CC.picker && u < PICK_END) return out.concat(pickerLines(pickerState(u))).join("");
  return out.join("");
}

/* ---------------------------------------------------------------- working */
const SPIN = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
function workLines(u, len) {
  const out = transcript(999);
  C.work.forEach((w, i) => {
    const at = 0.2 + i * ((len - 0.9) / C.work.length);
    if (u > at) out.push(L(`<span class="b">⏺</span> ${w[0]}`), L(`<span class="dim">  ⎿  ${w[1]}</span>`));
  });
  const secs = Math.floor(clamp(u / (len - 0.2), 0, 1) * C.runSeconds);
  const mm = Math.floor(secs / 60), ss = String(secs % 60).padStart(2, "0");
  const sp = SPIN[Math.floor(u * 12) % SPIN.length];
  out.push(L(""), L(`<span class="claude">${sp}</span> <span class="claude">Getting to the crux…</span> <span class="dim">(${mm}m ${ss}s · esc to interrupt)</span>`));
  return out.join("");
}

/* ---------------------------------------------------------------- output */
let outBuilt = false;
function buildOutput() {
  if (outBuilt) return;
  outBuilt = true;
  const sc = $("scroller");
  sc.innerHTML = C.output.map((o, i) => `<div class="t hl k-${o.k || "n"}" data-i="${i}">${o.h}</div>`).join("");
}
function renderOut(u, len) {
  const sc = $("scroller"), body = $("tbody");
  if (!outBuilt || sc.dataset.mode !== "out") { outBuilt = false; buildOutput(); sc.dataset.mode = "out"; }
  body.classList.remove("bottom");
  const rows = sc.children;
  for (let i = 0; i < rows.length; i++) rows[i].style.opacity = u > 0.15 + i * 0.05 ? 1 : 0;
  const maxScroll = Math.max(0, sc.scrollHeight - body.clientHeight + 10);
  const k = easeIO(clamp((u - 4.6) / 7.6, 0, 1));
  sc.style.transform = `translateY(${snap(-maxScroll * k)}px)`;
  // highlights
  sc.querySelectorAll(".mark,.box,.flash").forEach((e) => e.remove());
  const v = sc.querySelector(".k-verdict");
  if (v && u > 1.0) {
    const m = document.createElement("div"); m.className = "mark"; m.style.background = "var(--cyan)";
    m.style.opacity = clamp((u - 1.0) / 0.3, 0, 1); v.appendChild(m);
  }
  const w = sc.querySelectorAll(".k-fake");
  if (w.length && u > 6.2) w.forEach((e) => {
    const f = document.createElement("div"); f.className = "flash";
    f.style.opacity = clamp((u - 6.2) / 0.3, 0, 1); e.prepend(f);
  });
  const s0 = sc.querySelector(".k-score0"), s1 = [...sc.querySelectorAll(".k-score1")].pop();
  if (s0 && s1 && u > 11.2) {
    const b = document.createElement("div"); b.className = "box";
    b.style.top = s0.offsetTop - 6 + "px";
    b.style.height = s1.offsetTop + s1.offsetHeight - s0.offsetTop + 12 + "px";
    b.style.opacity = clamp((u - 11.2) / 0.3, 0, 1);
    sc.appendChild(b);
  }
}

/* ---------------------------------------------------------------- main */
function setTerm(html, bottom) {
  const sc = $("scroller");
  sc.dataset.mode = "";
  sc.style.transform = "";
  sc.innerHTML = html;
  $("tbody").classList.toggle("bottom", bottom);
}

function caption(t) {
  const caps = [
    [S.install[0] + 0.3, S.install[1] - 0.1, "1", "Install"],
    [S.doc[0] + 0.1, S.doc[1] - 0.1, "2", "Hand it any long document"],
    [S.cc[0] + 0.1, S.cc[1] - 0.05, "3", "Answer four questions"],
    [S.work[0] + 0.05, S.work[1] - 0.05, "", "It reads, checks the claims and the sources"],
    [S.out[0] + 0.05, S.out[1] - 0.1, "4", "Decide in one screen"],
  ];
  for (const [a, b, n, text] of caps) {
    if (t >= a && t <= b) return { o: win(t, a, b, 0.3, 0.3), html: (n ? `<span class="n">${n}</span>` : "") + text };
  }
  return { o: 0, html: "" };
}

function renderAt(t) {
  t = clamp(t, 0, DURATION);
  // intro: from black, logo, tagline, out
  $("intro").style.opacity = win(t, 0.15, S.intro[1], 0.6, 0.5);
  // end card, then to black for the loop seam
  $("end").style.opacity = win(t, S.end[0] + 0.45, DURATION - 0.15, 0.5, 0.8);

  // terminal window
  let termO = 0;
  if (t >= S.install[0] && t < S.install[1]) {
    const u = t - S.install[0];
    termO = win(t, S.install[0], S.install[1], 0.35, 0.35);
    $("title").textContent = "~ — zsh";
    setTerm(installLines(u), false);
  } else if (t >= S.cc[0] && t < S.work[0]) {
    termO = win(t, S.cc[0], S.out[1], 0.35, 0.4);
    $("title").textContent = C.cwd + " — claude";
    setTerm(ccLines(t - S.cc[0]), true);
  } else if (t >= S.work[0] && t < S.out[0]) {
    termO = 1;
    $("title").textContent = C.cwd + " — claude";
    setTerm(workLines(t - S.work[0], S.work[1] - S.work[0]), true);
  } else if (t >= S.out[0] && t < S.out[1]) {
    termO = win(t, S.cc[0], S.out[1], 0.35, 0.45);
    $("title").textContent = C.cwd + " — claude";
    renderOut(t - S.out[0], S.out[1] - S.out[0]);
  }
  $("term").style.opacity = termO;

  // document scene
  const docO = win(t, S.doc[0], S.doc[1], 0.35, 0.35);
  $("doc").style.opacity = docO;
  if (docO > 0) renderDoc(t - S.doc[0], S.doc[1] - S.doc[0]);

  const cap = caption(t);
  $("cap").style.opacity = cap.o;
  $("cap").innerHTML = cap.html;

  const h = win(t, S.work[0] + 0.2, S.work[1] - 0.05, 0.3, 0.3);
  $("hint").style.opacity = h;
  $("hint").textContent = C.hint;
}
