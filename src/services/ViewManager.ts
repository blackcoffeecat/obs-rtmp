import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  WebContents,
} from 'electron'

export type Views = 'main' | ''
export type AppViewConfig = {
  url: string
  config?: BrowserWindowConstructorOptions
  onCreate?(view: BrowserWindow): void
  onReady?(webContents: WebContents, view: BrowserWindow): void
}
const views: Record<string, AppViewConfig> = {}

class ViewManager {
  static openView(name: Views) {
    const {url, config, onCreate, onReady} = views[name]
    const view = new BrowserWindow(config)
    onCreate?.(view)
    view.loadURL(url).then(() => onReady?.(view.webContents, view))
    return view
  }

  static registerView(name: Views, conf: AppViewConfig) {
    views[name] = conf
  }
}

export default ViewManager
