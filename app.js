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
    document.getElementById("productionPlanningView"),
    document.getElementById("energyUtilitiesView"),
    document.getElementById("complianceTraceabilityView"),
    document.getElementById("dashboardView"),
    document.getElementById("millKnowledgeCopilotView")
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

function showProductionPlanningView() {
  const planningView = document.getElementById("productionPlanningView");
  if (!planningView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "production-planning";
  planningView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.pushState(null, "", "#production-planning");
}

function showEnergyUtilitiesView() {
  const energyView = document.getElementById("energyUtilitiesView");
  if (!energyView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "energy-utilities";
  energyView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.pushState(null, "", "#energy-utilities");
}

function showComplianceTraceabilityView() {
  const complianceView = document.getElementById("complianceTraceabilityView");
  if (!complianceView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "compliance-traceability";
  complianceView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.pushState(null, "", "#compliance-traceability");
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

function showMillKnowledgeCopilotView() {
  const copilotView = document.getElementById("millKnowledgeCopilotView");
  if (!copilotView) return;

  sfx.playDashboardOpen();
  hideAllViews();
  currentSubModule = "mill-knowledge";
  copilotView.style.display = "flex";
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.pushState(null, "", "#mill-knowledge-copilot");

  if (typeof window.ensureCopilotReady === "function") {
    window.ensureCopilotReady();
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
window.showProductionPlanningView = showProductionPlanningView;
window.showEnergyUtilitiesView = showEnergyUtilitiesView;
window.showComplianceTraceabilityView = showComplianceTraceabilityView;
window.showMillKnowledgeCopilotView = showMillKnowledgeCopilotView;
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
      } else if (moduleId === "production-planning") {
        showProductionPlanningView();
      } else if (moduleId === "energy-utilities") {
        showEnergyUtilitiesView();
      } else if (moduleId === "compliance-traceability") {
        showComplianceTraceabilityView();
      } else if (moduleId === "predictive-maintenance") {
        openModuleDashboard("predictive-maintenance");
      } else if (moduleId === "mill-knowledge") {
        showMillKnowledgeCopilotView();
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
        } else if (moduleId === "production-planning") {
          showProductionPlanningView();
        } else if (moduleId === "energy-utilities") {
          showEnergyUtilitiesView();
        } else if (moduleId === "compliance-traceability") {
          showComplianceTraceabilityView();
        } else if (moduleId === "predictive-maintenance") {
          openModuleDashboard("predictive-maintenance");
        } else if (moduleId === "mill-knowledge") {
          showMillKnowledgeCopilotView();
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

  const btnBackCopilot = document.getElementById("btnBackFromCopilot");
  if (btnBackCopilot) {
    btnBackCopilot.addEventListener("click", () => {
      sfx.playClick();
      showProcessingModulesView();
    });
  }

  const btnBackPlanning = document.getElementById("btnBackFromPlanning");
  if (btnBackPlanning) {
    btnBackPlanning.addEventListener("click", () => {
      sfx.playClick();
      showProcessingModulesView();
    });
  }

  const btnBackEnergy = document.getElementById("btnBackFromEnergy");
  if (btnBackEnergy) {
    btnBackEnergy.addEventListener("click", () => {
      sfx.playClick();
      showProcessingModulesView();
    });
  }

  const btnBackCompliance = document.getElementById("btnBackFromCompliance");
  if (btnBackCompliance) {
    btnBackCompliance.addEventListener("click", () => {
      sfx.playClick();
      showProcessingModulesView();
    });
  }

  // Back buttons for Color Intelligence Inspection Views
  [
    "btnBackFromDyeing",
    "btnBackFromPrinting",
    "btnBackFromBleaching",
    "btnBackFromMercerizing",
    "btnBackFromStenter"
  ].forEach((backId) => {
    const bBtn = document.getElementById(backId);
    if (bBtn) {
      bBtn.addEventListener("click", () => {
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
      const copilotView = document.getElementById("millKnowledgeCopilotView");
      const planningView = document.getElementById("productionPlanningView");
      const energyView = document.getElementById("energyUtilitiesView");
      const complianceView = document.getElementById("complianceTraceabilityView");

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
      } else if (planningView && planningView.style.display !== "none") {
        sfx.playClick();
        showProcessingModulesView();
      } else if (energyView && energyView.style.display !== "none") {
        sfx.playClick();
        showProcessingModulesView();
      } else if (complianceView && complianceView.style.display !== "none") {
        sfx.playClick();
        showProcessingModulesView();
      } else if (copilotView && copilotView.style.display !== "none") {
        sfx.playClick();
        showProcessingModulesView();
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
// 3B. SECTOR CARDS TELEMETRY REAL-TIME FLUCTUATION
// ==========================================================================
function initSectorCardsTelemetry() {
  const mainView = document.getElementById("mainPageView");
  const procView = document.getElementById("processingModulesView");
  const colorView = document.getElementById("colorIntelligenceSubView");
  const fabricView = document.getElementById("fabricInspectionSubView");

  const groups = [
    {
      getView: () => mainView,
      items: [
        { id: "spinValSpindle", base: 21480, amp: 55, decimals: 0, comma: true },
        { id: "spinValCount", base: 30.2, amp: 0.12, decimals: 1 },
        { id: "spinValEff", base: 98.6, amp: 0.35, decimals: 1 },
        { id: "weavValInsertion", base: 845, amp: 8, decimals: 0 },
        { id: "weavValEff", base: 96.4, amp: 0.4, decimals: 1 },
        { id: "weavValTension", base: 248, amp: 4, decimals: 0 },
        { id: "procValVelocity", base: 48.5, amp: 0.8, decimals: 1 },
        { id: "procValColor", base: 0.18, amp: 0.02, decimals: 2 },
        { id: "procValSteam", base: 8.20, amp: 0.08, decimals: 2 },
        { id: "stitchValVelocity", base: 4250, amp: 30, decimals: 0, comma: true },
        { id: "stitchValOutput", base: 1280, amp: 12, decimals: 0, comma: true },
        { id: "stitchValYield", base: 99.2, amp: 0.25, decimals: 1 }
      ]
    },
    {
      getView: () => procView,
      items: [
        { id: "modValColVar", base: 0.14, amp: 0.02, decimals: 2 },
        { id: "modValColRec", base: 99.4, amp: 0.2, decimals: 1 },
        { id: "modValColYld", base: 97.8, amp: 0.3, decimals: 1 },
        { id: "modValVisDet", base: 99.8, amp: 0.1, decimals: 1 },
        { id: "modValVisSpd", base: 112, amp: 3, decimals: 0 },
        { id: "modValVisRej", base: 0.04, amp: 0.01, decimals: 2 },
        { id: "modValEngStm", base: 2.42, amp: 0.05, decimals: 2 },
        { id: "modValEngPwr", base: 1840, amp: 25, decimals: 0, comma: true },
        { id: "modValEngRec", base: 88.5, amp: 0.4, decimals: 1 },
        { id: "modValPlnOee", base: 94.6, amp: 0.3, decimals: 1 },
        { id: "modValPlnOtp", base: 98.2, amp: 0.2, decimals: 1 },
        { id: "modValPlnChg", base: -38, amp: 1, decimals: 0 },
        { id: "modValMntHlt", base: 97.4, amp: 0.3, decimals: 1 },
        { id: "modValMntVib", base: 1.22, amp: 0.04, decimals: 2 },
        { id: "modValMntUpt", base: 99.9, amp: 0.05, decimals: 1 },
        { id: "modValCmpAud", base: 100, amp: 0.1, decimals: 0 },
        { id: "modValCmpCar", base: 2.48, amp: 0.04, decimals: 2 },
        { id: "modValCmpWat", base: 86.2, amp: 0.8, decimals: 1 },
        { id: "modValMilLat", base: 185, amp: 12, decimals: 0 },
        { id: "modValMilAcc", base: 99.2, amp: 0.2, decimals: 1 },
        { id: "modValMilQry", base: 1420, amp: 15, decimals: 0, comma: true }
      ]
    },
    {
      getView: () => colorView,
      items: [
        { id: "ciValDyeDev", base: 0.12, amp: 0.02, decimals: 2 },
        { id: "ciValDyeTmp", base: 98.4, amp: 0.3, decimals: 1 },
        { id: "ciValDyeExh", base: 96.8, amp: 0.2, decimals: 1 },
        { id: "ciValPrnReg", base: 0.02, amp: 0.005, decimals: 3 },
        { id: "ciValPrnSpd", base: 42.5, amp: 0.6, decimals: 1 },
        { id: "ciValPrnVis", base: 24.2, amp: 0.4, decimals: 1 },
        { id: "ciValBlcWht", base: 78.4, amp: 0.4, decimals: 1 },
        { id: "ciValBlcCon", base: 4.2, amp: 0.1, decimals: 1 },
        { id: "ciValBlcTen", base: 97.6, amp: 0.2, decimals: 1 },
        { id: "ciValMrcStr", base: 28.5, amp: 0.2, decimals: 1 },
        { id: "ciValMrcLus", base: 94.2, amp: 0.3, decimals: 1 },
        { id: "ciValMrcPh", base: 6.85, amp: 0.05, decimals: 2 },
        { id: "ciValFinTmp", base: 185.0, amp: 0.6, decimals: 1 },
        { id: "ciValFinPck", base: 64.2, amp: 0.5, decimals: 1 },
        { id: "ciValFinMst", base: 4.8, amp: 0.1, decimals: 1 }
      ]
    },
    {
      getView: () => fabricView,
      items: [
        { id: "fvValGrgPts", base: 12.4, amp: 0.4, decimals: 1 },
        { id: "fvValGrgSpd", base: 85.0, amp: 1.2, decimals: 1 },
        { id: "fvValGrgEff", base: 99.2, amp: 0.1, decimals: 1 },
        { id: "fvValPreUni", base: 99.1, amp: 0.2, decimals: 1 },
        { id: "fvValPreWdh", base: 182.4, amp: 0.3, decimals: 1 },
        { id: "fvValPreRat", base: 8.0, amp: 0.1, decimals: 1 },
        { id: "fvValDyeLvl", base: 99.4, amp: 0.2, decimals: 1 },
        { id: "fvValDyeDrf", base: 0.15, amp: 0.02, decimals: 2 },
        { id: "fvValDyeSpt", base: 0, amp: 0, decimals: 0 },
        { id: "fvValPrnPrf", base: 99.8, amp: 0.1, decimals: 1 },
        { id: "fvValPrnBld", base: 0.01, amp: 0.003, decimals: 3 },
        { id: "fvValPrnSpd", base: 48.0, amp: 0.8, decimals: 1 },
        { id: "fvValFinBow", base: 0.3, amp: 0.05, decimals: 2 },
        { id: "fvValFinSkw", base: 0.2, amp: 0.04, decimals: 2 },
        { id: "fvValFinGsm", base: 215, amp: 2, decimals: 0 },
        { id: "fvValFldAcc", base: 99.9, amp: 0.05, decimals: 1 },
        { id: "fvValFldPkg", base: 142, amp: 4, decimals: 0 },
        { id: "fvValFldYld", base: 98.7, amp: 0.2, decimals: 1 }
      ]
    }
  ];

  groups.forEach((g, gIdx) => {
    g.items.forEach((m, mIdx) => {
      m.el = document.getElementById(m.id);
      m.phaseOff = gIdx * 1.8 + mIdx * 0.73;
      m.freq = 0.52 + ((gIdx + mIdx) % 4) * 0.13;
    });
  });

  let tPhase = 0;
  setInterval(() => {
    tPhase += 0.35;
    groups.forEach((g) => {
      const view = g.getView();
      if (view && view.style.display === "none") return;
      g.items.forEach((m) => {
        if (!m.el) {
          m.el = document.getElementById(m.id);
          if (!m.el) return;
        }
        if (m.amp === 0) return;
        const liveVal = m.base + Math.sin(tPhase * m.freq + m.phaseOff) * m.amp;
        m.el.textContent = m.decimals === 0
          ? (m.comma ? Math.round(liveVal).toLocaleString("en-US") : String(Math.round(liveVal)))
          : liveVal.toFixed(m.decimals);
      });
    });
  }, 750);
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
    } else if (hash === "#production-planning" || hash === "#processing-production-planning") {
      showProductionPlanningView();
    } else if (hash === "#energy-utilities" || hash === "#processing-energy-utilities") {
      showEnergyUtilitiesView();
    } else if (hash === "#compliance-traceability" || hash === "#processing-compliance-traceability") {
      showComplianceTraceabilityView();
    } else if (hash === "#color-intelligence-suite" || hash === "#color-intelligence") {
      showColorIntelligenceSubView();
    } else if (hash === "#fabric-inspection-suite" || hash === "#fabric-vision") {
      showFabricInspectionSubView();
    } else if (hash === "#mill-knowledge-copilot" || hash === "#mill-knowledge") {
      showMillKnowledgeCopilotView();
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
  inTemp: 84.1,
  inRH: 8.8,
  filterADiff: 1.80,
  filterBDiff: 0.90,
  sysPress: 8.20,
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

    // 1. Intake Feedwater Temperature & pH Drift
    scadaState.inTemp = +(84.1 + Math.sin(t * 0.7) * 0.25).toFixed(1);
    scadaState.inRH = +(8.8 + Math.cos(t * 0.5) * 0.05).toFixed(1);
    const inTempEl = document.getElementById("scadaInTemp");
    const inRHEl = document.getElementById("scadaInRH");
    if (inTempEl) inTempEl.textContent = `${scadaState.inTemp}°C`;
    if (inRHEl) inRHEl.textContent = `${scadaState.inRH}`;

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
    scadaState.sysPress = +(8.20 + Math.sin(t * 1.1) * 0.04).toFixed(2);
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
      if (tagEl) tagEl.textContent = `BLR-${idx + 1}`;
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

    if (typeof window._tickScadaHud === "function") {
      window._tickScadaHud();
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

  let activeHudUpdater = null;

  function positionHud(x, y) {
    if (!hud || !container) return;
    const cWidth = container.clientWidth || 1060;
    const cHeight = container.clientHeight || 920;
    const hWidth = hud.offsetWidth || 280;
    const hHeight = hud.offsetHeight || 190;

    // Horizontal clamping within SCADA container
    const clampedX = Math.max(hWidth / 2 + 12, Math.min(cWidth - hWidth / 2 - 12, x));
    hud.style.left = `${clampedX}px`;

    // Vertical clearance check: need at least hHeight + 24px above to not cut off
    const needHeight = hHeight + 24;
    if (y < needHeight) {
      hud.classList.add("pos-below");
      const maxTop = cHeight - hHeight - 20;
      hud.style.top = `${Math.min(maxTop, Math.max(10, y))}px`;
    } else {
      hud.classList.remove("pos-below");
      hud.style.top = `${Math.max(needHeight, Math.min(cHeight - 20, y))}px`;
    }
  }

  function renderHudHtml(title, tag, rows, statusText = "OPTIMAL", statusType = "status-ok") {
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
  }

  function showHud(x, y, title, tag, rows, statusText = "OPTIMAL", statusType = "status-ok", updater = null) {
    activeHudUpdater = updater;
    renderHudHtml(title, tag, rows, statusText, statusType);
    hud.classList.add("visible");
    positionHud(x, y);
  }

  function hideHud() {
    activeHudUpdater = null;
    hud.classList.remove("visible");
  }

  window._tickScadaHud = function() {
    if (hud && hud.classList.contains("visible") && typeof activeHudUpdater === "function") {
      activeHudUpdater();
    }
  };

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
          ["Media", "High-Pressure Steam (ASME SA-312)"],
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
          ["Rating", "ASME Class 300 / 316L SS"],
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
        `Industrial Steam Boiler ${compNum + 1}`,
        `BLR-UNIT-0${compNum + 1}`,
        [
          ["Burner / Firing Rate", isRun ? "88.5% (High Fire)" : "0.0% (Standby)"],
          ["Feedwater Pump", isRun ? `${scadaState.compRPMs[compNum]} RPM` : "0 RPM"],
          ["Steam Output Temp", isRun ? "175.4°C (Sat. Steam)" : "85.0°C (Hot Standby)"],
          ["Header Pressure", isRun ? "8.20 bar" : "0.0 bar"]
        ],
        isRun ? "FIRING NOMINAL" : "STANDBY IDLE",
        isRun ? "status-ok" : "status-warn"
      );
    });

    function getCompData(compNum) {
      const isRun = scadaState.compRunning[compNum];
      const rpm = scadaState.compRPMs[compNum];
      const t = Date.now() / 1000;
      const vib = isRun ? `${(1.2 + Math.sin(t * 1.5 + compNum) * 0.08).toFixed(2)} mm/s RMS (Good)` : "0.0 mm/s";
      return {
        title: `Industrial Steam Boiler ${compNum + 1}`,
        tag: `BLR-UNIT-0${compNum + 1}`,
        rows: [
          ["Status", isRun ? "Active Firing (ASME Sec. I)" : "Standby Reserve"],
          ["Feed Pump RPM", `${rpm} RPM`],
          ["Vibration", vib],
          ["Command", "Click to Toggle Boiler Firing / Standby"]
        ],
        statusText: isRun ? "OPTIMAL" : "OFFLINE",
        statusType: isRun ? "status-ok" : "status-warn"
      };
    }

    comp.addEventListener("mouseenter", () => {
      sfx.playHover();
      const compNum = parseInt(comp.getAttribute("data-comp"), 10) - 1;
      const rect = comp.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getCompData(compNum);
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getCompData(compNum);
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });

    comp.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
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
    function getTankData(name) {
      const p = name === "Alpha" ? scadaState.alphaBar : name === "Beta" ? scadaState.betaBar : scadaState.sysPress;
      const t = Date.now() / 1000;
      const temp = (175.4 + Math.sin(t * 0.8) * 0.4).toFixed(1);
      const isBuffer = name === "Secondary Buffer" || name === "Flash Condensate Recovery Tank";
      const isBlowdown = name === "Auto-Drain Condensate Tank" || name.includes("Blowdown") || name.includes("Recovery & Drain");
      return {
        title: isBuffer ? "Flash Condensate Recovery Tank" : isBlowdown ? "Boiler Continuous Blowdown & Heat Recovery Tank" : `Steam Accumulator Vessel ${name}`,
        tag: `TK-${name.toUpperCase().replace(/[^A-Z0-9]/g, '-')}`,
        rows: [
          ["Operating Pressure", `${p} bar`],
          ["Vessel Capacity", isBuffer ? "8,000 Liters (Flash Steam Recovery)" : isBlowdown ? "6,000 Liters (Heat Exchanger Loop)" : "15,000 Liters (Steam Cushion)"],
          ["Thermal Enthalpy", "2,773 kJ/kg (Sat. Vapor)"],
          ["Core Saturation Temp", `${temp}°C`]
        ],
        statusText: "CHARGED NOMINAL",
        statusType: "status-ok"
      };
    }

    tank.addEventListener("mouseenter", () => {
      sfx.playHover();
      const name = tank.getAttribute("data-tank") || "Vessel";
      const rect = tank.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getTankData(name);
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getTankData(name);
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });
    tank.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    tank.addEventListener("mouseleave", hideHud);
  });

  // 6. Interactive Radar Chart Dots
  document.querySelectorAll(".radar-dot").forEach((dot) => {
    function getRadarDotData() {
      const metric = dot.getAttribute("data-metric");
      const idx = ["liquorRatio", "bathTemp", "phStability", "fixationYield", "exhaustionRate"].indexOf(metric);
      const val = idx >= 0 && scadaState.radarValues ? scadaState.radarValues[idx] : dot.getAttribute("data-val");
      return {
        title: "Thermal Efficiency & Steam Quality Index",
        tag: metric ? metric.toUpperCase() : "STEAM-QUALITY",
        rows: [
          ["Index Score", `${val} / 100`],
          ["Compliance", "ASME Sec. I / EN 12953 Standard"],
          ["Target Threshold", ">= 75.0% Pass"]
        ],
        statusText: parseInt(val, 10) >= 70 ? "PASSED (CLASS 1)" : "WARNING",
        statusType: parseInt(val, 10) >= 70 ? "status-ok" : "status-warn"
      };
    }

    dot.addEventListener("mouseenter", () => {
      sfx.playHover();
      const rect = dot.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getRadarDotData();
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getRadarDotData();
      showHud(
        rect.left - cRect.left,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });
    dot.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    dot.addEventListener("mouseleave", hideHud);
  });

  // 7. Interactive Gauges Hover (All Pressure & Differential Meters)
  document.querySelectorAll(".interactive-gauge").forEach((gauge) => {
    function getGaugeData() {
      const lbl = gauge.getAttribute("data-label") || "Pressure Gauge";
      const id = gauge.id;
      let val = `${scadaState.sysPress} bar`;
      let detail = "Main Steam Header Pressure (8.2 bar)";
      if (id === "dialFilterA") {
        val = `Diff: ${scadaState.filterADiff} psi`;
        detail = "Feedwater Pre-Filter A Differential (Clean)";
      } else if (id === "dialFilterB") {
        val = aiAnomalyActive ? "Diff: 2.94 psi (ALERT)" : `Diff: ${scadaState.filterBDiff} psi`;
        detail = "Feedwater Demin Filter B Differential (Coalescing)";
      } else if (id === "dialSysPressTop" || id === "dialSysPressL2") {
        val = `${scadaState.sysPress} bar`;
        detail = "Steam Header & Return Loop Calibration";
      }
      return {
        title: lbl,
        tag: id.toUpperCase(),
        rows: [
          ["Live Value", val],
          ["Calibration", "ISO/IEC 17025 Certified"],
          ["Target Spec", detail]
        ],
        statusText: aiAnomalyActive && id === "dialFilterB" ? "CRITICAL ANOMALY" : "CALIBRATED OK",
        statusType: aiAnomalyActive && id === "dialFilterB" ? "status-alert" : "status-ok"
      };
    }

    gauge.addEventListener("mouseenter", () => {
      sfx.playHover();
      const rect = gauge.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getGaugeData();
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getGaugeData();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });
    gauge.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    gauge.addEventListener("mouseleave", hideHud);
  });

  // 8. Interactive Intake Duct
  const intake = document.getElementById("intakeSection");
  if (intake) {
    function getIntakeData() {
      return {
        title: "Feedwater Intake & Economizer Pre-Heat Module",
        tag: "FEED-WATER-INLET",
        rows: [
          ["Feedwater Temp", `${scadaState.inTemp}°C`],
          ["Feedwater pH Level", `${scadaState.inRH} pH (Deaerated)`],
          ["Pre-Heat Medium", "Flue Gas Economizer Tube Bank"],
          ["ASME Deaeration", "Dissolved O2 < 7 ppb (Active)"]
        ],
        statusText: "NOMINAL FLOW",
        statusType: "status-ok"
      };
    }

    intake.addEventListener("mouseenter", () => {
      sfx.playHover();
      const rect = intake.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getIntakeData();
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getIntakeData();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });
    intake.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    intake.addEventListener("mouseleave", hideHud);
  }

  // 9. Interactive Vessels
  document.querySelectorAll(".interactive-vessel").forEach((vessel) => {
    vessel.addEventListener("mouseenter", () => {
      sfx.playHover();
      const name = vessel.getAttribute("data-vessel") || "Treatment Vessel";
      const rect = vessel.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        name,
        "FEED-DEMIN-ASME",
        [
          ["Operating Pressure", `${scadaState.sysPress} bar`],
          ["Max Design Pressure", "16.0 bar @ 220°C"],
          ["Demin Resin Life", "94.2% (7,200 hrs remaining)"]
        ],
        "ONLINE",
        "status-ok"
      );
    });
    vessel.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    vessel.addEventListener("mouseleave", hideHud);
  });

  // 10. Interactive Telemetry Stations (Boiler 1-4 Bars & Sight Glasses)
  document.querySelectorAll(".interactive-telemetry-station").forEach((st) => {
    function getStationData() {
      const sNum = parseInt(st.getAttribute("data-station"), 10);
      const title = st.getAttribute("data-title") || `Industrial Steam Boiler ${sNum}`;
      const t = Date.now() / 1000;
      const drumLevel = Math.round(78 + Math.sin(t * 1.1 + sNum) * 1.5);
      const qual = (99.6 + Math.cos(t * 0.7 + sNum) * 0.1).toFixed(1);
      return {
        title: `${title} Telemetry`,
        tag: `BLR-0${sNum}`,
        rows: [
          ["Feed Pump Speed", `${scadaState.compRPMs[sNum - 1]} RPM`],
          ["Steam Drum Level", `${drumLevel}% (NWL Gauge Glass)`],
          ["Boiler Operational State", scadaState.compRunning[sNum - 1] ? "Active Firing / Steam Generation" : "Standby Reserve"],
          ["Steam Quality Index", `${qual}% Dryness Fraction`]
        ],
        statusText: scadaState.compRunning[sNum - 1] ? "ONLINE" : "STANDBY",
        statusType: scadaState.compRunning[sNum - 1] ? "status-ok" : "status-warn"
      };
    }

    st.addEventListener("mouseenter", () => {
      sfx.playHover();
      const rect = st.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();
      const updater = () => {
        const d = getStationData();
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };
      const d = getStationData();
      showHud(
        rect.left - cRect.left + rect.width / 2,
        rect.top - cRect.top,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    });
    st.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      }
    });
    st.addEventListener("mouseleave", hideHud);
  });

  // 11. Interactive Pipes
  document.querySelectorAll(".interactive-pipe").forEach((pipe) => {
    pipe.addEventListener("mouseenter", () => {
      sfx.playHover();
      const pName = pipe.getAttribute("data-pipe") || "Steam & Condensate Process Line";
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
          ["Media", "High-Pressure Saturated Steam / Boiler Feedwater"],
          ["Velocity", isAnomaly ? "3.2 m/s (RESTRICTED FLOW)" : "6.4 m/s (Laminar)"],
          ["Header Pressure", isAnomaly ? "5.40 bar (Loss across filter)" : "8.20 bar"],
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
    function getSparkData() {
      const title = spark.getAttribute("data-title") || "Telemetry Trend Chart";
      const id = spark.getAttribute("data-id") || "TREND-01";
      const norm = spark.getAttribute("data-norm") || "Nominal Range";
      const desc = spark.getAttribute("data-desc") || "Real-time process telemetry";
      const statusText = spark.getAttribute("data-status") || "OPTIMAL";
      const statusType = spark.getAttribute("data-statustype") || "status-ok";
      const t = Date.now() / 1000;

      let liveVal = spark.getAttribute("data-param") || "Live Signal";
      if (spark.id === "sparkRadarR1") {
        liveVal = `Flow: ${(142 + Math.sin(t * 1.4) * 1.5).toFixed(1)} L/min`;
      } else if (spark.id === "sparkRadarR2") {
        liveVal = `pH ${(6.20 + Math.sin(t * 1.1) * 0.04).toFixed(2)}`;
      } else if (spark.id === "sparkRadarR3") {
        liveVal = `${(98.6 + Math.cos(t * 1.2) * 0.2).toFixed(1)}% Exhaustion`;
      } else if (spark.id === "sparkDesorptionTop") {
        liveVal = `Flow: ${(142.1 + Math.sin(t * 1.3) * 0.8).toFixed(1)} L/min (±0.4%)`;
      } else if (spark.id === "sparkAirPurity") {
        liveVal = `Purity: ${(99.7 + Math.sin(t * 0.9) * 0.05).toFixed(2)}% Continuous`;
      } else if (spark.id === "sparkFilterA") {
        liveVal = `Diff: ${scadaState.filterADiff} psi`;
      } else if (spark.id === "sparkFilterB") {
        liveVal = aiAnomalyActive ? "Diff: 2.94 psi (ALERT)" : `Diff: ${scadaState.filterBDiff} psi`;
      }

      return {
        title,
        tag: id,
        rows: [
          ["Telemetry", liveVal],
          ["Baseline", norm],
          ["Description", desc]
        ],
        statusText,
        statusType
      };
    }

    function showSparkHud(e) {
      let mx, my;
      if (e && container) {
        const cRect = container.getBoundingClientRect();
        mx = e.clientX - cRect.left;
        my = e.clientY - cRect.top;
      } else {
        const rect = spark.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        mx = rect.left - cRect.left + rect.width / 2;
        my = rect.top - cRect.top;
      }

      const updater = () => {
        const d = getSparkData();
        renderHudHtml(d.title, d.tag, d.rows, d.statusText, d.statusType);
      };

      const d = getSparkData();
      showHud(
        mx,
        my,
        d.title,
        d.tag,
        d.rows,
        d.statusText,
        d.statusType,
        updater
      );
    }

    spark.addEventListener("mouseenter", (e) => {
      sfx.playHover();
      showSparkHud(e);
    });
    spark.addEventListener("mousemove", (e) => {
      if (container && hud.classList.contains("visible")) {
        const cRect = container.getBoundingClientRect();
        positionHud(e.clientX - cRect.left, e.clientY - cRect.top);
      } else {
        showSparkHud(e);
      }
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
    componentName: "Feedwater Demin Filter B (Micro-Coalescing)",
    shortName: "Feed Filter B",
    metricSpike: "ΔP: 2.94 psi (High Spike)",
    metricNorm: "0.90 psi (Limit: 1.40 psi)",
    severity: "CRITICAL",
    explanation: "AI SCADA Sentinel detected ion-exchange resin particulate fouling exceeding ASME Section I threshold in Boiler #3 feedwater train.",
    actionSummary: "Divert feedwater stream to Standby Filter A & initiate automated backwash purge",
    normValElId: "scadaFilterBDiff",
    normVal: "Diff: 0.90 psi",
    spikeVal: "Diff: 2.94 psi (ALERT)",
    defaultX: 470,
    defaultY: 160
  },
  {
    componentId: "compressor_3",
    pipeIds: [],
    componentName: "Industrial Steam Boiler 3 (Feedwater Pump Drive)",
    shortName: "Steam Boiler 3",
    metricSpike: "Vibration: 4.8 mm/s RMS (Harmonic Surge)",
    metricNorm: "1.2 mm/s (ISO 10816 Limit: 2.8)",
    severity: "WARNING",
    explanation: "AI Acoustic Sentinel detected multistage pump cavitation and feedwater inlet pressure drop at 899 RPM. Risk of thermal shock without AI firing re-balancing.",
    actionSummary: "Throttle feed pump VFD & transfer steam load to Boiler 1",
    normValElId: "scadaComp3Rpm",
    normVal: "899 RPM",
    spikeVal: "899 RPM (VIB ALERT)",
    defaultX: 836,
    defaultY: 340
  },
  {
    componentId: "tank_Beta",
    pipeIds: ["valveBetaOutlet"],
    componentName: "Steam Accumulator Vessel Beta (15,000L ASME)",
    shortName: "Accumulator Beta",
    metricSpike: "Thermal Enthalpy Drift (ΔH 14 kJ/kg)",
    metricNorm: "Nominal (2,773 kJ/kg)",
    severity: "HIGH RISK",
    explanation: "AI Enthalpy Sentinel detected saturation temperature drop in Steam Accumulator Beta. Risk of wet steam carryover to textile dye house main header.",
    actionSummary: "Trigger rapid steam charge intertie valve & swap header balancing loop",
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
        desc: "Closed-loop spectrophotometer inline color matching. Zero metamerism detected against master shade standard."
      },
      {
        title: "Recipe Auto-Correction Rate",
        metric: "99.2%",
        desc: "Autonomous dye liquor dispensing dynamic adjustments based on real-time textile substrate reflectance."
      },
      {
        title: "Auxiliary Chemical Dosing",
        metric: "2.4 mL/kg",
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
    subtitle: "Digital Product Passport, GOTS, OEKO-TEX & ZDHC Level 3 · EU DPP rules finalizing 2027 — compliance expected ~2028",
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
    const tolerance = parseFloat(inputTol?.value) || 0.50;
    const baseReflectance = Math.max(3, Math.min(25, targetL * 0.22));

    // Calculate peak wavelength for display
    let peakWl = 460;
    if (targetRNorm > targetBNorm && targetRNorm > targetGNorm) peakWl = 635;
    else if (targetGNorm > targetBNorm) peakWl = 530;
    if (statPeakWavelength) statPeakWavelength.textContent = `${peakWl}nm`;

    if (currentChartMode === "spectral") {
      // Calculate 16 spectral reflectance points for Target Standard & Live Sensor Feed
      const targetPts = [];
      const livePts = [];
      const mRgb = hexToRgb(measured.hex);
      const mBase = Math.max(3, Math.min(25, measured.L * 0.22));

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
        const mBlue = (mRgb.b / 255) * 48 * Math.exp(-Math.pow(wl - 460, 2) / (2 * Math.pow(38, 2)));
        const mGreen = (mRgb.g / 255) * 44 * Math.exp(-Math.pow(wl - 535, 2) / (2 * Math.pow(42, 2)));
        const mRed = (mRgb.r / 255) * 52 * Math.exp(-Math.pow(wl - 635, 2) / (2 * Math.pow(46, 2)));
        const measuredReflectance = mBase + mBlue + mGreen + mRed;
        const liveReflectance = Math.max(1, measuredReflectance + sensorDrift);
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

      // Draw baseline zero setpoint and dynamic tolerance corridor
      const zeroY = 52;
      const tolSpan = Math.max(6, Math.min(36, (tolerance / 0.50) * 24));
      const upperTolY = zeroY - tolSpan;
      const lowerTolY = zeroY + tolSpan;

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

    scanPhase += 0.018;
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
      const targetL = parseFloat(inputL?.value) ?? cfg.defaultL;
      const targetA = parseFloat(inputA?.value) ?? cfg.defaultA;
      const targetB = parseFloat(inputB?.value) ?? cfg.defaultB;
      const tolerance = parseFloat(inputTol?.value) ?? cfg.defaultTol;

      for (let i = 0; i < wavelengths.length; i++) {
        const wl = wavelengths[i];
        const x = getXForWavelength(wl);
        let targetReflectance, liveReflectance;

        if (cfg.visionMode) {
          const posRatio = i / (wavelengths.length - 1);
          const harmA = Math.sin(posRatio * Math.PI * 2 + scanPhase * 0.15) * (targetA * 0.35);
          const harmB = Math.cos(posRatio * Math.PI * 3 + scanPhase * 0.1) * (targetB * 0.25);
          targetReflectance = Math.max(0, Math.min(85, targetL + harmA + harmB));

          const mHarmA = Math.sin(posRatio * Math.PI * 2) * (measured.a * 0.35);
          const mHarmB = Math.cos(posRatio * Math.PI * 3) * (measured.b * 0.25);
          const sensorDrift = Math.sin(scanPhase * 0.8 + i * 0.4) * 0.7 + Math.cos(scanPhase * 1.5 + i * 0.2) * 0.3;
          liveReflectance = Math.max(0, measured.L + mHarmA + mHarmB + sensorDrift);
        } else {
          const peakDist = Math.abs(wl - cfg.peakWl);
          const primaryPeak = 38 * Math.exp(-Math.pow(peakDist, 2) / (2 * Math.pow(42, 2)));
          const baseReflectance = Math.max(2, Math.min(25, targetL * 0.25));
          targetReflectance = baseReflectance + primaryPeak * (targetRNorm * 0.4 + targetGNorm * 0.3 + targetBNorm * 0.3);

          const mHex = measured.hex || labToHex(measured.L, measured.a, measured.b);
          const mRgb = hexToRgb(mHex);
          const mBase = Math.max(2, Math.min(25, measured.L * 0.25));
          const mReflectance = mBase + primaryPeak * ((mRgb.r / 255) * 0.4 + (mRgb.g / 255) * 0.3 + (mRgb.b / 255) * 0.3);
          const sensorDrift = Math.sin(scanPhase * 0.8 + i * 0.4) * 0.7 + Math.cos(scanPhase * 1.5 + i * 0.2) * 0.3;
          liveReflectance = Math.max(1, mReflectance + sensorDrift);
        }

        const targetY = getYForReflectance(targetReflectance);
        const liveY = getYForReflectance(liveReflectance);
        targetPts.push({ x, y: targetY });
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

      const tolerance = parseFloat(inputTol?.value) || cfg.defaultTol;
      const tolSpan = Math.max(6, Math.min(36, (tolerance / (cfg.defaultTol || 0.5)) * 24));
      const zeroY = 52, upperTolY = zeroY - tolSpan, lowerTolY = zeroY + tolSpan;
      if (targetCurvePath) targetCurvePath.setAttribute("d", `M ${chartXStart} ${zeroY} L ${chartXEnd} ${zeroY}`);
      if (deltaAreaPath) deltaAreaPath.setAttribute("d", `M ${chartXStart} ${upperTolY} L ${chartXEnd} ${upperTolY} L ${chartXEnd} ${lowerTolY} L ${chartXStart} ${lowerTolY} Z`);

      const dx = chartWidth / (streamCapacity - 1);
      let streamD = "";
      for (let i = 0; i < streamHistory.length; i++) {
        const x = chartXStart + i * dx;
        const y = zeroY - (streamHistory[i] / (tolerance || 0.5)) * tolSpan;
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
// 10. MILL KNOWLEDGE COPILOT (GUIDED TOPIC TREE)
// ==========================================================================
const COPILOT_ROOT_IDS = [
  "shift-help",
  "color-pass",
  "fabric-trace",
  "aj003",
  "energy",
  "handover",
  "passport"
];

const COPILOT_KNOWLEDGE = {
  "shift-help": {
    tag: "SHIFT",
    tagClass: "tag-shift",
    prompt: "What can you help with on this shift?",
    topic: "Shift briefing",
    source: "Mill Knowledge Copilot · Shift A",
    metric: { label: "SOP library", value: "1,240" },
    body: [
      "I am the mill’s shift engineering assistant. I retrieve SOPs, summarise handover, and explain what the textile AI modules are seeing — without taking the final decision away from you.",
      "Work the operating loop with me: observe the signal, understand the evidence, decide the next action, act with an owner, then verify the outcome."
    ],
    steps: [
      "Color Intelligence — shade prediction, ΔE, recipe correction",
      "Fabric Vision — defect location, roll grade, loom trace-back",
      "Predictive Maintenance — asset risk, work orders, verification",
      "Energy, Planning, Compliance — utilities, OEE, passport evidence"
    ],
    followUps: ["shift-first-look", "handover", "shift-approvals"]
  },
  "shift-first-look": {
    tag: "SHIFT",
    tagClass: "tag-shift",
    prompt: "Where should I look first on Shift A?",
    topic: "Shift briefing",
    source: "Mill Knowledge · Start of shift",
    metric: { label: "Open watch items", value: "2" },
    body: [
      "Start with the two items that can still move today’s plan: shade on Lot TEX-8821 and the reliability watch on air-jet AJ-003.",
      "Everything else on Shift A is stable — three batch transitions completed, zero safety incidents, compressed air at 99.8% uptime."
    ],
    steps: [
      "Open Color Intelligence if you own the Royal Navy #8821 lot",
      "Open Predictive Maintenance if you own AJ-003",
      "Use handover if you are receiving the next shift"
    ],
    followUps: ["color-pass", "aj003", "handover"]
  },
  "shift-approvals": {
    tag: "SHIFT",
    tagClass: "tag-shift",
    prompt: "Which actions still need a person to approve?",
    topic: "Shift briefing",
    source: "Mill Knowledge · Control boundary",
    metric: { label: "Human gates", value: "3" },
    body: [
      "The copilot can surface evidence and a recommended next step. Colour correction, maintenance work and final quality acceptance stay with a qualified person.",
      "If a recommendation is declined, keep the reason on the record so the next shift sees why the plant stayed on the current path."
    ],
    steps: [
      "Shade correction — dyer or quality accepts dosing change",
      "AJ-003 — maintenance supervisor assigns the work order",
      "Roll disposition — quality decides hold, cut-out or release"
    ],
    followUps: ["color-operator-gate", "aj003-workorder", "fabric-contain"]
  },
  "color-pass": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "How does Color Intelligence decide if a dye batch will pass?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Dyeing",
    metric: { label: "Live ΔE vs Royal Navy #8821", value: "0.18" },
    body: [
      "The decision is whether this batch will finish inside the approved customer colour tolerance. Color Intelligence never silently accepts a lot.",
      "It joins the approved recipe, comparable lot history, the live spectro curve and the customer limit, then predicts the likely final shade and explains any correction."
    ],
    steps: [
      "Approved standard — customer colour and allowed ΔE (now 0.50)",
      "Live prediction — in-line spectro updates CIE L*a*b* as the fabric runs",
      "Explained option — recipe or dosing change is shown with a reason",
      "Operator decision — accept or decline; first-time-right rate is 99.2%",
      "Final proof — instrument reading confirms pass or fail at completion"
    ],
    followUps: ["delta-e", "dye-correction", "color-operator-gate"]
  },
  "delta-e": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "What does ΔE mean on this lot?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Quality rule",
    metric: { label: "Customer ΔE limit", value: "< 0.50 PASS" },
    body: [
      "ΔE is the numerical distance between the measured colour and the approved standard. A lower number is a closer match. The customer’s configured threshold decides pass or fail — not the model.",
      "Royal Navy #8821 is running at ΔE 0.18 (L* 24.00, a* −1.80, b* −18.50). That is a MATCH against the 0.50 limit."
    ],
    steps: [
      "If live ΔE stays under 0.50, the batch stays MATCH",
      "If it drifts, review an explained dosing correction and re-measure",
      "Quality still owns final acceptance from the instrument reading"
    ],
    followUps: ["delta-e-navy", "delta-e-process-map", "delta-e-if-fails"]
  },
  "delta-e-navy": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "How is Royal Navy #8821 tracking right now?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Lot TEX-8821",
    metric: { label: "Status", value: "MATCH" },
    body: [
      "Lot TEX-8821, Royal Navy #8821, is inside tolerance. Target swatch is #1A2849. Live measured swatch is #1B294A. Spectral fit is 99.2% with peak wavelength at 460 nm.",
      "Keep the lot on the light-to-dark dye sequence. That cut vessel wash water 38% and wash downtime 45 minutes without putting shade at risk."
    ],
    steps: [
      "Hold tolerance at 0.50 — do not tighten mid-batch",
      "Watch the 400–700 nm overlay for a growing live-vs-target gap",
      "Only open a correction if ΔE starts climbing toward 0.35+"
    ],
    followUps: ["dye-correction", "handover-tex8821"]
  },
  "delta-e-process-map": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "How do other wet processes measure colour?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Process map",
    metric: { label: "Active colour lines", value: "5" },
    body: [
      "Each wet process uses the same spectro loop, but the live unit changes with the job.",
      "Dyeing and printing stay on ΔE. Bleaching watches whiteness, mercerizing watches luster, and Finish watches thermo-fixation shade plus residual moisture."
    ],
    steps: [
      "Printing — Reactive Magenta #704 at ΔE 0.19, paste viscosity in dPa·s",
      "Bleaching — Optical White #010, whiteness in Wb, peroxide in g/kg",
      "Mercerizing — Pearl Sateen #330, luster in BAN, caustic in °Bé",
      "Finish — Khaki Twill #520, ΔE 0.17, moisture as % H₂O"
    ],
    followUps: ["dye-correction"]
  },
  "delta-e-if-fails": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "What if live ΔE climbs above 0.50?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Exception",
    metric: { label: "Fail gate", value: "ΔE ≥ 0.50" },
    body: [
      "If live ΔE crosses 0.50 the lot is no longer a predicted pass. Do not wait for the end of the run — correction only helps while the batch can still be influenced.",
      "The spectro will keep streaming. Quality still makes the final call from the instrument reading after any accepted correction."
    ],
    steps: [
      "Open the live-vs-target reflectance overlay",
      "Review the suggested dye offsets before touching the recipe",
      "Accept or decline the correction with a named owner",
      "Re-measure and record the new ΔE before release"
    ],
    followUps: ["dye-correction", "color-operator-gate"]
  },
  "dye-correction": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "Walk me through a first-time-right dye correction",
    topic: "Color Intelligence",
    source: "Color Intelligence · Closed-loop dosing",
    metric: { label: "Auto-correction rate", value: "99.2%" },
    body: [
      "Correction is recommended while the batch can still be influenced — not after the lot is already off-shade.",
      "Current auxiliary dosing on this range is 2.4 mL/kg. Printing speaks in paste viscosity, bleaching in peroxide, mercerizing in caustic, and Finish in residual moisture."
    ],
    steps: [
      "Compare target vs measured swatches and the 400–700 nm overlay",
      "Review the suggested dye offset pills",
      "Recalibrate the spectro if the sensor has drifted",
      "Apply the change only after the operator accepts it",
      "Verify the new ΔE before releasing the batch"
    ],
    followUps: ["correction-now", "correction-other-processes", "correction-verify"]
  },
  "correction-now": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "Do we need a correction on the current dye lot?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Lot TEX-8821",
    metric: { label: "Recommendation", value: "Hold recipe" },
    body: [
      "No. Royal Navy #8821 is MATCH at ΔE 0.18 with 99.2% spectral fit. Opening a correction now would add chemistry and risk without moving customer acceptance.",
      "Keep watching the overlay. A correction becomes useful only if ΔE starts walking toward the 0.50 line."
    ],
    steps: [
      "Leave auxiliary dosing at 2.4 mL/kg",
      "Keep the light-to-dark sequence for the next vessel",
      "Revisit only if the live curve separates from the target"
    ],
    followUps: ["correction-verify", "handover-tex8821"]
  },
  "correction-other-processes": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "What does a correction look like after dyeing?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Process corrections",
    metric: { label: "Shared rule", value: "Explain, then approve" },
    body: [
      "The loop is the same: show the gap, recommend a change, wait for a person, then verify. Only the unit on the recommendation changes."
    ],
    steps: [
      "Printing — paste dosing, typically around 18.5 dPa·s on Magenta #704",
      "Bleaching — peroxide, around 13.8 g/kg against Optical White #010",
      "Mercerizing — caustic strength, around 27.8 °Bé",
      "Finish — residual moisture, around 4.0% H₂O on Khaki Twill #520"
    ],
    followUps: ["correction-verify"]
  },
  "correction-verify": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "How do we verify a correction actually worked?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Verify",
    metric: { label: "Proof", value: "Instrument reading" },
    body: [
      "A recommendation is not a pass. After any accepted change, wait for the next spectro window and compare ΔE, L*a*b* and the reflectance overlay with the customer standard.",
      "Record who approved the change, the time, and the new reading so the next shift can see the outcome."
    ],
    steps: [
      "Confirm live ΔE is back under 0.50",
      "Check the swatch pair still reads as a visual MATCH",
      "Close the case only after quality accepts the instrument result"
    ],
    followUps: ["color-operator-gate", "handover-evidence"]
  },
  "color-operator-gate": {
    tag: "COLOR",
    tagClass: "tag-color",
    prompt: "Who approves a shade recommendation?",
    topic: "Color Intelligence",
    source: "Color Intelligence · Control boundary",
    metric: { label: "Final owner", value: "Quality" },
    body: [
      "The dyer can accept or decline a mid-batch correction. Final lot acceptance stays with quality and the approved instrument reading.",
      "If the recommendation is declined, keep the reason with the lot. That is what prevents the next shift from repeating a change that was already judged unnecessary."
    ],
    steps: [
      "Copilot explains the predicted shade and the suggested offset",
      "Dyer accepts or declines while the batch can still be influenced",
      "Quality confirms pass or fail at completion"
    ],
    followUps: ["correction-now", "delta-e-if-fails"]
  },
  "fabric-trace": {
    tag: "VISION",
    tagClass: "tag-vision",
    prompt: "How does Fabric Vision map a defect back to the loom?",
    topic: "Fabric Vision",
    source: "Fabric Inspection & Vision AI",
    metric: { label: "Optical defect rate", value: "0.012%" },
    body: [
      "Vision inspection maps each visible defect to its exact position on the roll. The record keeps classification confidence, roll ID, production batch and the probable loom source.",
      "Quality is not an isolated final check. Apparel can see the same roll evidence before cutting."
    ],
    steps: [
      "Detect — locate and classify the defect on the roll map",
      "Trace — keep roll, batch and source loom linked",
      "Contain — quality decides hold, cut-out or downgrade",
      "Plan — apparel sees material context before cutting",
      "Recover — supervisors rebalance work to protect output"
    ],
    followUps: ["fabric-last-scan", "fabric-contain", "fabric-apparel"]
  },
  "fabric-last-scan": {
    tag: "VISION",
    tagClass: "tag-vision",
    prompt: "What did the last greige scan find?",
    topic: "Fabric Vision",
    source: "Fabric Vision · Greige",
    metric: { label: "Roll grade", value: "A+" },
    body: [
      "The last scan covered 4,820 m of greige. It found 2 broken picks and 0 oil stains. Weft/warp skew is +0.14°. ASTM D5430 is 2.1 penalty points per 100 square yards — Grade A+.",
      "Broken picks stay linked to the probable source loom so weaving can see the same record the inspection camera wrote."
    ],
    steps: [
      "No oil-stain containment is required on this roll",
      "Review the two broken-pick coordinates before the next cut plan",
      "Keep bow-and-skew compensation active"
    ],
    followUps: ["fabric-contain", "aj003"]
  },
  "fabric-contain": {
    tag: "VISION",
    tagClass: "tag-vision",
    prompt: "How should quality contain a mapped defect?",
    topic: "Fabric Vision",
    source: "Fabric Vision · Containment",
    metric: { label: "Owner", value: "Quality" },
    body: [
      "Once a defect has a roll position and a source loom, quality decides the material fate. The copilot does not release or downgrade fabric on its own.",
      "Use the roll map so cutting does not inherit a known defect as a surprise at sewing."
    ],
    steps: [
      "Hold the affected metres if the defect is critical",
      "Cut-out or downgrade if the rest of the roll is Grade A",
      "Leave the loom link intact so weaving can close the cause"
    ],
    followUps: ["fabric-apparel", "fabric-last-scan"]
  },
  "fabric-apparel": {
    tag: "VISION",
    tagClass: "tag-vision",
    prompt: "How does this reach the garment line?",
    topic: "Fabric Vision",
    source: "Fabric Vision · Apparel flow",
    metric: { label: "Line view", value: "Cut to pack" },
    body: [
      "The same roll, batch and order stay visible from cutting through bundling, sewing, inline quality, finishing and packing.",
      "If a roll is held or partially cut out, the line sees the material context and can rebalance bundles instead of discovering a shortage at packing."
    ],
    steps: [
      "Cutting receives the roll map and remaining usable length",
      "Supervisors move people or bundles if a hold creates a gap",
      "Output is judged against the order target, not just machine speed"
    ],
    followUps: ["handover-tex8821"]
  },
  "aj003": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "What should we do if AJ-003 vibration rises?",
    topic: "Predictive Maintenance",
    source: "Predictive Maintenance · Air-jet AJ-003",
    metric: { label: "Required human gate", value: "Approve work order" },
    body: [
      "If air-jet loom AJ-003 drifts from its recent normal — vibration, temperature, miss-picks and unplanned stops moving together — treat it as an emerging reliability concern, not a single unexplained alarm.",
      "The platform ranks the risk against other plant issues and shows contributing evidence. A qualified person still confirms the physical cause."
    ],
    steps: [
      "Early warning — related signs move beyond the recent baseline",
      "Prioritised alert — compare AJ-003 with other open plant risks",
      "Investigation — review evidence, timing and asset history together",
      "Maintenance action — assign owner, due time and priority",
      "Verification — record findings and confirm the asset response"
    ],
    followUps: ["aj003-evidence", "aj003-workorder", "pressure-drop"]
  },
  "aj003-evidence": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "What evidence would confirm AJ-003 is drifting?",
    topic: "Predictive Maintenance",
    source: "Predictive Maintenance · AJ-003 evidence",
    metric: { label: "Pattern to watch", value: "Signals together" },
    body: [
      "One noisy vibration sample is not enough. The concern is when vibration, temperature, miss-picks and short stops rise together against AJ-003’s recent baseline.",
      "Open the asset history next to the current window so you can see whether this is a new pattern or a repeat of a verified fault."
    ],
    steps: [
      "Compare the last stable window with the current 5-minute interval",
      "Check whether miss-picks arrived with the temperature rise",
      "Look for a linked utilities event on line beta before blaming the loom alone"
    ],
    followUps: ["aj003-workorder", "pressure-drop"]
  },
  "aj003-workorder": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "How should we raise the AJ-003 work order?",
    topic: "Predictive Maintenance",
    source: "Predictive Maintenance · Work order",
    metric: { label: "Assign", value: "Maintenance supervisor" },
    body: [
      "Create the work order from the investigation, not from the raw alarm. Give it an owner, a due time and a priority against today’s production exposure.",
      "Close it only after the team records the finding and confirms AJ-003 has returned to its recent normal."
    ],
    steps: [
      "Attach the contributing signals and the time window",
      "State the likely operational exposure for weaving",
      "Verify vibration, miss-picks and stops after the intervention"
    ],
    followUps: ["aj003-evidence", "handover-watchlist"]
  },
  "pressure-drop": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "Could a line-beta pressure drop be involved?",
    topic: "Predictive Maintenance",
    source: "Predictive Maintenance · Utilities header",
    metric: { label: "Air header setpoint", value: "7.90 bar" },
    body: [
      "A pressure drop on line beta is a utilities-plus-process event. Check the header first, then the valves that isolate the dye range, then acoustic leak evidence.",
      "Compressors 1–4 are VFD-modulated to hold 7.90 bar at minimum kWh. The leak sentinel is quiet this shift — 0 major leaks, three micro-leaks already sealed."
    ],
    steps: [
      "Confirm header pressure against the 7.90 bar setpoint",
      "Inspect line-beta isolation valves — green is open, red is closed",
      "If the leak sentinel is quiet, look for a process demand spike"
    ],
    followUps: ["pressure-valves", "pressure-leak-vs-demand"]
  },
  "pressure-valves": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "Which valves should I check on line beta?",
    topic: "Predictive Maintenance",
    source: "SCADA · Line beta",
    metric: { label: "Valve rule", value: "Green open · Red closed" },
    body: [
      "On the dye-range map, start at the line-beta isolation valves before opening a compressor investigation. An unexpected closed valve will drop downstream pressure without a leak.",
      "Use the live HUD on each valve, then walk to the tanks and gauges on the same header."
    ],
    steps: [
      "Confirm the isolation pair matches the current range recipe",
      "If a valve is red and should be feeding the range, treat that first",
      "Only then look at compressor load and leak sentinel history"
    ],
    followUps: ["pressure-leak-vs-demand", "energy-header-rule"]
  },
  "pressure-leak-vs-demand": {
    tag: "MAINT",
    tagClass: "tag-maint",
    prompt: "Is this a leak or a demand spike?",
    topic: "Predictive Maintenance",
    source: "Energy & Utilities · Diagnosis",
    metric: { label: "Leak sentinel", value: "0 major leaks" },
    body: [
      "The 40 kHz leak sentinel is quiet, so do not start at a hunt for a burst line. A batch change, wash-down or extra range coming online can pull the header down while compressors ramp.",
      "If pressure recovers as demand falls, record it as a demand event. If it stays low with quiet acoustics and open valves, then raise utilities work."
    ],
    steps: [
      "Compare header pressure with the current number of live ranges",
      "Check whether the drop lined up with a vessel wash or lot change",
      "Raise a work order only if pressure stays off 7.90 bar after demand settles"
    ],
    followUps: ["energy-header-rule", "aj003-workorder"]
  },
  "energy": {
    tag: "ENERGY",
    tagClass: "tag-energy",
    prompt: "How do we save energy without losing air pressure?",
    topic: "Energy & Utilities",
    source: "Energy & Utilities Optimization AI",
    metric: { label: "Specific energy", value: "0.114 kWh/kg" },
    body: [
      "Do not chase kWh by starving the header. The optimiser modulates compressor VFDs so 7.90 bar is held while specific energy stays at 0.114 kWh/kg (−14.2% YoY).",
      "Thermal recovery is 94.6%: 82°C dye-liquor effluent pre-heats pre-treatment makeup. That cuts boiler steam without changing shade or wash performance."
    ],
    steps: [
      "Keep header pressure as the constraint, kWh as the objective",
      "Seal acoustic leaks before adding compressor load",
      "Use recovered heat on the next wet-process batch, then verify SEC"
    ],
    followUps: ["energy-header-rule", "energy-heat-recovery"]
  },
  "energy-header-rule": {
    tag: "ENERGY",
    tagClass: "tag-energy",
    prompt: "What is the air-header rule for this mill?",
    topic: "Energy & Utilities",
    source: "Energy & Utilities · Compressed air",
    metric: { label: "Hard constraint", value: "7.90 bar" },
    body: [
      "7.90 bar is the process constraint. Energy savings come from how the compressors hold that point, not from lowering it.",
      "VFD modulation on compressors 1–4 is why specific energy can fall to 0.114 kWh/kg without putting jet looms or the dye range on a soft header."
    ],
    steps: [
      "Never recommend a setpoint cut to make the kWh chart look better",
      "Fix leaks and idle demand first",
      "Then let the optimiser shed compressor load"
    ],
    followUps: ["pressure-drop", "energy-heat-recovery"]
  },
  "energy-heat-recovery": {
    tag: "ENERGY",
    tagClass: "tag-energy",
    prompt: "Where is the waste-heat saving coming from?",
    topic: "Energy & Utilities",
    source: "Energy & Utilities · Thermal recovery",
    metric: { label: "Heat recovery", value: "94.6%" },
    body: [
      "The dye-liquor heat exchanger is recycling 82°C effluent into pre-treatment makeup. That is the 94.6% thermal recovery figure — boiler steam is doing less of the first temperature lift.",
      "Shade and wash performance stay on their own control loops. Do not trade a heat-recovery gain against a ΔE miss."
    ],
    steps: [
      "Confirm the exchanger is on before the next pre-treatment batch",
      "Watch SEC after the batch, not only steam flow in the moment",
      "If shade drifts, hold the colour loop first and review heat second"
    ],
    followUps: ["color-pass", "energy-header-rule"]
  },
  "handover": {
    tag: "PLAN",
    tagClass: "tag-plan",
    prompt: "Summarize Shift A handover",
    topic: "Shift handover",
    source: "Mill Knowledge · Shift handover",
    metric: { label: "On-time dispatch", value: "99.4%" },
    body: [
      "Shift A is ready to hand over. There were three batch transitions, zero safety incidents and 99.8% compressed-air uptime. Plant OEE is 94.2% — availability 98.1%, performance 96.4%, quality 99.8%.",
      "Lot TEX-8821 remains on the light-to-dark dye sequence. Target ship date is 18 Sep 2026 with no supply-chain bottleneck."
    ],
    steps: [
      "Watch AJ-003 if vibration, temperature and miss-picks rise together",
      "Royal Navy #8821 is MATCH at ΔE 0.18 — keep tolerance at 0.50",
      "Pass open cases with owner, evidence and unverified items"
    ],
    followUps: ["handover-tex8821", "handover-watchlist", "handover-evidence"]
  },
  "handover-tex8821": {
    tag: "PLAN",
    tagClass: "tag-plan",
    prompt: "What should the next shift know about TEX-8821?",
    topic: "Shift handover",
    source: "Planning · Lot TEX-8821",
    metric: { label: "Ship date", value: "18 Sep 2026" },
    body: [
      "TEX-8821 is the live navy lot. Shade is MATCH at ΔE 0.18 and the vessel sequence is already light-to-dark to protect water and wash time.",
      "Apparel can plan against a 99.4% on-time dispatch forecast. Do not reshuffle this lot unless colour or fabric containment changes."
    ],
    steps: [
      "Keep Royal Navy #8821 on the current recipe",
      "If Fabric Vision holds metres, update the cut plan before sewing",
      "Leave the ship-date commitment visible on the handover"
    ],
    followUps: ["delta-e-navy", "fabric-apparel"]
  },
  "handover-watchlist": {
    tag: "PLAN",
    tagClass: "tag-plan",
    prompt: "What stays on the incoming watchlist?",
    topic: "Shift handover",
    source: "Mill Knowledge · Watchlist",
    metric: { label: "Watch items", value: "AJ-003 · TEX-8821" },
    body: [
      "Carry two named items forward: AJ-003 for reliability and TEX-8821 for shade. Everything else on Shift A closed cleanly.",
      "If either item is still open at the next handover, pass the evidence pack — not only a spoken warning."
    ],
    steps: [
      "AJ-003 — note whether signals are still moving together",
      "TEX-8821 — latest ΔE and whether a correction was declined",
      "Utilities — header still holding 7.90 bar"
    ],
    followUps: ["aj003", "delta-e-navy"]
  },
  "handover-evidence": {
    tag: "PLAN",
    tagClass: "tag-plan",
    prompt: "What must be written down before we leave?",
    topic: "Shift handover",
    source: "Mill Knowledge · Handover quality",
    metric: { label: "Required on each case", value: "Owner · reason · time" },
    body: [
      "A verbal handover is not enough when an auditor or the next supervisor asks what changed. Every open priority needs an owner, a reason, a timestamp and whether the outcome was verified.",
      "That is how the mill repeats a good correction and avoids re-arguing a decision that was already made."
    ],
    steps: [
      "Name the owner still responsible after the shift change",
      "Attach the reading, roll map or asset window you used",
      "Mark verified or still open — never leave it implied"
    ],
    followUps: ["shift-approvals", "passport-already"]
  },
  "passport": {
    tag: "COMPLY",
    tagClass: "tag-comply",
    prompt: "What evidence goes into a Digital Product Passport?",
    topic: "Compliance",
    source: "Compliance & Traceability AI",
    metric: { label: "ZDHC MRSL", value: "Level 3" },
    body: [
      "The mill already connects order, style, customer, lot, batch, machine, roll defects, shade results, maintenance actions and audit events into a product history.",
      "That is the foundation for a Digital Product Passport. A complete passport still needs unique product identity, fibre origin, supplier journey, environmental evidence and controlled QR access."
    ],
    steps: [
      "Materials — fibre content, source and supplier evidence",
      "Manufacturing — where and when each major process occurred",
      "Quality — shade, fabric and garment verification records",
      "Impact — water, energy, carbon and chemical information",
      "Access — a secure QR-linked view for the right audience"
    ],
    followUps: ["passport-already", "passport-missing", "passport-zdhc"]
  },
  "passport-already": {
    tag: "COMPLY",
    tagClass: "tag-comply",
    prompt: "What can we already prove on a lot today?",
    topic: "Compliance",
    source: "Compliance · Current ledger",
    metric: { label: "Traceable objects", value: "Lot to action" },
    body: [
      "For a live lot such as TEX-8821 we can already show the customer standard, shade result, machine path, any fabric defects, maintenance actions on linked assets, and who approved a change.",
      "That is enough for an internal audit trail. It is not yet a customer-facing passport."
    ],
    steps: [
      "Order, style, customer and lot identity",
      "Batch, machine and process timestamps",
      "ΔE result, roll defects and work-order outcomes"
    ],
    followUps: ["passport-missing", "handover-tex8821"]
  },
  "passport-missing": {
    tag: "COMPLY",
    tagClass: "tag-comply",
    prompt: "What is still missing for a full passport?",
    topic: "Compliance",
    source: "Compliance · Gap",
    metric: { label: "Next step", value: "Passport registry" },
    body: [
      "The missing pieces sit mostly outside the current mill loop: fibre origin, supplier chain, full environmental totals, care guidance, end-of-life instructions and a controlled public QR.",
      "Recommended next step is a dedicated passport registry for one representative order, lot and batch, then name the data owners for what we do not yet hold."
    ],
    steps: [
      "Assign a unique product identity",
      "Collect supplier and fibre-origin evidence",
      "Attach water, energy, carbon and chemical totals",
      "Decide who may open the QR view"
    ],
    followUps: ["passport-zdhc", "passport-already"]
  },
  "passport-zdhc": {
    tag: "COMPLY",
    tagClass: "tag-comply",
    prompt: "Are chemicals and effluent in the record?",
    topic: "Compliance",
    source: "Compliance · ZDHC & effluent",
    metric: { label: "Effluent pH", value: "7.12" },
    body: [
      "Yes, at mill-gate level. Every dyestuff and auxiliary batch is checked against ZDHC MRSL Level 3. Effluent is pH 7.12, COD 42 mg/L, BOD 8 mg/L, TDS 420 ppm, with 92% water recycle.",
      "Those readings can travel with the lot history. They still need a passport identity before they become a customer-facing claim."
    ],
    steps: [
      "Keep MRSL Level 3 verification on each chemical batch",
      "Do not publish effluent figures without the lot-to-claim link",
      "Use the same record in handover that you would show an auditor"
    ],
    followUps: ["handover-evidence"]
  }
};

function getCopilotEntry(id) {
  const entry = COPILOT_KNOWLEDGE[id];
  if (!entry) return null;
  return Object.assign({ id: id }, entry);
}

const COPILOT_CHARTS = {
  "shift-help": [
    { type: "pie", title: "SOP library by domain", items: [{ label: "Color", value: 310 }, { label: "Vision", value: 220 }, { label: "Maint", value: 280 }, { label: "Utils", value: 190 }, { label: "Plan", value: 240 }] },
    { type: "bar", title: "Live module coverage", items: [{ label: "Color", value: 99.2 }, { label: "Vision", value: 99.98 }, { label: "Maint", value: 94 }, { label: "Energy", value: 86 }, { label: "Plan", value: 94.2 }], unit: "%" }
  ],
  "shift-first-look": [
    { type: "bar", title: "Open watch items", items: [{ label: "TEX-8821", value: 0.18 }, { label: "AJ-003", value: 1 }, { label: "Line β", value: 0 }], unit: "risk" },
    { type: "line", title: "OEE last 6 hours", labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"], values: [93.1, 93.8, 94.0, 94.4, 94.1, 94.2], unit: "%" }
  ],
  "shift-approvals": [
    { type: "pie", title: "Human gates this shift", items: [{ label: "Shade", value: 1 }, { label: "Work order", value: 1 }, { label: "Roll hold", value: 1 }] },
    { type: "bar", title: "Approvals waiting", items: [{ label: "Dyer", value: 1 }, { label: "Maint", value: 1 }, { label: "Quality", value: 1 }] }
  ],
  "color-pass": [
    { type: "line", title: "Live ΔE · last 40 min", labels: ["−40", "−30", "−20", "−10", "Now"], values: [0.22, 0.21, 0.19, 0.18, 0.18], max: 0.55, threshold: 0.5, unit: "ΔE" },
    { type: "bar", title: "Live vs customer limit", items: [{ label: "Live", value: 0.18 }, { label: "Limit", value: 0.5 }], unit: "ΔE" }
  ],
  "delta-e": [
    { type: "line", title: "Royal Navy #8821 ΔE", labels: ["−40", "−30", "−20", "−10", "Now"], values: [0.21, 0.2, 0.19, 0.18, 0.18], max: 0.55, threshold: 0.5, unit: "ΔE" },
    { type: "pie", title: "CIE Lab share of gap", items: [{ label: "L* 24.00", value: 24 }, { label: "a* 1.80", value: 18 }, { label: "b* 18.50", value: 58 }] }
  ],
  "delta-e-navy": [
    { type: "line", title: "Spectral fit %", labels: ["−40", "−30", "−20", "−10", "Now"], values: [98.6, 98.9, 99.0, 99.1, 99.2], min: 97, max: 100, unit: "%" },
    { type: "bar", title: "Navy lot snapshot", items: [{ label: "ΔE", value: 0.18 }, { label: "Fit %", value: 99.2 }, { label: "Peak nm", value: 46 }] }
  ],
  "delta-e-process-map": [
    { type: "bar", title: "Process colour index", items: [{ label: "Dye ΔE", value: 0.18 }, { label: "Print ΔE", value: 0.19 }, { label: "Finish ΔE", value: 0.17 }] },
    { type: "pie", title: "Active colour lines", items: [{ label: "Dye", value: 1 }, { label: "Print", value: 1 }, { label: "Bleach", value: 1 }, { label: "Merc", value: 1 }, { label: "Finish", value: 1 }] }
  ],
  "delta-e-if-fails": [
    { type: "line", title: "ΔE walk toward fail", labels: ["T0", "T1", "T2", "T3", "T4"], values: [0.18, 0.27, 0.36, 0.44, 0.51], max: 0.6, threshold: 0.5, unit: "ΔE" },
    { type: "bar", title: "Fail gate", items: [{ label: "Live", value: 0.51 }, { label: "Limit", value: 0.5 }], unit: "ΔE" }
  ],
  "dye-correction": [
    { type: "line", title: "Auxiliary dosing mL/kg", labels: ["−40", "−30", "−20", "−10", "Now"], values: [2.55, 2.48, 2.44, 2.41, 2.4], min: 2.2, max: 2.7, unit: "mL/kg" },
    { type: "bar", title: "First-time-right", items: [{ label: "Corrected", value: 99.2 }, { label: "Hold", value: 0.8 }], unit: "%" }
  ],
  "correction-now": [
    { type: "pie", title: "Recipe action", items: [{ label: "Hold", value: 92 }, { label: "Watch", value: 8 }] },
    { type: "line", title: "ΔE while holding recipe", labels: ["−40", "−30", "−20", "−10", "Now"], values: [0.2, 0.19, 0.18, 0.18, 0.18], max: 0.55, threshold: 0.5, unit: "ΔE" }
  ],
  "correction-other-processes": [
    { type: "bar", title: "Correction units by process", items: [{ label: "Print", value: 18.5 }, { label: "Bleach", value: 13.8 }, { label: "Merc", value: 27.8 }, { label: "Finish", value: 4 }] },
    { type: "pie", title: "Shared rule", items: [{ label: "Explain", value: 1 }, { label: "Approve", value: 1 }, { label: "Verify", value: 1 }] }
  ],
  "correction-verify": [
    { type: "line", title: "ΔE after accepted change", labels: ["Before", "+5", "+10", "+15", "Now"], values: [0.41, 0.33, 0.26, 0.21, 0.18], max: 0.55, threshold: 0.5, unit: "ΔE" },
    { type: "bar", title: "Proof checklist", items: [{ label: "ΔE", value: 0.18 }, { label: "Swatch", value: 1 }, { label: "QA", value: 1 }] }
  ],
  "color-operator-gate": [
    { type: "pie", title: "Who owns the gate", items: [{ label: "Dyer", value: 1 }, { label: "Quality", value: 1 }, { label: "Copilot", value: 0 }] },
    { type: "bar", title: "Decisions this lot", items: [{ label: "Accepted", value: 0 }, { label: "Declined", value: 0 }, { label: "Pending", value: 1 }] }
  ],
  "fabric-trace": [
    { type: "bar", title: "Last greige scan defects", items: [{ label: "Broken pick", value: 2 }, { label: "Oil stain", value: 0 }, { label: "Other", value: 0 }] },
    { type: "pie", title: "4,820 m disposition", items: [{ label: "Pass", value: 4818 }, { label: "Picks", value: 2 }] }
  ],
  "fabric-last-scan": [
    { type: "line", title: "Skew angle °", labels: ["−40", "−30", "−20", "−10", "Now"], values: [0.22, 0.19, 0.16, 0.15, 0.14], max: 0.4, unit: "°" },
    { type: "bar", title: "ASTM D5430 points / 100 yd²", items: [{ label: "This roll", value: 2.1 }, { label: "A+ cap", value: 4 }] }
  ],
  "fabric-contain": [
    { type: "pie", title: "Containment options", items: [{ label: "Release", value: 70 }, { label: "Cut-out", value: 20 }, { label: "Hold", value: 10 }] },
    { type: "bar", title: "Metres by fate", items: [{ label: "Usable", value: 4810 }, { label: "Review", value: 10 }] }
  ],
  "fabric-apparel": [
    { type: "line", title: "Line output vs target", labels: ["Cut", "Sew", "QC", "Finish", "Pack"], values: [96, 94, 95, 97, 99.4], min: 90, max: 100, unit: "%" },
    { type: "bar", title: "WIP bundles", items: [{ label: "Cut", value: 18 }, { label: "Sew", value: 24 }, { label: "Pack", value: 11 }] }
  ],
  "aj003": [
    { type: "line", title: "AJ-003 vibration trend", labels: ["−40", "−30", "−20", "−10", "Now"], values: [0.42, 0.48, 0.61, 0.74, 0.82], max: 1, unit: "g" },
    { type: "bar", title: "Signals moving together", items: [{ label: "Vibe", value: 0.82 }, { label: "Temp", value: 0.71 }, { label: "Miss", value: 0.64 }, { label: "Stops", value: 0.4 }] }
  ],
  "aj003-evidence": [
    { type: "line", title: "Miss-picks / 5 min", labels: ["12:40", "12:50", "13:00", "13:10", "13:20"], values: [1, 1, 3, 4, 5] },
    { type: "bar", title: "Now vs last stable window", items: [{ label: "Vibe", value: 0.82 }, { label: "Baseline", value: 0.44 }] }
  ],
  "aj003-workorder": [
    { type: "pie", title: "Work-order state", items: [{ label: "Draft", value: 1 }, { label: "Assigned", value: 0 }, { label: "Verified", value: 0 }] },
    { type: "bar", title: "Exposure if loom stops", items: [{ label: "Picks/h", value: 38 }, { label: "Lots", value: 1 }] }
  ],
  "pressure-drop": [
    { type: "line", title: "Line beta header bar", labels: ["−40", "−30", "−20", "−10", "Now"], values: [7.91, 7.9, 7.88, 7.84, 7.81], min: 7.6, max: 8, threshold: 7.9, unit: "bar" },
    { type: "bar", title: "Utilities snapshot", items: [{ label: "Setpoint", value: 7.9 }, { label: "Live", value: 7.81 }, { label: "Major leaks", value: 0 }] }
  ],
  "pressure-valves": [
    { type: "pie", title: "Line-beta valves", items: [{ label: "Open", value: 3 }, { label: "Closed", value: 1 }] },
    { type: "bar", title: "Header vs valves", items: [{ label: "Header", value: 7.81 }, { label: "Setpoint", value: 7.9 }] }
  ],
  "pressure-leak-vs-demand": [
    { type: "line", title: "Demand vs pressure", labels: ["−40", "−30", "−20", "−10", "Now"], values: [7.9, 7.86, 7.83, 7.8, 7.81], min: 7.6, max: 8, threshold: 7.9, unit: "bar" },
    { type: "pie", title: "Leak sentinel 40 kHz", items: [{ label: "Quiet", value: 97 }, { label: "Micro", value: 3 }, { label: "Major", value: 0 }] }
  ],
  "energy": [
    { type: "line", title: "SEC kWh/kg", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], values: [0.132, 0.126, 0.121, 0.117, 0.114], min: 0.1, max: 0.14, unit: "kWh/kg" },
    { type: "bar", title: "Air vs recovery", items: [{ label: "Header bar", value: 7.9 }, { label: "Heat %", value: 94.6 }] }
  ],
  "energy-header-rule": [
    { type: "line", title: "Compressor VFD load %", labels: ["C1", "C2", "C3", "C4"], values: [62, 58, 41, 28], min: 0, max: 100, unit: "%" },
    { type: "bar", title: "Header constraint", items: [{ label: "Hold", value: 7.9 }, { label: "Live", value: 7.9 }] }
  ],
  "energy-heat-recovery": [
    { type: "pie", title: "Thermal recovery", items: [{ label: "Recovered", value: 94.6 }, { label: "Lost", value: 5.4 }] },
    { type: "bar", title: "Effluent into makeup", items: [{ label: "In °C", value: 82 }, { label: "Recover %", value: 94.6 }] }
  ],
  "handover": [
    { type: "bar", title: "Shift A OEE split", items: [{ label: "Avail", value: 98.1 }, { label: "Perf", value: 96.4 }, { label: "Qual", value: 99.8 }], unit: "%" },
    { type: "line", title: "Air uptime %", labels: ["09:00", "10:00", "11:00", "12:00", "13:00"], values: [99.6, 99.7, 99.8, 99.8, 99.8], min: 99, max: 100, unit: "%" }
  ],
  "handover-tex8821": [
    { type: "line", title: "TEX-8821 ΔE", labels: ["Start", "Mid", "Now"], values: [0.21, 0.19, 0.18], max: 0.55, threshold: 0.5, unit: "ΔE" },
    { type: "bar", title: "Dispatch forecast", items: [{ label: "On time", value: 99.4 }, { label: "Water −", value: 38 }], unit: "%" }
  ],
  "handover-watchlist": [
    { type: "pie", title: "Incoming watchlist", items: [{ label: "AJ-003", value: 1 }, { label: "TEX-8821", value: 1 }, { label: "Closed", value: 5 }] },
    { type: "bar", title: "Header hold", items: [{ label: "Air bar", value: 7.9 }, { label: "ΔE", value: 0.18 }] }
  ],
  "handover-evidence": [
    { type: "bar", title: "Cases with owner · reason · time", items: [{ label: "Complete", value: 4 }, { label: "Verbal only", value: 1 }] },
    { type: "pie", title: "Verification state", items: [{ label: "Verified", value: 3 }, { label: "Open", value: 2 }] }
  ],
  "passport": [
    { type: "pie", title: "Passport completeness", items: [{ label: "In mill", value: 62 }, { label: "Missing", value: 38 }] },
    { type: "bar", title: "ZDHC & effluent", items: [{ label: "MRSL", value: 3 }, { label: "pH", value: 7.12 }, { label: "Recycle %", value: 92 }] }
  ],
  "passport-already": [
    { type: "bar", title: "Objects already linked", items: [{ label: "Lot", value: 1 }, { label: "Shade", value: 1 }, { label: "Defect", value: 2 }, { label: "WO", value: 1 }] },
    { type: "pie", title: "Audience", items: [{ label: "Internal", value: 1 }, { label: "Customer QR", value: 0 }] }
  ],
  "passport-missing": [
    { type: "pie", title: "Missing passport pieces", items: [{ label: "Origin", value: 1 }, { label: "Supplier", value: 1 }, { label: "Impact", value: 1 }, { label: "QR", value: 1 }] },
    { type: "bar", title: "Registry readiness", items: [{ label: "Mill loop", value: 62 }, { label: "Full DPP", value: 0 }], unit: "%" }
  ],
  "passport-zdhc": [
    { type: "bar", title: "Effluent vs limit", items: [{ label: "COD", value: 42 }, { label: "Limit", value: 150 }, { label: "BOD", value: 8 }] },
    { type: "pie", title: "Water fate", items: [{ label: "Recycled", value: 92 }, { label: "Make-up", value: 8 }] }
  ]
};

const COPILOT_HISTORY_SEED = [
  { id: "seed-1", entryId: "delta-e-navy", topic: "Color Intelligence", prompt: "How is Royal Navy #8821 tracking right now?", tag: "COLOR", tagClass: "tag-color", time: "14:12", live: false },
  { id: "seed-2", entryId: "aj003", topic: "Predictive Maintenance", prompt: "What should we do if AJ-003 vibration rises?", tag: "MAINT", tagClass: "tag-maint", time: "13:48", live: false },
  { id: "seed-3", entryId: "pressure-drop", topic: "Energy & Utilities", prompt: "Could a line-beta pressure drop be involved?", tag: "ENERGY", tagClass: "tag-energy", time: "13:10", live: false },
  { id: "seed-4", entryId: "handover", topic: "Shift handover", prompt: "Summarize Shift A handover", tag: "PLAN", tagClass: "tag-plan", time: "12:55", live: false }
];

function copilotSvg(name, attrs) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.keys(attrs || {}).forEach((key) => el.setAttribute(key, String(attrs[key])));
  return el;
}

