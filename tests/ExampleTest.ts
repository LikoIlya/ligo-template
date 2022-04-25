import { Tezos, signerAlice, signerBob } from "./utils/cli";
import config from "../config";
import exampleCode from "../build/example.json";
import { rejects, strictEqual, notStrictEqual }  from "assert";
import { confirmOperation } from "../utils/confirmation";

describe("Example test", async function () {
  let contract;

  beforeAll(async () => {
    try {
      Tezos.setSignerProvider(signerAlice);
      const storage = require("./storage/storage");

      const deployedContract = await Tezos.contract.originate({
        storage,
        code: exampleCode
      });
      await confirmOperation(Tezos, deployedContract.hash);
      contract = await Tezos.contract.at(deployedContract.contractAddress);

    } catch (e) {
      console.log(e);
    }
  });

  describe("Testing entrypoint: Example", async function () {
    it("Revert example", async function () {
      await rejects(contract.methods.example(2).send(), (err: Error) => {
        strictEqual(err.message, "Example");
        return true;
      });
    });
    it("Should allow example", async function () {
      const op = await contract.methods.example(1).send();
      await op.confirmation();
      const storage = await contract.storage()
      strictEqual(storage.foo.toNumber(), 42);
    });
  });
});
