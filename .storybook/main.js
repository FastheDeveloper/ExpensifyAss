/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  stories: [
    '../src/lib/components/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/lib/components/Button/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
}
