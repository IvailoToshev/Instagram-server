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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = exports.MessageInput = void 0;
const Message_1 = require("../entities/Message");
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let MessageInput = class MessageInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MessageInput.prototype, "body", void 0);
MessageInput = __decorate([
    type_graphql_1.InputType()
], MessageInput);
exports.MessageInput = MessageInput;
let MessageResolver = class MessageResolver {
    createMessage(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Message_1.Message.create(Object.assign(Object.assign({}, input), { creatorId: req.session.userId })).save();
        });
    }
    updateMessage(id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.Message.findOne(id);
            if (message) {
                yield Message_1.Message.update(id, {
                    body: input.body
                });
            }
            return message;
        });
    }
    deleteMessage(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Message_1.Message.delete({ id, creatorId: req.session.userId });
            return true;
        });
    }
    likeMessage(messageId, value, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLiked = value !== null;
            const realValue = isLiked ? 1 : null;
            const userId = req.session.userId;
            typeorm_1.getConnection().query(`
   START TRANSACTION;

   insert into likes("userId", "messageId","value")
   values(${userId},${messageId},${realValue})

   update message
   set messageLikes = messageLikes + ${realValue}
   where id = ${messageId}

   COMMIT;
  `);
            yield Message_1.Message.update({
                id: messageId,
            }, {});
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Message_1.Message, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MessageInput, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    type_graphql_1.Mutation(() => Message_1.Message, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, MessageInput]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('messageId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('value', () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "likeMessage", null);
MessageResolver = __decorate([
    type_graphql_1.Resolver(Message_1.Message)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=messages.js.map