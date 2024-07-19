import { ConfigService } from "@nestjs/config";

export const jwtConstants = (configService: ConfigService): string => {
  return configService.get<string>("JWT_SECRET");
};
