// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add better-auth resolver configuration
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'better-auth') {
    return context.resolveRequest(
      context,
      'better-auth/react',
      platform,
    );
  }
  
  // Ensure default behavior for other modules
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

