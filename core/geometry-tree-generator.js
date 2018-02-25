const {cube, sphere} = require('@jscad/csg/api').primitives3d
const {union, difference, intersection} = require('@jscad/csg/api').booleanOps

const generate = (node) => {
  let result
  let operands
  if (Array.isArray(node)) {
    return node.map(n => generate(n))
  }
  switch (node.type) {
    case 'cube':
      result = cube(node)
      break
    case 'sphere':
      result = sphere(node)
      break
    case 'union' :
      operands = node.children.map(n => generate(n).geometry)
      result = union(operands)
      break
    case 'difference' :
      operands = node.children.map(n => generate(n).geometry)
      result = difference(operands)
      break
    case 'intersection' :
      operands = node.children.map(n => generate(n).geometry)
      result = intersection(operands)
      break
  }
  node.geometry = result
  return node
}

module.exports = generate
