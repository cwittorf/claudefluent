---
name: keyword-research
description: Pull keyword data from DataForSEO to find the best bang-for-buck SEO and paid search opportunities for any business. Use this skill whenever the user wants to find keywords, research search volume, discover low-competition opportunities, build a keyword strategy, or identify content gaps relative to competitors. Requires a DataForSEO API key (base64 encoded login:password). Outputs a structured keywords.md file.
---

# Keyword Research

Pull keyword data from the DataForSEO API and produce a structured `keywords.md` with prioritized keyword opportunities tailored to the business and target persona.

## What You Need

Required:
- **Business / product name or URL** — what to research keywords for
- **DataForSEO API key** — base64-encoded `login:password` string

Optional (check project files first before asking):
- **Persona** — check for `persona.md` in the project root
- **Competitor list** — check for `competitors-summary.md` in the project root
- **Target country** — default to United States if not specified

## Step 1: Understand the Business and Persona

Before pulling any data:
1. Check for `persona.md` — extract: who the target buyer is, what they care about, their use cases, their language
2. Check for `competitors-summary.md` — extract: what keywords competitors are targeting so you can find gaps they're NOT covering
3. Ask the user if persona/competitor context is missing and it would meaningfully change the strategy

## Step 2: Build Seed Keyword Lists

Create 3–4 batches of seed keywords covering different angles:

**Batch 1 — Branded terms**
The product/brand name + variations (misspellings, abbreviations, flavor names, mascot names)

**Batch 2 — Category / awareness terms**
Generic product category terms the target persona would search when considering a purchase

**Batch 3 — Persona use-case terms**
Terms that reflect *how and when* the persona uses the product (e.g., "cereal for dinner", "quick breakfast no cooking", "lazy breakfast adults")

**Batch 4 — Competitor / comparison terms**
Top competitor names + "vs", "alternative", "best [category]" terms to capture comparison intent

## Step 3: Pull Data from DataForSEO

Use the DataForSEO Labs API. Auth header format:
```
Authorization: Basic {base64_api_key}
```

### Keyword Ideas (broad discovery)
```bash
curl -s --request POST \
  --url https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live \
  --header 'Authorization: Basic {API_KEY}' \
  --header 'Content-Type: application/json' \
  --data '[{
    "keywords": [LIST_OF_SEEDS],
    "language_name": "English",
    "location_name": "United States",
    "include_serp_info": true,
    "limit": 100
  }]'
```

### Related Keywords (depth from one term)
```bash
curl -s --request POST \
  --url https://api.dataforseo.com/v3/dataforseo_labs/google/related_keywords/live \
  --header 'Authorization: Basic {API_KEY}' \
  --header 'Content-Type: application/json' \
  --data '[{
    "keyword": "CORE_BRAND_TERM",
    "language_name": "English",
    "location_name": "United States",
    "depth": 2,
    "include_serp_info": true,
    "limit": 50
  }]'
```

Run 2–3 API calls with different seed sets to maximize keyword surface area. Parse results and extract: `keyword`, `search_volume`, `competition_level`, `keyword_difficulty`, `cpc`, `main_intent`.

### Python parser snippet
```python
import json, sys
data = json.load(sys.stdin)
items = data['tasks'][0]['result'][0]['items']
results = []
for item in items:
    kw = item['keyword']
    vol = item['keyword_info']['search_volume'] or 0
    comp_level = item['keyword_info']['competition_level'] or 'N/A'
    kd = item['keyword_properties']['keyword_difficulty'] or 0
    cpc = item['keyword_info']['cpc'] or 0.0
    intent_obj = item.get('search_intent_info') or {}
    intent = intent_obj.get('main_intent', '?') or '?'
    results.append((vol, kd, comp_level, cpc, intent, kw))
results.sort(key=lambda x: x[0], reverse=True)
for v,kd,cl,cpc,intent,kw in results:
    print(f'{v:>8} vol | KD {kd:>3} | {cl:<6} | ${cpc:.2f} CPC | {intent:<14} | {kw}')
```

For related_keywords endpoint, replace `item['keyword_info']` with `item['keyword_data']['keyword_info']`.

## Step 4: Filter and Score

After collecting data, apply these filters to find bang-for-buck keywords:

**Primary filter (best opportunities):**
- `keyword_difficulty` ≤ 20
- `competition_level` = LOW or MEDIUM
- `search_volume` ≥ 100
- Keyword is relevant to the business AND persona

**Secondary signals (boost priority):**
- High CPC despite low KD = strong commercial intent with little organic competition
- Persona use-case match (does this phrase reflect how Alex actually thinks/searches?)
- Competitor gap (not targeted by known competitors)
- Content opportunity (can produce a page/article that ranks for this)

## Step 5: Organize into Tiers

Group keywords into 4 tiers:

1. **Branded** — own the brand name; easiest wins, highest purchase intent
2. **High-opportunity broad** — category terms, reasonable volume, low KD
3. **Persona-specific niche** — lower volume, perfect-fit audience, often uncontested
4. **Competitor comparison** — capture searchers actively comparing

## Step 6: Write keywords.md

Save output to `keywords.md` in the project root. Include:

- **Scoring key** explaining each column
- **Tier tables** with: keyword, volume, KD, competition, CPC, intent, priority rating (⭐⭐⭐ / ⭐⭐ / ⭐)
- **Top 10 Priority Keywords** table — best bang for buck with rationale
- **Content Opportunities** — suggested pages/articles that would target keyword clusters
- **Competitor Gap section** — keywords no competitor is intentionally targeting

## Output Standards

- All volume figures should state the data source and date
- Prioritize *actionable* over *comprehensive* — top 10 priorities should be immediately usable
- Persona fit reasoning should be explicit (don't just pick low-KD keywords that aren't relevant)
- Flag any surprisingly high-CPC / low-KD combos — these signal high commercial value with easy organic potential
- Note when competitors ARE actively buying/ranking for a term — these may require more investment

## File to Create

Always save to `keywords.md` in the current working directory.
