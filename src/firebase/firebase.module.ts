import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const adminConfig: ServiceAccount = {
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
          privateKey: configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        };

        return {
          credential: admin.credential.cert(adminConfig),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class FirebaseModule {}
