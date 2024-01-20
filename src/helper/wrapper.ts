import { Injectable } from '@nestjs/common';

export type Resp = {
  message: string;
  data: any;
};

@Injectable()
export class Wrapper {
  private getMessageFromStatusCode(statusCode: number) {
    switch (statusCode) {
      case 200:
        return 'OK';

      case 201:
        return 'CREATED';

      default:
        return 'NOT_DEFINED';
    }
  }

  response(statusCode: number, data: any): Resp {
    const message = this.getMessageFromStatusCode(statusCode);
    return { message: message, data: data };
  }
}
