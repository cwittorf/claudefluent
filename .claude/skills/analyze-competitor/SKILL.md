---
name: analyze-competitor
description: Research and analyze competitors for any company or product. Use this skill whenever the user asks to find competitors, research competing brands, build a competitive brief, analyze competitor positioning/pricing/messaging, or understand the competitive landscape for their business. Takes a company name, URL, or product description and outputs a structured competitors-summary.md with positioning, pricing, strengths, weaknesses, and messaging gaps.
---

# Analyze Competitor

Research the top competitors for any company or product and produce a structured `competitors-summary.md` brief.

## What You Need

The user provides one of:
- A company name (e.g., "Apple Jacks")
- A URL (e.g., "https://applejacks.com")
- A product description (e.g., "a SaaS tool for invoice automation")

Optionally they may also provide:
- A target persona or audience description
- A specific market/region
- A list of known competitors to include or exclude

If the target persona or audience is unclear, check for a `persona.md` file in the project root before asking the user.

## Step 1: Identify the Top 5 Competitors

Search for the top 5 direct competitors. Prioritize:
- Same product category / direct substitutes
- Similar price point
- Overlapping target audience
- Competitors the target persona is most likely to consider or switch to

Use WebSearch to find competitors if not already known. Search queries like:
- "[product] alternatives"
- "[product] vs [known competitor]"
- "best [product category] brands"
- "top [product category] competitors"

## Step 2: Research Each Competitor

For each competitor, visit their website and pull:

| Data Point | What to Look For |
|---|---|
| **Positioning / Tagline** | Homepage hero text, about page, ad copy |
| **Target audience** | Who they're speaking to — age, lifestyle, tone signals |
| **Key messages & tone** | How they talk, what they emphasize, emotional vs rational |
| **Pricing signals** | Listed prices, size tiers, bundles, free trials, freemium |
| **Nutritional / feature claims** | Any explicit product advantage claims |
| **Nostalgia or adult angle** | If applicable — are they targeting the same growth demographic? |

Use WebFetch on each competitor's homepage, pricing page, and about page. Also search for recent news, campaigns, or strategy articles about each competitor.

## Step 3: Identify Messaging Gaps

After researching all five, analyze what *none of them* are doing that the original company could own. Look for:
- Audience segments all competitors ignore or underserve
- Emotional territory no one claims
- Product truths no one says out loud
- Tone or voice completely absent from the category
- Use cases none of them address

Frame gaps relative to the target persona: what does this specific buyer need to hear that they're not hearing from any competitor?

## Step 4: Write competitors-summary.md

Save the output to `competitors-summary.md` in the project root. Use this structure for each competitor:

```markdown
## Competitor N — [Brand Name] ([Parent Company])

**Website:** [url]

### Positioning
[2-3 sentences on core brand identity and current strategic direction]

### Target Audience
[Who they're speaking to, any documented audience shifts]

### Messaging
- [Key messages, tone, campaign themes]

### Pricing / Sizes
[Any pricing signals, size tiers, bundles visible]

### Nutritional / Feature Claims
[Product claims they make]

### Strengths
- [2-4 real advantages relative to the original company]

### Weaknesses
- [2-4 real vulnerabilities]

### Messaging Gap vs. [Original Company]
[1 paragraph on what this competitor is NOT doing that the original company could own]
```

End the document with a **Messaging Gaps Summary** table:

```markdown
## Messaging Gaps Summary

| Gap | What Competitors Do | What [Company] Can Own |
|---|---|---|
| [gap name] | [status quo] | [opportunity] |
```

## Output Standards

- Be specific — cite actual taglines, campaign names, documented strategy quotes
- Cite sources at the bottom
- Keep each competitor section scannable but thorough
- Gaps should be actionable, not generic ("be more fun" is not a gap — "own the solo adult use case that all five competitors ignore" is)
- Frame everything relative to the original company's actual target audience

## File to Create

Always save output to `competitors-summary.md` in the current working directory.
