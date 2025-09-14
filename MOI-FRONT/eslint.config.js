import vue from 'eslint-plugin-vue';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  // add `eslint-plugin-vue` flat config simply
  // if you would like use more another configuration,
  // see the section: https://eslint.vuejs.org/user-guide/#bundle-configurations-eslint-config-js
  ...vue.configs['flat/recommended'],

  // ...tailwind.configs["flat/recommended"],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      "vue/component-api-style": ["error",
        ["script-setup", "composition"] // "script-setup", "composition", "composition-vue2", or "options"
      ],
      'vue/order-in-components': [
        'error',
        {
          order: ['template', 'script', 'style']
        }
      ]
    },
    settings: {
      // tailwindcss: {
      //   // These are the default values but feel free to customize
      //   callees: ["clsx", "ctl"],
      //   config: "tailwind.config.js", // returned from `loadConfig()` utility if not provided
      //   cssFiles: [
      //     "**/*.css",
      //     "!**/node_modules",
      //     "!**/.*",
      //     "!**/dist",
      //     "!**/build",
      //   ],
      //   cssFilesRefreshRate: 5_000,
      //   removeDuplicates: true,
      //   skipClassAttribute: false,
      // },

    }
  }
];
