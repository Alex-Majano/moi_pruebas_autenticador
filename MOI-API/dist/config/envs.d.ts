import 'dotenv/config';
export declare const envs: {
    port: any;
    postgres: {
        dbHost: any;
        dbName: any;
        dbPort: any;
        dbUser: any;
        dbPassword: any;
    };
    jwtSecret: any;
    jwtExpiration: any;
    jwtRefreshExpiration: any;
    jwtUseRefreshToken: any;
    smtpHost: any;
    smtpUser: any;
    smtpPass: any;
    smtpPort: any;
    emailFrom: any;
    maxAttempsRecoverPasswordEmail: any;
    emailRecoverPasswordTime: any;
    urlApplicationFront: any;
    nodeEnv: any;
    storageDriver: any;
    aws: {
        s3Bucket: any;
        region: any;
        accessKeyId: any;
        secretAccessKey: any;
    };
};
