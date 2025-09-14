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
exports.paginationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var enumDirectionOrder;
(function (enumDirectionOrder) {
    enumDirectionOrder["ASC"] = "ASC";
    enumDirectionOrder["DESC"] = "DESC";
})(enumDirectionOrder || (enumDirectionOrder = {}));
class paginationDto {
    constructor() {
        this.pagination = false;
        this.take = 10;
        this.page = 1;
        this.directionOrder = enumDirectionOrder.ASC;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { pagination: { required: true, type: () => Boolean, default: false }, take: { required: true, type: () => Number, default: 10, minimum: 1 }, page: { required: true, type: () => Number, default: 1, minimum: 1, minimum: 1 }, search: { required: false, type: () => String }, directionOrder: { required: true, default: enumDirectionOrder.ASC, enum: enumDirectionOrder }, orderField: { required: false, type: () => String } };
    }
}
exports.paginationDto = paginationDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        const value = obj[key];
        if (typeof value === 'string') {
            return obj[key] === 'true';
        }
        return value;
    }),
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    __metadata("design:type", Boolean)
], paginationDto.prototype, "pagination", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({ default: 10 }),
    __metadata("design:type", Number)
], paginationDto.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({ default: 1 }),
    __metadata("design:type", Number)
], paginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ default: '' }),
    __metadata("design:type", String)
], paginationDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enumDirectionOrder),
    (0, swagger_1.ApiPropertyOptional)({ default: enumDirectionOrder.ASC }),
    __metadata("design:type", String)
], paginationDto.prototype, "directionOrder", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ default: '' }),
    __metadata("design:type", String)
], paginationDto.prototype, "orderField", void 0);
//# sourceMappingURL=pagination.dto.js.map