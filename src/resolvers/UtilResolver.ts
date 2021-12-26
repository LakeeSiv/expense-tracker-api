import { hash } from "../utils/Hash";
import { googleAuth } from "../utils/Auth";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";

@Resolver()
export class UtilResolver {
  @Query(() => String)
  getHash(@Arg("input", () => String) input: string) {
    return hash(input);
  }
  @Query(() => String)
  async testAuth(
    @Arg("input", () => String) input: string,
    @Ctx() ctx: MyContext
  ) {
    const auth = await googleAuth(ctx.googleClient, input);
    console.log(auth);
    return hash(input);
  }
}
