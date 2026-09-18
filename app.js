/**
 * TEX//STACK & PROCESSING TELEMETRY CONTROLLER
 * Strict adherence to Image 3 Design System (Lufga / RON DESIGN)
 * Handles view switching to Processing Dashboard (Images 1 & 2), 3D Tilt, Audio Haptics
 */

// ==========================================================================
// 1. SYNTHESIZED WEB AUDIO API HAPTICS
// ==========================================================================
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Snappy click
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) { }
  }

  // Hover tick
  playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) { }
  }

  // Dashboard reveal chord
  playDashboardOpen() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [587.33, 739.99, 880.00, 1174.66]; // D Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.04 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.22);
      });
    } catch (e) { }
  }
}

const sfx = new SoundFX();

// ==========================================================================
// 2. VIEW CONTROLLER (4 PILLARS <-> 7 PROCESSING MODULES <-> SUB-SUITES <-> SCADA DASHBOARD)
// ==========================================================================
let currentSubModule = null;

function hideAllViews() {
  const views = [
    document.getElementById("mainPageView"),
    document.getElementById("processingModulesView"),
    document.getElementById("colorIntelligenceSubView"),
    document.getElementById("fabricInspectionSubView"),
    document.getElementById("dyeingColorInspectionView"),
    document.getElementById("printingColorInspectionView"),
    document.getElementById("bleachingColorInspectionView"),
    document.getElementById("mercerizingColorInspectionView"),
    document.getElementById("stenterColorInspectionView"),
    document.getElementById("greigeInspectionView"),
    document.getElementById("pretreatmentInspectionView"),
    document.getElementById("fvDyeingInspectionView"),
    document.getElementById("fvPrintingInspectionView"),
    document.getElementById("fvFinishInspectionView"),
    document.getElementById("foldingInspectionView"),
    document.getElementById("dashboardView")
  ];
  views.forEach((v) => {
    if (v) v.style.display = "none";
  });
}

