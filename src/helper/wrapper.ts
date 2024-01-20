import { Injectable } from '@nestjs/common';

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

  response(statusCode: number, data: any) {
    const message = this.getMessageFromStatusCode(statusCode);
    return { message: message, data: data };
  }
}
