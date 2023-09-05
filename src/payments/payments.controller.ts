import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderMessageDTO } from './order-message.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  all() {
    return this.paymentsService.all();
  }

  @MessagePattern('roders')
  async payment(@Payload() message: OrderMessageDTO) {
    await this.paymentsService.payment({
      amount: message.price,
      order_id: message.id,
      client_id: message.client_id,
    });
  }
}