function getCopilotCharts(entry) {
  return COPILOT_CHARTS[entry && entry.id] || COPILOT_CHARTS["shift-help"];
}

function getCopilotChartTip() {
  let tip = document.getElementById("copilotChartTip");
  if (tip) return tip;
  tip = document.createElement("div");
  tip.id = "copilotChartTip";
  tip.className = "copilot-chart-tip";
  tip.setAttribute("role", "tooltip");
  tip.hidden = true;
  document.body.appendChild(tip);
  window.addEventListener("scroll", hideCopilotChartTip, true);
  return tip;
}

function hideCopilotChartTip() {
  const tip = document.getElementById("copilotChartTip");
  if (tip) tip.hidden = true;
  document.querySelectorAll(".copilot-chart-card.is-hot, .copilot-bar.is-hot, .copilot-pie-slice.is-hot, .copilot-line-dot.is-hot, .copilot-legend-hit.is-hot").forEach((el) => {
    el.classList.remove("is-hot");
  });
}

function showCopilotChartTip(event, info) {
  const tip = getCopilotChartTip();
  tip.innerHTML = "";

  const kicker = document.createElement("div");
  kicker.className = "copilot-chart-tip-kicker";
  kicker.textContent = info.title || "Live reading";

  const value = document.createElement("div");
  value.className = "copilot-chart-tip-value";
  value.textContent = info.unit ? (info.value + " " + info.unit) : String(info.value);

  const label = document.createElement("div");
  label.className = "copilot-chart-tip-label";
  label.textContent = info.label || "";

  tip.appendChild(kicker);
  tip.appendChild(value);
  if (info.detail) {
    const detail = document.createElement("div");
    detail.className = "copilot-chart-tip-detail";
    detail.textContent = info.detail;
    tip.appendChild(detail);
  }
  if (info.label) tip.appendChild(label);

  tip.hidden = false;
  const pad = 14;
  const width = tip.offsetWidth || 180;
  const height = tip.offsetHeight || 72;
  let x = event.clientX + pad;
  let y = event.clientY - height - 10;
  if (x + width > window.innerWidth - 8) x = event.clientX - width - pad;
  if (y < 8) y = event.clientY + pad;
  tip.style.left = Math.max(8, x) + "px";
  tip.style.top = Math.max(8, y) + "px";
}

