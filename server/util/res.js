const err = (code, message) => {
  return JSON.stringify({
      em: message,
      ec: code,
      result: null
  })
}

const succ = (result, message = 'ok') => {
  return JSON.stringify({
      ec: 200,
      em: message,
      result: result
  })
}
module.exports = {
  err,
  succ
}
