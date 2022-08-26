import PaymentSubject from "./subjects/paymentSubject.js";
import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import { getRandomInt } from "./Utils/Random.js";

const subject = new PaymentSubject();
const payment = new Payment(subject);

const shipment = new Shipment();
const marketing = new Marketing();

subject.subscribe(shipment);
subject.subscribe(marketing);

const buyTypes = [
  { item: "Car" },
  { item: "Bike" },
  { item: "House" },
  { item: "Food" },
];

const Users = [
  { user: "ErickWendel", id: Date.now() },
  { user: "Carlos andre", id: Date.now() },
  { user: "Fernando Caramelo", id: Date.now() },
  { user: "Food truck do ze", id: Date.now() },
];

setInterval(() => {
  payment.creditCard({
    userName: `${Users[getRandomInt(Users.length)].user} - Buy ${
      buyTypes[getRandomInt(buyTypes.length)].item
    }`,
    id: Date.now(),
  });
}, 5000);