function bindCopilotChartHover(el, card, info) {
  if (!el) return;
  el.style.cursor = "pointer";
  el.addEventListener("pointerenter", (event) => {
    hideCopilotChartTip();
    el.classList.add("is-hot");
    if (card) card.classList.add("is-hot");
    showCopilotChartTip(event, info);
  });
  el.addEventListener("pointermove", (event) => {
    showCopilotChartTip(event, info);
  });
  el.addEventListener("pointerleave", hideCopilotChartTip);
}

function renderCopilotLineChart(spec, card) {
  const svg = copilotSvg("svg", { class: "copilot-chart-svg", viewBox: "0 0 220 100" });
  const values = spec.values || [];
  const labels = spec.labels || [];
  const min = spec.min != null ? spec.min : Math.min.apply(null, values.concat([0]));
  const max = spec.max != null ? spec.max : Math.max.apply(null, values.concat([1]));
  const span = max - min || 1;
  const left = 18;
  const right = 212;
  const top = 10;
  const bottom = 78;
  const pts = values.map((value, index) => {
    const x = left + (index / Math.max(values.length - 1, 1)) * (right - left);
    const y = bottom - ((value - min) / span) * (bottom - top);
    return { x: x, y: y, value: value, label: labels[index] || ("Point " + (index + 1)) };
  });

  if (spec.threshold != null) {
    const ty = bottom - ((spec.threshold - min) / span) * (bottom - top);
    svg.appendChild(copilotSvg("line", { x1: left, y1: ty, x2: right, y2: ty, stroke: "#F59E0B", "stroke-width": "1", "stroke-dasharray": "3 3" }));
  }

  const d = pts.map((pt, index) => (index === 0 ? "M" : "L") + " " + pt.x.toFixed(1) + " " + pt.y.toFixed(1)).join(" ");
  const area = d + " L " + right + " " + bottom + " L " + left + " " + bottom + " Z";
  svg.appendChild(copilotSvg("path", { d: area, fill: "rgba(79,70,229,0.12)", class: "copilot-line-area" }));
  svg.appendChild(copilotSvg("path", { d: d, fill: "none", stroke: "#4F46E5", "stroke-width": "2", "stroke-linecap": "round", class: "copilot-line-path copilot-line-draw" }));

  const hoverLine = copilotSvg("line", { x1: 0, y1: top, x2: 0, y2: bottom, stroke: "rgba(79,70,229,0.35)", "stroke-width": "1", "stroke-dasharray": "2 2", class: "copilot-line-guide", opacity: "0" });
  svg.appendChild(hoverLine);

  pts.forEach((pt) => {
    const hit = copilotSvg("circle", { cx: pt.x.toFixed(1), cy: pt.y.toFixed(1), r: "9", fill: "transparent", class: "copilot-line-hit" });
    const dot = copilotSvg("circle", { cx: pt.x.toFixed(1), cy: pt.y.toFixed(1), r: "2.6", fill: "#4F46E5", class: "copilot-line-dot" });
    svg.appendChild(dot);
    svg.appendChild(hit);
    const info = {
      title: spec.title,
      label: pt.label,
      value: pt.value,
      unit: spec.unit || "",
      detail: spec.threshold != null ? ("Limit " + spec.threshold + (spec.unit ? " " + spec.unit : "")) : (pts.length + " samples")
    };
    [hit, dot].forEach((el) => {
      bindCopilotChartHover(el, card, info);
      el.addEventListener("pointerenter", () => {
        hoverLine.setAttribute("x1", pt.x.toFixed(1));
        hoverLine.setAttribute("x2", pt.x.toFixed(1));
        hoverLine.setAttribute("opacity", "1");
        dot.classList.add("is-hot");
        dot.setAttribute("r", "4.4");
      });
      el.addEventListener("pointerleave", () => {
        hoverLine.setAttribute("opacity", "0");
        dot.setAttribute("r", "2.6");
      });
    });
  });

  labels.forEach((label, index) => {
    if (!pts[index]) return;
    const text = copilotSvg("text", { x: pts[index].x.toFixed(1), y: "94", "text-anchor": "middle", fill: "#94A3B8", "font-size": "7" });
    text.textContent = label;
    svg.appendChild(text);
  });
  return svg;
}

function renderCopilotBarChart(spec, card) {
  const svg = copilotSvg("svg", { class: "copilot-chart-svg", viewBox: "0 0 220 100" });
  const items = spec.items || [];
  const max = Math.max.apply(null, items.map((item) => item.value).concat([1]));
  const slot = 200 / Math.max(items.length, 1);
  const colors = ["#4F46E5", "#06B6D4", "#5CD389", "#FFA026", "#FF6B9F"];
  items.forEach((item, index) => {
    const h = (item.value / max) * 62;
    const x = 12 + index * slot + slot * 0.18;
    const w = slot * 0.64;
    const y = 76 - h;
    const bar = copilotSvg("rect", { x: x.toFixed(1), y: y.toFixed(1), width: w.toFixed(1), height: Math.max(h, 1).toFixed(1), rx: "3", fill: colors[index % colors.length], class: "copilot-bar" });
    const hit = copilotSvg("rect", { x: x.toFixed(1), y: "8", width: w.toFixed(1), height: "70", fill: "transparent", class: "copilot-bar-hit" });
    svg.appendChild(bar);
    svg.appendChild(hit);
    const val = copilotSvg("text", { x: (x + w / 2).toFixed(1), y: (y - 4).toFixed(1), "text-anchor": "middle", fill: "#0F172A", "font-size": "7", "font-weight": "700" });
    val.textContent = String(item.value);
    svg.appendChild(val);
    const lbl = copilotSvg("text", { x: (x + w / 2).toFixed(1), y: "92", "text-anchor": "middle", fill: "#94A3B8", "font-size": "7" });
    lbl.textContent = item.label;
    svg.appendChild(lbl);
    const info = {
      title: spec.title,
      label: item.label,
      value: item.value,
      unit: spec.unit || "",
      detail: "Share of max " + Math.round((item.value / max) * 100) + "%"
    };
    bindCopilotChartHover(hit, card, info);
    bindCopilotChartHover(bar, card, info);
    hit.addEventListener("pointerenter", () => bar.classList.add("is-hot"));
    hit.addEventListener("pointerleave", () => bar.classList.remove("is-hot"));
  });
  return svg;
}

function renderCopilotPieChart(spec, card) {
  const wrap = document.createElement("div");
  const svg = copilotSvg("svg", { class: "copilot-chart-svg", viewBox: "0 0 220 100" });
  const items = spec.items || [];
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ["#4F46E5", "#06B6D4", "#5CD389", "#FFA026", "#FF6B9F", "#2860EB"];
  let angle = 0;
  const cx = 48;
  const cy = 50;
  const r = 32;

  function pt(deg) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const slices = [];
  items.forEach((item, index) => {
    const slice = (item.value / total) * 360;
    const start = angle;
    const end = angle + slice;
    const p1 = pt(start);
    const p2 = pt(end);
    const large = slice > 180 ? 1 : 0;
    const d = slice >= 359.9
      ? "M " + (cx - r) + " " + cy + " A " + r + " " + r + " 0 1 1 " + (cx + r) + " " + cy + " A " + r + " " + r + " 0 1 1 " + (cx - r) + " " + cy
      : "M " + cx + " " + cy + " L " + p1.x.toFixed(2) + " " + p1.y.toFixed(2) + " A " + r + " " + r + " 0 " + large + " 1 " + p2.x.toFixed(2) + " " + p2.y.toFixed(2) + " Z";
    const path = copilotSvg("path", { d: d, fill: colors[index % colors.length], class: "copilot-pie-slice" });
    svg.appendChild(path);
    slices.push(path);
    const pct = Math.round((item.value / total) * 100);
    bindCopilotChartHover(path, card, {
      title: spec.title,
      label: item.label,
      value: item.value,
      unit: spec.unit || "",
      detail: pct + "% of this mix"
    });
    angle = end;
  });
  wrap.appendChild(svg);

  const legend = document.createElement("div");
  legend.className = "copilot-chart-legend";
  items.forEach((item, index) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "copilot-legend-hit";
    const swatch = document.createElement("i");
    swatch.className = "copilot-chart-swatch";
    swatch.style.background = colors[index % colors.length];
    row.appendChild(swatch);
    row.appendChild(document.createTextNode(item.label + " " + item.value));
    const pct = Math.round((item.value / total) * 100);
    bindCopilotChartHover(row, card, {
      title: spec.title,
      label: item.label,
      value: item.value,
      unit: spec.unit || "",
      detail: pct + "% of this mix"
    });
    row.addEventListener("pointerenter", () => {
      if (slices[index]) slices[index].classList.add("is-hot");
    });
    row.addEventListener("pointerleave", () => {
      if (slices[index]) slices[index].classList.remove("is-hot");
    });
    legend.appendChild(row);
  });
  wrap.appendChild(legend);
  return wrap;
}

function renderCopilotCharts(bubble, entry) {
  const pair = getCopilotCharts(entry);
  const row = document.createElement("div");
  row.className = "copilot-charts";
  pair.slice(0, 2).forEach((spec) => {
    const card = document.createElement("div");
    card.className = "copilot-chart-card";
    const title = document.createElement("p");
    title.className = "copilot-chart-title";
    title.textContent = spec.title + (spec.unit ? " · " + spec.unit : "");
    card.appendChild(title);
    if (spec.type === "line") card.appendChild(renderCopilotLineChart(spec, card));
    else if (spec.type === "pie") card.appendChild(renderCopilotPieChart(spec, card));
    else card.appendChild(renderCopilotBarChart(spec, card));
    row.appendChild(card);
  });
  bubble.appendChild(row);
}

function formatCopilotTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function createCopilotParagraphs(parent, lines) {
  (lines || []).forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    parent.appendChild(p);
  });
}

function typeCopilotText(el, text, done) {
  let index = 0;
  el.textContent = "";
  el.classList.add("is-typing");
  function tick() {
    index += 1;
    el.textContent = text.slice(0, index);
    if (el.closest) {
      const log = el.closest(".copilot-thread");
      if (log) log.scrollTop = log.scrollHeight;
    }
    if (index < text.length) {
      window.setTimeout(tick, text[index - 1] === " " ? 6 : 11);
    } else {
      el.classList.remove("is-typing");
      if (done) done();
    }
  }
  tick();
}

function appendCopilotMessage(thread, role, builder) {
  const row = document.createElement("article");
  row.className = "copilot-msg is-" + role;

  const avatar = document.createElement("div");
  avatar.className = "copilot-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.innerHTML = role === "user"
    ? '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    : '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  const bubble = document.createElement("div");
  bubble.className = "copilot-bubble";

  const meta = document.createElement("div");
  meta.className = "copilot-bubble-meta";
  const roleEl = document.createElement("span");
  roleEl.className = "copilot-role";
  roleEl.textContent = role === "user" ? "Shift engineer" : "Mill Copilot";
  const timeEl = document.createElement("span");
  timeEl.className = "copilot-time";
  timeEl.textContent = formatCopilotTime();
  meta.appendChild(roleEl);
  meta.appendChild(timeEl);
  bubble.appendChild(meta);

  builder(bubble);
  row.appendChild(avatar);
  row.appendChild(bubble);
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
  return row;
}

function appendCopilotReplyRest(bubble, entry) {
  if (entry.metric) {
    const chip = document.createElement("div");
    chip.className = "copilot-metric-chip";
    const strong = document.createElement("strong");
    strong.textContent = entry.metric.value;
    const label = document.createElement("span");
    label.textContent = entry.metric.label;
    chip.appendChild(strong);
    chip.appendChild(label);
    bubble.appendChild(chip);
  }

  if (entry.steps && entry.steps.length) {
    const list = document.createElement("ol");
    list.className = "copilot-steps";
    entry.steps.forEach((step, index) => {
      const item = document.createElement("li");
      const num = document.createElement("span");
      num.className = "copilot-step-num";
      num.textContent = String(index + 1).padStart(2, "0");
      const text = document.createElement("span");
      text.textContent = step;
      item.appendChild(num);
      item.appendChild(text);
      list.appendChild(item);
    });
    bubble.appendChild(list);
  }

  renderCopilotCharts(bubble, entry);

}

function renderCopilotReply(bubble, entry, options) {
  const animate = !!(options && options.animate);
  const onDone = options && options.onDone;
  const lines = (entry.body || []).slice();

  if (!animate) {
    createCopilotParagraphs(bubble, lines);
    appendCopilotReplyRest(bubble, entry);
    if (onDone) onDone();
    return;
  }

  const paras = lines.map(() => {
    const p = document.createElement("p");
    bubble.appendChild(p);
    return p;
  });

  function typeLine(lineIndex) {
    if (lineIndex >= paras.length) {
      appendCopilotReplyRest(bubble, entry);
      if (onDone) onDone();
      return;
    }
    typeCopilotText(paras[lineIndex], lines[lineIndex], () => typeLine(lineIndex + 1));
  }
  typeLine(0);
}

function setupMillKnowledgeCopilot() {
  const thread = document.getElementById("copilotThread");
  const grid = document.getElementById("copilotPromptGrid");
  const resetBtn = document.getElementById("btnResetCopilot");
  const allTopicsBtn = document.getElementById("btnCopilotAllTopics");
  const titleEl = document.getElementById("copilotPromptTitle");
  const hintEl = document.getElementById("copilotPromptHint");
  const historyList = document.getElementById("copilotHistoryList");
  const historyCount = document.getElementById("copilotHistoryCount");
  if (!thread || !grid) return;

  let busy = false;
  let seeded = false;
  let currentId = null;
  let visibleIds = COPILOT_ROOT_IDS.slice();
  let historyItems = COPILOT_HISTORY_SEED.map((item) => Object.assign({}, item));

  function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = "";
    if (historyCount) historyCount.textContent = String(historyItems.length);
    historyItems.forEach((item) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "copilot-history-item" + (item.live ? " is-live" : "");
      row.setAttribute("aria-label", "Open chat: " + item.prompt);
      const top = document.createElement("div");
      top.className = "copilot-history-item-top";
      const title = document.createElement("span");
      title.className = "copilot-history-item-title";
      title.textContent = item.topic;
      const time = document.createElement("span");
      time.className = "copilot-history-item-time";
      time.textContent = item.time;
      top.appendChild(title);
      top.appendChild(time);
      const copy = document.createElement("p");
      copy.className = "copilot-history-item-copy";
      copy.textContent = item.prompt;
      row.appendChild(top);
      row.appendChild(copy);
      row.addEventListener("click", () => openHistoryChat(item));
      historyList.appendChild(row);
    });
  }

  function pushHistory(entry) {
    historyItems.forEach((item) => { item.live = false; });
    const existing = historyItems.find((item) => item.entryId === entry.id);
    if (existing) {
      existing.live = true;
      existing.time = formatCopilotTime();
      existing.prompt = entry.prompt;
      historyItems = [existing].concat(historyItems.filter((item) => item !== existing));
    } else {
      historyItems.unshift({
        id: "live-" + Date.now(),
        entryId: entry.id,
        topic: entry.topic || entry.tag,
        prompt: entry.prompt,
        tag: entry.tag,
        tagClass: entry.tagClass,
        time: formatCopilotTime(),
        live: true
      });
    }
    renderHistory();
  }

  function openHistoryChat(item) {
    if (busy || !item || !item.entryId) return;
    const entry = getCopilotEntry(item.entryId);
    if (!entry) return;
    sfx.playClick();
    historyItems.forEach((row) => { row.live = row.id === item.id || row.entryId === item.entryId; });
    renderHistory();
    thread.innerHTML = "";
    currentId = entry.id;
    appendCopilotMessage(thread, "user", (bubble) => {
      const p = document.createElement("p");
      p.textContent = entry.prompt;
      bubble.appendChild(p);
    });
    appendCopilotMessage(thread, "assistant", (bubble) => {
      renderCopilotReply(bubble, entry);
    });
    updatePromptChrome(entry);
    renderPromptChips(nextQuestionIds(entry), entry.id);
  }

  function setBusy(next) {
    busy = next;
    grid.querySelectorAll(".copilot-prompt-chip").forEach((chip) => {
      chip.disabled = next;
    });
    if (allTopicsBtn) allTopicsBtn.disabled = next;
    if (historyList) {
      historyList.querySelectorAll(".copilot-history-item").forEach((btn) => {
        btn.disabled = next;
      });
    }
  }

  function nextQuestionIds(entry) {
    if (entry.followUps && entry.followUps.length) {
      return entry.followUps.filter((id) => COPILOT_KNOWLEDGE[id]);
    }
    return COPILOT_ROOT_IDS.slice();
  }

  function updatePromptChrome(entry) {
    if (titleEl) {
      titleEl.textContent = entry ? "GO DEEPER" : "SUGGESTED QUESTIONS";
    }
    if (hintEl) {
      hintEl.textContent = entry
        ? (entry.topic || "Related to your last question")
        : "From this shift’s live context";
    }
    if (allTopicsBtn) {
      allTopicsBtn.hidden = !entry;
    }
  }

  function renderPromptChips(ids, activeId) {
    visibleIds = (ids && ids.length ? ids : COPILOT_ROOT_IDS).filter((id) => COPILOT_KNOWLEDGE[id]);
    grid.innerHTML = "";

    visibleIds.forEach((id) => {
      const entry = getCopilotEntry(id);
      if (!entry) return;

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "copilot-prompt-chip" + (id === activeId ? " is-active" : "");
      chip.dataset.promptId = id;

      const tag = document.createElement("span");
      tag.className = "copilot-chip-tag " + entry.tagClass;
      tag.textContent = entry.tag;

      const label = document.createElement("span");
      label.textContent = entry.prompt;

      chip.appendChild(tag);
      chip.appendChild(label);
      chip.addEventListener("click", () => selectCopilotQuestion(id));
      grid.appendChild(chip);
    });
  }

  function seedWelcome() {
    thread.innerHTML = "";
    currentId = null;
    appendCopilotMessage(thread, "assistant", (bubble) => {
      createCopilotParagraphs(bubble, [
        "Shift A copilot is live. I have the SOP library, module evidence and this shift’s handover in one place.",
        "Choose a question below. After I answer, I will narrow the next questions to that same topic."
      ]);
    });
    updatePromptChrome(null);
    renderPromptChips(COPILOT_ROOT_IDS);
    historyItems = COPILOT_HISTORY_SEED.map((item) => Object.assign({}, item));
    renderHistory();
    seeded = true;
  }

  function returnToAllTopics() {
    if (busy) return;
    sfx.playClick();
    currentId = null;
    updatePromptChrome(null);
    renderPromptChips(COPILOT_ROOT_IDS);
    thread.scrollTop = thread.scrollHeight;
  }

  function selectCopilotQuestion(promptId) {
    const entry = getCopilotEntry(promptId);
    if (!entry || busy) return;

    currentId = promptId;
    sfx.playClick();
    pushHistory(entry);
    appendCopilotMessage(thread, "user", (bubble) => {
      const p = document.createElement("p");
      p.textContent = entry.prompt;
      bubble.appendChild(p);
    });

    setBusy(true);
    updatePromptChrome(entry);
    renderPromptChips(nextQuestionIds(entry), promptId);

    const typingRow = appendCopilotMessage(thread, "assistant", (bubble) => {
      const dots = document.createElement("div");
      dots.className = "copilot-typing";
      dots.setAttribute("aria-label", "Copilot is preparing a reply");
      dots.innerHTML = "<span></span><span></span><span></span>";
      bubble.appendChild(dots);
    });

    window.setTimeout(() => {
      typingRow.remove();
      appendCopilotMessage(thread, "assistant", (bubble) => {
        renderCopilotReply(bubble, entry, {
          animate: true,
          onDone: function () {
            setBusy(false);
          }
        });
      });
    }, 280);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (busy) return;
      sfx.playClick();
      seedWelcome();
    });
  }

  if (allTopicsBtn) {
    allTopicsBtn.addEventListener("click", returnToAllTopics);
  }

  seedWelcome();

  window.ensureCopilotReady = function ensureCopilotReady() {
    if (!seeded) seedWelcome();
    window.requestAnimationFrame(() => {
      thread.scrollTop = thread.scrollHeight;
    });
  };
}

