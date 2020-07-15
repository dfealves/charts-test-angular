import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions,  } from 'chart.js';
import { Color, BaseChartDirective,  } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import charts from 'chart.js';
import { ChartService } from './chart.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})



export class AppComponent implements OnInit {
  ChartStyle: Color[];
  LineChartData: any;
  LineChartLabel: any;
  LineChartLegend: 'Fatura';
  LineChartOptions: ChartOptions;
  LineChartPlugins: any[];
  LineChartType = 'line';
  chart: any;
  Label: any;
  Status: any;
  StatusItem: any;
  @ViewChild('chartsBasePart') chartsBasePart: BaseChartDirective


  constructor(private chartService: ChartService) {

  }


  ngOnInit() {
    let normalizeInvoiceProperties = this.chartService.normalizeChartDataInvoice();


    this.ChartStyle = [{
      borderColor: this.chartService.VerifyPaymentStatusApplyColor(normalizeInvoiceProperties),
      pointBorderWidth: 7,
      pointBorderColor: this.chartService.VerifyPaymentStatusApplyColor(normalizeInvoiceProperties),
      pointHoverBackgroundColor: this.chartService.VerifyPaymentStatusApplyColor(normalizeInvoiceProperties),
      borderWidth: 1,

    }];

    this.LineChartData = [
      { data: this.chartService.pointLabelValueInvoice(normalizeInvoiceProperties), label: 'Series A' },
    ];

    this.LineChartLabel = this.chartService.labelMounthInvoice(normalizeInvoiceProperties)

    this.LineChartPlugins = [ChartDataLabels];

    this.LineChartOptions = {
      legendCallback:function(chart){
        console.log(chart);
        return '<a href="google.com">teste</a>';
        // let legendHTML = []
        // chart.data.labels.map((item, index) => {
        //   legendHTML.push(`<button style="backgroundColor:${chart.data.datasets.map((item) => item.borderColor[index])}">ver</button>`)
        //   return legendHTML.join("")
        // })
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          font: {
            size: 16,
            weight: "bolder"
          },
          color: this.chartService.VerifyPaymentStatusApplyColor(normalizeInvoiceProperties),
          offset: 15,
          padding: 8,
          formatter: function (value, context) {
            var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }
            let formattedValue =  value.toLocaleString('pt-BR', formato)
            return `${formattedValue}`
          },

          listeners: {
            click: function(context) {
              var index = context.dataIndex
              const invoiceDetails = {
                status: normalizeInvoiceProperties[index].status,
                datePayment: normalizeInvoiceProperties[index].date.cursiveDate,
                amountPayment: normalizeInvoiceProperties[index].amountPaid.text
              }
              alert(`Status de pagamento ${invoiceDetails.status}
              Data de pagamento ${invoiceDetails.datePayment}
              Valor do pagamento ${invoiceDetails.amountPayment}`)
            }
          }
        },

        lineTension: 0,
        labels: {

          value: {
            color: this.chartService.VerifyPaymentStatusApplyColor(normalizeInvoiceProperties),
          },
        },
      },
      legend: {
        display: true,
      },
      responsive: true,
      layout: {
        padding: {
          left: 40,
          right: 40,
          top: 40,
          bottom: 40,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            display: true,
            ticks: {
              fontSize: 15,
              callback: function(value, index, values) {
                return `${value}`
            },
              lineHeight: 5
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            display: false,
          },
        ],
      },
    }

  }

  ngAfterViewInit() {


  this.chartsBasePart.chart.generateLegend()
  this.Label = this.chartsBasePart.chart.data.labels
  let invoiceData = this.chartService.normalizeChartDataInvoice()
  this.Status = invoiceData.map((paid) => paid.status)

 }
}


