import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
// import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: false
    }
  ],
  plugins: [
    external(),
    resolve({
      extensions: [".js", ".tsx"]
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "useState",
          "useEffect",
          "useRef"
        ],
        "node_modules/react-dom/index.js": ["render"]
      }
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    // uglify({ compress: { drop_console: true, drop_debugger: true } })
  ]
};