// ==========================================================================
// 11. PRODUCTION PLANNING INTERACTIONS
// ==========================================================================
function setupProductionPlanningInteractions() {
  const reoptimizeBtn = document.getElementById("btnReoptimizePlan");
  const recoveryBtn = document.getElementById("btnApplyRecovery");
  const stageNodes = document.querySelectorAll(".fabric-flow-node[data-plan-stage]");
  const stagePanel = document.getElementById("stagePlanPanel");

  const stagePlans = {
    incoming: {
      eyebrow: "SELECTED STAGE · INCOMING", title: "Greige release plan · Loom L-18", subtitle: "Roll close, quality release and routing into wet processing", machine: "L-18 · A-frame AF-221", status: "Completed 08:12 · 7 min early",
      steps: [["Loom close","Complete · 07:46","complete"],["Metre verification","Complete · 07:54","complete"],["Greige quality release","Complete · 08:05","complete"],["Route to PT-02","Released · 08:12","live"]],
      chartLabel: "PROCESS TIME PLAN", chartTitle: "L-18 focused release sequence", axis: ["07:30","07:42","07:54","08:06","08:12"], flowStats: [["PLANNED WINDOW","07:30–08:19"],["RELEASE VARIANCE","−7 min"],["NEXT HANDOFF","PT-02 · 08:24"]],
      decisionTitle: "Send directly to PT-02", decisionCopy: "Greige inspection and metre reconciliation are complete. PT-02 is available with no queue conflict.", metrics: [["RELEASE VARIANCE","−7 min"],["ROLL YIELD","99.4%"]], action: "Confirm routing"
    },
    pretreatment: {
      eyebrow: "SELECTED STAGE · PREPARED", title: "Pretreatment plan · PT-02", subtitle: "Continuous preparation sequence and release to the dyeing vessel", machine: "PT-02 · 42.5 m/min", status: "Completed 10:04 · 11 min early",
      steps: [["Load & stitch","Complete · 08:24","complete"],["Scour & bleach","Complete · 09:18","complete"],["Wash & neutralize","Complete · 09:48","complete"],["Release to JD-04","Released · 10:04","live"]],
      chartLabel: "PROCESS TIME PLAN", chartTitle: "PT-02 focused preparation sequence", axis: ["08:24","08:50","09:15","09:40","10:04"], flowStats: [["PLANNED WINDOW","08:24–10:15"],["RELEASE VARIANCE","−11 min"],["NEXT HANDOFF","JD-04 · 10:18"]],
      decisionTitle: "Preserve direct dyeing transfer", decisionCopy: "Quality release is complete. Keep the A-frame in the protected lane to avoid an extra handling cycle.", metrics: [["RELEASE VARIANCE","−11 min"],["FIRST-PASS","99.1%"]], action: "Confirm transfer"
    },
    dyeing: {
      eyebrow: "SELECTED STAGE · IN PROCESS", title: "Dyeing plan · JD-04", subtitle: "Recipe execution, shade control and protected release to finishing", machine: "JD-04 · 4,500 kg", status: "68% complete · +18 min",
      steps: [["CIP verification","Complete · 10:18","complete"],["Recipe dosing","Complete · 10:36","complete"],["Dye circulation","Live · 68% complete","live"],["Shade release","Forecast · 14:47",""]],
      chartLabel: "PROCESS TIME PLAN", chartTitle: "JD-04 focused dyeing sequence", axis: ["10:18","10:36","12:15","13:58","14:47"], flowStats: [["PLANNED WINDOW","10:18–14:29"],["CURRENT VARIANCE","+18 min"],["NEXT HANDOFF","ST-02 · 15:16"]],
      decisionTitle: "Protect the finishing handoff", decisionCopy: "Maintain JD-04 speed and hold ST-02 until 15:16. The lot remains inside dispatch tolerance.", metrics: [["TIME TO RELEASE","46 min"],["HANDOFF BUFFER","38 min"]], action: "Apply stage plan"
    },
    finishing: {
      eyebrow: "SELECTED STAGE · NEXT", title: "Stenter finishing plan · ST-02", subtitle: "Protected slot, heat-setting profile and width-control sequence", machine: "ST-02 · Slot 15:16", status: "Ready 82% · 11 min exposure",
      steps: [["Receive A-frame","Forecast · 15:02",""] ,["Stenter setup","Reserved · 15:05","live"],["Heat-set & width","Planned · 15:16",""] ,["Release to FI-01","Forecast · 16:54",""]],
      chartLabel: "PROCESS TIME PLAN", chartTitle: "ST-02 focused finishing sequence", axis: ["15:02","15:05","15:16","16:20","16:54"], flowStats: [["PLANNED WINDOW","15:05–16:43"],["SLOT EXPOSURE","+11 min"],["NEXT HANDOFF","FI-01 · 16:58"]],
      decisionTitle: "Hold the reserved slot", decisionCopy: "Keep ST-02 idle for the protected transfer window. Releasing it now would create a longer downstream changeover.", metrics: [["SLOT EXPOSURE","11 min"],["SETUP READY","82%"]], action: "Protect slot"
    },
    inspection: {
      eyebrow: "SELECTED STAGE · OUTGOING", title: "Final inspection plan · FI-01", subtitle: "Vision inspection, grading, packing and dispatch release", machine: "FI-01 · A-frame line", status: "Forecast start 16:58 · protected",
      steps: [["Frame receive","Forecast · 16:58",""] ,["Vision scan","Planned · 17:04",""] ,["Grade & defect map","Planned · 17:28",""] ,["Pack & dispatch","Forecast · 17:42",""]],
      chartLabel: "PROCESS TIME PLAN", chartTitle: "FI-01 focused inspection sequence", axis: ["16:58","17:04","17:16","17:28","17:42"], flowStats: [["PLANNED WINDOW","16:58–17:42"],["DISPATCH SLACK","48 min"],["NEXT HANDOFF","PACK · 17:48"]],
      decisionTitle: "Reserve inspection team", decisionCopy: "Hold FI-01 and the A-frame packing team for TEX-8821. Forecast completion remains before the dispatch cut-off.", metrics: [["TRANSFER BUFFER","38 min"],["DISPATCH SLACK","48 min"]], action: "Reserve team"
    }
  };

  const departmentPlans = {
    incoming: {
      layout: "roll-flow",
      focusIndex: 2,
      eyebrow: "GREIGE DEPARTMENT · MATERIAL ENTRY",
      title: "Greige preparation stages & machine plan",
      kpis: { confidence: ["97.8%","+1.2% after release","positive"], bottleneck: ["BT-03","8 min batching queue","warning"], changeover: ["18 min","Roll-family sequence","positive"], wip: ["4 rolls","23,880 m in route",""] },
      details: ["Loom efficiency · 96%","4-point score · 8/100 yd","Batch weight · 1,420 kg","Transfer ETA · 08:24"],
      axis: ["07:30","08:00","08:30","09:00","09:30","10:00"],
      rows: [
        ["L-18","Loom take-off",[["TEX-8819",2,14,"done"],["TEX-8821 · roll close",19,20,"live"],["TEX-8826",44,17,"plan"]]],
        ["GI-02","Greige inspection",[["TEX-8816",3,13,"done"],["TEX-8821 · GSM + faults",24,23,"done"],["TEX-8824",54,18,"plan"]]],
        ["BT-03","Batcher",[["TEX-8819",4,16,"done"],["TEX-8821 · 6,240 m",49,24,"live"],["TEX-8824",78,16,"plan"]],68],
        ["AF-07","A-frame transfer",[["TEX-8816",3,14,"done"],["TEX-8821 → PT-02",53,19,"plan"],["TEX-8827",77,17,"plan"]]]
      ],
      decision: ["Release the prepared batch to PT-02.","Greige inspection is clear; keep AF-07 assigned to avoid an extra roll transfer."]
    },
    pretreatment: {
      layout: "continuous-range",
      focusIndex: 3,
      eyebrow: "PRETREATMENT DEPARTMENT · CONTINUOUS RANGE",
      title: "Pretreatment stages & machine plan",
      kpis: { confidence: ["94.7%","+3.1% wet-on-wet plan","positive"], bottleneck: ["MR-01","6 min behind release","warning"], changeover: ["26 min","Chemistry family sequence","positive"], wip: ["3 lots","18,460 m in range",""] },
      details: ["Flame · 1,050°C","Enzyme bath · 65°C","Peroxide bath · 98°C","Caustic · 22°Bé"],
      axis: ["08:20","08:45","09:10","09:35","10:00","10:25"],
      rows: [
        ["SG-01","Singeing",[["TEX-8819",2,14,"done"],["TEX-8821 · singeing",19,19,"done"],["TEX-8825",45,18,"plan"]]],
        ["DS-02","Desizing",[["TEX-8819",3,13,"done"],["TEX-8821 · desizing",24,21,"done"],["TEX-8825",51,18,"plan"]]],
        ["CB-02","Scouring & bleaching",[["TEX-8816",2,14,"done"],["TEX-8821 · bleach",47,27,"done"],["TEX-8824",78,18,"plan"]]],
        ["MR-01","Mercerizing",[["TEX-8816",3,14,"done"],["TEX-8821 · mercerize",61,24,"live"],["TEX-8824",87,10,"plan"]],81]
      ],
      decision: ["Keep the batch on the continuous range.","The singeing-to-mercerizing route is synchronized and releases directly to dyeing without intermediate storage."]
    },
    dyeing: {
      layout: "batch-timeline",
      focusIndex: 1,
      eyebrow: "DYEING DEPARTMENT · LIVE ROUTE",
      title: "Dyeing stages & machine plan",
      kpis: { confidence: ["91.6%","+4.8% after recovery","positive"], bottleneck: ["JD-04","18 min behind plan","warning"], changeover: ["42 min","Light → dark sequence","positive"], wip: ["3 lots","18,460 m in route",""] },
      details: ["Recipe accuracy · 99.4%","Bath ratio · 1:8","Rinse pH · 7.2","Residual moisture · 42%"],
      axis: ["10:00","11:00","12:00","13:00","14:00","15:00"],
      rows: [
        ["CK-01","Recipe & color dispensing",[["RN-8819",2,13,"done"],["RN-8821 dosing",18,17,"done"],["RN-8827",72,15,"plan"]]],
        ["JD-04","Jet dyeing machine",[["TEX-8819",2,15,"done"],["CIP",20,8,"changeover"],["TEX-8821 · 68%",30,37,"live"],["TEX-8827",72,23,"plan"]],61],
        ["WS-02","Wash-off range",[["TEX-8816",3,16,"done"],["TEX-8821 · rinse",70,14,"plan"],["TEX-8824",87,10,"plan"]]],
        ["HT-01","Hydro extractor",[["TEX-8816",4,13,"done"],["TEX-8819",28,13,"done"],["TEX-8821",86,10,"plan"]]]
      ],
      decision: ["Jet sequence protects the finishing slot.","Keep TEX-8821 on JD-04, then route through wash-off and hydro extraction before the protected ST-02 handoff."]
    },
    printing: {
      layout: "print-cells",
      focusIndex: 1,
      eyebrow: "PRINTING DEPARTMENT · SCREEN ROUTE",
      title: "Printing stages & machine plan",
      kpis: { confidence: ["89.4%","+5.6% after screen recovery","positive"], bottleneck: ["RP-02","22 min registration delay","warning"], changeover: ["35 min","Color-family sequence","positive"], wip: ["5 lots","27,300 m in route",""] },
      details: ["Paste viscosity · 4,200 cP","Repeat · 640 mm","Steam · 102°C","Wash pH · 7.1"],
      axis: ["10:30","11:15","12:00","12:45","13:30","14:15"],
      rows: [
        ["CK-02","Print color dispensing",[["TEX-8832 paste",2,16,"done"],["TEX-8840 paste",22,17,"live"],["TEX-8821 route",74,16,"plan"]]],
        ["RP-02","Rotary screen printer",[["TEX-8832",2,17,"done"],["Screen setup",23,10,"changeover"],["TEX-8840 print",35,30,"live"],["TEX-8821",72,20,"plan"]],57],
        ["LS-01","Loop steamer",[["TEX-8829",3,15,"done"],["TEX-8840 fixation",68,15,"plan"],["TEX-8821",86,11,"plan"]]],
        ["PW-01","Print wash range",[["TEX-8829",3,16,"done"],["TEX-8832",39,16,"live"],["TEX-8840",78,18,"plan"]]]
      ],
      decision: ["Synchronize print fixation and wash-off.","Reserve LS-01 before the print run exits RP-02 to prevent waiting time and shade migration."]
    },
    finishing: {
      layout: "finish-parameters",
      focusIndex: 0,
      eyebrow: "FINISHING DEPARTMENT · PROTECTED SLOT",
      title: "Finishing stages & machine plan",
      kpis: { confidence: ["92.8%","+3.7% protected slot","positive"], bottleneck: ["ST-02","11 min slot exposure","warning"], changeover: ["24 min","Width-first sequence","positive"], wip: ["3 lots","16,840 m in route",""] },
      details: ["185°C · 42 m/min","Nip load · 120 kN","Roll width · 1,520 mm"],
      axis: ["15:00","15:30","16:00","16:30","17:00","17:30"],
      rows: [
        ["ST-02","Stenter",[["TEX-8816",2,13,"done"],["Setup buffer",17,11,"idle"],["TEX-8821 · +11m",30,31,"risk"],["TEX-8827",66,25,"plan"]],30],
        ["CL-01","Calender",[["TEX-8819",3,17,"done"],["TEX-8821 · finish",63,17,"plan"],["TEX-8827",83,14,"plan"]]],
        ["RL-03","Rolling & batching",[["TEX-8816",2,15,"done"],["TEX-8819",25,16,"done"],["TEX-8821 · roll",78,18,"plan"]]]
      ],
      decision: ["Protect the ST-02 start window.","Hold the stenter setup until dyeing release, then keep calendering and rolling in the same material-flow lane."]
    },
    inspection: {
      layout: "quality-gates",
      focusIndex: 0,
      eyebrow: "QUALITY DEPARTMENT · OUTGOING ROUTE",
      title: "Inspection and packing stages & machine plan",
      kpis: { confidence: ["96.2%","+2.4% team reservation","positive"], bottleneck: ["FI-01","9 min inspection queue","warning"], changeover: ["16 min","Grouped dispatch sequence","positive"], wip: ["4 rolls","21,120 m awaiting QA",""] },
      details: ["A-grade · 98.6%","Mapped faults · 6","Roll tension · 28 N","Dispatch · 18:30"],
      axis: ["16:45","17:00","17:15","17:30","17:45","18:00"],
      rows: [
        ["FI-01","4-point inspection",[["TEX-8819",2,16,"done"],["TEX-8824",23,19,"live"],["TEX-8821 · inspect",47,26,"plan"]]],
        ["DM-01","Defect mapping",[["TEX-8819",3,13,"done"],["TEX-8824",45,16,"plan"],["TEX-8821",65,17,"plan"]]],
        ["RL-04","Final rolling",[["TEX-8816",2,14,"done"],["TEX-8819",22,14,"done"],["TEX-8821 · final roll",72,20,"plan"]]],
        ["PK-02","Packing",[["TEX-8816",3,14,"done"],["TEX-8819",42,15,"live"],["TEX-8821 · dispatch",78,18,"plan"]]]
      ],
      decision: ["Keep inspection and packing as one flow.","Pre-stage RL-04 and dispatch labels so accepted fabric moves directly from FI-01 into packing."]
    }
  };

  const planningView = document.getElementById("productionPlanningView");
  let planningTooltip = document.querySelector(".planning-tooltip");
  if (!planningTooltip) {
    planningTooltip = document.createElement("div");
    planningTooltip.className = "planning-tooltip";
    planningTooltip.setAttribute("role", "tooltip");
    planningTooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(planningTooltip);
  }

  const stageDetailsData = {
    incoming: { title: "Greige Release", machine: "L-18 · Loom Take-off", text: "Verified 6,240 m greige batch released 7 min early with 99.4% roll yield." },
    pretreatment: { title: "Continuous Pretreatment", machine: "Range PT-02", text: "Scour, bleach, wash and neutralize sequence synchronized directly to dyeing." },
    dyeing: { title: "Dyeing", machine: "JD-04 · Recipe RN-8821", text: "Current active lot in process (68%). Protected ST-02 slot reservation at 15:05." },
    printing: { title: "Rotary Printing", machine: "RP-02 · Screen Route", text: "Optional bypass route available with 12-color rotary screen setup buffer." },
    finishing: { title: "Stenter Finishing", machine: "ST-02 · Reserved", text: "Protected heat-setting window (185°C · 42 m/min) held for TEX-8821 release." },
    inspection: { title: "Final Inspection & Packing", machine: "FI-01 · A-Frame Line", text: "4-point grading and defect mapping reserved for delivery cut-off at 18:30." }
  };

  stageNodes.forEach((node) => {
    const stage = node.dataset.planStage;
    const d = stageDetailsData[stage];
    if (d) {
      node.dataset.tooltip = `<strong>${d.title}</strong><em>${d.machine}</em><span>${d.text} · Click to view machine plan</span>`;
    }
  });

  const flowConnectors = planningView?.querySelectorAll(".fabric-flow-connector");
  flowConnectors?.forEach((conn, idx) => {
    conn.dataset.tooltip = `<strong>Material Flow Conveyance · Stage 0${idx + 1} → 0${idx + 2}</strong><em>Automated A-Frame / Roll Transfer</em><span>Buffer monitored by plant RFID &amp; floor sensors.</span>`;
  });

  document.querySelectorAll(".schedule-legend span").forEach((item) => {
    const text = item.textContent.trim();
    item.dataset.tooltip = `<strong>Schedule Status: ${text}</strong><em>Factory Machine Lane Marker</em><span>Tracks scheduled, currently executing, or at-risk batch blocks.</span>`;
  });

  if (reoptimizeBtn) reoptimizeBtn.dataset.tooltip = "<strong>Re-optimize Production Plan</strong><em>Constraint-Aware Sequencing</em><span>Re-evaluate active bottlenecks, changeover buffers and downstream delivery cut-offs.</span>";
  if (recoveryBtn) recoveryBtn.dataset.tooltip = "<strong>Apply AI Recovery Action</strong><em>Automated Delay Compensation</em><span>Execute recommended buffer hold or routing adjustment to protect dispatch time.</span>";

  // Output progress elements tooltips
  const summaryActual = planningView?.querySelector(".output-summary span:nth-of-type(1)");
  if (summaryActual) summaryActual.dataset.tooltip = "<strong>ACTUAL OUTPUT</strong><em>Cumulative good metres: 3,920 m</em><span>Quality-verified fabric metres completed this shift.</span>";
  const summaryPlan = planningView?.querySelector(".output-summary span:nth-of-type(2)");
  if (summaryPlan) summaryPlan.dataset.tooltip = "<strong>PLANNED BENCHMARK</strong><em>Shift target: 4,180 m</em><span>Planned production curve required to hit 18:30 dispatch cut-off.</span>";
  const summaryGap = planningView?.querySelector(".output-summary .output-gap");
  if (summaryGap) summaryGap.dataset.tooltip = "<strong>OUTPUT VARIANCE</strong><em>Variance: −260 m</em><span>Production lag currently being recovered via wash-off sync.</span>";
  const liveChip = planningView?.querySelector(".output-summary .planning-live-chip");
  if (liveChip) liveChip.dataset.tooltip = "<strong>LIVE TELEMETRY STREAM</strong><em>Update frequency: Real-time</em><span>Direct telemetry feed from loom sensors, jet flowmeters and stenters.</span>";

  planningView?.querySelectorAll(".output-chart-footer span").forEach((key) => {
    key.dataset.tooltip = `<strong>Output Curve: ${key.textContent.trim()}</strong><em>Cumulative Production Analysis</em><span>Compares shift plan against sensor-verified output and machine forecast.</span>`;
  });

  // Handoff panel elements tooltips
  const handoff1 = planningView?.querySelector(".handoff-item:nth-child(1)");
  if (handoff1) handoff1.dataset.tooltip = "<strong>Dyeing to Finishing Route Protection</strong><em>JD-04 → ST-02</em><span>Readiness 82% · Predicted arrival 15:16 · Reserved window 15:05 (11 min exposure).</span>";
  const handoff2 = planningView?.querySelector(".handoff-item:nth-child(2)");
  if (handoff2) handoff2.dataset.tooltip = "<strong>Finishing to Inspection Capacity</strong><em>ST-02 → FI-01</em><span>Readiness 96% · Inspection capacity secured · 38 min transfer buffer.</span>";
  const risk1 = planningView?.querySelector(".flow-risk-summary div:nth-child(1)");
  if (risk1) risk1.dataset.tooltip = "<strong>STARVATION RISK: LOW</strong><em>Downstream Continuity</em><span>Continuous roll buffer ensures stenter ST-02 does not starve.</span>";
  const risk2 = planningView?.querySelector(".flow-risk-summary div:nth-child(2)");
  if (risk2) risk2.dataset.tooltip = "<strong>BLOCKING RISK: NONE</strong><em>Exit Lane Clearance</em><span>Inspection team ready; no A-frame queue backup at finish range.</span>";
  const risk3 = planningView?.querySelector(".flow-risk-summary div:nth-child(3)");
  if (risk3) risk3.dataset.tooltip = "<strong>TRANSFER BUFFER: 38 MIN</strong><em>Dispatch Protection</em><span>Slack time allows on-time handoff for 18:30 dispatch cut-off.</span>";

  // Bind Sparkline Hover for 4 Planning KPI Cards
  const planningSparkConfigs = [
    {
      wrapId: "planningSparkWrapConfidence",
      path: document.querySelector("#planningSparkWrapConfidence .spark-line"),
      cross: document.querySelector("#planningSparkWrapConfidence .spark-crosshair"),
      dot: document.querySelector("#planningSparkWrapConfidence .spark-hover-dot"),
      tip: document.querySelector("#planningSparkWrapConfidence .spark-tooltip"),
      val: document.querySelector("#planningSparkWrapConfidence .tip-value"),
      formatter: (t) => `${(94.2 + t * 2.8 + Math.sin(t * 6) * 0.4).toFixed(1)}%`
    },
    {
      wrapId: "planningSparkWrapBottleneck",
      path: document.querySelector("#planningSparkWrapBottleneck .spark-line"),
      cross: document.querySelector("#planningSparkWrapBottleneck .spark-crosshair"),
      dot: document.querySelector("#planningSparkWrapBottleneck .spark-hover-dot"),
      tip: document.querySelector("#planningSparkWrapBottleneck .spark-tooltip"),
      val: document.querySelector("#planningSparkWrapBottleneck .tip-value"),
      formatter: (t) => `${Math.round(22 - t * 13 + Math.sin(t * 8) * 1.5)} min queue lag`
    },
    {
      wrapId: "planningSparkWrapChangeover",
      path: document.querySelector("#planningSparkWrapChangeover .spark-line"),
      cross: document.querySelector("#planningSparkWrapChangeover .spark-crosshair"),
      dot: document.querySelector("#planningSparkWrapChangeover .spark-hover-dot"),
      tip: document.querySelector("#planningSparkWrapChangeover .spark-tooltip"),
      val: document.querySelector("#planningSparkWrapChangeover .tip-value"),
      formatter: (t) => `${Math.round(10 + t * 22 + Math.sin(t * 6) * 2)} min saved`
    },
    {
      wrapId: "planningSparkWrapWip",
      path: document.querySelector("#planningSparkWrapWip .spark-line"),
      cross: document.querySelector("#planningSparkWrapWip .spark-crosshair"),
      dot: document.querySelector("#planningSparkWrapWip .spark-hover-dot"),
      tip: document.querySelector("#planningSparkWrapWip .spark-tooltip"),
      val: document.querySelector("#planningSparkWrapWip .tip-value"),
      formatter: (t) => `${Math.round(15000 + t * 6320).toLocaleString()} m WIP`
    }
  ];

  planningSparkConfigs.forEach((cfg) => {
    const wrap = document.getElementById(cfg.wrapId);
    if (!wrap || !cfg.path) return;

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const t = mouseX / rect.width;
      const targetSvgX = t * 340;
      if (cfg.path.getTotalLength) {
        const len = cfg.path.getTotalLength();
        let s = 0, end = len;
        for (let i = 0; i < 16; i++) {
          const mid = (s + end) / 2;
          const p = cfg.path.getPointAtLength(mid);
          if (p.x < targetSvgX) s = mid;
          else end = mid;
        }
        const pt = cfg.path.getPointAtLength((s + end) / 2);
        if (cfg.cross) {
          cfg.cross.setAttribute("x1", pt.x.toFixed(1));
          cfg.cross.setAttribute("x2", pt.x.toFixed(1));
          cfg.cross.style.opacity = "1";
        }
        if (cfg.dot) {
          cfg.dot.setAttribute("cx", pt.x.toFixed(1));
          cfg.dot.setAttribute("cy", pt.y.toFixed(1));
          cfg.dot.style.opacity = "1";
        }
        if (cfg.val) {
          cfg.val.textContent = cfg.formatter(t);
        }
        if (cfg.tip) {
          cfg.tip.style.display = "flex";
          cfg.tip.style.left = `${mouseX}px`;
          cfg.tip.style.top = `${Math.max(6, (pt.y / 70) * rect.height - 10)}px`;
        }
      }
    });

    wrap.addEventListener("mouseleave", () => {
      if (cfg.cross) cfg.cross.style.opacity = "0";
      if (cfg.dot) cfg.dot.style.opacity = "0";
      if (cfg.tip) cfg.tip.style.display = "none";
    });
  });

  // Interactive hover on output chart
  const chartWrap = planningView?.querySelector(".output-chart-wrap");
  const chartTip = planningView?.querySelector(".output-chart-tip");
  const outputCrosshair = planningView?.querySelector(".output-crosshair");
  const outputHoverTracker = planningView?.querySelector(".output-hover-tracker");
  let chartHoverRatio = null;

  if (chartWrap && chartTip) {
    chartWrap.addEventListener("mousemove", (e) => {
      const rect = chartWrap.getBoundingClientRect();
      chartHoverRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const totalMinutes = 600; // 08:00 to 18:00
      const currentMin = Math.round(chartHoverRatio * totalMinutes);
      const h = 8 + Math.floor(currentMin / 60);
      const m = currentMin % 60;
      const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const isPast = chartHoverRatio <= 0.72;
      const actualNowMetres = parseInt(planningView?.querySelector(".output-summary span:nth-of-type(1) strong")?.textContent?.replace(/\D/g, "") || "3920", 10);
      const liveOffset = (actualNowMetres - 3920);
      const metres = Math.round(58 + chartHoverRatio * (6240 - 58) + (isPast ? liveOffset : 0));
      const planMetres = Math.round(58 + chartHoverRatio * (6240 - 58) * 1.06);
      const diffM = metres - planMetres;
      const diffSign = diffM > 0 ? "+" : "−";

      const targetSvgX = 58 + chartHoverRatio * (875 - 58);
      const outputLine = isPast ? planningView?.querySelector(".output-actual-line") : planningView?.querySelector(".output-forecast-line");
      let ptY = 38;
      if (outputLine && outputLine.getTotalLength) {
        const len = outputLine.getTotalLength();
        let s = 0, end = len;
        for (let i = 0; i < 16; i++) {
          const mid = (s + end) / 2;
          const p = outputLine.getPointAtLength(mid);
          if (p.x < targetSvgX) s = mid;
          else end = mid;
        }
        ptY = outputLine.getPointAtLength((s + end) / 2).y;
      }

      if (outputCrosshair) {
        outputCrosshair.setAttribute("x1", targetSvgX.toFixed(1));
        outputCrosshair.setAttribute("x2", targetSvgX.toFixed(1));
        outputCrosshair.style.opacity = "1";
      }
      if (outputHoverTracker) {
        outputHoverTracker.setAttribute("cx", targetSvgX.toFixed(1));
        outputHoverTracker.setAttribute("cy", ptY.toFixed(1));
        outputHoverTracker.style.opacity = "1";
      }

      const tipW = chartTip.offsetWidth || 165;
      const tipH = chartTip.offsetHeight || 50;
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;

      let tipLeft = posX - tipW / 2;
      tipLeft = Math.max(8, Math.min(rect.width - tipW - 8, tipLeft));

      let tipTop = posY - tipH - 12;
      if (tipTop < 6) {
        tipTop = posY + 16;
      }
      tipTop = Math.max(6, Math.min(rect.height - tipH - 6, tipTop));

      chartTip.style.left = `${tipLeft}px`;
      chartTip.style.top = `${tipTop}px`;
      chartTip.innerHTML = `<strong>${timeStr} · ${isPast ? 'Recorded Output' : 'AI Forecast'}</strong><span>${isPast ? 'Good output' : 'Projected output'}: <b>${metres.toLocaleString()} m</b></span><span>Variance: <b style="color:${diffM >= 0 ? '#10B981' : '#F59E0B'}">Δ ${diffSign}${Math.abs(diffM).toLocaleString()} m</b> · ${isPast ? 'Quality verified ✓' : 'Dispatch due 18:30'}</span>`;
    });
    chartWrap.addEventListener("mouseleave", () => {
      chartHoverRatio = null;
      chartTip.style.left = "71%";
      chartTip.style.top = "10px";
      const actualVal = planningView?.querySelector(".output-summary span:nth-of-type(1) strong")?.textContent || "3,920 m";
      chartTip.innerHTML = `<strong>14:32 · JD-04</strong><span>Good output <b>${actualVal}</b></span><span>Projected completion 17:42</span>`;
      if (outputCrosshair) outputCrosshair.style.opacity = "0";
      if (outputHoverTracker) outputHoverTracker.style.opacity = "0";
    });
  }

  function positionPlanningTooltip(target, event) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const pad = 12;
    const gap = 12;
    const width = planningTooltip.offsetWidth || 290;
    const height = planningTooltip.offsetHeight || 65;

    let anchorX = rect.left + rect.width / 2;
    if (event && typeof event.clientX === "number" && event.clientX >= rect.left - 10 && event.clientX <= rect.right + 10) {
      anchorX = Math.max(rect.left + 12, Math.min(rect.right - 12, event.clientX));
    }

    let left = anchorX - width / 2;
    if (left < pad) {
      left = pad;
    } else if (left + width > window.innerWidth - pad) {
      left = window.innerWidth - width - pad;
    }

    let top = rect.top - height - gap;
    let isBelow = false;
    if (top < pad) {
      top = rect.bottom + gap;
      isBelow = true;
      if (top + height > window.innerHeight - pad) {
        top = Math.max(pad, window.innerHeight - height - pad);
      }
    }

    const arrowX = Math.max(16, Math.min(width - 16, anchorX - left));

    planningTooltip.style.left = `${Math.round(left)}px`;
    planningTooltip.style.top = `${Math.round(top)}px`;
    planningTooltip.style.setProperty("--arrow-left", `${Math.round(arrowX)}px`);
    planningTooltip.classList.toggle("pos-below", isBelow);
  }

  let activePlanningTooltipTarget = null;

  function showPlanningTooltip(target, event) {
    if (!target?.dataset.tooltip) return;
    activePlanningTooltipTarget = target;
    planningTooltip.innerHTML = target.dataset.tooltip;
    planningTooltip.classList.add("is-visible");
    planningTooltip.setAttribute("aria-hidden", "false");
    positionPlanningTooltip(target, event);
  }

  function hidePlanningTooltip() {
    activePlanningTooltipTarget = null;
    planningTooltip.classList.remove("is-visible");
    planningTooltip.setAttribute("aria-hidden", "true");
  }

  planningView?.addEventListener("pointerover", (event) => showPlanningTooltip(event.target.closest("[data-tooltip]"), event));
  planningView?.addEventListener("pointermove", (event) => {
    const target = event.target.closest("[data-tooltip]");
    if (target && planningTooltip.classList.contains("is-visible")) positionPlanningTooltip(target, event);
  });
  planningView?.addEventListener("pointerout", (event) => {
    const target = event.target.closest("[data-tooltip]");
    if (target && !target.contains(event.relatedTarget)) hidePlanningTooltip();
  });
  planningView?.addEventListener("focusin", (event) => showPlanningTooltip(event.target.closest("[data-tooltip]")));
  planningView?.addEventListener("focusout", hidePlanningTooltip);
  window.addEventListener("scroll", hidePlanningTooltip, true);
  stagePanel?.addEventListener("click", (event) => {
    const block = event.target.closest(".lot-block,.changeover-block,.idle-block");
    const lane = event.target.closest(".machine-lane");
    if (block) {
      stagePanel.querySelectorAll(".is-user-selected").forEach((item) => item.classList.remove("is-user-selected"));
      block.classList.add("is-user-selected");
    } else if (lane) {
      stagePanel.querySelectorAll(".machine-lane.is-inspected").forEach((item) => item.classList.remove("is-inspected"));
      lane.classList.add("is-inspected");
    }
  });
  stagePanel?.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[role='button'],.machine-lane")) {
      event.preventDefault();
      event.target.click();
    }
  });

  function renderStagePlan(stageKey, shouldScroll) {
    const plan = departmentPlans[stageKey];
    if (!plan) return;
    stageNodes.forEach((node) => {
      const selected = node.dataset.planStage === stageKey;
      node.classList.toggle("is-selected", selected);
      if (selected) node.setAttribute("aria-current", "step");
      else node.removeAttribute("aria-current");
    });
    const eyebrow = document.getElementById("departmentScheduleEyebrow");
    const title = document.getElementById("departmentScheduleTitle");
    const axis = document.getElementById("departmentTimeAxis");
    const lanes = document.getElementById("departmentMachineLanes");
    const decisionTitle = document.getElementById("departmentDecisionTitle");
    const decisionCopy = document.getElementById("departmentDecisionCopy");
    if (eyebrow) eyebrow.textContent = plan.eyebrow;
    if (title) title.textContent = plan.title;
    [
      ["planningKpiConfidence","planningKpiConfidenceNote",plan.kpis.confidence],
      ["planningKpiBottleneck","planningKpiBottleneckNote",plan.kpis.bottleneck],
      ["planningKpiChangeover","planningKpiChangeoverNote",plan.kpis.changeover],
      ["planningKpiWip","planningKpiWipNote",plan.kpis.wip]
    ].forEach(([valueId, noteId, data]) => {
      const value = document.getElementById(valueId);
      const note = document.getElementById(noteId);
      if (value) value.textContent = data[0];
      if (note) { note.textContent = data[1]; note.className = data[2] || ""; }
      const card = value?.closest(".planning-kpi");
      if (card) {
        const label = card.querySelector("span")?.textContent || "Planning indicator";
        card.dataset.tooltip = `<strong>${label} · ${data[0]}</strong><em>${data[1]}</em><span>Constraint-aware dynamic AI schedule telemetry.</span>`;
      }
    });
    if (stagePanel) {
      stagePanel.classList.remove("is-roll-flow","is-continuous-range","is-batch-timeline","is-print-cells","is-finish-parameters","is-quality-gates");
      stagePanel.classList.add("is-batch-timeline");
      stagePanel.dataset.department = stageKey;
    }
    if (axis) {
      axis.classList.remove("is-hidden");
      axis.innerHTML = `<span></span>${plan.axis.map((time) => `<b data-tooltip="<strong>Timeline Marker ${time}</strong><em>Shift Scheduling Axis</em><span>Synchronized with active factory clock</span>">${time}</b>`).join("")}`;
    }
    if (lanes) {
      lanes.className = "machine-lanes department-layout-batch-timeline";
      lanes.innerHTML = plan.rows.map(([code, name, blocks, now], index) => {
        const hasFocusLot = blocks.some(([label]) => label.includes("TEX-8821") || label.includes("RN-8821"));
        return `<div class="machine-lane${hasFocusLot ? " has-focus-lot" : ""}" tabindex="0" data-tooltip="<strong>${code} · ${name}</strong><em>Telemetry: ${plan.details[index]}</em><span>Status: Active sequence · Focus lot: ${hasFocusLot ? 'Running in lane' : 'Scheduled'}</span>">
          <div class="machine-label"><strong>${code}</strong><span>${name}</span><em>${plan.details[index]}</em></div>
          <div class="lane-track">
            ${blocks.map(([label, left, width, state]) => {
              const isFocus = label.includes("TEX-8821") || label.includes("RN-8821");
              const status = state === "done" ? "Completed" : state === "live" ? "Active now" : state === "risk" ? "At risk" : state === "changeover" ? "Changeover" : state === "idle" ? "Protected buffer" : "Planned";
              const blockClass = state === "changeover" ? "changeover-block" : state === "idle" ? "idle-block" : `lot-block${state === "done" ? " is-done" : state === "live" ? " is-live" : state === "risk" ? " is-risk" : ""}`;
              return `<span class="${blockClass}${isFocus ? " is-focus-lot" : ""}" tabindex="0" role="button" data-tooltip="<strong>Lot ${label}</strong><em>${status} · Machine ${code} (${name})</em><span>Timeline: ${left}%–${left + width}% · ${isFocus ? 'Selected priority lot TEX-8821' : 'Batch sequence'}</span>" style="left:${left}%;width:${width}%">${label}</span>`;
            }).join("")}
            ${now ? `<span class="now-line" style="left:${now}%" data-tooltip="<strong>Live Factory Clock (NOW)</strong><em>Timeline marker: ${now}%</em><span>Real-time shop-floor synchronization active</span>"><i>NOW</i></span>` : ""}
          </div>
        </div>`;
      }).join("");
    }
    if (decisionTitle) decisionTitle.textContent = plan.decision[0];
    if (decisionCopy) decisionCopy.textContent = plan.decision[1];
    if (recoveryBtn) { recoveryBtn.disabled = false; recoveryBtn.textContent = "Apply recovery"; recoveryBtn.closest(".schedule-callout")?.classList.remove("is-applied"); }
    if (shouldScroll && stagePanel && planningView && planningView.scrollHeight > planningView.clientHeight) {
      stagePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  let currentStageKey = "incoming";

  stageNodes.forEach((node) => {
    node.addEventListener("click", () => {
      sfx.playClick();
      currentStageKey = node.dataset.planStage;
      renderStagePlan(node.dataset.planStage, true);
    });
    node.addEventListener("keydown", (e) => {
      if (e.target !== node) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        node.click();
      }
    });
  });

  document.querySelectorAll(".flow-stage-machine-select").forEach((sel) => {
    sel.addEventListener("click", (e) => e.stopPropagation());
    sel.addEventListener("pointerdown", (e) => e.stopPropagation());
    sel.addEventListener("mousedown", (e) => e.stopPropagation());
    sel.addEventListener("pointerover", (e) => {
      e.stopPropagation();
      hidePlanningTooltip();
    });
    sel.addEventListener("change", (e) => {
      e.stopPropagation();
      const node = sel.closest(".fabric-flow-node");
      const small = node?.querySelector("small");
      if (small && sel.selectedOptions[0]) {
        const fullText = sel.selectedOptions[0].textContent;
        const brand = fullText.split("—")[0]?.trim() || fullText.split("·")[0]?.trim();
        const model = fullText.split("—")[1]?.trim() || "";
        if (brand && model) {
          small.textContent = `${brand} · ${model.slice(0, 20)}`.trim();
        }
      }
    });
  });
  renderStagePlan("incoming", false);

  const stageFluctuations = {
    incoming: (t) => ({
      conf: (97.8 + Math.sin(t * 1.4) * 0.22).toFixed(1) + "%",
      confNote: `+${(1.2 + Math.cos(t * 1.1) * 0.15).toFixed(1)}% after release`,
      confCls: "positive",
      bCode: "BT-03",
      bNote: `${Math.round(8 + Math.sin(t * 0.8) * 0.4)} min batching queue`,
      cTime: `${Math.round(18 + Math.cos(t * 0.7) * 0.5)} min`,
      cNote: "Roll-family sequence",
      wip: "4 rolls",
      wipNote: `${Math.round(23880 + Math.sin(t * 1.5) * 38).toLocaleString()} m in route`,
      lanes: [
        `Loom efficiency · ${(96 + Math.sin(t * 1.2) * 0.35).toFixed(1)}%`,
        `4-point score · ${(8 + Math.cos(t * 0.9) * 0.2).toFixed(1)}/100 yd`,
        `Batch weight · ${(1420 + Math.round(Math.sin(t * 1.3) * 4)).toLocaleString()} kg`,
        `Transfer ETA · 08:24`
      ]
    }),
    pretreatment: (t) => ({
      conf: (94.7 + Math.sin(t * 1.3) * 0.24).toFixed(1) + "%",
      confNote: `+${(3.1 + Math.cos(t * 1.2) * 0.18).toFixed(1)}% wet-on-wet plan`,
      confCls: "positive",
      bCode: "MR-01",
      bNote: `${Math.round(6 + Math.sin(t * 0.9) * 0.3)} min behind release`,
      cTime: `${Math.round(26 + Math.cos(t * 0.8) * 0.6)} min`,
      cNote: "Chemistry family sequence",
      wip: "3 lots",
      wipNote: `${Math.round(18460 + Math.sin(t * 1.4) * 32).toLocaleString()} m in range`,
      lanes: [
        `Flame · ${Math.round(1050 + Math.sin(t * 1.1) * 4)}°C`,
        `Enzyme bath · ${(65 + Math.cos(t * 0.8) * 0.4).toFixed(1)}°C`,
        `Peroxide bath · ${(98 + Math.sin(t * 1.3) * 0.5).toFixed(1)}°C`,
        `Caustic · ${(22 + Math.cos(t * 1.0) * 0.2).toFixed(1)}°Bé`
      ]
    }),
    dyeing: (t) => ({
      conf: (91.6 + Math.sin(t * 1.5) * 0.26).toFixed(1) + "%",
      confNote: `+${(4.8 + Math.cos(t * 1.1) * 0.2).toFixed(1)}% after recovery`,
      confCls: "positive",
      bCode: "JD-04",
      bNote: `${Math.round(18 + Math.sin(t * 0.7) * 0.5)} min behind plan`,
      cTime: `${Math.round(42 + Math.cos(t * 0.8) * 0.8)} min`,
      cNote: "Light → dark sequence",
      wip: "3 lots",
      wipNote: `${Math.round(18460 + Math.sin(t * 1.3) * 35).toLocaleString()} m in route`,
      lanes: [
        `Recipe accuracy · ${(99.4 + Math.sin(t * 0.9) * 0.15).toFixed(1)}%`,
        `Bath ratio · 1:8 · ${Math.round(132 + Math.sin(t * 1.2) * 2)}°C`,
        `Rinse pH · ${(7.2 + Math.cos(t * 1.0) * 0.1).toFixed(1)}`,
        `Residual moisture · ${(42 + Math.sin(t * 1.4) * 0.5).toFixed(1)}%`
      ]
    }),
    printing: (t) => ({
      conf: (89.4 + Math.sin(t * 1.2) * 0.28).toFixed(1) + "%",
      confNote: `+${(5.6 + Math.cos(t * 1.0) * 0.22).toFixed(1)}% after screen recovery`,
      confCls: "positive",
      bCode: "RP-02",
      bNote: `${Math.round(22 + Math.sin(t * 0.8) * 0.6)} min registration delay`,
      cTime: `${Math.round(35 + Math.cos(t * 0.9) * 0.7)} min`,
      cNote: "Color-family sequence",
      wip: "5 lots",
      wipNote: `${Math.round(27300 + Math.sin(t * 1.6) * 45).toLocaleString()} m in route`,
      lanes: [
        `Paste viscosity · ${Math.round(4200 + Math.sin(t * 1.1) * 20)} cP`,
        `Repeat · 640 mm · ${(48 + Math.sin(t * 1.3) * 0.6).toFixed(1)} m/min`,
        `Steam · ${(102 + Math.cos(t * 0.8) * 0.4).toFixed(1)}°C`,
        `Wash pH · ${(7.1 + Math.sin(t * 1.2) * 0.1).toFixed(1)}`
      ]
    }),
    finishing: (t) => ({
      conf: (92.8 + Math.sin(t * 1.4) * 0.25).toFixed(1) + "%",
      confNote: `+${(3.7 + Math.cos(t * 1.2) * 0.18).toFixed(1)}% protected slot`,
      confCls: "positive",
      bCode: "ST-02",
      bNote: `${Math.round(11 + Math.sin(t * 0.8) * 0.4)} min slot exposure`,
      cTime: `${Math.round(24 + Math.cos(t * 0.7) * 0.5)} min`,
      cNote: "Width-first sequence",
      wip: "3 lots",
      wipNote: `${Math.round(16840 + Math.sin(t * 1.3) * 28).toLocaleString()} m in route`,
      lanes: [
        `${Math.round(185 + Math.sin(t * 1.0) * 1.5)}°C · ${(42 + Math.cos(t * 1.2) * 0.5).toFixed(1)} m/min`,
        `Nip load · ${Math.round(120 + Math.sin(t * 0.9) * 2)} kN`,
        `Roll width · 1,520 mm · ${(98 + Math.cos(t * 1.1) * 0.4).toFixed(1)}%`
      ]
    }),
    inspection: (t) => ({
      conf: (96.2 + Math.sin(t * 1.3) * 0.22).toFixed(1) + "%",
      confNote: `+${(2.4 + Math.cos(t * 1.1) * 0.15).toFixed(1)}% team reservation`,
      confCls: "positive",
      bCode: "FI-01",
      bNote: `${Math.round(9 + Math.sin(t * 0.8) * 0.3)} min inspection queue`,
      cTime: `${Math.round(16 + Math.cos(t * 0.9) * 0.4)} min`,
      cNote: "Grouped dispatch sequence",
      wip: "4 rolls",
      wipNote: `${Math.round(21120 + Math.sin(t * 1.5) * 36).toLocaleString()} m awaiting QA`,
      lanes: [
        `A-grade · ${(98.6 + Math.sin(t * 1.2) * 0.18).toFixed(1)}%`,
        `Mapped faults · ${Math.round(6 + Math.sin(t * 0.7) * 0.4)}`,
        `Roll tension · ${(28 + Math.cos(t * 1.0) * 0.5).toFixed(1)} N`,
        `Dispatch · 18:30`
      ]
    })
  };

  function tickPlanningLive() {
    if (planningView && planningView.style.display === "none") return;
    const t = Date.now() / 1000;

    // 1. Fluctuating KPIs & machine lanes for ANY active department
    const flucFn = stageFluctuations[currentStageKey];
    if (flucFn) {
      const data = flucFn(t);
      const kpiConf = document.getElementById("planningKpiConfidence");
      if (kpiConf) kpiConf.textContent = data.conf;
      const confNote = document.getElementById("planningKpiConfidenceNote");
      if (confNote) {
        confNote.textContent = data.confNote;
        confNote.className = data.confCls;
      }
      const bVal = document.getElementById("planningKpiBottleneck");
      if (bVal) bVal.textContent = data.bCode;
      const bNote = document.getElementById("planningKpiBottleneckNote");
      if (bNote) bNote.textContent = data.bNote;
      const cVal = document.getElementById("planningKpiChangeover");
      if (cVal) cVal.textContent = data.cTime;
      const cNote = document.getElementById("planningKpiChangeoverNote");
      if (cNote) cNote.textContent = data.cNote;
      const wipVal = document.getElementById("planningKpiWip");
      if (wipVal) wipVal.textContent = data.wip;
      const wipNote = document.getElementById("planningKpiWipNote");
      if (wipNote) wipNote.textContent = data.wipNote;

      data.lanes.forEach((text, i) => {
        const lane = planningView.querySelector(`.machine-lane:nth-child(${i + 1})`);
        if (lane) {
          const laneEm = lane.querySelector(".machine-label em");
          if (laneEm) laneEm.textContent = text;
          const code = lane.querySelector(".machine-label strong")?.textContent || "";
          const name = lane.querySelector(".machine-label span")?.textContent || "";
          lane.dataset.tooltip = `<strong>${code} · ${name}</strong><em>Telemetry: ${text}</em><span>Status: Active sequence · Live shop-floor sensor feed.</span>`;
        }
      });

      const kpiCard1 = planningView.querySelector(".planning-kpi-row .kpi-card:nth-child(1)");
      if (kpiCard1) kpiCard1.dataset.tooltip = `<strong>ON-TIME CONFIDENCE · ${data.conf}</strong><em>${data.confNote}</em><span>AI Confidence Index · Constraint-aware live factory schedule telemetry.</span>`;
      const kpiCard2 = planningView.querySelector(".planning-kpi-row .kpi-card:nth-child(2)");
      if (kpiCard2) kpiCard2.dataset.tooltip = `<strong>CURRENT BOTTLENECK · ${data.bCode}</strong><em>${data.bNote}</em><span>Active constraint holding back takt time across current sequence.</span>`;
      const kpiCard3 = planningView.querySelector(".planning-kpi-row .kpi-card:nth-child(3)");
      if (kpiCard3) kpiCard3.dataset.tooltip = `<strong>CHANGEOVER SAVED · ${data.cTime}</strong><em>${data.cNote}</em><span>AI matrix sequencing buffer saved against unsorted batch setup.</span>`;
      const kpiCard4 = planningView.querySelector(".planning-kpi-row .kpi-card:nth-child(4)");
      if (kpiCard4) kpiCard4.dataset.tooltip = `<strong>WIP AHEAD · ${data.wip}</strong><em>${data.wipNote}</em><span>Work-in-progress fabric lots actively en route to next stage.</span>`;
    }

    // Fluctuating progress on active dyeing step 03 node
    const dyeingNode = planningView?.querySelector('.fabric-flow-node[data-plan-stage="dyeing"]');
    if (dyeingNode) {
      const prog = (68 + Math.sin(t * 1.2) * 0.5).toFixed(1);
      const minLeft = Math.round(46 - (prog - 68) * 3);
      const progBar = dyeingNode.querySelector(".flow-progress span");
      if (progBar) progBar.style.width = `${prog}%`;
      const progFoot = dyeingNode.querySelector(".flow-node-foot span");
      if (progFoot) progFoot.textContent = `${Math.round(prog)}% · ${minLeft} min left`;
      dyeingNode.dataset.tooltip = `<strong>03 · Dyeing</strong><em>JD-04 · Recipe RN-8821</em><span>Progress: ${prog}% · ${minLeft} min left · Real-time liquor sync</span>`;
    }

    // 2. Fluctuating LOT OUTPUT PROGRESS (Cumulative good metres vs plan)
    const liveOutput = Math.round(3920 + Math.sin(t * 1.2) * 9);
    const planM = 4180;
    const gapM = liveOutput - planM;

    const actualEl = planningView?.querySelector(".output-summary span:nth-of-type(1) strong");
    if (actualEl) actualEl.textContent = `${liveOutput.toLocaleString()} m`;

    const gapEl = planningView?.querySelector(".output-summary .output-gap strong");
    if (gapEl) gapEl.textContent = `−${Math.abs(gapM)} m`;

    const actualCard = actualEl?.closest("span");
    if (actualCard) actualCard.dataset.tooltip = `<strong>ACTUAL OUTPUT</strong><em>Cumulative good metres: ${liveOutput.toLocaleString()} m</em><span>Quality-verified fabric metres completed this shift.</span>`;
    const gapCard = gapEl?.closest(".output-gap") || gapEl?.closest("span");
    if (gapCard) gapCard.dataset.tooltip = `<strong>OUTPUT VARIANCE</strong><em>Variance: −${Math.abs(gapM)} m</em><span>Production lag currently being recovered via wash-off sync.</span>`;

    // Fluctuating Output Chart Tooltip
    if (chartTip) {
      if (chartHoverRatio !== null) {
        const totalMinutes = 600;
        const currentMin = Math.round(chartHoverRatio * totalMinutes);
        const h = 8 + Math.floor(currentMin / 60);
        const m = currentMin % 60;
        const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const isPast = chartHoverRatio <= 0.72;
        const liveOffset = (liveOutput - 3920);
        const metres = Math.round(58 + chartHoverRatio * (6240 - 58) + (isPast ? liveOffset : 0));
        chartTip.innerHTML = `<strong>${timeStr} · ${isPast ? 'Recorded Output' : 'AI Forecast'}</strong><span>${isPast ? 'Good output' : 'Projected output'}: <b>${metres.toLocaleString()} m</b></span><span>${isPast ? 'Quality verified ✓' : 'Dispatch due 18:30'}</span>`;
      } else {
        chartTip.innerHTML = `<strong>14:32 · JD-04</strong><span>Good output <b>${liveOutput.toLocaleString()} m</b></span><span>Projected completion 17:42</span>`;
      }
    }

    // Fluctuate Planning KPI Sparkline Curves in Real Time
    const confWrap = document.getElementById("planningSparkWrapConfidence");
    if (confWrap) {
      const w1 = Math.sin(t * 1.5) * 2.8;
      const d1 = `M 0 54 C 45 ${(50 + w1 * 0.4).toFixed(1)}, 85 ${(44 - w1 * 0.3).toFixed(1)}, 130 ${(36 + w1 * 0.5).toFixed(1)} C 175 28, 215 ${(22 - w1 * 0.4).toFixed(1)}, 260 16 C 290 12, 315 ${(10 + w1 * 0.3).toFixed(1)}, 340 ${(10 + w1).toFixed(1)}`;
      const pArea = confWrap.querySelector(".spark-area");
      const pLine = confWrap.querySelector(".spark-line");
      const pDot = confWrap.querySelector(".spark-dot");
      if (pArea) pArea.setAttribute("d", `${d1} L 340 70 L 0 70 Z`);
      if (pLine) pLine.setAttribute("d", d1);
      if (pDot) pDot.setAttribute("cy", (10 + w1).toFixed(1));
    }
    const bneckWrap = document.getElementById("planningSparkWrapBottleneck");
    if (bneckWrap) {
      const w2 = Math.cos(t * 1.3) * 3.2;
      const d2 = `M 0 32 C 40 ${(36 - w2 * 0.4).toFixed(1)}, 80 ${(40 + w2 * 0.5).toFixed(1)}, 130 ${(46 - w2 * 0.3).toFixed(1)} C 180 52, 220 ${(50 + w2 * 0.4).toFixed(1)}, 260 44 C 290 38, 315 ${(32 - w2 * 0.4).toFixed(1)}, 340 ${(28 + w2).toFixed(1)}`;
      const pArea = bneckWrap.querySelector(".spark-area");
      const pLine = bneckWrap.querySelector(".spark-line");
      const pDot = bneckWrap.querySelector(".spark-dot");
      if (pArea) pArea.setAttribute("d", `${d2} L 340 70 L 0 70 Z`);
      if (pLine) pLine.setAttribute("d", d2);
      if (pDot) pDot.setAttribute("cy", (28 + w2).toFixed(1));
    }
    const chgWrap = document.getElementById("planningSparkWrapChangeover");
    if (chgWrap) {
      const w3 = Math.sin(t * 1.6 + 1.2) * 2.6;
      const d3 = `M 0 56 C 40 ${(52 + w3 * 0.4).toFixed(1)}, 80 ${(44 - w3 * 0.5).toFixed(1)}, 130 ${(36 + w3 * 0.3).toFixed(1)} C 180 28, 220 ${(22 - w3 * 0.4).toFixed(1)}, 260 16 C 295 12, 320 ${(10 + w3 * 0.4).toFixed(1)}, 340 ${(10 + w3).toFixed(1)}`;
      const pArea = chgWrap.querySelector(".spark-area");
      const pLine = chgWrap.querySelector(".spark-line");
      const pDot = chgWrap.querySelector(".spark-dot");
      if (pArea) pArea.setAttribute("d", `${d3} L 340 70 L 0 70 Z`);
      if (pLine) pLine.setAttribute("d", d3);
      if (pDot) pDot.setAttribute("cy", (10 + w3).toFixed(1));
    }
    const wipWrap = document.getElementById("planningSparkWrapWip");
    if (wipWrap) {
      const w4 = Math.sin(t * 1.2 + 2.1) * 3.0;
      const d4 = `M 0 50 C 45 ${(46 - w4 * 0.4).toFixed(1)}, 90 ${(40 + w4 * 0.3).toFixed(1)}, 140 ${(32 - w4 * 0.5).toFixed(1)} C 190 24, 230 ${(18 + w4 * 0.4).toFixed(1)}, 280 14 C 310 12, 330 ${(10 + w4 * 0.3).toFixed(1)}, 340 ${(10 + w4).toFixed(1)}`;
      const pArea = wipWrap.querySelector(".spark-area");
      const pLine = wipWrap.querySelector(".spark-line");
      const pDot = wipWrap.querySelector(".spark-dot");
      if (pArea) pArea.setAttribute("d", `${d4} L 340 70 L 0 70 Z`);
      if (pLine) pLine.setAttribute("d", d4);
      if (pDot) pDot.setAttribute("cy", (10 + w4).toFixed(1));
    }

    // Fluctuating SVG output graph curve with organic multi-node cubic waves
    const liveY = 38 + Math.sin(t * 1.2) * 3.5;
    const wOut1 = Math.sin(t * 1.4) * 2.8;
    const wOut2 = Math.cos(t * 1.1 + 1) * 2.5;
    const wOut3 = Math.sin(t * 1.6 + 2) * 2.2;
    const dActual = `M58 145 C130 ${(136 + wOut1).toFixed(1)} 186 ${(126 - wOut2).toFixed(1)} 250 ${(116 + wOut1 * 0.5).toFixed(1)} S360 ${(94 - wOut3).toFixed(1)} 430 ${(83 + wOut2).toFixed(1)} S545 ${(66 - wOut1).toFixed(1)} 620 ${(58 + wOut3).toFixed(1)} C690 ${(51 - wOut2 * 0.5).toFixed(1)} 735 ${(43 + wOut1 * 0.4).toFixed(1)} 770 ${liveY.toFixed(1)}`;
    const outputActualLine = planningView?.querySelector(".output-actual-line");
    if (outputActualLine) outputActualLine.setAttribute("d", dActual);

    const outputActualArea = planningView?.querySelector(".output-actual-area");
    if (outputActualArea) outputActualArea.setAttribute("d", `${dActual} L770 145 L58 145 Z`);

    const outputForecastLine = planningView?.querySelector(".output-forecast-line");
    if (outputForecastLine) outputForecastLine.setAttribute("d", `M770 ${liveY.toFixed(1)} C805 ${(34 - wOut1 * 0.5).toFixed(1)} 842 ${(28 + wOut2 * 0.4).toFixed(1)} 875 24`);

    const outputDot = planningView?.querySelector(".output-live-dot");
    if (outputDot) outputDot.setAttribute("cy", liveY.toFixed(1));

    // 3. Fluctuating HANDOFF READINESS
    const r1 = Math.round(82 + Math.sin(t * 0.9) * 0.7);
    const exp1 = Math.round(11 + Math.cos(t * 0.9) * 0.4);
    const item1Foot = planningView?.querySelector(".handoff-item:nth-child(1) .handoff-foot");
    if (item1Foot) {
      item1Foot.innerHTML = `<span>Readiness ${r1}%</span><b>${exp1} min exposure</b>`;
    }
    const item1Meter = planningView?.querySelector(".handoff-item:nth-child(1) .handoff-meter span");
    if (item1Meter) item1Meter.style.width = `${r1}%`;

    const r2 = Math.round(96 + Math.cos(t * 1.1) * 0.5);
    const item2Foot = planningView?.querySelector(".handoff-item:nth-child(2) .handoff-foot");
    if (item2Foot) {
      item2Foot.innerHTML = `<span>Readiness ${r2}%</span><b>Protected</b>`;
    }
    const item2Meter = planningView?.querySelector(".handoff-item:nth-child(2) .handoff-meter span");
    if (item2Meter) item2Meter.style.width = `${r2}%`;

    const buf = Math.round(38 + Math.sin(t * 0.7) * 0.5);
    const bufEl = planningView?.querySelector(".flow-risk-summary div:nth-child(3) strong");
    if (bufEl) bufEl.textContent = `${buf} min`;

    if (handoff1) {
      handoff1.dataset.tooltip = `<strong>Dyeing to Finishing Route Protection</strong><em>JD-04 → ST-02</em><span>Readiness ${r1}% · Predicted arrival 15:16 · Reserved window 15:05 (${exp1} min exposure).</span>`;
    }
    if (handoff2) {
      handoff2.dataset.tooltip = `<strong>Finishing to Inspection Capacity</strong><em>ST-02 → FI-01</em><span>Readiness ${r2}% · Inspection capacity secured · ${buf} min transfer buffer.</span>`;
    }
    if (risk3) {
      risk3.dataset.tooltip = `<strong>TRANSFER BUFFER: ${buf} MIN</strong><em>Dispatch Protection</em><span>Slack time allows on-time handoff for 18:30 dispatch cut-off.</span>`;
    }

    // Synchronously update the contents of whichever hover popup window is currently visible
    if (activePlanningTooltipTarget && planningTooltip.classList.contains("is-visible")) {
      const liveTip = activePlanningTooltipTarget.dataset.tooltip;
      if (liveTip && planningTooltip.innerHTML !== liveTip) {
        planningTooltip.innerHTML = liveTip;
      }
    }
  }

  setInterval(tickPlanningLive, 1200);
  tickPlanningLive();

  if (reoptimizeBtn) {
    reoptimizeBtn.addEventListener("click", () => {
      if (reoptimizeBtn.classList.contains("is-running")) return;
      sfx.playClick();
      const original = reoptimizeBtn.innerHTML;
      reoptimizeBtn.classList.add("is-running");
      reoptimizeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 11a8 8 0 1 0-2.34 5.66"></path><polyline points="20 4 20 11 13 11"></polyline></svg> Evaluating constraints…`;
      window.setTimeout(() => {
        reoptimizeBtn.classList.remove("is-running");
        reoptimizeBtn.innerHTML = original.replace("Re-optimize plan", "Plan optimized");
        window.setTimeout(() => { reoptimizeBtn.innerHTML = original; }, 1800);
      }, 900);
    });
  }

  if (recoveryBtn) {
    recoveryBtn.addEventListener("click", () => {
      sfx.playClick();
      recoveryBtn.textContent = "Recovery applied ✓";
      recoveryBtn.disabled = true;
      recoveryBtn.closest(".schedule-callout")?.classList.add("is-applied");
    });
  }
}

