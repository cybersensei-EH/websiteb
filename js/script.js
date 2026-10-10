(() => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");
  const toTop = document.getElementById("toTop");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 24);
    toTop?.classList.toggle("is-visible", y > 480);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Open menu");
    });
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitBtn = document.getElementById("contactSubmit");
    if (formNote) formNote.textContent = "Sending…";
    if (submitBtn) submitBtn.disabled = true;

    try {
      const endpoint =
        form.getAttribute("action") ||
        "https://formsubmit.co/ajax/cybersenseieh@gmail.com";
      const data = new FormData(form);
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload.message || "Send failed");
      }
      if (formNote) {
        formNote.textContent =
          "Message sent — we will follow up soon. (First send may need a one-time confirm in cybersenseieh@gmail.com.)";
      }
      form.reset();
    } catch (err) {
      if (formNote) {
        formNote.textContent =
          "Could not send right now. Email us directly at cybersenseieh@gmail.com.";
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // Lite YouTube: thumbnail facade → iframe only on click
  document.querySelectorAll("[data-youtube-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-playing")) return;
      const id = btn.getAttribute("data-youtube-id");
      if (!id) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = "YouTube video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      btn.classList.add("is-playing");
      btn.replaceChildren(iframe);
    });
  });

  // Kali terminal simulation — cybersensei-eh lab floor
  const kaliScreen = document.getElementById("kaliScreen");
  const kaliWindow = document.getElementById("kaliWindow");
  if (kaliScreen && kaliWindow) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = "cybersensei-eh";
    const user = "kali";

    const promptHtml = (cwd = "~/hacknight-mmu") =>
      `<span class="kali-prompt-user">${user}</span><span class="kali-prompt-mark">@</span><span class="kali-prompt-host">${host}</span><span class="kali-prompt-mark">:</span><span class="kali-prompt-path">${cwd}</span><span class="kali-prompt-mark">$ </span>`;

    const script = [
      { type: "boot", html: `<span class="kali-out--dim">┌──(kali㉿cybersensei-eh)-[~]</span>\n<span class="kali-out--dim">└─</span><span class="kali-out--info"> Hacknight ops · Master the Hack</span>` },
      { type: "cmd", cwd: "~", text: "whoami" },
      { type: "out", html: `<span class="kali-out--ok">sensei</span>` },
      { type: "cmd", cwd: "~", text: "hostnamectl --static" },
      { type: "out", html: `<span class="kali-out--info">cybersensei-eh</span>` },
      { type: "cmd", cwd: "~", text: "cd ~/hacknight-mmu && ls" },
      {
        type: "out",
        html: `<span class="kali-out--warn">challenges/</span>  <span class="kali-out">scoreboard/</span>  <span class="kali-out">walkthroughs/</span>  <span class="kali-out">merch/</span>`,
      },
      { type: "cmd", text: "nmap -sV --top-ports 20 10.10.10.42" },
      {
        type: "out",
        html: `<span class="kali-out--dim">Starting Nmap 7.94 ( https://nmap.org ) at lab floor</span>
<span class="kali-out">Nmap scan report for web-01.hacknight.lab (10.10.10.42)</span>
<span class="kali-out">PORT     STATE SERVICE  VERSION</span>
<span class="kali-out--ok">22/tcp   open  ssh      OpenSSH 9.2</span>
<span class="kali-out--ok">80/tcp   open  http     nginx 1.24.0</span>
<span class="kali-out--ok">3000/tcp open  http     Node.js Express</span>
<span class="kali-out--dim">Nmap done: 1 IP address (1 host up) scanned</span>`,
      },
      { type: "cmd", text: "ffuf -u http://10.10.10.42/FUZZ -w wordlists/raft-small.txt -mc 200 -t 40" },
      {
        type: "out",
        html: `<span class="kali-out--dim">:: Progress — [####################] 100%</span>
<span class="kali-out--ok">admin                  [Status: 200, Size: 2411]</span>
<span class="kali-out--ok">api                    [Status: 200, Size: 88]</span>
<span class="kali-out--ok">api/user?id=          [Status: 200, Size: 312]</span>
<span class="kali-out--warn">:: hint — SSRF lab (Cyber Chief Circle energy)</span>`,
      },
      { type: "cmd", text: "curl -s 'http://10.10.10.42/api/fetch?url=file:///flag.txt'" },
      {
        type: "out",
        html: `<span class="kali-out--flag">CS{master_the_hack_until_sunrise}</span>`,
      },
      { type: "cmd", text: "echo \"[+] flag bagged — posting dawn walkthrough\"" },
      {
        type: "out",
        html: `<span class="kali-out--ok">[+] flag bagged — posting dawn walkthrough</span>
<span class="kali-out--info">→ youtube.com/@cybersensei-EH</span>
<span class="kali-out--info">→ medium.com/@cybersenseieh</span>
<span class="kali-out--dim">session locked · crew still in the room</span>`,
      },
    ];

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const appendLine = (html) => {
      const line = document.createElement("div");
      line.className = "kali-line";
      line.innerHTML = html;
      kaliScreen.appendChild(line);
      kaliScreen.scrollTop = kaliScreen.scrollHeight;
      return line;
    };

    const typeCommand = async (cwd, text) => {
      const line = appendLine(promptHtml(cwd));
      const cmd = document.createElement("span");
      cmd.className = "kali-cmd";
      line.appendChild(cmd);
      const cursor = document.createElement("span");
      cursor.className = "kali-cursor";
      cursor.setAttribute("aria-hidden", "true");
      line.appendChild(cursor);

      for (let i = 0; i < text.length; i += 1) {
        cmd.textContent += text[i];
        kaliScreen.scrollTop = kaliScreen.scrollHeight;
        await sleep(18 + Math.random() * 32);
      }
      cursor.remove();
      await sleep(180 + Math.random() * 220);
    };

    const runStatic = () => {
      kaliScreen.innerHTML = "";
      script.forEach((step) => {
        if (step.type === "boot" || step.type === "out") {
          appendLine(step.html);
        } else if (step.type === "cmd") {
          appendLine(`${promptHtml(step.cwd || "~/hacknight-mmu")}<span class="kali-cmd">${step.text}</span>`);
        }
      });
      appendLine(`${promptHtml()}<span class="kali-cursor" aria-hidden="true"></span>`);
    };

    const runLoop = async () => {
      while (true) {
        kaliScreen.innerHTML = "";
        for (const step of script) {
          if (step.type === "boot") {
            appendLine(step.html);
            await sleep(500);
          } else if (step.type === "cmd") {
            await typeCommand(step.cwd || "~/hacknight-mmu", step.text);
          } else if (step.type === "out") {
            appendLine(step.html);
            await sleep(420 + Math.random() * 380);
          }
        }
        const idle = appendLine(`${promptHtml()}<span class="kali-cursor" aria-hidden="true"></span>`);
        await sleep(4200);
        idle.remove();
        appendLine(`<span class="kali-out--dim"># replay · next wave</span>`);
        await sleep(900);
      }
    };

    const start = () => {
      if (reduceMotion) {
        runStatic();
        return;
      }
      runLoop();
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              start();
              io.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      io.observe(kaliWindow);
    } else {
      start();
    }
  }
})();
