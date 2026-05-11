---
title: "I Automated My LinkedIn Publishing Pipeline with RSS and Buffer. Here's the Exact Stack."
date: 2026-05-11
description: 'VitePress generates the RSS feed at build time. GitHub Actions deploys it. Buffer picks it up and posts to LinkedIn. Zero manual steps after the git push.'
---

# I Automated My LinkedIn Publishing Pipeline with RSS and Buffer. Here's the Exact Stack.

Every time I pushed a blog post to GitHub, I had the same ritual: copy the title, paste it into LinkedIn, rewrite the description to not sound robotic, add the URL, pick hashtags, schedule it, and close fourteen tabs. Twenty minutes for something that should take zero.

So I automated it.

---

## The Architecture

The pipeline is three moving parts stitched together at build time:

**VitePress → RSS feed → Buffer → LinkedIn**

No webhooks. No cron jobs. No third-party bots that will break in six months. Just a Vite plugin that runs during `npm run docs:build` and writes a `feed.xml` into the output directory alongside the rest of the static site.

---

## The RSS Plugin

VitePress exposes a `buildEnd` Vite plugin hook. That's where the feed gets generated.

The plugin reads every `.md` file in the `docs/` directory, extracts frontmatter (`title`, `date`, `description`), strips markdown from the first paragraph for the excerpt, sorts by date descending, and serialises it to RSS 2.0 XML.

The output gets written to `docs/.vitepress/dist/feed.xml`. A GitHub Actions step copies it to `dist/blog/feed.xml` before the deploy, so it lands at `https://vishnukarthik.me/blog/feed.xml` — permanently, predictably, the same URL every time.

No runtime server. No API calls. Pure static generation.

---

## Open Graph Per Post

LinkedIn's link preview is determined by the Open Graph tags on the page at the time LinkedIn's crawler fetches it. VitePress's `transformPageData` hook runs during build and injects per-post OG tags into the `<head>`:

```
og:title       → frontmatter.title
og:description → frontmatter.description
og:url         → https://vishnukarthik.me/blog/{slug}/
og:type        → article
article:published_time → ISO 8601 date from frontmatter
```

This means every post gets its own preview card on LinkedIn — not the site default.

---

## GitHub Actions

The deploy workflow now has one extra step between `docs:build` and `actions-gh-pages`:

```yaml
- name: Copy RSS feed into blog output
  run: cp docs/.vitepress/dist/feed.xml dist/blog/feed.xml
```

That's it. The rest of the workflow is unchanged. Build, copy, deploy.

---

## Buffer Configuration

Buffer's RSS Automation (available on Essentials and above) polls an RSS feed URL on a schedule and creates a draft — or auto-publishes — whenever a new `<item>` appears that it hasn't seen before.

Setup is four fields:

1. **Feed URL**: `https://vishnukarthik.me/blog/feed.xml`
2. **Channel**: LinkedIn personal profile
3. **Post template**: `{title}\n\n{description}\n\n{link}\n\n#Technology #AI #TechStrategy`
4. **Schedule**: Buffer posts at your pre-configured best-time slot

Buffer detects new items by tracking `<guid>` values. The `<guid>` in the feed is the full post URL, which is stable and unique. Once Buffer has seen a guid, it won't republish it — so there's no risk of duplicate posts from re-deployments.

---

## The Post Template

Buffer's template variables map directly to RSS fields:

| Variable | Source |
|---|---|
| `{title}` | `<title>` — pulled from frontmatter |
| `{description}` | `<description>` — frontmatter description or first-paragraph excerpt |
| `{link}` | `<link>` — canonical post URL |

The template I use:

```
{title}

{description}

Read → {link}

#AI #Technology #TechStrategy #SoftwareEngineering
```

LinkedIn auto-generates the link preview card from the OG tags. The URL in the post body is visible but the card is what people actually click.

---

## Writing a New Post

The workflow from here:

1. Create `docs/your-slug.md` with frontmatter: `title`, `date`, `description`
2. Write the post
3. `git add . && git commit -m "post: your title" && git push`

GitHub Actions builds the site, generates the RSS feed, deploys to GitHub Pages. Buffer polls the feed within the hour, picks up the new item, and queues the LinkedIn post. Nothing else required.

---

## What I Didn't Do

I looked at direct LinkedIn API integration. The LinkedIn API requires OAuth with a user token, refresh token rotation, app approval for the `w_member_social` scope, and a server to handle the token exchange. For a static site with no backend, that's a lot of infrastructure to maintain for something Buffer already handles with four input fields.

I also looked at Zapier and Make. Both work, but both add a paid intermediary with their own failure modes. Buffer is already in the stack. Using it for RSS automation costs nothing extra.

The complexity budget matters. This solution has two failure points: GitHub Actions (near-zero failure rate) and Buffer's RSS polling (reliable within the hour). That's acceptable.

---

_Automation that survives without maintenance is the only automation worth building._
