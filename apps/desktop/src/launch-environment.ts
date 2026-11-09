/** Resolve packaged Desktop data ownership before starting its Host. */
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'

/**
 * Keep packaged application data separate from other Harness installations by default.
 * @param environment - Parent environment, including an optional explicit DSH_HOME.
 * @param userData - Electron's application-specific user-data directory; the default home is a sibling retained on uninstall.
 * @param packaged - Whether this is an installed application rather than source development.
 * @returns A copy carrying the resolved home for packaged applications; development keeps its existing defaults.
 */
export function resolveDesktopLaunchEnvironment(
  environment: NodeJS.ProcessEnv, userData: string, packaged: boolean,
): NodeJS.ProcessEnv {
  if (!packaged) return { ...environment }
  const configured = environment.DSH_HOME?.trim() ? undefined : `${userData}-harness`
  return { ...environment, DSH_HOME: resolveDshHome(configured, environment) }
}
