import { site } from "./site";

/**
 * Per-page FAQs, keyed by path. Each page renders its own list with <Faq items={faqs[PATH]} />
 * (which also emits FAQPage schema), and /llms.txt lists every indexed page's FAQ.
 *
 * Rules:
 * - Answers state only facts the site already states: unlimited events and folders, bulk upload
 *   from computer or Google Drive, automatic face detection, link / QR code / WhatsApp sharing,
 *   selfie search, no app or login, guests see only their own photos, events of any size, free
 *   trial with no credit card.
 * - No question repeats across pages, or duplicates a question heading on its own page.
 * - Waiting for confirmed facts (add answers only once the team confirms): pricing, face-match
 *   accuracy, data retention / DPDP Act, download quality, watermarks, PIN protection, file limits.
 *
 * Draft copy by Claude (not from the content doc) except "/" — review before publishing.
 */

export type Faq = { q: string; a: string };

export const faqs: Record<string, Faq[]> = {
  "/": [
    { q: "What is Snapdaps?", a: site.definition },
    {
      q: "How do guests find their photos?",
      a: "Guests open the event link or scan its QR code, then upload a selfie. Snapdaps uses AI face recognition to find every photo they appear in and shows them in seconds. They can view and download their photos right from their phone — no scrolling through thousands of images.",
    },
    {
      q: "Do guests need to install an app or create an account?",
      a: "No. Guests use the event link or QR code in their phone's browser and upload a selfie — there is no app to install and no login. That makes it easy for every guest, from friends to elderly relatives, to get their photos.",
    },
    {
      q: "Can guests see other people's photos?",
      a: "Guests only see their own photos. Face search shows each guest the photos they appear in, so personal moments stay private while everyone still gets their pictures quickly.",
    },
    {
      q: "How do I share an event with my guests?",
      a: "Each event gets one secure link and a QR code. Display the QR code at the venue, add it to invitations, or invite guests on WhatsApp. There's no need to send photos one by one or hand out pendrives and Google Drive links.",
    },
    {
      q: "How do I upload event photos?",
      a: "Create an event, add folders for each part of it (for example Haldi, Sangeet, Reception), and bulk upload thousands of photos from your computer or Google Drive. Snapdaps detects faces automatically in the background — no manual tagging.",
    },
    {
      q: "Who is Snapdaps for?",
      a: "Snapdaps is built for photographers, studios, wedding photographers and event planners who deliver photos to many guests — weddings, birthday parties, corporate events, award ceremonies and sports tournaments.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can start a free trial with no credit card required, and setup takes minutes.",
    },
  ],

  "/how-it-works": [
    {
      q: "Do I need to tag people in the photos?",
      a: "No. Snapdaps detects faces automatically in the background as soon as photos are uploaded. There's no manual tagging, sorting or naming — guests find themselves with a selfie.",
    },
    {
      q: "Can I organise photos by part of the event?",
      a: "Yes. Every event can have unlimited folders — Haldi, Sangeet and Reception, or Day 1 and Day 2 — and you can create unlimited events. Guests see a clean gallery organised the same way.",
    },
    {
      q: "Where can I upload photos from?",
      a: "From your computer, or from a Google Drive link — paste it and Snapdaps imports every image in the background. You can bulk upload thousands of photos in one go.",
    },
    {
      q: "How quickly can guests get their photos?",
      a: "As soon as the photos are uploaded and faces are detected, guests can search. A selfie returns their matches in seconds, so guests can have their photos the same day instead of waiting weeks for delivery.",
    },
    {
      q: "Can guests use Snapdaps on their phone?",
      a: "Yes — it's built for phones. Guests open the link or scan the QR code in their phone's browser, take a selfie, then view and download their photos there. Nothing to install and no account to create.",
    },
  ],

  "/use-cases": [
    {
      q: "I'm a guest — how do I get my photos?",
      a: "You don't need an account. If your photographer or event host uses Snapdaps, open the link or scan the QR code they share, upload a selfie, and your photos appear — ready to view and download on your phone.",
    },
    {
      q: "Can one account handle many events?",
      a: "Yes. You can create unlimited events with custom names, each with its own gallery, folders, link and QR code — so one account covers every wedding, party or corporate event you shoot or plan.",
    },
    {
      q: "Does Snapdaps work for small events?",
      a: "Yes. Snapdaps works for events of any size, from a small family function or birthday party to a multi-day wedding or a large conference.",
    },
  ],

  "/use-cases/photo-sharing-app-for-photographers": [
    {
      q: "How do clients find their own photos in a large gallery?",
      a: "With AI face search. Each guest uploads a selfie and Snapdaps shows every photo they appear in within seconds — so nobody scrolls through thousands of images or calls you asking for their pictures.",
    },
    {
      q: "Can I deliver photos for several events at the same time?",
      a: "Yes. Create unlimited events, each with its own folders, link and QR code. Every client gets a separate, organised gallery, and you manage them all from one place.",
    },
    {
      q: "Can I upload an event straight from Google Drive?",
      a: "Yes. Paste the Drive folder's public link and Snapdaps imports every image in the background — or bulk upload thousands from your computer. Faces are detected automatically while you get on with your next shoot.",
    },
    {
      q: "Do my clients or their guests need to sign up?",
      a: "No. Clients and guests open your link or scan the QR code in a browser and upload a selfie — no app and no login, which is why even elderly relatives can get their photos without help.",
    },
    {
      q: "How soon after the event can I deliver photos?",
      a: "As soon as you upload. Faces are detected in the background, so you can share the gallery link the same day instead of spending days sorting photos and sending them person by person.",
    },
  ],

  "/use-cases/photo-sharing-app-for-event-planners": [
    {
      q: "Do I have to wait for the photographer to send photos to each guest?",
      a: "No. Once the event's photos are uploaded to Snapdaps, every guest finds their own with a selfie. Nobody has to send photos one by one, and you're not the one chasing them.",
    },
    {
      q: "Who uploads the photos — me or the photographer?",
      a: "Either. Whoever has the photos creates the event and uploads them from a computer or Google Drive. You can ask your photographer to upload directly, then share the event's link or QR code with guests yourself.",
    },
    {
      q: "Does it work for large events?",
      a: "Yes. Snapdaps works for events of any size. Upload thousands of photos in bulk, and every attendee still finds only their own photos with a selfie — in seconds.",
    },
    {
      q: "Can I organise photos by session, day or venue?",
      a: "Yes. Each event can have unlimited folders — by day, session, stage or venue — so guests browse an organised gallery instead of one long stream of photos.",
    },
  ],

  "/use-cases/wedding-photo-sharing-app": [
    {
      q: "Can guests get photos from each function — Haldi, Mehndi, Sangeet and Reception?",
      a: "Yes. Create a folder for every function inside the wedding event. Guests see an organised wedding gallery, and their selfie finds them across all functions at once.",
    },
    {
      q: "Do elderly relatives need to install anything?",
      a: "No. They open the link or scan the QR code in their phone's browser and upload a selfie — no app, no account and no password. Their photos appear in seconds.",
    },
    {
      q: "Does it work for a destination or multi-day wedding?",
      a: "Yes. Create one wedding event and add a folder for each day or function. Guests use the same link or QR code throughout, and one selfie finds them across every day.",
    },
    {
      q: "How long after the wedding can guests get their photos?",
      a: "As soon as the photographer uploads them. Faces are detected automatically, so guests can find their photos the same day instead of waiting weeks for a pendrive or Drive link.",
    },
    {
      q: "Can our photographer use Snapdaps for every wedding they shoot?",
      a: "Yes. Photographers can create unlimited events, so every couple gets their own wedding gallery with its own link and QR code.",
    },
  ],

  "/use-cases/birthday-party": [
    {
      q: "How do party guests get their birthday photos?",
      a: "Share the party's link or QR code — on the WhatsApp group, the invitation or a card at the venue. Each guest uploads a selfie and sees the photos they're in, ready to download.",
    },
    {
      q: "Can we organise photos by moment — cake cutting, games, dance?",
      a: "Yes. Add a folder for each part of the party. Guests see a tidy gallery, and their selfie still finds them in every folder.",
    },
    {
      q: "Can we add more photos after the party?",
      a: "Yes. Upload more photos to the same event at any time. Faces in the new photos are detected automatically, so guests who search again find them too.",
    },
    {
      q: "Can I use Snapdaps for school or society functions too?",
      a: "Yes. Snapdaps works for events of any size. Create a separate event for each function, each with its own link, QR code and folders.",
    },
  ],

  "/use-cases/corporate-events": [
    {
      q: "Can speakers and sponsors get their photos too?",
      a: "Yes. Anyone at the event with the link or QR code can upload a selfie and download the photos they appear in — speakers, sponsors, staff and attendees alike.",
    },
    {
      q: "Can we organise photos by session, day or venue?",
      a: "Yes. Create folders for each day, session, workshop or venue inside one event, so attendees browse an organised gallery.",
    },
    {
      q: "Can we keep photos from different events separate?",
      a: "Yes. Create a separate event for each conference, offsite or town hall. Each one has its own link, QR code and folders.",
    },
    {
      q: "Is it suitable for large conferences and offsites?",
      a: "Yes. Snapdaps works for events of any size: bulk upload thousands of photos, and every attendee still finds only their own with a selfie.",
    },
  ],

  "/use-cases/award-ceremony": [
    {
      q: "Can nominees who didn't win get their photos too?",
      a: "Yes. Everyone at the ceremony — nominees, guests, presenters and staff — can upload a selfie and download the photos they appear in.",
    },
    {
      q: "Can we use one account for every edition of our awards?",
      a: "Yes. Create a new event for each year's ceremony, with its own link, QR code and folders. You can create unlimited events.",
    },
    {
      q: "Can we split photos by category or segment?",
      a: "Yes. Add a folder for each award category, segment or venue area inside the ceremony event, so the gallery stays organised.",
    },
    {
      q: "How soon after the ceremony can guests get their photos?",
      a: "As soon as the photographer uploads them — faces are detected automatically, so winners can share their stage moment while it still matters.",
    },
  ],

  "/use-cases/sports-events": [
    {
      q: "How do players find their action shots?",
      a: "Players open the tournament link or scan its QR code, upload a selfie and see every photo they're in — warm-ups, match moments and the podium — without scrolling through thousands of photos.",
    },
    {
      q: "Can fans and spectators find their photos too?",
      a: "Yes. Anyone with the tournament link or QR code can upload a selfie and download the photos they appear in — players, coaches, parents and fans in the stands.",
    },
    {
      q: "Can schools and academies use it for every tournament?",
      a: "Yes. Create a separate event for each tournament, sports day or season, each with its own link, QR code and folders.",
    },
    {
      q: "Can players share their photos?",
      a: "Yes. Players download their photos to their phone and share them on WhatsApp or social media themselves.",
    },
  ],

  "/features/ai-face-search": [
    {
      q: "Does face search find guests in group photos?",
      a: "Yes. Snapdaps detects every face in a photo, so a guest's selfie finds them in group shots and candids as well as portraits.",
    },
    {
      q: "What kind of selfie works best?",
      a: "A clear, front-facing photo in good light, without sunglasses. Guests can take it on the spot with their phone camera or upload one they already have.",
    },
    {
      q: "Does one selfie search the whole event?",
      a: "Yes. A selfie searches every folder in the event at once — Haldi to Reception, or Day 1 to the final — and shows the matches together.",
    },
    {
      q: "Can guests download the photos face search finds?",
      a: "Yes. Guests view their matches and download them straight to their phone, with no app and no account.",
    },
  ],

  "/features/qr-code-photo-sharing": [
    {
      q: "Does every event get its own QR code?",
      a: "Yes. Each event has its own QR code and secure link, so guests always land in the right event's gallery.",
    },
    {
      q: "Do guests need a QR scanner app?",
      a: "No. Most phone cameras scan QR codes on their own; the code opens the event in the phone's browser.",
    },
    {
      q: "Can I print the event QR code?",
      a: "Yes. Put it on welcome boards, table cards, invitations, badges or the stage screen — every copy opens the same event.",
    },
    {
      q: "What if a guest can't scan the code?",
      a: "Send them the event link instead — on WhatsApp, by SMS or by email. It opens the same gallery as the QR code.",
    },
  ],

  "/features/photographer-portfolio": [
    {
      q: "What is a Snapdaps portfolio?",
      a: "A page on Snapdaps where you show your best work to people looking for a photographer, alongside the event galleries you deliver to clients.",
    },
    {
      q: "Do I need to buy a domain for my portfolio?",
      a: "No. Use a Snapdaps subdomain if you don't have a domain, or connect your own custom domain if you do.",
    },
    {
      q: "Do I need a separate website for my portfolio?",
      a: "Not to get started. Your Snapdaps portfolio sits next to the event galleries you already deliver, so your work and your delivery live in one place.",
    },
  ],

  "/features/google-drive-import": [
    {
      q: "Do I need to download my photos from Google Drive first?",
      a: "No. Paste the folder's public link and Snapdaps fetches the images straight from Google Drive in the background — nothing goes through your computer.",
    },
    {
      q: "Does the Google Drive folder need to be public?",
      a: "Yes. Set the folder's sharing to “Anyone with the link” so Snapdaps can read it. In Snapdaps, guests still only ever see the photos they appear in.",
    },
    {
      q: "Does it import photos inside subfolders?",
      a: "Yes. Snapdaps picks up every image in the folder you link, including the ones in its subfolders.",
    },
    {
      q: "Are faces detected on photos imported from Google Drive?",
      a: "Yes. Imported photos are treated like any upload: Snapdaps detects the faces automatically, so guests can find themselves with a selfie.",
    },
    {
      q: "Should I still share the Google Drive folder with guests?",
      a: "You don't need to. Share the Snapdaps event link or QR code instead — each guest gets only their own photos rather than browsing the whole folder.",
    },
  ],

  "/features/white-label-mobile-app": [
    {
      q: "Is the studio app available on both Android and iOS?",
      a: "Yes. Snapdaps publishes your studio's app on both Android and iOS, under your studio's own name.",
    },
    {
      q: "Is the white-label app included in every Snapdaps plan?",
      a: "No. The white-label app is available on selected Snapdaps plans. Book a demo and we'll tell you which plan fits your studio.",
    },
    {
      q: "Will my app show other photographers' events?",
      a: "No. Your app shows only your studio — your portfolio and the events you deliver. Other Snapdaps studios never appear in it.",
    },
    {
      q: "Can guests without the app still get their photos?",
      a: "Yes. Every event still has its secure link and QR code, so anyone can find their photos with a selfie in their phone's browser, with or without your app.",
    },
    {
      q: "Do clients get notified when their photos are ready?",
      a: "Yes. Your app sends clients a notification when their photos are ready, so they open your app — not a chat thread — to see them.",
    },
  ],

  "/pricing": [
    {
      q: "Is there a free plan?",
      a: "Yes. The Free plan lets you try Snapdaps on your first events with 10 GB of storage, 2 events and unlimited AI face search — no credit card needed.",
    },
    {
      q: "What's the difference between the paid plans?",
      a: "Storage and the largest photo you can upload. Every paid plan includes unlimited events, unlimited face search, original-quality photos and HEIC support; higher plans add more storage and bigger photo uploads. The comparison table lists each plan's limits.",
    },
    {
      q: "How much do I save with yearly billing?",
      a: "Yearly billing costs less than paying monthly for twelve months. The badge next to the Monthly / Yearly switch shows the best saving, and each plan shows its yearly price and what it works out to per month.",
    },
    // Billing answers below follow the Refund and Cancellation Policy (content/legal/refund-policy.ts,
    // last updated 15 Jul 2026) — keep them in step when it changes.
    {
      q: "How do I pay for a plan?",
      a: "Payments are processed securely through Razorpay, our payment partner. Prices are in Indian rupees, and applicable taxes are shown at checkout. Your plan's features become available as soon as the payment is confirmed.",
    },
    {
      q: "Do plans renew automatically?",
      a: "Auto-renewing plans renew at the end of each monthly or yearly billing period, and the renewal is charged at the start of the new period. You can turn off auto-renewal anytime before your next billing date, in your account settings or by contacting us; access continues until the paid period ends.",
    },
    {
      q: "Can I cancel my plan anytime?",
      a: "Yes. Cancel from your account settings or by emailing support@snapdaps.ai. Your plan won't renew, you keep access until the end of the period you've paid for, and your account and photos stay intact. Cancel at least 24 hours before your renewal date so it's processed in time.",
    },
    {
      q: "Can I get a refund?",
      a: "Plans are generally non-refundable, because their features are available as soon as you pay. We refund duplicate charges and verified unauthorised payments, and may refund in full or part if a fault on our side keeps your plan's features from working. Email support@snapdaps.ai within 7 days; approved refunds usually reach your original payment method in 5–10 business days.",
    },
  ],
};
