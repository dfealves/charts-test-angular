import { Injectable } from '@angular/core';
import { data as invoice } from './services/normalize'

@Injectable({
  providedIn: 'root'
})

export class ChartService {

  constructor() { }

  normalizeChartDataInvoice() {
   let initialState: any[] = [];
    invoice.map((item) => {
      let test = {
        date: item.dueDate,
        status: item.cycleStatus,
        amountPaid: item.amountPaid
      }
      initialState.push(test);
    })
    return initialState;
  }

  pointLabelValueInvoice(chartDataInvoice: any[]) {
   return chartDataInvoice.map((item) => item.amountPaid.number);
  }

  labelMounthInvoice(chartMounthInvoice: any[]) {
   return chartMounthInvoice.map((item) => item.date.shortMonth);
  }

  VerifyPaymentStatusApplyColor(chartPaymentStatus: any[]) {
    return chartPaymentStatus.map((item) => {
      switch (item.status) {
        case 'PAID':
          return '#008679';
          break;
        case 'OVERDUE':
          return '#f2465a';
          break;
        case 'CLOSED':
            return 'blue';
            break;
        case 'FUTURE':
            return '#4e7cff';
            break;
        case "OPEN":
            return '#ff9e54'
        default:
            return 'black'
          break;
      }
    })
  }

  // export const paid = () => {
  //   let paid = fatura.month.map((item) => {
  //     if (item.paid === true) return 'blue';
  //     if (item.paid === false) return 'red';
  //   });
  //   return paid;
  // };

}
