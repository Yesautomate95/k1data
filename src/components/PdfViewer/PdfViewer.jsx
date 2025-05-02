import React from 'react'
// Core viewer
import { Viewer, Worker, ScrollMode } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ previewUrl }) => {
    // Create new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        scrollMode: ScrollMode.Wrapped
    });


    return (
        <Worker workerUrl="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
            <Viewer

                fileUrl={previewUrl}
                plugins={[
                    // Register plugins
                    defaultLayoutPluginInstance,

                ]}

            />
        </Worker>
    )
}

export default PdfViewer