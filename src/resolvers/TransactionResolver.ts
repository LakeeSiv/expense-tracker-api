import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { Transaction } from "../entity/Transaction";

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  getAll() {
    return Transaction.find();
  }
  @Query(() => [Transaction])
  getAllByHash(@Arg("userHash", () => String) userHash: string) {
    return Transaction.find({
      where: {
        userHash,
      },
    });
  }
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("name", () => String) name: string,
    @Arg("price", () => Float) price: number,
    @Arg("date", () => Date) date: Date,
    @Arg("userHash", () => String) userHash: string
  ) {
    console.log(name, price, date, userHash);
    const transaction = await Transaction.create({
      name,
      price,
      date,
      userHash,
    }).save();
    return transaction;
  }
}
