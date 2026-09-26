/**
 * HTB Endpoint Mapper — Complete API Coverage
 * Maps the full HackTheBox API surface including auth, tokens, machines,
 * challenges, sherlocks, fortresses, prolabs, starting point, seasons,
 * VPN, pwnbox, and v5 endpoints.
 *
 * Base URL: https://labs.hackthebox.com/api/v4
 * Token: Create at app.hackthebox.com → Profile → Settings → App Tokens
 */
(function () {
    // ── Base URLs ─────────────────────────────────────────────────────────
    const BASES = {
        v4:      'https://labs.hackthebox.com/api/v4',
        v5:      'https://labs.hackthebox.com/api/v5',
        account: 'https://account.hackthebox.com/api/v4'
    };

    // ── Endpoint Definitions ─────────────────────────────────────────────
    // [Category, Method, Path, BaseKey, Description, Params]
    const ENDPOINTS = [

        // ── 1. Authentication & Session ──────────────────────────────────
        ['Auth', 'POST', '/login',                    'account', 'Email/password login', 'email, password, remember'],
        ['Auth', 'POST', '/login/otp',                'account', 'OTP verification for 2FA', 'otp'],
        ['Auth', 'POST', '/register',                 'account', 'Create new account', 'email, password, name, country'],
        ['Auth', 'POST', '/logout',                   'account', 'Invalidate session', '—'],
        ['Auth', 'GET',  '/user/info',                'v4',      'Authenticated user identity', '—'],
        ['Auth', 'POST', '/user/reset',               'v4',      'Reset account progress', 'confirm'],

        // ── 2. App Token Management ───────────────────────────────────────
        ['Token', 'GET',  '/user/apptoken/list',      'v4',      'List all App Tokens', '—'],
        ['Token', 'POST', '/user/apptoken/create',    'v4',      'Create new App Token', 'name, expires_at'],
        ['Token', 'POST', '/user/apptoken/delete',    'v4',      'Revoke an App Token', 'id'],

        // ── 3. User Profile & Activity ────────────────────────────────────
        ['User', 'GET',  '/user/tracks',                      'v4', 'User tracks', '—'],
        ['User', 'GET',  '/user/submissions/machines',        'v4', 'Machine submissions', '—'],
        ['User', 'GET',  '/user/submissions/challenges',      'v4', 'Challenge submissions', '—'],
        ['User', 'GET',  '/user/settings',                    'v4', 'User preferences', '—'],
        ['User', 'POST', '/user/edit/toggle',                 'v4', 'Toggle user setting', 'setting'],
        ['User', 'GET',  '/user/profile/basic/{id}',          'v4', 'Basic profile by ID', 'id'],
        ['User', 'GET',  '/user/profile/activity/{id}',       'v4', 'Profile activity feed', 'id, page'],
        ['User', 'GET',  '/user/profile/badges/{id}',         'v4', 'User badges', 'id'],
        ['User', 'GET',  '/user/profile/bloods/{id}',         'v4', 'User first-bloods', 'id'],
        ['User', 'GET',  '/profile/{id}',                     'v4', 'Public user profile', 'id'],
        ['User', 'GET',  '/user/profile/certificates',        'v4', 'User certificates', '—'],
        ['User', 'GET',  '/users/{id}/profile/progress/chart', 'v4', 'Progress chart data', 'id'],
        ['User', 'POST', '/user/voucher/check',               'v4', 'Validate voucher code', 'voucherCode'],
        ['User', 'POST', '/user/voucher/redeem',              'v4', 'Redeem voucher', 'voucherCode'],
        ['User', 'GET',  '/user/subscriptions/status/updated/recently', 'v4', 'Recent subscription update', '—'],
        ['User', 'GET',  '/user/subscriptions/thankyou',      'v4', 'Subscription thank-you', '—'],
        ['User', 'GET',  '/user/achievement/{type}/{id}/{slug}', 'v4', 'Achievement details', 'type, id, slug'],
        ['User', 'GET',  '/user/review/{type}/{id}',          'v4', 'User review', 'type, id'],
        ['User', 'POST', '/user/{action}/{id}',               'v4', 'Generic user action', 'action, id'],

        // ── 4. Progress Tracking ──────────────────────────────────────────
        ['Progress', 'GET', '/user/profile/progress/machines/{id}',   'v4', 'User machine progress', 'id'],
        ['Progress', 'GET', '/profile/progress/machines/{id}',        'v4', 'Public machine progress', 'id'],
        ['Progress', 'GET', '/user/profile/progress/challenges/{id}', 'v4', 'User challenge progress', 'id'],
        ['Progress', 'GET', '/profile/progress/challenges/{id}',      'v4', 'Public challenge progress', 'id'],
        ['Progress', 'GET', '/user/profile/progress/sherlocks/{id}',  'v4', 'User Sherlock progress', 'id'],
        ['Progress', 'GET', '/profile/progress/sherlocks/{id}',       'v4', 'Public Sherlock progress', 'id'],
        ['Progress', 'GET', '/user/profile/progress/prolab/{id}',     'v4', 'User Pro Lab progress', 'id'],
        ['Progress', 'GET', '/profile/progress/prolab/{id}',          'v4', 'Public Pro Lab progress', 'id'],
        ['Progress', 'GET', '/user/profile/progress/fortress/{id}',   'v4', 'User Fortress progress', 'id'],
        ['Progress', 'GET', '/profile/progress/fortress/{id}',        'v4', 'Public Fortress progress', 'id'],
        ['Progress', 'GET', '/user/profile/content/{id}',             'v4', 'Profile content list', 'id, page'],
        ['Progress', 'GET', '/user/profile/content/{id}/counts',      'v4', 'Content counts', 'id'],

        // ── 5. Machines ───────────────────────────────────────────────────
        ['Machine', 'GET',  '/machine/paginated',              'v4', 'Active machines (paginated)', 'page, per_page'],
        ['Machine', 'GET',  '/machine/list/retired/paginated', 'v4', 'Retired machines (paginated)', 'page, per_page'],
        ['Machine', 'GET',  '/machine/profile/{id_or_name}',   'v4', 'Machine profile', 'id_or_name'],
        ['Machine', 'GET',  '/machine/active',                 'v4', 'Active machine', '—'],
        ['Machine', 'GET',  '/machine/unreleased',             'v4', 'Upcoming releases', '—'],
        ['Machine', 'GET',  '/machine/recommended',            'v4', 'Recommended machines', '—'],
        ['Machine', 'GET',  '/machines/{id}/tasks',            'v4', 'Guided-mode tasks', 'id'],
        ['Machine', 'POST', '/machine/own',                    'v4', 'Submit flag (v4)', 'id, flag, difficulty'],
        ['Machine', 'POST', '/machine/own',                    'v5', 'Submit flag (v5)', 'id, flag, difficulty'],
        ['Machine', 'POST', '/machine/play/{id}',              'v4', 'Start machine (free VPN)', 'id'],
        ['Machine', 'POST', '/machine/stop',                   'v4', 'Stop active machine', '—'],
        ['Machine', 'POST', '/vm/spawn',                       'v4', 'Spawn machine', 'machine_id'],
        ['Machine', 'POST', '/vm/terminate',                   'v4', 'Terminate machine', 'machine_id'],
        ['Machine', 'POST', '/vm/reset',                       'v4', 'Reset machine', 'machine_id'],
        ['Machine', 'POST', '/vm/extend',                      'v4', 'Extend time', 'machine_id'],
        ['Machine', 'GET',  '/vm/status',                      'v4', 'VM status', '—'],
        ['Machine', 'GET',  '/vm/active',                      'v4', 'Active VM', '—'],
        ['Machine', 'POST', '/vm/reset/vote',                  'v4', 'Vote to reset', 'machine_id'],
        ['Machine', 'POST', '/vm/reset/vote/accept',           'v4', 'Accept reset vote', 'machine_id'],
        ['Machine', 'GET',  '/virtual_machine/active',         'v5', 'Active VM (v5)', '—'],

        // ── 6. Challenges ─────────────────────────────────────────────────
        ['Challenge', 'GET',  '/challenges',                         'v4', 'List challenges (paginated)', 'page, per_page, retired'],
        ['Challenge', 'GET',  '/challenge/info/{id_or_slug}',        'v4', 'Challenge details', 'id_or_slug'],
        ['Challenge', 'GET',  '/challenge/categories/list',          'v4', 'Challenge categories', '—'],
        ['Challenge', 'POST', '/challenge/own',                      'v4', 'Submit challenge flag', 'challenge_id, flag, difficulty'],
        ['Challenge', 'POST', '/container/start',                    'v4', 'Start challenge container', 'containerable_id'],
        ['Challenge', 'POST', '/container/stop',                     'v4', 'Stop challenge container', 'containerable_id'],
        ['Challenge', 'GET',  '/challenge/download/{id}',            'v4', 'Download challenge files', 'id'],
        ['Challenge', 'GET',  '/challenges/{id}/download_link',      'v4', 'Challenge download link', 'id'],

        // ── 7. Sherlocks (DFIR) ───────────────────────────────────────────
        ['Sherlock', 'GET',  '/sherlocks',                                    'v4', 'List Sherlocks', 'page, per_page'],
        ['Sherlock', 'GET',  '/sherlocks/{id}/info',                          'v4', 'Sherlock details', 'id'],
        ['Sherlock', 'GET',  '/sherlocks/{id}/tasks',                         'v4', 'Sherlock tasks', 'id'],
        ['Sherlock', 'GET',  '/sherlocks/{id}/progress',                      'v4', 'Sherlock progress', 'id'],
        ['Sherlock', 'GET',  '/sherlocks/{id}/play',                          'v4', 'Sherlock play info', 'id'],
        ['Sherlock', 'GET',  '/sherlocks/{id}/download_link',                 'v4', 'Sherlock evidence download', 'id'],
        ['Sherlock', 'POST', '/sherlocks/{id}/tasks/{taskId}/flag',           'v4', 'Submit Sherlock task answer', 'id, taskId, flag'],
        ['Sherlock', 'POST', '/challenge/start/vm/{id}',                      'v4', 'Start Sherlock VM', 'id'],
        ['Sherlock', 'POST', '/challenge/reset/vm/{id}',                      'v4', 'Reset Sherlock VM', 'id'],

        // ── 8. Fortresses ─────────────────────────────────────────────────
        ['Fortress', 'GET',  '/fortresses',                    'v4', 'List Fortresses', '—'],
        ['Fortress', 'GET',  '/fortress/{id}',                 'v4', 'Fortress details', 'id'],
        ['Fortress', 'GET',  '/fortress/{id}/flags',           'v4', 'Fortress flags', 'id'],
        ['Fortress', 'POST', '/fortress/{id}/flag',            'v4', 'Submit Fortress flag', 'id, flag'],
        ['Fortress', 'POST', '/fortress/{id}/reset',           'v4', 'Reset Fortress', 'id'],

        // ── 9. Pro Labs ───────────────────────────────────────────────────
        ['ProLab', 'GET',  '/prolabs',                         'v4', 'List Pro Labs', '—'],
        ['ProLab', 'GET',  '/prolab/{id}/overview',            'v4', 'Pro Lab overview', 'id'],
        ['ProLab', 'GET',  '/prolab/{id}/machines',            'v4', 'Pro Lab machines', 'id'],
        ['ProLab', 'GET',  '/prolab/{id}/flags',               'v4', 'Pro Lab flags', 'id'],
        ['ProLab', 'POST', '/prolab/{id}/flag',                'v4', 'Submit Pro Lab flag', 'id, flag'],

        // ── 10. Starting Point ────────────────────────────────────────────
        ['StartingPoint', 'GET',  '/sp/tiers/progress',        'v4', 'SP tier progress', '—'],
        ['StartingPoint', 'GET',  '/sp/tier/{id}',             'v4', 'SP tier details', 'id'],
        ['StartingPoint', 'POST', '/machines/{id}/tasks/{taskId}/flag', 'v4', 'Submit SP task flag', 'id, taskId, flag'],

        // ── 11. Seasons ───────────────────────────────────────────────────
        ['Season', 'GET',  '/season/list',                                   'v4', 'List seasons', '—'],
        ['Season', 'GET',  '/season/machine/active',                         'v4', 'Active season machine', '—'],
        ['Season', 'GET',  '/season/machines/{id}',                          'v4', 'Season machines', 'id'],
        ['Season', 'GET',  '/season/rewards/{id}',                           'v4', 'Season rewards', 'id'],
        ['Season', 'GET',  '/season/user/rank/{id}',                         'v4', 'User season rank', 'id'],
        ['Season', 'GET',  '/season/user/{id}/ranks',                        'v4', 'User season ranks', 'id'],
        ['Season', 'GET',  '/season/{players|teams}/leaderboard',            'v4', 'Season leaderboard', 'type'],
        ['Season', 'GET',  '/season/{players|teams}/leaderboard/top/{id}',   'v4', 'Top leaderboard', 'type, id'],

        // ── 12. VPN & Connections ─────────────────────────────────────────
        ['VPN', 'GET',  '/connections/servers',                        'v4', 'VPN servers', 'product'],
        ['VPN', 'GET',  '/connections/status',                         'v4', 'VPN status', '—'],
        ['VPN', 'GET',  '/user/connection/status',                     'v4', 'User connection status', '—'],
        ['VPN', 'POST', '/connections/servers/switch/{vpnId}',         'v4', 'Switch VPN server', 'vpnId'],
        ['VPN', 'GET',  '/access/ovpnfile/{vpnId}/0',                  'v4', 'Download OVPN', 'vpnId'],
        ['VPN', 'GET',  '/access/ovpnfile/{vpnId}/0/1',                'v4', 'Download OVPN (alt)', 'vpnId'],

        // ── 13. Pwnbox ────────────────────────────────────────────────────
        ['Pwnbox', 'GET',  '/pwnbox/status',                   'v4', 'Pwnbox status', '—'],
        ['Pwnbox', 'POST', '/pwnbox/terminate',                'v4', 'Terminate Pwnbox', '—'],

        // ── 14. Search ────────────────────────────────────────────────────
        ['Search', 'GET', '/search/fetch',                     'v4', 'Global search', 'query, type']
    ];

    // ── Build Full URLs ───────────────────────────────────────────────────
    function fullUrl(baseKey, path) {
        const base = BASES[baseKey] || BASES.v4;
        return base + (path.startsWith('/') ? path : '/' + path);
    }

    // ── Group by Category ─────────────────────────────────────────────────
    function groupByCategory() {
        const groups = {};
        ENDPOINTS.forEach(ep => {
            const [cat, method, path, baseKey, desc, params] = ep;
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push({ method, path, baseKey, desc, params });
        });
        return groups;
    }

    // ── Print ─────────────────────────────────────────────────────────────
    function print() {
        const groups = groupByCategory();

        console.log('%c╔══════════════════════════════════════════════════════════════╗', 'color:#9fef00; font-weight:bold;');
        console.log('%c║       HTB ENDPOINT MAPPER — COMPLETE API COVERAGE          ║', 'color:#9fef00; font-weight:bold;');
        console.log('%c╚══════════════════════════════════════════════════════════════╝', 'color:#9fef00; font-weight:bold;');
        console.log('');
        console.log('%cBase URLs:', 'font-weight:bold;');
        Object.entries(BASES).forEach(([k, v]) => console.log(`  ${k.padEnd(8)} → ${v}`));
        console.log('');
        console.log(`%cTotal endpoints mapped: ${ENDPOINTS.length}`, 'color:#9fef00; font-weight:bold;');
        console.log('');

        Object.entries(groups).forEach(([cat, eps]) => {
            console.log(`%c▸ ${cat} (${eps.length})`, 'color:#ffa500; font-weight:bold; font-size:13px;');
            console.table(eps.map(e => ({
                Method: e.method,
                'Full URL': fullUrl(e.baseKey, e.path),
                Description: e.desc,
                Params: e.params
            })));
        });

        // ── Quick Reference ───────────────────────────────────────────────
        console.log('%c══════════════════ QUICK REFERENCE ══════════════════', 'color:#9fef00; font-weight:bold;');
        const lines = ENDPOINTS.map(ep => {
            const [cat, method, path, baseKey] = ep;
            return `${method.padEnd(5)} ${fullUrl(baseKey, path)}  [${cat}]`;
        });
        console.log(lines.join('\n'));
    }

    // ── Execute ───────────────────────────────────────────────────────────
    print();

    // ── Return for programmatic use ───────────────────────────────────────
    return {
        bases: BASES,
        total: ENDPOINTS.length,
        endpoints: ENDPOINTS.map(ep => ({
            category: ep[0],
            method:   ep[1],
            url:      fullUrl(ep[3], ep[2]),
            description: ep[4],
            params:   ep[5]
        }))
    };
})();
