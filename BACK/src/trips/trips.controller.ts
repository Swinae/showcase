import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/common/interfaces/RequestWithUser';


@Controller('mytrips')
export class TripsController {
	constructor(private readonly tripsService: TripsService) { }

	@Post()
	create(@Body() createTripDto: CreateTripDto) {
		return this.tripsService.create(createTripDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async findUserTrips(@Request() req: RequestWithUser) {
		return await this.tripsService.findUserTrips(req.user.id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
		return this.tripsService.update(+id, updateTripDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tripsService.remove(+id);
	}
}
