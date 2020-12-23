import * as Plotly from 'plotly.js';

export class GenerateGraph {

  
    data:any;
    layout:any;
    graphConfig : any = {
        'modeBarButtonsToRemove': ['sendDataToCloud',
          'pan2d',
          /* 'zoomIn2d',
          'zoomOut2d', */
          /* 'autoScale2d', */
         /*  'resetScale2d', */
          'hoverCompareCartesian',
          'hoverClosestCartesian',
          'toggleSpikelines',
          'lasso',
          'boxSelect'
        ],
        'displaylogo': false
      }
    trace1:any;

    createOhlcGraph(htmlElement, dataGraph,intra){
        this.trace1 = {

            x: dataGraph.timestamp,
            close: dataGraph.close,
            connectgaps: true,
            low: dataGraph.low,
            open: dataGraph.open,
            high: dataGraph.high,
            // decreasing: { line: { color: 'white' } },
            // increasing: { line: { color: 'white' } },
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            name: '<span style="color:white">Actual</span>'
          }
        let trace1 = {

           // line chart
            x: dataGraph.timestamp,
            y: dataGraph.closeP,
            type: 'scatter',
            connectgaps: true
        }

          this.data = [trace1,this.trace1];
          this.layout = {
            dragmode: 'zoom',
            // hovermode: 'closest',
            height: 475,
            plot_bgcolor:"#0d1113",
            paper_bgcolor:"#0d1113",
            title:'<b>Stock Data  ' + this.gettitle(dataGraph,intra)+'</b>' ,
            titlefont: {
              size: 15,
              color :'#ffffff'
            },
            autosize: true,
            //width: 800,
            margin: {
              r: 10,
              t: 25,
              b: 40,
              l: 60
            },
            showlegend: false,
            xaxis: {
              autorange: true,
              showspikes: true,
              showline:true,
              // range: ['2018-07-30 09:30', '2018-07-30 17:20'], 
              domain: [0, 1],
              title: 'Time',
              titlefont: {
                size: 15,
                color :'#ffffff'
              },
              type: 'date',
              tickangle : 0,
              tickfont : {
                size : 10,
                color : 'white'
              }
            },
            yaxis: {
              autorange: true,
              showspikes: true,
              showline:true,
              domain: [0, 1],
              type: 'linear',
              tickangle : 0,
              tickfont : {
                size : 10,
                color : 'white'
              }
            },
        //         shapes: [{
        //       x0: '2018-08-06 14:20',
        //       x1: '2018-08-06 14:20',
        //       y0: 0,
        //       y1: 1,
        //       xref: 'x',
        //       yref: 'paper',
        //       line: {color: 'rgba(50,30,30,1)', width: 5}
        //   }],
        //   annotations: [{
        //     x: '2018-08-06 15:02',
        //     y: 0.05,
        //     xref: 'x',
        //     yref: 'paper',
        //     showarrow: false, 
        //     xanchor: 'left',
        //     // text: 'Increase Period Begins'
        // }]
          };
         Plotly.newPlot(htmlElement, this.data, this.layout, this.graphConfig);

    }

    gettitle(data,intra)
    {
       var result:string = ''
      if (intra)
      {
        result = new Date(data.timestamp[0]).toDateString()

      }
      else {
        result = new Date(data.timestamp[0]).toDateString() + " - "+ new Date(data.timestamp[data.timestamp.length -1]).toDateString();
      }
        return result;
    }

