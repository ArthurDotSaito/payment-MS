import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  all() {
    return this.paymentsService.all();
  }

  @MessagePattern('roders')
  async payment(@Payload() message) {
    await this.paymentsService.payment();
  }
}
