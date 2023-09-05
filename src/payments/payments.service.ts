import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDTO } from './create-payment.dto';
import { PaymentStatus } from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  constructor(
    private prismaService: PrismaService,
    @Inject('PAYMENTS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  all() {
    return this.prismaService.payment.findMany();
  }

  async payment(data: CreatePaymentDTO) {
    const payment = await this.prismaService.payment.create({
      data: {
        ...data,
        status: PaymentStatus.APPROVED,
      },
    });
    await lastValueFrom(this.kafkaClient.emit('payments', payment));
    return payment;
  }
}
