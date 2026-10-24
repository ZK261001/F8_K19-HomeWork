import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { CandidateModule } from './modules/candidate/candidate.module';
import { ProvinceModule } from './modules/province/province.module';
import { WardModule } from './modules/ward/ward.module';
import { CompanyModule } from './modules/company/company.module';
import { CompanyAddressModule } from './modules/company_address/company_address.module';
import { CvModule } from './modules/cv/cv.module';
import { JobModule } from './modules/job/job.module';
import { JobApplicationModule } from './modules/job_application/job_application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'api',
    // }),
    CandidateModule,
    ProvinceModule,
    WardModule,
    CompanyModule,
    CompanyAddressModule,
    CvModule,
    JobModule,
    JobApplicationModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
