import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  private cvs: Cv[] = [];
  private nextId: number = 1;
  create(createCvDto: CreateCvDto) {
    const newCv: Cv = {
      ...createCvDto,
      id: this.nextId++,
    };
    this.cvs.push(newCv);
    return newCv;
  }

  findAll() {
    return this.cvs;
  }

  findOne(id: number) {
    const cv = this.cvs.find((c) => c.id === id);
    if (!cv) {
      throw new NotFoundException(`CV #${id} not found`);
    }
    return cv;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    const index = this.cvs.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`CV #${id} not found`);
    }

    this.cvs[index] = {
      ...this.cvs[index],
      ...updateCvDto,
      id,
    };
    return this.cvs[index];
  }

  remove(id: number) {
    const index = this.cvs.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`CV #${id} not found`);
    }
    const [removed] = this.cvs.splice(index, 1);
    return removed;
  }
}
