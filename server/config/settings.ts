const {
    LOADER_ENABLED,
    LOADER_ENFORCEWHITELIST,
    WHITELIST_PROTOCOLS,
    WHITELIST_HOSTS,
    RATELIMITER_ENABLED,
    RATELIMITER_IP_HITS_PER_MINUTES,
    RATELIMITER_MINUTES,
 } = process.env;

const converToArray = (setting) => {
    if (setting === undefined) { return undefined; }
    return setting.split(',');
};
    
export default {
    loader: {
        enabled: LOADER_ENABLED || true,
        enforce_whitelist: LOADER_ENFORCEWHITELIST || true
    },
    rateLimiter: {
        enabled: RATELIMITER_ENABLED || true,
        ip_hits_per_minutes: RATELIMITER_IP_HITS_PER_MINUTES || 100,
        minutes: RATELIMITER_MINUTES || 10
    },
    whitelist: {
        protocols: converToArray(WHITELIST_PROTOCOLS) || [
            "https"
        ],
        hosts: converToArray(WHITELIST_HOSTS) || [
            "pastebin.com", 
            "bucket.artillery.io", 
            "**.blob.core.windows.net", 
            "**.s3-**.amazonaws.com"
        ]
    }
};
    