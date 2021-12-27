import { hash } from "../utils/Hash";
import { googleAuth } from "../utils/Auth";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("userHash", () => String) userHash: string,
    @Arg("categories", () => [String]) categories: string[]
  ) {
    const user = await User.create({
      userHash,
      categories,
    }).save();
    console.log(user);
    return user;
  }
}
