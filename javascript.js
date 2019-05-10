
$( document ).ready(function() {    
    
    $( "#graphForm" ).submit(function( e ) {
        e.preventDefault();
        let params = $(this).serialize()
            url = $(this).attr('action')+"?"+$(this).serialize();
        axios({
            method: $(this).attr('method'),
            url: url
          })
          .then(function (response) {
          // handle success
          
            let respData = response.data.bpi,
                minValue,
                maxValue;
            
          chart(respData);
            
        })
        .catch(function (error) {
          // handle error
          
        })
      });

      function chart (respData){

        let charData = {
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              label: 'Bitcoin Price Index',
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        };

        $.each(respData, function (day, value) {
          charData.data.labels.push(day);
          charData.data.datasets[0].data.push(value)
        });

        setMinMax(charData.data.datasets[0].data);

        var ctx = document.getElementById('chart');

        var myChart = new Chart(ctx, charData);

      }

      function setMinMax(arrayValues){

        $(".minValue").html(arrayMinMax(arrayValues,"MIN"))

        $(".maxValue").html(arrayMinMax(arrayValues,"MAX"))

        $(".currency").html(  $( "#currency" ).val() )

      }

      function arrayMinMax(arrayValues,minMax) {

        switch (minMax) {
          case "MIN":
          return Math.min.apply(Math, arrayValues);
            break;
          
          case "MAX":
          return Math.max.apply(Math, arrayValues);
            break;
        
          default:
            break;
        }
        
      };

});

