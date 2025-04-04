import { jsPDF } from "jspdf";
import { Button } from "@zeak/react";
import autoTable from 'jspdf-autotable';

interface PdfProps {
  currentPageData: any[];
}

export const Pdf = ({ currentPageData }: PdfProps) => {
  const downloadPdf = () => {
    try {
      // Calculate required width based on content
      const headers = Object.keys(currentPageData[0] || {})
        .filter(header => !['id', 'subRows', 'uuid'].includes(header))
        .map(header => header.charAt(0).toUpperCase() + header.slice(1));

      // Estimate width needed per column (in mm)
      const avgCharWidth = 2; // Approximate width per character in mm
      const padding = 5; // Padding per cell in mm
      
      const columnWidths = headers.map(header => {
        // Get max width needed for this column including header
        const maxContentWidth = Math.max(
          header.length,
          ...currentPageData.map(row => {
            const value = row[header.toLowerCase()];
            return value ? String(value).length : 0;
          })
        );
        return (maxContentWidth * avgCharWidth) + (padding * 2);
      });

      const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
      const pageWidth = Math.max(totalWidth + 30, 210); // Min width is A4 width (210mm)

      // Create PDF with calculated width
      const doc = new jsPDF({
        format: [pageWidth, 297], // 297 is A4 height
        unit: 'mm'
      });
      
      // Add title
      doc.setFontSize(16);
      doc.text("Current Page Data", 14, 15);

      // Transform data for table
      const tableData = currentPageData.map(row => 
        Object.keys(row)
          .filter(key => !['id', 'subRows', 'uuid'].includes(key))
          .map(key => {
            const value = row[key];
            
            if (value instanceof Date) {
              return value.toLocaleDateString();
            }
            
            if (typeof value === 'boolean') {
              return value ? 'Yes' : 'No';
            }

            if (value == null) {
              return '';
            }

            return value.toString();
          })
      );

      // Add table with calculated column widths
      autoTable(doc, {
        head: [headers],
        body: tableData,
        startY: 25,
        theme: 'grid',
        headStyles: {
          fillColor: [0, 122, 245],
          textColor: 255,
          fontSize: 10,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 9,
          halign: 'left'
        },
        margin: { top: 25, right: 15, left: 15 },
        columnStyles: columnWidths.reduce((acc: { [key: number]: { cellWidth: number } }, width, index) => {
          acc[index] = { cellWidth: width };
          return acc;
        }, {}),
        tableWidth: totalWidth
      });

      // Add page number
      const pageCount = doc.internal.pages.length - 1;
      for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Download using blob
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "current-page-data.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Button onClick={downloadPdf}>
      Export Current Page to PDF
    </Button>
  );
};