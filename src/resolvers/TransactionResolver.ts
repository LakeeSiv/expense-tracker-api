import { Arg, Float, ID, Mutation, Query, Resolver } from "type-graphql";
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
    @Arg("category", () => String) category: string,
    @Arg("date", () => Date) date: Date,
    @Arg("userHash", () => String) userHash: string
  ) {
    console.log(name, price, date, userHash);
    const transaction = await Transaction.create({
      name,
      price,
      category,
      date,
      userHash,
    }).save();
    return transaction;
  }
  @Mutation(() => Boolean)
  async editTransaction(
    @Arg("id", () => ID) id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("price", () => Float, { nullable: true }) price: number,
    @Arg("category", () => String, { nullable: true }) category: string,
    @Arg("date", () => Date, { nullable: true }) date: Date
  ) {
    const transaction = await Transaction.findOne({ id });
    if (!transaction) {
      return false;
    }
    transaction.name = name ? name : transaction.name;
    transaction.price = price ? price : transaction.price;
    transaction.category = category ? category : transaction.category;
    transaction.date = date ? date : transaction.date;

    Transaction.save(transaction);
    return true;
  }
  @Mutation(() => Boolean)
  async deleteTransaction(@Arg("id", () => ID) id: number) {
    Transaction.delete({ id });
    return true;
  }
}
