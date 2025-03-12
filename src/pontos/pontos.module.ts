import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PontosService } from "./pontos.service";
import { PontosController } from "./pontos.controller";

@Module({
    imports: [HttpModule],
    providers: [PontosService],
    controllers: [PontosController]
})
export class PontosModule {}