import Cookie from 'universal-cookie'

const cookies = new Cookie()

class CookieService {
  // ** Get
  get(name) {
    return cookies.get(name)
  }

  // ** Set
  set(name,value,options) {
    return cookies.set(name, value, options)
  }

  // ** Remove
  remove(name, options) {
    return cookies.remove(name, options)
  }
}

export default new CookieService()

  
