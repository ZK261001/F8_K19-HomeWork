import { Injectable } from '@nestjs/common';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../Base/service';

@Injectable()
export class CandidateService extends BaseService<Candidate> {
  constructor(
    @InjectRepository(Candidate)
    repository: Repository<Candidate>,
  ) {
    super(repository);
  }
}
