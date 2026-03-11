import vueDevTools from 'vite-plugin-vue-devtools'

export function setupDevtoolsPlugin(viteEnv: Env.ImportMeta) {
  const { VITE_DEVTOOLS_LAUNCH_EDITOR } = viteEnv

  return vueDevTools({
    // https://devtools.vuejs.org/guide/vite-plugin#options
    launchEditor: VITE_DEVTOOLS_LAUNCH_EDITOR,
  })
}
