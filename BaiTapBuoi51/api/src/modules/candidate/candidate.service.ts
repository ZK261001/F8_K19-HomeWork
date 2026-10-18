import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {
  private candidate: Candidate[] = [];
  private nextId = 1;

  create(createCandidateDto: CreateCandidateDto) {
    const newCandidate: Candidate = {
      ...createCandidateDto,
      id: this.nextId++,
      active: true,
    };
    this.candidate.push(newCandidate);
    return newCandidate;
  }

  findAll() {
    return this.candidate.filter((c) => c.active);
  }

  findOne(id: number) {
    const candidate = this.candidate.find((c) => c.id === id && c.active);
    if (!candidate) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    return candidate;
  }

  // Chỉ ghi đè các field được gửi lên, các field còn lại giữ nguyên
  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const index = this.candidate.findIndex((c) => c.id === id && c.active);
    if (index === -1) {
      throw new NotFoundException(`Candidate #${id} not found`);
    }
    this.candidate[index] = { ...this.candidate[index], ...updateCandidateDto };
    return this.candidate[index];
  }

  // Soft delete
  remove(id: number) {
    const candidate = this.findOne(id);
    candidate.active = false;
    return candidate;
  }
}
