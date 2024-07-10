class UpdateMovementDto {
  movementDate?: Date;
  movementType?: string;
  retirementDate?: Date;

  constructor(movementDate: Date, movementType: string, retirementDate: Date) {
    this.movementDate = movementDate;
    this.movementType = movementType;
    this.retirementDate = retirementDate;
  }
}


export { UpdateMovementDto }