// ==========================================================================
// 12. ENERGY & UTILITIES INTERACTIONS
// ==========================================================================
function setupEnergyUtilitiesInteractions() {
  const energyView = document.getElementById("energyUtilitiesView");
  const rebalanceBtn = document.getElementById("btnRebalanceUtilities");
  const applyBtn = document.getElementById("btnApplyUtilitySetpoints");
  const tip = document.getElementById("energyChartTip");
  const tipTitle = tip ? tip.querySelector(".tip-header") : null;
  const tipA = tip ? tip.querySelector(".energy-tip-a") : null;
  const tipB = tip ? tip.querySelector(".energy-tip-b") : null;
  const chartStack = document.getElementById("energyChartStack");
  const readingStack = document.getElementById("energyReadingStack");
  const aiMatchStack = document.getElementById("energyAiMatchStack");
  const overallMatchBadge = document.getElementById("energyOverallMatchBadge");
  const quickTuneBtn = document.getElementById("btnAiQuickTune");
  const aiStatusText = document.getElementById("energyAiStatusText");
  if (!energyView || !chartStack || !readingStack) return;

  const XS = [48, 118, 188, 258, 328, 398, 468];
  const TIMES = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
  const Y_TOP = 20;
  const Y_BOT = 135;

  function mapY(value, min, max) {
    return Y_BOT - ((value - min) / (max - min || 1)) * (Y_BOT - Y_TOP);
  }

  function getControlPoints(pts) {
    const cp = [];
    const n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < n - 2 ? pts[i + 2] : pts[i + 1];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      cp.push({ cp1x, cp1y, cp2x, cp2y, p2 });
    }
    return cp;
  }

  function curvyLinePath(values, min, max) {
    const pts = XS.map((x, i) => ({ x, y: mapY(values[i], min, max) }));
    let d = `M ${pts[0].x} ${pts[0].y.toFixed(1)}`;
    const cp = getControlPoints(pts);
    cp.forEach((c) => {
      d += ` C ${c.cp1x.toFixed(1)} ${c.cp1y.toFixed(1)}, ${c.cp2x.toFixed(1)} ${c.cp2y.toFixed(1)}, ${c.p2.x.toFixed(1)} ${c.p2.y.toFixed(1)}`;
    });
    return d;
  }

  function curvyAreaPath(values, min, max) {
    const lineD = curvyLinePath(values, min, max);
    const lastX = XS[XS.length - 1];
    const firstX = XS[0];
    return `${lineD} L ${lastX} ${Y_BOT} L ${firstX} ${Y_BOT} Z`;
  }

  function sampleCurvy(values, min, max, x) {
    if (x <= XS[0]) return { value: values[0], y: mapY(values[0], min, max) };
    if (x >= XS[XS.length - 1]) return { value: values[values.length - 1], y: mapY(values[values.length - 1], min, max) };
    let i = 0;
    while (i < XS.length - 1 && XS[i + 1] < x) i++;
    const span = XS[i + 1] - XS[i] || 1;
    const t = (x - XS[i]) / span;
    const pts = XS.map((px, idx) => ({ x: px, y: mapY(values[idx], min, max) }));
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : pts[i + 1];
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    const mt = 1 - t;
    const y = mt * mt * mt * p1.y + 3 * mt * mt * t * cp1y + 3 * mt * t * t * cp2y + t * t * t * p2.y;
    const value = min + ((Y_BOT - y) / (Y_BOT - Y_TOP)) * (max - min);
    return { value, y };
  }

  const scenarios = {
    peak: {
      title: "Peak dye",
      subtitle: "Electricity this shift — live draw against the quiet-hour baseline",
      unit: "MW",
      copy: "JD-04 is on circulation. Electricity is above the quiet-hour baseline. Do not cut the 7.90 bar header to flatten this chart.",
      liveName: "Live electricity",
      targetName: "Quiet-hour baseline",
      now: "2.84 MW",
      set: "2.10 MW",
      min: 1.6,
      max: 3.4,
      yLabels: ["3.4", "2.8", "2.2", "1.6"],
      live: [1.98, 2.24, 2.68, 3.12, 2.84, 2.46, 2.18],
      target: [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1],
      cursor: 4,
      hits: [
        ["Warm-up", "Live 1.98 MW", "Baseline 2.10 MW"],
        ["Pretreat", "Live 2.24 MW", "Baseline 2.10 MW"],
        ["Dye start", "Live 2.68 MW", "Baseline 2.10 MW"],
        ["Peak dye", "Live 3.12 MW", "Baseline 2.10 MW"],
        ["Live now", "Live 2.84 MW", "Baseline 2.10 MW"],
        ["Finish", "Live 2.46 MW", "Baseline 2.10 MW"],
        ["Shift close", "Live 2.18 MW", "Baseline 2.10 MW"]
      ],
      readings: [
        ["Electricity", "2.84 MW"],
        ["Steam", "8.4 t/h"],
        ["Gas", "412 Nm³/h"],
        ["Air header", "7.90 bar"]
      ],
      holds: [
        ["Air header", "7.90 bar", "Hold — do not shed"],
        ["Heat exchanger", "94.6%", "Keep on"],
        ["C4 VFD", "28%", "May shed to 18%"]
      ]
    },
    header: {
      title: "Air header",
      subtitle: "Compressed-air pressure against the 7.90 bar hold",
      unit: "bar",
      copy: "7.90 bar is the constraint. Compressor kWh can fall. Header pressure cannot.",
      liveName: "Live header",
      targetName: "7.90 bar setpoint",
      now: "7.90 bar",
      set: "7.90 bar",
      min: 7.7,
      max: 8.0,
      yLabels: ["8.0", "7.9", "7.8", "7.7"],
      live: [7.91, 7.9, 7.88, 7.9, 7.9, 7.89, 7.9],
      target: [7.9, 7.9, 7.9, 7.9, 7.9, 7.9, 7.9],
      cursor: 4,
      hits: [
        ["Warm-up", "Live 7.91 bar", "Setpoint 7.90 bar"],
        ["Pretreat", "Live 7.90 bar", "Setpoint 7.90 bar"],
        ["Dye start", "Live 7.88 bar", "Setpoint 7.90 bar"],
        ["Peak dye", "Live 7.90 bar", "Setpoint 7.90 bar"],
        ["Live now", "Live 7.90 bar", "Setpoint 7.90 bar"],
        ["Finish", "Live 7.89 bar", "Setpoint 7.90 bar"],
        ["Shift close", "Live 7.90 bar", "Setpoint 7.90 bar"]
      ],
      readings: [
        ["Header", "7.90 bar"],
        ["SEC", "0.114 kWh/kg"],
        ["C4 load", "28%"],
        ["Major leaks", "0"]
      ],
      holds: [
        ["Header setpoint", "7.90 bar", "Hard constraint"],
        ["C1 / C2", "62% / 58%", "Keep leading"],
        ["C4", "28%", "Shed to 18%"]
      ]
    },
    thermal: {
      title: "Heat recovery",
      subtitle: "Recovered effluent heat against the 94% hold line",
      unit: "%",
      copy: "The HEX is recycling 82°C effluent into pretreatment makeup. Boiler steam does less of the first lift. Shade stays on its own loop.",
      liveName: "Live recovery",
      targetName: "94% hold",
      now: "94.6%",
      set: "94.0%",
      min: 88,
      max: 100,
      yLabels: ["100", "96", "92", "88"],
      live: [91.2, 92.8, 94.1, 94.6, 94.6, 94.2, 93.4],
      target: [94, 94, 94, 94, 94, 94, 94],
      cursor: 4,
      hits: [
        ["Warm-up", "Recovery 91.2%", "Hold 94.0%"],
        ["Pretreat", "Recovery 92.8%", "Hold 94.0%"],
        ["Dye start", "Recovery 94.1%", "Hold 94.0%"],
        ["Peak dye", "Recovery 94.6%", "Hold 94.0%"],
        ["Live now", "Recovery 94.6%", "Hold 94.0%"],
        ["Finish", "Recovery 94.2%", "Hold 94.0%"],
        ["Shift close", "Recovery 93.4%", "Hold 94.0%"]
      ],
      readings: [
        ["Recovery", "94.6%"],
        ["Effluent", "82°C"],
        ["Makeup", "64°C"],
        ["Steam avoided", "0.9 t/h"]
      ],
      holds: [
        ["HEX valves", "Open", "Arm for next batch"],
        ["Shade loop", "ΔE 0.18", "Owns the gate"],
        ["Boiler", "Follow HEX", "Do not over-fire"]
      ]
    },
    tariff: {
      title: "Off-peak",
      subtitle: "Megawatts against the after-16:00 shed line",
      unit: "MW",
      copy: "After 16:00 the tariff drops. Shed idle finishing kW. Leave the air header and JD-04 alone.",
      liveName: "Live plant MW",
      targetName: "Off-peak target",
      now: "2.84 MW",
      set: "1.90 MW",
      min: 1.2,
      max: 3.4,
      yLabels: ["3.4", "2.6", "1.8", "1.2"],
      live: [2.08, 2.31, 2.84, 3.12, 2.84, 1.92, 1.41],
      target: [1.9, 1.9, 1.9, 1.9, 1.9, 1.9, 1.9],
      cursor: 4,
      hits: [
        ["Warm-up", "Live 2.08 MW", "Target 1.90 MW"],
        ["Pretreat", "Live 2.31 MW", "Target 1.90 MW"],
        ["Dye start", "Live 2.84 MW", "Target 1.90 MW"],
        ["Peak dye", "Live 3.12 MW", "Target 1.90 MW"],
        ["Live now", "Live 2.84 MW", "Target 1.90 MW"],
        ["Finish", "Live 1.92 MW", "Target 1.90 MW"],
        ["Shift close", "Live 1.41 MW", "Target 1.90 MW"]
      ],
      readings: [
        ["On-peak share", "58%"],
        ["Moved off-peak", "0.62 MWh"],
        ["After 16:00", "1.92 MW"],
        ["Air header", "7.90 bar"]
      ],
      holds: [
        ["JD-04", "On circulation", "Do not shed"],
        ["ST-02 idle heat", "240 kW", "Can drop"],
        ["Air VFDs", "Header loop", "Leave on"]
      ]
    },
    leak: {
      title: "Leak watch",
      subtitle: "Acoustic quiet time against the 97% healthy band",
      unit: "%",
      copy: "The 40 kHz array is quiet. Three micro-leaks were sealed last cycle. Do not add compressor load for a hiss.",
      liveName: "Quiet time",
      targetName: "97% healthy",
      now: "97%",
      set: "97%",
      min: 94,
      max: 100,
      yLabels: ["100", "98", "96", "94"],
      live: [99.1, 98.4, 97.2, 97, 97, 97.6, 97.4],
      target: [97, 97, 97, 97, 97, 97, 97],
      cursor: 4,
      hits: [
        ["Warm-up", "Quiet 99.1%", "Band 97%"],
        ["Pretreat", "Quiet 98.4%", "Band 97%"],
        ["Dye start", "Quiet 97.2%", "Band 97%"],
        ["Peak dye", "Quiet 97.0%", "Band 97%"],
        ["Live now", "Quiet 97.0%", "Band 97%"],
        ["Finish", "Quiet 97.6%", "Band 97%"],
        ["Shift close", "Quiet 97.4%", "Band 97%"]
      ],
      readings: [
        ["Quiet", "97%"],
        ["Micro-leaks", "3 sealed"],
        ["Major leaks", "0"],
        ["Header", "7.90 bar"]
      ],
      holds: [
        ["Sentinel", "40 kHz", "Keep armed"],
        ["Major leaks", "0", "No extra C4"],
        ["SEC", "0.114", "Holds if quiet"]
      ]
    }
  };

  const caseKeys = Object.keys(scenarios);
  const liveBase = {};
  caseKeys.forEach((key) => {
    liveBase[key] = scenarios[key].live.slice();
  });
  const aux = {
    peak: { steam: 8.4, gas: 412 },
    header: { sec: 0.114, c1: 62, c2: 58, c3: 41, c4: 28 },
    thermal: { effluent: 82, makeup: 64, avoided: 0.9 },
    tariff: { moved: 0.62, after: 1.92 },
    leak: { quiet: 97 }
  };
  let hoverState = null;

  function formatVal(scene, value) {
    if (scene.unit === "bar") return `${value.toFixed(2)} bar`;
    if (scene.unit === "%") return `${value.toFixed(1)}%`;
    return `${value.toFixed(2)} MW`;
  }

  function sampleSeries(values, x) {
    if (x <= XS[0]) return values[0];
    if (x >= XS[XS.length - 1]) return values[values.length - 1];
    let i = 0;
    while (i < XS.length - 1 && XS[i + 1] < x) i += 1;
    const span = XS[i + 1] - XS[i] || 1;
    const t = (x - XS[i]) / span;
    return values[i] + (values[i + 1] - values[i]) * t;
  }

  function timeAt(x) {
    const start = 6 * 60;
    const span = 12 * 60;
    const mins = start + ((x - XS[0]) / (XS[XS.length - 1] - XS[0])) * span;
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function pieSlice(startPct, endPct) {
    const r = 28;
    const a0 = ((-90 + startPct * 3.6) * Math.PI) / 180;
    const a1 = ((-90 + endPct * 3.6) * Math.PI) / 180;
    const sx = (36 + r * Math.cos(a0)).toFixed(2);
    const sy = (36 + r * Math.sin(a0)).toFixed(2);
    const ex = (36 + r * Math.cos(a1)).toFixed(2);
    const ey = (36 + r * Math.sin(a1)).toFixed(2);
    const large = endPct - startPct > 50 ? 1 : 0;
    return `M 36 36 L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`;
  }

  function meterArc(pct) {
    const circ = 2 * Math.PI * 35;
    const dash = (clamp(pct, 0, 100) / 100) * circ;
    return `${dash.toFixed(1)} ${(circ - dash).toFixed(1)}`;
  }

  function getVisuals(key) {
    const scene = scenarios[key];
    const live = scene.live[scene.cursor];
    if (key === "peak") {
      return {
        pie: [
          { label: "Electricity", value: live * 12, color: "#D97706", tip: `${live.toFixed(2)} MW` },
          { label: "Steam", value: aux.peak.steam * 4, color: "#2860EB", tip: `${aux.peak.steam.toFixed(1)} t/h` },
          { label: "Gas", value: aux.peak.gas / 20, color: "#64748B", tip: `${Math.round(aux.peak.gas)} Nm³/h` },
          { label: "Air", value: 10, color: "#10B981", tip: "7.90 bar held" }
        ],
        meter: { pct: (live / 3.4) * 100, value: `${live.toFixed(2)}`, unit: "MW", label: "of 3.4 cap", color: "#06B6D4" }
      };
    }
    if (key === "header") {
      return {
        pie: [
          { label: "C1", value: aux.header.c1, color: "#D97706", tip: `${aux.header.c1.toFixed(0)}% VFD` },
          { label: "C2", value: aux.header.c2, color: "#F59E0B", tip: `${aux.header.c2.toFixed(0)}% VFD` },
          { label: "C3", value: aux.header.c3, color: "#2860EB", tip: `${aux.header.c3.toFixed(0)}% VFD` },
          { label: "C4", value: aux.header.c4, color: "#10B981", tip: `${aux.header.c4.toFixed(0)}% VFD` }
        ],
        meter: { pct: ((live - 7.7) / 0.3) * 100, value: live.toFixed(2), unit: "bar", label: "vs 7.90", color: "#D97706" }
      };
    }
    if (key === "thermal") {
      return {
        pie: [
          { label: "Recovered", value: live, color: "#10B981", tip: `${live.toFixed(1)}% recovered` },
          { label: "Lost", value: 100 - live, color: "#94A3B8", tip: `${(100 - live).toFixed(1)}% lost` }
        ],
        meter: { pct: live, value: live.toFixed(1), unit: "%", label: "HEX capture", color: "#06B6D4" }
      };
    }
    if (key === "tariff") {
      return {
        pie: [
          { label: "On-peak", value: 58, color: "#D97706", tip: "58% on-peak" },
          { label: "Shoulder", value: 24, color: "#F59E0B", tip: "24% shoulder" },
          { label: "Off-peak", value: 18, color: "#10B981", tip: "18% off-peak" }
        ],
        meter: { pct: (live / 3.4) * 100, value: live.toFixed(2), unit: "MW", label: "plant load", color: "#06B6D4" }
      };
    }
    return {
      pie: [
        { label: "Quiet", value: live, color: "#10B981", tip: `${live.toFixed(1)}% quiet` },
        { label: "Micro", value: 3, color: "#F59E0B", tip: "3 micro-leaks sealed" },
        { label: "Major", value: 0.2, color: "#EF4444", tip: "0 major leaks" }
      ],
      meter: { pct: live, value: live.toFixed(1), unit: "%", label: "quiet band", color: "#10B981" }
    };
  }

  function renderPieSlices(items) {
    const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
    let cursor = 0;
    return items.map((item) => {
      const share = (item.value / total) * 100;
      const start = cursor;
      cursor += share;
      if (share < 0.4) return "";
      return `<path class="energy-slice" fill="${item.color}" d="${pieSlice(start, cursor)}" data-tip-title="${item.label}" data-tip-a="${item.tip}" data-tip-b="${share.toFixed(0)}% of mix"></path>`;
    }).join("");
  }

  function renderAllCases() {
    chartStack.innerHTML = caseKeys.map((key) => {
      const scene = scenarios[key];
      const nowX = XS[scene.cursor];
      const nowY = mapY(scene.live[scene.cursor], scene.min, scene.max);
      return `
        <article class="energy-stack-block">
          <div class="energy-stack-head">
            <h3>${scene.title}</h3>
            <span class="energy-live-num" data-energy-now="${key}">${formatVal(scene, scene.live[scene.cursor])} / ${scene.set}</span>
          </div>
          <div class="energy-mini-viewport" data-energy-chart="${key}">
            <svg class="comparison-chart-svg" viewBox="0 0 500 160" preserveAspectRatio="none" role="img" aria-label="${scene.title}">
              <defs>
                <linearGradient id="energyGrad-${key}" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.32" />
                  <stop offset="85%" stop-color="#06B6D4" stop-opacity="0.04" />
                  <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="40" y1="20" x2="488" y2="20" stroke="rgba(226,232,240,.85)" stroke-width="1" stroke-dasharray="3 3"></line>
              <line x1="40" y1="77" x2="488" y2="77" stroke="rgba(226,232,240,.85)" stroke-width="1" stroke-dasharray="3 3"></line>
              <line x1="40" y1="135" x2="488" y2="135" stroke="rgba(226,232,240,.85)" stroke-width="1" stroke-dasharray="3 3"></line>
              <text x="36" y="24" font-size="10" fill="#94A3B8" text-anchor="end">${scene.yLabels[0]}</text>
              <text x="36" y="139" font-size="10" fill="#94A3B8" text-anchor="end">${scene.yLabels[3]}</text>
              <path class="energy-live-area" fill="url(#energyGrad-${key})" d="${curvyAreaPath(scene.live, scene.min, scene.max)}"></path>
              <path class="energy-target-line" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5 3" stroke-linecap="round" d="${curvyLinePath(scene.target, scene.min, scene.max)}"></path>
              <path class="energy-live-line" fill="none" stroke="#06B6D4" stroke-width="2.6" stroke-linecap="round" d="${curvyLinePath(scene.live, scene.min, scene.max)}"></path>
              <line class="energy-now-line" x1="${nowX}" y1="16" x2="${nowX}" y2="138" stroke="rgba(6,182,212,.4)" stroke-width="1" stroke-dasharray="2 2"></line>
              <circle class="energy-now-dot" cx="${nowX}" cy="${nowY.toFixed(1)}" r="4.2" fill="#06B6D4" stroke="#FFFFFF" stroke-width="2"></circle>
              <line class="energy-hover-line" x1="0" y1="14" x2="0" y2="140" stroke="rgba(15,23,42,.35)" stroke-width="1" stroke-dasharray="2 2" opacity="0"></line>
              <circle class="energy-hover-set" cx="0" cy="0" r="3.8" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.8" opacity="0"></circle>
              <circle class="energy-hover-live" cx="0" cy="0" r="4.5" fill="#06B6D4" stroke="#FFFFFF" stroke-width="2" opacity="0"></circle>
              <rect class="energy-hover-pad" x="40" y="12" width="448" height="130" fill="transparent"></rect>
            </svg>
          </div>
        </article>`;
    }).join("");

    readingStack.innerHTML = caseKeys.map((key) => {
      const scene = scenarios[key];
      const visual = getVisuals(key);
      return `
        <article class="energy-stack-block">
          <div class="energy-stack-head">
            <h3>${scene.title}</h3>
            <span class="energy-live-num" data-energy-read-now="${key}">${scene.liveName} ${formatVal(scene, scene.live[scene.cursor])}</span>
          </div>
          <div class="energy-viz-row" data-energy-reads="${key}">
            <div class="energy-pie-mini">
              <svg viewBox="0 0 72 72" aria-label="${scene.title} mix">
                <circle cx="36" cy="36" r="30" fill="#FFF8F1"></circle>
                <g class="energy-pie-slices">${renderPieSlices(visual.pie)}</g>
                <circle cx="36" cy="36" r="16" fill="#FFFFFF"></circle>
              </svg>
              <ul>${visual.pie.map((item) => `<li data-tip-title="${item.label}" data-tip-a="${item.tip}"><i style="background:${item.color}"></i>${item.label}</li>`).join("")}</ul>
            </div>
            <div class="energy-meter-mini" data-tip-title="${scene.title} meter" data-tip-a="${visual.meter.value} ${visual.meter.unit}" data-tip-b="${visual.meter.label}">
              <svg viewBox="0 0 80 80" aria-label="${scene.title} meter">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#E2E8F0" stroke-width="8"></circle>
                <circle class="energy-meter-arc" cx="40" cy="40" r="35" fill="none" stroke="${visual.meter.color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${meterArc(visual.meter.pct)}" transform="rotate(-90 40 40)"></circle>
                <text class="energy-meter-val" x="40" y="38.5" text-anchor="middle">${visual.meter.value}</text>
                <text class="energy-meter-unit" x="40" y="50.5" text-anchor="middle">${visual.meter.unit}</text>
              </svg>
              <small>${visual.meter.label}</small>
            </div>
          </div>
        </article>`;
    }).join("");

    if (aiMatchStack) {
      aiMatchStack.innerHTML = caseKeys.map((key) => {
        const scene = scenarios[key];
        const match = computeAiMatch(key);
        return `
        <article class="energy-stack-block energy-ai-block" data-energy-ai-row="${key}"
          data-tip-title="${scene.title} · AI Optimization Match"
          data-tip-a="Actual Live: ${formatVal(scene, match.liveVal)} (${match.diffText})"
          data-tip-b="Desired Setpoint: ${scene.set} · ${match.matchPct.toFixed(1)}% Optimal (${match.status})">
          <div class="energy-stack-head">
            <div class="energy-ai-title-wrap">
              <span class="energy-ai-dot dot-${key}"></span>
              <h3>${scene.title}</h3>
            </div>
            <span class="energy-match-pill ${match.pillClass}" data-ai-match-pill="${key}"
              data-tip-title="${scene.title} · Match Score"
              data-tip-a="Convergence Match: ${match.matchPct.toFixed(1)}% (${match.status})"
              data-tip-b="Variance vs Target: ${match.diffText}">${match.matchPct.toFixed(1)}% MATCH</span>
          </div>
          <div class="energy-ai-compare-row">
            <div class="ai-compare-val-box desired-box"
              data-tip-title="${scene.title} · Desired Optimal Setpoint"
              data-tip-a="Target Setpoint: ${scene.set}"
              data-tip-b="AI Strategy: Recommended baseline closed-loop setpoint">
              <span class="ai-lbl">DESIRED OPTIMAL</span>
              <strong class="ai-val" data-ai-desired="${key}">${scene.set}</strong>
            </div>
            <div class="ai-match-bar-wrap"
              data-tip-title="${scene.title} · Closed-Loop Convergence Match"
              data-tip-a="Match: ${match.matchPct.toFixed(1)}% · ${match.status}"
              data-tip-b="Target: ${scene.set} | Live Feed: ${formatVal(scene, match.liveVal)} (${match.diffText})">
              <div class="ai-match-track">
                <div class="ai-match-fill" data-ai-fill="${key}" style="width: ${match.livePosPct}%;"></div>
                <div class="ai-target-marker" data-ai-marker="${key}" style="left: ${match.targetPosPct}%;"></div>
              </div>
              <div class="ai-match-sub-info">
                <span class="ai-variance" data-ai-var="${key}">${match.diffText}</span>
                <span class="ai-status-label" data-ai-status="${key}">${match.status}</span>
              </div>
            </div>
            <div class="ai-compare-val-box live-box"
              data-tip-title="${scene.title} · Actual Live Telemetry Feed"
              data-tip-a="Current Live Reading: ${formatVal(scene, match.liveVal)}"
              data-tip-b="Deviation from Target: ${match.diffText} (${match.status})">
              <span class="ai-lbl">LIVE FEED</span>
              <strong class="ai-val" data-ai-live="${key}">${formatVal(scene, match.liveVal)}</strong>
            </div>
          </div>
        </article>`;
      }).join("");
      updateOverallMatch();
    }
  }

  function hideEnergyTip() {
    if (tip) tip.style.display = "none";
    energyView.querySelectorAll(".energy-hover-line, .energy-hover-live, .energy-hover-set").forEach((el) => {
      el.setAttribute("opacity", "0");
    });
    hoverState = null;
  }

  function showChartHover(viewport, event) {
    const key = viewport.dataset.energyChart;
    const scene = scenarios[key];
    if (!scene || !tip) return;
    const svg = viewport.querySelector("svg");
    const bounds = svg.getBoundingClientRect();
    const x = 40 + ((event.clientX - bounds.left) / bounds.width) * 500;
    const clampedX = clamp(x, XS[0], XS[XS.length - 1]);
    const liveSample = sampleCurvy(scene.live, scene.min, scene.max, clampedX);
    const setSample = sampleCurvy(scene.target, scene.min, scene.max, clampedX);
    const live = liveSample.value;
    const set = setSample.value;
    const liveY = liveSample.y;
    const setY = setSample.y;
    const hoverLine = viewport.querySelector(".energy-hover-line");
    const hoverLive = viewport.querySelector(".energy-hover-live");
    const hoverSet = viewport.querySelector(".energy-hover-set");
    if (hoverLine) {
      hoverLine.setAttribute("x1", clampedX.toFixed(1));
      hoverLine.setAttribute("x2", clampedX.toFixed(1));
      hoverLine.setAttribute("opacity", "1");
    }
    if (hoverLive) {
      hoverLive.setAttribute("cx", clampedX.toFixed(1));
      hoverLive.setAttribute("cy", liveY.toFixed(1));
      hoverLive.setAttribute("opacity", "1");
    }
    if (hoverSet) {
      hoverSet.setAttribute("cx", clampedX.toFixed(1));
      hoverSet.setAttribute("cy", setY.toFixed(1));
      hoverSet.setAttribute("opacity", "1");
    }
    const diff = live - set;
    const diffSign = diff > 0.005 ? "+" : (diff < -0.005 ? "−" : "±");
    const diffDecimals = scene.unit === "bar" ? 2 : (scene.unit === "%" ? 1 : 2);
    const diffText = `Δ ${diffSign}${Math.abs(diff).toFixed(diffDecimals)} ${scene.unit}`;
    const inBand = Math.abs(diff) <= (scene.max - scene.min) * 0.05;

    if (tipTitle) tipTitle.textContent = `${scene.title} · ${timeAt(clampedX)}`;
    if (tipA) tipA.innerHTML = `${scene.liveName}: <strong>${formatVal(scene, live)}</strong>`;
    if (tipB) tipB.innerHTML = `${scene.targetName}: <strong>${formatVal(scene, set)}</strong> <span style="margin-left:6px;font-size:0.65rem;color:${inBand ? "#10B981" : "#F59E0B"}">(${diffText})</span>`;
    placeEnergyTip(event);
    hoverState = { key, x: clampedX, clientX: event.clientX, clientY: event.clientY };
  }

  function placeEnergyTip(event) {
    if (!tip) return;
    tip.style.display = "block";
    const pad = 10;
    const gap = 16;
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    let left = event.clientX + gap;
    let top = event.clientY - height - 12;
    if (left + width > window.innerWidth - pad) left = event.clientX - width - gap;
    if (left < pad) left = pad;
    if (top < pad) top = event.clientY + gap;
    if (top + height > window.innerHeight - pad) top = window.innerHeight - height - pad;
    if (top < pad) top = pad;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }

  function showVisualTip(el, event) {
    if (!tip || !tipTitle || !el.dataset.tipTitle) return;
    tipTitle.textContent = el.dataset.tipTitle;
    if (tipA) tipA.textContent = el.dataset.tipA || "";
    if (tipB) tipB.textContent = el.dataset.tipB || "";
    placeEnergyTip(event);
  }

  function bindVisualHover() {
    const hoverContainers = [
      readingStack,
      aiMatchStack,
      energyView.querySelector(".energy-ai-match-card")
    ];
    hoverContainers.forEach((container) => {
      if (!container) return;
      container.addEventListener("pointermove", (event) => {
        const el = event.target.closest("[data-tip-title]");
        if (el) {
          showVisualTip(el, event);
        } else if (tip) {
          tip.style.display = "none";
        }
      });
      container.addEventListener("pointerleave", () => {
        if (tip) tip.style.display = "none";
      });
    });
  }

  function bindChartHover() {
    energyView.querySelectorAll("[data-energy-chart]").forEach((viewport) => {
      viewport.addEventListener("pointerenter", (event) => showChartHover(viewport, event));
      viewport.addEventListener("pointermove", (event) => showChartHover(viewport, event));
      viewport.addEventListener("pointerleave", hideEnergyTip);
    });
  }

  function bindSparkHover() {
    const sparks = [
      { id: "energySparkSec", values: [0.132, 0.126, 0.121, 0.117, 0.114], ys: [52, 46, 38, 24, 10], format: (v) => `${v.toFixed(3)} kWh/kg` },
      { id: "energySparkHex", values: [91.2, 92.8, 93.7, 94.2, 94.6], ys: [40, 34, 28, 18, 10], format: (v) => `${v.toFixed(1)}%` },
      { id: "energySparkAir", values: [7.91, 7.88, 7.9, 7.89, 7.9], ys: [28, 30, 28, 28, 27], format: (v) => `${v.toFixed(2)} bar` }
    ];
    sparks.forEach((spark) => {
      const wrap = document.getElementById(spark.id);
      if (!wrap) return;
      const svg = wrap.querySelector("svg");
      const cross = wrap.querySelector(".spark-crosshair");
      const dot = wrap.querySelector(".energy-spark-hover");
      const tipBox = wrap.querySelector(".spark-tooltip");
      const tipVal = tipBox ? tipBox.querySelector(".tip-value") : null;
      wrap.addEventListener("pointermove", (event) => {
        const bounds = svg.getBoundingClientRect();
        const t = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
        const idx = t * (spark.values.length - 1);
        const lo = Math.floor(idx);
        const hi = Math.min(spark.values.length - 1, lo + 1);
        const p = idx - lo;
        const value = spark.values[lo] + (spark.values[hi] - spark.values[lo]) * p;
        const x = t * 340;
        const y = spark.ys[lo] + (spark.ys[hi] - spark.ys[lo]) * p;
        if (cross) {
          cross.setAttribute("x1", x.toFixed(1));
          cross.setAttribute("x2", x.toFixed(1));
          cross.setAttribute("opacity", "1");
        }
        if (dot) {
          dot.setAttribute("cx", x.toFixed(1));
          dot.setAttribute("cy", y.toFixed(1));
          dot.setAttribute("opacity", "1");
        }
        if (tipTitle) tipTitle.textContent = spark.format(value);
        if (tipA) tipA.textContent = tipBox && tipBox.querySelector(".tip-label") ? tipBox.querySelector(".tip-label").textContent : "";
        if (tipB) tipB.textContent = "";
        placeEnergyTip(event);
      });
      wrap.addEventListener("pointerleave", () => {
        if (cross) cross.setAttribute("opacity", "0");
        if (dot) dot.setAttribute("opacity", "0");
        if (tip) tip.style.display = "none";
      });
    });
  }

  function updateReadings(key) {
    const row = energyView.querySelector(`[data-energy-reads="${key}"]`);
    if (!row) return;
    const visual = getVisuals(key);
    const slices = row.querySelector(".energy-pie-slices");
    if (slices) slices.innerHTML = renderPieSlices(visual.pie);
    const arc = row.querySelector(".energy-meter-arc");
    const val = row.querySelector(".energy-meter-val");
    const meter = row.querySelector(".energy-meter-mini");
    if (arc) {
      arc.setAttribute("stroke-dasharray", meterArc(visual.meter.pct));
      arc.setAttribute("stroke", visual.meter.color);
    }
    if (val) val.textContent = visual.meter.value;
    if (meter) {
      meter.setAttribute("data-tip-a", `${visual.meter.value} ${visual.meter.unit}`);
      meter.setAttribute("data-tip-b", visual.meter.label);
    }
  }

  function computeAiMatch(key) {
    const scene = scenarios[key];
    const liveVal = scene.live[scene.cursor];
    const desiredVal = parseFloat(scene.set) || scene.target[scene.cursor];
    const diff = liveVal - desiredVal;
    const span = (scene.max - scene.min) || 1;
    const devRatio = Math.abs(diff) / span;
    const matchPct = Math.max(70, Math.min(100, 100 - devRatio * 75));
    const diffSign = diff > 0.005 ? "+" : (diff < -0.005 ? "−" : "±");
    const diffDecimals = scene.unit === "bar" ? 2 : (scene.unit === "%" ? 1 : 2);
    const diffText = `Δ ${diffSign}${Math.abs(diff).toFixed(diffDecimals)} ${scene.unit}`;

    let status = "Optimal Lock";
    let pillClass = "pill-optimal";
    if (devRatio > 0.16) {
      status = "AI Auto-Tuning";
      pillClass = "pill-tuning";
    } else if (devRatio > 0.04) {
      status = "Within Band";
      pillClass = "pill-converged";
    }

    const targetPosPct = clamp(((desiredVal - scene.min) / span) * 100, 2, 98);
    const livePosPct = clamp(((liveVal - scene.min) / span) * 100, 5, 100);

    return {
      liveVal,
      desiredVal,
      diffText,
      matchPct,
      status,
      pillClass,
      targetPosPct,
      livePosPct
    };
  }

  function updateOverallMatch() {
    if (!overallMatchBadge) return;
    let sum = 0;
    caseKeys.forEach((k) => {
      sum += computeAiMatch(k).matchPct;
    });
    const avg = (sum / caseKeys.length).toFixed(1);
    overallMatchBadge.textContent = `${avg}% OPTIMAL MATCH`;
    overallMatchBadge.dataset.tipA = `${avg}% Fleet Convergence Score`;
    overallMatchBadge.dataset.tipB = `Multi-system closed-loop tracking across all 5 utilities`;
    if (avg >= 95) {
      overallMatchBadge.className = "inspect-badge badge-emerald";
    } else if (avg >= 88) {
      overallMatchBadge.className = "inspect-badge badge-cyan";
    } else {
      overallMatchBadge.className = "inspect-badge badge-amber";
    }
  }

  function updateAiMatch(key) {
    if (!aiMatchStack) return;
    const row = energyView.querySelector(`[data-energy-ai-row="${key}"]`);
    if (!row) return;
    const scene = scenarios[key];
    const match = computeAiMatch(key);

    const liveEl = row.querySelector(`[data-ai-live="${key}"]`);
    if (liveEl) liveEl.textContent = formatVal(scene, match.liveVal);

    const desiredEl = row.querySelector(`[data-ai-desired="${key}"]`);
    if (desiredEl) desiredEl.textContent = scene.set;

    const varEl = row.querySelector(`[data-ai-var="${key}"]`);
    if (varEl) varEl.textContent = match.diffText;

    const pillEl = row.querySelector(`[data-ai-match-pill="${key}"]`);
    if (pillEl) {
      pillEl.textContent = `${match.matchPct.toFixed(1)}% MATCH`;
      pillEl.className = `energy-match-pill ${match.pillClass}`;
      pillEl.dataset.tipA = `Convergence Match: ${match.matchPct.toFixed(1)}% (${match.status})`;
      pillEl.dataset.tipB = `Variance vs Target: ${match.diffText}`;
    }

    const statusEl = row.querySelector(`[data-ai-status="${key}"]`);
    if (statusEl) statusEl.textContent = match.status;

    const fillEl = row.querySelector(`[data-ai-fill="${key}"]`);
    if (fillEl) fillEl.style.width = `${match.livePosPct}%`;

    const markerEl = row.querySelector(`[data-ai-marker="${key}"]`);
    if (markerEl) markerEl.style.left = `${match.targetPosPct}%`;

    row.dataset.tipA = `Actual Live: ${formatVal(scene, match.liveVal)} (${match.diffText})`;
    row.dataset.tipB = `Desired Setpoint: ${scene.set} · ${match.matchPct.toFixed(1)}% Optimal (${match.status})`;

    const liveBox = row.querySelector(".live-box");
    if (liveBox) {
      liveBox.dataset.tipA = `Current Live Reading: ${formatVal(scene, match.liveVal)}`;
      liveBox.dataset.tipB = `Deviation from Target: ${match.diffText} (${match.status})`;
    }

    const barWrap = row.querySelector(".ai-match-bar-wrap");
    if (barWrap) {
      barWrap.dataset.tipA = `Match: ${match.matchPct.toFixed(1)}% · ${match.status}`;
      barWrap.dataset.tipB = `Target: ${scene.set} | Live Feed: ${formatVal(scene, match.liveVal)} (${match.diffText})`;
    }

    updateOverallMatch();
  }

  function updateChart(key) {
    const scene = scenarios[key];
    const i = scene.cursor;
    const viewport = energyView.querySelector(`[data-energy-chart="${key}"]`);
    if (viewport) {
      const livePath = viewport.querySelector(".energy-live-line");
      const liveArea = viewport.querySelector(".energy-live-area");
      const targetPath = viewport.querySelector(".energy-target-line");
      const nowDot = viewport.querySelector(".energy-now-dot");
      if (livePath) livePath.setAttribute("d", curvyLinePath(scene.live, scene.min, scene.max));
      if (liveArea) liveArea.setAttribute("d", curvyAreaPath(scene.live, scene.min, scene.max));
      if (targetPath) targetPath.setAttribute("d", curvyLinePath(scene.target, scene.min, scene.max));
      if (nowDot) nowDot.setAttribute("cy", mapY(scene.live[i], scene.min, scene.max).toFixed(1));
    }
    const nowLabel = energyView.querySelector(`[data-energy-now="${key}"]`);
    if (nowLabel) nowLabel.textContent = `${formatVal(scene, scene.live[i])} / ${scene.set}`;
    const readNow = energyView.querySelector(`[data-energy-read-now="${key}"]`);
    if (readNow) readNow.textContent = `${scene.liveName} ${formatVal(scene, scene.live[i])}`;
  }

  function tickLive() {
    if (energyView.style.display === "none") return;
    const t = Date.now() / 1000;
    caseKeys.forEach((key, idx) => {
      const scene = scenarios[key];
      const amp = (scene.max - scene.min) * 0.038;
      const base = liveBase[key];
      for (let p = 0; p < scene.live.length; p++) {
        const wave = Math.sin(t * 1.6 + idx * 1.25 + p * 0.85) * 0.65
                   + Math.cos(t * 0.85 + idx * 0.7 - p * 0.5) * 0.35;
        const microJitter = Math.sin(t * 3.7 + p * 2.1 + idx) * 0.15;
        scene.live[p] = clamp(base[p] + (wave + microJitter) * amp, scene.min, scene.max);
      }
      updateChart(key);
      updateReadings(key);
      updateAiMatch(key);
    });

    aux.peak.steam = clamp(8.4 + Math.sin(t * 1.1) * 0.08, 8.2, 8.7);
    aux.peak.gas = clamp(412 + Math.sin(t * 0.9) * 6, 400, 430);
    aux.header.sec = clamp(0.114 + Math.sin(t * 0.7) * 0.001, 0.112, 0.117);
    aux.header.c1 = clamp(62 + Math.sin(t * 0.8) * 1.1, 60, 64);
    aux.header.c2 = clamp(58 + Math.sin(t * 0.95) * 1.0, 56, 60);
    aux.header.c3 = clamp(41 + Math.sin(t * 1.05) * 1.3, 38, 44);
    aux.header.c4 = clamp(28 + Math.sin(t * 1.2) * 1.2, 26, 30);
    aux.thermal.effluent = clamp(82 + Math.sin(t) * 0.4, 81, 83);
    aux.thermal.makeup = clamp(64 + Math.sin(t * 0.8) * 0.5, 63, 65);
    aux.thermal.avoided = clamp(0.9 + Math.sin(t * 1.05) * 0.03, 0.84, 0.96);
    aux.tariff.after = clamp(1.92 + Math.sin(t * 0.6) * 0.04, 1.85, 2.0);
    aux.tariff.moved = clamp(0.62 + (t % 20) * 0.0004, 0.62, 0.7);

    // Sparkline live wave fluctuation
    const secWrap = document.getElementById("energySparkSec");
    if (secWrap) {
      const waveSec = Math.sin(t * 1.4) * 2.2;
      const dSec = `M 0 52 C 40 50, 80 ${(46 + waveSec * 0.4).toFixed(1)}, 120 ${(38 - waveSec * 0.3).toFixed(1)} C 170 28, 210 ${(24 + waveSec * 0.6).toFixed(1)}, 260 18 C 300 14, 325 ${(12 + waveSec * 0.5).toFixed(1)}, 340 ${(10 + waveSec).toFixed(1)}`;
      const paths = secWrap.querySelectorAll("svg > path");
      if (paths[0]) paths[0].setAttribute("d", `${dSec} L 340 70 L 0 70 Z`);
      if (paths[1]) paths[1].setAttribute("d", dSec);
      const endCircle = secWrap.querySelector("svg > circle:not(.energy-spark-hover)");
      if (endCircle) endCircle.setAttribute("cy", (10 + waveSec).toFixed(1));
    }
    const hexWrap = document.getElementById("energySparkHex");
    if (hexWrap) {
      const waveHex = Math.sin(t * 1.25 + 1.2) * 2.5;
      const dHex = `M 0 40 C 50 36, 90 ${(34 - waveHex * 0.4).toFixed(1)}, 140 ${(28 + waveHex * 0.5).toFixed(1)} C 190 22, 230 ${(18 - waveHex * 0.6).toFixed(1)}, 280 14 C 310 12, 330 ${(10 + waveHex * 0.4).toFixed(1)}, 340 ${(10 + waveHex).toFixed(1)}`;
      const paths = hexWrap.querySelectorAll("svg > path");
      if (paths[0]) paths[0].setAttribute("d", `${dHex} L 340 70 L 0 70 Z`);
      if (paths[1]) paths[1].setAttribute("d", dHex);
      const endCircle = hexWrap.querySelector("svg > circle:not(.energy-spark-hover)");
      if (endCircle) endCircle.setAttribute("cy", (10 + waveHex).toFixed(1));
    }
    const airWrap = document.getElementById("energySparkAir");
    if (airWrap) {
      const waveAir = Math.sin(t * 1.6 + 2.1) * 2.0;
      const dAir = `M 0 28 C 40 ${(26 + waveAir * 0.4).toFixed(1)}, 80 ${(30 - waveAir * 0.5).toFixed(1)}, 120 28 C 160 ${(26 - waveAir * 0.6).toFixed(1)}, 200 ${(30 + waveAir * 0.4).toFixed(1)}, 240 28 C 280 26, 315 ${(28 + waveAir * 0.5).toFixed(1)}, 340 ${(27 + waveAir).toFixed(1)}`;
      const paths = airWrap.querySelectorAll("svg > path");
      if (paths[0]) paths[0].setAttribute("d", `${dAir} L 340 70 L 0 70 Z`);
      if (paths[1]) paths[1].setAttribute("d", dAir);
      const endCircle = airWrap.querySelector("svg > circle:not(.energy-spark-hover)");
      if (endCircle) endCircle.setAttribute("cy", (27 + waveAir).toFixed(1));
    }

    const secEl = document.getElementById("energyKpiSec");
    const hexEl = document.getElementById("energyKpiHex");
    const airEl = document.getElementById("energyKpiAir");
    if (secEl) secEl.textContent = `${aux.header.sec.toFixed(3)} kWh/kg`;
    if (hexEl) hexEl.textContent = `${scenarios.thermal.live[scenarios.thermal.cursor].toFixed(1)}%`;
    if (airEl) airEl.textContent = `${scenarios.header.live[scenarios.header.cursor].toFixed(2)} bar`;

    const clock = document.getElementById("energyLiveClock");
    if (clock) {
      const now = new Date();
      clock.textContent = `LIVE ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    }

    if (hoverState) {
      const viewport = energyView.querySelector(`[data-energy-chart="${hoverState.key}"]`);
      if (viewport) {
        showChartHover(viewport, { clientX: hoverState.clientX, clientY: hoverState.clientY });
      }
    }
  }

  renderAllCases();
  bindChartHover();
  bindVisualHover();
  bindSparkHover();
  tickLive();
  window.setInterval(tickLive, 1200);

  // Direct Interactive Chart Click: instantly adjust the live value & graph line
  energyView.querySelectorAll("[data-energy-chart]").forEach((viewport) => {
    viewport.addEventListener("click", (event) => {
      const key = viewport.dataset.energyChart;
      const scene = scenarios[key];
      if (!scene) return;
      const svg = viewport.querySelector("svg");
      const bounds = svg.getBoundingClientRect();
      const clickY = ((event.clientY - bounds.top) / bounds.height) * 78;
      const newVal = clamp(scene.max - ((clickY - Y_TOP) / (Y_BOT - Y_TOP)) * (scene.max - scene.min), scene.min, scene.max);
      scene.live[scene.cursor] = newVal;
      liveBase[key][scene.cursor] = newVal;
      if (scene.cursor > 0) {
        scene.live[scene.cursor - 1] = clamp(newVal + (liveBase[key][scene.cursor - 1] - liveBase[key][scene.cursor]) * 0.5, scene.min, scene.max);
        liveBase[key][scene.cursor - 1] = scene.live[scene.cursor - 1];
      }
      sfx.playClick();
      updateChart(key);
      updateReadings(key);
      updateAiMatch(key);
    });
  });

  // Direct Reading Meter Click: step/toggle towards setpoint and update graph line immediately
  readingStack.addEventListener("click", (event) => {
    const row = event.target.closest("[data-energy-reads]");
    if (!row) return;
    const key = row.dataset.energyReads;
    const scene = scenarios[key];
    if (!scene) return;
    const curr = scene.live[scene.cursor];
    const target = parseFloat(scene.set) || scene.target[scene.cursor];
    const step = (target - curr) * 0.4;
    scene.live[scene.cursor] = clamp(curr + (Math.abs(step) < 0.02 ? (target - curr) : step), scene.min, scene.max);
    liveBase[key][scene.cursor] = scene.live[scene.cursor];
    sfx.playClick();
    updateChart(key);
    updateReadings(key);
    updateAiMatch(key);
  });

  // Direct AI Match Row Click: step live feed towards desired optimization
  if (aiMatchStack) {
    aiMatchStack.addEventListener("click", (event) => {
      const row = event.target.closest("[data-energy-ai-row]");
      if (!row) return;
      const key = row.dataset.energyAiRow;
      const scene = scenarios[key];
      if (!scene) return;
      const curr = scene.live[scene.cursor];
      const target = parseFloat(scene.set) || scene.target[scene.cursor];
      const step = (target - curr) * 0.55;
      scene.live[scene.cursor] = clamp(curr + (Math.abs(step) < 0.02 ? (target - curr) : step), scene.min, scene.max);
      liveBase[key][scene.cursor] = scene.live[scene.cursor];
      sfx.playClick();
      updateChart(key);
      updateReadings(key);
      updateAiMatch(key);
    });
  }

  // Quick Auto-Tune button
  if (quickTuneBtn) {
    quickTuneBtn.addEventListener("click", () => {
      sfx.playClick();
      quickTuneBtn.textContent = "Tuned ✓";
      if (aiStatusText) aiStatusText.textContent = "AI CONVERGENCE OPTIMAL · 99.4%";
      caseKeys.forEach((key) => {
        const scene = scenarios[key];
        const desired = parseFloat(scene.set) || scene.target[scene.cursor];
        const curr = scene.live[scene.cursor];
        scene.live[scene.cursor] = curr + (desired - curr) * 0.85;
        liveBase[key][scene.cursor] = scene.live[scene.cursor];
        updateChart(key);
        updateReadings(key);
        updateAiMatch(key);
      });
      window.setTimeout(() => {
        quickTuneBtn.textContent = "Auto-Tune";
        if (aiStatusText) aiStatusText.textContent = "CLOSED-LOOP AI OPTIMIZING";
      }, 2000);
    });
  }

  if (rebalanceBtn) {
    rebalanceBtn.addEventListener("click", () => {
      sfx.playClick();
      rebalanceBtn.textContent = "Balanced ✓";
      // Rebalance all scenarios towards their optimal baseline and dynamically bend graph lines
      scenarios.peak.live = [1.95, 2.12, 2.28, 2.35, 2.18, 2.12, 2.05];
      scenarios.header.live = [7.90, 7.90, 7.89, 7.90, 7.90, 7.89, 7.90];
      scenarios.thermal.live = [92.0, 93.8, 95.4, 96.2, 96.0, 95.5, 94.8];
      scenarios.tariff.live = [1.95, 2.05, 2.15, 2.10, 1.94, 1.88, 1.40];
      scenarios.leak.live = [99.2, 98.6, 98.0, 98.2, 98.0, 98.2, 98.0];
      caseKeys.forEach((key) => {
        liveBase[key] = scenarios[key].live.slice();
        updateChart(key);
        updateReadings(key);
        updateAiMatch(key);
      });
      window.setTimeout(() => { rebalanceBtn.textContent = "Rebalance"; }, 1600);
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      sfx.playClick();
      applyBtn.textContent = "Setpoints applied ✓";
      // Lock live lines to target setpoint lines
      caseKeys.forEach((key) => {
        scenarios[key].live = scenarios[key].target.slice();
        liveBase[key] = scenarios[key].target.slice();
        updateChart(key);
        updateReadings(key);
        updateAiMatch(key);
      });
      applyBtn.disabled = true;
      window.setTimeout(() => {
        applyBtn.disabled = false;
        applyBtn.textContent = "Apply setpoints";
      }, 2500);
    });
  }
}

function setupComplianceTraceabilityInteractions() {
  const complianceView = document.getElementById("complianceTraceabilityView");
  const geneStack = document.getElementById("complianceGenealogy");
  const lotBar = document.getElementById("complianceLotBar");
  const lotPreview = document.getElementById("complianceLotPreview");
  const passportEl = document.getElementById("compliancePassport");
  const passportDetailsEl = document.getElementById("compliancePassportDetails");
  const productRecordEl = document.getElementById("complianceProductRecord");
  const footprintChartEl = document.getElementById("complianceFootprintChart");
  const auditCalloutEl = document.getElementById("complianceAuditCallout");
  const stageDetailEl = document.getElementById("complianceStageDetail");
  const evidenceChartEl = document.getElementById("complianceEvidenceChart");
  const tip = document.getElementById("complianceChartTip");
  if (!complianceView || !lotBar || !passportEl || !passportDetailsEl || !productRecordEl || !footprintChartEl || !evidenceChartEl) return;

  const tipTitle = tip ? tip.querySelector(".tip-header") : null;
  const tipA = tip ? tip.querySelector(".compliance-tip-a") : null;
  const tipB = tip ? tip.querySelector(".compliance-tip-b") : null;
  const liveChip = complianceView.querySelector(".compliance-live-chip");
  const clockEl = document.getElementById("complianceLiveClock");
  const kpiGenealogy = document.getElementById("complianceKpiGenealogy");
  const kpiGenealogyBadge = document.getElementById("complianceKpiGenealogyBadge");
  const kpiDpp = document.getElementById("complianceKpiDpp");
  const kpiDppBadge = document.getElementById("complianceKpiDppBadge");
  const kpiDppNote = document.getElementById("complianceKpiDppNote");
  const kpiEvidence = document.getElementById("complianceKpiEvidence");
  const kpiEvidenceBadge = document.getElementById("complianceKpiEvidenceBadge");
  const kpiEvidenceNote = document.getElementById("complianceKpiEvidenceNote");
  const kpiPh = document.getElementById("complianceKpiPh");
  const kpiPhBadge = document.getElementById("complianceKpiPhBadge");
  const kpiPhNote = document.getElementById("complianceKpiPhNote");
  const packBadge = document.getElementById("compliancePackBadge");
  const recordBadge = document.getElementById("complianceRecordBadge");
  const routeBadge = document.getElementById("complianceRouteBadge");
  const evidenceBadge = document.getElementById("complianceEvidenceBadge");
  const assembleBtn = document.getElementById("btnAssembleCompliance");
  const issueBtn = document.getElementById("btnIssuePassport");

  const lots = {
    "tex-8821": {
      id: "TEX-8821",
      kind: "lot",
      kindLabel: "PRODUCTION LOT",
      product: "Royal Navy #8821",
      image: "assets/compliance_royal_navy_8821.png",
      buyer: "Marks & Spencer",
      style: "Royal Navy home-textile",
      order: "EU-1174",
      shipment: "MSKU-884 · Vessel Friday",
      delivery: "18 Sep · 18:30",
      chip: "TEX-8821",
      chipMeta: "M&S · EU-1174 · 6,240 m",
      status: "QR ready",
      fibre: "GOTS organic cotton · Multan gin G-441",
      fibreShort: "GOTS-G441",
      hash: "0x7c3aed8821dpp",
      dpp: 98,
      dppFields: 24,
      evidenceReady: 12,
      evidenceTotal: 13,
      ph: 7.12,
      record: [
        ["Product", "Dyed cotton twill · Royal Navy · 240 gsm", "Buyer specification M&S HT-240"],
        ["Greige source", "Loom L-18 · lot G-441", "GOTS chain-of-custody verified"],
        ["Pretreatment", "PT-02 · whiteness 152", "Scour and peroxide bleach record"],
        ["Dyeing", "JD-04 · recipe RN-8821 · ΔE 0.18", "Shade release inside buyer tolerance"],
        ["Finishing", "ST-02 · 180°C · 240 cm", "Width and heat-set profile signed"],
        ["Inspection", "FI-01 · A grade · 2.1 points", "ASTM D5430 map attached"],
        ["Certificates", "GOTS · OEKO-TEX 100 · ZDHC L3", "All certificates valid at shipment"],
        ["Shipment", "MSKU-884 · vessel Friday", "Packing list awaits final seal number"]
      ],
      composition: [
        { label: "Organic cotton", value: 100, color: "#7C3AED", tip: "GOTS lot G-441 · Punjab origin" }
      ],
      meters: [
        { key: "water", label: "Water", value: 86, unit: "L/kg", current: 58, baseline: 100, delta: "−42%", tip: "86 L/kg vs 148 L/kg verified 2023 baseline" },
        { key: "energy", label: "Energy", value: 0.114, unit: "kWh/kg", current: 42, baseline: 49, delta: "−14%", tip: "Specific electricity captured from the Energy module" },
        { key: "carbon", label: "Carbon", value: 2.7, unit: "kgCO₂e", current: 64, baseline: 82, delta: "−22%", tip: "Scope 1 and 2 allocation for this production lot" },
        { key: "chem", label: "Chemicals", value: 100, unit: "% MRSL", current: 100, baseline: 100, delta: "L3", tip: "All dosed inputs screened to ZDHC MRSL Level 3" }
      ],
      evidence: [
        ["Chain of custody", 100, "7 linked events"],
        ["Certificates", 100, "3 valid"],
        ["Lab & quality", 100, "4 records"],
        ["Shipment", 75, "Seal pending"]
      ],
      attest: ["GOTS", "OEKO-TEX 100", "ZDHC L3", "EU CSDDD"],
      passportLine: "This is a shippable dye lot — the same TEX-8821 Royal Navy order tracked in Color Intelligence and Planning. Farm, recipe, chemicals and utilities travel with the piece.",
      stages: [
        { key: "greige", title: "Greige", machine: "L-18", operator: "Imran", time: "08:12", state: "done", capture: "Origin G-441", recipe: "Loom-state cotton", chemicals: "None", utilities: "0.02 kWh/kg" },
        { key: "pretreat", title: "Pretreat", machine: "PT-02", operator: "Sana", time: "10:04", state: "done", capture: "Whiteness 152", recipe: "Caustic 12 g/L · H₂O₂ 8 g/L", chemicals: "ZDHC L3 auxiliaries", utilities: "18 L/kg · 1.4 kg steam/kg" },
        { key: "dyeing", title: "Dye", machine: "JD-04", operator: "Hassan", time: "14:32", state: "done", capture: "ΔE 0.18 pass", recipe: "RN-8821 · liquor 1:8", chemicals: "Reactive navy · MRSL L3", utilities: "42 L/kg · 0.114 kWh/kg" },
        { key: "finish", title: "Finishes", machine: "ST-02", operator: "Nadia", time: "16:10", state: "done", capture: "180°C · 240 cm", recipe: "Heat-set profile F-12", chemicals: "Softener ZDHC L3", utilities: "0.8 kg steam/kg" },
        { key: "roll", title: "Roll", machine: "RL-04", operator: "Ali", time: "16:58", state: "done", capture: "Rolls 218–224", recipe: "Final rolling", chemicals: "None", utilities: "0.01 kWh/kg" },
        { key: "cert", title: "Cert", machine: "QA-01", operator: "Mariam", time: "17:12", state: "done", capture: "C-8841 issued", recipe: "ASTM D5430 · A grade", chemicals: "ZDHC verified", utilities: "Evidence sealed" },
        { key: "ship", title: "Ship", machine: "PK-02", operator: "Usman", time: "17:42", state: "alert", capture: "Seal number pending", recipe: "MSKU-884 · vessel Fri", chemicals: "Not applicable", utilities: "Packing list 92%" }
      ]
    },
    "tex-8840": {
      id: "TEX-8840", kind: "lot", kindLabel: "PRODUCTION LOT", product: "Indigo Flora #8840", image: "assets/compliance_indigo_flora_8840.png", buyer: "IKEA", style: "Printed cotton furnishing", order: "EU-1192", shipment: "PKHU-218 · Road feeder", delivery: "20 Sep · 09:00", chip: "TEX-8840", chipMeta: "IKEA · EU-1192 · 5,180 m", status: "Evidence review", fibre: "Better Cotton · Rahim Yar Khan gin B-218", fibreShort: "BCI-B218", hash: "0x2563eb8840dpp", dpp: 91, dppFields: 23, evidenceReady: 10, evidenceTotal: 13, ph: 7.08,
      record: [
        ["Product", "Printed cotton · Indigo Flora · 220 gsm", "IKEA textile specification TX-220"], ["Greige source", "Loom L-22 · lot B-218", "Better Cotton supplier declaration"], ["Pretreatment", "PT-03 · whiteness 148", "Enzymatic desize and bleach"], ["Printing", "RP-02 · screens 08–13", "Paste batch PB-8840 linked"], ["Finishing", "ST-01 · 175°C · 232 cm", "Dimensional stability passed"], ["Inspection", "FI-02 · A grade · 3.4 points", "Defect map attached"], ["Certificates", "OEKO-TEX 100 · ZDHC L3", "GOTS not applicable to this fibre"], ["Shipment", "PKHU-218 · road feeder", "Buyer declaration requires signature"]
      ],
      composition: [{ label: "Better Cotton", value: 100, color: "#2563EB", tip: "Supplier lot B-218 · Pakistan origin" }],
      meters: [
        { key: "water", label: "Water", value: 94, unit: "L/kg", current: 68, baseline: 100, delta: "−32%", tip: "94 L/kg against 138 L/kg process baseline" }, { key: "energy", label: "Energy", value: 0.128, unit: "kWh/kg", current: 54, baseline: 61, delta: "−11%", tip: "Specific electricity captured from the Energy module" }, { key: "carbon", label: "Carbon", value: 3.1, unit: "kgCO₂e", current: 72, baseline: 86, delta: "−16%", tip: "Allocated Scope 1 and 2 emissions" }, { key: "chem", label: "Chemicals", value: 96, unit: "% MRSL", current: 96, baseline: 100, delta: "1 hold", tip: "One print-paste supplier declaration awaiting signature" }
      ],
      evidence: [["Chain of custody", 100, "7 linked events"], ["Certificates", 88, "2 valid"], ["Lab & quality", 92, "5 records"], ["Shipment", 62, "Sign-off due"]],
      attest: ["Better Cotton", "OEKO-TEX 100", "ZDHC L3"], passportLine: "TEX-8840 connects the greige source, rotary-print recipe, paste inputs, finishing settings and shipment evidence for IKEA order EU-1192.",
      stages: [
        { key: "greige", title: "Greige", machine: "L-22", operator: "Asad", time: "07:48", state: "done", capture: "Origin B-218", recipe: "Plain weave cotton", chemicals: "None", utilities: "0.02 kWh/kg" }, { key: "pretreat", title: "Pretreat", machine: "PT-03", operator: "Sana", time: "09:38", state: "done", capture: "Whiteness 148", recipe: "Enzyme + peroxide", chemicals: "ZDHC L3 auxiliaries", utilities: "21 L/kg · 1.5 kg steam/kg" }, { key: "printing", title: "Print", machine: "RP-02", operator: "Faraz", time: "13:18", state: "done", capture: "Screens 08–13", recipe: "PB-8840 · 4,200 cP", chemicals: "Paste inputs · 96% cleared", utilities: "31 L/kg · 0.128 kWh/kg" }, { key: "finish", title: "Finishes", machine: "ST-01", operator: "Nadia", time: "15:10", state: "done", capture: "175°C · 232 cm", recipe: "Finish profile PF-08", chemicals: "Softener ZDHC L3", utilities: "0.9 kg steam/kg" }, { key: "roll", title: "Roll", machine: "RL-03", operator: "Ali", time: "16:02", state: "done", capture: "Rolls 301–306", recipe: "Final rolling", chemicals: "None", utilities: "0.01 kWh/kg" }, { key: "cert", title: "Cert", machine: "QA-02", operator: "Mariam", time: "16:28", state: "alert", capture: "Supplier sign-off due", recipe: "OEKO-TEX + ZDHC pack", chemicals: "1 declaration open", utilities: "Evidence 88%" }, { key: "ship", title: "Ship", machine: "PK-03", operator: "Usman", time: "17:20", state: "pending", capture: "Feeder slot reserved", recipe: "PKHU-218", chemicals: "Not applicable", utilities: "Packing list draft" }
      ]
    }
  };

  let activeLot = "tex-8821";
  let activeStage = "dyeing";
  let issued = { "tex-8821": false, "tex-8840": false };
  let assembled = { "tex-8821": false, "tex-8840": false };

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function hash32(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pieSlice(startPct, endPct) {
    const cx = 36;
    const cy = 36;
    const r = 30;
    const start = ((startPct / 100) * Math.PI * 2) - Math.PI / 2;
    const end = ((endPct / 100) * Math.PI * 2) - Math.PI / 2;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = endPct - startPct > 50 ? 1 : 0;
    if (endPct - startPct >= 99.9) {
      return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
    }
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  }

  function renderPie(items) {
    const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
    let cursor = 0;
    return items.map((item) => {
      const share = (item.value / total) * 100;
      const start = cursor;
      cursor += share;
      return `<path class="compliance-slice" fill="${item.color}" d="${pieSlice(start, cursor)}" data-tip-title="${item.label}" data-tip-a="${item.tip}" data-tip-b="${share.toFixed(0)}% of fibre mix"></path>`;
    }).join("");
  }

  function meterArc(pct) {
    const circ = 2 * Math.PI * 26;
    const dash = (clamp(pct, 0, 100) / 100) * circ;
    return `${dash.toFixed(1)} ${(circ - dash).toFixed(1)}`;
  }

  let livePh = "7.12";
  let liveClock = "14:32:00";

  function currentPayload() {
    const lot = lots[activeLot];
    const stage = lot.stages.find((item) => item.key === activeStage) || lot.stages[0];
    const water = lot.meters.find((item) => item.key === "water");
    const energy = lot.meters.find((item) => item.key === "energy");
    const kind = lot.kind === "lot" ? "DPP" : "ASSET";
    const status = issued[activeLot] ? "ISSUED" : lot.kind === "lot" ? "READY" : "WATCH";
    return [
      `TEX.${kind}`,
      lot.id,
      lot.product.replace(/\s+/g, "_"),
      lot.kind === "lot" ? "M&S" : "LOOM",
      lot.fibreShort,
      `${water.value}${water.unit}`,
      `${energy.value}${energy.unit}`,
      `pH${livePh}`,
      `${stage.key}@${stage.machine}`,
      liveClock.replace(/:/g, ""),
      lot.hash.slice(-8),
      status
    ].join("|");
  }

  function buildQrSvg(text) {
    const bytes = Array.from(text).map((ch) => ch.charCodeAt(0) & 255);
    const versions = [
      { v: 2, size: 25, data: 34, ec: 10, align: [18] },
      { v: 3, size: 29, data: 55, ec: 15, align: [22] },
      { v: 4, size: 33, data: 80, ec: 20, align: [26] },
      { v: 5, size: 37, data: 108, ec: 26, align: [30] }
    ];
    const spec = versions.find((item) => bytes.length + 2 < item.data) || versions[versions.length - 1];
    const bits = [];
    const pushBits = (value, len) => {
      for (let i = len - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
    };
    pushBits(0b0100, 4);
    pushBits(Math.min(bytes.length, spec.data - 2), 8);
    bytes.slice(0, spec.data - 2).forEach((b) => pushBits(b, 8));
    pushBits(0, Math.min(4, spec.data * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    const data = [];
    for (let i = 0; i < bits.length; i += 8) {
      data.push(bits.slice(i, i + 8).reduce((n, b) => (n << 1) | b, 0));
    }
    const pads = [0xEC, 0x11];
    while (data.length < spec.data) data.push(pads[(data.length - bytes.length) & 1]);
    data.length = spec.data;

    const exp = new Array(512);
    const log = new Array(256);
    let x = 1;
    for (let i = 0; i < 255; i += 1) {
      exp[i] = x;
      log[x] = i;
      x <<= 1;
      if (x & 256) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i += 1) exp[i] = exp[i - 255];
    const mul = (a, b) => (a && b ? exp[log[a] + log[b]] : 0);
    let gen = [1];
    for (let i = 0; i < spec.ec; i += 1) {
      const next = new Array(gen.length + 1).fill(0);
      for (let j = 0; j < gen.length; j += 1) {
        next[j] ^= mul(gen[j], exp[i]);
        next[j + 1] ^= gen[j];
      }
      gen = next;
    }
    const rs = data.slice();
    for (let i = 0; i < spec.ec; i += 1) rs.push(0);
    for (let i = 0; i < spec.data; i += 1) {
      const coef = rs[i];
      if (!coef) continue;
      for (let j = 0; j < gen.length; j += 1) rs[i + j] ^= mul(gen[j], coef);
    }
    const code = data.concat(rs.slice(spec.data));
    const stream = [];
    code.forEach((b) => {
      for (let i = 7; i >= 0; i -= 1) stream.push((b >>> i) & 1);
    });

    const n = spec.size;
    const grid = Array.from({ length: n }, () => new Array(n).fill(null));
    const reserved = Array.from({ length: n }, () => new Array(n).fill(false));
    const set = (c, r, val, lock) => {
      if (c < 0 || r < 0 || c >= n || r >= n) return;
      grid[r][c] = val;
      if (lock) reserved[r][c] = true;
    };
    const finder = (ox, oy) => {
      for (let r = -1; r < 8; r += 1) {
        for (let c = -1; c < 8; c += 1) {
          const on = r >= 0 && r <= 6 && c >= 0 && c <= 6 && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
          set(ox + c, oy + r, on, true);
        }
      }
    };
    finder(0, 0);
    finder(n - 7, 0);
    finder(0, n - 7);
    spec.align.forEach((pos) => {
      for (let r = -2; r <= 2; r += 1) {
        for (let c = -2; c <= 2; c += 1) {
          set(pos + c, pos + r, Math.max(Math.abs(r), Math.abs(c)) !== 1, true);
        }
      }
    });
    for (let i = 8; i < n - 8; i += 1) {
      set(6, i, i % 2 === 0, true);
      set(i, 6, i % 2 === 0, true);
    }
    set(8, n - 8, true, true);

    let bit = 0;
    let up = true;
    for (let col = n - 1; col > 0; col -= 2) {
      if (col === 6) col -= 1;
      for (let pass = 0; pass < n; pass += 1) {
        const row = up ? n - 1 - pass : pass;
        for (let k = 0; k < 2; k += 1) {
          const c = col - k;
          if (reserved[row][c] || grid[row][c] !== null) continue;
          const raw = stream[bit] || 0;
          bit += 1;
          const mask = ((row + c) % 2 === 0) ? 1 : 0;
          grid[row][c] = raw ^ mask;
        }
      }
      up = !up;
    }

    const format = (() => {
      let d = (0b01 << 3) | 0;
      let v = d << 10;
      for (let i = 14; i >= 10; i -= 1) {
        if ((v >>> i) & 1) v ^= 0x537 << (i - 10);
      }
      return ((d << 10) | v) ^ 0x5412;
    })();
    const fmtPos = [
      [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
      [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0]
    ];
    const fmtPos2 = [
      [8, n - 1], [8, n - 2], [8, n - 3], [8, n - 4], [8, n - 5], [8, n - 6], [8, n - 7],
      [n - 8, 8], [n - 7, 8], [n - 6, 8], [n - 5, 8], [n - 4, 8], [n - 3, 8], [n - 2, 8], [n - 1, 8]
    ];
    for (let i = 0; i < 15; i += 1) {
      const bitOn = (format >>> (14 - i)) & 1;
      set(fmtPos[i][0], fmtPos[i][1], bitOn, true);
      set(fmtPos2[i][0], fmtPos2[i][1], bitOn, true);
    }

    const cells = [];
    for (let r = 0; r < n; r += 1) {
      for (let c = 0; c < n; c += 1) {
        if (grid[r][c]) cells.push(`<rect x="${c}" y="${r}" width="1" height="1" fill="#0F172A"/>`);
      }
    }
    return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" aria-label="Live ${lots[activeLot].kind === "lot" ? "product" : "asset"} QR">${cells.join("")}</svg>`;
  }

  function placeTip(event) {
    if (!tip) return;
    tip.style.display = "block";
    const pad = 10;
    const gap = 16;
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    let left = event.clientX + gap;
    let top = event.clientY - height - 12;
    if (left + width > window.innerWidth - pad) left = event.clientX - width - gap;
    if (left < pad) left = pad;
    if (top < pad) top = event.clientY + gap;
    if (top + height > window.innerHeight - pad) top = window.innerHeight - height - pad;
    if (top < pad) top = pad;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }

  function showTip(title, a, b, event) {
    if (!tip || !tipTitle) return;
    tipTitle.textContent = title;
    if (tipA) tipA.textContent = a || "";
    if (tipB) tipB.textContent = b || "";
    placeTip(event);
  }

  function hideTip() {
    if (tip) tip.style.display = "none";
  }

  function renderLots() {
    const active = lots[activeLot];
    lotBar.innerHTML = Object.keys(lots).map((key) => {
      const lot = lots[key];
      return `<button type="button" class="compliance-lot-chip${key === activeLot ? " is-active" : ""}" data-compliance-lot="${key}" data-tip-title="${lot.id} · ${lot.product}" data-tip-a="${lot.buyer} · Order ${lot.order}" data-tip-b="${lot.delivery} · Click to load the complete compliance record"><img class="compliance-lot-thumb" src="${lot.image}" alt="${lot.product} textile"><div class="compliance-lot-copy"><small>${lot.kindLabel}</small><b>${lot.chip}</b><span>${lot.chipMeta}</span></div></button>`;
    }).join("");
    if (lotPreview) lotPreview.innerHTML = `<img src="${active.image}" alt="${active.product} textile product image">`;
  }

  function renderGenealogy() {
    if (!geneStack) return;
    const lot = lots[activeLot];
    geneStack.innerHTML = lot.stages.map((stage, index) => {
      const selected = stage.key === activeStage ? " is-selected" : "";
      const stateClass = stage.state === "pending" ? " is-pending" : stage.state === "alert" ? " is-alert" : "";
      return `<button type="button" class="compliance-gene-node${selected}${stateClass}" data-compliance-stage="${stage.key}" data-tip-title="${stage.title} · ${stage.capture}" data-tip-a="${stage.machine} · ${stage.operator} · ${stage.time}" data-tip-b="${stage.recipe} · ${stage.chemicals}"><span class="compliance-gene-index">${String(index + 1).padStart(2, "0")}</span><strong>${stage.title}</strong><small>${stage.machine} · ${stage.time}</small></button>`;
    }).join("");
    renderStageDetail();
  }

  function renderStageDetail() {
    const lot = lots[activeLot];
    const stage = lot.stages.find((item) => item.key === activeStage) || lot.stages[0];
    if (!stageDetailEl) return;
    stageDetailEl.innerHTML = `
      <div><small>Captured event</small><strong>${stage.title} · ${stage.capture}</strong></div>
      <div><small>Machine / owner</small><strong>${stage.machine} · ${stage.operator}</strong></div>
      <div><small>Process evidence</small><strong>${stage.recipe}</strong></div>
      <div><small>Chemicals / utilities</small><strong>${stage.chemicals} · ${stage.utilities}</strong></div>`;
  }

  function renderProductRecord() {
    const lot = lots[activeLot];
    productRecordEl.innerHTML = `
      <table class="compliance-record-table" aria-label="${lot.id} product compliance record">
        <thead><tr><th>Record</th><th>Verified detail</th><th>Evidence</th></tr></thead>
        <tbody>${lot.record.map(([label, value, detail]) => `
          <tr data-tip-title="${label}" data-tip-a="${value}" data-tip-b="${detail}">
            <th scope="row">${label}</th><td>${value}</td><td>${detail}</td>
          </tr>`).join("")}</tbody>
      </table>`;
  }

  function paintPassport(lot) {
    const payload = currentPayload();
    passportEl.innerHTML = `
      <div class="compliance-qr" data-tip-title="Live shipment QR" data-tip-a="${lot.id} · ${lot.order}" data-tip-b="Scan record includes identity, genealogy, footprint and certificates">
        ${buildQrSvg(payload)}
      </div>`;
    passportDetailsEl.innerHTML = `
      <div class="compliance-pass-copy">
        <em>${issued[activeLot] ? "SHIPMENT QR ISSUED" : `${lot.kindLabel} · ${lot.order}`}</em>
        <strong>${lot.id} · ${lot.product}</strong>
        <p>${lot.passportLine}</p>
        <div class="compliance-pass-live" data-live-pass>${payload}</div>
        <div class="compliance-attest">${lot.attest.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>`;
  }

  function renderFootprint() {
    const lot = lots[activeLot];
    footprintChartEl.innerHTML = lot.meters.map((meter) => `
      <div class="compliance-footprint-row" data-tip-title="${meter.label} · ${meter.value} ${meter.unit}" data-tip-a="${meter.tip}" data-tip-b="Performance against verified process baseline: ${meter.delta}">
        <span>${meter.label}</span>
        <div class="compliance-footprint-track"><i class="compliance-footprint-baseline" style="width:${meter.baseline}%"></i><i class="compliance-footprint-live" data-footprint-live="${meter.key}" style="width:${meter.current}%"></i></div>
        <b data-footprint-value="${meter.key}">${meter.key === "chem" ? `${meter.value}%` : `${meter.value} ${meter.unit}`}</b>
      </div>`).join("");
    if (auditCalloutEl) {
      const missing = lot.evidenceTotal - lot.evidenceReady;
      auditCalloutEl.innerHTML = `<span class="compliance-audit-score">${Math.round((lot.evidenceReady / lot.evidenceTotal) * 100)}%</span><div class="compliance-audit-copy"><strong>${assembled[activeLot] ? "Buyer audit pack assembled" : `${missing} evidence item${missing === 1 ? "" : "s"} requires attention`}</strong><small>${lot.buyer} · ${lot.shipment}</small></div><em>${assembled[activeLot] ? "PACK READY" : "REVIEW"}</em>`;
    }
  }

  function renderEvidence() {
    const lot = lots[activeLot];
    const pct = Math.round((lot.evidenceReady / lot.evidenceTotal) * 100);
    const circ = 2 * Math.PI * 31;
    const dash = (pct / 100) * circ;
    evidenceChartEl.innerHTML = `
      <div class="compliance-evidence-donut" data-tip-title="Audit pack completeness" data-tip-a="${lot.evidenceReady} of ${lot.evidenceTotal} evidence objects verified" data-tip-b="${lot.buyer} · ${lot.order}">
        <svg viewBox="0 0 80 80"><circle class="track" cx="40" cy="40" r="31"></circle><circle class="value" cx="40" cy="40" r="31" stroke-dasharray="${dash.toFixed(1)} ${(circ - dash).toFixed(1)}"></circle></svg><div><b>${pct}%</b><small>READY</small></div>
      </div>
      <div class="compliance-evidence-bars">${lot.evidence.map(([label, value, detail]) => `<div class="compliance-evidence-row${value < 90 ? " is-warning" : ""}" data-tip-title="${label}" data-tip-a="${detail}" data-tip-b="${value}% complete"><span>${label}</span><i class="compliance-evidence-track"><i style="width:${value}%"></i></i><b>${value}%</b></div>`).join("")}</div>`;
  }

  function syncHeader() {
    const lot = lots[activeLot];
    const evidencePct = Math.round((lot.evidenceReady / lot.evidenceTotal) * 100);
    if (liveChip) liveChip.remove();
    if (kpiGenealogy) kpiGenealogy.textContent = "100%";
    if (kpiGenealogyBadge) kpiGenealogyBadge.textContent = `${lot.stages.length} / ${lot.stages.length}`;
    if (kpiDpp) kpiDpp.textContent = `${lot.dpp}%`;
    if (kpiDppBadge) kpiDppBadge.textContent = issued[activeLot] ? "QR ISSUED" : lot.dpp >= 95 ? "QR READY" : "REVIEW";
    if (kpiDppNote) kpiDppNote.textContent = `${lot.id} · ${lot.dppFields} / 25 fields`;
    if (kpiEvidence) kpiEvidence.textContent = `${evidencePct}%`;
    if (kpiEvidenceBadge) kpiEvidenceBadge.textContent = `${lot.evidenceReady} / ${lot.evidenceTotal}`;
    if (kpiEvidenceNote) kpiEvidenceNote.textContent = lot.evidenceReady === lot.evidenceTotal ? "Buyer pack complete" : `${lot.evidenceTotal - lot.evidenceReady} evidence item pending`;
    if (kpiPhBadge) kpiPhBadge.textContent = lot.ph >= 6.5 && lot.ph <= 8.5 ? "WITHIN BAND" : "HOLD";
    if (kpiPhNote) kpiPhNote.textContent = `Final rinse · ${lot.stages.find((stage) => stage.key === "dyeing" || stage.key === "printing")?.machine || "Process"}`;
    if (packBadge) packBadge.textContent = assembled[activeLot] ? "PACK READY" : evidencePct >= 90 ? "AUDIT READY" : "EVIDENCE REVIEW";
    if (recordBadge) recordBadge.textContent = lot.dpp >= 95 ? "VERIFIED" : "1 OPEN ITEM";
    if (routeBadge) routeBadge.textContent = `${lot.stages.length} EVENTS LINKED`;
    if (evidenceBadge) evidenceBadge.textContent = `${lot.evidenceReady} / ${lot.evidenceTotal} READY`;
    if (issueBtn) {
      issueBtn.disabled = issued[activeLot];
      issueBtn.textContent = issued[activeLot] ? "Shipment QR issued ✓" : "Issue shipment QR";
    }
    if (assembleBtn) assembleBtn.textContent = assembled[activeLot] ? "Audit pack ready ✓" : "Assemble audit pack";
  }

  function renderAll() {
    renderLots();
    renderGenealogy();
    renderProductRecord();
    paintPassport(lots[activeLot]);
    renderFootprint();
    renderEvidence();
    syncHeader();
  }

  lotBar.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-compliance-lot]");
    if (!chip) return;
    sfx.playClick();
    activeLot = chip.dataset.complianceLot;
    activeStage = lots[activeLot].stages.find((stage) => stage.state === "alert" || stage.state === "pending")?.key || lots[activeLot].stages[0].key;
    renderAll();
  });

  geneStack?.addEventListener("click", (event) => {
    const row = event.target.closest("[data-compliance-stage]");
    if (!row) return;
    sfx.playClick();
    activeStage = row.dataset.complianceStage;
    renderGenealogy();
  });

  complianceView.addEventListener("pointermove", (event) => {
    const el = event.target.closest("[data-tip-title]");
    if (el) showTip(el.dataset.tipTitle, el.dataset.tipA, el.dataset.tipB, event);
    else hideTip();
  });
  complianceView.addEventListener("pointerleave", hideTip);

  if (assembleBtn) {
    assembleBtn.addEventListener("click", () => {
      sfx.playClick();
      assembleBtn.disabled = true;
      assembleBtn.textContent = "Assembling evidence…";
      window.setTimeout(() => {
        const lot = lots[activeLot];
        assembled[activeLot] = true;
        lot.evidenceReady = lot.evidenceTotal;
        lot.evidence = lot.evidence.map(([label, , detail]) => [label, 100, label === "Shipment" ? "Shipment declaration attached" : detail]);
        lot.dpp = 100;
        lot.dppFields = 25;
        const openStage = lot.stages.find((stage) => stage.state === "alert" || stage.state === "pending");
        if (openStage) openStage.state = "done";
        assembleBtn.disabled = false;
        renderAll();
      }, 900);
    });
  }

  if (issueBtn) {
    issueBtn.addEventListener("click", () => {
      sfx.playClick();
      issued[activeLot] = true;
      lots[activeLot].hash = `0x${hash32(`${lots[activeLot].id}-${Date.now()}`).toString(16)}dpp`;
      lots[activeLot].dpp = 100;
      lots[activeLot].dppFields = 25;
      renderAll();
    });
  }

  function tickLive() {
    if (complianceView.style.display === "none") return;
    const now = new Date();
    liveClock = now.toLocaleTimeString("en-GB", { hour12: false });
    const lot = lots[activeLot];
    livePh = (lot.ph + Math.sin(Date.now() / 1800) * 0.015).toFixed(2);
    if (clockEl) clockEl.textContent = `CAPTURE ${liveClock}`;
    if (kpiPh) kpiPh.textContent = `pH ${livePh}`;
    const energy = lot.meters.find((item) => item.key === "energy");
    const liveEnergy = energy ? energy.value + Math.sin(Date.now() / 2200) * 0.0015 : 0;
    const energyValue = footprintChartEl.querySelector('[data-footprint-value="energy"]');
    const energyBar = footprintChartEl.querySelector('[data-footprint-live="energy"]');
    if (energyValue && energy) energyValue.textContent = `${liveEnergy.toFixed(3)} ${energy.unit}`;
    if (energyBar && energy) energyBar.style.width = `${clamp(energy.current + Math.sin(Date.now() / 1800) * 1.4, 0, 100).toFixed(1)}%`;
    const qrBox = passportEl.querySelector(".compliance-qr");
    const liveLine = passportDetailsEl.querySelector("[data-live-pass]");
    const payload = currentPayload();
    if (qrBox) {
      qrBox.innerHTML = buildQrSvg(payload);
      qrBox.dataset.tipB = payload;
    }
    if (liveLine) liveLine.textContent = payload;
  }

  renderAll();
  tickLive();
  window.setInterval(tickLive, 1200);
}

