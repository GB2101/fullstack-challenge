import { PartialType } from "@nestjs/swagger";
import { CreateTasks } from "./Create.dto";

export class UpdateTasks extends PartialType(CreateTasks) {}
