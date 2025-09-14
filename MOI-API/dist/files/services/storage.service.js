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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = require("path");
const fs = require("fs");
const sharp_1 = require("sharp");
const uuid_1 = require("uuid");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const envs_1 = require("../../config/envs");
let StorageService = class StorageService {
    constructor() {
        this.createDirectoryRecursively = (directoryPath) => {
            const parts = directoryPath.split(path_1.default.sep);
            let currentPath = '';
            for (const part of parts) {
                currentPath = path_1.default.join(currentPath, part);
                if (!fs.existsSync(currentPath)) {
                    fs.mkdirSync(currentPath, { recursive: true });
                }
            }
        };
        if (envs_1.envs.storageDriver === 's3') {
            this.clientS3 = new client_s3_1.S3Client({
                region: envs_1.envs.aws.region,
                credentials: {
                    accessKeyId: envs_1.envs.aws.accessKeyId,
                    secretAccessKey: envs_1.envs.aws.secretAccessKey,
                },
                forcePathStyle: true,
            });
        }
    }
    async uploadFile(file, folder) {
        try {
            if (envs_1.envs.storageDriver === 's3') {
                const key = `${folder ? folder : ''}/${(0, uuid_1.v4)()}-${file.originalname}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: envs_1.envs.aws.s3Bucket,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    Metadata: {
                        originalName: file.filename,
                    },
                });
                await this.clientS3.send(command);
                const { url } = await this.getFileUrlS3(key);
                return url;
            }
            else {
                const originalName = path_1.default
                    .parse(file.originalname)
                    .name.replace(/\s+/g, '');
                const filename = `${(0, uuid_1.v4)()}-${originalName}.${path_1.default.extname(file.originalname)}`;
                this.createDirectoryRecursively(folder);
                const filePath = path_1.default.join(folder, filename);
                await (0, sharp_1.default)(file.buffer).toFile(filePath);
                return filePath;
            }
        }
        catch (error) {
            throw new common_1.ConflictException({ message: error.message });
        }
    }
    async deleteFile(filePath) {
        try {
            if (envs_1.envs.storageDriver === 's3') {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: envs_1.envs.aws.s3Bucket,
                    Key: filePath,
                });
                await this.clientS3.send(command);
            }
        }
        catch (error) {
            throw new common_1.ConflictException(error);
        }
    }
    async getFileUrlS3(key) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: envs_1.envs.aws.s3Bucket,
                Key: key,
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.clientS3, command, {
                expiresIn: 60 * 60 * 24,
            });
            return { url };
        }
        catch (error) {
            throw new common_1.ConflictException(error);
        }
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);
//# sourceMappingURL=storage.service.js.map