import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) { }

	async create(data: CreateUserDto): Promise<User> {
		return this.prisma.user.create({ data });
	}

	async findAll() : Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async findByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async findById(id: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
