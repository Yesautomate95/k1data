import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PdfViewer from "../PdfViewer/PdfViewer";
import { Button } from "../ui/button";

const ComparisonView = ({
  previewUrl,
  previewUrl2,
  TableComponent,
  tableData,
  fileName,
  fileName2,
  imageClassName = "",
}) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className={"w-full"}>Compare data</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="w-full h-full">
          <SheetHeader>
            <SheetTitle></SheetTitle>

            <div className="flex gap-4">
              <div className="overflow-y-scroll max-h-screen w-1/2">
                {previewUrl &&
                  (fileName.endsWith(".pdf") ? (
                    <div className="w-full h-screen">
                      <PdfViewer previewUrl={previewUrl} />
                    </div>
                  ) : (
                    <img
                      src={previewUrl}
                      alt="File Preview"
                      className={imageClassName}
                    />
                  ))}
                {previewUrl2 &&
                  (fileName2.endsWith(".pdf") ? (
                    <div className=" w-full h-screen">
                      <PdfViewer className="w-full" previewUrl={previewUrl2} />
                    </div>
                  ) : (
                    <img
                      src={previewUrl2}
                      alt="File Preview"
                      className={imageClassName}
                    />
                  ))}
              </div>
              <div className="overflow-y-scroll max-h-screen w-1/2">
                <TableComponent data={tableData} />
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ComparisonView;
