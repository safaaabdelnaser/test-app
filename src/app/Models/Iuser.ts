export interface Iuser {
  name: string;
  email: string;
  password: string;
  address: {
    city: string;
    street: string;
  };
}
