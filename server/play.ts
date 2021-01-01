import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";

import { v4 } from "https://deno.land/std/uuid/mod.ts";

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

const users = new Map<string, WebSocket>();

//const playerIds = new Map<string, string>();

// const players: Player[] = [
//   {
//     "name": "Nikhil",
//     "distance": 23963,
//     "car": "Hyundai Grand i10",
//     "color": "danger",
//     "last": 10,
//     "active": true,
//     "winner": false,
//     "nextround": false,
//   },
//   {
//     "name": "Netra",
//     "distance": 33527,
//     "car": "Hyundai Elite i20",
//     "color": "info",
//     "last": 7,
//     "active": false,
//     "winner": false,
//     "nextround": true,
//   },
//   {
//     "name": "Dhanya",
//     "distance": 12813,
//     "car": "Suzuki Swift Dzire",
//     "color": "primary",
//     "last": 10,
//     "active": true,
//     "winner": false,
//     "nextround": true,
//   },
//   {
//     "name": "Oviya",
//     "distance": 20666,
//     "car": "Hyundai Grand i10 NIOS",
//     "color": "success",
//     "last": 7,
//     "active": true,
//     "winner": false,
//     "nextround": true,
//   },
//   {
//     "name": "Darshith",
//     "distance": 21071,
//     "car": "Honda Amaze",
//     "color": "warning",
//     "last": 10,
//     "active": false,
//     "winner": false,
//     "nextround": true,
//   },
// ];
export const cars: Car[] = [
  {
    model: "Tata Nano",
    speed: 1,
    total: 100,
  },
  {
    model: "Tata Indica",
    speed: 2,
    total: 350,
  },
  {
    model: "Hyundai Eon",
    speed: 3,
    total: 650,
  },
  {
    model: "Honda Brio",
    speed: 4,
    total: 1000,
  },
  {
    model: "Toyata Etios (Liva)",
    speed: 5,
    total: 1500,
  },
  {
    model: "Renault KWID",
    speed: 6,
    total: 2100,
  },
  {
    model: "Tata Tiago",
    speed: 7,
    total: 2800,
  },
  {
    model: "Hyundai Santro",
    speed: 8,
    total: 3600,
  },
  {
    model: "Hyundai Grand i10",
    speed: 10,
    total: 5000,
  },
  {
    model: "Hyundai Xcent",
    speed: 10,
    total: 5800,
  },
  {
    model: "Suzuki Swift",
    speed: 12,
    total: 7000,
  },
  {
    model: "Suzuki Swift Dzire",
    speed: 12,
    total: 8000,
  },
  {
    model: "Hyundai Grand i10 NIOS",
    speed: 15,
    total: 10000,
  },
  {
    model: "Honda Amaze",
    speed: 17,
    total: 14000,
  },
  {
    model: "Hyundai Elite i20",
    speed: 20,
    total: 18000,
  },
  {
    model: "Skoda Fabia",
    speed: 21,
    total: 21700,
  },
  {
    model: "Honda Jazz",
    speed: 22,
    total: 24000,
  },
  {
    model: "Suzuki SX4",
    speed: 24,
    total: 27000,
  },
  {
    model: "Volkswagen Polo",
    speed: 25,
    total: 30000,
  },
  {
    model: "Toyota Yaris",
    speed: 26,
    total: 32900,
  },
  {
    model: "Hyundai i20 Active",
    speed: 29,
    total: 34500,
  },
  {
    model: "Hyundai Verna",
    speed: 30,
    total: 40000,
  },
  {
    model: "Honda City",
    speed: 32,
    total: 43700,
  },
  {
    model: "Skoda Rapid",
    speed: 34,
    total: 46900,
  },
  {
    model: "Volkswagen Vento",
    speed: 35,
    total: 50000,
  },
  {
    model: "Hyundai Venue",
    speed: 31,
    total: 56500,
  },
  {
    model: "Mahindra XUV 300",
    speed: 31,
    total: 63000,
  },
  {
    model: "Maruti Suzuki Ertiga",
    speed: 30,
    total: 70000,
  },
  {
    model: "Nano(LIMITED)",
    speed: 1,
    total: 70100,
  },
  {
    model: "Honda BR-V",
    speed: 36,
    total: 80000,
  },
  {
    model: "Honda WR-V",
    speed: 37,
    total: 89000,
  },
  {
    model: "Hyundai Creta",
    speed: 38,
    total: 100000,
  },
  {
    model: "Tata Harrier",
    speed: 40,
    total: 110000,
  },
  {
    model: "MG Hector",
    speed: 45,
    total: 120000,
  },
  {
    model: "Tata Indiga(LIMITED)",
    speed: 2,
    total: 123000,
  },
  /*   {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },
       {
           model: "",
           speed: 31,
           total: 0
   
       },*/
  {
    model: "Ferrari Super",
    speed: 100,
    total: 150000,
  },
];
const players: Player[] = JSON.parse(Deno.readTextFileSync("./players.json"));

function broadcast(senderId?: string): void {
  for (const user of users.values()) {
    try {
      if (players.every((pl) => pl.nextround)) {
        players.forEach((pl) => pl.nextround = false);
        startNextRound();
        Deno.writeTextFileSync("./players.json", JSON.stringify(players));
      }

      user.send(
        JSON.stringify(players),
      );
    } catch (error) {
    }
  }
}

const groupBy = (array: any[], key: any) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

function startNextRound() {
  let groups = groupBy(players, "last");

  for (const key in groups) {
    if (groups.hasOwnProperty(key)) {
      const g = groups[key];
      if (g.length > 1 && g.some((p: Player) => p.active)) {
        g.forEach((element: Player) => {
          element.active = !element.active;
        });
      }
    }
  }

  players.forEach((pl) => {
    let car = cars.find((c) => c.model === pl.car);
    if (car) {
      if (pl.active) pl.distance += pl.last * car.speed;
      if (pl.distance > 150000) {
        pl.winner = true;
      } else if (pl.distance >= car.total) {
        let newcar = cars.find((c) => c.total > pl.distance);
        if (newcar) {
          pl.car = newcar.model;
        }
      }
    }
  });

  if (players.every((p) => !p.active)) {
    players.forEach((element) => {
      element.active = true;
    });
  }
}

export async function play(ws: WebSocket): Promise<void> {
  const userId = v4.generate();

  // Register user connection
  users.set(userId, ws);
  //broadcast(`> User with the id ${userId} is connected`);
  broadcast(userId);

  // Wait for new messages
  for await (const event of ws) {
    const message = typeof event === "string" ? event : "";

    if (message) {
      const data = JSON.parse(message);

      if (data.type === "update score") {
        const player = players.find((pl) =>
          pl.name.toLowerCase() === data.player.toLowerCase()
        );

        if (player) {
          player.last = data.score;
          player.nextround = true;

          Deno.writeTextFileSync("./players.json", JSON.stringify(players));
        }
      } else if (data.type === "login") {
        const player = players.find((pl) =>
          pl.name.toLowerCase() === data.player.toLowerCase()
        );
      }

      broadcast(userId);
    }
    // Unregister user conection
    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(userId);
      // broadcast(`> User with the id ${userId} is disconnected`);
      break;
    }
  }
}
