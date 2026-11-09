import { describe, expect, it } from 'vitest'
import { resolveDesktopLaunchEnvironment } from '../src/launch-environment.ts'

describe('packaged Desktop home', () => {
  it('uses its application data directory instead of the official shared home', () => {
    const environment = { PATH: '/tools' }
    expect(resolveDesktopLaunchEnvironment(environment, '/application/data', true)).toEqual({
      PATH: '/tools', DSH_HOME: '/application/data-harness',
    })
    expect(environment).toEqual({ PATH: '/tools' })
  })
  it.each(['', '  '])('does not interpret a blank explicit home as the current directory (%j)', DSH_HOME => {
    expect(resolveDesktopLaunchEnvironment({ DSH_HOME }, '/application/data', true).DSH_HOME)
      .toBe('/application/data-harness')
  })
  it('preserves an explicitly selected home and source-development defaults', () => {
    expect(resolveDesktopLaunchEnvironment({ DSH_HOME: '/chosen/home' }, '/application/data', true).DSH_HOME).toBe('/chosen/home')
    expect(resolveDesktopLaunchEnvironment({ PATH: '/tools' }, '/application/data', false)).toEqual({ PATH: '/tools' })
  })
})
