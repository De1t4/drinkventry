class CreateClienttDto {
  name: string;
  address: string;
  phone: string;

  constructor(name: string, address: string, phone: string) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}

export { CreateClienttDto };
