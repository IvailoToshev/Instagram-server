"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Likes = void 0;
const typeorm_1 = require("typeorm");
const Message_1 = require("./Message");
const Post_1 = require("./Post");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let Likes = class Likes extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Likes.prototype, "value", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Likes.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.likes),
    __metadata("design:type", User_1.User)
], Likes.prototype, "user", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Likes.prototype, "postId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Post_1.Post, (post) => post.likes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Post_1.Post)
], Likes.prototype, "post", void 0);
__decorate([
    typeorm_1.OneToMany(() => Message_1.Message, (message) => message.likes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Message_1.Message)
], Likes.prototype, "message", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Comment_1.Comment, (comment) => comment.likes, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Likes.prototype, "comment", void 0);
Likes = __decorate([
    typeorm_1.Entity()
], Likes);
exports.Likes = Likes;
//# sourceMappingURL=Likes.js.map