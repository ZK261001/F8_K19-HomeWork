import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './entity';

export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  findAll(): Promise<T[]> {
    return this.repository.find({
      where: { active: true } as FindOptionsWhere<T>,
    });
  }

  async findOne(id: number): Promise<T> {
    const item = await this.repository.findOneBy({
      id,
      active: true,
    } as FindOptionsWhere<T>);
    if (!item) {
      throw new NotFoundException(`#${id} not found`);
    }
    return item;
  }

  create(dto: DeepPartial<T>): Promise<T> {
    return this.repository.save(
      this.repository.create({ ...dto, active: true } as DeepPartial<T>),
    );
  }

  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const item = await this.findOne(id);
    this.repository.merge(item, dto);
    return this.repository.save(item);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.repository.update(id, { active: false } as any);
  }
}
