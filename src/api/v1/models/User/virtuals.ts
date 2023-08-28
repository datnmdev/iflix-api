import userSchema from './schema'

userSchema.virtual('fullName')
  .get(function() {
    return this.name.first + ' ' + this.name.last
  })
  .set(function(v: string) {
    this.name.first = v.substring(0, v.lastIndexOf(' '))
    this.name.last = v.substring(v.lastIndexOf(' '))
  })