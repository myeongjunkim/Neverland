import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "src/account/account.entity";

@Entity()
export class ChatRoom extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomName: string;

    @Column({ nullable: true })
    hashTag: string;
    
    @ManyToOne(() => Account, account => account.chatRooms, { eager: false })
    owner: Account;
    
    @Column()
    chatRoomType: string; // openchat, pickchat
    
    @Column()
    createdAt: Date;
}


@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    chatRoomId: number;

    @Column()
    createdAt: Date;
}