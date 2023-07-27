import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { rootConfiguration } from 'config/configuration';
import { ModModule } from './mod/mod.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { FileModule } from './file';
import { PictureModule } from './picture';
import { AuthModule } from './auth';
import { SessionModule } from './session/session.module';
import { UserModule } from './user';
import { TaskModule } from './task';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rootConfiguration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.mongodb.url'),
      }),
      inject: [ConfigService],
    }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useFactory: (configService: ConfigService) => {
          const config = configService.get('minio')!;
          console.log('minio config: %o', config);
          return {
            ...config,
            s3ForcePathStyle: true,
          };
        },
        imports: [ConfigModule],
        inject: [ConfigService],
      },
      services: [S3],
    }),
    AuthModule,
    FileModule,
    ModModule,
    PictureModule,
    SessionModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
