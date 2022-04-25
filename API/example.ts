import { TezosAddress } from "../utils/helpers"
import BigNumber from "bignumber.js";

export declare type ExampleStorage = {
  owner: TezosAddress,
  foo: BigNumber.Value,
}