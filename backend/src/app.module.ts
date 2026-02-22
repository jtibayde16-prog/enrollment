import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollegesModule } from './colleges/colleges.module';
import { ProgramsModule } from './programs/programs.module';
import { ApplicationsModule } from './applications/applications.module';
import { UsersModule } from './users/users.module';
import { DbInitService } from './db-init.service';
import { College } from './colleges/entities/college.entity';
import { Program } from './programs/entities/program.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host:
          configService.get<string>('DB_HOST') ||
          configService.get<string>('MYSQLHOST'),
        port:
          configService.get<number>('DB_PORT') ||
          configService.get<number>('MYSQLPORT') ||
          3306,
        username:
          configService.get<string>('DB_USERNAME') ||
          configService.get<string>('MYSQLUSER'),
        password:
          configService.get<string>('DB_PASSWORD') ||
          configService.get<string>('MYSQLPASSWORD'),
        database:
          configService.get<string>('DB_DATABASE') ||
          configService.get<string>('MYSQLDATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([College, Program]),
    CollegesModule,
    ProgramsModule,
    ApplicationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbInitService],
})
export class AppModule {}
