# Tech Services Nano

Ethical computer repair and IT support in Springfield, OR. Flat-rate pricing, free basic diagnostics, 90-day guarantee.

Built with Next.js 16, Tailwind CSS, and shadcn/ui.

---

## Development

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm build
pnpm lint
```

---

## Scheduling System

The booking page at `/schedule` integrates with Google Calendar. When configured, customers can view available time slots and book appointments directly. The owner manages availability by adding or removing events in Google Calendar — anything on the calendar is treated as unavailable.

**If the required environment variables are not set, the `/schedule` route returns 404 and the "Book Appointment" link is hidden from the site header.**

---

## Setup: Google Calendar Integration

### Step 1 — Create a Google Cloud project

1. Go to [Google Cloud Console](https://console.cloud.google.com) and sign in with the owner Google account.
2. Click the project dropdown at the top → **New Project**.
3. Name it (e.g. `Tech Services Nano`) and click **Create**.

### Step 2 — Enable the Google Calendar API

1. In the new project, go to **APIs & Services → Library**.
2. Search for **Google Calendar API**.
3. Click it and press **Enable**.

### Step 3 — Create a service account

1. Go to **IAM & Admin → Service Accounts**.
2. Click **Create Service Account**.
3. Give it a name (e.g. `scheduler`) and click **Create and Continue**.
4. Skip the optional role and user access steps — click **Done**.
5. Click the service account email to open it.
6. Go to the **Keys** tab → **Add Key → Create new key → JSON**.
7. Download the `.json` file. **Do not commit this file to git.**

The JSON file looks like this:

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "scheduler@your-project.iam.gserviceaccount.com",
  ...
}
```

You'll need `client_email` and `private_key` from this file.

### Step 4 — Create a dedicated Bookings calendar

A dedicated calendar keeps appointment bookings separate from the owner's personal events. Only events on the shared calendar affect slot availability.

1. Open [Google Calendar](https://calendar.google.com).
2. In the left sidebar, click **+** next to "Other calendars" → **Create new calendar**.
3. Name it (e.g. `Bookings`) and click **Create calendar**.
4. Click the calendar name in the sidebar → **Settings and sharing**.
5. Under **Share with specific people**, click **Add people and groups**.
6. Enter the service account email from Step 3 (e.g. `scheduler@your-project.iam.gserviceaccount.com`).
7. Set the permission to **Make changes to events** and click **Send**.
8. Scroll to **Integrate calendar** and copy the **Calendar ID** — it looks like `abc123...@group.calendar.google.com`.

> **Tip:** You can use your primary calendar instead, but a dedicated one is safer — personal events won't accidentally appear in free/busy results if you misconfigure the sharing.

### Step 5 — Set up email

Choose one provider. Gmail is simpler if the business already uses `techservicesnano@gmail.com` and you don't have a custom sending domain yet.

#### Option A: Gmail (simplest)

Uses the existing Gmail account — no new service or domain needed.

**1. Enable 2-Step Verification** (required before you can create app passwords)

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security).
2. Under "How you sign in to Google", click **2-Step Verification** and follow the prompts to turn it on.

**2. Create an app password**

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
2. You may be prompted to sign in again.
3. In the "App name" field, enter something like `Tech Services Nano Scheduler` and click **Create**.
4. Google shows a 16-character password (e.g. `abcd efgh ijkl mnop`). **Copy it now** — it is only shown once.

**3. Set up a booking notification alias**

Gmail will not deliver an email to itself — if you send from and to the same address, the message disappears silently. Use a `+` alias so notifications arrive in your inbox:

- Sending address (the Gmail account): `techservicesnano@gmail.com`
- Notification address (the alias): `techservicesnano+bookings@gmail.com`

Gmail delivers `+bookings` to the same inbox as the main address. You can optionally set up a filter to label these automatically:

1. In Gmail, go to **Settings → Filters and Blocked Addresses → Create a new filter**.
2. In the **To** field enter `techservicesnano+bookings@gmail.com` and click **Create filter**.
3. Check **Apply the label**, create a label called `Bookings`, and save.

**4. Add to `.env.local`**

```env
EMAIL_PROVIDER=gmail
GMAIL_USER=techservicesnano@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
SCHEDULING_OWNER_EMAIL=techservicesnano+bookings@gmail.com
```

Customer confirmation emails will arrive from `techservicesnano@gmail.com`. Your booking notifications will land in the same inbox under the `Bookings` label.

#### Option B: Resend (custom domain)

Better deliverability and lets you send from `appointments@techservicesnano.com`.

