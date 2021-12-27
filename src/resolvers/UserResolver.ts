import { Arg, Mutation, Resolver } from "type-graphql";
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

    return user;
  }
  @Mutation(() => Boolean)
  async addCategory(
    @Arg("userHash", () => String) userHash: string,
    @Arg("category", () => String) category: string
  ) {
    let user = await User.findOne({
      where: {
        userHash,
      },
    });
    if (!user) {
      return false;
    }
    user.categories = [...user.categories, category];
    await User.save(user);

    return true;
  }
  @Mutation(() => Boolean)
  async removeCategory(
    @Arg("userHash", () => String) userHash: string,
    @Arg("category", () => String) category: string
  ) {
    let user = await User.findOne({
      where: {
        userHash,
      },
    });
    if (!user) {
      return false;
    }
    user.categories = user.categories.filter((cat) => cat !== category);
    await User.save(user);

    return true;
  }
}
