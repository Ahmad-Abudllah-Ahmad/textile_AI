(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.COPILOT_KNOWLEDGE = api.COPILOT_KNOWLEDGE;
    root.findCopilotEntry = api.findCopilotEntry;
    root.normalizeCopilotText = api.normalizeCopilotText;
    root.buildMillKnowledgeBrief = api.buildMillKnowledgeBrief;
  }
})(typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : this, function () {
  const COPILOT_KNOWLEDGE = [
    {
      id: "shift-help",
      tag: "SHIFT",
      tagClass: "tag-shift",
      prompt: "What can you help with on this shift?",
      aliases: ["what can you help", "shift help", "what do you do"],
      source: "Mill Knowledge Copilot · Shift A",
      metric: { label: "SOP library", value: "1,240" },
      body: [
        "I am the mill’s shift engineering assistant. I retrieve SOPs, summarise handover, and explain what the textile AI modules are seeing — without taking the final decision away from you.",
        "Use me to move through the operating loop: observe the signal, understand the evidence, decide the next action, act with an owner, then verify the outcome."
      ],
      steps: [
        "Color Intelligence — shade prediction, ΔE, recipe correction",
        "Fabric Vision — defect location, roll grade, loom trace-back",
        "Predictive Maintenance — asset risk, work orders, verification",
        "Energy, Planning, Compliance — utilities, OEE, DPP evidence"
      ]
    },
    {
      id: "color-pass",
      tag: "COLOR",
      tagClass: "tag-color",
      prompt: "How does Color Intelligence decide if a dye batch will pass?",
      aliases: ["dye batch", "will this batch", "color intelligence decide", "shade pass"],
      source: "Color Intelligence · Dyeing",
      metric: { label: "Live ΔE vs Royal Navy #8821", value: "0.18" },
      body: [
        "The intended decision is: will this batch finish within the approved customer colour tolerance? Color Intelligence never silently accepts a lot.",
        "It joins the approved recipe, comparable lot history, the live spectro curve and the customer limit, then predicts the likely final shade and explains any correction."
      ],
      steps: [
        "Approved standard — customer colour and allowed ΔE (now 0.50)",
        "Live prediction — in-line spectro updates CIE L*a*b* as the fabric runs",
        "Explained option — recipe or dosing change is shown with a reason",
        "Operator decision — accept or decline; first-time-right rate is 99.2%",
        "Final proof — instrument reading confirms pass or fail at completion"
      ]
    },
    {
      id: "delta-e",
      tag: "COLOR",
      tagClass: "tag-color",
      prompt: "Explain ΔE and our customer shade rule",
      aliases: ["delta e", "Δe", "shade rule", "tolerance"],
      source: "Color Intelligence · Quality rule",
      metric: { label: "Customer ΔE limit", value: "< 0.50 PASS" },
      body: [
        "ΔE is the numerical distance between the measured colour and the approved standard. A lower number is a closer match. The customer’s configured threshold — not the model — decides pass or fail.",
        "On Dyeing, Royal Navy #8821 is running at ΔE 0.18 (L* 24.00, a* −1.80, b* −18.50). Printing uses Reactive Magenta #704 at ΔE 0.19. Bleaching watches whiteness (Wb), mercerizing watches luster, and Finish watches thermo-fixation shade plus moisture."
      ],
      steps: [
        "If live ΔE stays under 0.50, the batch stays MATCH",
        "If it drifts, apply a explained dosing correction and re-measure",
        "Quality still owns final acceptance from the instrument reading"
      ]
    },
    {
      id: "dye-correction",
      tag: "COLOR",
      tagClass: "tag-color",
      prompt: "Walk me through a first-time-right dye correction",
      aliases: ["dye correction", "first time right", "apply correction", "recipe"],
      source: "Color Intelligence · Closed-loop dosing",
      metric: { label: "Auto-correction rate", value: "99.2%" },
      body: [
        "Correction is recommended while the batch can still be influenced — not after the lot is already off-shade.",
        "Current auxiliary dosing is 2.4 mL/kg. Printing corrections speak in paste viscosity (dPa·s), bleaching in peroxide g/kg, mercerizing in caustic °Bé, and Finish in residual moisture."
      ],
      steps: [
        "Compare target vs measured swatches and the 400–700 nm reflectance overlay",
        "Review the suggested dye offset pills (positive, zero, or hold-back)",
        "Recalibrate the spectro if the sensor has drifted",
        "Apply correction only after the operator accepts the recommendation",
        "Verify the new ΔE before releasing the batch"
      ]
    },
    {
      id: "fabric-trace",
      tag: "VISION",
      tagClass: "tag-vision",
      prompt: "How does Fabric Vision map a defect back to the loom?",
      aliases: ["fabric vision", "defect", "loom", "roll"],
      source: "Fabric Inspection & Vision AI",
      metric: { label: "Optical defect rate", value: "0.012%" },
      body: [
        "Vision inspection maps each visible defect to its exact position on the roll. The record keeps classification confidence, roll ID, production batch and the probable loom source so quality is never an isolated final check.",
        "Last scan: 4,820 m of greige, 2 broken picks, 0 oil stains. Weft/warp skew is +0.14°. ASTM D5430 grade is A+ at 2.1 penalty points / 100 yd²."
      ],
      steps: [
        "Detect — locate and classify the defect on the roll map",
        "Trace — keep roll, batch and source loom linked",
        "Contain — quality decides hold, cut-out or downgrade",
        "Plan — apparel sees material context before cutting",
        "Recover — supervisors rebalance work to protect output"
      ]
    },
    {
      id: "aj003",
      tag: "MAINT",
      tagClass: "tag-maint",
      prompt: "What should we do if AJ-003 vibration rises?",
      aliases: ["aj-003", "aj003", "vibration", "loom risk"],
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
      ]
    },
    {
      id: "pressure-drop",
      tag: "MAINT",
      tagClass: "tag-maint",
      prompt: "Diagnose a pressure drop on line beta",
      aliases: ["pressure drop", "line beta", "compressor", "air line"],
      source: "Predictive Maintenance · Utilities header",
      metric: { label: "Air header setpoint", value: "7.90 bar" },
      body: [
        "A pressure drop on line beta is a utilities-plus-process event. Check the header first, then the valves that isolate the dye range, then acoustic leak evidence.",
        "Compressors 1–4 are VFD-modulated to hold 7.90 bar at minimum kWh. Ultrasonic leak sentinel is at 40 kHz with 0 major leaks this shift; three micro-leaks were sealed last cycle."
      ],
      steps: [
        "Confirm header pressure against the 7.90 bar setpoint on the SCADA map",
        "Inspect line-beta isolation valves — green is open, red is closed",
        "Hover tanks, gauges and compressors for the live HUD values",
        "If the leak sentinel is quiet, look for a process demand spike, not a leak",
        "If risk stays high, raise a work order and verify after the fix"
      ]
    },
    {
      id: "energy",
      tag: "ENERGY",
      tagClass: "tag-energy",
      prompt: "How do we save energy without losing air pressure?",
      aliases: ["energy", "kwh", "air pressure", "utilities"],
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
      ]
    },
    {
      id: "handover",
      tag: "PLAN",
      tagClass: "tag-plan",
      prompt: "Summarize Shift A handover",
      aliases: ["handover", "shift a", "summarize shift"],
      source: "Mill Knowledge · Shift handover",
      metric: { label: "On-time dispatch", value: "99.4%" },
      body: [
        "Shift A is ready to hand over. There were three batch transitions, zero safety incidents and 99.8% compressed-air uptime. Plant OEE is 94.2% (availability 98.1%, performance 96.4%, quality 99.8%).",
        "Lot TEX-8821 remains on the light-to-dark dye sequence to cut vessel wash water 38% and wash downtime 45 minutes. Target ship date is 18 Sep 2026 with no supply-chain bottleneck."
      ],
      steps: [
        "Watch AJ-003 if vibration, temperature and miss-picks rise together",
        "Royal Navy #8821 is MATCH at ΔE 0.18 — keep tolerance at 0.50",
        "Pass open cases with owner, evidence and unverified items, not just a verbal note"
      ]
    },
    {
      id: "passport",
      tag: "COMPLY",
      tagClass: "tag-comply",
      prompt: "What evidence goes into a Digital Product Passport?",
      aliases: ["digital product passport", "dpp", "traceability", "passport"],
      source: "Compliance & Traceability AI",
      metric: { label: "ZDHC MRSL", value: "Level 3" },
      body: [
        "The mill already connects order, style, customer, lot, batch, machine, roll defects, shade results, maintenance actions and audit events into a product history. That is the foundation — not yet a complete Digital Product Passport.",
        "A full passport would add unique product identity, fibre origin, supplier journey, environmental evidence, certifications, care guidance and controlled QR access. Today every chemical batch is checked to ZDHC MRSL Level 3 and effluent is pH 7.12 with 92% water recycle."
      ],
      steps: [
        "Materials — fibre content, source and supplier evidence",
        "Manufacturing — where and when each major process occurred",
        "Quality — shade, fabric and garment verification records",
        "Impact — water, energy, carbon and chemical information",
        "Access — a secure QR-linked view for the right audience"
      ]
    }
  ];

  function normalizeCopilotText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[“”"']/g, "")
      .replace(/[^a-z0-9Δδ\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findCopilotEntry(text) {
    const needle = normalizeCopilotText(text);
    if (!needle) return null;

    const exact = COPILOT_KNOWLEDGE.find((entry) => normalizeCopilotText(entry.prompt) === needle);
    if (exact) return exact;

    return COPILOT_KNOWLEDGE.find((entry) =>
      (entry.aliases || []).some((alias) => needle.includes(normalizeCopilotText(alias)))
    ) || null;
  }

  function buildMillKnowledgeBrief() {
    return COPILOT_KNOWLEDGE.map((entry, index) => {
      const lines = [
        `Q${index + 1}. ${entry.prompt}`,
        `Module: ${entry.source}`,
        entry.metric ? `Key reading: ${entry.metric.value} — ${entry.metric.label}` : "",
        `Answer: ${entry.body.join(" ")}`,
        entry.steps && entry.steps.length ? `Guidance: ${entry.steps.join(" | ")}` : ""
      ];
      return lines.filter(Boolean).join("\n");
    }).join("\n\n");
  }

  return {
    COPILOT_KNOWLEDGE,
    normalizeCopilotText,
    findCopilotEntry,
    buildMillKnowledgeBrief
  };
});