1. Go to [resend.com](https://resend.com) and sign up for a free account.
2. Add and verify your sending domain (e.g. `techservicesnano.com`) under **Domains**.
3. Go to **API Keys → Create API Key**. Copy the key.
4. In `.env.local` set `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, and `SCHEDULING_FROM_EMAIL=appointments@techservicesnano.com`.

### Step 6 — Configure environment variables

Copy `.env.example` to `.env.local` and fill in these values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`. Use the Gmail block **or** the Resend block — not both.

```env
# Required — Google Calendar
GOOGLE_CALENDAR_ID=abc123...@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=scheduler@your-project.iam.gserviceaccount.com
# From service account JSON "private_key" — keep quotes and \n escapes
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"

# Required — sign cancellation links (generate with: openssl rand -hex 32)
SCHEDULING_SECRET=paste_your_random_string_here

# Required — email (choose one)

# Gmail option:
EMAIL_PROVIDER=gmail
GMAIL_USER=techservicesnano@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
# Must differ from GMAIL_USER or Gmail will silently drop the notification.
# The +bookings alias delivers to the same inbox — see Step 5 for filter setup.
SCHEDULING_OWNER_EMAIL=techservicesnano+bookings@gmail.com

# Resend option (comment out Gmail lines above, uncomment these):
# EMAIL_PROVIDER=resend
# RESEND_API_KEY=re_your_key_here
# SCHEDULING_FROM_EMAIL=appointments@techservicesnano.com
# SCHEDULING_OWNER_EMAIL=techservicesnano@gmail.com

# Optional — these have sensible defaults
SCHEDULING_TIMEZONE=America/Los_Angeles
SCHEDULING_BUSINESS_HOURS=09:00-17:00
SCHEDULING_BUSINESS_DAYS=Mon,Tue,Wed,Thu,Fri
SCHEDULING_LEAD_TIME_HOURS=24
SCHEDULING_MAX_DAYS_AHEAD=30
NEXT_PUBLIC_SITE_URL=https://techservicesnano.com
```

**Copying the private key:** Open the JSON key file, find the `"private_key"` field, and paste the value (including the `-----BEGIN...` and `-----END...` lines) as the value in `.env.local`. Keep it wrapped in double quotes. The `\n` sequences must remain as literal `\n` (not real newlines).

**Generating `SCHEDULING_SECRET`:**
```bash
openssl rand -hex 32
```

### Step 7 — Verify

Start the dev server:

```bash
pnpm dev
```

Visit `http://localhost:3000` — the header should show a **Book Appointment** button. Visit `http://localhost:3000/schedule` — the booking form should render with the service picker and calendar.

---

## Managing availability

Once set up, the owner controls availability entirely through Google Calendar.

| Action | How to do it |
|--------|-------------|
| Block off a day or time | Create any event on the Bookings calendar (e.g. "Lunch", "Out of office") |
| Block recurring time | Create a recurring event (e.g. "No appointments" every Wednesday) |
| Cancel a booking | Delete the event — the slot reopens automatically |
| Close for a holiday | Create an all-day event on the Bookings calendar |
| Change business hours | Update `SCHEDULING_BUSINESS_HOURS` in `.env.local` and redeploy |
| Change which days are available | Update `SCHEDULING_BUSINESS_DAYS` (e.g. `Mon,Tue,Thu,Fri`) and redeploy |
| Change lead time | Update `SCHEDULING_LEAD_TIME_HOURS` and redeploy |

Slots are cached for 30 seconds, so a new block shows up on the booking page within about half a minute.

---

## Environment variable reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_CALENDAR_ID` | ✅ | — | Calendar ID from Google Calendar settings |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ✅ | — | `client_email` from the service account JSON |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | ✅ | — | `private_key` from the service account JSON |
| `SCHEDULING_SECRET` | ✅ | — | Random secret for signing cancel links (`openssl rand -hex 32`) |
| `EMAIL_PROVIDER` | — | `resend` | `resend` or `gmail` |
| `RESEND_API_KEY` | ✅ if Resend | — | API key from resend.com |
| `SCHEDULING_FROM_EMAIL` | ✅ if Resend | — | Verified sender address on your Resend domain |
| `GMAIL_USER` | ✅ if Gmail | — | Gmail address (e.g. `techservicesnano@gmail.com`) |
| `GMAIL_APP_PASSWORD` | ✅ if Gmail | — | 16-char app password from myaccount.google.com/apppasswords |
| `SCHEDULING_OWNER_EMAIL` | — | `SCHEDULING_FROM_EMAIL` or `GMAIL_USER` | Where booking notifications go |
| `SCHEDULING_TIMEZONE` | — | `America/Los_Angeles` | IANA timezone for the business |
| `SCHEDULING_BUSINESS_HOURS` | — | `09:00-17:00` | Open/close times in `HH:MM-HH:MM` format |
| `SCHEDULING_BUSINESS_DAYS` | — | `Mon,Tue,Wed,Thu,Fri` | Comma-separated day abbreviations |
| `SCHEDULING_LEAD_TIME_HOURS` | — | `24` | Minimum hours of advance notice required |
| `SCHEDULING_MAX_DAYS_AHEAD` | — | `30` | How far ahead customers can book |
| `NEXT_PUBLIC_SITE_URL` | — | `http://localhost:3000` | Full site URL used in cancellation links |

---

## Deploying to Vercel

1. Import the repository in the [Vercel dashboard](https://vercel.com).
2. Under **Settings → Environment Variables**, add all the required vars from the table above.
3. For `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: paste the full key value including the `-----BEGIN...` header/footer and the `\n` sequences. Vercel stores it correctly.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://techservicesnano.com`).
5. Deploy.

> **Security:** Never commit `.env.local` or the service account JSON file. Both are gitignored. Rotate `SCHEDULING_SECRET` if you suspect it was leaked — existing cancel links will stop working, which is the desired behavior.
