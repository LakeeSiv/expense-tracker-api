import { hash } from "../utils/Hash";
import { googleAuth } from "../utils/Auth";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UtilResolver {
  @Query(() => String)
  getHash(@Arg("input", () => String) input: string) {
    return hash(input);
  }
  @Query(() => String)
  testAuth(@Arg("input", () => String) input: string) {
    return hash(input);
  }
}
