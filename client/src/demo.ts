export interface ICar {
  color: string;
  model: string;
  speed?: number;
}

const c1: ICar = {
  color: "blue",
  model: "BMW",
  speed: 10,
};

const c2: ICar = {
  color: "red",
  model: "Skoda",
};

const m = (x: number, y: number): string => {
  return String(x * y);
};

export const cars = [c1, c2];
