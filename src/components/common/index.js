/* jshint esversion: 6 */
function changeStr (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('./', false, /\.vue$/)
// console.log(requireComponent.keys())
const install = (Vue) => {
  requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName)
    const componentName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    // console.log(componentName)
    Vue.component(componentName, config.default || config);
  });
}

export default {
  install
}
