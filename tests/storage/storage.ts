import { ExampleStorage } from "../../API/example"
import { accounts } from "../utils/cli"

const storage: ExampleStorage = {
  owner: accounts.alice.pkh,
  foo: 0
}


export default storage;