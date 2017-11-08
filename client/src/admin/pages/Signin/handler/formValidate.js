const validates = {
  credential: 'required',
  password: 'required',
  captcha: 'required'
}

export default (name) => {
  return validates[name]
}