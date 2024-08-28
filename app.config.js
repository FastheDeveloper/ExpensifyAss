export default ({ config }) => ({
  ...config,
  name: 'ExpensiFas',
  slug: 'ExpensiFas',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
