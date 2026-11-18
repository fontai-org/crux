#!/usr/bin/env python3
"""Extract a document to plain text for crux and print only its outline.

Usage: python3 extract.py <file> [--out DIR]

Supports .md/.markdown/.txt, .docx (standard library only; pandoc not needed),
.pdf (needs `pdftotext` from poppler; otherwise read the PDF directly).
The text goes to a file; stdout gets only the path, the size and the outline,
so the caller's context stays small. PDF pages are marked `=== s. N ===`.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
import xml.etree.ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
MAX_OUTLINE = 80


def docx_text(path):
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    body = root.find(W + "body")
    lines = []
    for el in body:
        if el.tag == W + "p":
            text = "".join(t.text or "" for t in el.iter(W + "t")).strip()
            if not text:
                continue
            level = heading_level(el)
            lines.append(("#" * level + " " + text) if level else text)
        elif el.tag == W + "tbl":
            rows = []
            for row in el.iter(W + "tr"):
                cells = []
                for cell in row.iter(W + "tc"):
                    cells.append(" ".join(
                        "".join(t.text or "" for t in p.iter(W + "t")).strip()
                        for p in cell.iter(W + "p")).strip())
                if any(cells):
                    rows.append("| " + " | ".join(cells) + " |")
            if rows:
                lines.append("\n".join(rows))
    return "\n\n".join(lines) + "\n"


def heading_level(p):
    ppr = p.find(W + "pPr")
    if ppr is None:
        return 0
    lvl = ppr.find(W + "outlineLvl")
    if lvl is not None:
        try:
            return min(int(lvl.get(W + "val")) + 1, 6)
        except (TypeError, ValueError):
            pass
    style = ppr.find(W + "pStyle")
    if style is not None:
        val = style.get(W + "val") or ""
        if val.lower() == "title":
            return 1
        m = re.match(r"(?i)(heading|nadpis|berschrift)\s*(\d)", val)
        if m:
            return min(int(m.group(2)), 6)
    return 0


def pdf_text(path):
    if not shutil.which("pdftotext"):
        sys.exit("pdftotext is not installed - read the PDF directly instead "
                 "(Claude Code: Read tool with `pages`).")
    out = subprocess.run(["pdftotext", "-layout", path, "-"],
                         capture_output=True, text=True, check=True).stdout
    pages = out.split("\f")
    if pages and not pages[-1].strip():
        pages.pop()
    if not "".join(pages).strip():
        sys.exit("The PDF has no text layer (scanned?). Read it directly as images "
                 "or ask the user for a text version.")
    return "".join(f"=== s. {i} ===\n{p.rstrip()}\n\n" for i, p in enumerate(pages, 1))


def outline(text, is_pdf):
    items = []
    all_lines = text.splitlines()
    seen = {}
    for line in all_lines:
        seen[line.strip()] = seen.get(line.strip(), 0) + 1
    for n, line in enumerate(all_lines, 1):
        if not is_pdf and re.match(r"#{1,6} \S", line):
            items.append(f"L{n:<6} {line}")
        elif is_pdf and line.startswith("=== s. "):
            continue
        elif is_pdf and re.match(r"\s{0,4}(\d+\.(\d+\.?)*)\s{1,3}\S", line) \
                and len(line.strip()) <= 90 and seen[line.strip()] < 3 \
                and not line.rstrip().endswith((".", ",", ";")):
            items.append(f"L{n:<6} {line.strip()}")
    return items


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        sys.exit(__doc__)
    path = args[0]
    out_dir = args[args.index("--out") + 1] if "--out" in args else \
        os.path.join(tempfile.gettempdir(), "crux")
    if not os.path.isfile(path):
        sys.exit(f"Not a file: {path}")
    ext = os.path.splitext(path)[1].lower()
    if ext == ".docx":
        text = docx_text(path)
    elif ext == ".pdf":
        text = pdf_text(path)
    elif ext in (".md", ".markdown", ".txt", ".text", ""):
        with open(path, encoding="utf-8", errors="replace") as f:
            text = f.read()
    else:
        sys.exit(f"Unsupported format {ext}. Convert it, or read it directly.")

    os.makedirs(out_dir, exist_ok=True)
    base = os.path.splitext(os.path.basename(path))[0]
    out = os.path.join(out_dir, base + ".txt")
    with open(out, "w", encoding="utf-8") as f:
        f.write(text)

    words = len(text.split())
    lines = text.count("\n") + 1
    pages = text.count("=== s. ") if ext == ".pdf" else None
    print(f"text: {out}")
    size = f"size: {words} words, {lines} lines, ~{int(words * 1.6)} tokens"
    print(size + (f", {pages} pages" if pages else ""))
    items = outline(text, ext == ".pdf")
    print(f"outline ({len(items)} headings{', first %d' % MAX_OUTLINE if len(items) > MAX_OUTLINE else ''}):")
    for item in items[:MAX_OUTLINE]:
        print("  " + item[:120])


if __name__ == "__main__":
    main()
