import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) { }


  create(createTripDto: CreateTripDto) {
    return 'This action adds a new trip';
  }

  async findUserTrips(userId: string) {
    return await this.prisma.trip.findMany({
      where: {
        authorId: userId
      }
    });
  }

  async findAll() {
    return this.prisma.trip.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
