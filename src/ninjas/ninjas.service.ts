import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common'
import { CreateNinjaDto } from './dto/create-ninja.dto'
import { UpdateNinjaDto } from './dto/update-ninja.dto'

const ninjas = [
  {
    id: '1',
    name: 'Amir',
    age: 27,
    type: 'fast',
  },
  {
    id: '2',
    name: 'Zaki',
    age: 12,
    type: 'fast',
  },
]

@Injectable()
export class NinjasService {
  // GET: /ninjas?type="fast" -> []
  getNinjas(@Query('type') type?: string) {
    if (type) {
      return ninjas?.filter((item) => item.type === type)
    }
    return ninjas
  }
  // GET: /ninjas/:id -> { ... }
  getOneNinja(@Param('id') id: string) {
    try {
      const ninja = ninjas.find((el) => el.id === id)
      if (!ninja) {
        throw new Error('No Ninja found')
      }
      return ninja
    } catch (error) {
      throw new NotFoundException('Ninja not found!')
    }
  }
  // POST: /ninjas/create -> { ... }
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    ninjas.push(createNinjaDto)
    return createNinjaDto
  }
  // UPDATE: /ninjas/update/:id -> { ... }
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    try {
      const ninja = ninjas.find((el) => el.id === id)
      if (!ninja) {
        throw new Error('no Ninja found')
      }
      return {
        ...ninja,
        ...updateNinjaDto,
      }
    } catch (error) {
      throw new NotFoundException()
    }
  }
  // DELETE: /ninjas/delete/:id -> { ... }
  deleteNinja(@Param('id') id: string) {
    ninjas.filter((el) => el.id !== id)
    return {
      id,
      deleted: true,
    }
  }
}
