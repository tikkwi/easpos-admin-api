import { EXCEED_LIMIT_THRESHOLD, REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppConfigServiceMethods, UpdateThresholdDto } from '@common/dto/app_config.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ExceedLimitThreshold } from '@shared/exceed_limit/exceed_limit_threshold.schema';

@Injectable()
export class AppConfigService implements AppConfigServiceMethods {
  constructor(
    @Inject(REPOSITORY) private readonly repository: Repository<AppConfig>,
    @Inject(EXCEED_LIMIT_THRESHOLD)
    private readonly thresholdRepository: Repository<ExceedLimitThreshold>,
  ) {}

  async getConfig() {
    return await this.repository.findOne({ filter: {} });
  }

  async updateThreshold({ id, nextThreshold, isLastThreshold, ...dto }: UpdateThresholdDto) {
    const threshold = (await this.thresholdRepository.findById({ id, options: { lean: false } }))
      .data;
    if (!threshold) throw new NotFoundException();
    const prevNext = threshold.nextLimit;
    let nextLimit;
    if (nextThreshold || isLastThreshold) {
      nextLimit = nextThreshold
        ? (await this.thresholdRepository.create(nextThreshold)).data
        : null;
      if (prevNext) {
        let n: any = prevNext;
        while (n) {
          n = (await this.thresholdRepository.delete(n)).data.nextLimit;
        }
      }
    }
    return await this.thresholdRepository.findAndUpdate({ id, update: { ...dto, nextLimit } });
  }
}
