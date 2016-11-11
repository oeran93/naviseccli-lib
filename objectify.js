module.exports = {
  common: function (string, keys) {
    string = string.split('\n')
    var possible_keys = '^(' + keys.join('|') + ')'
    var keys_reg = new RegExp(possible_keys)
    var possible_vals = '^(' + keys.join('|') + '):*(.*)'
    var vals_reg = new RegExp(possible_vals)
    var prev_key = ''
    var index = -1
    var objects = []
    string.forEach((line) => {
      var key = line.match(keys_reg)
      var val = line.match(vals_reg)
      if (key && val) {
        if (key[0] === prev_key || !prev_key) {
          objects[++index] = {}
          prev_key = key[0]
        }
        objects[index][key[0]] = val[2].trim()
      }
    })
    return objects
  },

  lun_numbers: function (string) {
    var luns = []
    var regex = /[0-9]+[^\r\n]\s+[0-9]+/g
    var lines = string.match(regex)
    if (!lines) return luns
    lines.forEach((line) => {
      regex = /[0-9]*$/
      luns.push(line.match(regex)[0])
    })
    return luns
  }

}
