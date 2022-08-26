import { expect, describe, test, jest, beforeAll } from "@jest/globals";
import Payment from "../src/events/payment";
import Marketing from "../src/observers/marketing";
import Shipment from "../src/observers/shipment";
import PaymentSubject from "../src/subjects/paymentSubject";

describe("Test suite for observer pattern", () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });

  test("#PaymentsSubject notify observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    const data = "Hello world";
    const expected = data;
    subject.subscribe(observer);
    subject.notify(data);
    expect(observer.update).toBeCalledWith(expected);
  });

  test("#PaymentsSubject shloud not notify unsubscribed observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };

    const data = "Hello world";

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test("#Payments shloud notify subject after a credit caard transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentSubject,
      payment.paymentSubject.notify.name
    );

    const data = { userName: "ErickWendel", id: Date.now() };
    payment.creditCard(data);

    expect(paymentSubjectNotifySpy).toBeCalledWith(data);
  });

  test("#All should notify subscribers after a credit card payment", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const shipment = new Shipment();
    const marketing = new Marketing();

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);

    subject.subscribe(shipment);
    subject.subscribe(marketing);

    const data = { userName: "ErickWendel", id: Date.now() };

    payment.creditCard(data);

    expect(shipmentSpy).toBeCalledWith(data);
    expect(marketingSpy).toBeCalledWith(data);
  });
});