function showProcessingModulesView() {
  const procView = document.getElementById("processingModulesView");
  if (!procView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = null;
  procView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#processing-modules");
}

function hideProcessingModulesView() {
  const mainView = document.getElementById("mainPageView");

  sfx.playClick();
  hideAllViews();
  currentSubModule = null;
  if (mainView) mainView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", window.location.pathname);
}

function showColorIntelligenceSubView() {
  const ciView = document.getElementById("colorIntelligenceSubView");
  if (!ciView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  ciView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-suite");
}

function showFabricInspectionSubView() {
  const fvView = document.getElementById("fabricInspectionSubView");
  if (!fvView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "fabric-vision";
  fvView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#fabric-inspection-suite");
}

function showDyeingColorInspectionView() {
  const dyeingView = document.getElementById("dyeingColorInspectionView");
  if (!dyeingView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  dyeingView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-dyeing");
}

function showPrintingColorInspectionView() {
  const prnView = document.getElementById("printingColorInspectionView");
  if (!prnView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  prnView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-printing");
}

function showBleachingColorInspectionView() {
  const blcView = document.getElementById("bleachingColorInspectionView");
  if (!blcView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  blcView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-bleaching");
}

function showMercerizingColorInspectionView() {
  const mrcView = document.getElementById("mercerizingColorInspectionView");
  if (!mrcView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  mrcView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-mercerizing");
}

function showStenterColorInspectionView() {
  const stnView = document.getElementById("stenterColorInspectionView");
  if (!stnView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "color-intelligence";
  stnView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#color-intelligence-finish");
}

function showNamedFabricVisionView(viewId, hash) {
  const view = document.getElementById(viewId);
  if (!view) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "fabric-vision";
  view.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", hash);
}

function showGreigeInspectionView() {
  showNamedFabricVisionView("greigeInspectionView", "#fabric-inspection-greige");
}

function showPretreatmentInspectionView() {
  showNamedFabricVisionView("pretreatmentInspectionView", "#fabric-inspection-pretreatment");
}

function showFvDyeingInspectionView() {
  showNamedFabricVisionView("fvDyeingInspectionView", "#fabric-inspection-dyeing");
}

function showFvPrintingInspectionView() {
  showNamedFabricVisionView("fvPrintingInspectionView", "#fabric-inspection-printing");
}

function showFvFinishInspectionView() {
  showNamedFabricVisionView("fvFinishInspectionView", "#fabric-inspection-finish");
}

function showFoldingInspectionView() {
  showNamedFabricVisionView("foldingInspectionView", "#fabric-inspection-folding");
}

function routeFabricVisionSub(subId) {
  if (subId === "greige") showGreigeInspectionView();
  else if (subId === "pretreatment") showPretreatmentInspectionView();
  else if (subId === "dyeing") showFvDyeingInspectionView();
  else if (subId === "printing") showFvPrintingInspectionView();
  else if (subId === "finish") showFvFinishInspectionView();
  else if (subId === "folding") showFoldingInspectionView();
}

function openModuleDashboard(moduleKey = "predictive-maintenance") {
  const dashView = document.getElementById("dashboardView");
  if (!dashView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  dashView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  history.pushState(null, "", "#processing-" + moduleKey);

  if (typeof window.activateTab === "function") {
    window.activateTab(moduleKey);
  }
}

function showDashboardView() {
  openModuleDashboard("predictive-maintenance");
}

function hideDashboardView() {
  const beacon = document.getElementById("anomalyBeacon");
  if (beacon) beacon.style.display = "none";
  const popup = document.getElementById("aiAnomalyPopup");
  if (popup) popup.style.display = "none";

  if (currentSubModule === "color-intelligence") {
    showColorIntelligenceSubView();
  } else if (currentSubModule === "fabric-vision") {
    showFabricInspectionSubView();
  } else {
    showProcessingModulesView();
  }
}

window.showProcessingModulesView = showProcessingModulesView;
window.hideProcessingModulesView = hideProcessingModulesView;
window.showColorIntelligenceSubView = showColorIntelligenceSubView;
window.showFabricInspectionSubView = showFabricInspectionSubView;
window.showDyeingColorInspectionView = showDyeingColorInspectionView;
window.showPrintingColorInspectionView = showPrintingColorInspectionView;
window.showBleachingColorInspectionView = showBleachingColorInspectionView;
window.showMercerizingColorInspectionView = showMercerizingColorInspectionView;
window.showStenterColorInspectionView = showStenterColorInspectionView;
window.showFinishColorInspectionView = showStenterColorInspectionView;
window.showGreigeInspectionView = showGreigeInspectionView;
window.showPretreatmentInspectionView = showPretreatmentInspectionView;
window.showFvDyeingInspectionView = showFvDyeingInspectionView;
window.showFvPrintingInspectionView = showFvPrintingInspectionView;
window.showFvFinishInspectionView = showFvFinishInspectionView;
window.showFoldingInspectionView = showFoldingInspectionView;
window.openModuleDashboard = openModuleDashboard;
window.showDashboardView = showDashboardView;
window.hideDashboardView = hideDashboardView;

// ==========================================================================
// 3. CARD 3D TILT & HOVER INTERACTION
// ==========================================================================
function initCard3DTilt() {
  const cards = document.querySelectorAll(".sector-card");

  cards.forEach((card) => {
    const glare = card.querySelector(".card-glare");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.025, 1.025, 1.025)`;

      if (glare) {
        glare.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255, 255, 255, 0.28), transparent 70%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      if (glare) {
        glare.style.background = "radial-gradient(circle 350px at 50% 50%, rgba(255, 255, 255, 0.16), transparent 70%)";
      }
    });

    // Click handler
    card.addEventListener("click", () => {
      const sectorId = card.getAttribute("data-sector");
      const moduleId = card.getAttribute("data-module");
      const subId = card.getAttribute("data-sub");
      sfx.playClick();

      if (sectorId === "processing") {
        showProcessingModulesView();
      } else if (moduleId === "color-intelligence" && !subId) {
        showColorIntelligenceSubView();
      } else if (moduleId === "color-intelligence" && subId === "dyeing") {
        showDyeingColorInspectionView();
      } else if (moduleId === "color-intelligence" && subId === "printing") {
        showPrintingColorInspectionView();
      } else if (moduleId === "color-intelligence" && subId === "bleaching") {
        showBleachingColorInspectionView();
      } else if (moduleId === "color-intelligence" && subId === "mercerizing") {
        showMercerizingColorInspectionView();
      } else if (moduleId === "color-intelligence" && (subId === "stenter" || subId === "finish")) {
        showStenterColorInspectionView();
      } else if (moduleId === "fabric-vision" && !subId) {
        showFabricInspectionSubView();
      } else if (moduleId === "fabric-vision" && subId) {
        routeFabricVisionSub(subId);
      } else if (moduleId === "predictive-maintenance") {
        openModuleDashboard("predictive-maintenance");
      }
    });

    // Keyboard navigation
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const sectorId = card.getAttribute("data-sector");
        const moduleId = card.getAttribute("data-module");
        const subId = card.getAttribute("data-sub");
        sfx.playClick();

        if (sectorId === "processing") {
          showProcessingModulesView();
        } else if (moduleId === "color-intelligence" && !subId) {
          showColorIntelligenceSubView();
        } else if (moduleId === "color-intelligence" && subId === "dyeing") {
          showDyeingColorInspectionView();
        } else if (moduleId === "color-intelligence" && subId === "printing") {
          showPrintingColorInspectionView();
        } else if (moduleId === "color-intelligence" && subId === "bleaching") {
          showBleachingColorInspectionView();
        } else if (moduleId === "color-intelligence" && subId === "mercerizing") {
          showMercerizingColorInspectionView();
        } else if (moduleId === "color-intelligence" && (subId === "stenter" || subId === "finish")) {
          showStenterColorInspectionView();
        } else if (moduleId === "fabric-vision" && !subId) {
          showFabricInspectionSubView();
        } else if (moduleId === "fabric-vision" && subId) {
          routeFabricVisionSub(subId);
        } else if (moduleId === "predictive-maintenance") {
          openModuleDashboard("predictive-maintenance");
        }
      }
    });
  });

  // Back button on Processing Modules Suite
  const btnBackPillars = document.getElementById("btnBackToPillars");
  if (btnBackPillars) {
    btnBackPillars.addEventListener("click", hideProcessingModulesView);
  }

  // Back buttons on Sub-Suites (Color Intelligence & Fabric Inspection)
  const btnBackCi = document.getElementById("btnBackFromColorIntel");
  if (btnBackCi) {
    btnBackCi.addEventListener("click", showProcessingModulesView);
  }

  const btnBackFv = document.getElementById("btnBackFromFabricVision");
  if (btnBackFv) {
    btnBackFv.addEventListener("click", showProcessingModulesView);
  }

  // Back & Return buttons for Color Intelligence Inspection Views
  [
    ["btnBackFromDyeing", "btnReturnToColorSuite"],
    ["btnBackFromPrinting", "btnReturnToColorSuiteFromPrinting"],
    ["btnBackFromBleaching", "btnReturnToColorSuiteFromBleaching"],
    ["btnBackFromMercerizing", "btnReturnToColorSuiteFromMercerizing"],
    ["btnBackFromStenter", "btnReturnToColorSuiteFromStenter"]
  ].forEach(([backId, returnId]) => {
    const bBtn = document.getElementById(backId);
    if (bBtn) {
      bBtn.addEventListener("click", () => {
        sfx.playClick();
        showColorIntelligenceSubView();
      });
    }
    const rBtn = document.getElementById(returnId);
    if (rBtn) {
      rBtn.addEventListener("click", () => {
        sfx.playClick();
        showColorIntelligenceSubView();
      });
    }
  });

  // Back & Return buttons for Fabric Inspection Vision Views
  [
    ["btnBackFromGreige", "btnReturnToFabricSuiteFromGreige"],
    ["btnBackFromPretreatment", "btnReturnToFabricSuiteFromPretreatment"],
    ["btnBackFromFvDyeing", "btnReturnToFabricSuiteFromFvDyeing"],
    ["btnBackFromFvPrinting", "btnReturnToFabricSuiteFromFvPrinting"],
    ["btnBackFromFvFinish", "btnReturnToFabricSuiteFromFvFinish"],
    ["btnBackFromFolding", "btnReturnToFabricSuiteFromFolding"]
  ].forEach(([backId, returnId]) => {
    const bBtn = document.getElementById(backId);
    if (bBtn) {
      bBtn.addEventListener("click", () => {
        sfx.playClick();
        showFabricInspectionSubView();
      });
    }
    const rBtn = document.getElementById(returnId);
    if (rBtn) {
      rBtn.addEventListener("click", () => {
        sfx.playClick();
        showFabricInspectionSubView();
      });
    }
  });

  // Global ESC handler for hierarchical back navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const dyeingView = document.getElementById("dyeingColorInspectionView");
      const prnView = document.getElementById("printingColorInspectionView");
      const blcView = document.getElementById("bleachingColorInspectionView");
      const mrcView = document.getElementById("mercerizingColorInspectionView");
      const stnView = document.getElementById("stenterColorInspectionView");
      const grgView = document.getElementById("greigeInspectionView");
      const preView = document.getElementById("pretreatmentInspectionView");
      const fvdView = document.getElementById("fvDyeingInspectionView");
      const fvpView = document.getElementById("fvPrintingInspectionView");
      const fvfView = document.getElementById("fvFinishInspectionView");
      const fldView = document.getElementById("foldingInspectionView");
      const dashView = document.getElementById("dashboardView");
      const ciView = document.getElementById("colorIntelligenceSubView");
      const fvView = document.getElementById("fabricInspectionSubView");
      const procView = document.getElementById("processingModulesView");

      const fvDashVisible =
        (grgView && grgView.style.display !== "none") ||
        (preView && preView.style.display !== "none") ||
        (fvdView && fvdView.style.display !== "none") ||
        (fvpView && fvpView.style.display !== "none") ||
        (fvfView && fvfView.style.display !== "none") ||
        (fldView && fldView.style.display !== "none");

      if (fvDashVisible) {
        sfx.playClick();
        showFabricInspectionSubView();
      } else if (
        (dyeingView && dyeingView.style.display !== "none") ||
        (prnView && prnView.style.display !== "none") ||
        (blcView && blcView.style.display !== "none") ||
        (mrcView && mrcView.style.display !== "none") ||
        (stnView && stnView.style.display !== "none")
      ) {
        sfx.playClick();
        showColorIntelligenceSubView();
      } else if (dashView && dashView.style.display !== "none") {
        hideDashboardView();
      } else if ((ciView && ciView.style.display !== "none") || (fvView && fvView.style.display !== "none")) {
        showProcessingModulesView();
      } else if (procView && procView.style.display !== "none") {
        hideProcessingModulesView();
      }
    }
  });
}

// ==========================================================================
// 4. DASHBOARD EVENT HANDLERS
// ==========================================================================
function setupDashboardInteractions() {
  const redDot = document.getElementById("backToPillarsBtn");
  const backArrow = document.getElementById("backArrowBtn");
  const brandIcon = document.querySelector(".dash-brand-icon");

  if (redDot) redDot.addEventListener("click", hideDashboardView);
  if (backArrow) backArrow.addEventListener("click", hideDashboardView);
  if (brandIcon) {
    brandIcon.style.cursor = "pointer";
    brandIcon.title = "Back to Processing Modules (ESC)";
    brandIcon.addEventListener("click", hideDashboardView);
  }

  // Time ticks click feedback
  const timeTicks = document.querySelectorAll(".time-tick");
  timeTicks.forEach((tick) => {
    tick.addEventListener("click", () => {
      sfx.playClick();
      timeTicks.forEach((t) => {
        t.classList.remove("active-selection");
        const badge = t.querySelector(".scrubber-blue-badge");
        if (badge) badge.remove();
      });
      tick.classList.add("active-selection");
      const badge = document.createElement("div");
      badge.className = "scrubber-blue-badge";
      badge.textContent = "100+";
      tick.prepend(badge);
    });
  });

  // Zoom buttons
  const zoomBtns = document.querySelectorAll(".zoom-btn, .minimap-zoom-btn");
  zoomBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      sfx.playClick();
    });
  });

  // Dock items
  const dockItems = document.querySelectorAll(".dock-item");
  dockItems.forEach((item) => {
    item.addEventListener("click", () => {
      sfx.playClick();
      dockItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Global Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const dashView = document.getElementById("dashboardView");
      if (dashView && dashView.style.display !== "none") {
        hideDashboardView();
      }
    }
  });

  // Deep linking via hash
  function checkHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#color-intelligence-dyeing" || hash === "#dyeing-inspection") {
      showDyeingColorInspectionView();
    } else if (hash === "#color-intelligence-printing" || hash === "#printing-inspection") {
      showPrintingColorInspectionView();
    } else if (hash === "#color-intelligence-bleaching" || hash === "#bleaching-inspection") {
      showBleachingColorInspectionView();
    } else if (hash === "#color-intelligence-mercerizing" || hash === "#mercerizing-inspection") {
      showMercerizingColorInspectionView();
    } else if (hash === "#color-intelligence-stenter" || hash === "#stenter-inspection" || hash === "#color-intelligence-finish" || hash === "#finish-inspection") {
      showStenterColorInspectionView();
    } else if (hash === "#processing-predictive-maintenance" || hash === "#predictive-maintenance") {
      openModuleDashboard("predictive-maintenance");
    } else if (hash === "#fabric-inspection-greige") {
      showGreigeInspectionView();
    } else if (hash === "#fabric-inspection-pretreatment") {
      showPretreatmentInspectionView();
    } else if (hash === "#fabric-inspection-dyeing") {
      showFvDyeingInspectionView();
    } else if (hash === "#fabric-inspection-printing") {
      showFvPrintingInspectionView();
    } else if (hash === "#fabric-inspection-finish") {
      showFvFinishInspectionView();
    } else if (hash === "#fabric-inspection-folding") {
      showFoldingInspectionView();
    } else if (hash === "#color-intelligence-suite" || hash === "#color-intelligence") {
      showColorIntelligenceSubView();
    } else if (hash === "#fabric-inspection-suite" || hash === "#fabric-vision") {
      showFabricInspectionSubView();
    } else if (hash === "#processing" || hash === "#processing-modules") {
      showProcessingModulesView();
    }
  }
  window.addEventListener("hashchange", checkHash);
  window.addEventListener("popstate", checkHash);
  checkHash();
}

// ==========================================================================
// 5. DYNAMIC CURSOR FOLLOWER
// ==========================================================================
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const aura = document.getElementById("cursorAura");
  if (!dot || !aura) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let auraX = mouseX;
  let auraY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderAura() {
    auraX += (mouseX - auraX) * 0.15;
    auraY += (mouseY - auraY) * 0.15;
    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;
    requestAnimationFrame(renderAura);
  }
  requestAnimationFrame(renderAura);

  // Hover state expansions
  const hoverables = document.querySelectorAll("button, .sector-card, .dash-pill-box, .dock-item, .time-tick");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      aura.style.width = "54px";
      aura.style.height = "54px";
      aura.style.borderColor = "rgba(40, 96, 235, 0.7)";
      dot.style.background = "#2860EB";
    });
    el.addEventListener("mouseleave", () => {
      aura.style.width = "36px";
      aura.style.height = "36px";
      aura.style.borderColor = "rgba(40, 96, 235, 0.4)";
      dot.style.background = "#2860EB";
    });
  });
}

// ==========================================================================
// 6. SCADA CLOCK TICKER & REAL-TIME TELEMETRY SIMULATION
// ==========================================================================
function initScadaClock() {
  const clockEl = document.getElementById("scadaClockDisplay");
  if (!clockEl) return;
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}

// Global SCADA state store
const scadaState = {
  inTemp: 24.1,
  inRH: 66,
  filterADiff: 1.80,
  filterBDiff: 0.90,
  sysPress: 7.90,
  alphaBar: 8.20,
  betaBar: 8.10,
  compRPMs: [1450, 1410, 899, 1450],
  compRunning: [true, true, true, true],
  autoDrainCycle: 200,
  logicInputState: 0,
  hmiMode: "ONLINE",
  radarValues: [0.85, 0.72, 0.78, 0.65, 0.90, 0.88, 0.75, 0.82]
};

function initScadaRealTimeEngine() {
  let tickCount = 0;

  // Real-time telemetry tick loop (every 1.5 seconds)
  setInterval(() => {
    tickCount++;
    const t = tickCount;

    // 1. Intake Temperature & Humidity Drift
    scadaState.inTemp = +(24.1 + Math.sin(t * 0.7) * 0.25).toFixed(1);
    scadaState.inRH = Math.round(66 + Math.cos(t * 0.5) * 1.5);
    const inTempEl = document.getElementById("scadaInTemp");
    const inRHEl = document.getElementById("scadaInRH");
    if (inTempEl) inTempEl.textContent = `${scadaState.inTemp}°C`;
    if (inRHEl) inRHEl.textContent = `${scadaState.inRH}%`;

    // 2. Filter Diffs & Needle angles
    scadaState.filterADiff = +(1.80 + Math.sin(t * 0.9) * 0.04).toFixed(2);
    scadaState.filterBDiff = +(0.90 + Math.cos(t * 0.8) * 0.03).toFixed(2);

    const filterAEl = document.getElementById("scadaFilterADiff");
    const filterBEl = document.getElementById("scadaFilterBDiff");
    if (filterAEl) filterAEl.textContent = `Diff: ${scadaState.filterADiff} psi`;
    if (filterBEl) filterBEl.textContent = `Diff: ${scadaState.filterBDiff} psi`;

    // Rotate Needles with SVG subpixel precision around exact dial pivot centers
    const needleA = document.getElementById("needleFilterA");
    const needleB = document.getElementById("needleFilterB");
    if (needleA) {
      const angleA = -35 + Math.sin(t * 0.9) * 4;
      needleA.setAttribute("transform", `rotate(${angleA.toFixed(1)}, 186, 250)`);
    }
    if (needleB) {
      const angleB = -55 + Math.cos(t * 0.8) * 3;
      needleB.setAttribute("transform", `rotate(${angleB.toFixed(1)}, 526, 250)`);
    }

    // 3. System Pressure
    scadaState.sysPress = +(7.90 + Math.sin(t * 1.1) * 0.04).toFixed(2);
    const sysPressEl = document.getElementById("scadaSysPressText");
    const sysPressL2El = document.getElementById("scadaSysPressL2");
    if (sysPressEl) sysPressEl.textContent = `${scadaState.sysPress} bar`;
    if (sysPressL2El) sysPressL2El.textContent = `${scadaState.sysPress} bar`;

    const needleSysTop = document.getElementById("needleSysPressTop");
    const needleSysL1 = document.getElementById("needleSysPressL1");
    const needleSysL2 = document.getElementById("needleSysPressL2");
    if (needleSysTop) {
      const angleTop = 42 + Math.sin(t * 1.1) * 3.5;
      needleSysTop.setAttribute("transform", `rotate(${angleTop.toFixed(1)}, 962, 85)`);
    }
    if (needleSysL1) {
      const angleL1 = -42 + Math.cos(t * 1.0) * 3;
      needleSysL1.setAttribute("transform", `rotate(${angleL1.toFixed(1)}, 70, 480)`);
    }
    if (needleSysL2) {
      const angleL2 = 45 + Math.sin(t * 1.1) * 3.5;
      needleSysL2.setAttribute("transform", `rotate(${angleL2.toFixed(1)}, 70, 560)`);
    }

    // 4. Receiver Tanks Alpha & Beta
    scadaState.alphaBar = +(8.20 + Math.sin(t * 0.6) * 0.03).toFixed(2);
    scadaState.betaBar = +(8.10 + Math.cos(t * 0.6) * 0.03).toFixed(2);
    const alphaEl = document.getElementById("scadaAlphaBar");
    const betaEl = document.getElementById("scadaBetaBar");
    if (alphaEl) alphaEl.textContent = `${scadaState.alphaBar} bar`;
    if (betaEl) betaEl.textContent = `${scadaState.betaBar} bar`;

    // 5. Compressor RPMs
    const baseRPMs = [1450, 1410, 899, 1450];
    baseRPMs.forEach((base, idx) => {
      if (scadaState.compRunning[idx]) {
        const jitter = Math.round(Math.sin(t * (1.2 + idx * 0.2)) * 3);
        scadaState.compRPMs[idx] = base + jitter;
      } else {
        scadaState.compRPMs[idx] = 0;
      }
      const el = document.getElementById(`scadaComp${idx + 1}Rpm`);
      if (el) el.textContent = `${scadaState.compRPMs[idx]} RPM`;
      const tagEl = document.getElementById(`tagComp${idx + 1}Rpm`);
      if (tagEl) tagEl.textContent = `CH-${idx + 1}`;
    });

    // 6. Auto-Drain Cycle Countdown
    if (scadaState.autoDrainCycle > 0) {
      scadaState.autoDrainCycle -= 1;
    } else {
      scadaState.autoDrainCycle = 200;
      // Brief purge pulse effect
      const lowVal = document.getElementById("scadaAutoDrainLow");
      if (lowVal) {
        lowVal.textContent = "2.4";
        setTimeout(() => { if (lowVal) lowVal.textContent = "0.0"; }, 1800);
      }
    }
    const cycleEl = document.getElementById("scadaAutoDrainCycle");
    if (cycleEl) cycleEl.textContent = scadaState.autoDrainCycle;

    // 7. Telemetry Station Bar Heights Jitter
    document.querySelectorAll(".telemetry-bar").forEach((bar) => {
      const origH = parseFloat(bar.getAttribute("data-height")) || 50;
      const variation = Math.sin(t * 1.5 + Math.random() * 2) * 3;
      const newH = Math.max(10, origH + variation);
      const newY = 96 - newH;
      bar.setAttribute("height", newH.toFixed(1));
      bar.setAttribute("y", newY.toFixed(1));
    });

    // 8. Radar Chart Breathing Morph
    const rcx = 632, rcy = 115, max_r = 48;
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    const newPolyPts = [];
    angles.forEach((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const baseVal = scadaState.radarValues[i];
      const breathing = Math.sin(t * 0.8 + i * 0.7) * 0.03;
      const curVal = Math.min(1.0, Math.max(0.2, baseVal + breathing));
      const dx = rcx + (max_r * curVal) * Math.sin(rad);
      const dy = rcy - (max_r * curVal) * Math.cos(rad);
      newPolyPts.push(`${dx.toFixed(1)},${dy.toFixed(1)}`);
      const dot = document.getElementById(`radar_dot_${i}`);
      if (dot) {
        dot.setAttribute("cx", dx.toFixed(1));
        dot.setAttribute("cy", dy.toFixed(1));
        dot.setAttribute("data-val", Math.round(curVal * 100));
      }
    });
    const radarPoly = document.getElementById("radarDataPoly");
    if (radarPoly) {
      radarPoly.setAttribute("points", newPolyPts.join(" "));
    }

    // 9. Sparklines Waveform Shift
    ["sparkFilterA", "sparkFilterB", "sparkAlpha", "sparkBeta", "sparkDesorptionTop"].forEach((sId) => {
      const poly = document.getElementById(`${sId}_poly`);
      if (!poly) return;
      const ptsAttr = poly.getAttribute("points");
      if (!ptsAttr) return;
      const pts = ptsAttr.split(" ").map((p) => p.split(",").map(Number));
      if (pts.length < 2) return;
      // Shift Y slightly
      const newPts = pts.map(([px, py], i) => {
        const ny = py + Math.sin(t * 1.4 + i * 0.8) * 0.9;
        return `${px.toFixed(1)},${ny.toFixed(1)}`;
      });
      poly.setAttribute("points", newPts.join(" "));
    });

    // 10. HMI Monitor Micro-Updates
    const purityEl = document.getElementById("hmiAirPurityVal");
    if (purityEl && scadaState.hmiMode === "ONLINE") {
      const purity = (99.7 + Math.sin(t * 0.9) * 0.04).toFixed(1);
      purityEl.textContent = `${purity}%`;
    }
  }, 1000);
}

// ==========================================================================
// 7. INTERACTIVE SCADA HANDLERS (VALVES, LOGIC, COMPRESSORS, HUD TOOLTIPS)
// ==========================================================================
function setupScadaInteractivity() {
  const container = document.querySelector(".dash-map-viewport");
  if (!container) return;

  // Create or retrieve floating SCADA Tooltip HUD
  let hud = document.querySelector(".scada-hud-tooltip");
  if (!hud) {
    hud = document.createElement("div");
    hud.className = "scada-hud-tooltip";
    container.appendChild(hud);
  }

  function showHud(x, y, title, tag, rows, statusText = "OPTIMAL", statusType = "status-ok") {
    let rowsHtml = "";
    rows.forEach(([lbl, val]) => {
      if (lbl === "Description" || lbl === "Diagnostic") {
        rowsHtml += `<div class="hud-desc-row"><span class="hud-desc-lbl">${lbl}:</span> <span>${val}</span></div>`;
      } else {
        rowsHtml += `<div class="hud-row"><span>${lbl}</span><span class="hud-val">${val}</span></div>`;
      }
    });
    hud.innerHTML = `
      <div class="hud-title"><span>${title}</span><span class="hud-tag">${tag}</span></div>
      ${rowsHtml}
      <span class="hud-status-badge ${statusType}">${statusText}</span>
    `;

    // Clamp horizontal position so tooltip never clips outside left or right edges
    const cWidth = container ? container.clientWidth : 1060;
    const clampedX = Math.max(165, Math.min(cWidth - 165, x));
    hud.style.left = `${clampedX}px`;

    // If near the top edge, flip below the element so text is never cut off
    if (y < 125) {
      hud.classList.add("pos-below");
      hud.style.top = `${y}px`;
    } else {
      hud.classList.remove("pos-below");
      hud.style.top = `${y}px`;
    }

    hud.classList.add("visible");
  }

  function hideHud() {
    hud.classList.remove("visible");
  }

  // 1. Interactive P&ID Valves Click & Hover
  const valves = document.querySelectorAll(".interactive-valve");
  valves.forEach((valve) => {
    valve.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();

      const curState = valve.getAttribute("data-state") || "open";
      const newState = curState === "open" ? "closed" : "open";
      valve.setAttribute("data-state", newState);

      if (newState === "open") {
        valve.classList.remove("valve-closed");
        valve.classList.add("valve-open");
      } else {
        valve.classList.remove("valve-open");
        valve.classList.add("valve-closed");
      }

      // Update HUD if hovering
      const rect = valve.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const vx = rect.left - cRect.left + rect.width / 2;
      const vy = rect.top - cRect.top;
      const valveId = valve.getAttribute("data-valve-id") || "VALVE";
      showHud(
        vx,
        vy,
        "Diaphragm Control Valve",
        valveId.toUpperCase(),
        [
          ["Status", newState === "open" ? "100% Flow (OPEN)" : "ISOLATED (CLOSED)"],
          ["Media", "Instrument Air (SCH40)"],
          ["Actuation", "Pneumatic Fail-Safe"]
        ],
        newState === "open" ? "ACTIVE OPEN" : "ISOLATED",
        newState === "open" ? "status-ok" : "status-alert"
      );
    });

    valve.addEventListener("mouseenter", (e) => {
      sfx.playHover();
      const rect = valve.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const vx = rect.left - cRect.left + rect.width / 2;
      const vy = rect.top - cRect.top;
      const state = valve.getAttribute("data-state") || "open";
      const valveId = valve.getAttribute("data-valve-id") || "VALVE";
      showHud(
        vx,
        vy,
        "Diaphragm Control Valve",
        valveId.toUpperCase(),
        [
          ["Status", state === "open" ? "100% Flow (OPEN)" : "ISOLATED (CLOSED)"],
          ["Rating", "ANSI 300 / 6\" CS"],
          ["Command", "Click to Toggle Open/Close"]
        ],
        state === "open" ? "ONLINE" : "CLOSED",
        state === "open" ? "status-ok" : "status-warn"
      );
    });

    valve.addEventListener("mouseleave", hideHud);
  });

  // 2. Interactive Compressors Click & Hover
  const compressors = document.querySelectorAll(".interactive-compressor");
  compressors.forEach((comp) => {
    comp.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();
      const compNum = parseInt(comp.getAttribute("data-comp"), 10) - 1;
      scadaState.compRunning[compNum] = !scadaState.compRunning[compNum];
      const isRun = scadaState.compRunning[compNum];

      const rotorLines = comp.querySelectorAll(".comp-rotor-line");
      rotorLines.forEach((l) => {
        l.style.animationPlayState = isRun ? "running" : "paused";
      });

      const rect = comp.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        `Continuous Jet Dyeing Chamber ${compNum + 1}`,
        `JET-CHAMBER-0${compNum + 1}`,
        [
          ["Main Nozzle Pump", isRun ? "75 kW (Running)" : "0 kW (IDLE)"],
          ["Liquor Flow Speed", isRun ? `${scadaState.compRPMs[compNum]} m/min` : "0 m/min"],
          ["Bath Temperature", isRun ? "68.4°C" : "32.1°C (Idle)"],
          ["Nozzle Pressure", isRun ? "7.92 bar" : "0.0 bar"]
        ],
        isRun ? "RUNNING NOMINAL" : "STANDBY IDLE",
        isRun ? "status-ok" : "status-warn"
      );
    });

    comp.addEventListener("mouseenter", () => {
      sfx.playHover();
      const compNum = parseInt(comp.getAttribute("data-comp"), 10) - 1;
      const isRun = scadaState.compRunning[compNum];
      const rect = comp.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        `Continuous Jet Dyeing Chamber ${compNum + 1}`,
        `JET-CHAMBER-0${compNum + 1}`,
        [
          ["Status", isRun ? "Running (100% Load)" : "Standby"],
          ["Telemetry Speed", `${scadaState.compRPMs[compNum]} m/min`],
          ["Vibration", isRun ? "1.2 mm/s RMS (Good)" : "0.0 mm/s"],
          ["Command", "Click to Start / Stop Chamber"]
        ],
        isRun ? "OPTIMAL" : "OFFLINE",
        isRun ? "status-ok" : "status-warn"
      );
    });

    comp.addEventListener("mouseleave", hideHud);
  });

  // 3. Interactive Logic Gate Switch (Auto-Drain Dialog)
  const logicToggle = document.getElementById("logicInputToggle");
  if (logicToggle) {
    logicToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();
      scadaState.logicInputState = scadaState.logicInputState === 0 ? 1 : 0;
      const val = scadaState.logicInputState;
      const txt = document.getElementById("logicInputVal");
      if (txt) txt.textContent = val;

      // Update interactive wires
      const wireIn = document.getElementById("wire_input");
      const wireNotOut = document.getElementById("wire_not_out");
      const wireSplitV = document.getElementById("wire_split_v");
      const wireSplitH = document.getElementById("wire_split_h");
      const wireAndTopOut = document.getElementById("wire_and_top_out");
      const wireAndBotOut = document.getElementById("wire_and_bot_out");
      const wireOut = document.getElementById("wire_output");
      const dotOut = document.getElementById("wire_output_dot");

      if (val === 1) {
        if (wireIn) wireIn.classList.add("active");
        if (wireNotOut) wireNotOut.classList.remove("active");
        if (wireSplitV) wireSplitV.classList.add("active");
        if (wireSplitH) wireSplitH.classList.add("active");
        if (wireAndTopOut) wireAndTopOut.classList.remove("active");
        if (wireAndBotOut) wireAndBotOut.classList.add("active");
        if (wireOut) wireOut.classList.add("active");
        if (dotOut) dotOut.setAttribute("fill", "#22C55E");
      } else {
        if (wireIn) wireIn.classList.remove("active");
        if (wireNotOut) wireNotOut.classList.add("active");
        if (wireSplitV) wireSplitV.classList.remove("active");
        if (wireSplitH) wireSplitH.classList.remove("active");
        if (wireAndTopOut) wireAndTopOut.classList.add("active");
        if (wireAndBotOut) wireAndBotOut.classList.remove("active");
        if (wireOut) wireOut.classList.remove("active");
        if (dotOut) dotOut.setAttribute("fill", "#1E293B");
      }
    });
  }

  // 4. Interactive HMI Button Toggle
  const hmiBtn = document.getElementById("hmiActionBtn");
  if (hmiBtn) {
    hmiBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();
      const modes = ["ONLINE", "PURGING", "STANDBY"];
      const nextIdx = (modes.indexOf(scadaState.hmiMode) + 1) % modes.length;
      scadaState.hmiMode = modes[nextIdx];
      const txt = document.getElementById("hmiBtnTxt");
      const bg = hmiBtn.querySelector(".hmi-btn-bg");
      if (txt) txt.textContent = scadaState.hmiMode;
      if (bg) {
        if (scadaState.hmiMode === "ONLINE") bg.setAttribute("fill", "#EA580C");
        else if (scadaState.hmiMode === "PURGING") bg.setAttribute("fill", "#16A34A");
        else bg.setAttribute("fill", "#2563EB");
      }
    });
  }

  // 5. Interactive Receiver & Buffer Tanks
  document.querySelectorAll(".interactive-tank").forEach((tank) => {
    tank.addEventListener("mouseenter", () => {
      sfx.playHover();
      const name = tank.getAttribute("data-tank") || "Vessel";
      const rect = tank.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const p = name === "Alpha" ? scadaState.alphaBar : name === "Beta" ? scadaState.betaBar : "7.85";
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        name === "Secondary Buffer" ? "Secondary Dye Liquor Buffer Tank" : name === "Auto-Drain Condensate Tank" ? "Auto-Chemical Recovery & Drain Tank" : `Color Kitchen Mixing Vessel ${name}`,
        `TK-${name.toUpperCase().replace(/[^A-Z0-9]/g, '-')}`,
        [
          ["Internal Pressure", `${p} bar`],
          ["Vessel Capacity", "5,000 Liters (Dye Prep)"],
          ["Color Uniformity", "ΔE 0.18 (Optimal)"],
          ["Liquor pH / Temp", "6.2 pH • 68.4°C"]
        ],
        "NORMAL CHARGED",
        "status-ok"
      );
    });
    tank.addEventListener("mouseleave", hideHud);
  });

  // 6. Interactive Radar Chart Dots
  document.querySelectorAll(".radar-dot").forEach((dot) => {
    dot.addEventListener("mouseenter", () => {
      sfx.playHover();
      const metric = dot.getAttribute("data-metric");
      const val = dot.getAttribute("data-val");
      const rect = dot.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left,
        rect.top - cRect.top,
        "Radial Quality Index",
        metric.toUpperCase(),
        [
          ["Index Score", `${val} / 100`],
          ["Compliance", "ISO 8573-1 Standard"],
          ["Target Threshold", ">= 75.0% Pass"]
        ],
        parseInt(val, 10) >= 70 ? "PASSED (CLASS 0)" : "WARNING",
        parseInt(val, 10) >= 70 ? "status-ok" : "status-warn"
      );
    });
    dot.addEventListener("mouseleave", hideHud);
  });

  // 7. Interactive Gauges Hover (All Pressure & Differential Meters)
  document.querySelectorAll(".interactive-gauge").forEach((gauge) => {
    gauge.addEventListener("mouseenter", () => {
      sfx.playHover();
      const lbl = gauge.getAttribute("data-label") || "Pressure Gauge";
      const id = gauge.id;
      let val = "7.92 bar";
      let detail = "Main Header Pressure";
      if (id === "dialFilterA") {
        val = `Diff: ${scadaState.filterADiff} psi`;
        detail = "Intake Filter A Differential (Clean)";
      } else if (id === "dialFilterB") {
        val = aiAnomalyActive ? "Diff: 2.94 psi (ALERT)" : `Diff: ${scadaState.filterBDiff} psi`;
        detail = "Intake Filter B Differential (Coalescing)";
      } else if (id === "dialSysPressTop" || id === "dialSysPressL2") {
        val = `${scadaState.sysPress} bar`;
        detail = "Instrument Loop Header Calibration";
      }

      const rect = gauge.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        lbl,
        id.toUpperCase(),
        [
          ["Live Value", val],
          ["Calibration", "ISO/IEC 17025 Certified"],
          ["Target Spec", detail]
        ],
        aiAnomalyActive && id === "dialFilterB" ? "CRITICAL ANOMALY" : "CALIBRATED OK",
        aiAnomalyActive && id === "dialFilterB" ? "status-alert" : "status-ok"
      );
    });
    gauge.addEventListener("mouseleave", hideHud);
  });

  // 8. Interactive Intake Duct
  const intake = document.getElementById("intakeSection");
  if (intake) {
    intake.addEventListener("mouseenter", () => {
      sfx.playHover();
      const rect = intake.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        "Pre-Scouring & Conditioning Intake",
        "INTAKE-01-SCOUR",
        [
          ["Fabric Temp", `${scadaState.inTemp}°C`],
          ["Bath pH Level", "6.4 pH (Pre-Treat)"],
          ["Conditioning Medium", "Softened Permeate Water"],
          ["AI Intake Control", "Thermal stabilization active"]
        ],
        "NOMINAL FLOW",
        "status-ok"
      );
    });
    intake.addEventListener("mouseleave", hideHud);
  }

  // 9. Interactive Vessels
  document.querySelectorAll(".interactive-vessel").forEach((vessel) => {
    vessel.addEventListener("mouseenter", () => {
      sfx.playHover();
      const name = vessel.getAttribute("data-vessel") || "Refining Vessel";
      const rect = vessel.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        name,
        "DYE-FLTR-ASME",
        [
          ["Operating Pressure", "7.92 bar"],
          ["Max Design Pressure", "16.0 bar @ 135°C"],
          ["Liquor Refining Life", "94.2% (7,200 hrs remaining)"]
        ],
        "ONLINE",
        "status-ok"
      );
    });
    vessel.addEventListener("mouseleave", hideHud);
  });

  // 10. Interactive Telemetry Stations (Chamber 1-4 Bars & Sight Glasses)
  document.querySelectorAll(".interactive-telemetry-station").forEach((st) => {
    st.addEventListener("mouseenter", () => {
      sfx.playHover();
      const sNum = parseInt(st.getAttribute("data-station"), 10);
      const title = st.getAttribute("data-title") || `Chamber ${sNum}`;
      const rect = st.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        `${title} Telemetry`,
        `CHAMBER-0${sNum}`,
        [
          ["Pump Speed", `${scadaState.compRPMs[sNum - 1]} RPM`],
          ["Liquor Level", "78% (Optimal Sight Band)"],
          ["Chamber Status", scadaState.compRunning[sNum - 1] ? "Active Circulation" : "Standby"],
          ["AI Quality Index", "98.6% (Level Dyeing Nominal)"]
        ],
        scadaState.compRunning[sNum - 1] ? "ONLINE" : "STANDBY",
        scadaState.compRunning[sNum - 1] ? "status-ok" : "status-warn"
      );
    });
    st.addEventListener("mouseleave", hideHud);
  });

  // 11. Interactive Pipes
  document.querySelectorAll(".interactive-pipe").forEach((pipe) => {
    pipe.addEventListener("mouseenter", () => {
      sfx.playHover();
      const pName = pipe.getAttribute("data-pipe") || "Dye Liquor Process Line";
      const isAnomaly = aiAnomalyActive && (pipe.id === "pipe_filterB_header" || pipe.id === "pipe_filterB_stem");
      if (isAnomaly) return;
      const rect = pipe.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        pName,
        "SCH40-316L",
        [
          ["Media", "Refined Dye Liquor / Softened Water"],
          ["Velocity", isAnomaly ? "3.2 m/s (RESTRICTED FLOW)" : "6.4 m/s (Laminar)"],
          ["Header Pressure", isAnomaly ? "5.40 bar (Loss across filter)" : "7.92 bar"],
          ["AI Status", isAnomaly ? "FLOW RESTRICTION FLAGGED" : "Laminar Nominal"]
        ],
        isAnomaly ? "PROCESS RESTRICTION" : "LAMINAR FLOW",
        isAnomaly ? "status-alert" : "status-ok"
      );
    });
    pipe.addEventListener("mouseleave", hideHud);
  });

  // 12. Interactive Window Buttons on Auto-Drain Dialog
  const btnClose = document.getElementById("btnWinClose");
  const autoDialog = document.getElementById("autoDrainDialog");
  if (btnClose && autoDialog) {
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();
      autoDialog.style.display = autoDialog.style.display === "none" ? "block" : "none";
    });
  }

  const btnMin = document.getElementById("btnWinMinimize");
  if (btnMin && autoDialog) {
    btnMin.addEventListener("click", (e) => {
      e.stopPropagation();
      sfx.playClick();
      const isMin = autoDialog.getAttribute("data-minimized") === "true";
      autoDialog.setAttribute("data-minimized", !isMin);
      autoDialog.style.transform = isMin ? "translate(24px, 668px) scale(1)" : "translate(24px, 830px) scale(0.6)";
      autoDialog.style.transition = "transform 0.3s ease";
    });
  }

  // 13. Interactive Line Charts & Sparklines Hover HUD Popups
  document.querySelectorAll(".interactive-sparkline").forEach((spark) => {
    spark.addEventListener("mouseenter", () => {
      sfx.playHover();
      const title = spark.getAttribute("data-title") || "Telemetry Trend Chart";
      const id = spark.getAttribute("data-id") || "TREND-01";
      const param = spark.getAttribute("data-param") || "Live Signal";
      const norm = spark.getAttribute("data-norm") || "Nominal Range";
      const desc = spark.getAttribute("data-desc") || "Real-time process telemetry";
      const statusText = spark.getAttribute("data-status") || "OPTIMAL";
      const statusType = spark.getAttribute("data-statustype") || "status-ok";

      const rect = spark.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        title,
        id,
        [
          ["Telemetry", param],
          ["Baseline", norm],
          ["Description", desc]
        ],
        statusText,
        statusType
      );
    });
    spark.addEventListener("mouseleave", hideHud);
  });
}

// ==========================================================================
// 8. AI PROCESS ANOMALY SYSTEM (RED OUTLINES & DIAGNOSTIC POPUPS)
// ==========================================================================
const simulatedAnomalies = [
  {
    componentId: "dialFilterB",
    pipeIds: ["pipe_filterB_header", "pipe_filterB_stem"],
    componentName: "Dye Liquor Refining Filter B (Micro-Coalescing)",
    shortName: "Dye Filter B",
    metricSpike: "ΔP: 2.94 psi (High Spike)",
    metricNorm: "0.90 psi (Limit: 1.40 psi)",
    severity: "CRITICAL",
    explanation: "AI Vision & Differential telemetry detected coalescing filter particulate loading exceeding ISO Class 2 threshold in Dyeing Chamber #3 feed line.",
    actionSummary: "Divert liquor flow to Standby Filter A & initiate automated backwash",
    normValElId: "scadaFilterBDiff",
    normVal: "Diff: 0.90 psi",
    spikeVal: "Diff: 2.94 psi (ALERT)",
    defaultX: 470,
    defaultY: 160
  },
  {
    componentId: "compressor_3",
    pipeIds: [],
    componentName: "Continuous Jet Dyeing Chamber 3 (Nozzle Pump Drive)",
    shortName: "Jet Chamber 3",
    metricSpike: "Vibration: 4.8 mm/s RMS (Harmonic Surge)",
    metricNorm: "1.2 mm/s (ISO 10816 Limit: 2.8)",
    severity: "WARNING",
    explanation: "AI Acoustic Sentinel detected pump cavitation and nozzle pressure fluctuations at 899 RPM. MTBF reduced to 48 hrs without AI load re-balancing.",
    actionSummary: "Throttle motor VFD to 720 RPM & transfer base liquor flow to Chamber 1",
    normValElId: "scadaComp3Rpm",
    normVal: "899 RPM",
    spikeVal: "899 RPM (VIB ALERT)",
    defaultX: 836,
    defaultY: 340
  },
  {
    componentId: "tank_Beta",
    pipeIds: ["valveBetaOutlet"],
    componentName: "Color Kitchen Mixing Vessel Beta (5,000L ASME)",
    shortName: "Mixing Vessel Beta",
    metricSpike: "Concentration Drift (ΔE 1.4)",
    metricNorm: "Nominal (ΔE < 0.3)",
    severity: "HIGH RISK",
    explanation: "AI Colorimeter detected dye concentration dispersion drift in auxiliary mixing vessel. Risk of shade un-levelness across lot #842.",
    actionSummary: "Trigger Auto-Dosing solenoid & swap liquor circulation loop",
    normValElId: "scadaBetaBar",
    normVal: "8.10 bar",
    spikeVal: "8.10 bar (ALERT)",
    defaultX: 432,
    defaultY: 580
  }
];

let anomalyIdx = 0;
let aiAnomalyActive = false;

function triggerAiAnomaly() {
  aiAnomalyActive = true;
  const currentAnomaly = simulatedAnomalies[anomalyIdx % simulatedAnomalies.length];

  // Update popup details in DOM
  const compNameEl = document.getElementById("popupComponentName");
  const metricValEl = document.getElementById("popupMetricVal");
  const metricNormEl = document.getElementById("popupMetricNorm");
  const explEl = document.getElementById("popupExplanation");
  const sevEl = document.getElementById("popupSeverity");

  if (compNameEl) compNameEl.textContent = currentAnomaly.componentName;
  if (metricValEl) metricValEl.textContent = currentAnomaly.metricSpike;
  if (metricNormEl) metricNormEl.textContent = currentAnomaly.metricNorm;
  if (explEl) explEl.textContent = currentAnomaly.explanation;
  if (sevEl) sevEl.textContent = currentAnomaly.severity;

  // Highlight component with pulsating red outline
  const comp = document.getElementById(currentAnomaly.componentId);
  if (comp) comp.classList.add("ai-anomaly-active");

  currentAnomaly.pipeIds.forEach((pid) => {
    const p = document.getElementById(pid);
    if (p) p.classList.add("ai-anomaly-active");
  });

  // Update canvas status banner with compact, non-overflowing text
  const statusEl = document.getElementById("aiAnomalyStatusText");
  if (statusEl) {
    statusEl.textContent = `⚠️ FAULT: ${currentAnomaly.shortName || currentAnomaly.componentName} (${currentAnomaly.metricSpike.split(' ')[0]} ${currentAnomaly.metricSpike.split(' ')[1] || ''})`;
    statusEl.classList.add("has-fault");
  }

  // Update component text readout
  const valEl = document.getElementById(currentAnomaly.normValElId);
  if (valEl) valEl.textContent = currentAnomaly.spikeVal;

  // Position and display floating beacon marker
  const dashView = document.getElementById("dashboardView");
  const container = document.getElementById("dashMapViewport");
  const beacon = document.getElementById("anomalyBeacon");
  if (container && beacon) {
    // Strictly prevent displaying beacon if dashboard is not active or container not rendered
    if (!dashView || dashView.style.display === "none" || container.clientWidth === 0 || container.clientHeight === 0) {
      beacon.style.display = "none";
      return;
    }

    let bx = 0, by = 0;
    if (comp && comp.getBoundingClientRect().width > 0) {
      const compRect = comp.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      if (currentAnomaly.componentId === "dialFilterB") {
        bx = compRect.left - cRect.left - 85;
        by = compRect.top - cRect.top - 46;
      } else {
        bx = compRect.left - cRect.left + compRect.width / 2;
        by = compRect.top - cRect.top - 12;
      }
    } else {
      const svgRoot = document.getElementById("scadaSvgRoot");
      if (svgRoot && svgRoot.clientWidth > 0) {
        const sRect = svgRoot.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        bx = (sRect.left - cRect.left) + currentAnomaly.defaultX * (sRect.width / 1060);
        by = (sRect.top - cRect.top) + currentAnomaly.defaultY * (sRect.height / 920);
      }
    }

    // STRICT GUARD: Never allow beacon to be placed at top corner or invalid coordinates
    if (bx < 80 || by < 60) {
      beacon.style.display = "none";
    } else {
      beacon.style.left = `${bx}px`;
      beacon.style.top = `${by}px`;
      beacon.style.display = "flex";
    }
  }

  sfx.playClick();
}

let popupHideTimer = null;

function resolveAiAnomaly() {
  if (!aiAnomalyActive) return;
  aiAnomalyActive = false;

  if (popupHideTimer) {
    clearTimeout(popupHideTimer);
    popupHideTimer = null;
  }

  const currentAnomaly = simulatedAnomalies[anomalyIdx % simulatedAnomalies.length];

  // Remove red fault highlights from geometry
  const el = document.getElementById(currentAnomaly.componentId);
  if (el) el.classList.remove("ai-anomaly-active");

  currentAnomaly.pipeIds.forEach((pid) => {
    const p = document.getElementById(pid);
    if (p) p.classList.remove("ai-anomaly-active");
  });

  // Hide beacon and diagnostic popup
  const beacon = document.getElementById("anomalyBeacon");
  if (beacon) beacon.style.display = "none";

  const popup = document.getElementById("aiAnomalyPopup");
  if (popup) popup.style.display = "none";

  // Reset telemetry readout to nominal
  const valEl = document.getElementById(currentAnomaly.normValElId);
  if (valEl) valEl.textContent = currentAnomaly.normVal;

  // Update status banner to nominal
  const statusEl = document.getElementById("aiAnomalyStatusText");
  if (statusEl) {
    statusEl.textContent = "Processing Nominal — 0 Faults";
    statusEl.classList.remove("has-fault");
  }

  // Play resolution chord
  sfx.playDashboardOpen();

  // Advance index for next simulation
  anomalyIdx++;
}

function setupAiAnomalyInteractivity() {
  const container = document.getElementById("dashMapViewport");
  const popup = document.getElementById("aiAnomalyPopup");
  const beacon = document.getElementById("anomalyBeacon");
  const btnResolve = document.getElementById("btnAutoResolveAi");
  const btnSim = document.getElementById("btnSimulateAnomaly");

  function showDiagnosticPopup(e) {
    if (!aiAnomalyActive || !popup || !container) return;
    if (popupHideTimer) {
      clearTimeout(popupHideTimer);
      popupHideTimer = null;
    }
    sfx.playHover();
    const currentAnomaly = simulatedAnomalies[anomalyIdx % simulatedAnomalies.length];
    const cRect = container.getBoundingClientRect();
    let targetEl = e ? e.currentTarget : null;
    let rect = targetEl ? targetEl.getBoundingClientRect() : null;
    let px, py;
    let posBelow = false;

    // Measure rendered height of popup (approx 290px)
    const popupH = popup.offsetHeight || 295;

    if (currentAnomaly.componentId === "dialFilterB") {
      // Anchored stably to the left of the radar chart
      const filterEl = document.getElementById("dialFilterB");
      const pipeEl = document.getElementById("pipe_filterB_header");
      const fRect = filterEl ? filterEl.getBoundingClientRect() : rect;
      const pRect = pipeEl ? pipeEl.getBoundingClientRect() : rect;

      if (fRect && pRect) {
        px = fRect.left - cRect.left - 130;
        const spaceAbove = pRect.top - cRect.top;
        if (spaceAbove < popupH + 20) {
          posBelow = true;
          py = pRect.bottom - cRect.top + 16;
        } else {
          posBelow = false;
          py = pRect.top - cRect.top - 14;
        }
      } else {
        px = container.clientWidth * (380 / 1060);
        posBelow = true;
        py = container.clientHeight * (225 / 920);
      }
    } else if (rect && rect.width > 0) {
      px = rect.left - cRect.left + rect.width / 2;
      const spaceAbove = rect.top - cRect.top;
      if (spaceAbove < popupH + 20) {
        posBelow = true;
        py = rect.bottom - cRect.top + 16;
      } else {
        posBelow = false;
        py = rect.top - cRect.top - 14;
      }
    } else {
      px = container.clientWidth * (currentAnomaly.defaultX / 1060);
      posBelow = true;
      py = container.clientHeight * ((currentAnomaly.defaultY + 40) / 920);
    }

    // Clamping to avoid spilling outside left, right, top, or bottom edges of viewport
    px = Math.max(160, Math.min(container.clientWidth - 160, px));
    if (posBelow) {
      popup.classList.add("pos-below");
      py = Math.max(16, Math.min(container.clientHeight - popupH - 16, py));
    } else {
      popup.classList.remove("pos-below");
      py = Math.max(popupH + 16, Math.min(container.clientHeight - 16, py));
    }

    popup.style.left = `${px}px`;
    popup.style.top = `${py}px`;
    popup.style.display = "block";
  }

  function hideDiagnosticPopup(e) {
    if (!popup) return;
    const related = e ? e.relatedTarget : null;
    if (related && (popup.contains(related) || related === popup)) return;

    if (popupHideTimer) clearTimeout(popupHideTimer);
    popupHideTimer = setTimeout(() => {
      popup.style.display = "none";
      popupHideTimer = null;
    }, 250);
  }

  if (beacon) {
    beacon.addEventListener("mouseenter", showDiagnosticPopup);
    beacon.addEventListener("mouseleave", hideDiagnosticPopup);
  }

  // Attach hover triggers to all potentially anomalous elements
  ["dialFilterB", "pipe_filterB_header", "pipe_filterB_stem", "compressor_3", "tank_Beta"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("mouseenter", (e) => {
      const currentAnomaly = simulatedAnomalies[anomalyIdx % simulatedAnomalies.length];
      if (aiAnomalyActive && (el.id === currentAnomaly.componentId || currentAnomaly.pipeIds.includes(el.id))) {
        showDiagnosticPopup(e);
      }
    });
    el.addEventListener("mouseleave", (e) => {
      if (aiAnomalyActive) {
        hideDiagnosticPopup(e);
      }
    });
  });

  if (popup) {
    popup.addEventListener("mouseenter", () => {
      if (popupHideTimer) {
        clearTimeout(popupHideTimer);
        popupHideTimer = null;
      }
    });
    popup.addEventListener("mouseleave", (e) => {
      hideDiagnosticPopup(e);
    });
  }

  if (btnResolve) {
    btnResolve.addEventListener("click", (e) => {
      e.stopPropagation();
      resolveAiAnomaly();
    });
  }

  if (btnSim) {
    btnSim.addEventListener("click", (e) => {
      e.stopPropagation();
      if (aiAnomalyActive) {
        resolveAiAnomaly();
      } else {
        triggerAiAnomaly();
      }
    });
  }



  window.triggerAiAnomaly = triggerAiAnomaly;
  window.resolveAiAnomaly = resolveAiAnomaly;
}

// ==========================================================================
// 9. SIDEBAR TABS CONTROLLER (7 REQUESTED AI TABS)
// ==========================================================================
const aiModulesData = {
  "color-intelligence": {
    title: "Color Intelligence AI — Dyeing & Printing",
    subtitle: "Spectrophotometric Delta-E Formulation, Inline Spectro Analysis & Continuous Auto-Dosing",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9V3z"/></svg>`,
    cards: [
      {
        title: "Spectro Color Match Index",
        metric: "ΔE 0.18",
        badge: "EXCELLENT",
        desc: "Closed-loop spectrophotometer inline color matching. Zero metamerism detected against master shade standard."
      },
      {
        title: "Recipe Auto-Correction Rate",
        metric: "99.2%",
        badge: "FIRST TIME RIGHT",
        desc: "Autonomous dye liquor dispensing dynamic adjustments based on real-time textile substrate reflectance."
      },
      {
        title: "Auxiliary Chemical Dosing",
        metric: "2.4 mL/kg",
        badge: "OPTIMIZED",
        desc: "Surfactants and leveling agents dynamically metered to prevent uneven strike rates across batch vessels."
      }
    ]
  },
  "fabric-vision": {
    title: "Fabric Inspection & Vision AI",
    subtitle: "High-Speed Linear Camera Optical Defect Classification (120 FPS)",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    cards: [
      {
        title: "Optical Defect Rate",
        metric: "0.012%",
        badge: "99.98% PASS",
        desc: "Neural inspection scanned 4,820m of greige fabric. Detected 2 broken picks, 0 oil stains."
      },
      {
        title: "Weft / Warp Skew Angle",
        metric: "+0.14°",
        badge: "ORTHOGONAL",
        desc: "Automated weft-straightener active. Real-time bow & skew compensation active."
      },
      {
        title: "Fabric Roll Grading",
        metric: "Grade A+",
        badge: "4-POINT SYSTEM",
        desc: "ASTM D5430 compliance: 2.1 penalty points per 100 sq meters. Zero critical defects."
      }
    ]
  },
  "energy-utilities": {
    title: "Energy & Utilities Optimization AI",
    subtitle: "Compressed Air, Boiler Steam & Electrical Grid Real-Time Management",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    cards: [
      {
        title: "Specific Energy Cons. (SEC)",
        metric: "0.114 kWh/kg",
        badge: "-14.2% YoY",
        desc: "AI VFD modulation of compressors 1-4 maintaining 7.90 bar at minimum kWh."
      },
      {
        title: "Thermal Waste Heat Recovery",
        metric: "94.6%",
        badge: "ECO SAVINGS",
        desc: "Dye liquor heat exchanger recycling 82°C effluent water into pre-treatment makeup."
      },
      {
        title: "Ultrasonic Leak Sentinel",
        metric: "0 Major Leaks",
        badge: "ACOUSTIC AI",
        desc: "Continuously listening at 40 kHz. 3 micro-leaks sealed during last shift cycle."
      }
    ]
  },
  "production-planning": {
    title: "Production Planning & Scheduling AI",
    subtitle: "Dynamic Batch Sequencing, Loom Allotment & Jet Dyeing Optimization",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    cards: [
      {
        title: "Overall Equipment Eff. (OEE)",
        metric: "94.2%",
        badge: "WORLD CLASS",
        desc: "Availability: 98.1% • Performance: 96.4% • Quality Rate: 99.8% across 32 machines."
      },
      {
        title: "Batch Color Sequence AI",
        metric: "Light → Dark",
        badge: "WATER OPTIMIZED",
        desc: "Optimized dyeing order reduces vessel cleaning water by 38% and wash downtime by 45 min."
      },
      {
        title: "On-Time Dispatch Forecast",
        metric: "99.4%",
        badge: "ON TARGET",
        desc: "Target ship date for Lot #TEX-8821: Sep 18, 2026. Zero supply chain bottleneck."
      }
    ]
  },
  "predictive-maintenance": {
    isPrimaryDashboard: true
  },
  "compliance-traceability": {
    title: "Compliance & Traceability AI",
    subtitle: "Digital Product Passport, GOTS, OEKO-TEX & ZDHC Level 3 Ledger",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    cards: [
      {
        title: "ZDHC Chemical Gateway",
        metric: "MRSL Level 3",
        badge: "100% VERIFIED",
        desc: "All dyestuffs and auxiliaries batch-checked against hazardous chemical restrictions."
      },
      {
        title: "Digital Product Passport",
        metric: "100% Traceable",
        badge: "QR DPP READY",
        desc: "QR blockchain hash embedded: Raw Organic Cotton farm coordinates to finishing stenter."
      },
      {
        title: "ESG Effluent Neutrality",
        metric: "pH 7.12",
        badge: "PASSED",
        desc: "COD: 42 mg/L (Limit 150) • BOD: 8 mg/L • TDS: 420 ppm. Water recycling at 92%."
      }
    ]
  },
  "mill-knowledge": {
    title: "Mill Knowledge Copilot",
    subtitle: "Autonomous Shift Engineering Assistant, Troubleshooting SOPs & Voice Assistant",
    icon: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1"/><circle cx="12" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>`,
    cards: [
      {
        title: "Autonomous SOP Engine",
        metric: "1,240 SOPs",
        badge: "INSTANT RETRIEVAL",
        desc: "Pre-loaded with machinery manuals, dyeing recipe corrections, and ISO audit protocols."
      },
      {
        title: "Shift Handover Copilot",
        metric: "Ready (Shift A)",
        badge: "AUTO-SUMMARIZED",
        desc: "Generated handover summary: 3 batch transitions, zero safety incidents, 99.8% air uptime."
      },
      {
        title: "Real-Time AI Guidance",
        metric: "Listening",
        badge: "NEURAL MIC",
        desc: "Ask any query: 'Diagnose pressure drop on line beta' or 'Optimize disperse blue 79 liquor'."
      }
    ]
  }
};

function setupAiSidebarTabs() {
  window.activateTab = function(tabKey) {};
}

function getWavelengthColorName(wl) {
  if (wl < 430) return "Violet";
  if (wl < 470) return "Blue";
  if (wl < 500) return "Cyan-Blue";
  if (wl < 540) return "Green";
  if (wl < 585) return "Yellow-Green";
  if (wl < 620) return "Yellow-Amber";
  if (wl < 660) return "Orange";
  return "Deep Red";
}

function setupSparklineHover(wrapId, pathId, crosshairId, dotId, tipId, valId, formatter) {
  const wrap = document.getElementById(wrapId);
  const path = document.getElementById(pathId);
  const crosshair = document.getElementById(crosshairId);
  const dot = document.getElementById(dotId);
  const tip = document.getElementById(tipId);
  const valEl = document.getElementById(valId);

  if (!wrap || !path || !crosshair || !dot || !tip) return;

  function getPathPointAtX(pathEl, targetX) {
    const totalLen = pathEl.getTotalLength();
    let start = 0, end = totalLen;
    for (let i = 0; i < 16; i++) {
      const mid = (start + end) / 2;
      const p = pathEl.getPointAtLength(mid);
      if (p.x < targetX) start = mid;
      else end = mid;
    }
    return pathEl.getPointAtLength((start + end) / 2);
  }

  wrap.addEventListener("mousemove", (e) => {
    const rect = wrap.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const t = mouseX / rect.width;
    const targetSvgX = t * 340;
    const pt = getPathPointAtX(path, targetSvgX);

    crosshair.setAttribute("x1", pt.x.toFixed(1));
    crosshair.setAttribute("x2", pt.x.toFixed(1));
    crosshair.style.opacity = "1";

    dot.setAttribute("cx", pt.x.toFixed(1));
    dot.setAttribute("cy", pt.y.toFixed(1));
    dot.style.opacity = "1";

    if (valEl && formatter) {
      valEl.textContent = formatter(t, pt.y);
    }

    tip.style.display = "flex";
    tip.style.left = `${mouseX}px`;
    const tipTop = (pt.y / 70) * rect.height - 10;
    tip.style.top = `${Math.max(12, tipTop)}px`;
  });

  wrap.addEventListener("mouseleave", () => {
    crosshair.style.opacity = "0";
    dot.style.opacity = "0";
    tip.style.display = "none";
  });
}

// ==========================================================================
// 9. DYEING COLOR INSPECTION AI INTERACTION LOGIC (CIELAB & CLOSED LOOP)
// ==========================================================================
function setupDyeingColorInspectionInteractions() {
  const inputL = document.getElementById("inputTargetL");
  const inputA = document.getElementById("inputTargetA");
  const inputB = document.getElementById("inputTargetB");
  const inputTol = document.getElementById("inputToleranceLimit");

  const targetSwatch = document.getElementById("targetSwatchPreview");
  const targetColorName = document.getElementById("targetColorName");
  const targetHexDisplay = document.getElementById("targetHexDisplay");
  const targetCielabDisplay = document.getElementById("targetCielabDisplay");
  const targetSrgbPicker = document.getElementById("targetSrgbPicker");

  const liveDeltaEVal = document.getElementById("liveDeltaEVal");
  const deltaMatchStatus = document.getElementById("deltaMatchStatus");
  const shadeChips = document.querySelectorAll(".shade-dot");

  const btnRecalibrate = document.getElementById("btnRecalibrateSensor");
  const btnApplyCorrection = document.getElementById("btnApplyColorCorrection");

  // Chart elements
  const btnTabSpectral = document.getElementById("btnTabSpectral");
  const btnTabDeltaStream = document.getElementById("btnTabDeltaStream");
  const targetCurvePath = document.getElementById("targetCurvePath");
  const liveFeedCurvePath = document.getElementById("liveFeedCurvePath");
  const deltaAreaPath = document.getElementById("deltaAreaPath");
  const liveScanDot = document.getElementById("liveScanDot");
  const liveScanVerticalLine = document.getElementById("liveScanVerticalLine");
  const wavelengthLabelsGroup = document.getElementById("wavelengthAxisLabels");

  const statPeakWavelength = document.getElementById("statPeakWavelength");
  const statSpectralFit = document.getElementById("statSpectralFit");
  const statLiveDeltaE = document.getElementById("statLiveDeltaE");

  // Measured inline baseline values (from in-line spectrophotometer sensor)
  const measured = { L: 24.12, a: -1.84, b: -18.42, hex: "#1B294A" };

  let currentChartMode = "spectral"; // 'spectral' or 'stream'
  let currentTargetColor = { r: 26, g: 40, b: 73, hex: "#1A2849" }; // Royal Navy #8821 default
  let streamHistory = [];
  const streamCapacity = 40;
  for (let i = 0; i < streamCapacity; i++) {
    streamHistory.push(0.18);
  }

  // --- Color Space Mathematics ---
  function hexToRgb(hex) {
    hex = (hex || "#1A2849").replace("#", "").trim();
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function rgbToLab(r, g, b) {
    let rNorm = r / 255;
    let gNorm = g / 255;
    let bNorm = b / 255;

    const linearize = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    let rLin = linearize(rNorm);
    let gLin = linearize(gNorm);
    let bLin = linearize(bNorm);

    let X = (rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375) * 100;
    let Y = (rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750) * 100;
    let Z = (rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041) * 100;

    // D65 Standard Illuminant reference white
    const Xn = 95.047;
    const Yn = 100.000;
    const Zn = 108.883;

    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

    let L = 116 * f(Y / Yn) - 16;
    let a = 500 * (f(X / Xn) - f(Y / Yn));
    let bVal = 200 * (f(Y / Yn) - f(Z / Zn));

    return { L, a, b: bVal };
  }

  function labToHex(L, a, bVal) {
    let y = (L + 16) / 116;
    let x = a / 500 + y;
    let z = y - bVal / 200;

    const fn = (t) => (t * t * t > 0.008856 ? t * t * t : (t - 16 / 116) / 7.787);

    let X = (95.047 * fn(x)) / 100;
    let Y = (100.0 * fn(y)) / 100;
    let Z = (108.883 * fn(z)) / 100;

    let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    let bl = X * 0.0557 + Y * -0.204 + Z * 1.057;

    const gamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
    const clampByte = (c) => Math.min(255, Math.max(0, Math.round(gamma(c) * 255)));

    const rByte = clampByte(r);
    const gByte = clampByte(g);
    const bByte = clampByte(bl);

    const toHex2 = (n) => n.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex2(rByte)}${toHex2(gByte)}${toHex2(bByte)}`;
  }

  function getShadeNameFromHex(hex) {
    const map = {
      "#1A2849": "Royal Navy #8821",
      "#059669": "Emerald Jade #508",
      "#DC2626": "Crimson Red #412",
      "#7C3AED": "Deep Violet #931",
      "#D97706": "Golden Ochre #204"
    };
    if (map[hex.toUpperCase()]) return map[hex.toUpperCase()];
    return `Standard Shade ${hex.toUpperCase()}`;
  }

  // --- Dynamic Color Application ---
  function applyColorFromHex(hex, explicitName = null) {
    hex = hex.toUpperCase();
    const rgb = hexToRgb(hex);
    currentTargetColor = { r: rgb.r, g: rgb.g, b: rgb.b, hex };

    let lab;
    if (hex === "#1A2849") {
      lab = { L: 24.00, a: -1.80, b: -18.50 };
    } else {
      lab = rgbToLab(rgb.r, rgb.g, rgb.b);
    }

    if (inputL) inputL.value = lab.L.toFixed(2);
    if (inputA) inputA.value = lab.a.toFixed(2);
    if (inputB) inputB.value = lab.b.toFixed(2);

    if (targetSrgbPicker) targetSrgbPicker.value = hex;
    if (targetSwatch) targetSwatch.style.backgroundColor = hex;
    if (targetHexDisplay) targetHexDisplay.textContent = `HEX: ${hex}`;
    if (targetCielabDisplay) {
      targetCielabDisplay.textContent = `L*: ${lab.L.toFixed(2)} • a*: ${lab.a.toFixed(2)} • b*: ${lab.b.toFixed(2)}`;
    }
    if (targetColorName) {
      targetColorName.textContent = explicitName || getShadeNameFromHex(hex);
    }

    updateCalculations();
  }

  function updateCalculations() {
    if (!inputL || !inputA || !inputB || !inputTol) return;

    const targetL = parseFloat(inputL.value) || 24.0;
    const targetA = parseFloat(inputA.value) || -1.8;
    const targetB = parseFloat(inputB.value) || -18.5;
    const tolerance = parseFloat(inputTol.value) || 0.5;

    // Standard Euclidean Delta-E (CIE 1976)
    const dL = targetL - measured.L;
    const da = targetA - measured.a;
    const db = targetB - measured.b;
    const deltaE = Math.sqrt(dL * dL + da * da + db * db);

    if (liveDeltaEVal) {
      liveDeltaEVal.textContent = deltaE.toFixed(2);
    }

    const hexColor = labToHex(targetL, targetA, targetB);
    const rgb = hexToRgb(hexColor);
    currentTargetColor = { r: rgb.r, g: rgb.g, b: rgb.b, hex: hexColor };

    if (targetSwatch) {
      targetSwatch.style.backgroundColor = hexColor;
    }
    if (targetHexDisplay) {
      targetHexDisplay.textContent = `HEX: ${hexColor}`;
    }
    if (targetSrgbPicker && targetSrgbPicker.value.toUpperCase() !== hexColor.toUpperCase()) {
      targetSrgbPicker.value = hexColor;
    }

    if (targetCielabDisplay) {
      targetCielabDisplay.textContent = `L*: ${targetL.toFixed(2)} • a*: ${targetA.toFixed(2)} • b*: ${targetB.toFixed(2)}`;
    }

    if (deltaMatchStatus) {
      if (deltaE <= tolerance) {
        deltaMatchStatus.textContent = "✓ MATCH";
        deltaMatchStatus.style.color = "#10B981";
      } else {
        deltaMatchStatus.textContent = "⚠ OUT OF SPEC";
        deltaMatchStatus.style.color = "#EF4444";
      }
    }

    if (statLiveDeltaE) {
      statLiveDeltaE.textContent = deltaE.toFixed(2);
    }
  }

  // Bind sRGB Color Picker Input
  if (targetSrgbPicker) {
    targetSrgbPicker.addEventListener("input", (e) => {
      applyColorFromHex(e.target.value);
    });
    targetSrgbPicker.addEventListener("change", (e) => {
      applyColorFromHex(e.target.value);
    });
  }

  // Bind Quick Shade Chips
  shadeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      sfx.playClick();
      const hex = chip.getAttribute("data-hex");
      const name = chip.getAttribute("data-name");
      if (hex) applyColorFromHex(hex, name);
    });
  });

  // Bind Stepper CIELAB Inputs
  [inputL, inputA, inputB, inputTol].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateCalculations);
      input.addEventListener("change", updateCalculations);
    }
  });

  // Action button: Calibrate
  if (btnRecalibrate) {
    btnRecalibrate.addEventListener("click", () => {
      sfx.playClick();
      const originalHtml = btnRecalibrate.innerHTML;
      btnRecalibrate.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <span>Zeroing White Reference...</span>
      `;
      btnRecalibrate.style.pointerEvents = "none";
      setTimeout(() => {
        btnRecalibrate.innerHTML = originalHtml;
        btnRecalibrate.style.pointerEvents = "auto";
      }, 1000);
    });
  }

  // Action button: Apply Recipe Correction
  if (btnApplyCorrection) {
    btnApplyCorrection.addEventListener("click", () => {
      sfx.playClick();
      const originalText = btnApplyCorrection.innerHTML;
      btnApplyCorrection.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Dosing Correction Applied!</span>
      `;
      btnApplyCorrection.style.background = "linear-gradient(135deg, #059669, #10B981)";
      setTimeout(() => {
        btnApplyCorrection.innerHTML = originalText;
        btnApplyCorrection.style.background = "";
      }, 1500);
    });
  }

  // --- Mode Tabs Switching ---
  if (btnTabSpectral && btnTabDeltaStream) {
    btnTabSpectral.addEventListener("click", () => {
      sfx.playClick();
      currentChartMode = "spectral";
      btnTabSpectral.classList.add("active");
      btnTabDeltaStream.classList.remove("active");
      if (wavelengthLabelsGroup) wavelengthLabelsGroup.style.display = "block";
    });

    btnTabDeltaStream.addEventListener("click", () => {
      sfx.playClick();
      currentChartMode = "stream";
      btnTabDeltaStream.classList.add("active");
      btnTabSpectral.classList.remove("active");
      if (wavelengthLabelsGroup) wavelengthLabelsGroup.style.display = "none";
    });
  }

  // ==========================================================================
  // REAL-TIME CONTINUOUS SINGLE CORRESPONDING COMPARISON ENGINE (60 FPS)
  // ==========================================================================
  const wavelengths = [400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680, 700];
  const chartXStart = 45;
  const chartXEnd = 525;
  const chartWidth = chartXEnd - chartXStart;
  const chartBaselineY = 86; // 0%
  const chartTopY = 16; // 80%

  function getXForWavelength(wl) {
    return chartXStart + ((wl - 400) / 300) * chartWidth;
  }

  function getYForReflectance(pct) {
    // 0% at 86, 80% at 16
    const clampPct = Math.max(0, Math.min(95, pct));
    return chartBaselineY - (clampPct / 80) * (chartBaselineY - chartTopY);
  }

  let animationFrameId = null;
  let scanPhase = 0;
  let lastStreamTick = 0;

  function renderComparisonLoop(timestamp) {
    const dyeingView = document.getElementById("dyeingColorInspectionView");
    if (!dyeingView || dyeingView.style.display === "none") {
      animationFrameId = requestAnimationFrame(renderComparisonLoop);
      return;
    }

    scanPhase += 0.035;
    const timeSec = timestamp * 0.001;

    const targetRNorm = currentTargetColor.r / 255;
    const targetGNorm = currentTargetColor.g / 255;
    const targetBNorm = currentTargetColor.b / 255;
    const targetL = parseFloat(inputL?.value) || 24.0;
    const baseReflectance = Math.max(3, Math.min(18, targetL * 0.22));

    // Calculate peak wavelength for display
    let peakWl = 460;
    if (targetRNorm > targetBNorm && targetRNorm > targetGNorm) peakWl = 635;
    else if (targetGNorm > targetBNorm) peakWl = 530;
    if (statPeakWavelength) statPeakWavelength.textContent = `${peakWl}nm`;

    if (currentChartMode === "spectral") {
      // Calculate 16 spectral reflectance points for Target Standard & Live Sensor Feed
      const targetPts = [];
      const livePts = [];

      for (let i = 0; i < wavelengths.length; i++) {
        const wl = wavelengths[i];
        const x = getXForWavelength(wl);

        // Theoretical spectral reflectance curve modeled from color primaries
        const bluePeak = targetBNorm * 48 * Math.exp(-Math.pow(wl - 460, 2) / (2 * Math.pow(38, 2)));
        const greenPeak = targetGNorm * 44 * Math.exp(-Math.pow(wl - 535, 2) / (2 * Math.pow(42, 2)));
        const redPeak = targetRNorm * 52 * Math.exp(-Math.pow(wl - 635, 2) / (2 * Math.pow(46, 2)));
        const targetReflectance = baseReflectance + bluePeak + greenPeak + redPeak;
        const targetY = getYForReflectance(targetReflectance);
        targetPts.push({ x, y: targetY });

        // Live In-line Feed: Real fabric passing through sensor with realistic optical micro-drift
        const sensorDrift = Math.sin(scanPhase * 0.8 + i * 0.4) * 0.75 + Math.cos(scanPhase * 1.5 + i * 0.2) * 0.35;
        const inlineOffset = 0.45; // slight in-line offset matching baseline delta-E ~0.18
        const liveReflectance = Math.max(1, targetReflectance + inlineOffset + sensorDrift);
        const liveY = getYForReflectance(liveReflectance);
        livePts.push({ x, y: liveY });
      }

      // Build SVG smooth path string for Target
      let targetPathD = `M ${targetPts[0].x} ${targetPts[0].y}`;
      for (let i = 0; i < targetPts.length - 1; i++) {
        const xc = (targetPts[i].x + targetPts[i + 1].x) / 2;
        const yc = (targetPts[i].y + targetPts[i + 1].y) / 2;
        targetPathD += ` Q ${targetPts[i].x} ${targetPts[i].y} ${xc} ${yc}`;
      }
      targetPathD += ` L ${targetPts[targetPts.length - 1].x} ${targetPts[targetPts.length - 1].y}`;
      if (targetCurvePath) targetCurvePath.setAttribute("d", targetPathD);

      // Build SVG smooth path string for Live Feed
      let livePathD = `M ${livePts[0].x} ${livePts[0].y}`;
      for (let i = 0; i < livePts.length - 1; i++) {
        const xc = (livePts[i].x + livePts[i + 1].x) / 2;
        const yc = (livePts[i].y + livePts[i + 1].y) / 2;
        livePathD += ` Q ${livePts[i].x} ${livePts[i].y} ${xc} ${yc}`;
      }
      livePathD += ` L ${livePts[livePts.length - 1].x} ${livePts[livePts.length - 1].y}`;
      if (liveFeedCurvePath) liveFeedCurvePath.setAttribute("d", livePathD);

      // Build Delta Polygon Area between Target & Live Feed
      let deltaAreaD = `M ${targetPts[0].x} ${targetPts[0].y}`;
      for (let i = 1; i < targetPts.length; i++) {
        deltaAreaD += ` L ${targetPts[i].x} ${targetPts[i].y}`;
      }
      for (let i = livePts.length - 1; i >= 0; i--) {
        deltaAreaD += ` L ${livePts[i].x} ${livePts[i].y}`;
      }
      deltaAreaD += " Z";
      if (deltaAreaPath) deltaAreaPath.setAttribute("d", deltaAreaD);

      // Interactive Hover or Auto-Scan Reticle
      if (isCompHovering) {
        const hoverXRatio = Math.max(0, Math.min(1, (compHoverSvgX - chartXStart) / chartWidth));
        const wl = Math.round(400 + hoverXRatio * 300);

        const bluePeak = targetBNorm * 48 * Math.exp(-Math.pow(wl - 460, 2) / (2 * Math.pow(38, 2)));
        const greenPeak = targetGNorm * 44 * Math.exp(-Math.pow(wl - 535, 2) / (2 * Math.pow(42, 2)));
        const redPeak = targetRNorm * 52 * Math.exp(-Math.pow(wl - 635, 2) / (2 * Math.pow(46, 2)));
        const targetReflectance = baseReflectance + bluePeak + greenPeak + redPeak;
        const targetY = getYForReflectance(targetReflectance);

        const sensorDrift = Math.sin(scanPhase * 0.8 + ((wl - 400) / 20) * 0.4) * 0.75 + Math.cos(scanPhase * 1.5 + ((wl - 400) / 20) * 0.2) * 0.35;
        const liveReflectance = Math.max(1, targetReflectance + 0.45 + sensorDrift);
        const liveY = getYForReflectance(liveReflectance);

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          liveScanDot.setAttribute("cy", liveY.toFixed(1));
        }
        if (targetHoverDot) {
          targetHoverDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          targetHoverDot.setAttribute("cy", targetY.toFixed(1));
          targetHoverDot.style.opacity = "1";
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }

        const diff = liveReflectance - targetReflectance;
        const diffSign = diff >= 0 ? "+" : "";
        const isPass = Math.abs(diff) < 1.5;
        if (compTipHeader) compTipHeader.textContent = `λ ${wl}nm (${getWavelengthColorName(wl)})`;
        if (compTipTarget) compTipTarget.textContent = `${targetReflectance.toFixed(1)}%`;
        if (compTipLive) compTipLive.textContent = `${liveReflectance.toFixed(1)}%`;
        if (compTipDiff) {
          compTipDiff.textContent = `${diffSign}${diff.toFixed(2)}% (${isPass ? "PASS" : "WARN"})`;
          compTipDiff.style.color = isPass ? "#10B981" : "#F59E0B";
        }

        if (compViewport && compChartTooltip) {
          const vRect = compViewport.getBoundingClientRect();
          const screenX = (compHoverSvgX / 540) * vRect.width;
          const screenY = (Math.min(targetY, liveY) / 135) * vRect.height;
          compChartTooltip.style.display = "block";
          compChartTooltip.style.left = `${screenX}px`;
          compChartTooltip.style.top = `${Math.max(16, screenY - 6)}px`;
        }
      } else {
        if (targetHoverDot) targetHoverDot.style.opacity = "0";
        if (compChartTooltip) compChartTooltip.style.display = "none";

        // Move the Optical Scanning Reticle smoothly across the spectrum
        const scanXRatio = (Math.sin(scanPhase * 0.4) + 1) / 2; // 0 to 1
        const scanX = chartXStart + scanXRatio * chartWidth;
        const scanIndex = Math.min(livePts.length - 1, Math.floor(scanXRatio * (livePts.length - 1)));
        const scanY = livePts[scanIndex].y;

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", scanX.toFixed(1));
          liveScanDot.setAttribute("cy", scanY.toFixed(1));
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", scanX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", scanX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }
      }

      // Update Live Telemetry Stats
      if (statSpectralFit) {
        const fit = Math.min(99.6, Math.max(97.8, 99.2 + Math.sin(scanPhase * 0.5) * 0.25));
        statSpectralFit.textContent = `${fit.toFixed(1)}%`;
      }
    } else {
      // --- Time-Series Delta-E Stream Mode ---
      if (timestamp - lastStreamTick > 60) {
        lastStreamTick = timestamp;
        const currentDelta = parseFloat(liveDeltaEVal?.textContent) || 0.18;
        const liveSample = Math.max(0.05, currentDelta + (Math.random() - 0.5) * 0.04);
        streamHistory.push(liveSample);
        if (streamHistory.length > streamCapacity) streamHistory.shift();
      }

      // Draw baseline zero setpoint
      const zeroY = 52;
      const upperTolY = 28; // +0.50
      const lowerTolY = 76; // -0.50

      let targetD = `M ${chartXStart} ${zeroY} L ${chartXEnd} ${zeroY}`;
      if (targetCurvePath) targetCurvePath.setAttribute("d", targetD);

      // Draw tolerance corridor
      let corridorD = `M ${chartXStart} ${upperTolY} L ${chartXEnd} ${upperTolY} L ${chartXEnd} ${lowerTolY} L ${chartXStart} ${lowerTolY} Z`;
      if (deltaAreaPath) deltaAreaPath.setAttribute("d", corridorD);

      // Draw rolling time stream
      const dx = chartWidth / (streamCapacity - 1);
      let streamD = "";
      for (let i = 0; i < streamHistory.length; i++) {
        const x = chartXStart + i * dx;
        const val = streamHistory[i];
        // 0.00 at 52, 0.50 at 28
        const y = zeroY - (val / 0.5) * (zeroY - upperTolY);
        streamD += (i === 0 ? "M " : " L ") + `${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      if (liveFeedCurvePath) liveFeedCurvePath.setAttribute("d", streamD);

      if (isCompHovering) {
        const hoverXRatio = Math.max(0, Math.min(1, (compHoverSvgX - chartXStart) / chartWidth));
        const streamIdx = Math.max(0, Math.min(streamHistory.length - 1, Math.floor(hoverXRatio * (streamHistory.length - 1))));
        const val = streamHistory[streamIdx];
        const hoverY = zeroY - (val / 0.5) * (zeroY - upperTolY);

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          liveScanDot.setAttribute("cy", hoverY.toFixed(1));
        }
        if (targetHoverDot) {
          targetHoverDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          targetHoverDot.setAttribute("cy", zeroY);
          targetHoverDot.style.opacity = "1";
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }

        const secAgo = ((1 - hoverXRatio) * 40).toFixed(0);
        if (compTipHeader) compTipHeader.textContent = `T - ${secAgo}s (In-Line Stream)`;
        if (compTipTarget) compTipTarget.textContent = `ΔE 0.00`;
        if (compTipLive) compTipLive.textContent = `ΔE ${val.toFixed(2)}`;
        if (compTipDiff) {
          compTipDiff.textContent = `Tol < 0.50 (PASS)`;
          compTipDiff.style.color = val <= 0.50 ? "#10B981" : "#EF4444";
        }

        if (compViewport && compChartTooltip) {
          const vRect = compViewport.getBoundingClientRect();
          const screenX = (compHoverSvgX / 540) * vRect.width;
          const screenY = (hoverY / 135) * vRect.height;
          compChartTooltip.style.display = "block";
          compChartTooltip.style.left = `${screenX}px`;
          compChartTooltip.style.top = `${Math.max(16, screenY - 6)}px`;
        }
      } else {
        if (targetHoverDot) targetHoverDot.style.opacity = "0";
        if (compChartTooltip) compChartTooltip.style.display = "none";

        // Reticle at leading edge
        const leadX = chartXEnd;
        const leadY = zeroY - (streamHistory[streamHistory.length - 1] / 0.5) * (zeroY - upperTolY);
        if (liveScanDot) {
          liveScanDot.setAttribute("cx", leadX.toFixed(1));
          liveScanDot.setAttribute("cy", leadY.toFixed(1));
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", leadX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", leadX.toFixed(1));
        }
      }
    }

    animationFrameId = requestAnimationFrame(renderComparisonLoop);
  }

  // Bind Comparison Chart Mouse Hover
  const compViewport = document.getElementById("comparisonGraphViewport");
  const compSvg = document.getElementById("comparisonChartSvg");
  const compChartTooltip = document.getElementById("compChartTooltip");
  const targetHoverDot = document.getElementById("targetHoverDot");
  const compTipHeader = document.getElementById("compTipHeader");
  const compTipTarget = document.getElementById("compTipTarget");
  const compTipLive = document.getElementById("compTipLive");
  const compTipDiff = document.getElementById("compTipDiff");
  let isCompHovering = false;
  let compHoverSvgX = 280;

  if (compViewport && compSvg) {
    compViewport.addEventListener("mousemove", (e) => {
      const rect = compSvg.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      compHoverSvgX = Math.max(chartXStart, Math.min(chartXEnd, (mouseX / rect.width) * 540));
      isCompHovering = true;
    });

    compViewport.addEventListener("mouseleave", () => {
      isCompHovering = false;
      if (compChartTooltip) compChartTooltip.style.display = "none";
      if (targetHoverDot) targetHoverDot.style.opacity = "0";
    });
  }

  // Bind Sparkline Hover Helpers for 3 Top Metric Cards

  setupSparklineHover(
    "sparkWrapDeltaE",
    "sparkPathDeltaE",
    "sparkCrosshairDeltaE",
    "sparkHoverDotDeltaE",
    "sparkTipDeltaE",
    "sparkValDeltaE",
    (t, y) => `ΔE ${(0.24 - t * 0.06 + Math.sin(t * 7) * 0.02).toFixed(2)}`
  );

  setupSparklineHover(
    "sparkWrapCorrection",
    "sparkPathCorrection",
    "sparkCrosshairCorrection",
    "sparkHoverDotCorrection",
    "sparkTipCorrection",
    "sparkValCorrection",
    (t, y) => `${(97.2 + t * 2.0).toFixed(1)}%`
  );

  setupSparklineHover(
    "sparkWrapDosing",
    "sparkPathDosing",
    "sparkCrosshairDosing",
    "sparkHoverDotDosing",
    "sparkTipDosing",
    "sparkValDosing",
    (t, y) => `${(2.05 + (70 - y) / 70 * 0.45).toFixed(2)} mL/kg`
  );

  // Bind Mini Reflectance Spectrum Bar Hover
  const spectrumBar = document.getElementById("spectrumBarGradient");
  const spectrumIndicator = document.getElementById("spectrumIndicator");
  const spectrumTooltip = document.getElementById("spectrumTooltip");

  if (spectrumBar && spectrumIndicator) {
    spectrumBar.addEventListener("mousemove", (e) => {
      const rect = spectrumBar.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const t = mouseX / rect.width;
      const wl = Math.round(400 + t * 300);
      spectrumIndicator.style.left = `${(t * 100).toFixed(1)}%`;
      if (spectrumTooltip) {
        spectrumTooltip.textContent = `λ ${wl}nm (${getWavelengthColorName(wl)})`;
        spectrumTooltip.style.display = "block";
        spectrumTooltip.style.left = `${(t * 100).toFixed(1)}%`;
      }
    });

    spectrumBar.addEventListener("mouseleave", () => {
      spectrumIndicator.style.left = "28%";
      if (spectrumTooltip) spectrumTooltip.style.display = "none";
    });
  }

  // Initial calculation and start loop
  updateCalculations();
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(renderComparisonLoop);
  }
}

// ==========================================================================
// 9B. MODULAR CONTROLLER FOR PROCESS INSPECTION VIEWS (PRINTING, BLEACHING, MERCERIZING, STENTER)
// ==========================================================================
function createInspectionDashboardController(cfg) {
  const p = cfg.prefix;
  const inputL = document.getElementById(`${p}InputTargetL`);
  const inputA = document.getElementById(`${p}InputTargetA`);
  const inputB = document.getElementById(`${p}InputTargetB`);
  const inputTol = document.getElementById(`${p}InputToleranceLimit`);

  const targetSwatch = document.getElementById(`${p}TargetSwatchPreview`);
  const targetColorName = document.getElementById(`${p}TargetColorName`);
  const targetHexDisplay = document.getElementById(`${p}TargetHexDisplay`);
  const targetCielabDisplay = document.getElementById(`${p}TargetCielabDisplay`);
  const targetSrgbPicker = document.getElementById(`${p}TargetSrgbPicker`);

  const liveDeltaEVal = document.getElementById(`${p}LiveDeltaEVal`);
  const deltaMatchStatus = document.getElementById(`${p}DeltaMatchStatus`);
  const shadeChips = document.querySelectorAll(`.${p}-shade-dot`);

  const btnRecalibrate = document.getElementById(`${p}BtnRecalibrateSensor`);
  const btnApplyCorrection = document.getElementById(`${p}BtnApplyColorCorrection`);

  const btnTabSpectral = document.getElementById(`${p}BtnTabSpectral`);
  const btnTabDeltaStream = document.getElementById(`${p}BtnTabDeltaStream`);
  const targetCurvePath = document.getElementById(`${p}TargetCurvePath`);
  const liveFeedCurvePath = document.getElementById(`${p}LiveFeedCurvePath`);
  const deltaAreaPath = document.getElementById(`${p}DeltaAreaPath`);
  const liveScanDot = document.getElementById(`${p}LiveScanDot`);
  const liveScanVerticalLine = document.getElementById(`${p}LiveScanVerticalLine`);
  const wavelengthLabelsGroup = document.getElementById(`${p}WavelengthAxisLabels`);

  const statPeakWavelength = document.getElementById(`${p}StatPeakWavelength`);
  const statSpectralFit = document.getElementById(`${p}StatSpectralFit`);
  const statLiveDeltaE = document.getElementById(`${p}StatLiveDeltaE`);

  const measured = cfg.measured;
  let currentChartMode = "spectral";
  let currentTargetColor = { ...cfg.defaultTarget };
  let streamHistory = [];
  const streamCapacity = 40;
  for (let i = 0; i < streamCapacity; i++) {
    streamHistory.push(0.16);
  }

  function hexToRgb(hex) {
    hex = (hex || cfg.defaultHex).replace("#", "").trim();
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgbToLab(r, g, b) {
    let rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const linearize = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    let rLin = linearize(rNorm), gLin = linearize(gNorm), bLin = linearize(bNorm);
    let X = (rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375) * 100;
    let Y = (rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750) * 100;
    let Z = (rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041) * 100;
    const Xn = 95.047, Yn = 100.000, Zn = 108.883;
    const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    let L = 116 * f(Y / Yn) - 16;
    let a = 500 * (f(X / Xn) - f(Y / Yn));
    let bVal = 200 * (f(Y / Yn) - f(Z / Zn));
    return { L, a, b: bVal };
  }

  function labToHex(L, a, bVal) {
    let y = (L + 16) / 116;
    let x = a / 500 + y;
    let z = y - bVal / 200;
    const fn = (t) => (t * t * t > 0.008856 ? t * t * t : (t - 16 / 116) / 7.787);
    let X = (95.047 * fn(x)) / 100;
    let Y = (100.0 * fn(y)) / 100;
    let Z = (108.883 * fn(z)) / 100;
    let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    let bl = X * 0.0557 + Y * -0.204 + Z * 1.057;
    const gamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
    const clampByte = (c) => Math.min(255, Math.max(0, Math.round(gamma(c) * 255)));
    const toHex2 = (n) => n.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex2(clampByte(r))}${toHex2(clampByte(g))}${toHex2(clampByte(bl))}`;
  }

  function applyColorFromHex(hex, explicitName = null) {
    hex = hex.toUpperCase();
    const rgb = hexToRgb(hex);
    currentTargetColor = { r: rgb.r, g: rgb.g, b: rgb.b, hex };
    const lab = rgbToLab(rgb.r, rgb.g, rgb.b);

    if (targetSrgbPicker) targetSrgbPicker.value = hex;
    if (targetSwatch) targetSwatch.style.backgroundColor = hex;
    if (targetColorName) {
      targetColorName.textContent = explicitName || cfg.shadeMap[hex] || `Standard Shade ${hex}`;
    }
    if (!cfg.visionMode) {
      if (inputL) inputL.value = lab.L.toFixed(2);
      if (inputA) inputA.value = lab.a.toFixed(2);
      if (inputB) inputB.value = lab.b.toFixed(2);
      if (targetHexDisplay) targetHexDisplay.textContent = `HEX: ${hex}`;
      if (targetCielabDisplay) {
        targetCielabDisplay.textContent = `L*: ${lab.L.toFixed(2)} • a*: ${lab.a.toFixed(2)} • b*: ${lab.b.toFixed(2)}`;
      }
    } else if (cfg.formatHex && targetHexDisplay) {
      targetHexDisplay.textContent = cfg.formatHex(hex, explicitName);
    }

    updateCalculations();
  }

  function updateCalculations() {
    if (!inputL || !inputA || !inputB || !inputTol) return;
    const targetL = parseFloat(inputL.value) || cfg.defaultL;
    const targetA = parseFloat(inputA.value) || cfg.defaultA;
    const targetB = parseFloat(inputB.value) || cfg.defaultB;
    const tolerance = parseFloat(inputTol.value) || cfg.defaultTol;

    const dL = targetL - measured.L;
    const da = targetA - measured.a;
    const db = targetB - measured.b;
    const deltaE = Math.sqrt(dL * dL + da * da + db * db);

    if (liveDeltaEVal) liveDeltaEVal.textContent = deltaE.toFixed(2);

    if (!cfg.visionMode) {
      const hexColor = labToHex(targetL, targetA, targetB);
      const rgb = hexToRgb(hexColor);
      currentTargetColor = { r: rgb.r, g: rgb.g, b: rgb.b, hex: hexColor };

      if (targetSwatch) targetSwatch.style.backgroundColor = hexColor;
      if (targetHexDisplay) targetHexDisplay.textContent = `HEX: ${hexColor}`;
      if (targetSrgbPicker && targetSrgbPicker.value.toUpperCase() !== hexColor.toUpperCase()) {
        targetSrgbPicker.value = hexColor;
      }
      if (targetCielabDisplay) {
        targetCielabDisplay.textContent = `L*: ${targetL.toFixed(2)} • a*: ${targetA.toFixed(2)} • b*: ${targetB.toFixed(2)}`;
      }
    } else if (cfg.formatLab && targetCielabDisplay) {
      targetCielabDisplay.textContent = cfg.formatLab(targetL, targetA, targetB);
    }
    if (cfg.visionMode && cfg.defaultHex) {
      const rgb = hexToRgb(cfg.defaultHex);
      currentTargetColor = { r: rgb.r, g: rgb.g, b: rgb.b, hex: cfg.defaultHex };
    }

    if (deltaMatchStatus) {
      if (deltaE <= tolerance) {
        deltaMatchStatus.textContent = "✓ MATCH";
        deltaMatchStatus.style.color = "#10B981";
      } else {
        deltaMatchStatus.textContent = "⚠ OUT OF SPEC";
        deltaMatchStatus.style.color = "#EF4444";
      }
    }
    if (statLiveDeltaE) statLiveDeltaE.textContent = deltaE.toFixed(2);
  }

  if (targetSrgbPicker) {
    targetSrgbPicker.addEventListener("input", (e) => applyColorFromHex(e.target.value));
    targetSrgbPicker.addEventListener("change", (e) => applyColorFromHex(e.target.value));
  }

  shadeChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      sfx.playClick();
      const hex = chip.getAttribute("data-hex");
      const name = chip.getAttribute("data-name");
      if (hex) applyColorFromHex(hex, name);
    });
  });

  [inputL, inputA, inputB, inputTol].forEach((input) => {
    if (input) {
      input.addEventListener("input", updateCalculations);
      input.addEventListener("change", updateCalculations);
    }
  });

  if (btnRecalibrate) {
    btnRecalibrate.addEventListener("click", () => {
      sfx.playClick();
      const originalHtml = btnRecalibrate.innerHTML;
      btnRecalibrate.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
          <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        </svg>
        <span>${cfg.calibratingText || "Zeroing Reference..."}</span>
      `;
      btnRecalibrate.style.pointerEvents = "none";
      setTimeout(() => {
        btnRecalibrate.innerHTML = originalHtml;
        btnRecalibrate.style.pointerEvents = "auto";
      }, 1000);
    });
  }

  if (btnApplyCorrection) {
    btnApplyCorrection.addEventListener("click", () => {
      sfx.playClick();
      const originalText = btnApplyCorrection.innerHTML;
      btnApplyCorrection.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${cfg.correctedText || "Correction Applied!"}</span>
      `;
      btnApplyCorrection.style.background = "linear-gradient(135deg, #059669, #10B981)";
      setTimeout(() => {
        btnApplyCorrection.innerHTML = originalText;
        btnApplyCorrection.style.background = "";
      }, 1500);
    });
  }

  if (btnTabSpectral && btnTabDeltaStream) {
    btnTabSpectral.addEventListener("click", () => {
      sfx.playClick();
      currentChartMode = "spectral";
      btnTabSpectral.classList.add("active");
      btnTabDeltaStream.classList.remove("active");
      if (wavelengthLabelsGroup) wavelengthLabelsGroup.style.display = "block";
    });
    btnTabDeltaStream.addEventListener("click", () => {
      sfx.playClick();
      currentChartMode = "stream";
      btnTabDeltaStream.classList.add("active");
      btnTabSpectral.classList.remove("active");
      if (wavelengthLabelsGroup) wavelengthLabelsGroup.style.display = "none";
    });
  }

  // Reflectance Spectrum bar
  const spectrumBar = document.getElementById(`${p}SpectrumBarGradient`);
  const spectrumIndicator = document.getElementById(`${p}SpectrumIndicator`);
  const spectrumTooltip = document.getElementById(`${p}SpectrumTooltip`);
  if (spectrumBar && spectrumIndicator) {
    spectrumBar.addEventListener("mousemove", (e) => {
      const rect = spectrumBar.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const t = mouseX / rect.width;
      const wl = Math.round(400 + t * 300);
      const scanM = Math.round(t * 120);
      spectrumIndicator.style.left = `${(t * 100).toFixed(1)}%`;
      if (spectrumTooltip) {
        spectrumTooltip.textContent = cfg.visionMode ? `Scan ${scanM} m` : `λ ${wl}nm`;
        spectrumTooltip.style.display = "block";
        spectrumTooltip.style.left = `${(t * 100).toFixed(1)}%`;
      }
    });
    spectrumBar.addEventListener("mouseleave", () => {
      spectrumIndicator.style.left = "45%";
      if (spectrumTooltip) spectrumTooltip.style.display = "none";
    });
  }

  // Optional machine dropdown + chip sync (Fabric Inspection dashboards)
  if (Array.isArray(cfg.machines) && cfg.machines.length) {
    const machineSelect = document.getElementById(`${p}MachineSelect`);
    const machineChips = document.querySelectorAll(`.${p}-machine-chip`);
    const hudHead = document.getElementById(`${p}HudHead`);
    const hudLot = document.getElementById(`${p}HudLot`);
    const chartMachineTitle = document.getElementById(`${p}ChartMachineTitle`);

    function applyMachine(id, playSound) {
      const machine = cfg.machines.find((m) => m.id === id) || cfg.machines[0];
      if (!machine) return;
      if (playSound) sfx.playClick();
      if (machineSelect && machineSelect.value !== machine.id) {
        machineSelect.value = machine.id;
      }
      machineChips.forEach((chip) => {
        chip.classList.toggle("active", chip.getAttribute("data-machine-id") === machine.id);
      });
      if (hudHead) hudHead.textContent = machine.model;
      if (hudLot) hudLot.textContent = machine.tag;
      if (chartMachineTitle) chartMachineTitle.textContent = machine.name;
    }

    if (machineSelect) {
      machineSelect.addEventListener("change", (e) => applyMachine(e.target.value, true));
    }
    machineChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        applyMachine(chip.getAttribute("data-machine-id"), true);
      });
    });
    applyMachine(cfg.machines[0].id, false);
  }

  // Comparison Render Loop
  const wavelengths = [400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680, 700];
  const chartXStart = 45, chartXEnd = 525, chartWidth = 480, chartBaselineY = 86, chartTopY = 16;
  const getYForReflectance = (pct) => chartBaselineY - (Math.max(0, Math.min(95, pct)) / 80) * (chartBaselineY - chartTopY);
  const getXForWavelength = (wl) => chartXStart + ((wl - 400) / 300) * chartWidth;

  const compViewport = document.getElementById(`${p}ComparisonGraphViewport`);
  const compSvg = document.getElementById(`${p}ComparisonChartSvg`);
  const compChartTooltip = document.getElementById(`${p}CompChartTooltip`);
  const targetHoverDot = document.getElementById(`${p}TargetHoverDot`);
  const compTipHeader = document.getElementById(`${p}CompTipHeader`);
  const compTipTarget = document.getElementById(`${p}CompTipTarget`);
  const compTipLive = document.getElementById(`${p}CompTipLive`);
  const compTipDiff = document.getElementById(`${p}CompTipDiff`);

  let isCompHovering = false;
  let compHoverSvgX = 280;

  if (compViewport && compSvg) {
    compViewport.addEventListener("mousemove", (e) => {
      const rect = compSvg.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      compHoverSvgX = Math.max(chartXStart, Math.min(chartXEnd, (mouseX / rect.width) * 540));
      isCompHovering = true;
    });

    compViewport.addEventListener("mouseleave", () => {
      isCompHovering = false;
      if (compChartTooltip) compChartTooltip.style.display = "none";
      if (targetHoverDot) targetHoverDot.style.opacity = "0";
    });
  }

  // Bind Sparkline Hover Helpers for 3 Top Metric Cards
  if (cfg.sparkFormatters && cfg.sparkFormatters.length === 3) {
    setupSparklineHover(
      `${p}SparkWrapDeltaE`,
      `${p}SparkPathDeltaE`,
      `${p}SparkCrosshairDeltaE`,
      `${p}SparkHoverDotDeltaE`,
      `${p}SparkTipDeltaE`,
      `${p}SparkValDeltaE`,
      cfg.sparkFormatters[0]
    );
    setupSparklineHover(
      `${p}SparkWrapCorrection`,
      `${p}SparkPathCorrection`,
      `${p}SparkCrosshairCorrection`,
      `${p}SparkHoverDotCorrection`,
      `${p}SparkTipCorrection`,
      `${p}SparkValCorrection`,
      cfg.sparkFormatters[1]
    );
    setupSparklineHover(
      `${p}SparkWrapDosing`,
      `${p}SparkPathDosing`,
      `${p}SparkCrosshairDosing`,
      `${p}SparkHoverDotDosing`,
      `${p}SparkTipDosing`,
      `${p}SparkValDosing`,
      cfg.sparkFormatters[2]
    );
  }

  let scanPhase = 0;
  let lastStreamTick = 0;

  function renderLoop(timestamp) {
    const view = document.getElementById(cfg.viewId);
    if (!view || view.style.display === "none") {
      requestAnimationFrame(renderLoop);
      return;
    }

    if (Array.isArray(cfg.machines) && liveDeltaEVal) {
      const hudStrong = view.querySelector(".hud-delta-tag strong");
      if (hudStrong) hudStrong.textContent = liveDeltaEVal.textContent;
    }

    scanPhase += 0.035;
    const targetRNorm = currentTargetColor.r / 255;
    const targetGNorm = currentTargetColor.g / 255;
    const targetBNorm = currentTargetColor.b / 255;
    const baseReflectance = cfg.baseReflectance || 12;

    if (statPeakWavelength) {
      if (cfg.visionMode) {
        const scanM = Math.round(40 + ((Math.sin(scanPhase * 0.4) + 1) / 2) * 80);
        statPeakWavelength.textContent = `${scanM} m`;
      } else {
        statPeakWavelength.textContent = `${cfg.peakWl}nm`;
      }
    }

    if (currentChartMode === "spectral") {
      const targetPts = [];
      const livePts = [];

      for (let i = 0; i < wavelengths.length; i++) {
        const wl = wavelengths[i];
        const x = getXForWavelength(wl);
        const peakDist = Math.abs(wl - cfg.peakWl);
        const primaryPeak = 38 * Math.exp(-Math.pow(peakDist, 2) / (2 * Math.pow(42, 2)));
        const targetReflectance = baseReflectance + primaryPeak * (targetRNorm * 0.4 + targetGNorm * 0.3 + targetBNorm * 0.3);
        const targetY = getYForReflectance(targetReflectance);
        targetPts.push({ x, y: targetY });

        const sensorDrift = Math.sin(scanPhase * 0.8 + i * 0.4) * 0.7 + Math.cos(scanPhase * 1.5 + i * 0.2) * 0.3;
        const liveReflectance = Math.max(1, targetReflectance + 0.35 + sensorDrift);
        const liveY = getYForReflectance(liveReflectance);
        livePts.push({ x, y: liveY });
      }

      let targetPathD = `M ${targetPts[0].x} ${targetPts[0].y}`;
      for (let i = 0; i < targetPts.length - 1; i++) {
        const xc = (targetPts[i].x + targetPts[i + 1].x) / 2;
        const yc = (targetPts[i].y + targetPts[i + 1].y) / 2;
        targetPathD += ` Q ${targetPts[i].x} ${targetPts[i].y} ${xc} ${yc}`;
      }
      targetPathD += ` L ${targetPts[targetPts.length - 1].x} ${targetPts[targetPts.length - 1].y}`;
      if (targetCurvePath) targetCurvePath.setAttribute("d", targetPathD);

      let livePathD = `M ${livePts[0].x} ${livePts[0].y}`;
      for (let i = 0; i < livePts.length - 1; i++) {
        const xc = (livePts[i].x + livePts[i + 1].x) / 2;
        const yc = (livePts[i].y + livePts[i + 1].y) / 2;
        livePathD += ` Q ${livePts[i].x} ${livePts[i].y} ${xc} ${yc}`;
      }
      livePathD += ` L ${livePts[livePts.length - 1].x} ${livePts[livePts.length - 1].y}`;
      if (liveFeedCurvePath) liveFeedCurvePath.setAttribute("d", livePathD);

      let deltaAreaD = `M ${targetPts[0].x} ${targetPts[0].y}`;
      for (let i = 1; i < targetPts.length; i++) deltaAreaD += ` L ${targetPts[i].x} ${targetPts[i].y}`;
      for (let i = livePts.length - 1; i >= 0; i--) deltaAreaD += ` L ${livePts[i].x} ${livePts[i].y}`;
      deltaAreaD += " Z";
      if (deltaAreaPath) deltaAreaPath.setAttribute("d", deltaAreaD);

      if (isCompHovering) {
        const hoverXRatio = Math.max(0, Math.min(1, (compHoverSvgX - chartXStart) / chartWidth));
        const wl = Math.round(400 + hoverXRatio * 300);

        const peakDist = Math.abs(wl - cfg.peakWl);
        const primaryPeak = 38 * Math.exp(-Math.pow(peakDist, 2) / (2 * Math.pow(42, 2)));
        const targetReflectance = baseReflectance + primaryPeak * (targetRNorm * 0.4 + targetGNorm * 0.3 + targetBNorm * 0.3);
        const targetY = getYForReflectance(targetReflectance);

        const sensorDrift = Math.sin(scanPhase * 0.8 + ((wl - 400) / 20) * 0.4) * 0.7 + Math.cos(scanPhase * 1.5 + ((wl - 400) / 20) * 0.2) * 0.3;
        const liveReflectance = Math.max(1, targetReflectance + 0.35 + sensorDrift);
        const liveY = getYForReflectance(liveReflectance);

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          liveScanDot.setAttribute("cy", liveY.toFixed(1));
        }
        if (targetHoverDot) {
          targetHoverDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          targetHoverDot.setAttribute("cy", targetY.toFixed(1));
          targetHoverDot.style.opacity = "1";
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }

        const diff = liveReflectance - targetReflectance;
        const diffSign = diff >= 0 ? "+" : "";
        const isPass = Math.abs(diff) < 1.5;
        if (compTipHeader) {
          if (cfg.visionMode) {
            const posM = Math.round(hoverXRatio * 120);
            compTipHeader.textContent = `Scan ${posM} m`;
          } else {
            compTipHeader.textContent = `λ ${wl}nm (${getWavelengthColorName(wl)})`;
          }
        }
        if (compTipTarget) compTipTarget.textContent = cfg.visionMode ? `${targetReflectance.toFixed(1)}` : `${targetReflectance.toFixed(1)}%`;
        if (compTipLive) compTipLive.textContent = cfg.visionMode ? `${liveReflectance.toFixed(1)}` : `${liveReflectance.toFixed(1)}%`;
        if (compTipDiff) {
          compTipDiff.textContent = `${diffSign}${diff.toFixed(2)}% (${isPass ? "PASS" : "WARN"})`;
          compTipDiff.style.color = isPass ? "#10B981" : "#F59E0B";
        }

        if (compViewport && compChartTooltip) {
          const vRect = compViewport.getBoundingClientRect();
          const screenX = (compHoverSvgX / 540) * vRect.width;
          const screenY = (Math.min(targetY, liveY) / 135) * vRect.height;
          compChartTooltip.style.display = "block";
          compChartTooltip.style.left = `${screenX}px`;
          compChartTooltip.style.top = `${Math.max(16, screenY - 6)}px`;
        }
      } else {
        if (targetHoverDot) targetHoverDot.style.opacity = "0";
        if (compChartTooltip) compChartTooltip.style.display = "none";

        const scanXRatio = (Math.sin(scanPhase * 0.4) + 1) / 2;
        const scanX = chartXStart + scanXRatio * chartWidth;
        const scanIndex = Math.min(livePts.length - 1, Math.floor(scanXRatio * (livePts.length - 1)));
        const scanY = livePts[scanIndex].y;

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", scanX.toFixed(1));
          liveScanDot.setAttribute("cy", scanY.toFixed(1));
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", scanX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", scanX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }
      }

      if (statSpectralFit) {
        const fit = Math.min(99.6, Math.max(97.8, 99.0 + Math.sin(scanPhase * 0.5) * 0.25));
        statSpectralFit.textContent = `${fit.toFixed(1)}%`;
      }
    } else {
      if (timestamp - lastStreamTick > 60) {
        lastStreamTick = timestamp;
        const currentDelta = parseFloat(liveDeltaEVal?.textContent) || 0.16;
        const liveSample = Math.max(0.05, currentDelta + (Math.random() - 0.5) * 0.04);
        streamHistory.push(liveSample);
        if (streamHistory.length > streamCapacity) streamHistory.shift();
      }

      const zeroY = 52, upperTolY = 28, lowerTolY = 76;
      if (targetCurvePath) targetCurvePath.setAttribute("d", `M ${chartXStart} ${zeroY} L ${chartXEnd} ${zeroY}`);
      if (deltaAreaPath) deltaAreaPath.setAttribute("d", `M ${chartXStart} ${upperTolY} L ${chartXEnd} ${upperTolY} L ${chartXEnd} ${lowerTolY} L ${chartXStart} ${lowerTolY} Z`);

      const dx = chartWidth / (streamCapacity - 1);
      let streamD = "";
      for (let i = 0; i < streamHistory.length; i++) {
        const x = chartXStart + i * dx;
        const y = zeroY - (streamHistory[i] / 0.5) * (zeroY - upperTolY);
        streamD += (i === 0 ? "M " : " L ") + `${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      if (liveFeedCurvePath) liveFeedCurvePath.setAttribute("d", streamD);

      if (isCompHovering) {
        const hoverXRatio = Math.max(0, Math.min(1, (compHoverSvgX - chartXStart) / chartWidth));
        const streamIdx = Math.max(0, Math.min(streamHistory.length - 1, Math.floor(hoverXRatio * (streamHistory.length - 1))));
        const val = streamHistory[streamIdx];
        const hoverY = zeroY - (val / 0.5) * (zeroY - upperTolY);

        if (liveScanDot) {
          liveScanDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          liveScanDot.setAttribute("cy", hoverY.toFixed(1));
        }
        if (targetHoverDot) {
          targetHoverDot.setAttribute("cx", compHoverSvgX.toFixed(1));
          targetHoverDot.setAttribute("cy", zeroY);
          targetHoverDot.style.opacity = "1";
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", compHoverSvgX.toFixed(1));
          liveScanVerticalLine.setAttribute("y1", "12");
          liveScanVerticalLine.setAttribute("y2", "94");
        }

        const secAgo = ((1 - hoverXRatio) * 40).toFixed(0);
        const unit = cfg.visionMode ? (cfg.deltaUnit || "idx") : "ΔE";
        if (compTipHeader) compTipHeader.textContent = `T - ${secAgo}s (In-Line Stream)`;
        if (compTipTarget) compTipTarget.textContent = `${unit} 0.00`;
        if (compTipLive) compTipLive.textContent = `${unit} ${val.toFixed(2)}`;
        if (compTipDiff) {
          const tolLimit = parseFloat(inputTol?.value) || cfg.defaultTol || 0.50;
          compTipDiff.textContent = `Tol < ${tolLimit.toFixed(2)} (PASS)`;
          compTipDiff.style.color = val <= tolLimit ? "#10B981" : "#EF4444";
        }

        if (compViewport && compChartTooltip) {
          const vRect = compViewport.getBoundingClientRect();
          const screenX = (compHoverSvgX / 540) * vRect.width;
          const screenY = (hoverY / 135) * vRect.height;
          compChartTooltip.style.display = "block";
          compChartTooltip.style.left = `${screenX}px`;
          compChartTooltip.style.top = `${Math.max(16, screenY - 6)}px`;
        }
      } else {
        if (targetHoverDot) targetHoverDot.style.opacity = "0";
        if (compChartTooltip) compChartTooltip.style.display = "none";

        const leadX = chartXEnd;
        const leadY = zeroY - (streamHistory[streamHistory.length - 1] / 0.5) * (zeroY - upperTolY);
        if (liveScanDot) {
          liveScanDot.setAttribute("cx", leadX.toFixed(1));
          liveScanDot.setAttribute("cy", leadY.toFixed(1));
        }
        if (liveScanVerticalLine) {
          liveScanVerticalLine.setAttribute("x1", leadX.toFixed(1));
          liveScanVerticalLine.setAttribute("x2", leadX.toFixed(1));
        }
      }
    }

    requestAnimationFrame(renderLoop);
  }

  updateCalculations();
  requestAnimationFrame(renderLoop);
}

// ==========================================================================
// 10. INITIALIZATION
// ==========================================================================
function initApp() {
  initCard3DTilt();
  setupDashboardInteractions();
  initCustomCursor();
  initScadaClock();
  initScadaRealTimeEngine();
  setupScadaInteractivity();
  setupAiAnomalyInteractivity();
  setupAiSidebarTabs();
  setupDyeingColorInspectionInteractions();

  // Setup Printing, Bleaching, Mercerizing, and Finish Dashboards
  createInspectionDashboardController({
    viewId: "printingColorInspectionView",
    prefix: "prn",
    defaultL: 48.20,
    defaultA: 62.40,
    defaultB: -8.50,
    defaultTol: 0.50,
    defaultHex: "#C026D3",
    defaultName: "Reactive Magenta #704",
    measured: { L: 48.32, a: 62.25, b: -8.36, hex: "#BD25CF" },
    shadeMap: {
      "#C026D3": "Reactive Magenta #704",
      "#0891B2": "Cyan Blue #610",
      "#EAB308": "Golden Yellow #302",
      "#18181B": "Jet Black #900",
      "#7C3AED": "Deep Violet #931"
    },
    peakWl: 540,
    baseReflectance: 12,
    calibratingText: "Zeroing Multi-Spectral Sensor...",
    correctedText: "Paste Dosing Correction Applied!",
    sparkFormatters: [
      (t, y) => `ΔE ${(0.22 - t * 0.04 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${(98.8 + t * 0.9).toFixed(1)}%`,
      (t, y) => `${(18.2 + (70 - y) / 70 * 0.6).toFixed(1)} dPa·s`
    ]
  });

  createInspectionDashboardController({
    viewId: "bleachingColorInspectionView",
    prefix: "blc",
    defaultL: 96.50,
    defaultA: -0.28,
    defaultB: 1.10,
    defaultTol: 0.40,
    defaultHex: "#FAFAFA",
    defaultName: "Optical White Standard #010",
    measured: { L: 96.42, a: -0.31, b: 1.18, hex: "#F8F9FA" },
    shadeMap: {
      "#FAFAFA": "Optic White #010",
      "#F5F5F0": "Natural Bleach #020",
      "#F1F5F9": "Pearl White #030",
      "#FDFBF7": "Soft Ivory #040",
      "#FFFFFF": "Ultra White #050"
    },
    peakWl: 440,
    baseReflectance: 35,
    calibratingText: "Zeroing Whiteness Reference...",
    correctedText: "Peroxide Dosing Correction Applied!",
    sparkFormatters: [
      (t, y) => `${(86.2 + t * 2.4).toFixed(1)} Wb`,
      (t, y) => `${(98.2 + t * 1.0).toFixed(1)}%`,
      (t, y) => `${(13.8 + (70 - y) / 70 * 0.8).toFixed(1)} g/kg`
    ]
  });

  createInspectionDashboardController({
    viewId: "mercerizingColorInspectionView",
    prefix: "mrc",
    defaultL: 72.90,
    defaultA: -0.60,
    defaultB: 4.15,
    defaultTol: 0.50,
    defaultHex: "#D6D0C4",
    defaultName: "Mercerized Pearl Sateen #330",
    measured: { L: 72.82, a: -0.64, b: 4.22, hex: "#D4CEC2" },
    shadeMap: {
      "#D6D0C4": "Pearl Sateen #330",
      "#DFD9CC": "High Luster Ecru #332",
      "#E8E2D5": "Champagne #335",
      "#C9C1B0": "Soft Sand #340",
      "#BEB5A2": "Raw Mercerized #350"
    },
    peakWl: 580,
    baseReflectance: 22,
    calibratingText: "Zeroing Specular Gloss Sensor...",
    correctedText: "Caustic Dosing Correction Applied!",
    sparkFormatters: [
      (t, y) => `${(139.5 + t * 3.4).toFixed(1)} BAN`,
      (t, y) => `${(98.5 + t * 1.1).toFixed(1)}%`,
      (t, y) => `${(27.8 + (70 - y) / 70 * 0.7).toFixed(1)} °Bé`
    ]
  });

  createInspectionDashboardController({
    viewId: "stenterColorInspectionView",
    prefix: "stn",
    defaultL: 42.00,
    defaultA: 1.50,
    defaultB: 14.70,
    defaultTol: 0.50,
    defaultHex: "#6E6652",
    defaultName: "Military Khaki Twill #520",
    measured: { L: 42.11, a: 1.46, b: 14.62, hex: "#6C6450" },
    shadeMap: {
      "#6E6652": "Khaki Twill #520",
      "#595444": "Olive Taupe #522",
      "#73674A": "Field Drab #525",
      "#9C8C70": "Desert Tan #530",
      "#4A4D3E": "Forest Khaki #540"
    },
    peakWl: 580,
    baseReflectance: 10,
    calibratingText: "Zeroing Finish Pyrometer & Optic...",
    correctedText: "Finish Dosing Correction Applied!",
    sparkFormatters: [
      (t, y) => `ΔE ${(0.23 - t * 0.07 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${(98.9 + t * 0.7).toFixed(1)}%`,
      (t, y) => `${(4.0 + (70 - y) / 70 * 0.4).toFixed(1)}% H₂O`
    ]
  });

  createInspectionDashboardController({
    viewId: "greigeInspectionView",
    prefix: "grg",
    visionMode: true,
    deltaUnit: "pts",
    defaultL: 20.00,
    defaultA: 0.00,
    defaultB: 0.00,
    defaultTol: 0.50,
    defaultHex: "#C4B8A5",
    defaultName: "ASTM D5430 Grade A · Greige 140 GSM",
    measured: { L: 20.12, a: 0.04, b: 0.08, hex: "#C2B6A3" },
    formatLab: (L, a, b) => `Index: ${L.toFixed(2)} pts • Holes: ${a.toFixed(2)} • Oil: ${b.toFixed(2)}`,
    formatHex: (hex, name) => `CLASS: ${name || "GRG-MAP"}`,
    shadeMap: {
      "#C4B8A5": "Greige Cotton #140",
      "#D6CBB8": "Light Greige #142",
      "#B7A78F": "Raw Loomstate #148",
      "#E2D6C4": "Unsized Warp #150",
      "#A89880": "Heavy Greige #160"
    },
    peakWl: 580,
    baseReflectance: 18,
    calibratingText: "Zeroing Linear Camera...",
    correctedText: "Grade Correction Applied!",
    sparkFormatters: [
      (t, y) => `${(0.28 - t * 0.05 + Math.sin(t * 7) * 0.02).toFixed(2)} pts`,
      (t, y) => `${(97.4 + t * 1.4).toFixed(1)}%`,
      (t, y) => `${(36.8 + (70 - y) / 70 * 2.2).toFixed(1)} m/min`
    ],
    machines: [
      { id: "uster-fv2", name: "Uster Fabriq Vision 2", model: "USTER FV2 (LINEAR CAMERA)", tag: "#GRG-2204-GREY" },
      { id: "comatex-isw", name: "Comatex ISW Inspection", model: "COMATEX ISW (4-POINT TABLE)", tag: "#GRG-2204-ISW" },
      { id: "four-point", name: "4-Point Grading Table", model: "ASTM D5430 MENDING FRAME", tag: "#GRG-2204-MEND" },
      { id: "aframe", name: "A-Frame Batching Winder", model: "A-FRAME BATCHER 320 cm", tag: "#GRG-2204-BATCH" }
    ]
  });

  createInspectionDashboardController({
    viewId: "pretreatmentInspectionView",
    prefix: "pre",
    visionMode: true,
    deltaUnit: "idx",
    defaultL: 0.00,
    defaultA: 0.00,
    defaultB: 0.00,
    defaultTol: 0.50,
    defaultHex: "#F4F1EA",
    defaultName: "Clean Prepared Cloth · No Tear / Stain",
    measured: { L: 0.08, a: 0.04, b: 0.12, hex: "#F2EFE8" },
    formatLab: (L, a, b) => `Tear: ${L.toFixed(2)} • Hole: ${a.toFixed(2)} • Stains: ${b.toFixed(2)} /1000m`,
    formatHex: (hex, name) => `CLASS: ${name || "PRE-MAP"}`,
    shadeMap: {
      "#F4F1EA": "Prepared White #020",
      "#FAFAF7": "Optic Bleach #010",
      "#EDE6D8": "Scoured Ecru #030",
      "#E8E2D4": "Desized Base #040",
      "#F7F3EC": "Mercerized Prep #050"
    },
    peakWl: 440,
    baseReflectance: 32,
    calibratingText: "Zeroing Prep Optic & pH Probe...",
    correctedText: "Pretreatment Correction Applied!",
    sparkFormatters: [
      (t, y) => `Δ ${(0.28 - t * 0.08 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${(97.8 + t * 1.3).toFixed(1)}%`,
      (t, y) => `${(6.2 + (70 - y) / 70 * 0.4).toFixed(1)} pH`
    ],
    machines: [
      { id: "singeray", name: "Benninger SingeRay", model: "SINGERAY (GAS SINGEING)", tag: "#PRE-1092-SINGE" },
      { id: "ben-bleach", name: "BEN-BLEACH Range", model: "BEN-BLEACH DESIZE–SCOUR–BLEACH", tag: "#PRE-1092-BLEACH" },
      { id: "ben-dimensa", name: "BEN-DIMENSA Mercerizer", model: "BEN-DIMENSA (HOT MERCERIZE)", tag: "#PRE-1092-MERC" },
      { id: "ben-wash", name: "BEN-WASH Extracta", model: "EXTRACTA / TRIKOFLEX WASH", tag: "#PRE-1092-WASH" }
    ]
  });

  createInspectionDashboardController({
    viewId: "fvDyeingInspectionView",
    prefix: "fvd",
    visionMode: true,
    deltaUnit: "idx",
    defaultL: 0.00,
    defaultA: 0.00,
    defaultB: 0.00,
    defaultTol: 0.50,
    defaultHex: "#1A2849",
    defaultName: "Clean Dyed Twill · No Tear / Spot",
    measured: { L: 0.08, a: 0.04, b: 0.12, hex: "#1B294A" },
    formatLab: (L, a, b) => `Tear: ${L.toFixed(2)} • Hole: ${a.toFixed(2)} • Spots: ${b.toFixed(2)} /1000m`,
    formatHex: (hex, name) => `CLASS: ${name || "DYE-MAP"}`,
    shadeMap: {
      "#1A2849": "Clean Navy Map",
      "#7F1D1D": "Dye Splash Class A",
      "#44403C": "Oil Spot Class B",
      "#365314": "Alkali Spot Class C",
      "#0F172A": "Tear / Hole Mask"
    },
    peakWl: 460,
    baseReflectance: 10,
    calibratingText: "Zeroing Defect Vision Camera...",
    correctedText: "Defect Map Correction Applied!",
    sparkFormatters: [
      (t, y) => `${(98.6 + t * 0.9).toFixed(1)}%`,
      (t, y) => `Δ ${(0.20 - t * 0.08 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${Math.max(1, Math.round(4 - t * 2 + Math.sin(t * 6)))} /1000m`
    ],
    machines: [
      { id: "uster-fv2", name: "Uster Fabriq Vision 2", model: "USTER FV2 (DYE-LINE CAMERA)", tag: "#DYE-4410-NAVY" },
      { id: "evs", name: "Elbit Vision Systems", model: "EVS I-TEX INSPECTION", tag: "#DYE-4410-EVS" },
      { id: "mahlo", name: "Mahlo Orgatex Web", model: "MAHLO ORGATEX WEB INSPECT", tag: "#DYE-4410-MAHLO" },
      { id: "bst", name: "BST eltromat iPQ-Web", model: "BST iPQ-WEB SURFACE QC", tag: "#DYE-4410-BST" }
    ]
  });

  createInspectionDashboardController({
    viewId: "fvPrintingInspectionView",
    prefix: "fvp",
    visionMode: true,
    deltaUnit: "idx",
    defaultL: 0.00,
    defaultA: 0.00,
    defaultB: 0.00,
    defaultTol: 0.50,
    defaultHex: "#C026D3",
    defaultName: "Approved Print CAD · Magenta #704",
    measured: { L: 0.12, a: 0.04, b: 0.08, hex: "#BD25CF" },
    formatLab: (L, a, b) => `Register: ${L.toFixed(2)} mm • Pin-holes: ${a.toFixed(2)} • Misprints: ${b.toFixed(2)}`,
    formatHex: (hex, name) => `CLASS: ${name || "PRN-MAP"}`,
    shadeMap: {
      "#C026D3": "Reactive Magenta #704",
      "#0891B2": "Cyan Register #610",
      "#EAB308": "Yellow Screen #302",
      "#18181B": "Black Keyline #900",
      "#BE123C": "Misprint Class A"
    },
    peakWl: 540,
    baseReflectance: 12,
    calibratingText: "Zeroing Print Vision Camera...",
    correctedText: "Print Map Correction Applied!",
    sparkFormatters: [
      (t, y) => `Δ ${(0.22 - t * 0.06 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${(98.2 + t * 1.0).toFixed(1)}%`,
      (t, y) => `${Math.max(1, Math.round(3 - t * 1.5 + Math.sin(t * 5)))} /1000m`
    ],
    machines: [
      { id: "zimmer", name: "Zimmer Austria Vision", model: "ZIMMER ROTASCREEN VISION QC", tag: "#PRN-704-ZIM" },
      { id: "reggiani", name: "EFI Reggiani Print QC", model: "REGGIANI UNICA QC CAMERA", tag: "#PRN-704-EFI" },
      { id: "stork", name: "Stork Prints Vision QC", model: "SPGPRINTS ROTARY VISION", tag: "#PRN-704-STORK" },
      { id: "bst-reg", name: "BST Print Register Control", model: "BST ELTROMAT REGISTER", tag: "#PRN-704-BST" }
    ]
  });

  createInspectionDashboardController({
    viewId: "fvFinishInspectionView",
    prefix: "fvf",
    visionMode: true,
    deltaUnit: "idx",
    defaultL: 152.00,
    defaultA: 0.00,
    defaultB: 240.00,
    defaultTol: 0.50,
    defaultHex: "#6E6652",
    defaultName: "Finished Khaki Twill · 152 cm / 240 GSM",
    measured: { L: 152.11, a: 0.04, b: 239.92, hex: "#6C6450" },
    formatLab: (L, a, b) => `Width: ${L.toFixed(2)} cm • Skew: ${a.toFixed(2)}° • GSM: ${b.toFixed(2)}`,
    formatHex: (hex, name) => `CLASS: ${name || "FNS-MAP"}`,
    shadeMap: {
      "#6E6652": "Khaki Twill #520",
      "#595444": "Olive Taupe #522",
      "#73674A": "Field Drab #525",
      "#9C8C70": "Desert Tan #530",
      "#4A4D3E": "Forest Khaki #540"
    },
    peakWl: 580,
    baseReflectance: 10,
    calibratingText: "Zeroing Finish Vision Camera...",
    correctedText: "Finish Correction Applied!",
    sparkFormatters: [
      (t, y) => `Δ ${(0.22 - t * 0.07 + Math.sin(t * 7) * 0.02).toFixed(2)}`,
      (t, y) => `${(98.6 + t * 0.8).toFixed(1)}%`,
      (t, y) => `${(0.12 - t * 0.04 + Math.abs(Math.sin(t * 5)) * 0.02).toFixed(2)} /m²`
    ],
    machines: [
      { id: "power-frame", name: "Brückner POWER-FRAME", model: "POWER-FRAME SFP-4 STENTER", tag: "#FNS-8802-STENT" },
      { id: "power-shrink", name: "POWER-SHRINK Sanfor", model: "POWER-SHRINK SANFOR RANGE", tag: "#FNS-8802-SANFOR" },
      { id: "power-compact", name: "POWER-COMPACT Compactor", model: "POWER-COMPACT FELT CALENDER", tag: "#FNS-8802-COMP" },
      { id: "montex", name: "Monforts MONTEX Stenter", model: "MONTEX STENTER LINE", tag: "#FNS-8802-MONTEX" }
    ]
  });

  createInspectionDashboardController({
    viewId: "foldingInspectionView",
    prefix: "fld",
    visionMode: true,
    deltaUnit: "idx",
    defaultL: 50.00,
    defaultA: 2.00,
    defaultB: 2.00,
    defaultTol: 0.50,
    defaultHex: "#E2E8F0",
    defaultName: "Export Roll Spec · 50.00 m · PE wrap",
    measured: { L: 50.08, a: 2.10, b: 2.04, hex: "#E0E6EE" },
    formatLab: (L, a, b) => `Length: ${L.toFixed(2)} m • Edge: ${a.toFixed(2)} mm • Wrap: ${b.toFixed(2)}`,
    formatHex: (hex, name) => `CLASS: ${name || "FLD-MAP"}`,
    shadeMap: {
      "#E2E8F0": "Pack White #010",
      "#F8FAFC": "PE Wrap Clear",
      "#CBD5E1": "Selvedge Guide",
      "#94A3B8": "Core Tube Grey",
      "#334155": "Ticket Black"
    },
    peakWl: 580,
    baseReflectance: 28,
    calibratingText: "Zeroing Length Encoder & Edge Eye...",
    correctedText: "Pack Correction Applied!",
    sparkFormatters: [
      (t, y) => `${(99.40 + t * 0.48).toFixed(2)}%`,
      (t, y) => `±${(2.6 - t * 0.5 + Math.sin(t * 6) * 0.08).toFixed(1)} mm`,
      (t, y) => `${(30.4 + (70 - y) / 70 * 2.4).toFixed(0)} m/min`
    ],
    machines: [
      { id: "konsan", name: "Konsan Plaiting & Roll", model: "KONSAN PLAIT / ROLL INSPECT", tag: "#FLD-3301-KON" },
      { id: "suntech", name: "Suntech ST-DFPM", model: "SUNTECH DOUBLE-FOLD PLAITER", tag: "#FLD-3301-ST" },
      { id: "comatex-isp", name: "Comatex ISP Inspection", model: "COMATEX ISP HIGH-PROD LINE", tag: "#FLD-3301-ISP" },
      { id: "imb-sa", name: "Comatex IMB SA Packer", model: "IMB SA AUTO PE WRAP", tag: "#FLD-3301-PACK" }
    ]
  });

  // Initialize the High-Tech Machine Vision Camera Engine for all 6 Fabric Inspection Module Dashboards
  initFabricInspectionCameraFeeds();
}

// =========================================================================
// HIGH-TECH INDUSTRIAL MACHINE VISION CAMERA FEED ENGINE FOR 6 MODULES
// =========================================================================
function initFabricInspectionCameraFeeds() {
  const cameraConfigs = [
    {
      prefix: "grg",
      viewId: "greigeInspectionView",
      canvasId: "grgFeedCanvas",
      viewportId: "grgFeedViewport",
      laserLineId: "grgLaserLine",
      bannerId: "grgDefectBanner",
      bannerTextId: "grgDefectBannerText",
      pauseBtnId: "grgBtnPauseFeed",
      modePillsId: "grgModePills",
      injectBtnId: "grgBtnInjectSpot",
      fpsId: "grgHudFps",
      machineSelectId: "grgMachineSelect",
      imgSrc: "assets/feed_cam_greige.jpg",
      baseSpeedMpm: 38.4,
      fabricMinX: 0.35,
      fabricMaxX: 0.75,
      defectCatalog: [
        { name: "OIL STAIN", code: "ASTM-B", classif: "Major", badge: "OIL", penalty: 2, conf: 98.2, sev: "amber", drawType: "oil" },
        { name: "BROKEN PICK", code: "ASTM-A", classif: "Minor", badge: "PICK", penalty: 1, conf: 95.7, sev: "cyan", drawType: "pick" },
        { name: "SLUB KNOT", code: "ASTM-C", classif: "Major", badge: "SLUB", penalty: 2, conf: 97.4, sev: "amber", drawType: "slub" },
        { name: "WEAVE HOLE", code: "ASTM-D", classif: "Critical", badge: "HOLE", penalty: 4, conf: 99.1, sev: "red", drawType: "hole" }
      ],
      onLaserHit: (defect) => {
        const oilEl = document.getElementById("grgHudOil");
        const holeEl = document.getElementById("grgHudHole");
        const ptsEl = document.getElementById("grgHudPts");
        const idxEl = document.getElementById("grgHudIndex");
        if (defect.drawType === "oil" && oilEl) {
          oilEl.textContent = String(parseInt(oilEl.textContent || "0", 10) + 1);
        } else if (defect.drawType === "hole" && holeEl) {
          holeEl.textContent = String(parseInt(holeEl.textContent || "0", 10) + 1);
        }
        if (ptsEl && idxEl) {
          const cur = parseFloat(ptsEl.textContent || "0.24");
          const updated = (cur + defect.penalty * 0.04).toFixed(2);
          ptsEl.textContent = updated;
          idxEl.textContent = updated;
        }
      }
    },
    {
      prefix: "pre",
      viewId: "pretreatmentInspectionView",
      canvasId: "preFeedCanvas",
      viewportId: "preFeedViewport",
      laserLineId: "preLaserLine",
      bannerId: "preDefectBanner",
      bannerTextId: "preDefectBannerText",
      pauseBtnId: "preBtnPauseFeed",
      modePillsId: "preModePills",
      injectBtnId: "preBtnInjectSpot",
      fpsId: "preHudFps",
      machineSelectId: "preMachineSelect",
      imgSrc: "assets/feed_cam_pretreat.jpg",
      baseSpeedMpm: 48.0,
      fabricMinX: 0.26,
      fabricMaxX: 0.74,
      defectCatalog: [
        { name: "CHEMICAL STAIN", code: "PRE-CS", classif: "Major", badge: "STAIN", penalty: 2, conf: 97.8, sev: "amber", drawType: "cloudy" },
        { name: "FABRIC TEAR", code: "PRE-TR", classif: "Critical", badge: "TEAR", penalty: 4, conf: 99.2, sev: "red", drawType: "tear" },
        { name: "BLEACH STREAK", code: "PRE-BL", classif: "Minor", badge: "STREAK", penalty: 1, conf: 94.5, sev: "cyan", drawType: "streak" },
        { name: "SINGE SCORCH", code: "PRE-SG", classif: "Critical", badge: "SCORCH", penalty: 3, conf: 98.9, sev: "red", drawType: "scorch" }
      ],
      onLaserHit: (defect) => {
        const deltaTag = document.querySelector("#pretreatmentInspectionView .hud-delta-tag strong");
        if (deltaTag) {
          const cur = parseFloat(deltaTag.textContent || "0.21");
          deltaTag.textContent = (cur + 0.03).toFixed(2);
        }
      }
    },
    {
      prefix: "fvd",
      viewId: "fvDyeingInspectionView",
      canvasId: "fvdFeedCanvas",
      viewportId: "fvdFeedViewport",
      laserLineId: "fvdLaserLine",
      bannerId: "fvdDefectBanner",
      bannerTextId: "fvdDefectBannerText",
      pauseBtnId: "fvdBtnPauseFeed",
      modePillsId: "fvdModePills",
      injectBtnId: "fvdBtnInjectSpot",
      fpsId: "fvdHudFps",
      machineSelectId: "fvdMachineSelect",
      imgSrc: "assets/feed_cam_dyeing.jpg",
      baseSpeedMpm: 42.5,
      fabricMinX: 0.38,
      fabricMaxX: 0.62,
      defectCatalog: [
        { name: "FABRIC TEAR", code: "DYE-TR", classif: "Critical", badge: "TEAR", penalty: 4, conf: 99.4, sev: "red", drawType: "tear" },
        { name: "CHEMICAL STAIN", code: "DYE-CS", classif: "Major", badge: "STAIN", penalty: 2, conf: 97.5, sev: "amber", drawType: "cloudy" },
        { name: "DYE LIQUOR SPLASH", code: "DYE-SP", classif: "Critical", badge: "SPOT", penalty: 3, conf: 98.8, sev: "red", drawType: "dyesplash" },
        { name: "SHADING STREAK", code: "DYE-SH", classif: "Major", badge: "SHADE", penalty: 2, conf: 96.2, sev: "amber", drawType: "streak" }
      ],
      onLaserHit: (defect) => {
        const spotEl = document.getElementById("fvdHudSpot");
        const idxEl = document.getElementById("fvdHudIndex");
        if (spotEl) {
          spotEl.textContent = String(parseInt(spotEl.textContent || "0", 10) + 1);
        }
        if (idxEl) {
          idxEl.textContent = (parseFloat(idxEl.textContent || "0.12") + 0.03).toFixed(2);
        }
      }
    },
    {
      prefix: "fvp",
      viewId: "fvPrintingInspectionView",
      canvasId: "fvpFeedCanvas",
      viewportId: "fvpFeedViewport",
      laserLineId: "fvpLaserLine",
      bannerId: "fvpDefectBanner",
      bannerTextId: "fvpDefectBannerText",
      pauseBtnId: "fvpBtnPauseFeed",
      modePillsId: "fvpModePills",
      injectBtnId: "fvpBtnInjectSpot",
      fpsId: "fvpHudFps",
      machineSelectId: "fvpMachineSelect",
      imgSrc: "assets/feed_cam_print.jpg",
      baseSpeedMpm: 55.0,
      fabricMinX: 0.42,
      fabricMaxX: 0.58,
      defectCatalog: [
        { name: "COLOR BLOTCH / DRIP", code: "PRN-BL", classif: "Critical", badge: "MIS", penalty: 3, conf: 99.2, sev: "red", drawType: "blotch" },
        { name: "DOCTOR BLADE STREAK", code: "PRN-DR", classif: "Major", badge: "PIN", penalty: 2, conf: 97.8, sev: "amber", drawType: "docstreak" },
        { name: "MISREGISTRATION", code: "PRN-RG", classif: "Major", badge: "REG", penalty: 2, conf: 96.5, sev: "amber", drawType: "misreg" },
        { name: "LINT RESIST WHITE", code: "PRN-LT", classif: "Minor", badge: "LINT", penalty: 1, conf: 95.1, sev: "cyan", drawType: "pinhole" }
      ],
      onLaserHit: (defect) => {
        const misEl = document.getElementById("fvpHudMis");
        const idxEl = document.getElementById("fvpHudIndex");
        if (misEl) {
          misEl.textContent = String(parseInt(misEl.textContent || "0", 10) + 1);
        }
        if (idxEl) {
          idxEl.textContent = (parseFloat(idxEl.textContent || "0.16") + 0.03).toFixed(2);
        }
      }
    },
    {
      prefix: "fvf",
      viewId: "fvFinishInspectionView",
      canvasId: "fvfFeedCanvas",
      viewportId: "fvfFeedViewport",
      laserLineId: "fvfLaserLine",
      bannerId: "fvfDefectBanner",
      bannerTextId: "fvfDefectBannerText",
      pauseBtnId: "fvfBtnPauseFeed",
      modePillsId: "fvfModePills",
      injectBtnId: "fvfBtnInjectSpot",
      fpsId: "fvfHudFps",
      machineSelectId: "fvfMachineSelect",
      imgSrc: "assets/feed_cam_finish.jpg",
      baseSpeedMpm: 55.0,
      fabricMinX: 0.34,
      fabricMaxX: 0.66,
      defectCatalog: [
        { name: "SURFACE NEP / LUMP", code: "FNS-NP", classif: "Minor", badge: "NEP", penalty: 1, conf: 95.9, sev: "cyan", drawType: "slub" },
        { name: "STENTER PIN MARK", code: "FNS-PN", classif: "Major", badge: "PIN", penalty: 2, conf: 97.6, sev: "amber", drawType: "pinhole" },
        { name: "CHEMICAL RESIDUE", code: "FNS-CR", classif: "Major", badge: "STAIN", penalty: 2, conf: 96.4, sev: "amber", drawType: "cloudy" },
        { name: "WEFT SKEW LINE", code: "FNS-SK", classif: "Critical", badge: "SKEW", penalty: 3, conf: 98.7, sev: "red", drawType: "skew" }
      ],
      onLaserHit: (defect) => {
        const idxEl = document.getElementById("fvfHudIndex");
        const skewEl = document.getElementById("fvfHudSkew");
        if (idxEl) {
          idxEl.textContent = (parseFloat(idxEl.textContent || "0.15") + 0.03).toFixed(2);
        }
        if (defect.drawType === "skew" && skewEl) {
          skewEl.textContent = "0.7°";
          setTimeout(() => { if (skewEl) skewEl.textContent = "0.4°"; }, 3000);
        }
      }
    },
    {
      prefix: "fld",
      viewId: "foldingInspectionView",
      canvasId: "fldFeedCanvas",
      viewportId: "fldFeedViewport",
      laserLineId: "fldLaserLine",
      bannerId: "fldDefectBanner",
      bannerTextId: "fldDefectBannerText",
      pauseBtnId: "fldBtnPauseFeed",
      modePillsId: "fldModePills",
      injectBtnId: "fldBtnInjectSpot",
      fpsId: "fldHudFps",
      machineSelectId: "fldMachineSelect",
      imgSrc: "assets/feed_cam_folding.jpg",
      baseSpeedMpm: 32.0,
      fabricMinX: 0.40,
      fabricMaxX: 0.60,
      defectCatalog: [
        { name: "SELVEDGE EDGE CREASE", code: "FLD-CR", classif: "Critical", badge: "EDGE", penalty: 3, conf: 98.6, sev: "red", drawType: "crease" },
        { name: "CONTAMINANT SPOT", code: "FLD-ST", classif: "Major", badge: "STAIN", penalty: 2, conf: 97.3, sev: "amber", drawType: "oil" },
        { name: "LOOSE SELVEDGE THREAD", code: "FLD-TH", classif: "Minor", badge: "THREAD", penalty: 1, conf: 94.6, sev: "cyan", drawType: "pick" },
        { name: "TENSION WRINKLE", code: "FLD-WR", classif: "Major", badge: "WRINKLE", penalty: 2, conf: 96.8, sev: "amber", drawType: "crease" }
      ],
      onLaserHit: (defect) => {
        const idxEl = document.getElementById("fldHudIndex");
        const edgeEl = document.getElementById("fldHudEdge");
        if (idxEl) {
          idxEl.textContent = (parseFloat(idxEl.textContent || "0.14") + 0.02).toFixed(2);
        }
        if (defect.drawType === "crease" && edgeEl) {
          edgeEl.textContent = "3.8";
          setTimeout(() => { if (edgeEl) edgeEl.textContent = "2.1"; }, 3000);
        }
      }
    }
  ];

  cameraConfigs.forEach((cfg) => {
    initSingleCameraFeed(cfg);
  });
}

function initSingleCameraFeed(cfg) {
  const canvas = document.getElementById(cfg.canvasId);
  const view = document.getElementById(cfg.viewId);
  if (!canvas || !view) return;

  const ctx = canvas.getContext("2d");
  const laserLine = document.getElementById(cfg.laserLineId);
  const banner = document.getElementById(cfg.bannerId);
  const bannerText = document.getElementById(cfg.bannerTextId);
  const pauseBtn = document.getElementById(cfg.pauseBtnId);
  const modePills = document.getElementById(cfg.modePillsId);
  const injectBtn = document.getElementById(cfg.injectBtnId);
  const fpsDisplay = document.getElementById(cfg.fpsId);
  const machineSelect = document.getElementById(cfg.machineSelectId);

  let isPaused = false;
  let currentMode = "rgb"; // "rgb", "heatmap", "laser"
  let scrollY = 0;
  let speedMpm = cfg.baseSpeedMpm;
  let defects = [];
  let nextSpawnTime = performance.now() + 3500 + Math.random() * 3000;
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fps = 60.0;
  let laserTimer = null;
  let bannerTimer = null;

  // Load fabric texture image
  const img = new Image();
  img.src = cfg.imgSrc;
  let imgLoaded = false;
  img.onload = () => { imgLoaded = true; };

  // Listen to machine select to update line speed
  if (machineSelect) {
    machineSelect.addEventListener("change", () => {
      const speeds = {
        "uster-fv2": 38.4,
        "comatex-isw": 34.0,
        "four-point": 28.0,
        "aframe": 45.0,
        "singeray": 48.0,
        "ben-bleach": 45.0,
        "ben-dimensa": 42.0,
        "ben-wash": 50.0,
        "evs": 46.0,
        "mahlo": 42.5,
        "bst": 44.0,
        "zimmer": 55.0,
        "reggiani": 58.0,
        "stork": 52.0,
        "bst-reg": 50.0,
        "power-frame": 55.0,
        "power-shrink": 40.0,
        "power-compact": 36.0,
        "montex": 52.0,
        "konsan": 32.0,
        "suntech": 35.0,
        "comatex-isp": 30.0,
        "imb-sa": 34.0
      };
      if (speeds[machineSelect.value]) {
        speedMpm = speeds[machineSelect.value];
        const metaTag = view.querySelector(".meta-tag-feed");
        if (metaTag) metaTag.textContent = `${speedMpm.toFixed(1)} m/min`;
      }
    });
  }

  // Setup pause/play toggle
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      const pauseIcon = pauseBtn.querySelector(".icon-pause");
      const playIcon = pauseBtn.querySelector(".icon-play");
      const label = pauseBtn.querySelector(".ctrl-label");
      if (isPaused) {
        if (pauseIcon) pauseIcon.style.display = "none";
        if (playIcon) playIcon.style.display = "block";
        if (label) label.textContent = "RESUME";
      } else {
        if (pauseIcon) pauseIcon.style.display = "block";
        if (playIcon) playIcon.style.display = "none";
        if (label) label.textContent = "PAUSE";
      }
    });
  }

  // Setup mode pills
  if (modePills) {
    modePills.querySelectorAll(".feed-mode-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        modePills.querySelectorAll(".feed-mode-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode || "rgb";
      });
    });
  }

  // Defect spawner - strictly constrained inside the fabric web bounds
  function spawnDefect(customType) {
    const typeDef = customType || cfg.defectCatalog[Math.floor(Math.random() * cfg.defectCatalog.length)];
    const canvasW = canvas.width || 720;
    const minX = (cfg.fabricMinX || 0.35) * canvasW;
    const maxX = (cfg.fabricMaxX || 0.65) * canvasW;
    const spawnX = minX + Math.random() * (maxX - minX);
    defects.push({
      x: spawnX,
      y: -35,
      type: typeDef,
      name: typeDef.name,
      code: typeDef.code,
      classif: typeDef.classif,
      badge: typeDef.badge,
      penalty: typeDef.penalty,
      conf: Math.min(99.4, typeDef.conf + (Math.random() * 1.4 - 0.7)),
      sev: typeDef.sev,
      drawType: typeDef.drawType,
      size: 11 + Math.random() * 8,
      laserTriggered: false
    });
  }

  if (injectBtn) {
    injectBtn.addEventListener("click", () => {
      spawnDefect();
      if (typeof sfx !== "undefined" && sfx && sfx.playClick) sfx.playClick();
    });
  }

  // Main render loop
  function renderLoop(timestamp) {
    requestAnimationFrame(renderLoop);

    // Only render if view is visible
    if (view.style.display === "none") return;

    // Maintain crisp resolution
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && (canvas.width !== Math.round(rect.width) || canvas.height !== Math.round(rect.height))) {
      canvas.width = Math.round(rect.width);
      canvas.height = Math.round(rect.height);
    }

    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    frameCount++;
    if (frameCount % 20 === 0 && dt > 0) {
      fps = 1000 / dt;
      if (fpsDisplay) fpsDisplay.textContent = `${Math.min(60, fps).toFixed(1)} FPS`;
    }

    if (!isPaused) {
      // Speed in px/frame: ~38.4 m/min => ~2.4 px per frame
      const speedPx = (speedMpm / 38.4) * 2.2;
      scrollY = (scrollY + speedPx) % (canvas.height || 255);

      // Defect spawning timer
      if (timestamp > nextSpawnTime) {
        spawnDefect();
        nextSpawnTime = timestamp + 6500 + Math.random() * 4500;
      }

      // Move defects
      for (let i = 0; i < defects.length; i++) {
        defects[i].y += speedPx;
      }
      // Remove out-of-bounds defects
      defects = defects.filter((d) => d.y < canvas.height + 60);

      // Defect collision detection at middle of feed
      const laserY = canvas.height * 0.48;
      for (let i = 0; i < defects.length; i++) {
        const d = defects[i];
        if (!d.laserTriggered && d.y >= laserY - 14 && d.y <= laserY + 14) {
          d.laserTriggered = true;

          if (cfg.onLaserHit) {
            cfg.onLaserHit(d);
          }
        }
      }
    }

    // DRAWING
    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw fabric texture background scrolling
    if (imgLoaded) {
      const imgH = h;
      const y1 = scrollY - imgH;
      const y2 = scrollY;
      const y3 = scrollY + imgH;
      ctx.drawImage(img, 0, y1, w, imgH);
      ctx.drawImage(img, 0, y2, w, imgH);
      if (y3 < h) {
        ctx.drawImage(img, 0, y3, w, imgH);
      }
    } else {
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(0, 0, w, h);
    }

    // Apply Camera Mode Filter Effects
    if (currentMode === "heatmap") {
      ctx.fillStyle = "rgba(15, 23, 42, 0.45)";
      ctx.fillRect(0, 0, w, h);

      // False-color spectral tint
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.15)");
      grad.addColorStop(0.5, "rgba(16, 185, 129, 0.08)");
      grad.addColorStop(1, "rgba(59, 130, 246, 0.15)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (currentMode === "laser") {
      ctx.fillStyle = "rgba(0, 10, 20, 0.5)";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Draw Moving Defect Spots accurately strictly on the fabric
    defects.forEach((d) => {
      drawDefectGraphic(ctx, d, currentMode);
      drawAiBoundingBox(ctx, d, currentMode, w, cfg);
    });
  }

  requestAnimationFrame(renderLoop);
}