// ==========================================================================
// 12B. GLOBAL REAL-TIME SPARKLINE & TELEMETRY ENGINE (WHOLE WEBSITE)
// ==========================================================================
function initGlobalSparklineTelemetryEngine() {
  const svgs = Array.from(document.querySelectorAll(".curved-sparkline-svg, .compliance-kpi-spark"));
  if (!svgs.length) return;

  const items = svgs.map((svg, idx) => {
    const isCompliance = svg.classList.contains("compliance-kpi-spark");
    const vb = svg.viewBox ? svg.viewBox.baseVal : null;
    const width = vb && vb.width ? vb.width : (isCompliance ? 240 : 340);
    const height = vb && vb.height ? vb.height : (isCompliance ? 34 : 70);

    const paths = svg.querySelectorAll("path");
    if (!paths.length) return null;

    let linePath = svg.querySelector("path.spark-line, path[stroke]:not([stroke='none'])");
    let areaPath = svg.querySelector("path.spark-area, path[fill^='url'], path:not([stroke])");

    if (!linePath && paths.length >= 2) {
      linePath = paths[1];
    } else if (!linePath && paths.length === 1) {
      linePath = paths[0];
    }

    if (!areaPath && paths.length >= 2 && paths[0] !== linePath) {
      areaPath = paths[0];
    }

    const dot = svg.querySelector("circle.spark-dot") ||
                svg.querySelector("circle:not([class*='hover']):not([id*='Hover']):not([id*='hover']):not([opacity='0'])") ||
                svg.querySelector("circle");

    const card = svg.closest(".inspect-metric-card") ||
                 svg.closest(".compliance-kpi-card") ||
                 svg.closest(".planning-kpi") ||
                 svg.parentElement;

    const hugeValEl = card ? (
      card.querySelector(".compliance-kpi-value") ||
      card.querySelector(".metric-huge-val") ||
      card.querySelector("strong")
    ) : null;

    let numMeta = null;
    if (hugeValEl && hugeValEl.id !== "complianceKpiPh") {
      const raw = hugeValEl.textContent.trim();
      const m = raw.match(/^([^\d\-+.]*?)([-+]?\d+(?:\.\d+)?)(.*)$/);
      if (m && !m[1].toLowerCase().includes("fi-")) {
        const prefix = m[1];
        const baseNum = parseFloat(m[2]);
        const decPart = m[2].split(".")[1];
        const decimals = decPart ? decPart.length : 0;
        const suffix = m[3];
        const amp = decimals >= 3 ? 0.002 : (decimals === 2 ? 0.02 : (decimals === 1 ? 0.15 : (baseNum <= 10 ? 0.4 : 0.8)));
        numMeta = { prefix, baseNum, decimals, suffix, amp };
      }
    }

    const dotCx = dot ? parseFloat(dot.getAttribute("cx") || width.toString()) : width;

    return {
      svg,
      width,
      height,
      linePath,
      areaPath,
      dot,
      card,
      hugeValEl,
      numMeta,
      dotCx,
      baseY: null,
      xCoords: null,
      freq1: 0.46 + (idx % 5) * 0.06,
      amp1: height <= 34 ? 0.9 : 2.0,
      freq2: 0.24 + (idx % 3) * 0.05,
      amp2: height <= 34 ? 0.45 : 1.0,
      phaseOff: (idx * 1.37) % (Math.PI * 2),
      cardIdx: idx
    };
  }).filter(Boolean);

  let phase = 0;
  let lastValTick = 0;

  function telemetryLoop(timestamp) {
    phase += 0.016;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.card || item.card.offsetParent === null) continue;

      if (!item.baseY) {
        const len = (item.linePath && typeof item.linePath.getTotalLength === "function") ? item.linePath.getTotalLength() : 0;
        if (len <= 0) continue;
        const numPts = 7;
        item.baseY = [];
        item.xCoords = [];
        for (let s = 0; s < numPts; s++) {
          const t = s / (numPts - 1);
          const pt = item.linePath.getPointAtLength(t * len);
          item.baseY.push(pt.y);
          item.xCoords.push(t * item.width);
        }
      }

      const pts = [];
      for (let s = 0; s < item.xCoords.length; s++) {
        const x = item.xCoords[s];
        const w1 = Math.sin(phase * item.freq1 + s * 0.85 + item.phaseOff) * item.amp1;
        const w2 = Math.cos(phase * item.freq2 + s * 1.15 + item.phaseOff * 0.6) * item.amp2;
        const minY = item.height <= 34 ? 2.5 : 6;
        const maxY = item.height - (item.height <= 34 ? 2.5 : 6);
        const y = Math.max(minY, Math.min(maxY, item.baseY[s] + w1 + w2));
        pts.push({ x, y });
      }

      let lineD = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let s = 0; s < pts.length - 1; s++) {
        const xc = ((pts[s].x + pts[s + 1].x) / 2).toFixed(1);
        const yc = ((pts[s].y + pts[s + 1].y) / 2).toFixed(1);
        lineD += ` Q ${pts[s].x.toFixed(1)} ${pts[s].y.toFixed(1)} ${xc} ${yc}`;
      }
      lineD += ` L ${pts[pts.length - 1].x.toFixed(1)} ${pts[pts.length - 1].y.toFixed(1)}`;

      if (item.linePath) {
        item.linePath.setAttribute("d", lineD);
      }
      if (item.areaPath) {
        item.areaPath.setAttribute("d", `${lineD} L ${item.width} ${item.height} L 0 ${item.height} Z`);
      }
      if (item.dot) {
        let dotY = pts[pts.length - 1].y;
        if (item.dotCx <= pts[0].x) {
          dotY = pts[0].y;
        } else if (item.dotCx < pts[pts.length - 1].x) {
          for (let s = 0; s < pts.length - 1; s++) {
            if (item.dotCx >= pts[s].x && item.dotCx <= pts[s + 1].x) {
              const frac = (item.dotCx - pts[s].x) / (pts[s + 1].x - pts[s].x);
              dotY = pts[s].y + (pts[s + 1].y - pts[s].y) * frac;
              break;
            }
          }
        }
        item.dot.setAttribute("cy", dotY.toFixed(1));
      }
    }

    if (timestamp - lastValTick > 750) {
      lastValTick = timestamp;
      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        if (!item.card || item.card.offsetParent === null) continue;
        if (!item.hugeValEl || !item.numMeta) continue;

        const nm = item.numMeta;
        const curRaw = item.hugeValEl.textContent.trim();
        const curM = curRaw.match(/^([^\d\-+.]*?)([-+]?\d+(?:\.\d+)?)(.*)$/);
        if (curM) {
          const curNum = parseFloat(curM[2]);
          if (!isNaN(curNum) && Math.abs(curNum - nm.baseNum) > nm.amp * 3.5) {
            nm.baseNum = curNum;
            nm.prefix = curM[1];
            nm.suffix = curM[3];
          }
        }

        const drift = Math.sin(phase * (0.35 + (item.cardIdx % 4) * 0.12) + item.phaseOff) * nm.amp;
        let liveNum = nm.baseNum + drift;
        if (nm.suffix.includes("%") && nm.baseNum <= 100 && liveNum > 100) {
          liveNum = 100;
        }
        if (nm.decimals === 0) {
          liveNum = Math.round(liveNum);
          if (liveNum < 0) liveNum = 0;
          item.hugeValEl.textContent = `${nm.prefix}${liveNum}${nm.suffix}`;
        } else {
          if (nm.prefix === "±") liveNum = Math.abs(liveNum);
          item.hugeValEl.textContent = `${nm.prefix}${liveNum.toFixed(nm.decimals)}${nm.suffix}`;
        }
      }
    }

    requestAnimationFrame(telemetryLoop);
  }

  requestAnimationFrame(telemetryLoop);
}

