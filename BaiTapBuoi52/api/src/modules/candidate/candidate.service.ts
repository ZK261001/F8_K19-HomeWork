import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find({ where: { active: true } });
  }

  async findOne(id: number) {
    const candidate = await this.candidateRepository.findOneBy({
      id: Number(`${id}`),
      active: true,
    });
    if (!candidate) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    return candidate;
  }

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const candidate = this.candidateRepository.create({
      ...createCandidateDto,
      active: true,
    });
    return await this.candidateRepository.save(candidate);
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const candidate = await this.findOne(id);
    this.candidateRepository.merge(candidate, updateCandidateDto);
    return this.candidateRepository.save(candidate);
  }

  async remove(id: number) {
    return await this.candidateRepository.update(id, { active: false });
  }
}
