import { Field, Float, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column()
  price: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column("int")
  date: Date;

  @Field()
  @Column()
  userHash: string;
}
