import { ChatRoom } from "src/chatroom/chatroom.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['email'])
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    universe: string;

    @Column({ nullable: true })
    character: string;

    @OneToMany(() => ChatRoom, chatRoom => chatRoom.owner, { eager: true })
    chatRooms: ChatRoom[];

}