// ==========================================================================
// 13. BILINGUAL GLOBAL SCADA STATUS TICKER & BOILER ALERT SYSTEM
// ==========================================================================

function initTopScadaStatusTicker() {
  const tapeTrack = document.getElementById("tickerTapeTrack");
  const clockEl = document.getElementById("tickerClockDisplay");
  const spotlightBox = document.getElementById("tickerSpotlightDisplay");
  const spotlightTag = document.getElementById("spotlightTag");
  const spotlightEn = document.getElementById("spotlightTextEn");
  const spotlightUr = document.getElementById("spotlightTextUr");

  // Status data items in English and Urdu
  const statusItems = [
    {
      id: "spinning",
      tagEn: "SPINNING",
      tagUr: "سپننگ",
      valEn: "Ring Spindles: 21,480 RPM · Count 30.2 Ne · 98.9% Eff",
      valUr: "تکلا رفتار: 21,480 چکر · کاؤنٹ 30.2 · کارکردگی 98.9%",
      shortEn: "SPINNING: 21,480 RPM · 98.9% Eff",
      shortUr: "سپننگ: 21,480 چکر · کارکردگی 98.9%",
      warn: false
    },
    {
      id: "weaving",
      tagEn: "WEAVING",
      tagUr: "ویونگ",
      valEn: "Air-Jet Looms: 849 PPM · Weft Eff 96.6% · 248 cN",
      valUr: "ایئر جیٹ لومز: 849 پی پی ایم · کارکردگی 96.6%",
      shortEn: "WEAVING: 849 PPM · 96.6% Weft Eff",
      shortUr: "ویونگ: 849 پی پی ایم · کارکردگی 96.6%",
      warn: false
    },
    {
      id: "dyeing",
      tagEn: "DYEING",
      tagUr: "ڈائینگ",
      valEn: "Continuous Range: ΔE 0.18 · 98.4°C · 48.5 m/min",
      valUr: "ڈائینگ رینج: کلر ایکوریسی ΔE 0.18 · رفتار 48.5 میٹر/منٹ",
      shortEn: "DYEING: ΔE 0.18 (Pass) · 48.5 m/min",
      shortUr: "ڈائینگ: ڈیلٹا ای 0.18 · رفتار 48.5 میٹر/منٹ",
      warn: false
    },
    {
      id: "stitching",
      tagEn: "STITCHING",
      tagUr: "اسٹیچنگ",
      valEn: "Assembly Cells: 4,222 SPM · Yield 99.4% · 1,285 pcs/h",
      valUr: "سلائی یونٹ: 4,222 فی منٹ · کوالٹی 99.4% (پاس)",
      shortEn: "STITCHING: 4,222 SPM · 99.4% Yield",
      shortUr: "اسٹیچنگ: 4,222 ٹانکے · پیداوار 99.4%",
      warn: false
    },
    {
      id: "boiler",
      tagEn: "BOILER #02",
      tagUr: "انڈسٹریل بوائلر",
      valEn: "Steam Header: 8.85 bar [HIGH] · Auto-Bypass 42%",
      valUr: "اسٹیم پریشر: 8.85 بار (ہائی پریشر) · بائی پاس 42%",
      shortEn: "BOILER #02: 8.85 bar [PRESSURE ALERT]",
      shortUr: "بوائلر 02: 8.85 بار (پریشر انتباہ)",
      warn: true
    },
    {
      id: "vision",
      tagEn: "VISION AI",
      tagUr: "ویژن اے آئی",
      valEn: "Fabric Inspection: 112 m/min · 0 Defects (Pass)",
      valUr: "کیمرہ اسکین: 112 میٹر/منٹ · صفر نقص (کوالٹی اوکے)",
      shortEn: "VISION AI: 112 m/min · 0 Defects",
      shortUr: "ویژن اے آئی: 112 میٹر/منٹ · صفر نقص",
      warn: false
    },
    {
      id: "energy",
      tagEn: "ENERGY GRID",
      tagUr: "توانائی و بجلی",
      valEn: "Plant Load: 1,840 kW · Water Recovery: 88.5%",
      valUr: "بجلی لوڈ: 1,840 کلو واٹ · واٹر ریکوری 88.5%",
      shortEn: "POWER: 1,840 kW · Recovery 88.5%",
      shortUr: "توانائی: 1,840 کلو واٹ · ری سائیکلنگ 88.5%",
      warn: false
    },
    {
      id: "compliance",
      tagEn: "COMPLIANCE",
      tagUr: "ماحولیاتی تعمیل",
      valEn: "OEKO-TEX MRSL: 100% Pass · Audit OK (Zero Chem)",
      valUr: "زیرو کیمیکل اخراج · اویکو ٹیکس 100% منظور شدہ",
      shortEn: "COMPLIANCE: 100% Chemical Pass",
      shortUr: "تعمیل: 100 فیصد تصدیق شدہ",
      warn: false
    }
  ];

  // Render continuous track items (duplicated for infinite loop)
  if (tapeTrack) {
    const buildTapeHtml = () => {
      return statusItems
        .map(item => `
          <div class="tape-item ${item.warn ? 'is-alert' : ''}" data-tape-id="${item.id}">
            <strong>${item.shortEn}</strong>
            <span class="tape-separator">◄►</span>
            <span class="tape-ur">${item.shortUr}</span>
            <span class="tape-separator">•</span>
          </div>
        `)
        .join("");
    };

    // Duplicate twice for a seamless 50% translation loop
    tapeTrack.innerHTML = buildTapeHtml() + buildTapeHtml();
  }

  // Live Digital Clock (PKT)
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    // Pakistan Standard Time is UTC+5
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const pktDate = new Date(utc + 3600000 * 5);
    const hrs = String(pktDate.getHours()).padStart(2, "0");
    const mins = String(pktDate.getMinutes()).padStart(2, "0");
    const secs = String(pktDate.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hrs}:${mins}:${secs}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Rotating Spotlight (displays one by one)
  let currentIndex = 0;
  function rotateSpotlight() {
    if (!spotlightBox || !spotlightTag || !spotlightEn || !spotlightUr) return;

    spotlightBox.classList.add("fade-out");

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % statusItems.length;
      const cur = statusItems[currentIndex];

      spotlightTag.textContent = `${cur.tagEn} · ${cur.tagUr}`;
      if (cur.warn) {
        spotlightBox.classList.add("is-alert");
        spotlightBox.style.borderColor = "#ef4444";
        spotlightBox.style.background = "#fef2f2";
        spotlightBox.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.22)";
        spotlightTag.style.color = "#ffffff";
        spotlightTag.style.background = "#ef4444";
        spotlightTag.style.borderColor = "#dc2626";
      } else {
        spotlightBox.classList.remove("is-alert");
        spotlightBox.style.borderColor = "#cbd5e1";
        spotlightBox.style.background = "#ffffff";
        spotlightBox.style.boxShadow = "0 1px 3px rgba(15, 23, 42, 0.04)";
        spotlightTag.style.color = "#000000";
        spotlightTag.style.background = "#e2e8f0";
        spotlightTag.style.borderColor = "#cbd5e1";
      }

      spotlightEn.textContent = cur.valEn;
      spotlightUr.textContent = cur.valUr;

      spotlightBox.classList.remove("fade-out");
    }, 300);
  }

  // Rotate every 4.5 seconds
  setInterval(rotateSpotlight, 4500);
}

