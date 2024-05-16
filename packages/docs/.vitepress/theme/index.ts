import DefaultTheme from "vitepress/theme";
import "vitepress-theme-demoblock/dist/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import type { EnhanceAppContext } from "vitepress";

import { Button } from "@yuwen/ui";

export default {
  ...DefaultTheme,
  enhanceApp(etx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(etx);
    etx.app.component(Button.name as string, Button);
    etx.app.component("Demo", Demo);
    etx.app.component("DemoBlock", DemoBlock);
  },
};
