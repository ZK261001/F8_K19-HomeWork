import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Job Portal API')
  .setDescription(
    'API cho hệ thống tuyển dụng: quản lý ứng viên, CV, công ty, tin tuyển dụng, đơn ứng tuyển và danh mục địa giới hành chính (tỉnh/thành, phường/xã).',
  )
  .setVersion('1.0')
  .addTag('Candidate', 'Quản lý ứng viên')
  .addTag('CV', 'Quản lý CV của ứng viên')
  .addTag('Company', 'Quản lý công ty / nhà tuyển dụng')
  .addTag('Company Address', 'Địa chỉ văn phòng của công ty')
  .addTag('Job', 'Tin tuyển dụng')
  .addTag('Job Application', 'Đơn ứng tuyển của ứng viên vào tin tuyển dụng')
  .addTag('Province', 'Danh mục tỉnh/thành phố')
  .addTag('Ward', 'Danh mục phường/xã')
  .build();
