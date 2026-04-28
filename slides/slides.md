---
theme: default
title: "Mainframe Playbook"
info: |
  ## Mainframe Playbook
  Built with Trellis
drawings:
  persist: false
transition: fade-out
mdc: true
colorSchema: light
download: true
exportFilename: "mainframe-playbook"
themeConfig:
  primary: "#e87722"
---

<!-- Cover -->
---
layout: image-right
image: /images/cover.jpg
---

<div class="flex flex-col justify-between h-full py-16 pr-8">
  <img src="/trifork-logo.svg" class="w-32" />
  <div class="text-5xl font-bold text-[#2C3A41] leading-tight">Mainframe Playbook</div>
  <div>
  </div>
</div>

<!--
Cover slide. Replace /images/cover.jpg with a relevant photo from Unsplash.
Best: an image that connects to the client's industry or the problem domain.
-->

---

<!-- Who We Are -->
---

<div class="flex flex-col justify-center h-full gap-6 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">Who We Are</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">Engineering-led, build-first</h2>
  <div class="text-sm text-[#6B7280]">We turn messy, manual workflows into production systems.</div>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div class="i-carbon-development text-2xl text-[#e87722] shrink-0" />
      <div>
        <span class="font-bold text-[#2C3A41] text-sm">Build-first</span>
        <span class="text-xs text-[#6B7280] ml-2">The people who assess are the people who build.</span>
      </div>
    </div>
    <div class="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div class="i-carbon-earth text-2xl text-[#e87722] shrink-0" />
      <div>
        <span class="font-bold text-[#2C3A41] text-sm">Global reach</span>
        <span class="text-xs text-[#6B7280] ml-2">1,200+ engineers across 15 countries.</span>
      </div>
    </div>
    <div class="flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div class="i-carbon-idea text-2xl text-[#e87722] shrink-0" />
      <div>
        <span class="font-bold text-[#2C3A41] text-sm">Pragmatic AI</span>
        <span class="text-xs text-[#6B7280] ml-2">AI where it helps, automation where it sticks.</span>
      </div>
    </div>
  </div>
</div>

<!--
Who we are. Update the three rows to match the capabilities most relevant to this client.
The "2+ years" callout is optional — only include if you have an existing relationship.
-->

---

<!-- The Situation / Why Now -->
---

<div class="flex flex-col justify-center h-full gap-6 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">The Situation</div>
  <h2 class="text-4xl font-bold text-[#2C3A41] leading-tight"><!-- One sharp headline about the client's specific moment --></h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <div class="i-carbon-growth text-3xl text-[#e87722] mb-3" />
      <div class="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2"><!-- Stat label --></div>
      <div class="text-3xl font-bold text-[#2C3A41] mb-1"><!-- Big number or fact --></div>
      <div class="text-xs text-[#6B7280]"><!-- One sentence of context --></div>
    </div>
    <div class="bg-[#e87722]/10 border border-[#e87722]/30 rounded-xl p-6">
      <div class="i-carbon-flow text-3xl text-[#e87722] mb-3" />
      <div class="text-xs font-semibold text-[#e87722] uppercase tracking-wide mb-2">The implication</div>
      <div class="text-xl font-bold text-[#2C3A41] mb-2"><!-- What that means for them --></div>
      <div class="text-xs text-[#2C3A41]"><!-- Concrete effect on their team/process --></div>
    </div>
  </div>
</div>

<!--
The "why now" slide. Anchor this to a specific event or change that just happened
(acquisition, reorg, regulation change, market shift). The more specific and recent,
the better. Generic "AI is changing everything" framing loses rooms.
-->

---

<!-- The Pattern -->
---

<div class="flex flex-col justify-center h-full gap-5 px-12 w-full">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">The Pattern</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">Each step builds the next</h2>
  <div class="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 mt-2 w-full">
    <div class="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <div class="i-carbon-analytics text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Step 1</div>
      <div class="font-bold text-[#2C3A41] text-base mb-1">Instrument</div>
      <div class="text-[10px] text-[#6B7280]">Map the workflow. Understand where capacity goes before changing anything.</div>
    </div>
    <div class="text-[#e87722] text-xl self-center">→</div>
    <div class="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <div class="i-carbon-connect text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Step 2</div>
      <div class="font-bold text-[#2C3A41] text-base mb-1">Connect</div>
      <div class="text-[10px] text-[#6B7280]">Integrate systems so data flows without manual intervention between teams.</div>
    </div>
    <div class="text-[#e87722] text-xl self-center">→</div>
    <div class="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <div class="i-carbon-task-complete text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Step 3</div>
      <div class="font-bold text-[#2C3A41] text-base mb-1">Standardize</div>
      <div class="text-[10px] text-[#6B7280]">Consistent inputs and outputs. Leadership can trust comparisons and roll-ups.</div>
    </div>
    <div class="text-[#e87722] text-xl self-center">→</div>
    <div class="bg-[#e87722]/10 border border-[#e87722]/30 rounded-xl p-4 text-center">
      <div class="i-carbon-rocket text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Step 4</div>
      <div class="font-bold text-[#2C3A41] text-base mb-1">Amplify</div>
      <div class="text-[10px] text-[#6B7280]">AI tooling compounds on a clean foundation.</div>
    </div>
  </div>
</div>

<!--
The four-step framework. Works for any back-office, operational, or data automation pitch.
Add a footer line naming the specific workflows for this client:
  "AP invoices. Contract reviews. Onboarding. Each one follows the same sequence."
-->

---

<!-- Proof — Case Study Transition -->
---
layout: center
---

<div class="flex flex-col items-center justify-center gap-4 text-center">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">Case Study</div>
  <div class="text-3xl font-bold text-[#2C3A41]">We've done this before.</div>
  <p class="text-base text-[#6B7280] max-w-lg">Here's a recent example of the same pattern applied at scale.</p>
</div>

<!--
Case study transition. Replace with a client logo + one-liner if you have permission to name them.
Keep this slide sparse — it's a moment beat before the proof.
-->

---

<!-- Proof Card -->
---

<div class="flex flex-col justify-center h-full gap-5 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">Proof · <!-- Client Name --></div>
  <h2 class="text-3xl font-bold text-[#2C3A41]"><!-- Outcome headline --></h2>
  <div class="grid grid-cols-3 gap-4 mt-1">
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="i-carbon-warning-alt text-2xl text-[#e87722] mb-3" />
      <div class="text-xs font-bold text-[#e87722] uppercase tracking-wide mb-2">The situation</div>
      <div class="font-bold text-[#2C3A41] text-sm mb-2"><!-- Bold headline --></div>
      <div class="text-xs text-[#6B7280]"><!-- 1-2 sentences --></div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="i-carbon-build text-2xl text-[#e87722] mb-3" />
      <div class="text-xs font-bold text-[#e87722] uppercase tracking-wide mb-2">Our contribution</div>
      <div class="font-bold text-[#2C3A41] text-sm mb-2"><!-- Bold headline --></div>
      <div class="text-xs text-[#6B7280]"><!-- 1-2 sentences --></div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="i-carbon-checkmark-filled text-2xl text-[#e87722] mb-3" />
      <div class="text-xs font-bold text-[#e87722] uppercase tracking-wide mb-2">The outcome</div>
      <div class="font-bold text-[#2C3A41] text-sm mb-2"><!-- Bold headline --></div>
      <div class="text-xs text-[#6B7280]"><!-- 1-2 sentences --></div>
    </div>
  </div>
  <div class="bg-[#e87722]/5 border border-[#e87722]/20 rounded-lg px-4 py-3">
    <div class="text-sm text-[#2C3A41]"><strong>The pattern is the same for <!-- Client Name -->.</strong> <!-- One-sentence bridge --></div>
  </div>
</div>

<!--
Proof card. Three columns: Situation / Contribution / Outcome.
Keep card descriptions to 1-2 short sentences. Details go in speaker notes.
The bottom bar bridges the case study to the client's situation.
-->

---

<!-- Prize — Outcomes -->
---

<div class="flex flex-col justify-center h-full gap-5 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">What's On The Table</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">The outcomes peers are already booking</h2>
  <div class="grid grid-cols-2 gap-4 mt-1">
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="text-3xl font-bold text-[#e87722] mb-1"><!-- % or metric --></div>
      <div class="text-sm font-semibold text-[#2C3A41] mb-1"><!-- Outcome label --></div>
      <div class="text-[10px] text-[#9CA3AF]"><!-- Source --></div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="text-3xl font-bold text-[#e87722] mb-1"><!-- % or metric --></div>
      <div class="text-sm font-semibold text-[#2C3A41] mb-1"><!-- Outcome label --></div>
      <div class="text-[10px] text-[#9CA3AF]"><!-- Source --></div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="text-3xl font-bold text-[#e87722] mb-1"><!-- % or metric --></div>
      <div class="text-sm font-semibold text-[#2C3A41] mb-1"><!-- Outcome label --></div>
      <div class="text-[10px] text-[#9CA3AF]"><!-- Source --></div>
    </div>
    <div class="bg-[#e87722]/10 border border-[#e87722]/30 rounded-xl p-5">
      <div class="text-3xl font-bold text-[#e87722] mb-1"><!-- % or metric --></div>
      <div class="text-sm font-semibold text-[#2C3A41] mb-1"><!-- Outcome label --></div>
      <div class="text-[10px] text-[#9CA3AF]"><!-- Source --></div>
    </div>
  </div>
</div>

<!--
Prize slide. Use only cited, published benchmarks — not vendor marketing claims.
Good sources: Ramp/Bill.com case studies, PwC research, analyst reports, peer company press releases.
One stat should be industry-specific (e.g., rail for transportation clients, legal for law firms).
-->

---

<!-- Governance -->
---

<div class="flex flex-col justify-center h-full gap-5 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">Risk & Governance</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">Controls built in, not bolted on</h2>
  <div class="grid grid-cols-3 gap-4 mt-1">
    <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
      <div class="i-carbon-locked text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">Security boundaries</div>
      <div class="text-xs text-[#6B7280]">Role-based access. Data stays inside your environment.</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
      <div class="i-carbon-audit text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">Audit trail</div>
      <div class="text-xs text-[#6B7280]">Every data change is logged. Full provenance for compliance.</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5 text-center">
      <div class="i-carbon-user-certification text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">Human in the loop</div>
      <div class="text-xs text-[#6B7280]">Built in, not added after. Defensible to legal and the board.</div>
    </div>
  </div>
</div>

<!--
Governance slide. Adjust the three cards to the client's specific concerns.
Financial services: SOX compliance, audit trails. Healthcare: HIPAA. Rail/industrial: safety certification.
Don't skip this slide — executives at regulated companies will ask about it.
-->

---

<!-- Proposal -->
---

<div class="flex flex-col justify-center h-full gap-5 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">What We Propose</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">6 weeks to a decision</h2>
  <div class="grid grid-cols-3 gap-4 mt-1">
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="i-carbon-chat-launch text-2xl text-[#e87722] mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Wk 1–2</div>
      <div class="font-bold text-[#2C3A41] text-xl mb-2">Learn</div>
      <div class="space-y-1 text-xs text-[#6B7280]">
        <div>Dept head conversations</div>
        <div>"Where is the biggest opportunity?"</div>
        <div>System + data inventory</div>
      </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-5">
      <div class="i-carbon-chart-multitype text-2xl text-[#e87722] mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Wk 3–4</div>
      <div class="font-bold text-[#2C3A41] text-xl mb-2">Assess</div>
      <div class="space-y-1 text-xs text-[#6B7280]">
        <div>Impact × Feasibility × Readiness</div>
        <div>Ranked initiative list</div>
        <div>Governance framework preview</div>
      </div>
    </div>
    <div class="bg-[#e87722]/10 border border-[#e87722]/30 rounded-xl p-5">
      <div class="i-carbon-package text-2xl text-[#e87722] mb-2" />
      <div class="text-[#e87722] font-bold text-[10px] uppercase tracking-wide mb-1">Wk 5–6</div>
      <div class="font-bold text-[#2C3A41] text-xl mb-2">Deliver</div>
      <div class="space-y-1 text-xs text-[#2C3A41]">
        <div>Ranked initiative portfolio</div>
        <div>Quick wins in motion</div>
        <div>First-build scoped + costed</div>
      </div>
    </div>
  </div>
  <div class="text-xs text-[#6B7280] text-center">Week 6 ends with a decision: stop, continue, or scale — with evidence to back it.</div>
</div>

---

<!-- Next Steps -->
---

<div class="flex flex-col justify-center h-full gap-8 px-12">
  <div class="text-xs uppercase tracking-widest text-[#e87722] font-semibold">What Happens Next</div>
  <h2 class="text-3xl font-bold text-[#2C3A41]">We can start next week</h2>
  <div class="flex gap-4 items-center mt-2">
    <div class="flex-1 bg-white border border-gray-200 rounded-xl p-6 text-center">
      <div class="i-carbon-calendar text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">Schedule interviews</div>
      <div class="text-xs text-[#6B7280]">6–8 dept heads · We bring questions · You provide access</div>
    </div>
    <div class="text-[#e87722] text-2xl">→</div>
    <div class="flex-1 bg-white border border-gray-200 rounded-xl p-6 text-center">
      <div class="i-carbon-document-tasks text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">Portfolio kickoff</div>
      <div class="text-xs text-[#6B7280]">Ranked initiatives · ROI logic · Named owners</div>
    </div>
    <div class="text-[#e87722] text-2xl">→</div>
    <div class="flex-1 bg-[#e87722]/10 border border-[#e87722]/30 rounded-xl p-6 text-center">
      <div class="i-carbon-checkbox-checked text-3xl text-[#e87722] mx-auto mb-2" />
      <div class="font-bold text-[#2C3A41] text-sm mb-1">You choose</div>
      <div class="text-xs text-[#2C3A41]">Stop · Continue · Scale — with evidence</div>
    </div>
  </div>
</div>

---

<!-- Close -->
---
layout: image-right
image: /images/close.jpg
---

<div class="flex flex-col justify-center h-full gap-6">
  <img src="/trifork-logo.svg" class="w-32" />
  <h2 class="text-4xl font-bold text-[#2C3A41] leading-tight">Which function matters most?</h2>
  <p class="text-base text-[#6B7280]">That is where we start.</p>
  <div class="mt-4 flex flex-col gap-1 text-xs text-[#6B7280]">
  </div>
</div>

<!--
Close slide. The question lands best if you pause after it and let the room answer.
Any answer is a good answer — it means they're thinking about priorities, not skepticism.
Replace /images/close.jpg with a photo relevant to the client's world.
-->
