import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {
  candidate: Candidate[] = [];
  private nextId = 1;

  create(createCandidateDto: CreateCandidateDto) {
    const newCandidate: Candidate = {
      ...createCandidateDto,
      id: this.nextId++,
    };
    this.candidate.push(newCandidate);
    return newCandidate;
  }

  findAll() {
    return this.candidate;
  }

  findOne(id: number) {
    const candidate = this.candidate.find((c) => c.id === id);
    if (!candidate) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    return candidate;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const index = this.candidate.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    this.candidate[index] = {
      ...this.candidate[index],
      ...updateCandidateDto,
      id,
    };
    return this.candidate[index];
  }

  remove(id: number) {
    const index = this.candidate.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    const [removed] = this.candidate.splice(index, 1);
    return removed;
  }
}
