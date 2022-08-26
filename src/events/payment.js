export default class Payment {
  constructor(PaymentSubject) {
    this.paymentSubject = PaymentSubject;
  }

  creditCard(paymentDate) {
    console.log(`\n A payment ocurred from ${paymentDate.userName}`);
    this.paymentSubject.notify(paymentDate);
  }
}
