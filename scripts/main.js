/* ==========================================================================
   DEEPESH KUMAR JAIN - PORTFOLIO INTERACTION CONTROLLER
   Web Audio Synth, Dynamic Typing, 3D Tilt, Scrollspy & HUD Manager
   ========================================================================== */

class PortfolioController {
  constructor() {
    this.soundEnabled = false;
    this.audioCtx = null;
    this.initTypingEffect();
    this.initAudio();
    this.initNavigation();
    this.init3DTilt();
    this.init3DModeToggle();
    this.initClipboardAndContact();
    this.initNodeHoverListener();
    this.initArchitectureFlow();
  }

  // Web Audio API Synthesizer (No external sound files required)
  initAudio() {
    const audioBtn = document.getElementById('sound-toggle-btn');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      if (this.soundEnabled) {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContext();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        audioBtn.classList.add('active');
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        this.playSound('success');
        this.showToast('🔊 Audio feedback enabled');
      } else {
        audioBtn.classList.remove('active');
        audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        this.showToast('🔇 Audio feedback muted');
      }
    });

    window.playUiSound = (type) => this.playSound(type);
  }

  playSound(type) {
    if (!this.soundEnabled || !this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'beep') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'run') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'success') {
        // Quick chord
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + i * 0.07);
          g.gain.setValueAtTime(0.06, now + i * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.3);
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.start(now + i * 0.07);
          o.stop(now + i * 0.07 + 0.3);
        });
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Hero Headline Typing Effect
  initTypingEffect() {
    const el = document.getElementById('typing-headline');
    if (!el) return;

    const phrases = [
      "AI Automation Engineer",
      "SAP Joule Studio Agent Builder",
      "n8n Multi-Agent Workflow Architect",
      "Microsoft Power Platform & Copilot Pro",
      "ERP Functional Process Specialist"
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 100;

    const type = () => {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        delay = 45;
      } else {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        delay = 100;
      }

      if (!isDeleting && charIdx === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 500;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 800);
  }

  // Navigation scrollspy & mobile menu
  initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // ScrollSpy
      let currentSection = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          if (mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });
    }
  }

  // 3D Card Tilt Effect on Profile
  init3DTilt() {
    const card = document.getElementById('hero-holo-card');
    if (!card) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 14;
      const rotY = (x / (rect.width / 2)) * 14;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  // 3D Mode Toggle
  init3DModeToggle() {
    const toggleBtn = document.getElementById('toggle-3d-mode');
    const hudBtn = document.getElementById('hud-toggle-3d');
    const resetCamBtn = document.getElementById('hud-reset-cam');

    const toggle = () => {
      const is3D = !window.portfolio3DScene.interactiveMode;
      window.portfolio3DScene.setInteractiveMode(is3D);

      const label = is3D ? '<i class="fas fa-cube"></i> Exit 3D Orbit' : '<i class="fas fa-cube"></i> Free 3D Orbit';
      if (toggleBtn) {
        toggleBtn.classList.toggle('active', is3D);
        toggleBtn.innerHTML = label;
      }
      if (hudBtn) {
        hudBtn.classList.toggle('active', is3D);
        hudBtn.innerHTML = is3D ? '<i class="fas fa-hand-pointer"></i> Free Orbit Active' : '<i class="fas fa-cube"></i> Inspect 3D';
      }

      this.showToast(is3D ? '🎮 Free 3D Orbit active! Drag with mouse to rotate & inspect.' : '📜 Scroll Sync Mode restored.');
      if (this.playSound) this.playSound('click');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', toggle);
    if (hudBtn) hudBtn.addEventListener('click', toggle);

    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => {
        window.portfolio3DScene.resetCamera();
        this.showToast('🎯 3D Camera view reset to center.');
        if (this.playSound) this.playSound('click');
      });
    }
  }

  // Hover indicator for 3D Nodes
  initNodeHoverListener() {
    const toast = document.getElementById('global-toast');
    window.addEventListener('threeNodeHover', (e) => {
      if (toast && !toast.classList.contains('show')) {
        this.showToast(`✨ Hovering 3D Node: ${e.detail.name} (${e.detail.category}) - Click to inspect`);
      }
    });
  }

  // Clipboard & Contact Handling
  initClipboardAndContact() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-copy');
        if (val) {
          navigator.clipboard.writeText(val).then(() => {
            this.showToast(`📋 Copied "${val}" to clipboard!`);
            this.playSound('beep');
          });
        }
      });
    });

    const contactForm = document.getElementById('contact-terminal-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        this.playSound('success');
        this.showToast(`🚀 Message prepared from ${name}! Opening default mail client...`);
        
        // Form mailto trigger
        const mailtoUrl = `mailto:jaindeepesh213@gmail.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Client Email: ${email}\n\n${message}`)}`;
        window.location.href = mailtoUrl;

        contactForm.reset();
      });
    }
  }

  // Interactive Architecture Step Selector (Stages 01 - 05)
  initArchitectureFlow() {
    const flowSteps = document.querySelectorAll('.arch-flow-diagram .flow-step');
    if (!flowSteps || flowSteps.length === 0) return;

    const stepTelemetry = [
      { num: '01', title: 'Trigger & Ingestion', desc: 'Active: Ingesting webhooks, Apify scrapers, and SAP Event Mesh streams.' },
      { num: '02', title: 'Data Normalization', desc: 'Active: Running schema validation, deduplication, and payload mapping.' },
      { num: '03', title: 'Cognitive AI Agent', desc: 'Active: GPT-4o / Claude reasoning, vector memory RAG, and requirement scoring.' },
      { num: '04', title: 'Human-in-the-Loop', desc: 'Active: Teams & Slack adaptive review cards with 1-click approvals.' },
      { num: '05', title: 'ERP Commit & Alert', desc: 'Active: Committing SAP S/4HANA BAPIs and persisting PostgreSQL/Airtable audit logs.' }
    ];

    flowSteps.forEach((step, idx) => {
      step.setAttribute('role', 'button');
      step.setAttribute('tabindex', '0');
      step.setAttribute('title', `Click to select Stage 0${idx + 1}`);

      const selectStep = () => {
        flowSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');

        if (this.playSound) this.playSound('click');
        const info = stepTelemetry[idx] || { num: `0${idx + 1}`, title: 'Pipeline Stage', desc: 'Step selected.' };
        this.showToast(`⚡ Stage ${info.num}: ${info.title} — ${info.desc}`);
      };

      step.addEventListener('click', selectStep);
      step.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectStep();
        }
      });
    });
  }

  showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) return;

    toast.innerHTML = `<i class="fas fa-terminal"></i> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// Global toast helper
window.showToast = (msg) => {
  if (window.portfolioController) {
    window.portfolioController.showToast(msg);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioController = new PortfolioController();
});
