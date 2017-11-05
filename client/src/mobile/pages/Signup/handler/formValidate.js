const validates = {
  mobile: 'required',
  password: 'required'
}

export default (name) => {
  return validates[name]
}