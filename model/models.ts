interface Player {
  name: string;
  distance: number;
  color: string;
  last: number;
  active: boolean;
  car: string;
  winner: boolean;
  nextround: boolean;
}

interface Car {
  model: string;
  speed: number;
  total: number;
}

export { Player, Car };
