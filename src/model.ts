import { type } from "os";

export interface IGetUsers {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: AddressType,
    description: string

}

type AddressType = {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
}