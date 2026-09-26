# HTB Endpoint Mapper

A JavaScript endpoint mapper that documents the HackTheBox API surface derived from the frontend `user-api` module. Run it in your browser console to get a formatted, interactive overview of every endpoint the HTB web app exposes for user, profile, progress, and token operations.

## What It Does

- Parses the exported functions from HTB's frontend `user-api-B1R5fUKf.js` module
- Maps each minified function (`r`, `i`, `a`, etc.) to its real HTTP method, path, and purpose
- Prints a styled `console.table()` with full URLs, descriptions, and source function names
- Outputs a compact quick-reference list of every path
- Returns the raw endpoint data for programmatic use

## Base URL

```
https://labs.hackthebox.com/api/v4
```

All paths in the mapper are relative to this base.

## Usage

1. Open `https://app.hackthebox.com` in Chromium (logged in or not — this only maps paths, it does not call them)
2. Open DevTools → Console
3. Paste the entire contents of `poc.js`
4. Press Enter

You'll get a color-coded table and a quick-reference list.

### Example Output

```
HTB Endpoint Map (Base: https://labs.hackthebox.com/api/v4)
--------------------------------------------------------------------------

┌─────────┬─────────────────────────────┬────────┬──────────────────────────────────────────────────────────────┬──────────────────────────────┬─────────────┐
│ (index) │ Operation                   │ Method │ Full URL                                                     │ Description                  │ Source Func │
├─────────┼─────────────────────────────┼────────┼──────────────────────────────────────────────────────────────┼──────────────────────────────┼─────────────┤
│ 0       │ 'getUserTracks'             │ 'GET'  │ '.../api/v4/user/tracks'                                     │ 'Fetch user tracks'          │ 'r'         │
│ 1       │ 'getUserMachineSubmissions' │ 'GET'  │ '.../api/v4/user/submissions/machines'                       │ 'Get user machine submissions'│ 'i'         │
│ 2       │ 'getUserChallengeSubmissions'│ 'GET' │ '.../api/v4/user/submissions/challenges'                     │ 'Get user challenge submissions'│ 'a'      │
│ ...     │ ...                         │ ...    │ ...                                                          │ ...                          │ ...         │
└─────────┴─────────────────────────────┴────────┴──────────────────────────────────────────────────────────────┴──────────────────────────────┴─────────────┘
```

## Endpoint Categories

| Category | Endpoints |
|---|---|
| **User Data & Submissions** | Tracks, machine submissions, challenge submissions |
| **Voucher Management** | Check voucher, redeem voucher |
| **User Settings** | Get settings, toggle setting |
| **App Tokens** | List, create, delete tokens |
| **Subscriptions** | Recent status update, thank-you page |
| **Achievements & Reviews** | Achievement details, user actions, reviews |
| **Profile Data** | Basic profile, badges, activity, public profile |
| **Progress Tracking** | Machines, challenges, Sherlocks, Pro Labs, Fortresses |
| **Seasons & Content** | Season ranks, profile content, content counts |
| **Charts & Certificates** | Progress chart, user certificates |

## Full Endpoint List

```
GET    /user/tracks
GET    /user/submissions/machines
GET    /user/submissions/challenges
POST   /user/voucher/check
POST   /user/voucher/redeem
GET    /user/settings
POST   /user/edit/toggle
GET    /user/apptoken/list
POST   /user/apptoken/create
POST   /user/apptoken/delete
GET    /user/subscriptions/status/updated/recently
GET    /user/subscriptions/thankyou
GET    /user/achievement/{type}/{id}/{slug}
POST   /user/{action}/{id}
POST   /user/{action}/{id}
GET    /user/review/{type}/{id}
GET    /user/profile/basic/{id}
GET    /user/profile/badges/{id}
GET    /profile/badges/{id}
GET    /profile/{id}
GET    /user/profile/activity/{id}
GET    /user/profile/progress/machines/{id}
GET    /profile/progress/machines/{id}
GET    /user/profile/progress/challenges/{id}
GET    /profile/progress/challenges/{id}
GET    /user/profile/progress/sherlocks/{id}
GET    /profile/progress/sherlocks/{id}
GET    /user/profile/progress/prolab/{id}
GET    /profile/progress/prolab/{id}
GET    /user/profile/progress/fortress/{id}
GET    /profile/progress/fortress/{id}
GET    /season/user/{id}/ranks
GET    /user/profile/content/{id}
GET    /user/profile/content/{id}/counts
GET    /users/{id}/profile/progress/chart
GET    /user/profile/certificates
```

## Notes

- **No authentication required to run the mapper itself** — it only documents paths, it does not send requests.
- **Some endpoints require a valid App Token** if you decide to call them. You can create one at `https://app.hackthebox.com/account-settings` under **App Tokens**.
- **The two `POST /user/{action}/{id}` entries** are distinct in the source (functions `g` and `_`) but share the same path template. They likely differ by the `{action}` value passed at call time.
- **`enableV5Api: true`** is passed on `getProfileActivity` (`C`), `getProfileContent` (`F`), and `getProfileContentCounts` (`I`) in the original source. Those calls may route to a v5 backend even though the path prefix remains `/user/profile`.

## Disclaimer

This project is for educational and research purposes only. It maps publicly accessible frontend API paths. Respect HackTheBox's [Terms of Service](https://www.hackthebox.com/terms-of-service) and do not use this to abuse, overload, or circumvent platform protections.

## Author

**SleepTheGod** — [github.com/SleepTheGod](https://github.com/SleepTheGod)

## Repository

[https://github.com/SleepTheGod/HTB-Endpoint-Mapper](https://github.com/SleepTheGod/HTB-Endpoint-Mapper)