    createOhlcGraph1(htmlElement, dataGraph){
                 
        let trace1 = {

            x: dataGraph.timestamp,
            close: dataGraph.close,
            low: dataGraph.low,
            open: dataGraph.open,
            high: dataGraph.high,
            // decreasing: { line: { color: '#01579b' } },
            // increasing: { line: { color: '#01579b' } },
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            // name: '<span style="color:white">Predicted-close</span>',
            // // line chart
            // x: dataGraph.timestamp,
            // y: dataGraph.close,
            // type: 'scatter',
            // connectgaps: true
            
          }
        // let trace2 = {
        //   name: '<span style="color:white">Predicted-high</span>',
        //   // line chart
        //   x: dataGraph.timestamp,
        //   y: dataGraph.high,
        //   type: 'scatter',
        //   connectgaps: true
        //  }  
        // let trace3 = {
        //   name: '<span style="color:white">Predicted-low</span>',
        //   // line chart
        //   x: dataGraph.timestamp,
        //   connectgaps: true,
        //   y: dataGraph.low,
        //   type: 'scatter',
        //   line: {
        //     color: 'white'
        //   }
        // }
        // let trace4 = {
        //   name: '<span style="color:white">Predicted-open</span>',
        //   // line chart
        //   x: dataGraph.timestamp,
        //   connectgaps: true,
        //   y: dataGraph.open,
        //   type: 'scatter',
        //   line: {
        //     color: 'white'
        //   }
        // }
       

        this.data = [trace1];
        this.layout = {
          dragmode: 'zoom',
          height: 475,
          plot_bgcolor:"#0d1113",
          paper_bgcolor:"#0d1113",
          title:'<b>Predicted Data  ' + new Date(dataGraph.timestamp[0]).toDateString()+'</b>',
          autosize: true,
          titlefont: {
            size: 15,
            color :'#ffffff'
          },
          //width: 800,
          margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
          },
          showlegend: false,
          xaxis: {
            autorange: true,
            showspikes: true,
            showline:true,
            /* range: ['2008-07-01 12:00', '2018-07-17 12:00'], */
            domain: [0, 1],
            title: 'Time',
            titlefont: {
              size: 15,
              color :'#ffffff'
            },
            type: 'date',
            tickfont : {
              size : 10,
              color : 'white'
            }
          },
          yaxis: {
            autorange: true,
            // showspikes: true,
            showline:true,
            visible : false,
            domain: [0, 1],
            type: 'linear',
            tickfont : {
              size : 10,
              color : 'white'
            }
          },
          //     shapes: [{
          //     x0: '2018-07-30 14:20',
          //     x1: '2018-07-30 14:20',
          //     y0: 0,
          //     y1: 1,
          //     xref: 'x',
          //     yref: 'paper',
          //     line: {color: 'rgba(30,30,30,0.2)', width: 2}
          // }],
        //   annotations: [{
        //     x: '2018-07-30 15:02',
        //     y: 0.05,
        //     xref: 'x',
        //     yref: 'paper',
        //     showarrow: false, 
        //     xanchor: 'left',
        //     // text: 'Increase Period Begins'
        // }]
        };
       Plotly.newPlot(htmlElement, this.data, this.layout, this.graphConfig);
  }
    createOhlcGraph2(htmlElement, dataGraph,intra){
      let trace1 = {

          x: dataGraph.timestamp,
          close: dataGraph.close,
          connectgaps: true,
          low: dataGraph.low,
          open: dataGraph.open,
          high: dataGraph.high,
          // decreasing: { line: { color: 'white' } },
          // increasing: { line: { color: 'white' } },
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y',
          name: '<span style="color:white">Predicted Data</span>'
        }
     
        this.data = [trace1];
        this.layout = {
          dragmode: 'zoom',
          // hovermode: 'closest',
          height: 475,
          plot_bgcolor:"#0d1113",
          paper_bgcolor:"#0d1113",
          title:'<b>Predicted Data  ' + this.gettitle(dataGraph,intra)+'</b>' ,
          titlefont: {
            size: 15,
            color :'#ffffff'
          },
          autosize: true,
          //width: 800,
          margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
          },
          showlegend: false,
          xaxis: {
            autorange: true,
            showspikes: true,
            showline:true,
            // range: ['2018-07-30 09:30', '2018-07-30 17:20'], 
            domain: [0, 1],
            title: 'Time',
            titlefont: {
              size: 15,
              color :'#ffffff'
            },
            type: 'date',
            tickangle : 0,
            tickfont : {
              size : 10,
              color : 'white'
            }
          },
          yaxis: {
            autorange: true,
            showspikes: true,
            showline:true,
            domain: [0, 1],
            type: 'linear',
            tickangle : 0,
            tickfont : {
              size : 10,
              color : 'white'
            }
          },
      //         shapes: [{
      //       x0: '2018-08-06 14:20',
      //       x1: '2018-08-06 14:20',
      //       y0: 0,
      //       y1: 1,
      //       xref: 'x',
      //       yref: 'paper',
      //       line: {color: 'rgba(50,30,30,1)', width: 5}
      //   }],
      //   annotations: [{
      //     x: '2018-08-06 15:02',
      //     y: 0.05,
      //     xref: 'x',
      //     yref: 'paper',
      //     showarrow: false, 
      //     xanchor: 'left',
      //     // text: 'Increase Period Begins'
      // }]
        };
      Plotly.newPlot(htmlElement, this.data, this.layout, this.graphConfig);

  }

}