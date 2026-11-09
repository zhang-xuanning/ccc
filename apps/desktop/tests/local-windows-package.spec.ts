import { describe, expect, it } from 'vitest'
import { parseDesktopPackageInvocation } from '../scripts/package-target.ts'
import { localWindowsPackageEnvironment, validateDesktopPackageEnvironment } from '../scripts/desktop-package-environment.mjs'
import { createElectronBuilderConfig } from '../scripts/electron-builder-config.mjs'

const target = { platform: 'win32', arch: 'x64' } as const

describe('standalone unsigned Windows packaging', () => {
  it('requires explicit Windows and unsigned command selectors', () => {
    expect(parseDesktopPackageInvocation(['win-x64', '--unsigned', '--local'], 'win32', 'x64').localWindows).toBe(true)
    expect(() => parseDesktopPackageInvocation(['win-x64', '--local'], 'win32', 'x64')).toThrow('--local requires')
    expect(() => parseDesktopPackageInvocation(['mac-arm64', '--unsigned', '--local'], 'darwin', 'arm64')).toThrow('--local requires')
  })
  it('excludes release credentials and policy settings from a standalone build', () => {
    const environment = localWindowsPackageEnvironment({ PATH: '/tools', DSH_DESKTOP_WINDOWS_TOKEN_PIN: 'not-a-real-pin',
      DOWNLOAD_PROD_COS_SECRET_KEY: 'not-a-real-secret', DSH_DESKTOP_MANDATORY_UPDATE_PROD_ORIGIN: 'https://unused.example.com' })
    expect(environment.PATH).toBe('/tools')
    expect(environment.DSH_DESKTOP_WINDOWS_TOKEN_PIN).toBeUndefined()
    expect(environment.DOWNLOAD_PROD_COS_SECRET_KEY).toBeUndefined()
    expect(environment.DSH_DESKTOP_MANDATORY_UPDATE_PROD_ORIGIN).toBeUndefined()
    expect(() => validateDesktopPackageEnvironment(environment, target, { unsigned: true, localWindows: true })).not.toThrow()
    const config = createElectronBuilderConfig(environment, 'win32', 'x64')
    expect(config.appId).toBe('com.chaxin.intelligence')
    expect(config.extraMetadata.name).toBe('chaxin-intelligence')
    expect(config.extraMetadata).not.toHaveProperty('dshMandatoryUpdatePolicy')
    expect(config.publish).toBeNull()
    expect(config.win.forceCodeSigning).toBe(false)
  })
  it('rejects local-mode metadata in signed or mismatched packaging', () => {
    const environment = localWindowsPackageEnvironment({})
    expect(() => validateDesktopPackageEnvironment(environment, target, { unsigned: true })).toThrow('explicit unsigned Windows')
    expect(() => validateDesktopPackageEnvironment(environment, target, { localWindows: true })).toThrow('explicit unsigned Windows')
    expect(() => createElectronBuilderConfig({ ...environment, DSH_DESKTOP_UNSIGNED: '0' }, 'win32', 'x64')).toThrow('unsigned Windows')
    expect(() => createElectronBuilderConfig({ ...environment, DSH_DESKTOP_LOCAL_UNSIGNED: 'invalid' }, 'win32', 'x64')).toThrow('must be 0 or 1')
    expect(() => validateDesktopPackageEnvironment({ ...environment, DSH_DESKTOP_LOCAL_UNSIGNED: 'invalid' }, target, { unsigned: true, localWindows: true })).toThrow('must be 0 or 1')
  })
})
