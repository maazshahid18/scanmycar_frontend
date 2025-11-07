"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

interface QRCardProps {
  vehicleNumber: string;
  qrImage: string;
}

export default function QRCard({ vehicleNumber, qrImage }: QRCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // ✅ Download PNG
  const downloadPNG = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 1 });
    const link = document.createElement("a");
    link.download = `${vehicleNumber}.png`;
    link.href = dataUrl;
    link.click();
  };

  // ✅ Download PDF
  const downloadPDF = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 1 });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 40;

    const ratio = imgProps.height / imgProps.width;
    const pdfHeight = pdfWidth * ratio;

    pdf.addImage(dataUrl, "PNG", 20, 20, pdfWidth, pdfHeight);
    pdf.save(`${vehicleNumber}.pdf`);
  };

  return (
    <div className="w-full mx-auto text-center">
      {/* Card */}
      <div
        ref={cardRef}
        className="w-72 bg-white shadow-lg border rounded-xl p-6 mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900">ScanMyCar</h2>
        <p className="text-gray-600 text-sm mb-4">
          Scan to notify the owner
        </p>

        <img
          src={qrImage}
          alt="QR Code"
          className="w-40 h-40 mx-auto rounded-lg"
        />

        <p className="text-gray-600 mt-4 text-xs font-medium">Vehicle Number</p>
        <p className="text-xl font-bold text-gray-900">{vehicleNumber}</p>

        <div className="mt-4 text-[10px] text-gray-500">
          Generated using ScanMyCar © 2025
        </div>
      </div>

      {/* Download Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={downloadPNG}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg shadow-sm hover:shadow-md font-medium transition-all active:scale-95"
        >
          Download PNG
        </button>

        <button
          onClick={downloadPDF}
          className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white py-3 rounded-lg shadow-sm hover:shadow-md font-medium transition-all active:scale-95"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}