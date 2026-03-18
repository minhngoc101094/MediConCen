import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMapping } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

@Injectable()
export class UserService {
  private redis = new Redis(process.env.REDIS_HOST || 'localhost', 6379);

  constructor(
    @InjectRepository(UserMapping)
    private repo: Repository<UserMapping>,
  ) {}

  async getOrCreate(id1: string, id2: string) {
    // 1. Try cache first
    const [a, b] = [id1, id2].sort();
    const cacheKey = `user:${a}:${b}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) return { userId: cached };
    
    // 2. Check DB
    const existing = await this.repo.findOne({ where: { id1: a, id2: b } });
    if (existing) {
      await this.redis.set(cacheKey, existing.userId, 'EX', 3600);
      return { userId: existing.userId };
    }

    // 3. Create new (handle race condition)
    const userId = uuidv4();

    try {
      await this.repo.insert({ id1: a, id2: b, userId });
      await this.redis.set(cacheKey, userId, 'EX', 3600);
      return { userId };
    } catch (err) {
       // 4. If duplicate (another request inserted)
      const record = await this.repo.findOne({ where: { id1: a, id2: b } });
      return { userId: record.userId };
    }
  }
}
