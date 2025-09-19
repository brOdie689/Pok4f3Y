// 代码生成时间: 2025-09-19 08:21:01
// Import necessary modules
const fs = require('fs');
const path = require('path');

// Define the themes available
const themes = {
  light: 'light.css',
  dark: 'dark.css'
};

// Function to switch themes
/**
 * Switch the current theme to the specified theme.
 * @param {string} themeName - The name of the theme to switch to.
 * @returns {Promise<void>} - A promise resolving when the theme is switched.
 */
async function switchTheme(themeName) {
  // Check if the theme exists
  if (!themes[themeName]) {
    throw new Error(`Theme ${themeName} does not exist.`);
  }

  // Read the current theme file
  const currentThemePath = path.join(__dirname, 'currentTheme.css');
  try {
    await fs.promises.writeFile(currentThemePath, themes[themeName], 'utf8');
  } catch (error) {
    throw new Error(`Error switching theme: ${error.message}`);
  }

  console.log(`Theme switched to ${themeName}`);
}

// Export the switchTheme function for use in other modules
module.exports = {
  switchTheme
};