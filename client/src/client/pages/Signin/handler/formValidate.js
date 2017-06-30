const validates = {
  credential: 'required',
  password: 'required',
}

export default (name) => {
  return validates[name]
}