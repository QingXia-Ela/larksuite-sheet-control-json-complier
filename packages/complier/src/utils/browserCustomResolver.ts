import * as esbuild from 'esbuild-wasm'
import Path from 'path'

// https://github.com/evanw/esbuild/issues/1952#issuecomment-1020006960
export default function customResolver(tree: Record<string, string>): esbuild.Plugin {

    const map = new Map(Object.entries(tree))

    return {

        name: 'example',

        setup: (build: esbuild.PluginBuild) => {

            build.onResolve({ filter: /.*/, }, (args: esbuild.OnResolveArgs) => {

                if (args.kind === 'entry-point') {

                    return { path: '/' + args.path }
                }

                if (args.kind === 'import-statement') {

                    const dirname = Path.dirname(args.importer)

                    const path = Path.join(dirname, args.path)

                    return { path }

                }

                throw Error('not resolvable')

            })

            build.onLoad({ filter: /.*/ }, (args: esbuild.OnLoadArgs) => {

                if (!map.has(args.path)) {

                    throw Error('not loadable')
                }
                const ext = Path.extname(args.path)

                const contents = map.get(args.path)!

                const loader = (ext === '.ts')  ? 'ts'  : 
                               (ext === '.tsx') ? 'tsx' :
                               (ext === '.js')  ? 'js'  :
                               (ext === '.jsx') ? 'jsx' :
                               'default'

                return { contents, loader }
            })
        }
    }
}