function drawDefectGraphic(ctx, d, mode) {
  ctx.save();
  const rad = Math.max(10, d.size || 14);

  switch (d.drawType) {
    case "oil": {
      const grad = ctx.createRadialGradient(d.x, d.y, 1, d.x, d.y, rad);
      grad.addColorStop(0, "rgba(70, 45, 10, 0.88)");
      grad.addColorStop(0.5, "rgba(120, 75, 20, 0.62)");
      grad.addColorStop(0.85, "rgba(180, 120, 30, 0.32)");
      grad.addColorStop(1, "rgba(180, 120, 30, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, rad * 1.25, rad * 0.95, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(100, 60, 15, 0.6)";
      ctx.beginPath();
      ctx.arc(d.x + rad * 0.9, d.y - rad * 0.6, 2.5, 0, Math.PI * 2);
      ctx.arc(d.x - rad * 0.8, d.y + rad * 0.7, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "pick": {
      ctx.strokeStyle = "rgba(15, 23, 42, 0.92)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(d.x - 24, d.y);
      ctx.lineTo(d.x + 24, d.y);
      ctx.stroke();
      ctx.strokeStyle = "rgba(226, 232, 240, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(d.x - 4, d.y - 5);
      ctx.lineTo(d.x + 6, d.y + 5);
      ctx.stroke();
      break;
    }
    case "slub": {
      ctx.fillStyle = "rgba(241, 245, 249, 0.92)";
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, 14, 5.5, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      break;
    }
    case "hole": {
      ctx.fillStyle = "#020617";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 7.5, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case "cloudy": {
      // Authentic chemical stain on fabric surface (permeates fabric weave)
      const rad = 18;
      const grad = ctx.createRadialGradient(d.x, d.y, 1, d.x, d.y, rad);
      grad.addColorStop(0, "rgba(217, 119, 6, 0.78)");
      grad.addColorStop(0.45, "rgba(245, 158, 11, 0.50)");
      grad.addColorStop(0.8, "rgba(252, 211, 77, 0.20)");
      grad.addColorStop(1, "rgba(252, 211, 77, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, rad * 1.22, rad * 0.88, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Irregular chemical stain satellite droplets absorbed into fabric
      ctx.fillStyle = "rgba(180, 83, 9, 0.52)";
      ctx.beginPath();
      ctx.arc(d.x + rad * 0.75, d.y - rad * 0.45, 2, 0, Math.PI * 2);
      ctx.arc(d.x - rad * 0.7, d.y + rad * 0.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "streak": {
      const grad = ctx.createLinearGradient(d.x - 10, d.y, d.x + 10, d.y);
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.65)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(d.x - 10, d.y - 28, 20, 56);
      break;
    }
    case "scorch": {
      const grad = ctx.createLinearGradient(0, d.y - 6, 0, d.y + 6);
      grad.addColorStop(0, "rgba(180, 83, 9, 0)");
      grad.addColorStop(0.5, "rgba(180, 83, 9, 0.75)");
      grad.addColorStop(1, "rgba(180, 83, 9, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(d.x - 36, d.y - 6, 72, 12);
      break;
    }
    case "dyesplash": {
      ctx.fillStyle = "rgba(2, 6, 23, 0.96)";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(d.x + 11, d.y - 7, 2.5, 0, Math.PI * 2);
      ctx.arc(d.x - 10, d.y + 8, 2.2, 0, Math.PI * 2);
      ctx.arc(d.x + 8, d.y + 10, 1.8, 0, Math.PI * 2);
      ctx.arc(d.x - 9, d.y - 8, 1.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "resist": {
      ctx.fillStyle = "rgba(147, 197, 253, 0.7)";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      break;
    }
    case "blotch": {
      ctx.fillStyle = "rgba(225, 29, 72, 0.92)";
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, 12, 8, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(6, 182, 212, 0.88)";
      ctx.beginPath();
      ctx.arc(d.x + 9, d.y + 5, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "docstreak": {
      ctx.strokeStyle = "rgba(225, 29, 72, 0.96)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y - 40);
      ctx.lineTo(d.x, d.y + 40);
      ctx.stroke();
      break;
    }
    case "misreg": {
      ctx.strokeStyle = "rgba(6, 182, 212, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(d.x - 12, d.y - 12, 24, 24);
      ctx.strokeStyle = "rgba(225, 29, 72, 0.9)";
      ctx.strokeRect(d.x - 9, d.y - 9, 24, 24);
      break;
    }
    case "crease": {
      ctx.strokeStyle = "rgba(15, 23, 42, 0.88)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(d.x - 18, d.y - 20);
      ctx.lineTo(d.x + 18, d.y + 20);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(d.x - 17, d.y - 19);
      ctx.lineTo(d.x + 19, d.y + 21);
      ctx.stroke();
      break;
    }
    case "skew": {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.85)";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(d.x - 42, d.y + 12);
      ctx.lineTo(d.x + 42, d.y - 12);
      ctx.stroke();
      ctx.setLineDash([]);
      break;
    }
    case "tear": {
      // Realistic fabric tear on cloth surface with frayed fibers and dark void
      ctx.strokeStyle = "rgba(2, 6, 23, 0.98)";
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(d.x - 14, d.y - 10);
      ctx.lineTo(d.x - 4, d.y - 1);
      ctx.lineTo(d.x + 3, d.y - 5);
      ctx.lineTo(d.x + 14, d.y + 9);
      ctx.stroke();
      // Frayed yarn edges
      ctx.strokeStyle = "rgba(241, 245, 249, 0.9)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(d.x - 10, d.y - 12);
      ctx.lineTo(d.x - 5, d.y - 7);
      ctx.moveTo(d.x - 1, d.y - 3);
      ctx.lineTo(d.x + 5, d.y + 1);
      ctx.moveTo(d.x + 8, d.y + 5);
      ctx.lineTo(d.x + 13, d.y + 7);
      ctx.stroke();
      // Center void gap
      ctx.fillStyle = "rgba(2, 6, 23, 0.95)";
      ctx.beginPath();
      ctx.ellipse(d.x, d.y, 4.5, 2.2, 0.25, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "pinhole": {
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.95)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 5, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    default: {
      ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
      ctx.beginPath();
      ctx.arc(d.x, d.y, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }
  ctx.restore();
}

function drawAiBoundingBox(ctx, d, mode, canvasWidth, cfg) {
  ctx.save();
  const bw = 38;
  const bh = 32;
  const fabricLeft = ((cfg && cfg.fabricMinX) || 0.35) * canvasWidth;
  const fabricRight = ((cfg && cfg.fabricMaxX) || 0.65) * canvasWidth;

  // Ensure bounding box center is strictly inside fabric web
  const bx = Math.max(fabricLeft + 4, Math.min(fabricRight - bw - 4, d.x - bw / 2));
  const by = d.y - bh / 2;

  let color = "#06B6D4"; // Minor cyan
  if (d.sev === "red") color = "#EF4444";
  else if (d.sev === "amber") color = "#F59E0B";

  if (mode === "heatmap") {
    // Thermal anomaly glow
    const hGrad = ctx.createRadialGradient(d.x, d.y, 2, d.x, d.y, 44);
    hGrad.addColorStop(0, "rgba(239, 68, 68, 0.85)");
    hGrad.addColorStop(0.35, "rgba(245, 158, 11, 0.6)");
    hGrad.addColorStop(0.7, "rgba(59, 130, 246, 0.3)");
    hGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = hGrad;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 44, 0, Math.PI * 2);
    ctx.fill();
  }

  // Neon box background tint
  ctx.fillStyle = color === "#EF4444" ? "rgba(239, 68, 68, 0.12)" : color === "#F59E0B" ? "rgba(245, 158, 11, 0.10)" : "rgba(6, 182, 212, 0.10)";
  ctx.fillRect(bx, by, bw, bh);

  // Corner brackets
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  const arm = 6;
  ctx.beginPath();
  // TL
  ctx.moveTo(bx, by + arm); ctx.lineTo(bx, by); ctx.lineTo(bx + arm, by);
  // TR
  ctx.moveTo(bx + bw - arm, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + arm);
  // BL
  ctx.moveTo(bx, by + bh - arm); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + arm, by + bh);
  // BR
  ctx.moveTo(bx + bw - arm, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - arm);
  ctx.stroke();

  // Floating detection badge - strictly centered and clamped within the fabric area
  const label = `AI: ${d.name} · ${d.conf.toFixed(1)}%`;
  ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
  const txtW = ctx.measureText(label).width;
  const tagX = Math.max(fabricLeft + 4, Math.min(fabricRight - txtW - 8, d.x - txtW / 2));
  const tagY = by - 6;

  ctx.fillStyle = "rgba(15, 23, 42, 0.94)";
  ctx.fillRect(tagX - 3, tagY - 9, txtW + 6, 11);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.strokeRect(tagX - 3, tagY - 9, txtW + 6, 11);

  ctx.fillStyle = color;
  ctx.fillText(label, tagX, tagY);
  ctx.restore();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

