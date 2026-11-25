import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './entity';

// Shared CRUD for all modules. Subclasses just extend it and pass their repository to super().
export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  // Where clause that always adds active = true (skips soft-deleted rows)
  private activeWhere(extra: object = {}): FindOptionsWhere<T> {
    return { ...extra, active: true } as FindOptionsWhere<T>;
  }

  // Get all active records
  findAll(): Promise<T[]> {
    return this.repository.find({ where: this.activeWhere() });
  }

  // Get one record by id, throw 404 if missing
  async findOne(id: number): Promise<T> {
    const item = await this.repository.findOneBy(this.activeWhere({ id }));
    if (!item) {
      throw new NotFoundException(
        `${this.repository.metadata.name} #${id} not found`,
      );
    }
    return item;
  }

  // Create a new record, active = true by default
  create(dto: DeepPartial<T>): Promise<T> {
    return this.repository.save(
      this.repository.create({ ...dto, active: true } as DeepPartial<T>),
    );
  }

  // Update: find the record (404 if missing) then merge the new data in
  async update(id: number, dto: DeepPartial<T>): Promise<T> {
    const item = await this.findOne(id);
    this.repository.merge(item, dto);
    return this.repository.save(item);
  }

  // Soft delete: only sets active = false, the row stays in the DB
  async remove(id: number) {
    await this.findOne(id);
    // TS cannot infer the generic T type here, so cast through unknown
    return this.repository.update(id, {
      active: false,
    } as unknown as QueryDeepPartialEntity<T>);
  }
}
