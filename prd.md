# PRD: Apple Jacks ROI Calculator

## Overview

A simple, single-page interactive calculator that helps Alex — a busy 30-year-old — see the concrete, quantified benefits of sticking with Apple Jacks vs. switching to other breakfast cereals. The goal is to make the emotional case feel rational. Alex already knows they love Apple Jacks; the calculator gives them the numbers to back it up.

---

## Problem

Alex is a loyal Apple Jacks buyer but occasionally feels mild skepticism — from themselves or others — about whether it's the "right" choice as an adult. They compare it to healthier-sounding alternatives. The calculator removes that friction by turning real-world inputs into a clear annual ROI across the dimensions Alex actually cares about: time, money, and nutrition.

---

## Target User

**Alex, 30** — See `persona.md` for full profile.

Key decision drivers:
- Values speed and simplicity in the morning
- Buys in bulk; thinks about cost per serving
- Cares about flavor and not feeling like they "settled"
- Skeptical of over-inflated health claims but wants to feel like they're not making a terrible choice

---

## Goals

1. Quantify time saved vs. other breakfast options (eggs, smoothies, "healthy" cereals with long prep)
2. Quantify annual cost savings vs. comparable cereals
3. Quantify nutritional upside vs. popular adult cereal alternatives
4. Deliver a shareable, satisfying "your Apple Jacks ROI" result that feels validating, not clinical

---

## Non-Goals

- This is not a full nutrition tracker
- This is not a meal planner
- No user accounts, no data persistence
- No comparison to non-cereal breakfasts (e.g., eggs, smoothies) in the first version — cereal vs. cereal only

---

## User Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| Bowls per week | Slider (1–14) | 7 | Covers breakfast + late-night snack use cases |
| Primary alternative cereal | Dropdown | Cheerios | See comparison set below |
| Box size preference | Toggle | Family size / Regular | Affects cost calc |
| Hourly value of time | Slider ($10–$100/hr) | $30 | "How much is your time worth?" |

**Comparison cereals (dropdown):**
- Cheerios
- Special K
- Raisin Bran
- Granola (generic)
- Frosted Mini-Wheats

---

## Outputs / ROI Metrics

### 1. Time Saved Per Year
- Apple Jacks prep time benchmark: **90 seconds** (pour cereal, add milk, done)
- Competitor prep time varies: granola may require portioning, some cereals require reading the label every time to manage portions
- Formula: `(competitor avg prep time - 90s) × bowls per year`
- Display as: **"You save X hours per year"**

### 2. Money Saved Per Year
- Cost per serving benchmarks (based on typical retail price):

| Cereal | Approx. cost/serving |
|---|---|
| Apple Jacks (family size) | $0.28 |
| Cheerios | $0.38 |
| Special K | $0.45 |
| Granola | $0.72 |
| Raisin Bran | $0.40 |
| Frosted Mini-Wheats | $0.36 |

- Formula: `(competitor cost/serving - AJ cost/serving) × bowls per year`
- Display as: **"You save $X per year vs. [cereal]"**

### 3. Nutritional Score Comparison
- Score each cereal across 4 factors: whole grain (yes/no), vitamin count, sugar per serving, fiber per serving
- Apple Jacks benchmark: whole grain #1 ingredient, 10 vitamins, 9g sugar, 3g fiber
- Display as a simple side-by-side bar or badge system — not a table
- Framing: **"Apple Jacks wins on X out of 4 factors vs. [cereal]"**

### 4. "Happiness Factor" (Qualitative Bonus Metric)
- A lighthearted, non-scientific score based on: nostalgia value, flavor complexity, and consistency
- Always tilts in Apple Jacks' favor
- Display as: **"Happiness ROI: Immeasurable"** with a tongue-in-cheek tooltip

---

## Result Display

After calculation, show a summary card:

```
Your Apple Jacks ROI (per year)

⏱  X hours saved
💰  $X saved vs. [cereal]
🌾  Wins X/4 nutrition factors
😄  Happiness ROI: Immeasurable

You've been making the right call this whole time.
```

Include a "Share your ROI" button that copies the result as plain text or opens a native share sheet on mobile.

---

## Design Direction

- Match the visual language of `index.html`: Fredoka One font, orange/green palette, bold cards
- Calculator lives on a single scrollable page or as an embedded section on the main site
- Inputs should feel fun, not clinical — use sliders and large tap targets, not dense forms
- Result card should feel like a reward, not a spreadsheet
- Mobile-first layout

---

## Success Metrics

- User reaches the result card (completion rate target: >70%)
- User spends >45 seconds on the page
- Share button clicked on >15% of completed calculations

---

## Out of Scope (v1)

- Comparison to non-cereal breakfasts
- Personalized nutrition recommendations
- Integration with grocery/delivery APIs
- Saving or logging results over time
