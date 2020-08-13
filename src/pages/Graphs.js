import React, { useState, useRef } from 'react';
import ReactHighcharts from 'react-highcharts'

export default function Graphs() {
    const [headers, setHeaders] = useState([]);
    const [records, setRecords] = useState([]);
    const [config, setConfig] = useState({
        title: {text: 'Datagran'},
        xAxis: {
            categories: []
          },
        series: [{data: []}],
        colors: ["#ff0000"]
    });
    const textareaRef = useRef(null);
    const XAxisRef = useRef(null);
    const YAxisRef = useRef(null);
      
    

    
    const processData = () => {
        const rawData = textareaRef.current.value.replace('\r\n', '\n').replace('\r', '\n');
        const [headersLine, ...recordsLines] = rawData.split('\n');
        setHeaders(headersLine.split(','));
        setRecords(recordsLines);
    }

    const changeAxis = () => {
        const xs = [];
        const ys = [];
        for (let i=0;i<records.length;i++) {
            const x = records[i].split(',')[XAxisRef.current.value];
            const y = records[i].split(',')[YAxisRef.current.value];
            ys.push(parseFloat(y));
            xs.push(x);
        }
        setConfig({
            title: {text: 'Datagran'},
            xAxis: {
                categories: xs
              },
            series: [{data: ys}],
            colors: ["#ff0000"]
        });

    }
    
    return (
        <>
            <h2>Graphs</h2>
            <textarea ref={textareaRef}></textarea>
            <button onClick={processData}>Process</button>
            <form>
                <select name="x-axis" id="x-axis" onChange={changeAxis} ref={XAxisRef}>
                    {
                    headers.length === 0 ? 
                        <option value={-1}>X-AXIS</option>
                    : (
                        <>
                            <option value={-1}>X-AXIS</option>
                            {headers.map((header, index) => {
                                return (
                                    <option value={index} key={index}>{header}</option>
                                );
                            })}
                        </>
                    )
                    }               
                </select>
                <select name="y-axis" id="y-axis" onChange={changeAxis} ref={YAxisRef}>
                    {
                    headers.length === 0 ? 
                        <option value={-1}>Y-AXIS</option>
                    : (
                        <>
                            <option value={-1}>Y-AXIS</option>
                            {headers.map((header, index) => {
                                return (
                                    <option value={index} key={index}>{header}</option>
                                );
                            })}
                        </>
                    )
                    }               
                </select>
            </form>
            <ReactHighcharts  config={config}  />
        </>
    )
}

