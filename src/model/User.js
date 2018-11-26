import { types } from 'mobx-state-tree'

const User = types.model({
  type: types.enumeration(["admin", "user"])
}).actions(self => ({
  setType (value) {
    self.type = value
  }
})).create({
  type: "user"
})

export default User