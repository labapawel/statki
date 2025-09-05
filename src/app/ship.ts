export interface Ship {
    name: string;
    size: number;
    selected: boolean;
    bullseye: boolean; // statek trafiony
    direction: boolean // true horyzont
    startPosition: number
}
