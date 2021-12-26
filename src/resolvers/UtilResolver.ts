import { hash } from "../utils/Hash";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UtilResolver {
  @Query(() => String)
  getHash(@Arg("input", () => String) input: string) {
    return hash(input);
  }
}
