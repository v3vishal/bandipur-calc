var trophicLvls = 4;
        var data = [
            { type: 'Tigers', value: 150 },
        ];
        var lastTLval = data[0].value
        var lastmin1Val = lastTLval/0.1
        var lastmin2Val = lastmin1Val/0.1
        var lastmin3Val = lastmin2Val*50000
        var data2 = [
            { type: 'Trees', value: 1350000 },
        ];
        var firstTLval = data2[0].value
        var firstpl1Val = firstTLval*0.1
        var firstpl2Val = firstpl1Val*0.1
        var firstpl3Val = firstpl2Val*0.1
        firstpl3Val = firstpl2Val/5000
        data2.push(
            {type:'Herbivores', value: firstpl1Val},
            {type:'Carnivores', value: firstpl2Val},
            {type:'Tigers', value: firstpl3Val},
        );
        data.push(
            {type: 'Carnivores', value: lastmin1Val},
            {type: 'Herbivores', value: lastmin2Val},
            {type: 'Trees/Plants', value: lastmin3Val},);
        var amount = 150;
        var chart;
        var chart2;
        initializeChart()
        initializeChart2()

        function initializeChart() {
            var color = '#999900';
            chart = JSC.chart('chartDiv', {
                debug: true,
                type: 'horizontal marker',
                title_label: {
                    text: 'Prediction for certain amount of tree existence based on current tiger survival amount (<icon name=material/social/person-outline size=20 color=' + color + '> - ' + amount + ' Organisms)',
                    style_fontSize: 16
                },
                palette: [color],
                defaultSeries: {
                    legendEntry_visible: false,
                    mouseTracking_enabled: false,
                    lastPoint_label: {
                        text: '<b>%val</b>',
                        align: 'right',
                        style_fontSize: 14
                    }
                },
                xAxis_defaultTick: {
                    gridLine_visible: false,
                    line_visible: false
                },
                yAxis_visible: false,
                defaultPoint: {
                    marker: {
                        type: 'material/social/person-outline',
                        size: 24,
                        outline_width: 0
                    },
                    focusGlow: false
                },
                series: makeSeries(data)
            });
        }
        function initializeChart2() {
            var color = '#00ff75';
            chart2 = JSC.chart('chartDiv2', {
                debug: true,
                type: 'horizontal marker',
                title_label: {
                    text: 'Prediction for support of certain amount of tigers based on calculated avg tree survival amount(<icon name=material/image/nature size=20 color=' + color + '> - ' + amount + ' Organisms)',
                    style_fontSize: 16
                },
                palette: [color],
                defaultSeries: {
                    legendEntry_visible: false,
                    mouseTracking_enabled: false,
                    lastPoint_label: {
                        text: '<b>%val</b>',
                        align: 'right',
                        style_fontSize: 14
                    }
                },
                xAxis_defaultTick: {
                    gridLine_visible: false,
                    line_visible: false
                },
                yAxis_visible: false,
                defaultPoint: {
                    marker: {
                        type: 'material/image/nature',
                        size: 24,
                        outline_width: 0
                    },
                    focusGlow: false
                },
                series: makeSeries2(data2)
            });
        }

        function makeSeries(data) {
            return data.map(function (item) {
                var points = [],
                    maxImages = Math.round(item.value / amount);
                for (var i = 0; i < maxImages; i++) {
                    points.push({
                        x: item.type,
                        y: i + 1,
                        attributes_val: item.value
                    });
                }
                return { name: item.name, points: points };
            });
        }
        function makeSeries2(data2) {
            return data2.map(function (item) {
                var points = [],
                    maxImages = Math.round(item.value / amount);
                for (var i = 0; i < maxImages; i++) {
                    points.push({
                        x: item.type,
                        y: i + 1,
                        attributes_val: item.value
                    });
                }
                return { name: item.name, points: points };
            });
        }

        function updateTigerValue() {
            var newTigerValue = parseFloat(document.getElementById('newTigerValue').value);
            newTigerValue = Math.round(newTigerValue);
            if (!isNaN(newTigerValue) && newTigerValue > 0) {
                console.log(newTigerValue);
                data = [ 
                {type: "Tigers", value: newTigerValue}
                ];
                amount = newTigerValue;
                var lastTLval = data[0].value
                var lastmin1Val = lastTLval/0.1
                var lastmin2Val = lastmin1Val/0.1
                var lastmin3Val = lastmin2Val*50000
                data.push(
                    {type: 'Carnivores', value: lastmin1Val},
                    {type: 'Herbivores', value: lastmin2Val},
                    {type: 'Trees/Plants', value: lastmin3Val},);
                chart.destroy();
                initializeChart();
            } else {
                alert('Please enter a valid numeric value for Tigers.');
            }
        }
        function updateTreeValue() {
            var newTreeValue = parseFloat(document.getElementById('newTreeValue').value);
            newTigerValue = Math.round(newTreeValue);
            if (!isNaN(newTreeValue) && newTreeValue > 0) {
                console.log(newTreeValue);
                data2 = [ 
                {type: "Trees/Plants", value: newTreeValue}
                ];
                amount = newTreeValue;
                var firstTLval = data2[0].value
                var firstpl1Val = firstTLval*0.1
                var firstpl2Val = firstpl1Val*0.1
                var firstpl3Val = firstpl2Val*0.1
                firstpl3Val = firstpl2Val/5000
                data2.push(
                    {type: 'Herbivores', value: firstpl1Val},
                    {type: 'Carnivores', value: firstpl2Val},
                    {type: 'Tigers', value: firstpl3Val},);
                chart2.destroy();
                initializeChart2();
            } else {
                alert('Please enter a valid numeric value for Tigers.');
            }
        }

        initializeChart();
        initializeChart2();
