/**
 * HTB Endpoint Mapper
 * Parses the provided source code to extract and document API endpoints.
 * Base URLs are inferred from common HTB API patterns.
 */
(function() {
    // The base URL for user-related endpoints (most endpoints in this file).
    // Based on community documentation, the v4 API base is labs.hackthebox.com/api/v4.
    const USER_API_BASE = 'https://labs.hackthebox.com/api/v4';

    // The profile API paths start with `/user/profile`, so the root for these is also the user API base.
    const PROFILE_API_BASE = USER_API_BASE;

    // Define the endpoints based on the exported functions and their inferred HTTP methods.
    // The variable names from the source (e.g., `r`, `i`, `a`) are mapped to meaningful operation names.
    const endpoints = [
        // User Data & Submissions
        { op: 'getUserTracks', method: 'GET', path: '/user/tracks', func: 'r', desc: 'Fetch user tracks' },
        { op: 'getUserMachineSubmissions', method: 'GET', path: '/user/submissions/machines', func: 'i', desc: 'Get user machine submissions' },
        { op: 'getUserChallengeSubmissions', method: 'GET', path: '/user/submissions/challenges', func: 'a', desc: 'Get user challenge submissions' },

        // Voucher Management
        { op: 'checkVoucher', method: 'POST', path: '/user/voucher/check', func: 'o', desc: 'Check voucher validity' },
        { op: 'redeemVoucher', method: 'POST', path: '/user/voucher/redeem', func: 's', desc: 'Redeem a voucher' },

        // User Settings
        { op: 'getUserSettings', method: 'GET', path: '/user/settings', func: 'c', desc: 'Get user settings' },
        { op: 'toggleUserSetting', method: 'POST', path: '/user/edit/toggle', func: 'l', desc: 'Toggle a user setting' },

        // App Tokens (Highly relevant to your previous queries)
        { op: 'listAppTokens', method: 'GET', path: '/user/apptoken/list', func: 'u', desc: 'List all App Tokens' },
        { op: 'createAppToken', method: 'POST', path: '/user/apptoken/create', func: 'd', desc: 'Create a new App Token' },
        { op: 'deleteAppToken', method: 'POST', path: '/user/apptoken/delete', func: 'f', desc: 'Delete an App Token' },

        // Subscriptions
        { op: 'getRecentSubscriptionUpdate', method: 'GET', path: '/user/subscriptions/status/updated/recently', func: 'p', desc: 'Get recent subscription status update' },
        { op: 'getSubscriptionThankYou', method: 'GET', path: '/user/subscriptions/thankyou', func: 'm', desc: 'Get subscription thank you page' },

        // Achievements & Reviews
        { op: 'getAchievement', method: 'GET', path: '/user/achievement/{type}/{id}/{slug}', func: 'h', desc: 'Get achievement details' },
        { op: 'postUserAction', method: 'POST', path: '/user/{action}/{id}', func: 'g', desc: 'Perform a user action (generic)' },
        { op: 'postUserActionAlt', method: 'POST', path: '/user/{action}/{id}', func: '_', desc: 'Perform a user action (alternate)' },
        { op: 'getUserReview', method: 'GET', path: '/user/review/{type}/{id}', func: 'v', desc: 'Get a user review' },

        // Profile Data (using the /user/profile base)
        { op: 'getBasicProfile', method: 'GET', path: '/user/profile/basic/{id}', func: 'y', desc: 'Get basic user profile by ID' },
        { op: 'getProfileBadges', method: 'GET', path: '/user/profile/badges/{id}', func: 'b', desc: 'Get user badges' },
        { op: 'getPublicProfileBadges', method: 'GET', path: '/profile/badges/{id}', func: 'x', desc: 'Get public profile badges' },
        { op: 'getPublicProfile', method: 'GET', path: '/profile/{id}', func: 'S', desc: 'Get public user profile' },
        { op: 'getProfileActivity', method: 'GET', path: '/user/profile/activity/{id}', func: 'C', desc: 'Get user profile activity' },

        // Progress Tracking
        { op: 'getMachineProgress', method: 'GET', path: '/user/profile/progress/machines/{id}', func: 'w', desc: 'Get user machine progress' },
        { op: 'getPublicMachineProgress', method: 'GET', path: '/profile/progress/machines/{id}', func: 'T', desc: 'Get public machine progress' },
        { op: 'getChallengeProgress', method: 'GET', path: '/user/profile/progress/challenges/{id}', func: 'E', desc: 'Get user challenge progress' },
        { op: 'getPublicChallengeProgress', method: 'GET', path: '/profile/progress/challenges/{id}', func: 'D', desc: 'Get public challenge progress' },
        { op: 'getSherlockProgress', method: 'GET', path: '/user/profile/progress/sherlocks/{id}', func: 'O', desc: 'Get user Sherlock progress' },
        { op: 'getPublicSherlockProgress', method: 'GET', path: '/profile/progress/sherlocks/{id}', func: 'k', desc: 'Get public Sherlock progress' },
        { op: 'getProlabProgress', method: 'GET', path: '/user/profile/progress/prolab/{id}', func: 'A', desc: 'Get user Pro Lab progress' },
        { op: 'getPublicProlabProgress', method: 'GET', path: '/profile/progress/prolab/{id}', func: 'j', desc: 'Get public Pro Lab progress' },
        { op: 'getFortressProgress', method: 'GET', path: '/user/profile/progress/fortress/{id}', func: 'M', desc: 'Get user Fortress progress' },
        { op: 'getPublicFortressProgress', method: 'GET', path: '/profile/progress/fortress/{id}', func: 'N', desc: 'Get public Fortress progress' },

        // Seasons & Content
        { op: 'getSeasonRanks', method: 'GET', path: '/season/user/{id}/ranks', func: 'P', desc: 'Get season user ranks' },
        { op: 'getProfileContent', method: 'GET', path: '/user/profile/content/{id}', func: 'F', desc: 'Get user profile content' },
        { op: 'getProfileContentCounts', method: 'GET', path: '/user/profile/content/{id}/counts', func: 'I', desc: 'Get user profile content counts' },

        // User Charts & Certificates
        { op: 'getUserProgressChart', method: 'GET', path: '/users/{id}/profile/progress/chart', func: 'L', desc: 'Get user progress chart data' },
        { op: 'getUserCertificates', method: 'GET', path: '/user/profile/certificates', func: 'R', desc: 'Get user certificates' }
    ];

    // Function to print the mapped endpoints in a clean table format.
    function printEndpointMap() {
        console.log(`%cHTB Endpoint Map (Base: ${USER_API_BASE})`, 'font-size: 16px; font-weight: bold; color: #9fef00;');
        console.log('--------------------------------------------------------------------------');
        console.table(
            endpoints.map(ep => ({
                Operation: ep.op,
                Method: ep.method,
                'Full URL': `${USER_API_BASE}${ep.path}`,
                Description: ep.desc,
                'Source Func': ep.func
            }))
        );

        // Provide a concise list for quick reference.
        const quickList = endpoints.map(ep => `${ep.method.padEnd(4)} ${ep.path}`).join('\n');
        console.log('%cQuick Reference (Paths):', 'font-weight: bold; margin-top: 10px;');
        console.log(quickList);
    }

    // Execute the mapper.
    printEndpointMap();

    // Return the data for programmatic use if needed.
    return { baseUrl: USER_API_BASE, endpoints: endpoints };
})();
