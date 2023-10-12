import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  // GET: /ninjas?type="fast" -> []
  @Get()
  getNinjas(@Query('type') type?: string) {
    return this.ninjaService.getNinjas(type);
  }
  // GET: /ninjas/:id -> { ... }
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    return this.ninjaService.getOneNinja(id);
  }
  // POST: /ninjas/create -> { ... }
  @Post('create')
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }
  // DELETE: /ninjas/delete/:id -> { ... }
  @Put('update/:id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }
  // DELETE: /ninjas/delete/:id -> { ... }
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjaService.deleteNinja(id);
  }
}
