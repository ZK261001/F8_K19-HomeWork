export interface CustomerI {
    updatePhone(phone: number): void;

    updateAddress(address: string): void;

    toString(): string;
}
