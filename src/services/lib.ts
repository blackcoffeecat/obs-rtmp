import * as fs from 'fs'
import * as os from 'os'
import path from 'path'

export const homdir = os.homedir()

const getChromeExtensionPath = () => {
  switch (os.platform()) {
    case 'darwin':
      return path.join(
        homdir,
        '/Library/Application Support/Google/Chrome/Default/Extensions/',
      )
    case 'win32':
      return path.join(
        homdir,
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions',
      )

    default:
      return path.join(homdir, '/.config/google-chrome/Default/extensions')
  }
}

export const getExtensionPath = (extensionId: string) => {
  const dir = path.join(getChromeExtensionPath(), extensionId)
  const version = fs.readdirSync(dir)[0]
  return path.join(dir, version)
}
