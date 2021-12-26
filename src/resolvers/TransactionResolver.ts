import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { Transaction } from "../entity/Transaction";

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  getAll() {
    return Transaction.find();
  }
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("name", () => String) name: string,
    @Arg("price", () => Float) price: number,
    @Arg("date", () => Date) date: Date
  ) {
    const transaction = await Transaction.create({ name, price, date }).save();
    return transaction;
  }
}
