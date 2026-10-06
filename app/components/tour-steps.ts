// The full product tour. `target` is either a CSS selector, or "h:<text>" to
// point at the card/section that owns a heading starting with <text>.
// No target = a centred step.

export type TourStep = {
  route: string;
  target?: string;
  title: string;
  body: string;
  chapter: string;
};

export const TOUR: TourStep[] = [
  // Getting around
  { chapter: "Getting around", route: "/dashboard", title: "Welcome to Upcreate", body: "This tour walks through every part of the app, page by page. Use Next and Back, or your arrow keys. Press Esc to leave any time and pick it up again from Help." },
  { chapter: "Getting around", route: "/dashboard", target: "[data-tour=sidebar]", title: "The sidebar", body: "Everything is grouped by job: Plan what to make, Create it, then Grow with publishing and analytics. Collapse it to icons with the button next to the logo." },
  { chapter: "Getting around", route: "/dashboard", target: "[data-tour=brand-switcher]", title: "Brands", body: "Switch between the brands or clients you manage. Each brand has its own profile, calendar, scripts and analytics." },
  { chapter: "Getting around", route: "/dashboard", target: "[data-tour=search]", title: "Search everything", body: "Find any page, script, hook or outlier. Press Ctrl+K (⌘K on Mac) from anywhere, then use the arrow keys and Enter." },
  { chapter: "Getting around", route: "/dashboard", target: "[aria-label=Notifications]", title: "Notifications", body: "Filming reminders, newly discovered outliers and publish results land here." },
  { chapter: "Getting around", route: "/dashboard", target: "[aria-label='Toggle dark mode']", title: "Light and dark", body: "Switch themes. Your choice is remembered on this device." },
  { chapter: "Getting around", route: "/dashboard", target: "[aria-label=Settings]", title: "Settings", body: "Account, team, billing, AI credits, your AI provider key, integrations and notification preferences all live in here." },
  { chapter: "Getting around", route: "/dashboard", target: "[aria-label=Profile]", title: "Your profile", body: "Quick links to your brand profile and settings, and where you log out." },
  { chapter: "Getting around", route: "/dashboard", target: "[data-tour=help-menu]", title: "Help is always here", body: "Restart this tour, take a tour of just the page you're on, or see keyboard shortcuts." },

  // Dashboard
  { chapter: "Dashboard", route: "/dashboard", target: "[data-tour=dash-hero]", title: "Your home base", body: "Jump straight into the two things you'll do most: plan the next batch and write a script." },
  { chapter: "Dashboard", route: "/dashboard", target: "[data-tour=dash-level]", title: "Your level", body: "Level 1 is 0 to 1k followers, level 2 is to 10k, level 3 is to 100k. The playbook changes at each level, and so do the app's suggestions." },
  { chapter: "Dashboard", route: "/dashboard", target: "h:Quickstart", title: "Quickstart", body: "Four steps that set you up properly. Tick them off as you go, or hit Continue setup to jump to the next one." },
  { chapter: "Dashboard", route: "/dashboard", target: "h:Trending in your niche", title: "Trending in your niche", body: "Reels from creators about your size that broke out this week. The badge is the multiple: views divided by that creator's followers." },
  { chapter: "Dashboard", route: "/dashboard", target: "h:Content mix", title: "Content mix", body: "How your planned batch compares with the ratios you set: authority vs journey content, and proven vs double-down vs experimental ideas." },

  // Brand
  { chapter: "Brand Foundation", route: "/brand", target: "h:Identity", title: "Brand Foundation", body: "Fill this in first. Every generator in the app reads your handle, niche, story and positioning from here, so better input means better scripts." },
  { chapter: "Brand Foundation", route: "/brand", target: "h:Growth & ratios", title: "Ratios", body: "Set your follower count and content mix targets. The calendar and dashboard measure every batch against these numbers." },
  { chapter: "Brand Foundation", route: "/brand", target: "h:Reference", title: "Profile rules", body: "Your visual identity and a right-vs-wrong checklist for your bio, username and profile picture." },

  // Calendar
  { chapter: "Calendar", route: "/calendar", target: "h:Schedule", title: "Your calendar", body: "Click any day to see what's planned and add a script to it. Export the whole month to Word for your editor." },
  { chapter: "Calendar", route: "/calendar", target: "h:Batch tools", title: "Batch tools", body: "Track your ratios live, let AI propose 12 topics that fit them, import ready-made batches, or add items one at a time." },

  // Pipeline
  { chapter: "Pipeline", route: "/pipeline", target: "[data-tour=pipeline-board]", title: "Pipeline", body: "Every video moves left to right: idea, scripted, filmed, edited, scheduled, posted. Drag a card to move it. Filter by authority or journey up top." },

  // Research
  { chapter: "Outlier Research", route: "/research", target: "h:Auto-discovered", title: "Auto-discovered outliers", body: "Reels in your niche that got 5x or more their creator's follower count. Save the good ones to your log, turn one into a script, or dismiss it." },
  { chapter: "Outlier Research", route: "/research", target: "h:The 5x outlier rule", title: "The 5x rule", body: "Only model content that's already proven. This card explains the rule and the four ways to find creators worth studying." },
  { chapter: "Outlier Research", route: "/research", target: "h:Keyword bank generator", title: "Keyword bank", body: "Generate search terms from your niche to use in Instagram's Explore and Reels tabs." },
  { chapter: "Outlier Research", route: "/research", target: "h:Bulk import", title: "Bulk import", body: "Paste a creator's exported reel list and every row is checked against the 5x rule automatically." },
  { chapter: "Outlier Research", route: "/research", target: "h:Log a single outlier", title: "Log one by hand", body: "Found one while scrolling? Save the link, views, and its written, verbal and visual hooks." },

  // Hooks
  { chapter: "Hook Lab", route: "/hooks", target: "h:Hook stack generator", title: "Hook stacks", body: "A hook stack is three hooks that land together: what's written on screen, what you say, and what the viewer sees. Generate them for any topic." },
  { chapter: "Hook Lab", route: "/hooks", target: "h:Hook angles on screen", title: "Hook angles", body: "The 7 angles every hook falls into, each with an example of how it reads in the first second." },
  { chapter: "Hook Lab", route: "/hooks", target: "h:Universal cross-niche", title: "Fallback templates", body: "Hooks that work in any niche, for when your own ideas run dry." },

  // Scripts
  { chapter: "Scripts", route: "/scripts", target: "[data-tour=section-tabs]", title: "Scripts", body: "Three tabs in one place: Write new scripts, Improve existing ones, and browse the Library." },
  { chapter: "Scripts", route: "/scripts", target: "h:Authority / educational script generator", title: "Write a script", body: "Pick a topic, angle, format, funnel stage and CTA. The depth setting trades reach (short, simple) against conversion (deeper, more trust)." },
  { chapter: "Scripts", route: "/improve", target: "h:Version history", title: "Improve and keep every version", body: "Paste or pull in a script and get a diagnosis plus a targeted rewrite. Every version is kept, so you can compare or restore." },
  { chapter: "Scripts", route: "/library", target: "h:Script Library", title: "Script Library", body: "Ready-made scripts you can filter, schedule, or send to the Improver." },

  // Carousels
  { chapter: "Carousels", route: "/carousels", target: "h:Carousel generator", title: "Carousels", body: "Build carousel posts slide by slide from proven archetypes. Saved ones live in the Library tab." },

  // Production
  { chapter: "Production", route: "/production", target: "h:12 filming formats", title: "Production planner", body: "Filming formats, an equipment checklist, batch folder names, and a shot list pulled straight from any saved script." },
  { chapter: "Production", route: "/media", target: "[data-tour=media-drop]", title: "Media Bank", body: "Drop your footage here. Files get tagged automatically, and you can link each clip to the script it belongs to." },

  // Prompts
  { chapter: "Prompt Library", route: "/prompts", target: "h:Section directory", title: "Prompt Library", body: "Every AI prompt in the app, already filled in with your brand. Run them here or copy them into any AI tool. Export the lot to Word." },

  // Publish
  { chapter: "Publish", route: "/publish", target: "h:Connected accounts", title: "Connect your accounts", body: "Connect Instagram, TikTok and YouTube once. After that you can post from here and results sync back automatically." },
  { chapter: "Publish", route: "/publish", target: "h:Queue", title: "The queue", body: "Everything scheduled to go out. Hit Schedule post to add a video, caption and time; the app suggests your best slot." },
  { chapter: "Publish", route: "/publish", target: "h:Best times to post", title: "Best times", body: "Brighter squares are when your followers are most active." },

  // Funnel
  { chapter: "CTA & Funnel", route: "/funnel", target: "h:CTA decision guide", title: "Calls to action", body: "Pick the right ask for each video: follow, comment, a ManyChat keyword, or none." },
  { chapter: "CTA & Funnel", route: "/funnel", target: "h:Caption generator", title: "Captions", body: "Generate captions in the 3-line structure: hook, call to action, hashtags." },

  // Analytics
  { chapter: "Analytics", route: "/analytics", target: "[data-tour=analytics-overview]", title: "Performance", body: "Views, likes, comments and posts for the period you choose. Below this you can log posts by hand and see your top and bottom 5." },
  { chapter: "Analytics", route: "/insights", target: "h:Make next", title: "Insights", body: "What to make next, based on what's actually working for you. Each card links straight to where you'd act on it." },
  { chapter: "Analytics", route: "/insights", target: "h:Hooks that perform", title: "What's working", body: "Your hooks and formats ranked by average multiple, so you know what to double down on." },

  // Done
  { chapter: "You're set", route: "/dashboard", title: "That's the whole app", body: "Start with Brand Foundation, then plan a batch in the Calendar. You can rerun this tour, or tour a single page, from Help in the top bar." },
];