function initBoilerAlertSystem() {
  const alertEl = document.getElementById("boilerCornerAlert");
  const miniBadge = document.getElementById("boilerMinimizedBadge");
  const closeBtn = document.getElementById("boilerAlertCloseBtn");
  const ackBtn = document.getElementById("boilerAlertAckBtn");
  const prevAlertBtn = document.getElementById("alertPrevBtn");
  const nextAlertBtn = document.getElementById("alertNextBtn");
  const counterDisplay = document.getElementById("alertCounterDisplay");

  const badgeEl = document.getElementById("boilerAlertBadge");
  const titleEl = document.getElementById("boilerAlertTitle");
  const msgEnEl = document.getElementById("boilerAlertMsgEn");
  const msgUrEl = document.getElementById("boilerAlertMsgUr");

  const metricPill1 = document.getElementById("boilerMetricPill1");
  const metricLabel1 = document.getElementById("boilerMetricLabel1");
  const metricVal1 = document.getElementById("boilerAlertMetricVal1");
  const metricUnit1 = document.getElementById("boilerMetricUnit1");
  const metricTag1 = document.getElementById("boilerMetricTag1");

  const metricPill2 = document.getElementById("boilerMetricPill2");
  const metricLabel2 = document.getElementById("boilerMetricLabel2");
  const metricVal2 = document.getElementById("boilerAlertMetricVal2");
  const metricUnit2 = document.getElementById("boilerMetricUnit2");

  const metricPill3 = document.getElementById("boilerMetricPill3");
  const metricLabel3 = document.getElementById("boilerMetricLabel3");
  const metricVal3 = document.getElementById("boilerAlertMetricVal3");
  const metricUnit3 = document.getElementById("boilerMetricUnit3");

  const miniBadgeText = document.getElementById("miniBadgeText");
  const miniBadgeCount = document.getElementById("miniBadgeCount");
  const miniBadgeUr = document.getElementById("miniBadgeUr");

  // Hazard Bell Elements
  const hazardBellWrapper = document.getElementById("hazardBellWrapper");
  const hazardBellBtn = document.getElementById("hazardBellBtn");
  const hazardDropdown = document.getElementById("hazardAlertsDropdown");
  const ddItem0 = document.getElementById("ddAlertItem0");
  const ddItem1 = document.getElementById("ddAlertItem1");
  const ddValBoiler = document.getElementById("ddValBoiler");
  const ddValStenter = document.getElementById("ddValStenter");

  if (!alertEl || !miniBadge) return;

  const SCADA_SYSTEM_ALERTS = [
    {
      id: "boiler-02",
      badge: "CRITICAL SCADA TELEMETRY",
      counterText: "ALERT 1 OF 2",
      titleEn: "BOILER UNIT #02 ALERT",
      titleUr: "• بوائلر انتباہ",
      metric1: {
        label: "STEAM PRESSURE / پریشر",
        val: "8.85",
        unit: "bar",
        isWarn: true,
        tag: "▲ HIGH"
      },
      metric2: {
        label: "FEED WATER / پانی کی سطح",
        val: "94.2",
        unit: "%",
        isWarn: false,
        tag: ""
      },
      metric3: {
        label: "FLUE STACK / درجہ حرارت",
        val: "172.4",
        unit: "°C",
        isWarn: false,
        tag: ""
      },
      msgEn: "<strong>Advisory:</strong> Main steam manifold pressure exceeds 8.50 bar nominal threshold (Current: 8.85 bar). Modulation bypass valve auto-engaged at 42% to protect dyeing range header.",
      msgUr: "<strong>حفاظتی انتباہ:</strong> مین اسٹیم پریشر 8.50 بار کی حد سے بڑھ کر 8.85 بار ہو چکا ہے۔ پروسیسنگ ڈائینگ کو محفوظ رکھنے کیلئے بائی پاس والو 42 فیصد پر خودکار فعال کر دیا گیا ہے۔",
      miniTitle: "BOILER #02: ",
      miniVal: "8.85 bar",
      miniUr: "• بوائلر انتباہ"
    },
    {
      id: "stenter-04",
      badge: "THERMAL PROCESS ANOMALY",
      counterText: "ALERT 2 OF 2",
      titleEn: "STENTER #04 EXHAUST ALERT",
      titleUr: "• سٹینٹر ٹمپریچر انتباہ",
      metric1: {
        label: "EXHAUST TEMP / خارج حرارت",
        val: "218.6",
        unit: "°C",
        isWarn: true,
        tag: "▲ HIGH"
      },
      metric2: {
        label: "CIRCULATION / ہوا کی گردش",
        val: "88.4",
        unit: "%",
        isWarn: false,
        tag: ""
      },
      metric3: {
        label: "WEFT TENSION / تانے بانے کا تناؤ",
        val: "4.1",
        unit: "kN",
        isWarn: false,
        tag: ""
      },
      msgEn: "<strong>Advisory:</strong> Chamber 4 thermo-oil radiator exhaust peaked at 218.6 °C (Threshold: 205 °C). Secondary heat recovery damper modulated to 65% to stabilize fabric curing.",
      msgUr: "<strong>حفاظتی انتباہ:</strong> چیمبر نمبر 4 کا ایگزاسٹ درجہ حرارت 205 سینٹی گریڈ کی حد عبور کر کے 218.6 سینٹی گریڈ ہو چکا ہے۔ فیبرک کو جلنے سے بچانے کیلئے ڈیمپر 65 فیصد کھول دیا گیا ہے۔",
      miniTitle: "STENTER #04: ",
      miniVal: "218.6 °C",
      miniUr: "• سٹینٹر انتباہ"
    }
  ];

  let currentAlertIndex = 0;
  let autoHideTimer = null;
  let autoShowTimer = null;
  let alertSwitchTimer = null;

  function renderAlert(index) {
    currentAlertIndex = index;
    const alertData = SCADA_SYSTEM_ALERTS[currentAlertIndex];
    if (!alertData) return;

    if (badgeEl) badgeEl.textContent = alertData.badge;
    if (counterDisplay) counterDisplay.textContent = alertData.counterText;
    if (titleEl) {
      titleEl.innerHTML = `${alertData.titleEn} <span class="boiler-alert-title-ur" id="boilerAlertTitleUr">${alertData.titleUr}</span>`;
    }

    if (metricLabel1) metricLabel1.textContent = alertData.metric1.label;
    if (metricVal1) metricVal1.textContent = alertData.metric1.val;
    if (metricUnit1) metricUnit1.textContent = alertData.metric1.unit;
    if (metricTag1) {
      metricTag1.style.display = alertData.metric1.tag ? "inline-block" : "none";
      metricTag1.textContent = alertData.metric1.tag;
    }
    if (metricPill1) {
      metricPill1.classList.toggle("is-warning", alertData.metric1.isWarn);
    }

    if (metricLabel2) metricLabel2.textContent = alertData.metric2.label;
    if (metricVal2) metricVal2.textContent = alertData.metric2.val;
    if (metricUnit2) metricUnit2.textContent = alertData.metric2.unit;

    if (metricLabel3) metricLabel3.textContent = alertData.metric3.label;
    if (metricVal3) metricVal3.textContent = alertData.metric3.val;
    if (metricUnit3) metricUnit3.textContent = alertData.metric3.unit;

    if (msgEnEl) msgEnEl.innerHTML = alertData.msgEn;
    if (msgUrEl) msgUrEl.innerHTML = alertData.msgUr;

    if (miniBadgeText) {
      miniBadgeText.innerHTML = `${alertData.miniTitle}<strong>${alertData.miniVal}</strong>`;
    }
    if (miniBadgeUr) {
      miniBadgeUr.textContent = alertData.miniUr;
    }

    // Update active state in dropdown
    if (ddItem0) ddItem0.classList.toggle("is-active", currentAlertIndex === 0);
    if (ddItem1) ddItem1.classList.toggle("is-active", currentAlertIndex === 1);
  }

  function clearTimers() {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
    if (autoShowTimer) {
      clearTimeout(autoShowTimer);
      autoShowTimer = null;
    }
    if (alertSwitchTimer) {
      clearInterval(alertSwitchTimer);
      alertSwitchTimer = null;
    }
  }

  let isAcknowledged = false;
  let ackTimeout = null;

  function dismissAllAlerts(reappearDelayMs = 150000) {
    isAcknowledged = true;
    clearTimers();
    if (ackTimeout) {
      clearTimeout(ackTimeout);
      ackTimeout = null;
    }

    // Immediately hide both card and pill
    if (alertEl) {
      alertEl.classList.add("is-closing");
      alertEl.style.setProperty("display", "none", "important");
    }
    if (miniBadge) {
      miniBadge.classList.remove("is-visible");
      miniBadge.classList.add("is-hidden");
      miniBadge.style.setProperty("display", "none", "important");
    }

    // Schedule re-appearance after 2.5 minutes (150,000 ms)
    ackTimeout = setTimeout(() => {
      isAcknowledged = false;
      showAlert(false);
    }, reappearDelayMs);
  }

  function showAlert(isManual = false) {
    if (isAcknowledged && !isManual) return;
    clearTimers();
    if (miniBadge) {
      miniBadge.classList.remove("is-visible");
      miniBadge.classList.add("is-hidden");
      miniBadge.style.setProperty("display", "none", "important");
    }
    if (alertEl) {
      alertEl.style.setProperty("display", "block", "important");
      alertEl.classList.remove("is-closing");
    }
    renderAlert(currentAlertIndex);

    // Switch between Alert 1 and Alert 2 after 6.5s while visible
    alertSwitchTimer = setInterval(() => {
      currentAlertIndex = (currentAlertIndex + 1) % SCADA_SYSTEM_ALERTS.length;
      renderAlert(currentAlertIndex);
    }, 6500);

    // Automatically disappear after 13 seconds (giving time for both alerts to show)
    autoHideTimer = setTimeout(() => {
      hideAlert(false);
    }, 13000);
  }

  function hideAlert(isManual = false, reappearDelayMs = 18000) {
    clearTimers();
    if (alertEl) {
      alertEl.classList.add("is-closing");
      setTimeout(() => {
        alertEl.style.setProperty("display", "none", "important");
      }, 320);
    }
    if (miniBadge) {
      miniBadge.classList.remove("is-visible");
      miniBadge.classList.add("is-hidden");
      miniBadge.style.setProperty("display", "none", "important");
    }

    if (!isAcknowledged) {
      autoShowTimer = setTimeout(() => {
        showAlert(false);
      }, reappearDelayMs);
    }
  }

  // Initial delay: appear smoothly after 5 seconds
  autoShowTimer = setTimeout(() => {
    showAlert(false);
  }, 5000);

  // Close Button ('X')
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissAllAlerts(150000);
    });
  }

  // Acknowledge Button
  // USER SPECIFICATION: "still shoiwng after clicking on acknowledgment button and dont make any other change inside the code and dont push any thing"
  if (ackBtn) {
    ackBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissAllAlerts(150000);
    });
  }

  // Manual Previous/Next Alert Carousel Buttons
  if (prevAlertBtn) {
    prevAlertBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentAlertIndex = (currentAlertIndex - 1 + SCADA_SYSTEM_ALERTS.length) % SCADA_SYSTEM_ALERTS.length;
      renderAlert(currentAlertIndex);
    });
  }

  if (nextAlertBtn) {
    nextAlertBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      currentAlertIndex = (currentAlertIndex + 1) % SCADA_SYSTEM_ALERTS.length;
      renderAlert(currentAlertIndex);
    });
  }

  // Minimized badge / pill click:
  // USER SPECIFICATION: "after user clicked on acknowledged pill also have to dissappear and appear after 2-3 mints delay"
  if (miniBadge) {
    miniBadge.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissAllAlerts(150000);
    });
  }

  // Hazard Bell Toggle Dropdown
  function setHazardDropdown(open) {
    if (!hazardDropdown || !hazardBellBtn) return;
    if (open) {
      hazardDropdown.classList.add("is-open");
      hazardBellBtn.setAttribute("aria-expanded", "true");
    } else {
      hazardDropdown.classList.remove("is-open");
      hazardBellBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (hazardBellBtn && hazardDropdown) {
    hazardBellBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = hazardDropdown.classList.contains("is-open");
      setHazardDropdown(!isOpen);
    });

    document.addEventListener("click", (e) => {
      if (hazardBellWrapper && !hazardBellWrapper.contains(e.target)) {
        setHazardDropdown(false);
      }
    });

    // Selecting Alert 1 from dropdown
    if (ddItem0) {
      ddItem0.addEventListener("click", (e) => {
        e.stopPropagation();
        setHazardDropdown(false);
        renderAlert(0);
        showAlert(true);
      });
    }

    // Selecting Alert 2 from dropdown
    if (ddItem1) {
      ddItem1.addEventListener("click", (e) => {
        e.stopPropagation();
        setHazardDropdown(false);
        renderAlert(1);
        showAlert(true);
      });
    }
  }

  // Pause auto-hide while hovering over alert card
  alertEl.addEventListener("mouseenter", () => {
    if (autoHideTimer) {
      clearTimeout(autoHideTimer);
      autoHideTimer = null;
    }
    if (alertSwitchTimer) {
      clearInterval(alertSwitchTimer);
      alertSwitchTimer = null;
    }
  });

  alertEl.addEventListener("mouseleave", () => {
    if (alertEl.style.display !== "none" && !alertEl.classList.contains("is-closing")) {
      if (autoHideTimer) clearTimeout(autoHideTimer);
      autoHideTimer = setTimeout(() => {
        hideAlert(false);
      }, 6000);
    }
  });

  // Live fluctuating telemetry for both SCADA alerts
  let boilerPressure = 8.85;
  let stenterTemp = 218.6;

  setInterval(() => {
    // Boiler Pressure fluctuation (8.82 to 8.89 bar)
    const pDelta = (Math.random() - 0.5) * 0.04;
    boilerPressure = Math.min(8.89, Math.max(8.82, boilerPressure + pDelta));
    const formattedPressure = boilerPressure.toFixed(2);
    SCADA_SYSTEM_ALERTS[0].metric1.val = formattedPressure;
    SCADA_SYSTEM_ALERTS[0].miniVal = `${formattedPressure} bar`;

    if (ddValBoiler) ddValBoiler.textContent = `${formattedPressure} bar`;

    // Stenter Temperature fluctuation (217.6 to 219.4 °C)
    const tDelta = (Math.random() - 0.5) * 0.4;
    stenterTemp = Math.min(219.4, Math.max(217.6, stenterTemp + tDelta));
    const formattedTemp = stenterTemp.toFixed(1);
    SCADA_SYSTEM_ALERTS[1].metric1.val = formattedTemp;
    SCADA_SYSTEM_ALERTS[1].miniVal = `${formattedTemp} °C`;

    if (ddValStenter) ddValStenter.textContent = `${formattedTemp} °C`;

    // If currently rendering this alert, update the active metric
    if (currentAlertIndex === 0) {
      if (metricVal1) metricVal1.textContent = formattedPressure;
      if (miniBadgeText) miniBadgeText.innerHTML = `BOILER #02: <strong>${formattedPressure} bar</strong>`;
    } else if (currentAlertIndex === 1) {
      if (metricVal1) metricVal1.textContent = formattedTemp;
      if (miniBadgeText) miniBadgeText.innerHTML = `STENTER #04: <strong>${formattedTemp} °C</strong>`;
    }
  }, 2400);

  // Initialize display
  renderAlert(0);
}

// ==========================================================================
// 14. INITIALIZATION
// ==========================================================================
function initApp() {
  initCard3DTilt();
  initSectorCardsTelemetry();
  initTopScadaStatusTicker();
  initBoilerAlertSystem();
  setupMillKnowledgeCopilot();
  setupDashboardInteractions();
  setupProductionPlanningInteractions();
  setupEnergyUtilitiesInteractions();
  setupComplianceTraceabilityInteractions();
  initCustomCursor();
  initScadaClock();
  initScadaRealTimeEngine();
  setupScadaInteractivity();
  setupAiAnomalyInteractivity();
  setupAiSidebarTabs();
  setupDyeingColorInspectionInteractions();
  initGlobalSparklineTelemetryEngine();

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
      { id: "goller-scour-bleach", name: "GOLLER — Scouring & Bleaching Range", model: "GOLLER SCOUR & BLEACH RANGE", tag: "#PRE-1092-GOLLER" },
      { id: "benninger-bleach", name: "BENNINGER — Bleaching Range", model: "BENNINGER BLEACHING RANGE", tag: "#PRE-1092-BEN" },
      { id: "redflag-singe-desize", name: "RED FLAG — Singeing & Desizing Machine", model: "RED FLAG SINGE & DESIZE", tag: "#PRE-1092-RF-SINGE" },
      { id: "redflag-mercerizing", name: "RED FLAG — Mercerizing Machine", model: "RED FLAG MERCERIZING RANGE", tag: "#PRE-1092-RF-MERC" }
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
      { id: "thermosol-dyeing", name: "THERMOSOL — Thermosol Dyeing Machine", model: "THERMOSOL CONTINUOUS DYEING", tag: "#DYE-4410-THERMO" },
      { id: "pad-steam", name: "PAD STEAM — Pad Steam Machine", model: "PAD STEAM CONTINUOUS DYEING", tag: "#DYE-4410-PADSTEAM" }
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
      { id: "reggiani-rotary", name: "EFI REGGIANI — Rotary Screen Printing Machine", model: "EFI REGGIANI ROTARY SCREEN", tag: "#PRN-704-REG-ROT" },
      { id: "reggiani-prima-flatbed", name: "EFI REGGIANI PRIMA — Flatbed Screen Printer", model: "EFI REGGIANI PRIMA FLATBED", tag: "#PRN-704-PRIMA" },
      { id: "reggiani-digital", name: "EFI REGGIANI — Digital Textile Printer", model: "EFI REGGIANI DIGITAL TEXTILE", tag: "#PRN-704-DIGITAL" },
      { id: "arioli-steamer", name: "ARIOLI — Steamer / Steamer-Ager", model: "ARIOLI STEAMER-AGER", tag: "#PRN-704-ARIOLI" }
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
      { id: "monfongs-stenter", name: "MONFONGS — Stenter", model: "MONFONGS STENTER LINE", tag: "#FNS-8802-MON-STENT" },
      { id: "bruckner-stenter", name: "BRÜCKNER — Stenter", model: "BRÜCKNER POWER-FRAME STENTER", tag: "#FNS-8802-BRUCKNER" },
      { id: "redflag-stenter", name: "RED FLAG — Stenter", model: "RED FLAG STENTER RANGE", tag: "#FNS-8802-RF-STENT" },
      { id: "monfongs-sanfor", name: "MONFONGS — Sanfor / Sanforizing Machine", model: "MONFONGS SANFORIZING RANGE", tag: "#FNS-8802-SANFOR" },
      { id: "ferraro-compactor", name: "FERRARO — Compactor", model: "FERRARO KNIT & WOVEN COMPACTOR", tag: "#FNS-8802-FERRARO" }
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
        "goller-scour-bleach": 48.0,
        "benninger-bleach": 45.0,
        "redflag-singe-desize": 50.0,
        "redflag-mercerizing": 42.0,
        "thermosol-dyeing": 45.0,
        "pad-steam": 40.0,
        "reggiani-rotary": 55.0,
        "reggiani-prima-flatbed": 42.0,
        "reggiani-digital": 48.0,
        "arioli-steamer": 50.0,
        "monfongs-stenter": 55.0,
        "bruckner-stenter": 58.0,
        "redflag-stenter": 52.0,
        "monfongs-sanfor": 45.0,
        "ferraro-compactor": 38.0,
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
